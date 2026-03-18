"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Magnetic from "@/components/ui/Magnetic";
import HeroDoodles from "@/components/home/HeroDoodles";

export default function HeroSection() {
  return (
    <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-transparent px-4 sm:px-6">
      {/* Background radial gradient for subtle depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.03)_0%,transparent_70%)] z-0" />
      <HeroDoodles />

      <div className="relative z-10 text-center scale-[0.85] sm:scale-100">
        <div className="relative inline-block text-left mt-2">
          {/* Helper Components for Custom Characters */}
          <div className="hidden">
            {/* Pixelated A */}
            <svg id="pixel-a" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 4h8v4h4v16h-4v-4H8v4H4V8h4V4zM8 8v8h8V8H8z" />
            </svg>
            {/* Pixelated D */}
            <svg id="pixel-d" viewBox="0 0 24 24" fill="currentColor">
              <path d="M4 4h12v4h4v8h-4v4H4V4zm4 4v8h8V8H4z" />
            </svg>
            {/* Sunburst O */}
            <svg id="sunburst" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="4">
              {[...Array(24)].map((_, i) => (
                <line
                  key={i}
                  x1="50" y1="50"
                  x2={50 + 40 * Math.cos((i * 15 * Math.PI) / 180)}
                  y2={50 + 40 * Math.sin((i * 15 * Math.PI) / 180)}
                />
              ))}
            </svg>
          </div>

          {/* Invisible placeholder for dimensions */}
          <div className="text-[11.5vw] sm:text-7xl md:text-8xl lg:text-[9.5rem] font-bold tracking-tighter leading-[0.8] opacity-0 select-none pointer-events-none p-5 md:p-8 whitespace-nowrap">
            FULL STACK<br />DEVELOPER
          </div>

          {/* Reveal Overlay */}
          <motion.div
            initial={{ clipPath: "inset(0% 100% 100% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="absolute inset-0 z-10 overflow-visible"
          >
            <div className="absolute inset-0 bg-[#3b82f6]/5 border-[4px] border-[#3b82f6]/40 p-5 md:p-8 flex flex-col justify-center">
              <div className="text-[11.5vw] sm:text-7xl md:text-8xl lg:text-[9.5rem] font-bold tracking-tighter leading-[0.8] text-black whitespace-nowrap">
                {/* LINE 1: FULL STACK */}
                <div className="flex items-center">
                  <span>FULL ST</span>
                  <span className="relative inline-block w-[1.1em] h-[0.9em] mx-[0.02em]">
                    <svg className="absolute inset-0 w-full h-full"><use href="#pixel-a" /></svg>
                  </span>
                  <div className="relative inline-flex items-center justify-center mx-[0.02em] w-[0.6em] h-[0.85em] rounded-[100%] border-[0.05em] border-black">
                    <span className="text-[0.45em] translate-y-[-0.05em]">C</span>
                  </div>
                  <span>K</span>
                </div>

                {/* LINE 2: DEVELOPER */}
                <div className="text-[#f97316] flex items-center">
                  <span className="relative inline-block w-[1.4em] h-[1.1em] mr-[0.05em] translate-y-[0.08em]">
                    <svg className="absolute inset-0 w-full h-full text-[#f97316]"><use href="#pixel-d" /></svg>
                  </span>
                  <span className="text-[0.6em] mt-[0.2em] -ml-[0.1em]">E</span>
                  <span>VEL</span>
                  <span className="relative inline-block w-[0.9em] h-[0.9em] mx-[0.05em]">
                    <svg className="absolute inset-0 w-full h-full text-[#f97316]"><use href="#sunburst" /></svg>
                  </span>
                  <span>PE</span>
                  <div className="relative inline-flex items-center justify-center mx-[0.05em] w-[0.6em] h-[0.85em] rounded-[100%] border-[0.05em] border-[#f97316]">
                    <span className="text-[0.45em] translate-y-[-0.05em]">R</span>
                  </div>
                  <span className="inline-block ml-[0.1em] translate-y-[0.05em]">
                    <svg width="0.6em" height="0.6em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="7" y1="17" x2="17" y2="7" />
                      <polyline points="7 7 17 7 17 17" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Corner Handles */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute -top-[4px] -left-[4px] w-3 h-3 bg-white border-[3px] border-[#3b82f6] z-20" />
          <motion.div initial={{ left: 0 }} animate={{ left: "100%" }} transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }} className="absolute -top-[4px] -ml-[6px] w-3 h-3 bg-white border-[3px] border-[#3b82f6] z-20" />
          <motion.div initial={{ top: 0 }} animate={{ top: "100%" }} transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }} className="absolute -left-[4px] -mt-[6px] w-3 h-3 bg-white border-[3px] border-[#3b82f6] z-20" />
          <motion.div initial={{ left: 0, top: 0 }} animate={{ left: "100%", top: "100%" }} transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }} className="absolute -ml-[6px] -mt-[6px] w-3 h-3 bg-white border-[3px] border-[#3b82f6] z-20" />

          {/* Mouse Cursor Overlay */}
          <motion.div 
            initial={{ left: 0, top: 0, opacity: 0 }}
            animate={{ left: "100%", top: "100%", opacity: 1 }} 
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="absolute z-[60] pointer-events-none"
          >
            <div className="translate-y-3 translate-x-3">
              <svg width="36" height="36" viewBox="0 0 36 36" fill="#3b82f6" stroke="white" strokeWidth="2.5"><path d="M10 6L28 18L20 18L20 30L10 6Z" /></svg>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-8 sm:mt-12 flex items-center justify-center gap-6"
        >
          <div className="h-px w-8 bg-zinc-200" />
          <p className="text-zinc-500 text-sm font-light tracking-widest uppercase">
            Product Focused • Design Driven
          </p>
          <div className="h-px w-8 bg-zinc-200" />
        </motion.div>

        {/* Squiggled Arrow - Hand-drawn feel */}
        <motion.div
           initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
           animate={{ opacity: 1, scale: 1, rotate: 0 }}
           transition={{ duration: 0.8, delay: 1.5, ease: "easeOut" }}
           className="absolute -right-24 top-1/2 -translate-y-1/2 hidden lg:block pointer-events-none group/arrow"
        >
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-40">
            <motion.path
              d="M20 100C30 80 50 60 70 70C90 80 80 100 60 90C40 80 50 40 100 20"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              className="text-zinc-600"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, delay: 1.8, ease: "easeInOut" }}
            />
            <motion.path
              d="M85 25L100 20L95 35"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-zinc-600"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, delay: 3.3, ease: "easeOut" }}
            />
          </svg>
          <motion.span 
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.1, rotate: 15 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className="absolute top-0 -right-16 text-zinc-400 text-xs font-medium tracking-widest uppercase rotate-12 cursor-default pointer-events-auto"
          >
            Design Focused
          </motion.span>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <Magnetic className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.25 }}
          className="flex flex-col items-center gap-2 cursor-pointer group/scroll select-none"
          data-cursor-hover
          onClick={() => {
            window.scrollTo({
              top: window.innerHeight,
              behavior: "smooth",
            });
          }}
        >
          <span className="text-[10px] uppercase tracking-widest text-zinc-600 group-hover/scroll:text-zinc-900 transition-colors">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="group-hover/scroll:translate-y-1 transition-transform"
          >
            <ChevronDown className="w-4 h-4 text-zinc-600 group-hover/scroll:text-zinc-900 transition-colors" />
          </motion.div>
        </motion.div>
      </Magnetic>
    </section>
  );
}
