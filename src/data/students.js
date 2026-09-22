import archive from "./studentsArchive.json";
import imported from "./studentsImported.json";

const profiles = (imported.synced ? imported.students : archive)
  .map((profile) => ({ ...profile, status: profile.status || "current" }));

// Once synced, Drive is authoritative: removed/draft profiles must not reappear.
export const students = profiles
  .filter((profile) => profile.status === "current")
  .slice().sort((a, b) => (a.order || 0) - (b.order || 0) || a.name.localeCompare(b.name, "en"));

export const alumni = profiles
  .filter((profile) => profile.status === "alumni")
  .slice().sort((a, b) => Number(b.graduationYear || 0) - Number(a.graduationYear || 0)
    || (a.order || 0) - (b.order || 0)
    || a.name.localeCompare(b.name, "en"));

export const studentGroups = [
  { id: "phd", title: "Ph.D. Students", degree: "Ph.D. Student" },
  { id: "integrated", title: "Integrated M.S.–Ph.D. Students", degree: "Integrated M.S.–Ph.D. Student" },
  { id: "ms", title: "M.S. Students", degree: "M.S. Student" },
  { id: "undergraduate", title: "Undergraduate Students", degree: "Undergraduate Researcher" },
];
