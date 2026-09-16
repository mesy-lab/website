import React from "react";

const BASE_PATH = (import.meta.env.BASE_URL || "/").replace(/\/$/, "");
const SCHOLAR_URL =
  "https://scholar.google.co.kr/citations?hl=ko&user=slQXBPoAAAAJ&view_op=list_works&sortby=pubdate";
const YOUTUBE_URL = "https://www.youtube.com/@mesylab_hyu";

function withBase(href) {
  if (!href || !href.startsWith("/")) return href;
  if (!BASE_PATH) return href;
  return `${BASE_PATH}${href === "/" ? "/" : href}`;
}


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
      { label: "Marine Robotics & Automated Mooring", href: "/research#marine" },
      { label: "Mobile Robotics & Mechanism Design", href: "/research#mobile" },
      {
        label: "Robust Perception in Adverse Environments",
        href: "/research#perception",
      },
      { label: "Lab Automation & Digital Engineering", href: "/research#digital" },
    ],
  },
  {
    label: "Publications ↗",
    href: SCHOLAR_URL,
    external: true,
  },
  { label: "Projects", href: "/projects" },
  { label: "Gallery & News", href: "/gallery-news" },
  { label: "Contact", href: "/contact" },
];

const researchAreas = [
  {
    id: "marine",
    number: "01",
    title: "Marine Robotics & Automated Mooring",
    href: "/research#marine",
    icon: "MR",
    navDescription: "Hydraulic robotic systems and coordinated ship-robot control.",
    summary:
      "We investigate robotic systems that can interact safely and reliably with large maritime structures. Current work focuses on automated ship mooring using hydraulically actuated robots and model-based control.",
    videoTitle: "Automated Mooring Robot",
    videoDescription:
      "Hydraulically actuated robotic systems for automated ship mooring and coordinated control.",
    videoId: "",
    keywords: ["Hydraulic Actuation", "Force Control", "Multi-Robot Coordination", "Ship Dynamics"],
    items: [
      "Mooring robot mechanism design",
      "Impedance & force control",
      "Ship-robot coupled dynamics",
      "Simulation-based validation",
    ],
    relatedLabel: "Related publications",
  },
  {
    id: "mobile",
    number: "02",
    title: "Mobile Robotics & Mechanism Design",
    href: "/research#mobile",
    icon: "MM",
    navDescription: "Tracked robots, manipulation mechanisms, and field mobility.",
    summary:
      "We design mobile and manipulation mechanisms for environments where conventional robots cannot operate reliably. Mechanical configuration, dynamic stability, embedded sensing, and control are considered together.",
    videoTitle: "Tracked Mobile Robot Platform",
    videoDescription:
      "Mechanism and system design for robust mobility in rough, cluttered, and discontinuous terrain.",
    videoId: "",
    keywords: ["Tracked Robot", "Mechanism Design", "Dynamic Stability", "ROS 2"],
    items: [
      "Extreme-environment mobility",
      "Stair & obstacle traversal",
      "Mechanism optimization",
      "Embedded robotic systems",
    ],
    relatedLabel: "Related publications",
  },
  {
    id: "perception",
    number: "03",
    title: "Robust Perception in Adverse Environments",
    href: "/research#perception",
    icon: "RP",
    navDescription: "LiDAR, radar, vision, and sensing under snow and harsh weather.",
    summary:
      "We develop sensing and perception methods that remain useful in snow, rain, fog, dust, and other adverse conditions. Research spans point-cloud filtering, multi-modal sensing, and object recognition and tracking.",
    videoTitle: "Perception in Snowy Weather",
    videoDescription:
      "Robust LiDAR, radar, and camera perception when weather degrades conventional sensing.",
    videoId: "",
    keywords: ["LiDAR", "Radar", "Computer Vision", "Adverse Weather"],
    items: [
      "LiDAR snowfall filtering",
      "Object detection & tracking",
      "Multi-sensor perception",
      "Real-time implementation",
    ],
    relatedLabel: "Related publications",
  },
  {
    id: "digital",
    number: "04",
    title: "Lab Automation & Digital Engineering",
    href: "/research#digital",
    icon: "LD",
    navDescription: "Automation middleware, multibody simulation, and digital workflows.",
    summary:
      "We are extending mechatronic-system research toward integrated automation and digital engineering: experiment orchestration, device middleware, multibody dynamics, and simulation-centered system design.",
    videoTitle: "Automation & Digital Engineering",
    videoDescription:
      "Connecting robot systems, laboratory devices, simulation models, and experimental workflows.",
    videoId: "",
    keywords: ["Lab Automation", "Middleware", "Multibody Dynamics", "Digital Twin"],
    items: [
      "Robot-instrument integration",
      "Automation workflow design",
      "ADAMS / Simscape modeling",
      "Model-based engineering",
    ],
    relatedLabel: "Related projects",
  },
];

const researchVideos = [
  {
    title: "Automated Mooring Robot Demonstration",
    area: "Marine Robotics",
  },
  {
    title: "Tracked Robot Mobility & Stair Traversal",
    area: "Mobile Robotics",
  },
  {
    title: "LiDAR Perception in Snowfall Conditions",
    area: "Perception",
  },
  {
    title: "Ship-Robot Integrated Simulation",
    area: "Simulation",
  },
  {
    title: "Robotic Mechanism Design & Validation",
    area: "Mechanism",
  },
  {
    title: "Laboratory Automation Workflow",
    area: "Automation",
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
  let pathname = window.location.pathname;

  if (BASE_PATH && pathname.startsWith(BASE_PATH)) {
    pathname = pathname.slice(BASE_PATH.length) || "/";
  }

  return pathname.replace(/\/+$/, "") || "/";
}

function isActive(href) {
  const current = path();
  return href === "/" ? current === "/" : current === href || current.startsWith(`${href}/`);
}

function Header() {
  const toggleMenu = () => document.querySelector(".site-nav")?.classList.toggle("open");

  return (
    <header className="site-header">
      <a className="brand" href={withBase("/")}>
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
              <a className={isActive(group.href) ? "active" : ""} href={withBase(group.href)}>
                {group.label}
              </a>
              <div className="dropdown-menu">
                {group.children.map((child) => (
                  <a className={isActive(child.href) ? "active" : ""} href={withBase(child.href)} key={child.href}>
                    {child.label}
                  </a>
                ))}
              </div>
            </div>
          ) : (
            <a
              className={group.external ? "external-link" : isActive(group.href) ? "active" : ""}
              href={withBase(group.href)}
              key={group.href}
              rel={group.external ? "noopener noreferrer" : undefined}
              target={group.external ? "_blank" : undefined}
            >
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
          <a className="button primary" href={withBase("/research")}>
            Explore Research
          </a>
          <a className="button ghost" href={withBase("/contact")}>
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
            <a className="research-card" href={withBase(area.href)} key={area.title}>
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

function ResearchVideo({ area }) {
  if (area.videoId) {
    return (
      <div className="research-video-shell">
        <iframe
          title={area.videoTitle}
          src={`https://www.youtube-nocookie.com/embed/${area.videoId}?rel=0`}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <div className="research-video-shell">
      <div className="research-video-placeholder">
        <div>
          <span className="research-video-label">Representative video</span>
          <span className="research-video-caption">Replace with YouTube video ID</span>
        </div>
        <div className="research-video-bottom">
          <div>
            <h3>{area.videoTitle}</h3>
            <p>{area.videoDescription}</p>
          </div>
          <a
            className="research-mini-play"
            href={YOUTUBE_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Watch ${area.videoTitle} on YouTube`}
          >
            ▶
          </a>
        </div>
      </div>
    </div>
  );
}

function Research() {
  return (
    <div className="research-page">
      <section className="research-hero">
        <div className="research-wrap research-hero-grid">
          <div className="research-hero-copy">
            <div className="research-logo-badge" aria-hidden="true">MESY</div>
            <div className="research-eyebrow">Research at MESY Lab</div>
            <h1>Robotics & Mechatronics for Extreme Environments</h1>
            <p>
              We develop reliable robotic systems by integrating mechanism design, dynamic modeling,
              control, and robust perception for real-world environments.
            </p>
            <div className="research-hero-actions">
              <a className="research-button research-button-primary" href="#research-areas">
                Explore Research <span>↓</span>
              </a>
              <a
                className="research-button research-button-ghost"
                href={YOUTUBE_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                MESY Lab YouTube ↗
              </a>
            </div>
          </div>
          <a
            className="research-showreel"
            href={YOUTUBE_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open MESY Lab YouTube channel"
          >
            <div className="research-showreel-copy">
              <span className="research-play">▶</span>
              <strong>MESY Lab Research Overview</strong>
              <small>Future showreel · 40-60 sec recommended</small>
            </div>
            <span className="research-hero-chip">Mechanism · Dynamics · Control · Perception</span>
          </a>
        </div>
      </section>

      <nav className="research-area-nav" id="research-areas" aria-label="Research areas">
        <div className="research-wrap">
          <div className="research-area-index-grid">
            {researchAreas.map((area) => (
              <a className="research-area-index-card" href={`#${area.id}`} key={area.id}>
                <span>{area.number}</span>
                <h2>{area.title}</h2>
                <p>{area.navDescription}</p>
              </a>
            ))}
          </div>
        </div>
      </nav>

      {researchAreas.map((area, index) => (
        <section
          className={`research-field-section ${index % 2 === 1 ? "alt reverse" : ""}`}
          id={area.id}
          key={area.id}
        >
          <div className="research-wrap research-field-grid">
            <ResearchVideo area={area} />
            <div className="research-field-copy">
              <div className="research-kicker">Research Area {area.number}</div>
              <h2>{area.title}</h2>
              <p className="research-lead">{area.summary}</p>
              <div className="research-tags">
                {area.keywords.map((keyword) => (
                  <span key={keyword}>{keyword}</span>
                ))}
              </div>
              <ul className="research-feature-list">
                {area.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <a
                className="research-text-link"
                href={area.relatedLabel === "Related projects" ? withBase("/projects") : SCHOLAR_URL}
                target={area.relatedLabel === "Related projects" ? undefined : "_blank"}
                rel={area.relatedLabel === "Related projects" ? undefined : "noopener noreferrer"}
              >
                {area.relatedLabel} <span>→</span>
              </a>
            </div>
          </div>
        </section>
      ))}

      <section className="research-principle">
        <div className="research-wrap">
          <div className="research-principle-box">
            <div>
              <div className="research-kicker">How we work</div>
              <h2>From physical systems to reliable autonomy.</h2>
            </div>
            <div className="research-principle-steps">
              {[
                ["01", "Design", "Mechanisms and robotic platforms shaped around the operating environment."],
                ["02", "Model & Control", "Dynamics, simulation, and control for stable and predictable behavior."],
                ["03", "Sense & Validate", "Robust perception and experimental validation under real-world conditions."],
              ].map(([number, title, body]) => (
                <article className="research-principle-step" key={number}>
                  <strong>{number}</strong>
                  <span>{title}</span>
                  <p>{body}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="research-video-library" id="videos">
        <div className="research-wrap">
          <div className="research-section-head">
            <div>
              <div className="research-eyebrow">Research Videos</div>
              <h2>See the research in motion.</h2>
            </div>
            <p>
              Use this section for recent experiments, simulation results, system demonstrations, and
              conference-ready research videos. Each card can link directly to YouTube.
            </p>
          </div>
          <div className="research-video-grid">
            {researchVideos.map((video) => (
              <a
                className="research-video-card"
                href={YOUTUBE_URL}
                target="_blank"
                rel="noopener noreferrer"
                key={video.title}
              >
                <div className="research-video-thumb">
                  <span>{video.area}</span>
                </div>
                <div className="research-video-meta">
                  <small>Research Video</small>
                  <h3>{video.title}</h3>
                </div>
              </a>
            ))}
          </div>
          <div className="research-channel-cta">
            <a
              className="research-button research-button-primary"
              href={YOUTUBE_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              View all videos on YouTube ↗
            </a>
          </div>
        </div>
      </section>
    </div>
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
