import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { collectDriveStudents, collectLocalStudents, parseProfile, writeStudentsImport } from "./sync-students.mjs";
import { createDriveClient } from "./gallery-drive.mjs";
import { exportStudentTemplates } from "./export-students-drive.mjs";

const folderType = "application/vnd.google-apps.folder";
const docType = "application/vnd.google-apps.document";
const portrait = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+aMioAAAAASUVORK5CYII=', 'base64');
const profile = (overrides = {}) => {
  const fields = { published: "true", name: "Example Student", nameKo: "예시", level: "ms", email: "student@example.test", photo: "photo.png", research: "Mechanism design; Robot systems", order: "2", ...overrides };
  return Object.entries(fields).map(([k,v])=>`${k}: ${v}`).join("\n") + "\n---\nExample Student is pursuing a graduate degree.\n\nThe student's research focuses on robot mechanisms.\n";
};
function fixture(text = profile()) {
  const reads = [];
  const files = {
    root: [{ id: "student", name: "example-student", mimeType: folderType }, { id: "draft", name: "draft", mimeType: folderType }],
    student: [{ id: "meta", name: "Profile", mimeType: docType }, { id: "photo", name: "photo.png", mimeType: "image/png" }, { id: "unselected", name: "private.png", mimeType: "image/png" }],
    draft: [{ id: "draft-meta", name: "profile.txt", mimeType: "text/plain" }, { id: "private", name: "photo.png", mimeType: "image/png" }],
  };
  return { files, reads, client: {
    folder: async () => ({mimeType:folderType}),
    list: async (id) => files[id],
    exportText: async (file) => { reads.push(file.id); return Buffer.from(text); },
    download: async (file) => { reads.push(file.id); return file.id === "draft-meta" ? Buffer.from(profile({ published: "false" })) : portrait; },
  }};
}

test("parses Unicode and paragraphs, supports all degree groups and explicit drafts", () => {
  for (const level of ["phd", "integrated", "ms", "undergraduate"]) {
    const data = parseProfile("\uFEFF" + profile({ level }).replace(/\n/g, "\r\n"), "example-student");
    assert.equal(data.level, level);
    assert.equal(data.nameKo, "예시");
    assert.deepEqual(data.research, ["Mechanism design", "Robot systems"]);
    assert.match(data.biography, /\n\n/);
  }
  assert.equal(parseProfile("published: false\n---\n", "draft"), null);
});

test("rejects typos, invalid fields, placeholders and traversal instead of publishing incomplete data", () => {
  for (const change of [{published:"yes"}, {level:"masters"}, {photo:"../photo.png"}, {photo:"https://example.test/a.png"}, {email:"x@example.test?bcc=x"}, {name:""}, {order:"-1"}]) {
    assert.throws(()=>parseProfile(profile(change),"example-student"));
  }
  assert.throws(()=>parseProfile(profile().replace("---", "name: Duplicate\n---"),"example-student"), /duplicate/);
  assert.throws(()=>parseProfile(profile({publish:"true"}),"example-student"), /unknown/);
  assert.throws(()=>parseProfile(profile().split("---")[0]+"---\n[NAME] from [UNIVERSITY]", "example-student"), /template/);
  assert.throws(()=>parseProfile(profile().split("---")[0]+"---\nStudies robotics in [CITY], [COUNTRY].", "example-student"), /template/);
  assert.throws(()=>parseProfile(profile(),"../escape"));
});

test("Drive reads Google Docs and only published portraits; drafts and extra files stay unread", async () => {
  const {client, reads}=fixture();
  const result=await collectDriveStudents("root",client);
  assert.equal(result.students.length,1);
  assert.equal(result.students[0].name,"Example Student");
  assert.match(result.students[0].photo,/^\/media\/students\/imported\/[a-f0-9]{24}\.png$/);
  assert.deepEqual(result.assets[0].data,portrait);
  assert.deepEqual(reads,["draft-meta","meta","photo"]);
});

test("Drive rejects duplicate documents, folders, emails, missing photos and shortcuts", async () => {
  const dupe = fixture(); dupe.files.student.push({id:"other",name:"profile.txt"});
  await assert.rejects(collectDriveStudents("root",dupe.client),/exactly one/);
  const folders=fixture(); folders.files.root.push({id:"student",name:"example-student",mimeType:folderType});
  await assert.rejects(collectDriveStudents("root",folders.client),/duplicate student folder/);
  const emails=fixture(); emails.files.root.push({id:"student",name:"another-student",mimeType:folderType});
  await assert.rejects(collectDriveStudents("root",emails.client),/duplicate student email/);
  const missing=fixture(); missing.files.student=missing.files.student.filter(f=>f.id!=="photo");
  await assert.rejects(collectDriveStudents("root",missing.client),/finish uploading/);
  const shortcuts=fixture(); shortcuts.files.student.find(f=>f.id==="photo").mimeType="application/vnd.google-apps.shortcut";
  await assert.rejects(collectDriveStudents("root",shortcuts.client),/not a shortcut/);
  const root=fixture(); root.client.folder=async()=>({mimeType:docType});
  await assert.rejects(collectDriveStudents("root",root.client),/unavailable/);
});

test("Google Docs export requests plain text with read-only bearer auth and a bounded download", async () => {
  let request;
  const client = createDriveClient({getAccessToken:async()=>({token:"test-only"})},async(url,opts)=>{request={url,opts};return new Response("Biography");});
  assert.equal((await client.exportText({id:"doc-id",name:"Profile"},100)).toString(),"Biography");
  assert.equal(request.url.pathname,"/drive/v3/files/doc-id/export");
  assert.equal(request.url.searchParams.get("mimeType"),"text/plain");
  assert.equal(request.opts.headers.Authorization,"Bearer test-only");
  await assert.rejects(client.exportText({id:"doc-id",name:"Profile"},2),/size limit/);
});

test("local import matches Drive content; failures preserve existing manifest; unpublishing removes stale assets", async () => {
  const dir=await mkdtemp(path.join(os.tmpdir(),"mesy-students-test-"));
  const source=path.join(dir,"source"), output=path.join(dir,"output");
  await mkdir(path.join(source,"example-student"),{recursive:true});
  const metadata=path.join(source,"example-student/profile.txt");
  const photo=path.join(source,"example-student/photo.png");
  await writeFile(metadata,profile()); await writeFile(photo,portrait);
  const local=await collectLocalStudents(source);
  assert.deepEqual(local,await collectDriveStudents("root",fixture().client));
  await writeStudentsImport(local,output);
  const manifest=path.join(output,"src/data/studentsImported.json");
  const before=await readFile(manifest,"utf8");
  await writeFile(metadata,profile({photo:"missing.png"}));
  await assert.rejects(collectLocalStudents(source).then(r=>writeStudentsImport(r,output)),/finish uploading/);
  assert.equal(await readFile(manifest,"utf8"),before);
  await writeFile(metadata,profile({published:"false"}));
  await writeStudentsImport(await collectLocalStudents(source),output);
  assert.deepEqual(JSON.parse(await readFile(manifest,"utf8")),{synced:true,students:[]});
  assert.deepEqual(await readdir(path.join(output,"public/media/students/imported")),[]);
  await writeFile(metadata,profile()); await writeFile(photo,"not a PNG");
  await assert.rejects(collectLocalStudents(source),/image extension/);
});

test("starter export has three editable drafts, never invents biographies or overwrites existing files", async () => {
  const root=await mkdtemp(path.join(os.tmpdir(),"mesy-students-export-"));
  const destination=path.join(root,"starter");
  assert.equal(await exportStudentTemplates(destination),3);
  assert.deepEqual(await collectLocalStudents(destination),{students:[],assets:[]});
  const text=await readFile(path.join(destination,"jaeyong-lee/profile.txt"),"utf8");
  assert.match(text,/published: false/);
  assert.match(text,/\[UNIVERSITY\]/);
  await assert.rejects(exportStudentTemplates(destination),{code:"EEXIST"});
});
