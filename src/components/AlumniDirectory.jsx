import React from "react";
import { alumni } from "../data/students.js";
import "./alumni-directory.css";

const degreeLabels = {
  phd: "Ph.D.",
  integrated: "Integrated M.S.–Ph.D.",
  ms: "M.S.",
  undergraduate: "Undergraduate Researcher",
};

export default function AlumniDirectory({ compact = false, withBase }) {
  const shown = compact ? alumni.slice(0, 6) : alumni;

  if (!shown.length) {
    return <p className="alumni-empty">No alumni listed.</p>;
  }

  return (
    <div className="card-grid four">
      {shown.map((member) => (
        <article className="member-card" key={member.id}>
          <div className="portrait alumni-portrait">
            {member.photo
              ? <img src={withBase(member.photo)} alt={`Portrait of ${member.name}`} loading="lazy" />
              : "Al"}
          </div>
          <h3>{member.name}</h3>
          <p>
            {member.level && degreeLabels[member.level] ? `${degreeLabels[member.level]} · ` : ""}
            Graduation: {member.graduationYear}
          </p>
          {member.affiliation && <small>{member.affiliation}</small>}
        </article>
      ))}
    </div>
  );
}
