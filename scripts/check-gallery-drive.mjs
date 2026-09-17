import { JWT } from "google-auth-library";
import path from "node:path";
import { fileURLToPath } from "node:url";

const folderType = "application/vnd.google-apps.folder";

// Metadata-only check. Never return credentials, filenames, or response bodies to CI logs.
export async function checkGalleryConnection({ rawCredentials, folderId, expectedEmail, fetcher = fetch, makeAuth = (options) => new JWT(options) }) {
  let credentials;
  try { credentials = JSON.parse(rawCredentials); } catch { throw new Error("The GitHub secret is missing or is not valid JSON."); }
  if (credentials?.type !== "service_account" || !credentials.private_key || credentials.client_email !== expectedEmail) {
    throw new Error("The secret must belong to the expected Gallery service account.");
  }
  if (!/^[\w-]+$/.test(folderId)) throw new Error("Invalid configured folder ID.");
  let token;
  try {
    const auth = makeAuth({ email: credentials.client_email, key: credentials.private_key, scopes: ["https://www.googleapis.com/auth/drive.metadata.readonly"] });
    token = (await auth.getAccessToken()).token;
  } catch { throw new Error("Google authentication failed. Check the JSON key and whether it is still enabled."); }
  if (!token) throw new Error("Google did not return an access token.");

  async function get(resource, params) {
    const url = new URL(`https://www.googleapis.com/drive/v3/${resource}`);
    url.search = new URLSearchParams(params).toString();
    let response;
    try { response = await fetcher(url, { headers: { Authorization: `Bearer ${token}` }, signal: AbortSignal.timeout(60000), redirect: "error" }); }
    catch { throw new Error("Could not reach Google Drive; no site changes were made."); }
    if (!response.ok) throw new Error(`Google Drive returned HTTP ${response.status}. Check Drive API activation and Viewer access to the Gallery folder.`);
    try { return await response.json(); } catch { throw new Error("Google Drive returned an invalid response."); }
  }

  const root = await get(`files/${encodeURIComponent(folderId)}`, { fields: "mimeType,trashed", supportsAllDrives: "true" });
  if (root.mimeType !== folderType || root.trashed) throw new Error("The selected Gallery folder is unavailable.");
  let items = 0;
  let postFolders = 0;
  let pageToken;
  const seen = new Set();
  do {
    const page = await get("files", {
      q: `'${folderId}' in parents and trashed = false`,
      fields: "nextPageToken,incompleteSearch,files(mimeType)", pageSize: "1000",
      supportsAllDrives: "true", includeItemsFromAllDrives: "true", ...(pageToken ? { pageToken } : {}),
    });
    if (page.incompleteSearch || !Array.isArray(page.files)) throw new Error("Google Drive returned an incomplete listing.");
    items += page.files.length;
    postFolders += page.files.filter((file) => file.mimeType === folderType).length;
    pageToken = page.nextPageToken;
    if (pageToken && seen.has(pageToken)) throw new Error("Google Drive returned a repeated page token.");
    if (pageToken) seen.add(pageToken);
  } while (pageToken);
  return { items, postFolders };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  checkGalleryConnection({
    rawCredentials: process.env.GALLERY_DRIVE_SERVICE_ACCOUNT,
    folderId: process.env.GALLERY_DRIVE_FOLDER_ID,
    expectedEmail: process.env.GALLERY_DRIVE_EXPECTED_EMAIL,
  }).then(({ items, postFolders }) => {
    console.log("PASS: Google authentication and Gallery folder access verified.");
    console.log(`Folder items: ${items}; immediate subfolders: ${postFolders}.`);
    console.log("No media downloaded, no Drive files changed, no website deployed.");
  }).catch((error) => { console.error(`Gallery connection check failed: ${error.message}`); process.exitCode = 1; });
}
