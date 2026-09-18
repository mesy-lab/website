import React from "react";
import { students, studentGroups } from "../data/students.js";
import "./students-directory.css";

export default function StudentsDirectory({ compact = false, withBase }) {
  const groups = studentGroups.filter((group) => group.id !== "integrated" || students.some((s) => s.level === group.id));
  const Heading = compact ? "h2" : "h1";
  return (
    <section className={`students-page${compact ? " students-page--compact" : ""}`} aria-labelledby="students-title">
      <div className="students-wrap">
        <header className="students-heading">
          <p className="eyebrow">Members / Students</p>
          <Heading id="students-title">Meet our students</Heading>
          <p>The people exploring mechanisms, robotics, and sensing at MESY Lab.</p>
        </header>
        {!compact && <nav className="students-index" aria-label="Student degree programs">
          {groups.map((group) => <a href={`#students-${group.id}`} key={group.id}>{group.title}<span>{students.filter((s) => s.level === group.id).length}</span></a>)}
        </nav>}
        <div className="students-groups">
          {groups.map((group) => {
            const members = students.filter((s) => s.level === group.id);
            return <section id={`students-${group.id}`} className="students-degree-group" key={group.id} aria-labelledby={`students-${group.id}-title`}>
              <div className="students-group-heading"><h2 id={`students-${group.id}-title`}>{group.title}</h2><span>{members.length} {members.length === 1 ? "member" : "members"}</span></div>
              {members.length ? <div className="students-profiles">
                {members.map((student) => <article className="student-profile" key={student.id} aria-labelledby={`student-${student.id}`}>
                  <div className="student-portrait">
                    {student.photo ? <img src={withBase(student.photo)} alt={`Portrait of ${student.name}`} width="496" height="638" loading="lazy" />
                      : <span className="student-initials" aria-label={`${student.name}, portrait unavailable`}>{student.name.split(/\s+/).map((part) => part[0]).slice(0, 2).join("")}</span>}
                  </div>
                  <div className="student-introduction">
                    <p className="student-degree">{group.degree}</p>
                    <h3 id={`student-${student.id}`}>{student.name}{student.nameKo && <span lang="ko">{student.nameKo}</span>}</h3>
                    {student.email && <a className="student-email" href={`mailto:${student.email}`}>{student.email}<span aria-hidden="true">↗</span></a>}
                    {student.biography && <div className="student-biography">{student.biography.split(/\n\s*\n/).filter(Boolean).map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div>}
                    {student.research?.length > 0 && <div className="student-research"><h4>Research interests</h4><ul>{student.research.map((item) => <li key={item}>{item}</li>)}</ul></div>}
                  </div>
                </article>)}
              </div> : <p className="students-empty">No current members listed.</p>}
            </section>;
          })}
        </div>
        {compact && <a className="students-view-all" href={withBase("/members/student")}>Explore student profiles <span aria-hidden="true">→</span></a>}
      </div>
    </section>
  );
}
