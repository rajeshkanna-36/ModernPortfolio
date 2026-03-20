"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

const projects = [
  {
    title: "EcoCloud Dashboard",
    description: "A comprehensive cloud management platform built with Next.js and Go for visualizing high-throughput server metrics.",
    tags: ["Next.js", "TypeScript", "Go"],
    color: "#3b82f6" // blue
  },
  {
    title: "Nexus Payment Gateway",
    description: "High-throughput fintech microservices for global payments, processing millions of secure transactions daily in real-time.",
    tags: ["Node.js", "AWS", "Docker"],
    color: "#f97316" // orange
  },
  {
    title: "Lumina AI Engine",
    description: "Real-time AI inference pipeline with sub-10ms latency running locally on optimized edge nodes.",
    tags: ["Python", "TensorFlow", "React"],
    color: "#10b981" // emerald
  },
  {
    title: "Vanguard E-commerce",
    description: "Headless storefront serving heavily dynamic carts to 5M+ daily active users without compromising core web vitals.",
    tags: ["React", "GraphQL", "Tailwind"],
    color: "#6366f1" // indigo
  }
];

function ProjectCard({ project, index, progress }: { project: typeof projects[0], index: number, progress: MotionValue<number> }) {
  // True parallax: Elements move horizontally in opposition to the main track.
  const shapeParallax = useTransform(progress, [0, 1], [-50, 50]);
  const textParallax = useTransform(progress, [0, 1], [100, -100]);

  return (
    <div className="group relative h-[65vh] min-h-[450px] w-[85vw] sm:w-[50vw] md:w-[45vw] lg:w-[35vw] max-w-[550px] overflow-hidden rounded-[2.5rem] bg-zinc-900 border border-zinc-800/80 flex-shrink-0 flex flex-col cursor-pointer transition-all duration-500 hover:border-[#f97316]/40 hover:shadow-2xl hover:shadow-[#f97316]/10">
      
      {/* Top Media Area */}
      <div className="relative h-[60%] w-full bg-zinc-800 overflow-hidden">
        {/* Parallax Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.1] transition-transform duration-1000 group-hover:scale-110" 
             style={{ 
               backgroundImage: "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)", 
               backgroundSize: "32px 32px" 
             }} 
        />
        
        {/* Massive Parallax Project Number */}
        <motion.div 
          style={{ x: textParallax }}
          className="absolute -top-12 -right-4 font-black text-[14rem] leading-none text-white/[0.03] select-none pointer-events-none transition-colors duration-500 group-hover:text-white/[0.07]"
        >
          0{index + 1}
        </motion.div>

        {/* Abstract Parallax Shape */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
           <motion.div 
             style={{ x: shapeParallax }}
             className="relative w-full h-full flex items-center justify-center opacity-80"
           >
              {/* Spinning geometric outline */}
              <motion.div 
                animate={{ rotate: index % 2 === 0 ? 360 : -360 }}
                transition={{ duration: 40 + index * 5, repeat: Infinity, ease: "linear" }}
                className="w-32 h-32 md:w-40 md:h-40 border-[3px] border-dashed rounded-[35%] opacity-60 transition-transform duration-700 group-hover:scale-125 group-hover:opacity-100"
                style={{ borderColor: project.color }}
              />
              {/* Central aura glow */}
              <div 
                className="absolute w-48 h-48 blur-[60px] rounded-full opacity-20 transition-all duration-700 group-hover:opacity-60 group-hover:scale-150"
                style={{ backgroundColor: project.color }}
              />
           </motion.div>
        </div>

        {/* Shadow defining the bottom transition */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent top-1/2" />
      </div>

      {/* Bottom Content Area */}
      <div className="relative h-[40%] px-6 md:px-10 py-8 flex flex-col justify-end bg-zinc-900 z-10 overflow-hidden">
        {/* Subtle glow underneath the content */}
        <div className="absolute -bottom-10 -left-10 w-40 h-40 blur-[50px] rounded-full opacity-10 transition-opacity group-hover:opacity-30" style={{ backgroundColor: project.color }} />
        
        <div className="flex flex-wrap gap-2 mb-4 relative z-10">
          {project.tags.map((tag: string, i: number) => (
            <span key={i} className="text-[10px] md:text-[11px] font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full bg-white/5 border border-white/5 text-zinc-300 transition-colors group-hover:bg-white/10 group-hover:text-white">
              {tag}
            </span>
          ))}
        </div>
        <h3 className="text-2xl md:text-3xl font-bold mb-3 text-white transition-colors duration-300 group-hover:text-[#f97316] relative z-10">
          {project.title}
        </h3>
        <p className="text-zinc-400 text-sm md:text-base leading-relaxed line-clamp-2 md:line-clamp-3 transition-colors duration-300 group-hover:text-zinc-300 relative z-10">
          {project.description}
        </p>
      </div>
    </div>
  );
}

export default function ProjectsPreview() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });

  // Calculate horizontal translation based on scroll length. 
  // It moves the track perfectly horizontally across 300vh of vertical scrolling.
  const x = useTransform(scrollYProgress, [0, 1], ["0vw", "-120vw"]);

  return (
    <section ref={containerRef} className="relative h-[400vh] bg-zinc-950 text-white z-20" data-cursor="projects">
      {/* Background ambient depth */}
      <div className="absolute top-[20vh] right-[10vw] w-[500px] h-[500px] bg-[#f97316] opacity-[0.03] blur-[120px] rounded-full pointer-events-none" />
      
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        
        {/* Sticky Intro Panel (Floats permanently on the left) */}
        <div className="absolute inset-y-0 left-0 w-full lg:w-[35vw] flex items-center p-6 sm:p-10 md:p-16 z-20 pointer-events-none">
          <motion.div 
             className="max-w-[420px] pointer-events-auto bg-zinc-950/60 backdrop-blur-2xl p-8 md:p-12 rounded-[2.5rem] border border-white/5 shadow-[0_0_50px_rgba(0,0,0,0.5)]"
             initial={{ opacity: 0, x: -50 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true, amount: 0.5 }}
          >
            <span className="text-[#f97316] flex items-center gap-3 text-xs md:text-sm font-bold tracking-widest uppercase mb-6">
              <span className="w-8 h-px bg-[#f97316]" /> Selected Work
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter mb-6 leading-[1.1]">
              Creative<br />Engineering
            </h2>
            <p className="text-zinc-400 text-sm md:text-base font-light leading-relaxed">
              Explore a horizontal scroll through scalable platforms and interactive digital experiences crafted to push boundaries and delight users.
            </p>
            <div className="mt-8 flex gap-3 text-zinc-500 text-sm font-medium items-center">
               <span>Scroll to explore</span>
               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-bounce">
                <path d="M12 5v14M19 12l-7 7-7-7"/>
               </svg>
            </div>
          </motion.div>
        </div>

        {/* The horizontally scrolling project track */}
        <motion.div 
          style={{ x }} 
          className="flex gap-8 lg:gap-14 px-8 lg:pl-[40vw] lg:pr-[20vw] items-center"
        >
          {projects.map((project, idx) => (
            <ProjectCard 
              key={idx} 
              project={project} 
              index={idx} 
              progress={scrollYProgress} 
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
