import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, readFile, readdir } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { exportGalleryArchive } from "./export-gallery-drive.mjs";
import { checkExpectedMedia, collectGallery, validatePost } from "./sync-gallery.mjs";
import { collectDriveGallery } from "./gallery-drive.mjs";
import { mergeGalleryPosts } from "../src/data/gallery-posts.js";

const project = fileURLToPath(new URL("../", import.meta.url));
const archive = JSON.parse(await readFile(path.join(project, "src/data/galleryArchive.json"), "utf8"));

test("ten upload folders round-trip through local and Drive import without changing content or photo bytes", async () => {
  const temp = await mkdtemp(path.join(os.tmpdir(), "mesy-gallery-export-"));
  const destination = path.join(temp, "upload");
  assert.deepEqual(await exportGalleryArchive(destination), { posts: 10, photos: 15, youtube: 2 });
  const folders = await readdir(destination);
  assert.equal(folders.length, 10);
  await assert.rejects(exportGalleryArchive(destination), { code: "EEXIST" });
  const local = await collectGallery(destination);
  const folderType = "application/vnd.google-apps.folder";
  const drive = await collectDriveGallery("root", [], {
    folder: async () => ({ mimeType: folderType }),
    list: async (id) => id === "root"
      ? folders.map((name) => ({ id: name, name, mimeType: folderType }))
      : (await readdir(path.join(destination, id))).reverse().map((name) => ({ id: path.join(id, name), name, mimeType: name.endsWith(".json") ? "application/json" : "image/jpeg" })),
    download: async (file) => readFile(path.join(destination, file.id)),
  });
  assert.deepEqual(drive.posts, local.posts);
  assert.equal(local.assets.length, 15);
  const merged = mergeGalleryPosts(archive, drive.posts);
  assert.equal(merged.length, 10);
  assert.deepEqual(merged.map((post) => post.id), archive.map((post) => post.id));
  for (let i = 0; i < archive.length; i++) {
    const { media: originalMedia, ...original } = archive[i];
    const { media: importedMedia, ...imported } = merged[i];
    assert.deepEqual(imported, original);
    assert.equal(importedMedia.length, originalMedia.length);
    for (let j = 0; j < originalMedia.length; j++) {
      const { src: oldSrc, ...oldItem } = originalMedia[j];
      const { src: newSrc, ...newItem } = importedMedia[j];
      assert.deepEqual(newItem, oldItem);
      if (oldSrc) {
        const name = path.basename(newSrc);
        const expectedBytes = await readFile(path.join(project, "public", oldSrc));
        assert.deepEqual(drive.assets.find((asset) => asset.name === name).data, expectedBytes);
        assert.deepEqual(await readFile(local.assets.find((asset) => asset.name === name).source), expectedBytes);
      }
    }
  }
});

test("partial uploads replace matching archive items once and retain the remaining fallback", () => {
  const updated = { ...archive[0], title: "Updated on Drive" };
  const posts = mergeGalleryPosts(archive, [updated]);
  assert.equal(posts.length, 10);
  assert.equal(posts[0].title, updated.title);
  assert.deepEqual(posts.slice(1), archive.slice(1));
  assert.deepEqual(mergeGalleryPosts(archive, []), archive);
});

test("rejects invalid media alternative text", () => {
  for (const mediaAlt of [null, [], "bad", { "01.jpg": 12 }]) {
    assert.throws(() => validatePost({ ...archive[0], mediaAlt }, archive[0].id), /mediaAlt/);
  }
});

test("blocks incomplete or duplicated export photos before changing the visible content", () => {
  const post = { mediaAlt: { "01.jpg": "First photo", "02.png": "Second photo", NLL3g8xb5E8: "Video" } };
  assert.throws(() => checkExpectedMedia(post, ["01.jpg"], "event"), /02.png/);
  assert.throws(() => checkExpectedMedia(post, ["01.jpg", "01.jpg", "02.png"], "event"), /01.jpg/);
  assert.doesNotThrow(() => checkExpectedMedia(post, ["01.jpg", "02.png"], "event"));
});
