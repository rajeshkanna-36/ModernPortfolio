"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ProjectFolderCard from "./ProjectFolderCard";
import FluidButton from "./ui/FluidButton";
import { PROJECTS } from "@/lib/projects";




export default function FeaturedProjects() {
  const containerRef = useRef<HTMLElement>(null);
  
  // Track this section's position to trigger the parallax exit effect.
  // It starts when the section's end reaches the bottom of the viewport,
  // and finishes when the section's end reaches the top of the viewport.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["end end", "end start"]
  });

  // Parallax exit transformations
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0.3, 1], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <motion.section 
      ref={containerRef}
      style={{ scale, opacity, y, willChange: 'transform, opacity' }}
      className="relative w-full max-w-7xl mx-auto px-6 pt-12 pb-32 bg-white z-0 origin-bottom" 
      id="work"
      data-cursor="projects"
    >
      {/* Animated Minimalist Selection Box Header (Hero Section Style) */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-24 md:mb-32 lg:mb-40 relative w-full pt-8 pl-4">
        
        <div className="flex items-start">
           <div className="relative inline-block mt-4 md:mt-0 pb-1 pr-1">
               
               {/* Selection Marquee — follows cursor with slight delay */}
               <motion.div
                 initial={{ width: "0%", height: "0%", opacity: 0 }}
                 whileInView={{ width: "100%", height: "100%", opacity: 1 }}
                 viewport={{ once: true, amount: 0.5 }}
                 transition={{ duration: 1.0, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
                 className="absolute top-0 left-0 z-20 pointer-events-none border-[3px] border-[#3b82f6]/80 bg-[#3b82f6]/5 origin-top-left"
               />

               {/* Inner text block (Mimicking Hero Section) */}
               <motion.h2 
                 className="relative z-10 text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-zinc-900 leading-[0.9] p-3 md:p-5"
                 initial={{ opacity: 0 }}
                 whileInView={{ opacity: 1 }}
                 viewport={{ once: true, amount: 0.5 }}
                 transition={{ duration: 0.4 }}
               >
                 Featured
                 <br />
                 Projects
               </motion.h2>

               {/* Corner Handles */}
               <motion.div
                 initial={{ opacity: 0 }}
                 whileInView={{ opacity: 1 }}
                 viewport={{ once: true, amount: 0.5 }}
                 transition={{ duration: 0.2, delay: 0.06 }}
                 className="absolute -top-[4px] -left-[4px] w-3 h-3 bg-white border-[2px] border-[#3b82f6] z-20"
               />
               <motion.div
                 initial={{ left: "0%", opacity: 0 }}
                 whileInView={{ left: "100%", opacity: 1 }}
                 viewport={{ once: true, amount: 0.5 }}
                 transition={{ duration: 1.0, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
                 className="absolute -top-[4px] -ml-[6px] w-3 h-3 bg-white border-[2px] border-[#3b82f6] z-20"
               />
               <motion.div
                 initial={{ top: "0%", opacity: 0 }}
                 whileInView={{ top: "100%", opacity: 1 }}
                 viewport={{ once: true, amount: 0.5 }}
                 transition={{ duration: 1.0, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
                 className="absolute -left-[4px] -mt-[6px] w-3 h-3 bg-white border-[2px] border-[#3b82f6] z-20"
               />
               <motion.div
                 initial={{ left: "0%", top: "0%", opacity: 0 }}
                 whileInView={{ left: "100%", top: "100%", opacity: 1 }}
                 viewport={{ once: true, amount: 0.5 }}
                 transition={{ duration: 1.0, delay: 0.03, ease: [0.22, 1, 0.36, 1] }}
                 className="absolute -ml-[6px] -mt-[6px] w-3 h-3 bg-white border-[2px] border-[#3b82f6] z-20"
               />

               {/* Mouse Cursor — LEADS all movement */}
               <motion.div
                 initial={{ left: "0%", top: "0%", opacity: 0 }}
                 whileInView={{ left: "100%", top: "100%", opacity: 1 }}
                 viewport={{ once: true, amount: 0.5 }}
                 transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
                 className="absolute z-[60] pointer-events-none drop-shadow-md"
               >
                 <div className="-translate-x-[4px] -translate-y-[2px] md:-translate-x-[6px] md:-translate-y-[3px]">
                   <svg viewBox="0 0 36 36" className="w-[32px] h-[32px] md:w-[48px] md:h-[48px]" fill="#3b82f6" stroke="white" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round">
                     <path d="M6 3 L26 14 L17 17 L14 26 Q10 13 6 3 Z" />
                   </svg>
                 </div>
               </motion.div>
           </div>
        </div>
        
        <div className="flex flex-col items-start md:items-end md:ml-auto">
          {/* See All Button */}
          <div className="relative z-20 shrink-0 mt-8 md:mt-0 mb-4">
            <FluidButton text="See All Projects" />
          </div>
          <motion.p 
            className="text-zinc-500 font-medium text-sm md:text-base max-w-sm text-left md:text-right"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            Blood, sweat, and tears were sacrificed to build these case studies.
          </motion.p>
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
            <a href={`/projects/${project.slug}`} className="no-underline block">
              <ProjectFolderCard {...project} />
            </a>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
