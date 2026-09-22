import { mkdir, readFile, copyFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const project = fileURLToPath(new URL("../", import.meta.url));

export async function exportStudentTemplates(destination) {
  const archive = JSON.parse(await readFile(path.join(project, "src/data/studentsArchive.json"), "utf8"));
  await mkdir(path.dirname(destination), { recursive: true });
  await mkdir(destination); // Never overwrite student-authored edits.
  await copyFile(path.join(project, "docs/students-guide.md"), path.join(destination, "Students-작성안내.md"));
  for (const student of archive) {
    const folder = path.join(destination, student.id);
    await mkdir(folder);
    const profile = [
      "published: false", "status: current", `name: ${student.name}`, "nameKo:", `level: ${student.level}`,
      `email: ${student.email}`, "photo:", `research: ${student.research.join("; ")}`, `order: ${student.order}`,
      "graduationYear:", "affiliation:", "---",
      `${student.name} received the B.S. degree in [DEGREE] from [UNIVERSITY], [CITY], [COUNTRY], in [YEAR].`,
      "", "[NAME] is currently pursuing the M.S. degree in mechanical engineering at Hanyang University, ERICA Campus, South Korea. [NAME]'s research interests include [RESEARCH INTERESTS].", "",
    ].join("\n");
    await writeFile(path.join(folder, "profile.txt"), profile, { encoding: "utf8", flag: "wx" });
  }
  return archive.length;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const destination = path.resolve(process.argv[2] || path.join(project, "exports/students-drive-upload"));
  exportStudentTemplates(destination).then((count) => console.log(`Prepared ${count} unpublished member templates in ${destination}`))
    .catch((error) => { console.error(error.message); process.exitCode = 1; });
}
