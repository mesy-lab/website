import React from "react";
import GalleryNews from "./components/GalleryNews.jsx";
import ProfessorProfile from "./components/ProfessorProfile.jsx";
import StudentsDirectory from "./components/StudentsDirectory.jsx";
import {
  HOW_WE_WORK_YOUTUBE_URL,
  getPublishedHowWeWorkVideo,
  howWeWorkStages,
} from "./data/howWeWork.js";

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
  { label: "How We Work", href: "/how-we-work" },
  {
    label: "Publications ↗",
    href: SCHOLAR_URL,
    external: true,
  },
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
    videoId: "tu0e56P845s",
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
    videoId: "KUTcgMbZ1Ts",
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
    videoId: "tmxJlbiGWjw",
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
    relatedLabel: "Related publications",
  },
];

const researchVideos = [
  {
    title: "Coordinated Control for Automated Mooring",
    area: "Marine Robotics",
    videoId: "tu0e56P845s",
  },
  {
    title: "Tracked Robot Mobility & Stair Traversal",
    area: "Mobile Robotics",
    videoId: "KUTcgMbZ1Ts",
  },
  {
    title: "LiDAR Perception in Snowfall Conditions",
    area: "Perception",
    videoId: "tmxJlbiGWjw",
  },
  {
    title: "Ship-Robot Integrated Simulation",
    area: "Simulation",
    videoId: "IG_6V-vpD-U",
  },
  {
    title: "IMU, RGB & Depth-Based Autonomous Stair Climbing",
    area: "Autonomous Mobility",
    videoId: "d5qx_z_f_Q0",
  },
  {
    title: "Laboratory Automation Workflow",
    area: "Automation",
  },
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

function LabLogo({ variant = "wide-dark", className = "" }) {
  const files = { "mark-blue": "001", "wide-blue": "002", "mark-dark": "003", "wide-dark": "004" };
  return (
    <span className={`lab-logo lab-logo--${variant} ${className}`}>
      <img src={withBase(`/branding/${files[variant]}.png`)} alt="MESY Lab - Mechatronics System Laboratory" />
    </span>
  );
}

function Header() {
  const toggleMenu = () => document.querySelector(".site-nav")?.classList.toggle("open");

  return (
    <header className="site-header">
      <a className="brand" href={withBase("/")}>
        <LabLogo />
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
  return <ProfessorProfile compact={compact} withBase={withBase} scholarUrl={SCHOLAR_URL} />;
}

function Students({ compact = false }) {
  return <StudentsDirectory compact={compact} withBase={withBase} />;
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
  const [activeVideoId, setActiveVideoId] = React.useState(null);
  if (area.videoId) {
    return (
      <div className="research-video-block">
        <HowWeWorkVideo
          video={{ id: area.id, provider: "youtube", videoId: area.videoId, displayTitle: area.videoTitle,
            originalTitle: area.videoTitle, mediaType: "Research Video", sourceUrl: `https://www.youtube.com/watch?v=${area.videoId}` }}
          activeVideoId={activeVideoId}
          onActivate={setActiveVideoId}
        />
      </div>
    );
  }

  return (
    <div className="research-video-block research-video-shell">
      <div className="research-video-placeholder">
        <div>
          <span className="research-video-label">Video coming soon</span>
        </div>
        <div className="research-video-bottom">
          <div>
            <h3>{area.videoTitle}</h3>
            <p>A public video of this research area will be shared in the future.</p>
          </div>
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
            <div className="research-logo-badge"><LabLogo variant="mark-dark" /></div>
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
            href="https://www.youtube.com/watch?v=g5WRMQCXwlI"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Watch MESY Lab Research Overview on YouTube"
            style={{ backgroundImage: "linear-gradient(0deg, rgba(4, 18, 31, .9), rgba(4, 18, 31, .15)), url(https://i.ytimg.com/vi/g5WRMQCXwlI/hqdefault.jpg)", backgroundSize: "cover", backgroundPosition: "center" }}
          >
            <div className="research-showreel-copy">
              <span className="research-play">▶</span>
              <strong>MESY Lab Research Overview</strong>
              <small>Watch the research overview on YouTube</small>
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
              {area.relatedLabel && <a
                className="research-text-link"
                href={SCHOLAR_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                {area.relatedLabel} <span>→</span>
              </a>}
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
                ["01", "Design", "Mechanisms and robotic platforms shaped around the operating environment.", "design"],
                ["02", "Model & Control", "Dynamics, simulation, and control for stable and predictable behavior.", "model-control"],
                ["03", "Sense & Validate", "Robust perception and experimental validation under real-world conditions.", "sense-validate"],
              ].map(([number, title, body, id]) => (
                <a className="research-principle-step" href={withBase(`/how-we-work#${id}`)} key={number}>
                  <strong>{number}</strong>
                  <span>{title}</span>
                  <p>{body}</p>
                </a>
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
              Explore experiments, simulation results, and system demonstrations from the MESY Lab YouTube channel.
            </p>
          </div>
          <div className="research-video-grid">
            {researchVideos.map((video) => {
              const Card = video.videoId ? "a" : "article";
              return <Card
                className={`research-video-card${video.videoId ? "" : " research-video-card--pending"}`}
                {...(video.videoId ? { href: `https://www.youtube.com/watch?v=${video.videoId}`, target: "_blank", rel: "noopener noreferrer" } : {})}
                key={video.title}
              >
                <div className="research-video-thumb">
                  {video.videoId && <img src={`https://i.ytimg.com/vi/${video.videoId}/hqdefault.jpg`} alt="" loading="lazy" />}
                  <span>{video.area}</span>
                </div>
                <div className="research-video-meta">
                  <small>{video.videoId ? "Watch on YouTube ↗" : "Video coming soon"}</small>
                  <h3>{video.title}</h3>
                </div>
              </Card>;
            })}
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

function HowWeWorkVideo({ video, activeVideoId, onActivate }) {
  if (!video) return null;

  const isActive = activeVideoId === video.id;
  const startParam = Number.isFinite(video.startSeconds) ? `&start=${video.startSeconds}` : "";
  const endParam = Number.isFinite(video.endSeconds) ? `&end=${video.endSeconds}` : "";

  return (
    <figure className="work-video-figure">
      <div className="work-video-frame">
        {isActive && video.provider === "local" ? (
          <video controls autoPlay muted playsInline preload="metadata"
            src={withBase(video.localSrc)} aria-label={video.displayTitle}>
            {video.captionsSrc && <track kind="captions" src={withBase(video.captionsSrc)} srcLang="en" label="English" />}
          </video>
        ) : isActive ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.videoId}?autoplay=1&mute=1&rel=0${startParam}${endParam}`}
            referrerPolicy="strict-origin-when-cross-origin"
            title={`${video.originalTitle} - MESY Lab research video`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : (
          <button
            className="work-video-poster"
            type="button"
            onClick={() => onActivate(video.id)}
            aria-label={`Play ${video.displayTitle}`}
          >
            <span className="work-video-fallback" aria-hidden="true">
              MESY LAB VIDEO
            </span>
            {(video.posterSrc || video.provider === "youtube") && <img
              src={video.posterSrc ? withBase(video.posterSrc) : `https://i.ytimg.com/vi/${video.videoId}/hqdefault.jpg`}
              alt=""
              loading="lazy"
              onError={(event) => {
                event.currentTarget.hidden = true;
              }}
            />}
            <span className="work-video-shade" aria-hidden="true" />
            <span className="work-video-type">{video.mediaType}</span>
            <span className="work-video-play" aria-hidden="true">▶</span>
            <span className="work-video-title">{video.displayTitle}</span>
          </button>
        )}
      </div>
      <figcaption className="work-video-caption">
        <div>
          <span>MESY Lab</span>
          <strong>{video.displayTitle}</strong>
        </div>
        <a href={video.provider === "local" ? withBase(video.localSrc) : video.sourceUrl} target="_blank" rel="noopener noreferrer">
          {video.provider === "local" ? "Open video ↗" : "Watch on YouTube ↗"}
        </a>
      </figcaption>
    </figure>
  );
}

function HowWeWorkStage({ stage, index, activeVideoId, onActivate }) {
  const video = getPublishedHowWeWorkVideo(stage.videoRef);

  return (
    <section className={`work-stage ${index % 2 === 1 ? "alt reverse" : ""}`} id={stage.id}>
      <div className="work-shell work-stage-grid">
        <div className="work-stage-copy">
          <p className="work-stage-number">{stage.number}</p>
          <h2>{stage.title}</h2>
          <h3>{stage.subtitle}</h3>
          <p className="work-stage-description">{stage.description}</p>
          <ul className="work-activity-list">
            {stage.activities.map((activity) => (
              <li key={activity}>{activity}</li>
            ))}
          </ul>
        </div>
          <div className={`work-stage-media ${video ? "" : "work-stage-context"}`}>
            {video && <HowWeWorkVideo video={video} activeVideoId={activeVideoId} onActivate={onActivate} />}
            <div className="work-video-notes">
              {stage.notes.map((note) => (
                <div key={note.label}>
                  <h4>{note.label}</h4>
                  <p>{note.body}</p>
                </div>
              ))}
            </div>
          </div>
      </div>
    </section>
  );
}

function ConnectedProcess() {
  return (
    <section className="work-connected" aria-labelledby="connected-title">
      <div className="work-shell">
        <div className="work-connected-heading">
          <p className="work-eyebrow">ONE SYSTEM. CONNECTED THINKING.</p>
          <h2 id="connected-title">Progress through continuous exchange.</h2>
          <p>Design decisions shape the models. Models guide control and evaluation.
            Observations refine both the physical system and its behavior.</p>
        </div>
        <div className="work-network">
          <svg className="work-network-lines" viewBox="0 0 1000 520" preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <marker id="process-arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" />
              </marker>
            </defs>
            <path d="M 378 140 C 265 163 182 249 180 325" />
            <path d="M 622 140 C 735 163 818 249 820 325" />
            <path d="M 335 411 Q 500 500 665 411" />
          </svg>
          <a href="#design" className="work-network-node network-design">
            <span>01</span><h3>Design</h3><p>Requirements &amp; physical systems</p>
          </a>
          <a href="#model-control" className="work-network-node network-model">
            <span>02</span><h3>Model &amp; Control</h3><p>Dynamics &amp; system response</p>
          </a>
          <a href="#sense-validate" className="work-network-node network-sense">
            <span>03</span><h3>Sense &amp; Validate</h3><p>Observations &amp; evaluation</p>
          </a>
          <div className="work-network-center"><span>SHARED OBJECTIVE</span><strong>System development</strong><p>Question · Develop · Learn</p></div>
          <span className="work-network-label network-label-left">Design constraints ↔ Model insights</span>
          <span className="work-network-label network-label-right">Requirements ↔ Observed behavior</span>
          <span className="work-network-label network-label-bottom">Predictions ↔ Measurements</span>
        </div>
        <dl className="work-exchanges">
          <div><dt>Design ↔ Model &amp; Control</dt><dd>Physical choices inform the model; analysis guides hardware and control requirements.</dd></div>
          <div><dt>Model &amp; Control ↔ Sense &amp; Validate</dt><dd>Predictions guide evaluation; measurements refine models and control strategies.</dd></div>
          <div><dt>Sense &amp; Validate ↔ Design</dt><dd>Requirements define what to assess; findings guide the next design decisions.</dd></div>
        </dl>
      </div>
    </section>
  );
}

function HowWeWork() {
  const [activeVideoId, setActiveVideoId] = React.useState(null);

  return (
    <div className="work-page">
      <section className="work-hero">
        <div className="work-shell work-hero-grid">
          <div className="work-hero-copy">
            <LabLogo variant="mark-blue" className="work-hero-logo" />
            <p className="work-eyebrow">HOW WE WORK</p>
            <h1>From Ideas to Validated Systems</h1>
            <p>
              We connect mechanism design, dynamic modeling, control, and sensing to develop and evaluate
              robotic systems for real-world applications.
            </p>
            <div className="work-hero-actions">
              <a className="work-button primary" href="#design">
                Explore Our Process <span>↓</span>
              </a>
              <a
                className="work-button secondary"
                href={HOW_WE_WORK_YOUTUBE_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Watch on YouTube ↗
              </a>
            </div>
          </div>
          <div className="work-cycle" aria-label="MESY Lab iterative research process">
            {howWeWorkStages.map((stage) => (
              <a href={`#${stage.id}`} key={stage.id}>
                <span>{stage.number}</span>
                <strong>{stage.title}</strong>
              </a>
            ))}
            <p>Evaluation informs the next design iteration.</p>
          </div>
        </div>
      </section>

      <section className="work-overview" id="process">
        <div className="work-shell">
          <div className="work-section-heading">
            <p className="work-eyebrow">A CONNECTED ENGINEERING LOOP</p>
            <h2>Three views of one development process.</h2>
            <p>
              Design, modeling and control, and validation continuously inform one another as the system
              develops.
            </p>
          </div>
          <div className="work-overview-grid">
            {howWeWorkStages.map((stage) => (
              <a className="work-overview-card" href={`#${stage.id}`} key={stage.id}>
                <span>{stage.number}</span>
                <h3>{stage.title}</h3>
                <p>{stage.subtitle}</p>
                <strong aria-hidden="true">↓</strong>
              </a>
            ))}
          </div>
        </div>
      </section>

      {howWeWorkStages.map((stage, index) => (
        <HowWeWorkStage
          stage={stage}
          index={index}
          activeVideoId={activeVideoId}
          onActivate={setActiveVideoId}
          key={stage.id}
        />
      ))}

      <ConnectedProcess />

      <section className="work-cta">
        <div className="work-shell work-cta-inner">
          <div>
            <p className="work-eyebrow">EXPLORE MORE</p>
            <h2>See where the process is applied.</h2>
          </div>
          <div className="work-cta-actions">
            <a className="work-button primary dark" href={withBase("/research")}>
              Explore Our Research →
            </a>
            <a
              className="work-button outline"
              href={HOW_WE_WORK_YOUTUBE_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit Our YouTube Channel ↗
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
        <LabLogo variant="wide-blue" />
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
  if (current === "/how-we-work") page = <HowWeWork />;
  if (current === "/publications") page = <Publications />;
  if (current.startsWith("/publications/")) page = <Publications slug={current.split("/").pop()} />;
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
