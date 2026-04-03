"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

import Image from "next/image";

// Keep existing initial code...
export default function DinoLoading({ onComplete }: { onComplete?: () => void }) {
  const [dots, setDots] = useState("");
  const [frame, setFrame] = useState(1);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Percentage counter simulation
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        // Progress rate (adjust speed by changing the diff and interval)
        const diff = 5 + Math.random() * 20; 
        const next = Math.min(prev + diff, 100);
        return next;
      });
    }, 140);

    const dotsInterval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 500);
    
    // Toggling feet
    const frameInterval = setInterval(() => {
      setFrame((f) => (f === 1 ? 2 : 1));
    }, 120);

    return () => {
      clearInterval(timer);
      clearInterval(dotsInterval);
      clearInterval(frameInterval);
    };
  }, []);

  // Use a separate effect to trigger onComplete safely
  useEffect(() => {
    if (progress >= 100) {
      const timeout = setTimeout(() => {
        onComplete?.();
      }, 100); // Small buffer
      return () => clearTimeout(timeout);
    }
  }, [progress, onComplete]);

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white font-sans overflow-hidden px-6">
      {/* Background Subtle Pattern */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
           style={{ backgroundImage: `radial-gradient(#535353 1px, transparent 1px)`, backgroundSize: '16px 16px' }} />

      <div className="relative w-full max-w-[800px] flex flex-col items-center">
        
        {/* Top Meta Info (Very small/removed on mobile) */}
        <div className="w-full flex justify-between mb-4 md:mb-8 text-[7px] md:text-[10px] font-mono text-[#535353]/30 tracking-widest uppercase sm:flex hidden">
          <span>Booting_Sequence_v2.0</span>
          <span>Status: Optimal</span>
        </div>

        {/* Dino Game Simulation Area - Very Compact on Mobile */}
        <div className="relative w-full h-[100px] md:h-[200px] flex flex-col items-center justify-end pb-4 md:pb-8 mb-6 md:mb-12 border-b border-[#535353]/10">
          
          {/* The Dino - Even Smaller on Mobile */}
          <motion.div
            className="relative z-10"
            animate={{ y: [0, -1, 0] }}
            transition={{ duration: 0.6, repeat: Infinity, ease: "linear" }}
          >
            <Image 
              src={`/assets/dino/DinoRun${frame}.png`} 
              alt="Dino" 
              width={70}
              height={70}
              className="w-[44px] md:w-[70px] h-auto"
              style={{ imageRendering: 'pixelated' }}
              priority
              unoptimized
              // @ts-ignore
              fetchPriority="high"
            />
          </motion.div>

          {/* Cacti Scrolling */}
          <div className="absolute bottom-4 md:bottom-8 left-0 w-full h-[30px] md:h-[60px] overflow-hidden pointer-events-none">
            {[...Array(2)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute bottom-0"
                initial={{ x: 800 + i * 400 }}
                animate={{ x: -100 }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  ease: "linear",
                  delay: i * 1.1,
                }}
              >
                <Image 
                  src={`/assets/cactus/SmallCactus${(i % 3) + 1}.png`} 
                  alt="Cactus" 
                  width={40}
                  height={40}
                  className="h-[24px] md:h-[40px] w-auto"
                  style={{ imageRendering: 'pixelated' }}
                  priority
                  unoptimized
                />
              </motion.div>
            ))}
          </div>

          {/* Scrolling Track */}
          <div className="absolute bottom-4 md:bottom-8 left-0 w-full h-[6px] md:h-[12px] overflow-hidden opacity-20">
              <motion.div 
                  className="flex w-[200%]"
                  animate={{ x: ["0%", "-50%"] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              >
                  <Image src="/assets/other/track.png" alt="track" width={800} height={12} className="h-[6px] md:h-[12px] w-full" priority unoptimized // @ts-ignore 
                  fetchPriority="high" />
                  <Image src="/assets/other/track.png" alt="track" width={800} height={12} className="h-[6px] md:h-[12px] w-full" priority unoptimized // @ts-ignore 
                  fetchPriority="high" />
              </motion.div>
          </div>
        </div>

        {/* Centered Loading Info - Simple & Compact */}
        <div className="flex flex-col items-center w-full max-w-[320px] md:max-w-[400px]">
          <div className="flex justify-between w-full mb-1 sm:mb-2 md:mb-3 items-end">
            <span 
              style={{ fontFamily: "var(--font-outfit), sans-serif" }}
              className="text-[11px] md:text-[16px] font-bold tracking-[0.2em] md:tracking-[0.4em] uppercase text-[#535353] flex items-center"
            >
              Loading
              <span className="inline-block w-[1.2em] text-left ml-0.5">{dots}</span>
            </span>
            <span className="font-mono text-[10px] md:text-[14px] text-[#535353] font-bold">
              {Math.round(progress)}%
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-[3px] md:h-1 bg-[#535353]/10 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-[#535353] origin-left"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: progress / 100 }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Detail Text - Hidden on very small mobile if too crowded */}
          <div 
            style={{ fontFamily: "var(--font-geist-mono), monospace" }}
            className="mt-3 md:mt-6 text-[8px] md:text-[10px] text-[#535353]/30 tracking-wider h-[1em]"
          >
            {progress < 90 ? "OPTIMIZING..." : "READY."}
          </div>
        </div>
      </div>
      
      {/* Bottom Legal / Branding - More subtle on mobile */}
      <div className="absolute bottom-6 md:bottom-10 text-[7px] md:text-[9px] font-mono text-zinc-300 tracking-[0.3em] md:tracking-[0.5em] uppercase pointer-events-none">
        RAJESH KANNA
      </div>
    </div>
  );
}
