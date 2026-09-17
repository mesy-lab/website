export function mergeGalleryPosts(archive, imported) {
  const posts = new Map(archive.map((post) => [post.id, post]));
  for (const post of imported) posts.set(post.id, post);
  return [...posts.values()].sort((a, b) => b.date.localeCompare(a.date));
}
