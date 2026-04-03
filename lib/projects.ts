export interface ProjectData {
  slug: string;
  title: string;
  duration: string;
  season: string;
  description: string;
  role: string;
  projectType: string;
  layers: string[];
  layerType: 'landscape' | 'portrait' | 'mixed';
  // Case study content
  overview: string;
  roleDescription: string;
  researchPlan: {
    subtitle: string;
    stats: { value: string; label: string }[];
    methods: string[];
  };
  keyScreens: string[];
  highlights: string[];
}

export const PROJECTS: ProjectData[] = [
  {
    slug: "cheers",
    title: "Cheers!",
    duration: "10 Weeks",
    season: "Spring 2024",
    description:
      "Empathetic payment system redefining tipping through transparent, autonomous, and private guest experiences",
    role: "UX and Interaction Designer",
    projectType: "College Case Study",
    layers: [
      "/projects/cheers/1.png?pos=top",
      "/projects/cheers/2.png",
      "/projects/cheers/3.png",
      "/projects/cheers/4.png",
    ],
    layerType: "mixed",
    overview:
      "Cheers is a payment terminal and app clip ecosystem that reinvents America's tipping experience by allowing users to tip on their time and their terms. We implement empathetic interactions that foster transparency, autonomy, and privacy for young adults who frequent fast-casual cafes.",
    roleDescription:
      "I primarily lead the translation of findings into tangible solutions. I was responsible for layouts, design cues, and final visuals. As UI and Visual Design Lead, my key contributions included transforming research insights into user-friendly designs, structuring screens, and crafting the final look.",
    researchPlan: {
      subtitle: "How we built a data-driven product",
      stats: [
        { value: "12", label: "Participants" },
        { value: "19", label: "Interviews" },
        { value: "64", label: "Responses" },
        { value: "40+", label: "Articles" },
      ],
      methods: ["Workshop", "Interview", "Survey", "Secondary"],
    },
    keyScreens: [
      "/projects/cheers/1.png",
      "/projects/cheers/2.png",
      "/projects/cheers/3.png",
      "/projects/cheers/4.png",
      "/projects/cheers/5.png",
    ],
    highlights: [
      "Transparent tipping flow",
      "Privacy-first payment",
      "Empathetic micro-interactions",
      "Autonomous guest experience",
    ],
  },
  {
    slug: "dream-line",
    title: "Dream Line",
    duration: "10 Weeks",
    season: "Spring 2025",
    description:
      "Immersive, autonomous pod designed to enhance mobility, comfort, and planning for families at theme parks",
    role: "UX and Industrial Designer",
    projectType: "College Case Study",
    layers: [
      "/projects/kodex/light.png?pos=top",
      "/projects/kodex/dark.png?pos=0%_33%",
      "/projects/kodex/light.png?pos=0%_66%",
      "/projects/kodex/dark.png?pos=bottom",
    ],
    layerType: "mixed",
    overview:
      "Dream Line reimagines the theme park experience through an immersive, autonomous pod system that enhances mobility, comfort, and planning for families. The design focuses on reducing friction points families face at large-scale entertainment venues.",
    roleDescription:
      "As UX and Industrial Designer, I conceptualized the pod experience from end to end — from user research with families to physical form factor prototyping and the digital interface that controls the pod's navigation and entertainment systems.",
    researchPlan: {
      subtitle: "Understanding the family theme park experience",
      stats: [
        { value: "8", label: "Families" },
        { value: "15", label: "Interviews" },
        { value: "50+", label: "Responses" },
        { value: "30+", label: "Articles" },
      ],
      methods: ["Field Study", "Interview", "Survey", "Prototyping"],
    },
    keyScreens: [
      "/projects/kodex/light.png",
      "/projects/kodex/dark.png",
    ],
    highlights: [
      "Autonomous navigation",
      "Family-centric design",
      "Comfort-first UX",
      "Seamless park integration",
    ],
  },
  {
    slug: "swayam",
    title: "SWAYAM",
    duration: "12 Weeks",
    season: "Summer 2024",
    description:
      "National educational platform offering immersive university-level courses, engaging video lectures, and rich progression tracking.",
    role: "UX Researcher & UI Designer",
    projectType: "College Case Study",
    layers: [
      "/projects/swayam/2.png?pos=top",
      "/projects/swayam/3.png",
      "/projects/swayam/4.png",
      "/projects/swayam/5.png",
    ],
    layerType: "mixed",
    overview:
      "SWAYAM is India's national educational platform offering free university-level courses to millions. Our redesign focused on creating an immersive learning experience with engaging video lectures, rich progression tracking, and a modern interface that makes education accessible and delightful.",
    roleDescription:
      "As UX Researcher & UI Designer, I led the user research phase, conducting usability studies on the existing platform to identify pain points. I then translated findings into a comprehensive redesign covering course discovery, video playback, and progress tracking.",
    researchPlan: {
      subtitle: "Redesigning India's largest MOOC platform",
      stats: [
        { value: "20", label: "Students" },
        { value: "12", label: "Interviews" },
        { value: "100+", label: "Responses" },
        { value: "25+", label: "Articles" },
      ],
      methods: ["Usability Test", "Interview", "Survey", "Benchmark"],
    },
    keyScreens: [
      "/projects/swayam/1.png",
      "/projects/swayam/2.png",
      "/projects/swayam/3.png",
      "/projects/swayam/4.png",
      "/projects/swayam/5.png",
    ],
    highlights: [
      "Modern course discovery",
      "Immersive video experience",
      "Rich progress tracking",
      "Accessible design system",
    ],
  },
  {
    slug: "musicaly",
    title: "Musicaly",
    duration: "8 Weeks",
    season: "Fall 2024",
    description:
      "A modern music streaming platform focusing on artist-fan connection and high-fidelity audio experiences.",
    role: "UI/UX Designer",
    projectType: "Mobile Application Design",
    layers: [
      "/projects/musicaly/home.png",
      "/projects/musicaly/player.png",
      "/projects/musicaly/Artist.png",
      "/projects/musicaly/Subscription.png",
    ],
    layerType: "portrait",
    overview:
      "Musicaly is a next-generation music streaming app designed to bridge the gap between artists and listeners. The project involved creating a seamless user journey from discovery to immersive playback, with a focus on personalized curation and high-quality visuals.",
    roleDescription:
      "As the lead UI/UX Designer, I was responsible for the entire design lifecycle, including user research, wireframing, high-fidelity prototyping, and creating a cohesive design system that reflects the brand's energetic yet clean aesthetic.",
    researchPlan: {
      subtitle: "Designing for the modern listener",
      stats: [
        { value: "15", label: "Users" },
        { value: "10", label: "Interviews" },
        { value: "80", label: "Surveys" },
        { value: "20", label: "Benchmarks" },
      ],
      methods: ["User Interviews", "Competitive Audit", "Wireframing", "Usability Testing"],
    },
    keyScreens: [
      "/projects/musicaly/home.png",
      "/projects/musicaly/player.png",
      "/projects/musicaly/Artist.png",
      "/projects/musicaly/Subscription.png",
      "/projects/musicaly/Language.png",
      "/projects/musicaly/sign up page.png",
    ],
    highlights: [
      "Immersive Player UI",
      "Artist Connection Hub",
      "Personalized Discovery",
      "Sleek Dark Mode Design",
    ],
  },
];

export function getProjectBySlug(slug: string): ProjectData | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}
