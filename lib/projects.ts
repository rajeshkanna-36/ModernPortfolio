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
  figmaUrl?: string;
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
      "/projects/cheers/mockups/2.png",
      "/projects/cheers/mockups/3.png",
      "/projects/cheers/mockups/4.png",
      "/projects/cheers/mockups/5.png",
      "/projects/cheers/mockups/6.png",
      "/projects/cheers/mockups/7.png",
    ],
    highlights: [
      "Transparent tipping flow",
      "Privacy-first payment",
      "Empathetic micro-interactions",
      "Autonomous guest experience",
    ],
  },
  {
    slug: "kodex",
    title: "Kodex",
    duration: "6 Weeks",
    season: "Winter 2024",
    description:
      "A forward-thinking brand identity and highly converting desktop website for an AI innovation company.",
    role: "Lead Visual & Web Designer",
    projectType: "Brand Identity & Web Design",
    layers: [
      "/projects/kodex/light.png?pos=top",
      "/projects/kodex/dark.png?pos=0%_33%",
      "/projects/kodex/light.png?pos=0%_66%",
      "/projects/kodex/dark.png?pos=bottom",
    ],
    layerType: "mixed",
    overview:
      "Kodex is an AI-driven solutions company focusing on education, defense, and enterprise. Our goal was to design a brand identity and a premium desktop web experience that communicates advanced intelligence, enterprise trust, and sleek modernity.",
    roleDescription:
      "As Lead Visual and Web Designer, I developed the brand's aesthetic direction, establishing a flexible design system capable of beautiful Light and Dark modes. I designed the complete desktop experience to optimize for B2B conversions.",
    researchPlan: {
      subtitle: "Designing for AI enterprise trust",
      stats: [
        { value: "4", label: "Hero Concepts" },
        { value: "2", label: "Color Themes" },
        { value: "10K+", label: "Target Client Value" },
        { value: "8", label: "Sections Built" },
      ],
      methods: ["Competitive Analysis", "Wireframing", "Visual Design", "Prototyping"],
    },
    keyScreens: [
      "/projects/kodex/light.png",
      "/projects/kodex/dark.png",
    ],
    highlights: [
      "Dual Theme Architecture",
      "B2B Conversion Focus",
      "Enterprise Tech Aesthetic",
      "Dynamic Grid Layouts",
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
      "/projects/swayam/logo.png?pos=center&fit=contain",
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
];

export function getProjectBySlug(slug: string): ProjectData | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}
