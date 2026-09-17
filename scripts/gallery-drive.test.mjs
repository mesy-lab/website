import test from "node:test";
import assert from "node:assert/strict";
import { collectDriveGallery, createDriveAuth, createDriveClient } from "./gallery-drive.mjs";

const folderType = "application/vnd.google-apps.folder";
const auth = { getAccessToken: async () => ({ token: "test-only" }) };
const published = { published: true, title: "Lab event", date: "2022-03-04", category: "news", youtube: ["NLL3g8xb5E8"] };

test("requires explicit service credentials and uses read-only scope", () => {
  assert.throws(() => createDriveAuth(""), /Missing/);
  assert.throws(() => createDriveAuth("bad-json"), /valid/);
  assert.throws(() => createDriveAuth('{}'), /Invalid/);
  const client = createDriveAuth(JSON.stringify({ type: "service_account", client_email: "fixture@example.test", private_key: "not-a-real-key" }));
  assert.deepEqual(client.scopes, ["https://www.googleapis.com/auth/drive.readonly"]);
});

test("lists only the requested folder with pagination", async () => {
  const requests = [];
  const client = createDriveClient(auth, async (url, options) => {
    requests.push({ url, options });
    return Response.json(requests.length === 1 ? { files: [{ id: "one" }], nextPageToken: "next" } : { files: [{ id: "two" }] });
  });
  assert.deepEqual(await client.list("root"), [{ id: "one" }, { id: "two" }]);
  assert.equal(requests[0].url.searchParams.get("q"), "'root' in parents and trashed = false");
  assert.equal(requests[1].url.searchParams.get("pageToken"), "next");
  assert.equal(requests[0].url.origin, "https://www.googleapis.com");
  assert.equal(requests[0].options.headers.Authorization, "Bearer test-only");
});

test("stops on incomplete listings, request failures and oversize downloads", async () => {
  await assert.rejects(createDriveClient(auth, async () => Response.json({ files: [], incompleteSearch: true })).list("root"), /incomplete/);
  await assert.rejects(createDriveClient(auth, async () => new Response("private", { status: 403 })).list("root"), /HTTP 403/);
  await assert.rejects(createDriveClient(auth, async () => Response.json({ files: [], nextPageToken: "same" })).list("root"), /repeated/);
  const client = createDriveClient(auth, async () => new Response("123456"));
  await assert.rejects(client.download({ id: "file", name: "photo.jpg", size: "100" }, 5), /size limit/);
  await assert.rejects(client.download({ id: "file", name: "photo.jpg" }, 5), /size limit/);
});

function fixture() {
  const downloads = [];
  const data = {
    root: [{ id: "post", name: "lab-event", mimeType: folderType }, { id: "draft", name: "draft", mimeType: folderType }],
    post: [{ id: "meta", name: "post.json", mimeType: "application/json" }, { id: "image", name: "01.jpg", mimeType: "image/jpeg" }, { id: "shortcut", name: "02.jpg", mimeType: "application/vnd.google-apps.shortcut" }],
    draft: [{ id: "draft-meta", name: "post.json", mimeType: "application/json" }, { id: "private-photo", name: "secret.jpg", mimeType: "image/jpeg" }],
  };
  return { data, downloads, client: {
    folder: async () => ({ mimeType: folderType }),
    list: async (id) => data[id],
    download: async (file) => {
      downloads.push(file.id);
      return Buffer.from(file.id === "meta" ? JSON.stringify(published) : file.id === "draft-meta" ? '{"published":false}' : "image fixture");
    },
  } };
}

test("imports published post media without fetching drafts or resolving shortcuts", async () => {
  const { client, downloads } = fixture();
  const result = await collectDriveGallery("root", [], client);
  assert.equal(result.posts.length, 1);
  assert.deepEqual(result.posts[0].media.map((item) => item.type), ["image", "youtube"]);
  assert.equal(result.assets.length, 1);
  assert.equal(result.assets[0].data.toString(), "image fixture");
  assert.ok(!downloads.includes("private-photo"));
  assert.ok(!downloads.includes("shortcut"));
  assert.match(result.assets[0].name, /^[a-f0-9]{20}\.jpg$/);
});

test("fails on duplicate metadata, IDs and inaccessible roots instead of clearing content", async () => {
  const first = fixture();
  first.data.post.push({ id: "second-meta", name: "post.json" });
  await assert.rejects(collectDriveGallery("root", [], first.client), /duplicate post.json/);
  await assert.rejects(collectDriveGallery("root", ["lab-event"], fixture().client), /Duplicate post ID/);
  const duplicate = fixture();
  duplicate.data.root.push({ id: "second-post", name: "lab-event", mimeType: folderType });
  duplicate.data["second-post"] = duplicate.data.post;
  await assert.rejects(collectDriveGallery("root", [], duplicate.client), /Duplicate post ID/);
  const other = fixture();
  other.client.folder = async () => ({ mimeType: "image/jpeg" });
  await assert.rejects(collectDriveGallery("root", [], other.client), /not an available folder/);
});
