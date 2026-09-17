import React from "react";
import "./professor-profile.css";

const appointments = [
  {
    period: "2026 – Present",
    institution: "Hanyang University ERICA",
    role: "Associate Professor",
    department: "Department of Mechanical Engineering",
    current: true,
  },
  {
    period: "2019 – 2026",
    institution: "Yeungnam University",
    role: "Assistant Professor / Associate Professor",
    department: "Department of Automotive Engineering",
  },
  {
    period: "2018 – 2019",
    institution: "Samsung Electronics",
    role: "Staff Engineer",
    department: "Mechatronics Research and Development Center",
  },
];

const interests = [
  { title: "Robot mechanism design", href: "/research#mobile" },
  { title: "Mobile robot systems", href: "/research#mobile" },
  { title: "Robust sensing for extreme environments", href: "/research#perception" },
];

const service = [
  {
    period: "2021 – Present",
    title: "Vice President for Finance & Board Member",
    organization: "Military Robotics Society",
  },
  {
    period: "2021 – Present",
    title: "Editorial Board Member",
    organization: "Journal of Military Robotics Society",
  },
  {
    period: "2021, 2024",
    title: "Organizing Committee Member",
    organization: "1st & 4th Military Robotics Society Conferences",
  },
  {
    period: "2023",
    title: "Organizing Committee Member",
    organization: "ICMT 2023",
  },
];

// These appointments have ended. Add date ranges once the end years are confirmed.
const formerLeadership = [
  {
    title: "Director, Future Automotive Convergence Research Institute",
    organization: "Yeungnam University",
  },
  {
    title: "Director, RIS Gyeongbuk Advanced Industry Talent Development Program",
    organization: "Future Automotive Sector",
  },
];

export default function ProfessorProfile({ compact = false, withBase, scholarUrl }) {
  const NameHeading = compact ? "h2" : "h1";

  return (
    <article className={`professor-page${compact ? " professor-page--compact" : ""}`} aria-labelledby="professor-name">
      <div className="professor-wrap">
        <div className="professor-intro">
          <aside className="professor-sidebar" aria-label="Portrait and contact information">
            <img
              className="professor-photo"
              src={withBase("/jihyuk-park.jpg")}
              alt="Jihyuk Park, Associate Professor at Hanyang University ERICA"
              width="496"
              height="638"
            />
            <div className="professor-contact">
              <a className="professor-email" href="mailto:jihyuk@hanyang.ac.kr">jihyuk@hanyang.ac.kr <span aria-hidden="true">↗</span></a>
              <a href="tel:+82314005284">+82-31-400-5284</a>
              <p>Room 210, Engineering Building V<br />Hanyang University ERICA</p>
              <a className="professor-scholar" href={scholarUrl} target="_blank" rel="noopener noreferrer">Google Scholar <span aria-hidden="true">↗</span></a>
            </div>
          </aside>

          <div className="professor-overview">
            <p className="professor-eyebrow">Professor <span aria-hidden="true">/</span> Principal Investigator</p>
            <NameHeading id="professor-name">Jihyuk Park <span lang="ko">박지혁</span></NameHeading>
            <p className="professor-position">Associate Professor</p>
            <p className="professor-affiliation">Department of Mechanical Engineering<br />Hanyang University, ERICA Campus</p>

            <section className="professor-biography" aria-labelledby="professor-biography-heading">
              <h2 id="professor-biography-heading">Biography</h2>
              <p>Jihyuk Park received the B.S. and Ph.D. degrees in mechanical engineering from Korea Advanced Institute of Science and Technology (KAIST), Daejeon, South Korea, in 2011 and 2018, respectively.</p>
              <p>He was formerly a Staff Engineer at the Mechatronics Research and Development Center, Samsung Electronics Company, and an Associate Professor with the Department of Automotive Engineering, Yeungnam University. He is currently an Associate Professor with the Department of Mechanical Engineering, Hanyang University, ERICA Campus.</p>
              <p>His research interests include robot mechanism design, mobile robot systems, and robust sensing for extreme environments.</p>
            </section>

            {compact && <a className="professor-profile-link" href={withBase("/members/professor")}>View full profile <span aria-hidden="true">→</span></a>}
          </div>
        </div>

        {!compact && (
          <>
            <section className="professor-interests" aria-labelledby="professor-interests-heading">
              <h2 id="professor-interests-heading">Research interests</h2>
              <ul>
                {interests.map((interest, index) => (
                  <li key={interest.title}>
                    <a href={withBase(interest.href)}>
                      <span className="professor-interest-number">0{index + 1}</span>
                      <span>{interest.title}</span>
                      <span aria-hidden="true">↗</span>
                    </a>
                  </li>
                ))}
              </ul>
            </section>

            <div className="professor-background">
              <section aria-labelledby="professor-experience-heading">
                <p className="professor-eyebrow">Academic & Industry</p>
                <h2 id="professor-experience-heading">Professional experience</h2>
                <ol className="professor-timeline">
                  {appointments.map((appointment) => (
                    <li className={appointment.current ? "is-current" : undefined} key={appointment.institution}>
                      <p className="professor-period">{appointment.period}{appointment.current && <span>Current</span>}</p>
                      <h3>{appointment.institution}</h3>
                      <p className="professor-role">{appointment.role}</p>
                      <p>{appointment.department}</p>
                    </li>
                  ))}
                </ol>
              </section>
              <section className="professor-education" aria-labelledby="professor-education-heading">
                <p className="professor-eyebrow">Education</p>
                <h2 id="professor-education-heading">Academic background</h2>
                <ol>
                  <li>
                    <span className="professor-period">2018</span>
                    <h3>Ph.D. in Mechanical Engineering</h3>
                    <p>KAIST</p>
                    <p className="professor-degree-note">Integrated M.S.–Ph.D. program</p>
                  </li>
                  <li>
                    <span className="professor-period">2011</span>
                    <h3>B.S. in Mechanical Engineering</h3>
                    <p>KAIST</p>
                  </li>
                </ol>
                <p className="professor-school-name">Korea Advanced Institute of Science and Technology<br />Daejeon, South Korea</p>
              </section>
            </div>

            <section className="professor-service" aria-labelledby="professor-service-heading">
              <p className="professor-eyebrow">Service & Leadership</p>
              <h2 id="professor-service-heading">Academic service</h2>
              <ul className="professor-service-list">
                {service.map((item) => (
                  <li key={`${item.title}-${item.organization}`}>
                    <span className="professor-period">{item.period}</span>
                    <div><h3>{item.title}</h3><p>{item.organization}</p></div>
                  </li>
                ))}
              </ul>
              <h3 className="professor-former-heading">Former leadership roles</h3>
              <ul className="professor-former-list">
                {formerLeadership.map((item) => (
                  <li key={item.title}><h4>{item.title}</h4><p>{item.organization}</p></li>
                ))}
              </ul>
            </section>
          </>
        )}
      </div>
    </article>
  );
}
