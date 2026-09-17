import test from "node:test";
import assert from "node:assert/strict";
import { checkGalleryConnection } from "./check-gallery-drive.mjs";

const options = {
  rawCredentials: JSON.stringify({ type: "service_account", client_email: "fixture@example.test", private_key: "fixture-only" }),
  folderId: "gallery-folder", expectedEmail: "fixture@example.test",
  makeAuth: (config) => {
    assert.deepEqual(config.scopes, ["https://www.googleapis.com/auth/drive.metadata.readonly"]);
    return { getAccessToken: async () => ({ token: "fixture-token" }) };
  },
};

test("checks folder metadata and paginated counts without downloading media", async () => {
  const requests = [];
  const result = await checkGalleryConnection({ ...options, fetcher: async (url, init) => {
    requests.push(url);
    assert.equal(init.headers.Authorization, "Bearer fixture-token");
    assert.equal(url.origin, "https://www.googleapis.com");
    assert.equal(url.searchParams.has("alt"), false);
    assert.ok(!url.searchParams.get("fields").includes("name"));
    if (requests.length === 1) return Response.json({ mimeType: "application/vnd.google-apps.folder", trashed: false });
    assert.equal(url.searchParams.get("q"), "'gallery-folder' in parents and trashed = false");
    return Response.json(requests.length === 2 ? { files: [{ mimeType: "text/markdown" }], nextPageToken: "next" } : { files: [{ mimeType: "application/vnd.google-apps.folder" }] });
  } });
  assert.deepEqual(result, { items: 2, postFolders: 1 });
  assert.equal(requests.length, 3);
});

test("rejects missing keys and wrong identities without network calls", async () => {
  const fetcher = () => { throw new Error("Must not call fetch"); };
  await assert.rejects(checkGalleryConnection({ ...options, fetcher, rawCredentials: "" }), /not valid JSON/);
  await assert.rejects(checkGalleryConnection({ ...options, fetcher, expectedEmail: "other@example.test" }), /expected Gallery/);
});

test("does not expose API response bodies or auth errors", async () => {
  await assert.rejects(checkGalleryConnection({ ...options, makeAuth: () => { throw new Error("SECRET VALUE"); } }), { message: "Google authentication failed. Check the JSON key and whether it is still enabled." });
  await assert.rejects(checkGalleryConnection({ ...options, fetcher: async () => new Response("SECRET VALUE", { status: 403 }) }), { message: "Google Drive returned HTTP 403. Check Drive API activation and Viewer access to the Gallery folder." });
});
