import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { extensions, isWithin, validatePost } from "./sync-gallery.mjs";

const project = fileURLToPath(new URL("../", import.meta.url));

export async function exportGalleryArchive(destination) {
  const archive = JSON.parse(await readFile(path.join(project, "src/data/galleryArchive.json"), "utf8"));
  // Refuse to overwrite a folder that the user may already have edited.
  await mkdir(path.dirname(destination), { recursive: true });
  await mkdir(destination);
  let photos = 0;
  let videos = 0;
  for (const { id, media, ...content } of archive) {
    validatePost(content, id);
    const dir = path.join(destination, id);
    await mkdir(dir);
    const post = { published: true, ...content, youtube: [], mediaAlt: {} };
    let number = 0;
    let seenYouTube = false;
    for (const item of media) {
      if (item.type === "youtube") {
        seenYouTube = true;
        post.youtube.push(item.videoId);
        post.mediaAlt[item.videoId] = item.alt;
        videos++;
      } else {
        if (seenYouTube) throw new Error(`${id}: exporter requires local media before YouTube links`);
        const source = path.join(project, "public", item.src);
        const ext = path.extname(source).toLowerCase();
        if (!isWithin(path.join(project, "public/media/news/archive"), source) || extensions.get(ext) !== item.type) throw new Error(`${id}: unsupported archive asset`);
        const filename = `${String(++number).padStart(2, "0")}${ext}`;
        await copyFile(source, path.join(dir, filename));
        post.mediaAlt[filename] = item.alt;
        photos++;
      }
    }
    validatePost(post, id);
    await writeFile(path.join(dir, "post.json"), `${JSON.stringify(post, null, 2)}\n`, { encoding: "utf8", flag: "wx" });
  }
  return { posts: archive.length, photos, youtube: videos };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const destination = path.resolve(process.argv[2] || path.join(project, "exports/gallery-drive-upload"));
  exportGalleryArchive(destination).then((counts) => console.log(JSON.stringify({ destination, ...counts })))
    .catch((error) => { console.error(error.message); process.exitCode = 1; });
}
