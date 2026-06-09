"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ProjectData } from "@/lib/projects";
import { ChevronLeft, Play, FastForward, Rewind, Shuffle, Repeat, ExternalLink } from "lucide-react";
import { useRef } from "react";

export default function CaseStudyTemplate({ project }: { project: ProjectData }) {
  const { scrollYProgress } = useScroll();
  
  // Parallax transforms for the hero and mockups
  const yHeroText = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const yHeroImage = useTransform(scrollYProgress, [0, 1], [0, -400]);

  // Localized scroll for the Carousel Parallax
  const carouselRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: carouselScroll } = useScroll({
    target: carouselRef,
    offset: ["start end", "end start"]
  });

  const yCenter = useTransform(carouselScroll, [0, 1], [150, -250]);
  const yInner = useTransform(carouselScroll, [0, 1], [50, -150]);
  const yOuter = useTransform(carouselScroll, [0, 1], [-20, 20]);

  // Navigation sections for the sticky bar
  const navItems = ["Overview", "Research", "Design", "Final App"];

  // OVERRIDE DATA LOCALLY
  const displayProject = project.slug === 'cheers' ? {
    ...project,
    title: "MusicLay",
    role: "Lead UI/UX Designer",
    duration: "10 Weeks",
    projectType: "Mobile Application Design",
    figmaUrl: "https://www.figma.com/design/GjH9d8EE4pRYcQgcOgfgHY/musicaly?node-id=428-76&t=70c51G6k1b9FVyVX-1",
    overview: "MusicLay is a conceptual music streaming platform designed to redefine how listeners discover and experience their favorite artists. Moving away from generic grids, the interface prioritizes high-fidelity artwork and seamless, deeply personalized curation paths.",
    roleDescription: "As the Lead Designer, I spearheaded the end-to-end product design lifecycle. This involved establishing the core design system, creating rapid wireframes, testing user interaction paradigms for the floating player, and polishing the final high-fidelity screens out of raw research insights.",
    researchPlan: {
      subtitle: "Understanding User Music Needs",
      stats: [
        { value: "48", label: "Beta Listeners" },
        { value: "15", label: "Usability Interviews" },
        { value: "92%", label: "Satisfaction Rate" },
        { value: "10K+", label: "Songs Indexed" },
      ],
      methods: []
    }
  } : project;

  // Generic data points mapped out as songs in a tracklist
  const trackListData = [
    { title: "User Interview Analysis", artist: "Discovery Phase", time: "3:42" },
    { title: "Competitor Market Audit", artist: "Market Research", time: "4:15" },
    { title: "Wireframing Navigation", artist: "UX Architecture", time: "2:50" },
    { title: "High-Fidelity Player", artist: "UI Design", time: "5:01" },
    { title: "Final Usability Testing", artist: "Refinement", time: "4:33" }
  ];

  return (
    <div className="min-h-screen bg-[#fafafa] text-zinc-900 pb-20 overflow-hidden selection:bg-zinc-200 relative">
      
      {/* Background Dots Pattern for texture (No gradients, text removed) */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      {/* Sticky Navigation */}
      <div className="sticky top-0 z-50 w-full pt-4 pb-2 px-6 flex justify-center pointer-events-none backdrop-blur-xl bg-white/70 border-b border-zinc-200">
        <div className="w-full max-w-7xl flex items-center justify-between pointer-events-auto">
          <Link href="/" className="bg-white hover:bg-zinc-50 border border-zinc-200 transition-all shadow-sm text-zinc-900 w-12 h-12 rounded-full flex items-center justify-center shrink-0 hover:scale-105">
            <ChevronLeft size={24} />
          </Link>
          
          <div className="bg-white border border-zinc-200 hidden md:flex items-center mx-auto rounded-full p-1.5 shadow-sm">
            {navItems.map((item, i) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                className={`px-5 py-2 text-sm font-medium rounded-full transition-colors ${i === 0 ? 'bg-zinc-900 text-white shadow-md' : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100'}`}
              >
                {item}
              </a>
            ))}
          </div>
          <div className="w-12 hidden md:block" />
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 md:px-6 mt-8 relative z-10 flex flex-col gap-24">
        
        {/* HERO SECTION */}
        <section id="overview" className="relative w-full rounded-[2.5rem] bg-white border border-zinc-200 shadow-sm p-10 md:p-20 min-h-[550px] flex flex-col justify-end overflow-hidden group">
          <div className="absolute top-12 left-12 flex gap-1.5 items-end h-16 opacity-80 z-20">
             {[1,2,3,4,5,6,7].map((bar) => (
               <motion.div 
                 key={bar}
                 animate={{ height: ["20%", "100%", "40%", "80%", "30%"] }}
                 transition={{ duration: 1.5 + Math.random(), repeat: Infinity, repeatType: "mirror" }}
                 className="w-2.5 bg-zinc-900 rounded-t-sm"
               />
             ))}
          </div>

          <motion.div style={{ y: yHeroText }} className="relative z-10 w-full md:w-1/2 mt-20">
            <motion.h1 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
              className="text-7xl md:text-9xl font-black tracking-tighter text-zinc-900 mb-8"
            >
              {displayProject.title}
            </motion.h1>
            
            <div className="flex flex-wrap gap-x-12 gap-y-6 bg-white/80 backdrop-blur-md p-6 rounded-2xl border border-zinc-100 shadow-sm inline-flex mb-6">
              <div>
                <h3 className="text-zinc-400 font-semibold mb-1 uppercase text-xs tracking-wider">Main Role</h3>
                <p className="text-zinc-700 text-lg font-bold">{displayProject.role}</p>
              </div>
              <div>
                <h3 className="text-zinc-400 font-semibold mb-1 uppercase text-xs tracking-wider">Duration</h3>
                <p className="text-zinc-700 text-lg font-bold">{displayProject.duration}</p>
              </div>
            </div>

            {displayProject.figmaUrl && (
               <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="flex">
                 <a 
                   href={displayProject.figmaUrl} 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="inline-flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-white font-medium text-sm px-6 py-3.5 rounded-full transition-all hover:scale-105 hover:shadow-lg active:scale-95 group shadow-md"
                 >
                   View Figma File
                   <ExternalLink size={16} className="text-zinc-400 group-hover:text-white transition-colors" />
                 </a>
               </motion.div>
            )}
          </motion.div>
          
          {/* Floating Hero Image (Splash Screen) via Parallax */}
          {displayProject.keyScreens.length > 0 && (
            <motion.div 
              style={{ y: yHeroImage }}
              initial={{ opacity: 0, y: 300, rotate: 10 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 80, damping: 20 }}
              className="absolute -bottom-[20%] right-[5%] w-[350px] h-[700px] hidden lg:block cursor-pointer z-30"
            >
              <div className="relative w-full h-full drop-shadow-[0_40px_100px_rgba(0,0,0,0.15)] hover:scale-105 transition-transform duration-500">
                 <Image src={displayProject.keyScreens[0]} alt="MusicLay Splash" fill className="object-contain" />
              </div>
            </motion.div>
          )}
        </section>

        {/* MARQUEE DIVIDER */}
        <div className="w-full overflow-hidden bg-zinc-900 py-4 -mx-4 md:-mx-6 px-4 md:px-6 rotate-1 scale-110 flex z-30 shadow-xl">
           <motion.div 
             animate={{ x: ["0%", "-50%"] }} 
             transition={{ ease: "linear", duration: 15, repeat: Infinity }}
             className="flex whitespace-nowrap gap-8 text-white font-black text-xl uppercase italic tracking-widest leading-none pointer-events-none"
           >
             {Array(10).fill("High-Fidelity Audio • Seamless Playback • ").map((text, i) => (
                <span key={i}>{text}</span>
             ))}
           </motion.div>
        </div>

        {/* DETAILED PROBLEM & SOLUTION */}
        <section className="max-w-4xl mx-auto flex flex-col md:flex-row gap-12 relative z-20">
          <motion.div
             initial={{ opacity: 0, x: -40 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true, margin: "-100px" }}
             className="w-full md:w-1/2 bg-white border border-zinc-200 p-8 rounded-3xl shadow-sm"
          >
            <h2 className="text-2xl font-bold tracking-tight text-zinc-900 mb-4 flex items-center gap-2">
               <span className="w-3 h-3 bg-red-500 rounded-full" /> The Challenge
            </h2>
            <p className="text-lg text-zinc-500 leading-relaxed font-light">
              Current audio streaming platforms present users with overwhelming grids. The challenge was to design an experience that puts the artistry first—maximizing album art and seamless listening transitions.
            </p>
          </motion.div>
          
          <motion.div
             initial={{ opacity: 0, x: 40 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true, margin: "-100px" }}
             transition={{ delay: 0.1 }}
             className="w-full md:w-1/2 bg-zinc-900 border border-zinc-800 p-8 rounded-3xl shadow-xl text-white"
          >
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
               <span className="w-3 h-3 bg-green-400 rounded-full" /> The Solution
            </h2>
            <p className="text-lg text-zinc-300 leading-relaxed font-light">
              {displayProject.overview}
            </p>
          </motion.div>
        </section>

        {/* COVER FLOW CAROUSEL SHOWCASE WITH PARALLAX SCROLL */}
        <section id="design" ref={carouselRef} className="relative w-full h-[600px] md:h-[800px] flex items-center justify-center pointer-events-none mt-20 overflow-visible">
          {displayProject.keyScreens.length >= 5 && (
            <div className="relative w-full max-w-7xl h-full flex items-center justify-center">
               
               {/* Far Left Phone (Splash) */}
               <motion.div 
                 style={{ y: yOuter }}
                 initial={{ opacity: 0, x: -100 }}
                 whileInView={{ opacity: 0.3, x: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: 0.4, type: "spring", stiffness: 60 }}
                 className="absolute z-10 w-[240px] md:w-[300px] h-[480px] md:h-[600px] -translate-x-[95%] md:-translate-x-[110%] scale-[0.70] cursor-default pointer-events-none drop-shadow-sm"
               >
                 <Image src={displayProject.keyScreens[0]} alt="Splash Screen" fill className="object-contain" />
               </motion.div>

               {/* Inner Left Phone (Home) */}
               <motion.div 
                 style={{ y: yInner }}
                 initial={{ opacity: 0, x: -100 }}
                 whileInView={{ opacity: 0.8, x: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: 0.2, type: "spring", stiffness: 60 }}
                 className="absolute z-20 w-[260px] md:w-[340px] h-[520px] md:h-[680px] -translate-x-[50%] md:-translate-x-[55%] scale-[0.85] pointer-events-auto drop-shadow-lg hover:opacity-100 hover:scale-[0.88] transition-all duration-300 cursor-pointer"
               >
                 <Image src={displayProject.keyScreens[1]} alt="Home Screen" fill className="object-contain" />
               </motion.div>

               {/* Center Phone (Hand Mockup uploaded entirely by User) */}
               <motion.div 
                 style={{ y: yCenter }}
                 initial={{ opacity: 0, scale: 0.9 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 viewport={{ once: true }}
                 transition={{ type: "spring", stiffness: 50, damping: 20 }}
                 className="absolute z-50 w-[420px] md:w-[500px] h-[840px] md:h-[1000px] drop-shadow-[0_40px_100px_rgba(0,0,0,0.25)] pointer-events-auto translate-y-[5%]"
               >
                 <Image src={displayProject.keyScreens[5] || displayProject.keyScreens[4]} alt="Center Hand Screen" fill className="object-contain hover:scale-105 transition-transform duration-500 cursor-pointer" />
               </motion.div>

               {/* Inner Right Phone (Subscription) */}
               <motion.div 
                 style={{ y: yInner }}
                 initial={{ opacity: 0, x: 100 }}
                 whileInView={{ opacity: 0.8, x: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: 0.3, type: "spring", stiffness: 60 }}
                 className="absolute z-20 w-[260px] md:w-[340px] h-[520px] md:h-[680px] translate-x-[50%] md:translate-x-[55%] scale-[0.85] pointer-events-auto drop-shadow-lg hover:opacity-100 hover:scale-[0.88] transition-all duration-300 cursor-pointer"
               >
                 <Image src={displayProject.keyScreens[2]} alt="Subscription Screen" fill className="object-contain" />
               </motion.div>

               {/* Far Right Phone (Language) */}
               <motion.div 
                 style={{ y: yOuter }}
                 initial={{ opacity: 0, x: 100 }}
                 whileInView={{ opacity: 0.3, x: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: 0.5, type: "spring", stiffness: 60 }}
                 className="absolute z-10 w-[240px] md:w-[300px] h-[480px] md:h-[600px] translate-x-[95%] md:translate-x-[110%] scale-[0.70] cursor-default pointer-events-none drop-shadow-sm"
               >
                 <Image src={displayProject.keyScreens[3]} alt="Language Screen" fill className="object-contain" />
               </motion.div>

            </div>
          )}
        </section>

        {/* ROLE & PLAYER SCREEN ALONGSIDE DYNAMIC TICKER */}
        <section className="flex flex-col md:flex-row items-center gap-12 bg-white border border-zinc-200 rounded-[3rem] p-8 md:p-16 shadow-sm relative overflow-hidden">
          {/* Background animated text behind the Role Section */}
          <motion.div animate={{ x: ["0%", "-50%"] }} transition={{ duration: 20, ease: "linear", repeat: Infinity }} className="absolute -top-10 left-0 text-[10rem] font-bold text-zinc-50 whitespace-nowrap z-0 pointer-events-none select-none">
             DESIGN SYSTEM • COMPONENTS • PROTOTYPING
          </motion.div>

          <div className="w-full md:w-1/2 relative z-10">
            <h2 className="text-4xl font-bold tracking-tight text-zinc-900 mb-6 font-serif italic">
              Crafting the <br/> Visual Language
            </h2>
            <p className="text-xl text-zinc-600 leading-relaxed font-light whitespace-pre-line mb-8">
              {displayProject.roleDescription.replace('. ', '.\n\n')}
            </p>
            <div className="flex gap-4">
               <div className="w-12 h-12 rounded-full border border-zinc-200 bg-white flex items-center justify-center hover:bg-zinc-50 transition-colors shadow-sm cursor-pointer"><Play className="text-zinc-900" size={18} fill="currentColor" /></div>
            </div>
          </div>
          
          <div className="w-full md:w-1/2 flex justify-center relative z-10 mt-12 md:mt-0">
             {displayProject.keyScreens.length >= 5 && (
               <motion.div 
                 initial={{ opacity: 0, scale: 0.8, rotateY: 30 }}
                 whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                 viewport={{ once: true }}
                 whileHover={{ scale: 1.08, rotateZ: 2 }}
                 transition={{ type: "spring", stiffness: 100, damping: 15 }}
                 className="relative w-[340px] h-[680px] drop-shadow-[0_50px_100px_rgba(0,0,0,0.2)] cursor-pointer"
               >
                 <Image src={displayProject.keyScreens[4]} alt="Player Screen" fill className="object-contain" />
               </motion.div>
             )}
          </div>
        </section>

        {/* TRACKLIST RESEARCH SECTION */}
        <section id="research" className="bg-white border border-zinc-200 shadow-sm rounded-3xl p-8 md:p-12 mb-20 relative overflow-hidden">
          <div className="absolute right-0 top-0 w-[400px] h-[400px] bg-zinc-50 rounded-full blur-[100px] opacity-80 pointer-events-none z-0" />
          
          <div className="flex flex-col xl:flex-row gap-16 relative z-10">
            <div className="w-full xl:w-1/3">
              <h2 className="text-5xl font-black tracking-tight text-zinc-900 mb-4 tracking-tighter">Validation Data.</h2>
              <p className="text-zinc-500 mb-8 font-light text-lg">{displayProject.researchPlan.subtitle}</p>
              
              <div className="grid grid-cols-2 gap-4">
                {displayProject.researchPlan.stats.map((stat, idx) => (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1, type: "spring", bounce: 0.4 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    key={idx} 
                    className="bg-zinc-50 border border-zinc-100 hover:border-zinc-300 transition-all rounded-2xl p-6 relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-white translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-300 z-0" />
                    <div className="relative z-10">
                      <div className="text-3xl font-black text-zinc-900 mb-1">{stat.value}</div>
                      <div className="text-xs text-zinc-500 font-bold uppercase tracking-wider">{stat.label}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Simulated Audio Tracklist */}
            <div className="w-full xl:w-2/3">
               <div className="flex items-center text-xs text-zinc-400 font-bold uppercase tracking-widest border-b border-zinc-200 pb-4 mb-4 px-4">
                 <div className="w-12">#</div>
                 <div className="flex-1">Phase Title</div>
                 <div className="hidden sm:block flex-1">Methodology</div>
                 <div className="w-12 text-right">Time</div>
               </div>

               <div className="flex flex-col gap-1">
                 {trackListData.map((track, idx) => (
                   <motion.div 
                     key={idx}
                     initial={{ opacity: 0, x: 20 }}
                     whileInView={{ opacity: 1, x: 0 }}
                     viewport={{ once: true }}
                     transition={{ delay: idx * 0.1 }}
                     whileHover={{ scale: 1.02, backgroundColor: "#fafafa" }}
                     className="flex items-center group border border-transparent rounded-xl p-4 cursor-pointer transition-all"
                   >
                     <div className="w-12 text-zinc-400 font-medium group-hover:hidden">{idx + 1}</div>
                     <div className="w-12 text-zinc-900 hidden group-hover:flex items-center">
                       <Play size={16} fill="currentColor" />
                     </div>
                     <div className="flex-1 font-bold text-zinc-700 group-hover:text-zinc-900">{track.title}</div>
                     <div className="hidden sm:block flex-1 text-sm text-zinc-500 font-medium">{track.artist}</div>
                     <div className="w-12 text-right text-sm text-zinc-400 font-medium">{track.time}</div>
                   </motion.div>
                 ))}
               </div>
               
               {/* Player Controls */}
               <motion.div 
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 className="mt-12 bg-white shadow-[0_20px_40px_rgba(0,0,0,0.06)] rounded-[2rem] p-6 flex flex-col md:flex-row items-center justify-between gap-6 border border-zinc-100"
               >
                 <div className="flex items-center gap-4 w-full md:w-1/3">
                    <div className="w-14 h-14 bg-zinc-900 rounded-2xl shadow-xl flex items-center justify-center overflow-hidden">
                      <motion.div animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} className="w-8 h-8 rounded-full border-[3px] border-zinc-700 border-t-white" />
                    </div>
                    <div>
                      <div className="font-bold text-zinc-900 text-sm">Design Delivery</div>
                      <div className="text-xs text-zinc-500 mt-0.5">Project Complete</div>
                    </div>
                 </div>
                 
                 <div className="flex flex-col items-center w-full md:w-1/3">
                    <div className="flex items-center gap-6 mb-3">
                      <Shuffle size={16} className="text-zinc-400 hover:text-zinc-900 transition-colors cursor-pointer" />
                      <Rewind size={20} className="text-zinc-400 hover:text-zinc-900 transition-colors cursor-pointer" />
                      <div className="w-12 h-12 rounded-full bg-zinc-900 flex items-center justify-center text-white hover:scale-110 active:scale-95 transition-transform shadow-[0_5px_15px_rgba(0,0,0,0.2)] cursor-pointer">
                        <Play size={16} fill="currentColor" className="ml-1" />
                      </div>
                      <FastForward size={20} className="text-zinc-400 hover:text-zinc-900 transition-colors cursor-pointer" />
                      <Repeat size={16} className="text-zinc-400 hover:text-zinc-900 transition-colors cursor-pointer" />
                    </div>
                    <div className="w-full flex items-center gap-3 text-xs text-zinc-400 font-bold">
                      <span>4:00</span>
                      <div className="flex-1 h-2 bg-zinc-100 rounded-full overflow-hidden relative cursor-pointer group">
                        <div className="w-full h-full bg-zinc-200 absolute inset-0"></div>
                        <div className="w-full h-full bg-zinc-900 relative rounded-full group-hover:bg-purple-500 transition-colors"></div>
                      </div>
                      <span>4:00</span>
                    </div>
                 </div>
                 
                 <div className="w-full md:w-1/3 flex justify-end hidden md:flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full border-2 border-zinc-300" />
                    <div className="w-24 h-2 bg-zinc-100 rounded-full overflow-hidden">
                      <div className="w-2/3 h-full bg-zinc-400 rounded-full"></div>
                    </div>
                 </div>
               </motion.div>
            </div>
          </div>
        </section>

        {/* BACK TO PROJECTS FOOTER */}
        <section className="mt-10 mb-10 flex flex-col items-center justify-center relative z-20">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100 }}>
            <Link href="/#work" className="group flex flex-col items-center gap-6 cursor-pointer">
              <div className="w-24 h-24 bg-white border border-zinc-200 text-zinc-900 rounded-full flex items-center justify-center group-hover:bg-zinc-900 group-hover:text-white transition-all shadow-[0_20px_40px_rgba(0,0,0,0.05)] group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.15)] group-hover:scale-110 active:scale-95 duration-500 overflow-hidden relative">
                <ChevronLeft size={36} className="relative z-10 group-hover:-translate-x-1 transition-transform duration-300" />
              </div>
              <div className="flex flex-col items-center">
                 <span className="text-sm font-semibold tracking-widest uppercase text-zinc-400 mb-1">Return Home</span>
                 <span className="text-3xl font-black text-zinc-900 tracking-tighter">Back to Projects</span>
              </div>
            </Link>
          </motion.div>
        </section>

      </main>
    </div>
  );
}
