import { createHash } from "node:crypto";
import path from "node:path";
import { JWT } from "google-auth-library";
import { extensions, validatePost } from "./sync-gallery.mjs";

const folderType = "application/vnd.google-apps.folder";
const maxFileSize = 50 * 1024 * 1024;
const maxTotalSize = 500 * 1024 * 1024;

export function createDriveAuth(raw = process.env.GALLERY_DRIVE_SERVICE_ACCOUNT) {
  if (!raw) throw new Error("Missing GALLERY_DRIVE_SERVICE_ACCOUNT. Add the service-account JSON as a GitHub Actions secret; do not put it in source code.");
  let credentials;
  try { credentials = JSON.parse(raw); } catch { throw new Error("GALLERY_DRIVE_SERVICE_ACCOUNT must contain valid service-account JSON."); }
  if (credentials?.type !== "service_account" || !credentials.client_email || !credentials.private_key) throw new Error("Invalid service-account credentials.");
  return new JWT({ email: credentials.client_email, key: credentials.private_key, scopes: ["https://www.googleapis.com/auth/drive.readonly"] });
}

export function createDriveClient(auth, fetcher = fetch) {
  async function request(resource, params) {
    const url = new URL(`https://www.googleapis.com/drive/v3/${resource}`);
    url.search = new URLSearchParams(params).toString();
    let token;
    try { token = (await auth.getAccessToken()).token; } catch { throw new Error("Drive authentication failed. Check the service-account secret and its key validity."); }
    if (!token) throw new Error("Drive authentication did not return an access token.");
    let response;
    try {
      response = await fetcher(url, { headers: { Authorization: `Bearer ${token}` }, signal: AbortSignal.timeout(60000), redirect: "error" });
    } catch { throw new Error("Drive request failed or timed out; existing content was not replaced."); }
    if (!response.ok) throw new Error(`Drive request failed (HTTP ${response.status}). Check API activation and Viewer access to the selected folder.`);
    return response;
  }
  return {
    async folder(id) {
      return (await request(`files/${encodeURIComponent(id)}`, { fields: "id,mimeType,trashed", supportsAllDrives: "true" })).json();
    },
    async list(parent) {
      const files = [];
      let pageToken;
      const seen = new Set();
      do {
        const page = await (await request("files", {
          q: `'${parent}' in parents and trashed = false`,
          fields: "nextPageToken,incompleteSearch,files(id,name,mimeType,size)", pageSize: "1000",
          supportsAllDrives: "true", includeItemsFromAllDrives: "true", ...(pageToken ? { pageToken } : {}),
        })).json();
        if (page.incompleteSearch || !Array.isArray(page.files)) throw new Error("Drive returned an incomplete folder listing; import cancelled.");
        files.push(...page.files);
        pageToken = page.nextPageToken;
        if (pageToken && seen.has(pageToken)) throw new Error("Drive returned a repeated page token; import cancelled.");
        if (pageToken) seen.add(pageToken);
      } while (pageToken);
      return files;
    },
    async download(file, limit) {
      if (Number(file.size) > limit) throw new Error(`${file.name}: exceeds the download size limit`);
      const response = await request(`files/${encodeURIComponent(file.id)}`, { alt: "media", supportsAllDrives: "true" });
      const reader = response.body.getReader();
      const chunks = [];
      let size = 0;
      try {
        while (true) {
          const { value, done } = await reader.read();
          if (done) break;
          size += value.length;
          if (size > limit) { await reader.cancel(); throw new Error(`${file.name}: exceeds the download size limit`); }
          chunks.push(Buffer.from(value));
        }
      } finally { reader.releaseLock(); }
      return Buffer.concat(chunks);
    },
  };
}

export async function collectDriveGallery(folderId, existingIds = [], client = createDriveClient(createDriveAuth())) {
  if (!/^[\w-]+$/.test(folderId)) throw new Error("Invalid configured Drive folder ID");
  const root = await client.folder(folderId);
  if (root.mimeType !== folderType || root.trashed) throw new Error("The configured Drive source is not an available folder.");
  const folders = (await client.list(folderId)).filter((file) => file.mimeType === folderType);
  const posts = [];
  const assets = [];
  const ids = new Set(existingIds);
  let totalSize = 0;
  for (const folder of folders.sort((a, b) => a.name.localeCompare(b.name))) {
    const files = await client.list(folder.id);
    const metadata = files.filter((file) => file.name === "post.json");
    if (metadata.length === 0) continue;
    if (metadata.length !== 1) throw new Error(`${folder.name}: duplicate post.json files`);
    let post;
    try { post = JSON.parse((await client.download(metadata[0], 1024 * 1024)).toString("utf8").replace(/^\uFEFF/, "")); }
    catch { throw new Error(`${folder.name}: could not read post.json; upload a valid JSON file, not a Google Docs document.`); }
    if (post?.published !== true) continue;
    validatePost(post, folder.name);
    if (ids.has(folder.name)) throw new Error(`Duplicate post ID: ${folder.name}`);
    ids.add(folder.name);
    const media = [];
    for (const file of files.sort((a, b) => a.name.localeCompare(b.name, "en", { numeric: true }))) {
      const ext = path.extname(file.name).toLowerCase();
      if (!extensions.has(ext) || file.mimeType.startsWith("application/vnd.google-apps.")) continue;
      const data = await client.download(file, Math.min(maxFileSize, maxTotalSize - totalSize));
      totalSize += data.length;
      const name = `${createHash("sha256").update(data).digest("hex").slice(0, 20)}${ext}`;
      assets.push({ name, data });
      media.push({ type: extensions.get(ext), src: `/media/news/imported/${name}`, alt: `${post.title} - ${file.name}` });
    }
    for (const videoId of post.youtube || []) media.push({ type: "youtube", videoId, alt: post.title });
    posts.push({ id: folder.name, date: post.date, ...(post.endDate ? { endDate: post.endDate } : {}), title: post.title.trim(), category: post.category, body: post.body || "", ...(post.sourceUrl ? { sourceUrl: post.sourceUrl } : {}), media });
  }
  return { posts: posts.sort((a, b) => b.date.localeCompare(a.date)), assets };
}
