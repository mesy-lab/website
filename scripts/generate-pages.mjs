import fs from "node:fs";
import path from "node:path";

const distDir = path.resolve("dist");
const indexFile = path.join(distDir, "index.html");

if (!fs.existsSync(indexFile)) {
  throw new Error("dist/index.html was not found. Run the Vite build first.");
}

const html = fs.readFileSync(indexFile, "utf8");

const routes = ["members", "members/professor", "members/student", "members/alumni", "research", "research/robot-manipulator", "research/lidar-filtering", "research/mechatronics-system-design-control", "research/auto-drive-mobile-robot", "how-we-work", "publications", "publications/international-journal", "publications/domestic-journal", "publications/conference-proceedings", "publications/patents", "projects", "gallery-news", "contact"];

for (const route of routes) {
  const dir = path.join(distDir, route);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), html);
}

// Fallback for any future route that has not yet been added above.
// GitHub Pages serves this file for an unknown path; the React app then
// reads window.location.pathname and renders the matching page when possible.
fs.writeFileSync(path.join(distDir, "404.html"), html);

console.log(`Prepared GitHub Pages routes: ${routes.length} routes + 404 fallback`);
