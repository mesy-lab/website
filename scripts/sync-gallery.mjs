import { createHash } from "node:crypto";
import { copyFile, mkdir, readFile, readdir, realpath, rename, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const project = fileURLToPath(new URL("../", import.meta.url));
const categories = new Set(["news", "publication", "award", "conference", "lab-life"]);
export const extensions = new Map([[".jpg", "image"], [".jpeg", "image"], [".png", "image"], [".webp", "image"], [".mp4", "video"], [".webm", "video"]]);
export function isWithin(root, filename) {
  const relative = path.relative(root, filename);
  return relative !== ".." && !relative.startsWith(`..${path.sep}`) && !path.isAbsolute(relative);
}
function validDate(value) {
  return typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value) &&
    !Number.isNaN(Date.parse(value)) && new Date(value).toISOString().slice(0, 10) === value;
}
export function validatePost(post, id) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id)) throw new Error(`Use a lowercase ASCII folder name: ${id}`);
  if (!validDate(post.date)) throw new Error(`${id}: date must be a real YYYY-MM-DD date`);
  if (post.endDate && (!validDate(post.endDate) || post.endDate < post.date)) throw new Error(`${id}: invalid endDate`);
  if (typeof post.title !== "string" || !post.title.trim()) throw new Error(`${id}: title is required`);
  if (!categories.has(post.category)) throw new Error(`${id}: invalid category`);
  if (post.body !== undefined && typeof post.body !== "string") throw new Error(`${id}: body must be text`);
  if (post.sourceUrl && !/^https:\/\//.test(post.sourceUrl)) throw new Error(`${id}: sourceUrl must use HTTPS`);
  if (post.youtube !== undefined && (!Array.isArray(post.youtube) || post.youtube.some((id) => typeof id !== "string" || !/^[\w-]{11}$/.test(id)))) throw new Error(`${id}: youtube must be an array of 11-character video IDs`);
}

// Build the entire import in memory first: a bad folder cannot replace the last good manifest.
export async function collectGallery(source, existingIds = []) {
  const root = await realpath(source);
  const posts = [];
  const assets = [];
  for (const folder of (await readdir(root, { withFileTypes: true })).sort((a, b) => a.name.localeCompare(b.name))) {
    if (!folder.isDirectory()) continue;
    const dir = await realpath(path.join(root, folder.name));
    if (!isWithin(root, dir)) throw new Error(`Folder outside source: ${folder.name}`);
    let post;
    try {
      const metadataPath = await realpath(path.join(dir, "post.json"));
      if (!isWithin(dir, metadataPath)) throw new Error(`${folder.name}: metadata outside post folder`);
      post = JSON.parse((await readFile(metadataPath, "utf8")).replace(/^\uFEFF/, ""));
    } catch (error) {
      if (error.code === "ENOENT") continue;
      throw new Error(`${folder.name}: ${error.message}`);
    }
    if (post.published !== true) continue;
    validatePost(post, folder.name);
    if (existingIds.includes(folder.name)) throw new Error(`Duplicate archive ID: ${folder.name}`);
    const media = [];
    for (const file of (await readdir(dir, { withFileTypes: true })).sort((a, b) => a.name.localeCompare(b.name, "en", { numeric: true }))) {
      const ext = path.extname(file.name).toLowerCase();
      if (!extensions.has(ext)) continue;
      const filename = await realpath(path.join(dir, file.name));
      if (!isWithin(dir, filename)) throw new Error(`${folder.name}: media outside post folder`);
      const info = await stat(filename);
      if (!info.isFile()) continue;
      if (info.size > 50 * 1024 * 1024) throw new Error(`${folder.name}/${file.name}: exceeds 50 MB; compress or use YouTube`);
      const digest = createHash("sha256").update(await readFile(filename)).digest("hex").slice(0, 20);
      const outputName = `${digest}${ext}`;
      assets.push({ source: filename, name: outputName });
      media.push({ type: extensions.get(ext), src: `/media/news/imported/${outputName}`, alt: `${post.title} - ${file.name}` });
    }
    for (const videoId of post.youtube || []) media.push({ type: "youtube", videoId, alt: post.title });
    posts.push({ id: folder.name, date: post.date, ...(post.endDate ? { endDate: post.endDate } : {}), title: post.title.trim(), category: post.category, body: post.body || "", ...(post.sourceUrl ? { sourceUrl: post.sourceUrl } : {}), media });
  }
  return { posts: posts.sort((a, b) => b.date.localeCompare(a.date)), assets };
}

async function main() {
  const config = JSON.parse(await readFile(path.join(project, "config/gallery-source.json"), "utf8"));
  const driveMode = process.argv[2] === "--drive" || (!process.argv[2] && process.env.GALLERY_SYNC_MODE === "google-drive-api");
  const source = driveMode ? null : process.argv[2] || process.env.GALLERY_SOURCE_DIR;
  if (!source && !driveMode) {
    console.log("Gallery: sync is not enabled; keeping the checked-in content.");
    console.log(`Registered Drive folder: ${config.folderUrl}`);
    console.log("Cloud sync requires --drive (or GALLERY_SYNC_MODE=google-drive-api) and GALLERY_DRIVE_SERVICE_ACCOUNT credentials.");
    return;
  }
  if (source && /^https?:\/\//i.test(source)) throw new Error("For Google Drive, use --drive. For desktop sync, use a local folder path.");
  const archive = JSON.parse(await readFile(path.join(project, "src/data/galleryArchive.json"), "utf8"));
  const existingIds = archive.map((post) => post.id);
  const { posts, assets } = driveMode
    ? await (await import("./gallery-drive.mjs")).collectDriveGallery(config.folderId, existingIds)
    : await collectGallery(source, existingIds);
  const destination = path.join(project, "public/media/news/imported");
  await mkdir(destination, { recursive: true });
  for (const asset of assets) {
    if (asset.data) await writeFile(path.join(destination, asset.name), asset.data);
    else await copyFile(asset.source, path.join(destination, asset.name));
  }
  const manifest = path.join(project, "src/data/galleryImported.json");
  await writeFile(`${manifest}.tmp`, `${JSON.stringify(posts, null, 2)}\n`, "utf8");
  await rename(`${manifest}.tmp`, manifest);
  console.log(`Gallery: imported ${posts.length} published posts and ${assets.length} media files. Source files unchanged.`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch((error) => { console.error(`Gallery import failed: ${error.message}`); process.exitCode = 1; });
}
