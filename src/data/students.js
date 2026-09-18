import archive from "./studentsArchive.json";
import imported from "./studentsImported.json";

// Once synced, Drive is authoritative: removed/draft profiles must not reappear.
export const students = (imported.synced ? imported.students : archive)
  .slice().sort((a, b) => (a.order || 0) - (b.order || 0) || a.name.localeCompare(b.name, "en"));

export const studentGroups = [
  { id: "phd", title: "Ph.D. Students", degree: "Ph.D. Student" },
  { id: "integrated", title: "Integrated M.S.–Ph.D. Students", degree: "Integrated M.S.–Ph.D. Student" },
  { id: "ms", title: "M.S. Students", degree: "M.S. Student" },
  { id: "undergraduate", title: "Undergraduate Students", degree: "Undergraduate Researcher" },
];
