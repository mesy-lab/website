export const HOW_WE_WORK_YOUTUBE_URL = "https://www.youtube.com/@mesylab_hyu";

// Publish the lab-wide edited films when their content has been reviewed.
export const howWeWorkVideos = Object.fromEntries(
  ["design", "model-control", "sense-validate"].map((stage) => [
    `${stage}-overview`,
    {
      id: `${stage}-overview`, stage, project: null,
      displayTitle: null, originalTitle: null,
      provider: "youtube", videoId: null, sourceUrl: null,
      localSrc: null, posterSrc: null, captionsSrc: null,
      mediaType: null, startSeconds: null, endSeconds: null,
      role: "featured", published: false, verificationStatus: "unverified",
      verificationNotes: "Awaiting a lab-wide edited film combining relevant research activities.",
    },
  ]),
);

export const howWeWorkStages = [
  {
    id: "design", number: "01", title: "Design",
    subtitle: "From Requirements to Physical Systems",
    description: "We translate research questions, task requirements, and operating constraints into system concepts. Mechanical structures, actuation, sensing, and integration are considered together as ideas become prototypes.",
    activities: [
      "Define requirements and system architecture",
      "Develop mechanisms, actuation, and integration",
      "Build and refine prototypes",
    ],
    videoRef: "design-overview",
    notes: [
      { label: "Shape the concept", body: "Explore configurations, interfaces, and practical constraints to establish how the system should work." },
      { label: "Connect design and analysis", body: "Use modeling and control requirements to inform geometry, component choices, and system integration." },
      { label: "Refine through evaluation", body: "Bring observations from prototypes and experiments back into the design, revisiting assumptions and trade-offs." },
    ],
  },
  {
    id: "model-control", number: "02", title: "Model & Control",
    subtitle: "Understand Behavior. Develop the Response.",
    description: "We build models to investigate system behavior and develop control strategies. Analysis, simulation, and implementation connect physical design with the motions and interactions a system needs to achieve.",
    activities: [
      "Model system dynamics and interactions",
      "Study behavior through analysis and simulation",
      "Develop and evaluate control strategies",
    ],
    videoRef: "model-control-overview",
    notes: [
      { label: "Understand the system", body: "Represent relevant dynamics, constraints, and interactions at a level that supports the research question." },
      { label: "Develop the response", body: "Study how control decisions affect motion and interaction across different operating conditions." },
      { label: "Update with observations", body: "Compare expected and observed behavior to refine model assumptions, control strategies, and hardware requirements." },
    ],
  },
  {
    id: "sense-validate", number: "03", title: "Sense & Validate",
    subtitle: "Observe, Evaluate, and Inform the Next Step",
    description: "We use sensing to observe systems and their surroundings, and evaluation to assess behavior against research objectives. Data analysis, simulation studies, and experiments guide the next changes to design and control.",
    activities: [
      "Acquire and interpret sensor data",
      "Evaluate behavior under defined conditions",
      "Translate findings into system improvements",
    ],
    videoRef: "sense-validate-overview",
    notes: [
      { label: "Observe and interpret", body: "Turn sensor measurements into information about system state, interactions, and the operating environment." },
      { label: "Evaluate against objectives", body: "Define evaluation conditions and assess observed behavior against the requirements and questions being studied." },
      { label: "Close the feedback loop", body: "Use results and remaining uncertainties to revisit the physical design, update models, and refine control." },
    ],
  },
];

export function getPublishedHowWeWorkVideo(videoRef) {
  const video = howWeWorkVideos[videoRef];
  if (!video?.published || !video.displayTitle || !["verified", "partially-reviewed"].includes(video.verificationStatus)) return null;
  if (video.provider === "local") return video.localSrc?.startsWith("/media/") ? video : null;
  if (video.provider !== "youtube" || !/^[\w-]{11}$/.test(video.videoId || "") || !video.sourceUrl) return null;
  return video;
}
