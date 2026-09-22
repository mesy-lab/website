import { createHash } from "node:crypto";
import { mkdir, readFile, readdir, realpath, rename, stat, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { isWithin } from "./sync-gallery.mjs";

const project = fileURLToPath(new URL("../", import.meta.url));
const folderType = "application/vnd.google-apps.folder";
const documentType = "application/vnd.google-apps.document";
const maxText = 64 * 1024;
const maxPhoto = 10 * 1024 * 1024;
const maxTotal = 100 * 1024 * 1024;
const fields = new Set(["published", "name", "nameKo", "level", "email", "photo", "research", "order"]);

export function parseProfile(text, id) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id)) throw new Error(`${id}: use an English lowercase folder name with hyphens`);
  const lines = text.replace(/^\uFEFF/, "").replace(/\r\n?/g, "\n").split("\n");
  const divider = lines.findIndex((line) => line.trim() === "---");
  if (divider < 0) throw new Error(`${id}: add a line containing --- before the biography`);
  const values = {};
  for (const line of lines.slice(0, divider)) {
    if (!line.trim()) continue;
    const match = line.match(/^([A-Za-z]+)\s*:\s*(.*?)\s*$/);
    if (!match || !fields.has(match[1])) throw new Error(`${id}: unknown or malformed profile field`);
    if (Object.hasOwn(values, match[1])) throw new Error(`${id}: duplicate ${match[1]} field`);
    values[match[1]] = match[2];
  }
  // A new, blank form is a draft. Publication still requires an explicit true.
  if (values.published === "" || values.published === "false") return null;
  if (values.published !== "true") throw new Error(`${id}: published must be true or false (leave blank for a draft)`);
  const biography = lines.slice(divider + 1).join("\n").trim();
  if (!values.name || values.name.length > 100) throw new Error(`${id}: name is required (up to 100 characters)`);
  if ((values.nameKo || "").length > 100) throw new Error(`${id}: nameKo is too long`);
  if (!["phd", "integrated", "ms", "undergraduate"].includes(values.level)) throw new Error(`${id}: invalid level`);
  if (values.email && !/^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)+$/.test(values.email)) throw new Error(`${id}: invalid email`);
  if (!biography || biography.length > 12000 || /\[(?:NAME|UNIVERSITY|CITY|COUNTRY|YEAR|DEGREE|RESEARCH INTERESTS|WRITE BIOGRAPHY)[^\]]*\]/i.test(biography)) throw new Error(`${id}: replace the biography template with your own text (up to 12000 characters)`);
  if (values.photo && !/^[a-zA-Z0-9][a-zA-Z0-9_-]*\.(jpg|jpeg|png|webp)$/i.test(values.photo)) throw new Error(`${id}: photo must be a filename such as photo.jpg, not a path or URL`);
  const order = values.order ? Number(values.order) : 0;
  if (!Number.isInteger(order) || order < 0 || order > 10000) throw new Error(`${id}: order must be an integer from 0 to 10000`);
  const research = (values.research || "").split(";").map((s) => s.trim()).filter(Boolean);
  if (research.length > 8 || research.some((s) => s.length > 150)) throw new Error(`${id}: use up to 8 short research interests separated by semicolons`);
  return { id, name: values.name, nameKo: values.nameKo || "", level: values.level, email: values.email || "", research, biography, order, photoFilename: values.photo || "" };
}

function validatePhoto(data, ext, id) {
  const valid = ext === ".png" ? data.subarray(0, 8).equals(Buffer.from([137,80,78,71,13,10,26,10]))
    : ext === ".webp" ? data.toString("ascii", 0, 4) === "RIFF" && data.toString("ascii", 8, 12) === "WEBP"
    : data[0] === 0xff && data[1] === 0xd8 && data[2] === 0xff;
  if (!valid) throw new Error(`${id}: photo content does not match its image extension`);
}

// Both adapters share validation, duplicate detection and the publication boundary.
async function collectProfiles(folders, adapter) {
  const students = [], assets = [];
  const ids = new Set(), emails = new Set();
  let total = 0;
  if (folders.length > 300) throw new Error("Students: too many folders (maximum 300)");
  for (const folder of folders.sort((a, b) => a.name.localeCompare(b.name))) {
    const files = await adapter.list(folder.id);
    const profiles = files.filter((f) => f.name === "profile.txt" || f.name === "Profile");
    if (!profiles.length) continue;
    if (profiles.length !== 1) throw new Error(`${folder.name}: keep exactly one Profile document or profile.txt`);
    if (ids.has(folder.name)) throw new Error(`${folder.name}: duplicate student folder`);
    ids.add(folder.name);
    const meta = profiles[0];
    if (meta.mimeType?.startsWith("application/vnd.google-apps.") && meta.mimeType !== documentType) throw new Error(`${folder.name}: profile shortcuts and non-text Google files are not supported`);
    const data = meta.mimeType === documentType ? await adapter.exportText(meta, maxText) : await adapter.download(meta, maxText);
    const student = parseProfile(data.toString("utf8"), folder.name);
    if (!student) continue;
    if (student.email && emails.has(student.email.toLowerCase())) throw new Error(`${folder.name}: duplicate student email`);
    if (student.email) emails.add(student.email.toLowerCase());
    const { photoFilename, ...profile } = student;
    if (photoFilename) {
      const matches = files.filter((f) => f.name === photoFilename);
      if (matches.length !== 1) throw new Error(`${folder.name}: expected exactly one ${photoFilename}; finish uploading before publishing`);
      if (matches[0].mimeType?.startsWith("application/vnd.google-apps.")) throw new Error(`${folder.name}: photo must be an uploaded image, not a shortcut`);
      const bytes = await adapter.download(matches[0], Math.min(maxPhoto, maxTotal - total));
      total += bytes.length;
      const ext = path.extname(photoFilename).toLowerCase();
      validatePhoto(bytes, ext, folder.name);
      const name = `${createHash("sha256").update(bytes).digest("hex").slice(0, 24)}${ext}`;
      assets.push({ name, data: bytes });
      profile.photo = `/media/students/imported/${name}`;
    }
    students.push(profile);
  }
  return { students: students.sort((a, b) => a.order - b.order || a.name.localeCompare(b.name, "en")), assets };
}

export async function collectDriveStudents(folderId, client) {
  if (!/^[\w-]+$/.test(folderId)) throw new Error("Invalid Students Drive folder ID");
  if (!client) {
    const { createDriveAuth, createDriveClient } = await import("./gallery-drive.mjs");
    client = createDriveClient(createDriveAuth(process.env.STUDENTS_DRIVE_SERVICE_ACCOUNT || process.env.GALLERY_DRIVE_SERVICE_ACCOUNT));
  }
  const folder = await client.folder(folderId);
  if (folder.mimeType !== folderType || folder.trashed) throw new Error("Students Drive folder is unavailable");
  return collectProfiles((await client.list(folderId)).filter((f) => f.mimeType === folderType), client);
}

export async function collectLocalStudents(source) {
  const root = await realpath(source);
  const folders = (await readdir(root, { withFileTypes: true })).filter((f) => f.isDirectory()).map((f) => ({ name: f.name, id: path.join(root, f.name) }));
  return collectProfiles(folders, {
    async list(dir) {
      const resolved = await realpath(dir);
      if (!isWithin(root, resolved)) throw new Error("Student folder is outside source");
      return (await readdir(resolved, { withFileTypes: true })).filter((f) => !f.isDirectory()).map((f) => ({ name: f.name, id: path.join(resolved, f.name), parent: resolved }));
    },
    async download(file, limit) {
      const resolved = await realpath(file.id);
      if (!isWithin(file.parent, resolved)) throw new Error("Student file is outside its folder");
      const info = await stat(resolved);
      if (!info.isFile() || info.size > limit) throw new Error(`${file.name}: exceeds the download size limit or is not a regular file`);
      const data = await readFile(resolved);
      if (data.length > limit) throw new Error(`${file.name}: exceeds the download size limit`);
      return data;
    },
  });
}

export async function writeStudentsImport({ students, assets }, destination = project) {
  const media = path.join(destination, "public/media/students/imported");
  const manifest = path.join(destination, "src/data/studentsImported.json");
  await mkdir(media, { recursive: true });
  await mkdir(path.dirname(manifest), { recursive: true });
  for (const asset of assets) {
    if (!/^[a-f0-9]{24}\.(jpg|jpeg|png|webp)$/.test(asset.name)) throw new Error("Invalid student asset name");
    await writeFile(path.join(media, asset.name), asset.data);
  }
  await writeFile(`${manifest}.tmp`, `${JSON.stringify({ synced: true, students }, null, 2)}\n`, "utf8");
  await rename(`${manifest}.tmp`, manifest);
  // Remove only importer-owned files after the new manifest is safely installed.
  const retained = new Set(assets.map((a) => a.name));
  for (const file of await readdir(media, { withFileTypes: true })) {
    if (file.isFile() && /^[a-f0-9]{24}\.(jpg|jpeg|png|webp)$/.test(file.name) && !retained.has(file.name)) await unlink(path.join(media, file.name));
  }
}

async function main() {
  const config = JSON.parse(await readFile(path.join(project, "config/students-source.json"), "utf8"));
  const drive = process.argv[2] === "--drive" || (!process.argv[2] && process.env.STUDENTS_SYNC_MODE === "google-drive-api");
  const source = drive ? null : process.argv[2] || process.env.STUDENTS_SOURCE_DIR;
  if (!drive && !source) { console.log("Students: sync is not enabled; keeping the checked-in profiles."); return; }
  if (source && /^https?:/i.test(source)) throw new Error("Use --drive for Google Drive; a local import requires a folder path");
  const result = drive ? await collectDriveStudents(config.folderId) : await collectLocalStudents(source);
  await writeStudentsImport(result);
  console.log(`Students: imported ${result.students.length} published profiles and ${result.assets.length} portraits. Source files unchanged.`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch((error) => { console.error(`Students import failed: ${error.message}`); process.exitCode = 1; });
}
