"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Magnetic from "@/components/ui/Magnetic";
import dynamic from "next/dynamic";

const HeroDoodles = dynamic(() => import("@/components/home/HeroDoodles"), {
  ssr: false,
});
const CYCLE_DURATION = 6000;
const ANIM_DURATION = 1.0;
const ANIM_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const heroTitles = ["CREATIVE", "UI / UX", "PRODUCT"];

function Line1Creative() {
  return (
    <div className="flex items-center">
      <span>CRE</span>
      <div className="relative inline-flex items-center justify-center mx-[0.02em] w-[0.6em] h-[0.85em] rounded-[100%] border-[0.05em] border-black">
        <span className="text-[0.45em] translate-y-[-0.05em]">A</span>
      </div>
      <span>TIVE</span>
    </div>
  );
}

function Line1UiUx() {
  return (
    <div className="flex items-center">
      <span>UI</span>
      <span className="mx-[0.15em] text-[0.5em] text-zinc-300 font-light">/</span>
      <span>U</span>
      <div className="relative inline-flex items-center justify-center mx-[0.02em] w-[0.6em] h-[0.85em] rounded-[100%] border-[0.05em] border-black">
        <span className="text-[0.45em] translate-y-[-0.05em]">X</span>
      </div>
    </div>
  );
}

function Line1Product() {
  return (
    <div className="flex items-center">
      <span>PR</span>
      <div className="relative inline-flex items-center justify-center mx-[0.02em] w-[0.6em] h-[0.85em] rounded-[100%] border-[0.05em] border-black">
        <span className="text-[0.45em] translate-y-[-0.05em]">O</span>
      </div>
      <span>DUCT</span>
    </div>
  );
}

function DesignerLine() {
  return (
    <div className="text-[#f97316] flex items-center">
      <span>DESI</span>
      <span className="relative inline-block w-[0.9em] h-[0.9em] mx-[0.02em]">
        <svg className="absolute inset-0 w-full h-full text-[#f97316]"><use href="#sunburst" /></svg>
      </span>
      <span>N</span>
      <span className="text-[0.6em] mt-[0.2em]">E</span>
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
  );
}

const line1Components: Record<string, () => React.ReactNode> = {
  CREATIVE: Line1Creative,
  "UI / UX": Line1UiUx,
  PRODUCT: Line1Product,
};

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroTitles.length);
    }, CYCLE_DURATION);
    return () => clearInterval(interval);
  }, []);

  const currentTitle = heroTitles[currentIndex];
  const Line1Component = line1Components[currentTitle];

  return (
    <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-transparent px-4 sm:px-6">
      {/* Background radial gradient for subtle depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.03)_0%,transparent_70%)] z-0" />
      <HeroDoodles />

      <div className="relative z-10 text-center scale-[0.85] sm:scale-100">
        <motion.div
          className="relative inline-block text-left mt-2 cursor-grab active:cursor-grabbing"
          drag
          dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
          dragElastic={0.18}
          dragMomentum={false}
          whileTap={{ scale: 0.99 }}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={() => setIsDragging(false)}
        >
          {/* Speech bubble on drag */}
          <AnimatePresence>
            {isDragging && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 10 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="absolute -top-14 left-1/2 -translate-x-1/2 z-50"
              >
                <div className="relative px-4 py-2 bg-zinc-900 rounded-xl shadow-lg whitespace-nowrap">
                  <span className="text-sm text-white font-medium">Hey! Put me back! 😤</span>
                  <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-zinc-900 rotate-45" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          {/* Helper SVG Definitions */}
          <div className="hidden">
            {/* Sunburst for G */}
            <svg id="sunburst" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="4">
              {[...Array(24)].map((_, i) => {
                const angle = (i * 15 * Math.PI) / 180;
                const x2 = parseFloat((50 + 40 * Math.cos(angle)).toFixed(6));
                const y2 = parseFloat((50 + 40 * Math.sin(angle)).toFixed(6));
                return <line key={i} x1="50" y1="50" x2={x2} y2={y2} />;
              })}
            </svg>
          </div>

          {/* Invisible placeholder for dimensions — uses longest title to keep container stable */}
          <div className="text-[14vw] sm:text-[11.5vw] md:text-8xl lg:text-[9.5rem] font-bold tracking-tighter leading-[0.8] opacity-0 select-none pointer-events-none p-2 sm:p-3 md:p-6 whitespace-nowrap">
            CREATIVE<br />DESIGNER
          </div>

          {/* Animated cycling content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              className="absolute inset-0 overflow-visible"
            >
              {/* Selection Marquee — follows cursor with slight delay */}
              <motion.div
                initial={{ width: 0, height: 0, opacity: 0 }}
                animate={{ width: "100%", height: "100%", opacity: 1 }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.25, delay: 0.15, ease: "easeIn" }
                }}
                transition={{ duration: ANIM_DURATION, delay: 0.06, ease: ANIM_EASE }}
                className="absolute top-0 left-0 z-20 pointer-events-none border-[3px] border-[#3b82f6]/80 bg-[#3b82f6]/5"
              />

              {/* Reveal Overlay (Clipped Text) — fades out first */}
              <motion.div
                initial={{ clipPath: "inset(0% 100% 100% 0%)" }}
                animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.2, ease: "easeIn" }
                }}
                transition={{ duration: ANIM_DURATION, delay: 0.1, ease: ANIM_EASE }}
                className="absolute inset-0 z-10 overflow-visible pointer-events-none"
              >
                <div className="absolute inset-0 p-2 sm:p-3 md:p-6 flex flex-col justify-center">
                  <div className="text-[14vw] sm:text-[11.5vw] md:text-8xl lg:text-[9.5rem] font-bold tracking-tighter leading-[0.8] text-black whitespace-nowrap">
                    {/* LINE 1: Dynamic title */}
                    <Line1Component />

                    {/* LINE 2: DESIGNER (constant) */}
                    <DesignerLine />
                  </div>
                </div>
              </motion.div>

              {/* Corner Handles */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.25, delay: 0.15, ease: "easeIn" } }}
                transition={{ duration: 0.2, delay: 0.06 }}
                className="absolute -top-[4px] -left-[4px] w-3 h-3 bg-white border-[2px] border-[#3b82f6] z-20"
              />
              <motion.div
                initial={{ left: 0 }}
                animate={{ left: "100%" }}
                exit={{ opacity: 0, transition: { duration: 0.25, delay: 0.15, ease: "easeIn" } }}
                transition={{ duration: ANIM_DURATION, delay: 0.06, ease: ANIM_EASE }}
                className="absolute -top-[4px] -ml-[6px] w-3 h-3 bg-white border-[2px] border-[#3b82f6] z-20"
              />
              <motion.div
                initial={{ top: 0 }}
                animate={{ top: "100%" }}
                exit={{ opacity: 0, transition: { duration: 0.25, delay: 0.15, ease: "easeIn" } }}
                transition={{ duration: ANIM_DURATION, delay: 0.06, ease: ANIM_EASE }}
                className="absolute -left-[4px] -mt-[6px] w-3 h-3 bg-white border-[2px] border-[#3b82f6] z-20"
              />
              <motion.div
                initial={{ left: 0, top: 0 }}
                animate={{ left: "100%", top: "100%" }}
                exit={{ opacity: 0, transition: { duration: 0.25, delay: 0.15, ease: "easeIn" } }}
                transition={{ duration: ANIM_DURATION, delay: 0.03, ease: ANIM_EASE }}
                className="absolute -ml-[6px] -mt-[6px] w-3 h-3 bg-white border-[2px] border-[#3b82f6] z-20"
              />

              {/* Mouse Cursor — LEADS all movement */}
              <motion.div
                initial={{ left: 0, top: 0, opacity: 0 }}
                animate={{ left: "100%", top: "100%", opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.25, delay: 0.15, ease: "easeIn" } }}
                transition={{ duration: ANIM_DURATION, ease: ANIM_EASE }}
                className="absolute z-[60] pointer-events-none"
              >
                <div className="-translate-x-[4px] -translate-y-[2px] md:-translate-x-[6px] md:-translate-y-[3px]">
                  <svg viewBox="0 0 36 36" className="w-[32px] h-[32px] md:w-[56px] md:h-[56px]" fill="#3b82f6" stroke="white" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round">
                    <path d="M6 3 L26 14 L17 17 L14 26 Q10 13 6 3 Z" />
                  </svg>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-8 sm:mt-12 flex items-center justify-center gap-6"
        >
          <div className="h-px w-8 bg-zinc-200" />
          <p className="text-zinc-500 text-sm font-light tracking-widest uppercase">
            User Centric • Design Driven
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
            Design
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
