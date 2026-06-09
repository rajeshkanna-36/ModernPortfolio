"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ProjectData } from "@/lib/projects";
import { ChevronLeft, ExternalLink } from "lucide-react";

// Synthetic Phone Frame for professional mockup wrapping
const PhoneFrame = ({ src, alt, className = "" }: { src: string; alt: string; className?: string }) => (
  <div className={`relative isolate rounded-[3rem] border-[12px] border-zinc-900 bg-zinc-900 shadow-[0_30px_60px_rgba(0,0,0,0.12)] overflow-hidden shrink-0 ${className}`}>
    {/* Inner styling */}
    <div className="absolute inset-0 rounded-[2.2rem] border-[0.5px] border-white/20 pointer-events-none z-20" />
    {/* Dynamic Island */}
    <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[30%] h-[26px] bg-black rounded-full z-30" />
    
    <div className="relative w-full h-full bg-zinc-100 rounded-[1.8rem] overflow-hidden">
      <Image src={src} alt={alt} fill className="object-cover" />
    </div>
  </div>
);

export default function SwayamCaseStudy({ project }: { project: ProjectData }) {
  const swayam = {
    ...project,
    title: "SWAYAM",
    role: "UX Researcher & Lead UI Designer",
    duration: "12 Weeks",
    figmaUrl: "https://www.figma.com/design/wPk0H1HLvb9n0REKpGxcMw/Swayam?node-id=0-1&t=scQwTdMRJI1cYSlM-1",
    overview: "SWAYAM is India's national education platform. We embarked on a ground-up conceptual redesign to mirror the immersive learning experience of premium modern platforms—optimizing discovery, playback, and milestones for millions of students.",
    assets: {
      landing: "/mockups/swayam/Landing page.png",
      auth: "/mockups/swayam/authentication.png",
      home: "/mockups/swayam/Home Screen.png",
      search: "/mockups/swayam/Search.png",
      playback1: "/mockups/swayam/Course play.png",
      playback2: "/mockups/swayam/Course play-1.png",
      progress: "/mockups/swayam/Course Inprogress.png",
      profile: "/mockups/swayam/Profile.png",
      splash: "/mockups/swayam/loading page.png"
    }
  };

  const fadeUp: any = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] text-zinc-900 pb-0 overflow-hidden font-sans selection:bg-zinc-200">
      
      {/* MINIMALIST HEADER */}
      <header className="w-full px-6 py-6 flex justify-between items-center max-w-[1400px] mx-auto absolute top-0 left-0 right-0 z-50">
        <Link href="/#work" className="flex items-center gap-2 text-zinc-500 hover:text-zinc-900 transition-colors font-medium text-sm">
          <ChevronLeft size={18} />
          Back to Portfolio
        </Link>
        <div className="text-xs font-bold tracking-widest uppercase text-zinc-400">
          Case Study 02
        </div>
      </header>

      {/* 00 / HERO SECTION */}
      <section className="relative w-full min-h-[90vh] flex flex-col items-center justify-center pt-32 pb-20 px-6 max-w-[1200px] mx-auto text-center">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-4xl mx-auto flex flex-col items-center">
          <div className="flex gap-4 items-center mb-8">
            <span className="px-4 py-1.5 rounded-full border border-zinc-200 text-xs font-bold uppercase tracking-widest text-zinc-500">Education</span>
            <span className="px-4 py-1.5 rounded-full border border-zinc-200 text-xs font-bold uppercase tracking-widest text-zinc-500">Mobile App</span>
          </div>
          
          <h1 className="text-7xl md:text-[8rem] leading-[0.9] font-black tracking-tighter text-zinc-950 mb-8">
            {swayam.title}
          </h1>
          
          <p className="text-xl md:text-2xl text-zinc-500 font-medium leading-relaxed max-w-2xl mb-12">
            {swayam.overview}
          </p>

          <a 
            href={swayam.figmaUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-zinc-900 hover:bg-black text-white font-semibold text-sm px-8 py-4 rounded-full transition-all hover:scale-105 active:scale-95 group shadow-[0_10px_40px_rgba(0,0,0,0.1)] mb-16"
          >
            View Full Figma File
            <ExternalLink size={16} className="text-zinc-400 group-hover:text-white transition-colors" />
          </a>
        </motion.div>

        {/* Hero Mockup Focus */}
        <motion.div initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }} className="relative z-10">
           <PhoneFrame src={swayam.assets.landing} alt="Landing Page" className="w-[320px] h-[660px] md:w-[380px] md:h-[780px]" />
        </motion.div>
      </section>

      {/* 01 / THE CHALLENGE (EDITORIAL GRID) */}
      <section className="w-full px-6 py-32 bg-white">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 items-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="md:col-span-5 md:col-start-2 flex flex-col justify-center">
            <span className="text-sm font-bold tracking-widest text-zinc-400 mb-6 uppercase">01 / The Challenge</span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-8 text-zinc-900 leading-tight">
              Designing for millions, intuitively.
            </h2>
            <p className="text-lg text-zinc-500 leading-relaxed font-medium mb-6">
              National educational platforms frequently struggle with massive drop-off rates due to overwhelming interfaces. The primary challenge was stripping away the administrative clutter to prioritize raw discovery and frictionless progress.
            </p>
            <div className="w-full h-[1px] bg-zinc-200 my-8" />
            <div className="grid grid-cols-2 gap-8">
               <div>
                 <p className="text-xs font-bold tracking-widest uppercase text-zinc-400 mb-2">Role</p>
                 <p className="text-sm font-semibold text-zinc-900">{swayam.role}</p>
               </div>
               <div>
                 <p className="text-xs font-bold tracking-widest uppercase text-zinc-400 mb-2">Timeline</p>
                 <p className="text-sm font-semibold text-zinc-900">{swayam.duration}</p>
               </div>
            </div>
          </motion.div>
          
          <div className="md:col-span-4 md:col-start-8 flex justify-center py-10 relative">
             <div className="absolute inset-0 bg-zinc-50 rounded-[4rem] -z-10 scale-110" />
             <PhoneFrame src={swayam.assets.home} alt="Home Screen" className="w-[300px] h-[620px]" />
          </div>
        </div>
      </section>

      {/* 02 / SEAMLESS ONBOARDING */}
      <section className="w-full px-6 py-32 bg-[#fafafa]">
        <div className="max-w-[1200px] mx-auto flex flex-col items-center text-center mb-24">
            <motion.span initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-sm font-bold tracking-widest text-zinc-400 mb-6 uppercase">02 / Seamless Access</motion.span>
            <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-4xl md:text-5xl font-black tracking-tighter mb-6 text-zinc-900 max-w-2xl">
              Establishing trust within the first five seconds.
            </motion.h2>
            <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-lg text-zinc-500 leading-relaxed font-medium max-w-2xl">
              A warm splash sequence cleanly hands off to an effortless authentication flow. We utilized stark contrasts and strict alignment to make credential entry feel secure and academic.
            </motion.p>
        </div>

        <div className="max-w-[900px] mx-auto flex flex-col md:flex-row justify-center gap-12 md:gap-24 relative">
            <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="flex flex-col items-center">
              <PhoneFrame src={swayam.assets.splash} alt="Splash Screen" className="w-[280px] h-[580px] mb-8" />
              <p className="text-sm font-bold tracking-widest text-zinc-400 uppercase">Splash Screen</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 80 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }} className="flex flex-col items-center mt-0 md:mt-24">
              <PhoneFrame src={swayam.assets.auth} alt="Authentication" className="w-[280px] h-[580px] mb-8" />
              <p className="text-sm font-bold tracking-widest text-zinc-400 uppercase">Secure Login</p>
            </motion.div>
        </div>
      </section>

      {/* 03 / THE DIGITAL CLASSROOM (DARK EDITORIAL) */}
      <section className="w-full px-6 py-32 bg-zinc-950 text-white selection:bg-zinc-800">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 items-center">
          
          <div className="md:col-span-5 md:col-start-1 flex relative justify-center order-2 md:order-1">
             <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}>
               <PhoneFrame src={swayam.assets.playback1} alt="Video Player" className="w-[300px] h-[620px] shadow-[0_0_100px_rgba(255,255,255,0.1)] border-zinc-800" />
             </motion.div>
          </div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="md:col-span-5 md:col-start-7 flex flex-col justify-center order-1 md:order-2">
            <span className="text-sm font-bold tracking-widest text-zinc-600 mb-6 uppercase">03 / The Classroom</span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-8 text-white leading-tight">
              Absolute focus.
            </h2>
            <p className="text-lg text-zinc-400 leading-relaxed font-medium mb-8">
              The video player is the core of the educational experience. We stripped away all surrounding UI elements to dim the lights on the curriculum. Interactive notes and rich transcription exist natively within the ecosystem, not as afterthoughts.
            </p>
            <ul className="space-y-4 text-zinc-300 font-medium">
               <li className="flex items-center gap-4"><div className="w-1.5 h-1.5 bg-white rounded-full"/> Distraction-free playback</li>
               <li className="flex items-center gap-4"><div className="w-1.5 h-1.5 bg-white rounded-full"/> Integrated curriculum navigation</li>
               <li className="flex items-center gap-4"><div className="w-1.5 h-1.5 bg-white rounded-full"/> Native transcription overlays</li>
            </ul>
          </motion.div>
          
        </div>
      </section>

      {/* 04 / PROGRESS TRACKING */}
      <section className="w-full px-6 py-32 bg-white">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 items-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="md:col-span-5 md:col-start-2 flex flex-col justify-center">
            <span className="text-sm font-bold tracking-widest text-zinc-400 mb-6 uppercase">04 / Momentum</span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-8 text-zinc-900 leading-tight">
              Visualizing the journey.
            </h2>
            <p className="text-lg text-zinc-500 leading-relaxed font-medium mb-6">
              Keeping students engaged in self-paced learning is notoriously difficult. The progress dashboard emphasizes micro-milestones. Highlighting active courses and recent grades natively provides undeniable psychological momentum.
            </p>
          </motion.div>
          
          <div className="md:col-span-5 md:col-start-8 relative flex h-[700px] items-center">
             <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="absolute right-20 z-20">
               <PhoneFrame src={swayam.assets.progress} alt="Progress Dashboard" className="w-[280px] h-[580px]" />
             </motion.div>
             <motion.div initial={{ opacity: 0, y: 80 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.15 }} className="absolute left-0 top-1/2 -translate-y-1/2 z-10">
               <PhoneFrame src={swayam.assets.profile} alt="Profile" className="w-[280px] h-[580px]" />
             </motion.div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <section className="w-full py-32 bg-[#fafafa] flex flex-col items-center border-t border-zinc-200">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <Link href="/#work" className="group flex flex-col items-center gap-6 cursor-pointer">
              <div className="w-24 h-24 bg-white border border-zinc-200 text-zinc-900 rounded-full flex items-center justify-center group-hover:bg-zinc-900 group-hover:text-white transition-all shadow-sm group-hover:shadow-2xl group-hover:scale-110 active:scale-95 duration-500 overflow-hidden relative">
                <ChevronLeft size={36} className="relative z-10 group-hover:-translate-x-1 transition-transform duration-300" />
              </div>
              <div className="flex flex-col items-center">
                 <span className="text-xs font-bold tracking-[0.2em] uppercase text-zinc-400 mb-2">Back to the start</span>
                 <span className="text-2xl font-black text-zinc-900 tracking-tighter">Return to Portfolio</span>
              </div>
            </Link>
          </motion.div>
      </section>

    </div>
  );
}
