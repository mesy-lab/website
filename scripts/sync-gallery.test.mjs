import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, mkdir, writeFile, readFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { collectGallery, isWithin, validatePost } from "./sync-gallery.mjs";

const post = { published: true, title: "Lab meeting", date: "2022-03-04", category: "lab-life", body: "Our lab." };
test("registered Drive source preserves the selected folder ID and cloud mode", async () => {
  const config = JSON.parse(await readFile(new URL("../config/gallery-source.json", import.meta.url), "utf8"));
  assert.equal(config.folderId, "1Gu3HzY7zMQYlBWwYUgJ8juNDqVsgCAC_");
  assert.equal(new URL(config.folderUrl).pathname, `/drive/folders/${config.folderId}`);
  assert.equal(config.mode, "google-drive-api");
});

test("validates dates, IDs, categories and video IDs", () => {
  assert.doesNotThrow(() => validatePost(post, "lab-meeting"));
  for (const bad of [{ date: "2022-02-30" }, { endDate: "2022-01-01" }, { title: "" }, { category: "unknown" }, { youtube: ["bad"] }, { sourceUrl: "javascript:alert(1)" }]) {
    assert.throws(() => validatePost({ ...post, ...bad }, "lab-meeting"));
  }
  assert.throws(() => validatePost(post, "../outside"));
  assert.equal(isWithin(path.resolve("root"), path.resolve("root/file.jpg")), true);
  assert.equal(isWithin(path.resolve("root"), path.resolve("root-other/file.jpg")), false);
});

test("imports only published posts, naturally orders media, and leaves source intact", async () => {
  const root = await mkdtemp(path.join(os.tmpdir(), "mesy-gallery-test-"));
  for (const name of ["lab-meeting", "draft", "no-metadata"]) await mkdir(path.join(root, name));
  const metadata = JSON.stringify({ ...post, youtube: ["NLL3g8xb5E8"] });
  await writeFile(path.join(root, "lab-meeting/post.json"), metadata);
  await writeFile(path.join(root, "draft/post.json"), JSON.stringify({ ...post, published: false }));
  await writeFile(path.join(root, "lab-meeting/10.mp4"), "test video fixture");
  await writeFile(path.join(root, "lab-meeting/02.jpg"), "test image fixture");
  const result = await collectGallery(root);
  assert.equal(result.posts.length, 1);
  assert.deepEqual(result.posts[0].media.map((item) => item.type), ["image", "video", "youtube"]);
  assert.match(result.posts[0].media[0].src, /^\/media\/news\/imported\/[a-f0-9]{20}\.jpg$/);
  assert.equal(await readFile(path.join(root, "lab-meeting/post.json"), "utf8"), metadata);
  assert.equal(result.assets.length, 2);
  assert.deepEqual(await collectGallery(root), result);
  await assert.rejects(collectGallery(root, ["lab-meeting"]), /Duplicate/);
  await writeFile(path.join(root, "lab-meeting/post.json"), "bad json");
  await assert.rejects(collectGallery(root), /lab-meeting/);
});

test("archive has ten dated posts, fifteen local photos and two verified video IDs", async () => {
  const archive = JSON.parse(await readFile(new URL("../src/data/galleryArchive.json", import.meta.url), "utf8"));
  assert.equal(archive.length, 10);
  assert.equal(new Set(archive.map((item) => item.id)).size, 10);
  assert.ok(archive.every((item) => item.date <= "2022-12-31"));
  const media = archive.flatMap((item) => item.media);
  assert.equal(media.filter((item) => item.type === "image").length, 15);
  assert.deepEqual(media.filter((item) => item.type === "youtube").map((item) => item.videoId), ["NLL3g8xb5E8", "lJQMOdQA9go"]);
  for (const item of media.filter((item) => item.type === "image")) {
    assert.ok((await readFile(new URL(`../public${item.src}`, import.meta.url))).length > 0);
  }
});
