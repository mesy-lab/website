import React from "react";

const navGroups = [
  { label: "Home", href: "/" },
  {
    label: "Members",
    href: "/members",
    children: [
      { label: "Professor", href: "/members/professor" },
      { label: "Students", href: "/members/student" },
      { label: "Alumni", href: "/members/alumni" },
    ],
  },
  {
    label: "Research",
    href: "/research",
    children: [
      { label: "Robot Manipulator", href: "/research/robot-manipulator" },
      { label: "LiDAR Filtering", href: "/research/lidar-filtering" },
      {
        label: "Mechatronics System Design & Control",
        href: "/research/mechatronics-system-design-control",
      },
      { label: "Auto Drive & Mobile Robot", href: "/research/auto-drive-mobile-robot" },
    ],
  },
  {
    label: "Publications",
    href: "/publications",
    children: [
      { label: "International Journal Articles", href: "/publications/international-journal" },
      { label: "Domestic Journal Articles", href: "/publications/domestic-journal" },
      { label: "Conference Proceedings", href: "/publications/conference-proceedings" },
      { label: "Patents", href: "/publications/patents" },
    ],
  },
  { label: "Projects", href: "/projects" },
  { label: "Gallery & News", href: "/gallery-news" },
  { label: "Contact", href: "/contact" },
];

const researchAreas = [
  {
    title: "Robot Manipulator",
    href: "/research/robot-manipulator",
    icon: "RM",
    summary:
      "Automatic mooring robots, valve rotating manipulators, and 6-axis/7-axis robot platforms.",
    items: ["Automatic mooring robot", "Valve rotating robot manipulator", "R-BIZ challenge platform"],
  },
  {
    title: "LiDAR Filtering",
    href: "/research/lidar-filtering",
    icon: "LF",
    summary:
      "LiDAR point-cloud filtering and snow-noise removal for autonomous driving and mobile robots.",
    items: ["Snowfall recognition", "Real-time snow removal", "Point-cloud reliability"],
  },
  {
    title: "Mechatronics System Design & Control",
    href: "/research/mechatronics-system-design-control",
    icon: "MC",
    summary:
      "Mechanical design and control of actuators, robotic joints, and compliant mechanisms.",
    items: ["Variable radius pulley", "Twisted string actuator joint", "Rubber-based series elastic actuator"],
  },
  {
    title: "Auto Drive & Mobile Robot",
    href: "/research/auto-drive-mobile-robot",
    icon: "AM",
    summary:
      "Mobile robots and autonomous driving systems using LiDAR, GPS, camera, and field perception.",
    items: ["Mobile robot mapping", "Autonomous driving perception", "Climbing robot"],
  },
];

const students = [
  {
    name: "Jaeyong Lee",
    level: "ms",
    degree: "M.S. Student",
    email: "robot002@hanyang.ac.kr",
    topic: "ROS2-based robot control and reinforcement learning Sim2Real",
  },
  {
    name: "Gihyeon Kim",
    level: "ms",
    degree: "M.S. Student",
    email: "gihyeon@hanyang.ac.kr",
    topic: "Control algorithm design",
  },
  {
    name: "Jungmin Kim",
    level: "ms",
    degree: "M.S. Student",
    email: "az123457963@hanyang.ac.kr",
    topic: "Hardware design",
  },
];

const studentGroups = [
  { id: "phd", title: "Ph.D. Students", badge: "Ph.D." },
  { id: "ms", title: "M.S. Students", badge: "M.S." },
  { id: "undergraduate", title: "Undergraduate Students", badge: "UG" },
];

const alumni = [
  ["Jeongmin Kwon", "2026", "TBD"],
  ["Junhyeok Seo", "2026", "TBD"],
  ["Jiwon Kim", "2026", "TBD"],
  ["Seungji Kang", "2026", "TBD"],
  ["Bowen Liu", "2025", "Korea Institute of Machinery & Materials"],
  ["Hyemin Ryu", "2025", "Daegu Tech"],
  ["Seungjin Lee", "2024", "GS Caltex"],
  ["Hayoung Shin", "2023", "Hyundai Rotem"],
  ["Li Bowen", "2022", "BYD"],
  ["Jinhwan Choi", "2021", "Hanwha Systems"],
  ["Hyemin Ryu", "2021", "LG Display"],
];

const publications = {
  "international-journal": {
    title: "International Journal Articles",
    eyebrow: "Journal",
    items: [
      ["2024", "Shin, H., Seo, D., & Park, J. Fuzzy-based adaptive control method for automatic mooring systems. Ocean Engineering, 302, 117623."],
      ["2024", "Park, J., Lee, J., Seo, H. T., & Jeong, S. Variable transmission mechanisms for robotic applications: A review. IEEE Robotics & Automation Magazine."],
      ["2024", "Park, J. I., Jo, S., Seo, H. T., & Park, J. LiDAR-based snowfall level classification for safe autonomous driving. Sensors, 24(17), 5587."],
      ["2023", "Park, J. E., Shin, H. N., Park, J., Suh, J., & Kim, Y. K. Friction variable rubber pad using magnetorheological elastomer for robot grippers."],
      ["2020", "Park, J. I., Park, J., & Kim, K. S. Fast and accurate desnowing algorithm for LiDAR point clouds. IEEE Access, 8, 160202-160212."],
      ["2018", "Park, J., Kim, J. C., Nguyen, C. D. T., Kim, K. S., & Kim, S. A passively adaptive variable-radius pulley for a tendon-driven robotic joint."],
    ],
  },
  "domestic-journal": {
    title: "Domestic Journal Articles",
    eyebrow: "Journal",
    items: [
      ["2024", "Fault classification research for auxiliary machinery in wind power generation systems."],
      ["2022", "Performance analysis of infrared camera object recognition and application to unmanned systems."],
      ["2022", "3D LiDAR and camera data fusion for autonomous driving."],
      ["2022", "Design and structural optimization of an automatic mooring system."],
      ["2017", "Modeling and experimental validation of a variable-radius pulley drive."],
    ],
  },
  "conference-proceedings": {
    title: "Conference Proceedings",
    eyebrow: "Conference",
    items: [
      ["2024", "Development and performance validation of an automatic mooring system control algorithm."],
      ["2024", "Real-time LiDAR sensor filtering algorithm for perception systems."],
      ["2023", "LiDAR point-cloud noise removal under adverse weather conditions."],
      ["2023", "Automatic mooring design and structural optimization."],
      ["2020", "Park, J., Park, J. I., Seo, H. T., Liu, Y., Kim, K. S., & Kim, S. Control of tendon-driven robotic joint with adaptive variable-radius pulley."],
      ["2016", "Park, J., Kim, J. H., Kim, K. S., & Kim, S. Design and control of antagonistic robot joint with twisted string actuators."],
    ],
  },
  patents: {
    title: "Patents",
    eyebrow: "IP",
    items: [
      ["2025", "Hybrid reducer for magnetic gears and mechanical gears."],
      ["2025", "Automated warehouse system for estimating loading position from cargo shape and weight."],
      ["2024", "Variable extension device for wearable applications."],
      ["2024", "Power transmission gear unit for flexible robots."],
      ["2024", "Container handling system for smart automated warehouses."],
      ["2023", "Manual operation device capable of posture restoration."],
      ["2022", "Method and device for removing noise from LiDAR point clouds."],
      ["2017", "Variable-radius pulley for tendon-driven systems."],
    ],
  },
};

const projects = [
  {
    period: "2021.04.01 - 2025.12.31",
    title: "Smart Port and Autonomous Ship Link Technology",
    body: "Supported by Korea Institute of Marine Science & Technology Promotion. Total funding: 450,000,000 KRW.",
  },
  {
    period: "2020.03.01 - 2023.02.28",
    title: "Basic Research Program",
    body: "Passive vibration reduction technology using quasi-zero stiffness. Supported by NRF. Total funding: 90,000,000 KRW.",
  },
  {
    period: "2021.03.01 - 2021.12.31",
    title: "Forest Science Technology Development",
    body: "Automation line development for dried persimmon production. Supported by Korea Forestry Promotion Institute.",
  },
  {
    period: "2019.09.01 - 2022.08.31",
    title: "Youngnam University New Faculty Research Fund",
    body: "Core technology development for autonomous driving and walking mobile robots.",
  },
];

const news = [
  ["2022 Creative Idea Competition Interview", "Interview related to the 13th Machine Tool Creative Idea Competition.", "publication"],
  ["2021 Defense Robotics Conference Award", "MESY Lab members attended the first Defense Robotics Society conference and received an excellent paper award.", "award"],
  ["R-BIZ Challenge Silver Prize", "Students participated in the ZERO Robot mission challenge and received a silver prize.", "award"],
  ["KROS Conference Participation", "MESY Lab shared robotic and mechatronic system research with academic researchers.", "conference"],
];

function path() {
  return window.location.pathname.replace(/\/+$/, "") || "/";
}

function isActive(href) {
  const current = path();
  return href === "/" ? current === "/" : current === href || current.startsWith(`${href}/`);
}

function Header() {
  const toggleMenu = () => document.querySelector(".site-nav")?.classList.toggle("open");

  return (
    <header className="site-header">
      <a className="brand" href="/">
        <span className="brand-mark">MESY</span>
        <span>
          <strong>MESY Lab</strong>
          <small>Mechatronics System Laboratory</small>
        </span>
      </a>
      <button className="menu-button" type="button" onClick={toggleMenu} aria-label="Toggle navigation">
        Menu
      </button>
      <nav className="site-nav" aria-label="Main navigation">
        {navGroups.map((group) =>
          group.children ? (
            <div className="nav-item" key={group.label}>
              <a className={isActive(group.href) ? "active" : ""} href={group.href}>
                {group.label}
              </a>
              <div className="dropdown-menu">
                {group.children.map((child) => (
                  <a className={isActive(child.href) ? "active" : ""} href={child.href} key={child.href}>
                    {child.label}
                  </a>
                ))}
              </div>
            </div>
          ) : (
            <a className={isActive(group.href) ? "active" : ""} href={group.href} key={group.href}>
              {group.label}
            </a>
          ),
        )}
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero">
      <div className="hero-inner">
        <p className="eyebrow">Hanyang University ERICA</p>
        <h1>Mechatronics System Laboratory</h1>
        <p>
          MESY Lab studies mechatronics system design and control, robot manipulators, autonomous driving,
          mobile robots, and LiDAR-based perception.
        </p>
        <div className="hero-actions">
          <a className="button primary" href="/research">
            Explore Research
          </a>
          <a className="button ghost" href="/contact">
            Join the Lab
          </a>
        </div>
      </div>
    </section>
  );
}

function SectionHeader({ eyebrow, title, body }) {
  return (
    <div className="section-header">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {body && <p>{body}</p>}
    </div>
  );
}

function Home() {
  return (
    <>
      <Hero />
      <section className="section">
        <SectionHeader
          eyebrow="Research"
          title="Research Areas"
          body="Practical robotic and mechatronic systems from mechanism design to field validation."
        />
        <div className="card-grid four">
          {researchAreas.map((area) => (
            <a className="research-card" href={area.href} key={area.title}>
              <span className="icon-pill">{area.icon}</span>
              <h3>{area.title}</h3>
              <p>{area.summary}</p>
            </a>
          ))}
        </div>
      </section>
      <section className="section muted">
        <SectionHeader eyebrow="News" title="Latest Lab Updates" />
        <div className="news-grid">
          {news.map(([title, body, tag]) => (
            <article className="news-card" key={title}>
              <span>{tag}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>
      <Recruiting />
    </>
  );
}

function Recruiting() {
  return (
    <section className="section">
      <div className="recruit-box">
        <p className="eyebrow">Wanted</p>
        <h2>Graduate Researchers Wanted</h2>
        <p>
          MESY Lab welcomes motivated students interested in mechatronics, robotics, autonomous systems,
          mechanism design, and intelligent control.
        </p>
        <a className="button primary" href="mailto:jihyuk@hanyang.ac.kr">
          jihyuk@hanyang.ac.kr
        </a>
      </div>
    </section>
  );
}

function Members({ type }) {
  if (type === "professor") return <Professor />;
  if (type === "student") return <Students />;
  if (type === "alumni") return <Alumni />;
  return (
    <>
      <PageHero eyebrow="People" title="Lab Members" body="Meet the professor, students, and alumni of MESY Lab." />
      <section className="section stacked">
        <Professor compact />
        <Students compact />
        <Alumni compact />
      </section>
    </>
  );
}

function Professor({ compact = false }) {
  return (
    <>
      {!compact && <PageHero eyebrow="Professor" title="Principal Investigator" body="Research leadership and advising information for MESY Lab." />}
      <section className={compact ? "category-block" : "section"}>
        {compact && <SectionHeader eyebrow="Professor" title="Principal Investigator" />}
        <div className="profile-panel">
          <div className="portrait large">PI</div>
          <div>
            <h2>Jihyuk Park</h2>
            <p>Associate Professor, Department of Mechanical Engineering, Hanyang University ERICA.</p>
            <p>
              Research interests: mechatronics system design and control, robot manipulators, mobile robots,
              autonomous driving, and LiDAR-based perception.
            </p>
            <p>Education: Ph.D. and B.S. in Mechanical Engineering, KAIST.</p>
            <p>Email: jihyuk@hanyang.ac.kr</p>
            <p>Office: Rm. 210, Building V, Hanyang University ERICA.</p>
          </div>
        </div>
      </section>
    </>
  );
}

function Students({ compact = false }) {
  return (
    <>
      {!compact && <PageHero eyebrow="Students" title="Current Students" body="Current MESY Lab members organized by degree program." />}
      <section className={compact ? "category-block" : "section"}>
        {compact && <SectionHeader eyebrow="Students" title="Current Students" />}
        <div className="student-groups">
          {studentGroups.map((group) => {
            const members = students.filter((student) => student.level === group.id);

            return (
              <section className="student-group" key={group.id}>
                <div className="student-group-header">
                  <h2>{group.title}</h2>
                  <span>{members.length}</span>
                </div>
                {members.length > 0 ? (
                  <div className="card-grid three">
                    {members.map((student) => (
                      <article className="member-card" key={student.email}>
                        <div className="portrait">{group.badge}</div>
                        <h3>{student.name}</h3>
                        <p>{student.degree}</p>
                        <small>{student.topic}</small>
                        <a href={`mailto:${student.email}`}>{student.email}</a>
                      </article>
                    ))}
                  </div>
                ) : (
                  <p className="member-empty">No current members listed.</p>
                )}
              </section>
            );
          })}
        </div>
      </section>
    </>
  );
}

function Alumni({ compact = false }) {
  const shown = compact ? alumni.slice(0, 6) : alumni;
  return (
    <>
      {!compact && <PageHero eyebrow="Alumni" title="Former Members" body="MESY Lab alumni and their current affiliations." />}
      <section className={compact ? "category-block" : "section"}>
        {compact && <SectionHeader eyebrow="Alumni" title="Former Members" />}
        <div className="card-grid four">
          {shown.map(([name, year, company]) => (
            <article className="member-card" key={`${name}-${year}`}>
              <div className="portrait">Al</div>
              <h3>{name}</h3>
              <p>Graduation: {year}</p>
              <small>{company}</small>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

function Research({ slug }) {
  const area = researchAreas.find((item) => item.href.endsWith(slug || ""));
  if (area && slug) {
    return (
      <>
        <PageHero eyebrow="Research" title={area.title} body={area.summary} visual />
        <section className="section">
          <div className="detail-list">
            {area.items.map((item, index) => (
              <article key={item}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h2>{item}</h2>
                  <p>{area.summary}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </>
    );
  }
  return (
    <>
      <PageHero
        eyebrow="Research"
        title="Mechanical systems, autonomy, and intelligent control."
        body="MESY Lab studies mechatronics system design and control, robot manipulators, autonomous driving, and mobile robots."
        visual
      />
      <section className="section">
        <div className="detail-list">
          {researchAreas.map((area, index) => (
            <a href={area.href} key={area.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h2>{area.title}</h2>
                <p>{area.summary}</p>
              </div>
            </a>
          ))}
        </div>
      </section>
    </>
  );
}

function Publications({ slug }) {
  if (slug && publications[slug]) {
    const publication = publications[slug];
    return (
      <>
        <PageHero eyebrow={publication.eyebrow} title={publication.title} body="Academic and technical outputs from MESY Lab." />
        <PublicationList items={publication.items} />
      </>
    );
  }
  return (
    <>
      <PageHero
        eyebrow="Publications"
        title="Publications, conference papers, and patents."
        body="Academic and technical outputs are organized by publication type."
      />
      <section className="section stacked">
        {Object.values(publications).map((publication) => (
          <div className="category-block" key={publication.title}>
            <SectionHeader eyebrow={publication.eyebrow} title={publication.title} />
            <PublicationList items={publication.items.slice(0, 2)} compact />
          </div>
        ))}
      </section>
    </>
  );
}

function PublicationList({ items, compact = false }) {
  return (
    <section className={compact ? "" : "section"}>
      <div className="publication-list">
        {items.map(([year, text]) => (
          <article key={`${year}-${text}`}>
            <strong>{year}</strong>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Projects() {
  return (
    <>
      <PageHero
        eyebrow="Projects"
        title="Active and completed research projects."
        body="Representative MESY Lab projects supported by research agencies, universities, and partner institutions."
      />
      <section className="section">
        <div className="card-grid two">
          {projects.map((project) => (
            <article className="project-card" key={project.title}>
              <small>{project.period}</small>
              <h2>{project.title}</h2>
              <p>{project.body}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

function GalleryNews() {
  return (
    <>
      <PageHero
        eyebrow="Gallery News"
        title="Lab moments, awards, and announcements."
        body="Selected lab news, awards, conference participation, and student activities."
      />
      <section className="section">
        <div className="news-grid">
          {news.map(([title, body, tag]) => (
            <article className="news-card large" key={title}>
              <span>{tag}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

function Contact() {
  return (
    <>
      <PageHero eyebrow="Contact" title="Visit, collaborate, or join the lab." body="Contact MESY Lab at Hanyang University ERICA." />
      <section className="section contact-layout">
        <div className="contact-panel">
          <h2>Lab Information</h2>
          <p>
            <b>Address</b>
            <br />
            Rm. 210, Building V, 55 Hanyangdaehak-ro, Sangnok-gu, Ansan, Gyeonggi-do, 15588, Republic of Korea
          </p>
          <p>
            <b>Korean Address</b>
            <br />
            경기도 안산시 상록구 한양대학로 55, 한양대학교 ERICA 제5공학관 210호
          </p>
          <p>
            <b>Email</b>
            <br />
            <a href="mailto:jihyuk@hanyang.ac.kr">jihyuk@hanyang.ac.kr</a>
          </p>
          <p>
            <b>Office</b>
            <br />
            +82-31-400-5284
          </p>
        </div>
        <form className="contact-form" onSubmit={(event) => event.preventDefault()}>
          <label>
            Name
            <input type="text" name="name" placeholder="Your name" />
          </label>
          <label>
            Email
            <input type="email" name="email" placeholder="you@example.com" />
          </label>
          <label>
            Message
            <textarea name="message" rows="5" placeholder="Type your message" />
          </label>
          <button className="button primary" type="submit">
            Send Message
          </button>
        </form>
      </section>
    </>
  );
}

function PageHero({ eyebrow, title, body, visual = false }) {
  return (
    <section className={`page-hero ${visual ? "research-hero" : ""}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <p>{body}</p>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div>
        <h3>MESY Lab</h3>
        <p>Mechatronics System Laboratory</p>
        <p>Hanyang University ERICA</p>
      </div>
      <div>
        <p>Rm. 210, Building V, 55 Hanyangdaehak-ro, Sangnok-gu, Ansan</p>
        <a href="mailto:jihyuk@hanyang.ac.kr">jihyuk@hanyang.ac.kr</a>
      </div>
      <p>Copyright 2026 MESY Lab. All rights reserved.</p>
    </footer>
  );
}

function App() {
  const current = path();
  let page = <Home />;

  if (current === "/members") page = <Members />;
  if (current === "/members/professor") page = <Members type="professor" />;
  if (current === "/members/student") page = <Members type="student" />;
  if (current === "/members/alumni") page = <Members type="alumni" />;
  if (current === "/research") page = <Research />;
  if (current.startsWith("/research/")) page = <Research slug={current.split("/").pop()} />;
  if (current === "/publications") page = <Publications />;
  if (current.startsWith("/publications/")) page = <Publications slug={current.split("/").pop()} />;
  if (current === "/projects") page = <Projects />;
  if (current === "/gallery-news") page = <GalleryNews />;
  if (current === "/contact") page = <Contact />;

  return (
    <>
      <Header />
      <main>{page}</main>
      <Footer />
    </>
  );
}

export default App;
