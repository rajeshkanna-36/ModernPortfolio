"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ProjectData } from "@/lib/projects";
import { ChevronLeft, Maximize2 } from "lucide-react";

// Synthetic macOS Browser Frame
const BrowserFrame = ({ src, alt, className = "", scrollable = false }: { src: string; alt: string; className?: string; scrollable?: boolean }) => (
  <div className={`relative isolate rounded-2xl border border-zinc-200/60 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col ${className}`}>
    {/* macOS Chrome Header */}
    <div className="h-10 w-full bg-zinc-100/80 backdrop-blur-md border-b border-zinc-200/60 flex items-center px-4 shrink-0 relative z-20">
      <div className="flex gap-2">
        <div className="w-3 h-3 rounded-full bg-red-400 border border-red-500/20" />
        <div className="w-3 h-3 rounded-full bg-yellow-400 border border-yellow-500/20" />
        <div className="w-3 h-3 rounded-full bg-green-400 border border-green-500/20" />
      </div>
      <div className="absolute left-1/2 -translate-x-1/2 w-1/3 h-6 bg-white rounded-md border border-zinc-200/60 flex items-center justify-center shadow-sm">
         <span className="text-[10px] text-zinc-400 font-medium font-mono">kodex.ai</span>
      </div>
    </div>
    
    {/* Body Area */}
    <div className={`relative w-full bg-[#f8f9fa] ${scrollable ? 'overflow-y-auto overflow-x-hidden scrollbar-hide flex-1' : 'h-full overflow-hidden'}`}>
       {scrollable ? (
          <img src={src} alt={alt} className="w-full h-auto object-top" />
       ) : (
          <Image src={src} alt={alt} fill quality={100} priority unoptimized className="object-top object-cover" />
       )}
    </div>
  </div>
);

export default function KodexCaseStudy({ project }: { project: ProjectData }) {
  const fadeUp: any = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] text-zinc-900 pb-0 overflow-hidden font-sans selection:bg-blue-200">
      
      {/* MINIMALIST HEADER */}
      <header className="w-full px-6 py-6 flex justify-between items-center max-w-[1400px] mx-auto absolute top-0 left-0 right-0 z-50">
        <Link href="/#work" className="flex items-center gap-2 text-zinc-500 hover:text-zinc-900 transition-colors font-medium text-sm">
          <ChevronLeft size={18} />
          Back to Portfolio
        </Link>
        <div className="text-xs font-bold tracking-widest uppercase text-zinc-400">
          Case Study 03
        </div>
      </header>

      {/* 00 / HERO SECTION */}
      <section className="relative w-full min-h-screen flex flex-col items-center pt-40 pb-20 px-6 max-w-[1400px] mx-auto text-center">
        
        {/* Ambient Blur */}
        <div className="absolute top-0 right-0 w-[80vw] h-[80vw] bg-blue-100/50 rounded-full blur-[120px] pointer-events-none -z-10" />

        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-4xl mx-auto flex flex-col items-center mb-16">
          <div className="flex gap-4 items-center mb-8">
            <span className="px-4 py-1.5 rounded-full border border-blue-200 bg-blue-50 text-[10px] font-bold uppercase tracking-widest text-blue-600">Enterprise AI</span>
            <span className="px-4 py-1.5 rounded-full border border-zinc-200 text-[10px] font-bold uppercase tracking-widest text-zinc-500">Web Design</span>
          </div>
          
          <h1 className="text-6xl md:text-[8rem] leading-[0.9] font-black tracking-tighter text-zinc-950 mb-8">
            {project.title}
          </h1>
          
          <p className="text-xl md:text-2xl text-zinc-500 font-medium leading-relaxed max-w-2xl">
            {project.overview}
          </p>
        </motion.div>

        {/* Hero Browser Mockup */}
        <motion.div initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }} className="relative z-10 w-full max-w-5xl">
           <BrowserFrame src="/projects/kodex/light.png" alt="Kodex Light Theme Desktop" className="w-full h-[600px] md:h-[750px]" scrollable={false} />
        </motion.div>
      </section>

      {/* 01 / BRAND FOUNDATION */}
      <section className="w-full px-6 py-32 bg-white border-t border-zinc-100">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 items-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="md:col-span-12 md:col-start-3 text-center mb-16 max-w-3xl mx-auto">
            <span className="text-xs font-bold tracking-widest text-zinc-400 mb-6 uppercase">01 / The Canvas</span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-8 text-zinc-900 leading-tight">
              Designing for Trust.
            </h2>
            <p className="text-lg text-zinc-500 leading-relaxed font-medium">
              Enterprise software demands immediate credibility. Our goal was to design an aesthetic that feels both mathematically precise and humanely approachable. The architecture rests on generous padding, stark typography, and fluid visual intersections.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 02 / THE LIGHT & DARK ARCHITECTURE */}
      <section className="w-full px-6 py-32 bg-[#fafafa]">
        <div className="max-w-[1400px] mx-auto flex flex-col">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-20 max-w-3xl mx-auto">
              <span className="text-xs font-bold tracking-widest text-zinc-400 mb-6 uppercase">02 / Dual Aesthetics</span>
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-6 text-zinc-900">
                Light & Dark Symbiosis.
              </h2>
              <p className="text-lg text-zinc-500 leading-relaxed font-medium">
                To maximize B2B conversions and accessibility, the entire web platform was architected with two perfectly complementary themes. Notice how the glowing gradients shift context between modes while retaining brand continuity. <br/><br/><i>Hover and scroll inside the browsers below to explore the live web design.</i>
              </p>
            </motion.div>

            {/* Interactive Browser Dual Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 relative">
              <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="flex flex-col items-center group">
                <BrowserFrame src="/projects/kodex/light.png" alt="Light Theme Desktop" className="w-full h-[700px] md:h-[900px] mb-8 ring-4 ring-transparent group-hover:ring-blue-500/20 transition-all duration-500" scrollable={true} />
                <div className="flex items-center gap-3">
                   <div className="w-4 h-4 rounded-full bg-white border border-zinc-300 shadow-sm" />
                   <p className="text-sm font-bold tracking-widest text-zinc-400 uppercase">Light Theme</p>
                </div>
              </motion.div>
              
              <motion.div initial={{ opacity: 0, y: 80 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }} className="flex flex-col items-center group mt-0 md:mt-24">
                <BrowserFrame src="/projects/kodex/dark.png" alt="Dark Theme Desktop" className="w-full h-[700px] md:h-[900px] mb-8 ring-4 ring-transparent group-hover:ring-zinc-900/10 transition-all duration-500 shadow-2xl" scrollable={true} />
                <div className="flex items-center gap-3">
                   <div className="w-4 h-4 rounded-full bg-zinc-900 border border-zinc-700 shadow-sm" />
                   <p className="text-sm font-bold tracking-widest text-zinc-900 uppercase">Dark Theme</p>
                </div>
              </motion.div>
            </div>
        </div>
      </section>

      {/* FOOTER */}
      <section className="w-full py-32 bg-white flex flex-col items-center border-t border-zinc-100">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <Link href="/#work" className="group flex flex-col items-center gap-6 cursor-pointer">
              <div className="w-24 h-24 bg-[#fafafa] border border-zinc-200 text-zinc-900 rounded-full flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all shadow-sm group-hover:shadow-[0_20px_40px_rgba(37,99,235,0.25)] group-hover:scale-110 active:scale-95 duration-500 overflow-hidden relative">
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
