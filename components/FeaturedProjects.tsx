"use client";

import { motion } from "framer-motion";
import ProjectFolderCard from "./ProjectFolderCard";
import FluidButton from "./ui/FluidButton";
import { FileCode2 } from "lucide-react"; // Using a matching file/node icon

const PROJECTS = [
  {
    title: "Cheers",
    duration: "10 Weeks",
    season: "Spring 2024",
    description: "Empathetic payment system redefining tipping through transparent, autonomous, and private guest experiences",
    role: "UX and Interaction Designer",
    layers: [
      "/projects/cheers/1.png?pos=top",
      "/projects/cheers/2.png",
      "/projects/cheers/3.png",
      "/projects/cheers/4.png"
    ],
    layerType: "mixed" as const,
  },
  {
    title: "Dream Line",
    duration: "10 Weeks",
    season: "Spring 2025",
    description: "Immersive, autonomous pod designed to enhance mobility, comfort, and planning for families at theme parks",
    role: "UX and Industrial Designer",
    layers: [
      "/projects/kodex/light.png?pos=top",
      "/projects/kodex/dark.png?pos=0%_33%",
      "/projects/kodex/light.png?pos=0%_66%",
      "/projects/kodex/dark.png?pos=bottom"
    ],
    layerType: "mixed" as const,
  },
  {
    title: "SWAYAM",
    duration: "12 Weeks",
    season: "Summer 2024",
    description: "National educational platform offering immersive university-level courses, engaging video lectures, and rich progression tracking.",
    role: "UX Researcher & UI Designer",
    layers: [
      "/projects/swayam/2.png?pos=top",
      "/projects/swayam/3.png",
      "/projects/swayam/4.png",
      "/projects/swayam/5.png"
    ],
    layerType: "mixed" as const,
  },
];

export default function FeaturedProjects() {
  return (
    <section className="relative w-full max-w-7xl mx-auto px-6 py-32 bg-white" data-cursor="projects">
      {/* Themed Hand-Drawn Header */}
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-24">
        <div className="flex items-start gap-4">
          {/* File Icon matching the ref */}
          <div className="w-12 h-12 shrink-0 border-2 border-zinc-900 rounded-xl flex items-center justify-center -rotate-3 hover:rotate-0 transition-transform bg-white shadow-sm">
            <FileCode2 className="w-6 h-6 text-zinc-900" />
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 mb-1">
              Featured Projects
            </h2>
            <p className="text-zinc-500 font-medium">
              Blood, sweat, and tears were sacrificed
            </p>
          </div>
        </div>
        
        {/* See All Button */}
        <div className="relative z-20">
          <FluidButton text="See All" />
        </div>
      </div>

      {/* Grid of Folder Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-8">
        {PROJECTS.map((project, idx) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: idx * 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <ProjectFolderCard {...project} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
