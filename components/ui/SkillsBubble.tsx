"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { 
  // Full Stack
  Globe, Server, Database, AppWindow, Code2, Monitor,
  // DSA
  Network, Binary, Braces, Layers, GitBranch,
  // DevOps
  Cloud, Cpu, Terminal, Box
} from "lucide-react";

// Thematic icon lineup representing Full Stack, DSA, and DevOps
const ICONS = [
  Globe, Server, Database, AppWindow, Code2, Monitor, // Full Stack
  Network, Binary, Braces, Layers, GitBranch,         // DSA
  Cloud, Cpu, Terminal, Box                           // DevOps
];

// Helper component for the individual letter particle effect
function AnimatedLetter({ char, globalIndex, total, progress }: { char: string; globalIndex: number; total: number; progress: MotionValue<number> }) {
  // Phase 1: Typing text in (scroll 0.0 to 0.25)
  // Letters type in sequentially
  const introStart = (globalIndex / total) * 0.2;
  const introEnd = introStart + 0.05;
  
  // Phase 2: Splashing out into particles (scroll 0.35 to 0.45)
  // All letters explode outward simultaneously
  const splashStart = 0.32;
  const splashEnd = 0.45;

  // Golden angle distribution for a beautiful, even 360-degree particle burst
  const angle = (globalIndex * 137.508) * (Math.PI / 180); 
  // Pseudo-random distance for depth (100px to 600px outward)
  const distance = ((globalIndex * 67) % 500) + 100;
  
  const scatterX = Math.cos(angle) * distance;
  const scatterY = Math.sin(angle) * distance;
  const scatterRot = ((globalIndex * 43) % 720) - 360; // Wild spinning

  // Transform mappings
  const opacity = useTransform(progress, [introStart, introEnd, splashStart, splashEnd], [0, 1, 1, 0]);
  const y = useTransform(progress, [introStart, introEnd, splashStart, splashEnd], [20, 0, 0, scatterY]);
  const x = useTransform(progress, [splashStart, splashEnd], [0, scatterX]);
  const rotate = useTransform(progress, [splashStart, splashEnd], [0, scatterRot]);
  
  // Scale down to 0 at the end to look like disappearing dust
  const scale = useTransform(progress, [introStart, introEnd, splashStart, splashEnd], [0.5, 1, 1, 0]);

  return (
    <motion.span 
      style={{ opacity, y, x, rotate, scale }} 
      className="inline-block relative text-white drop-shadow-sm font-bold"
    >
      {char}
    </motion.span>
  );
}

// Pre-calculate word and letter grouping so React handles flex-wrap properly without breaking mid-word
const quoteString = "Architecting seamless digital experiences at scale.";
const quoteWords = quoteString.split(" ");
let charCounter = 0;
const wordsWithIndexes = quoteWords.map(word => {
  const chars = word.split("").map(char => ({ char, globalIndex: charCounter++ }));
  return { word, chars };
});
const totalChars = charCounter;


export default function SkillsBubble() {
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Create a massive seamless array
  const doubledIcons = [...ICONS, ...ICONS, ...ICONS, ...ICONS];

  // --- Phase Orchestration ---

  // The Marquee fades in between 38% and 48% and moves up slightly into the space the quote left
  const marqueeOpacity = useTransform(scrollYProgress, [0.38, 0.45], [0, 1]);
  const marqueeY = useTransform(scrollYProgress, [0.38, 0.45], [100, 0]);
  
  // The Marquee horizontal scroll (linked strictly to user scrolling from 45% to 100%)
  const marqueeX = useTransform(scrollYProgress, [0.45, 1], ["0vh", "-250vh"]);

  return (
    <section ref={containerRef} id="skills-section" className="relative h-[350vh] w-full bg-zinc-950">
      
      {/* Sticky Checkpoint: Pins to exactly the height of the viewport */}
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        
        {/* Subtle Ambient Depth */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.02),transparent_60%)] pointer-events-none" />

        {/* Phase 1 & 2: Scroll-triggered Reveal and Particle Splash Out */}
        <motion.div 
          className="absolute inset-0 flex flex-col items-center justify-center z-20 px-6 max-w-5xl mx-auto pointer-events-none"
        >
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-center leading-[1.1] flex flex-wrap justify-center">
            {wordsWithIndexes.map((wordObj, wIndex) => (
              <span key={wIndex} className="inline-flex mr-3 md:mr-6 mb-2">
                {wordObj.chars.map((c) => (
                  <AnimatedLetter 
                    key={c.globalIndex} 
                    char={c.char} 
                    globalIndex={c.globalIndex} 
                    total={totalChars} 
                    progress={scrollYProgress} 
                  />
                ))}
              </span>
            ))}
          </h2>
        </motion.div>

        {/* Phase 2: Interactive Scrolling Wave Marquee */}
        <motion.div 
          style={{ opacity: marqueeOpacity, y: marqueeY }}
          className="absolute inset-0 flex items-center w-full z-10"
        >
          {/* Deep Gradient Masks for seamless fading on edges */}
          <div className="absolute left-0 top-0 bottom-0 w-32 md:w-64 bg-gradient-to-r from-zinc-950 to-transparent z-30 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 md:w-64 bg-gradient-to-l from-zinc-950 to-transparent z-30 pointer-events-none" />

          {/* 
            Outer container provides a continuous, slow infinite drift left.
          */}
          <motion.div
             animate={{ x: ["0%", "-25%"] }}
             transition={{ repeat: Infinity, ease: "linear", duration: 60 }}
             className="flex items-center w-max"
          >
            {/* 
              Inner container snaps dramatically left based on the user's active scrolling.
            */}
            <motion.div 
              style={{ x: marqueeX }}
              className="flex items-center w-max pl-[50vw]"
            >
              {doubledIcons.map((Icon, index) => {
                const originalIndex = index % ICONS.length;
                
                // Base geometric sine wave path
                const baseOffset = Math.sin((originalIndex / ICONS.length) * Math.PI * 2) * 80;
                
                return (
                  <motion.div 
                    key={index} 
                    // Active vertical bobbing and gentle rotation, staggered by index to create a traveling ripple
                    animate={{ 
                      y: [baseOffset, baseOffset - 25, baseOffset + 10, baseOffset],
                      rotate: [0, 4, -4, 0]
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 4.5,
                      ease: "easeInOut",
                      delay: originalIndex * 0.15 
                    }}
                    className="mx-4 md:mx-8 flex-shrink-0 flex items-center justify-center w-24 h-24 md:w-32 md:h-32 rounded-full bg-white border border-zinc-200/20 shadow-[0_15px_40px_rgba(0,0,0,0.6)] cursor-pointer group isolate"
                  >
                    <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/70 to-transparent opacity-80 pointer-events-none mix-blend-overlay transition-opacity group-hover:opacity-100" />
                    
                    <motion.div
                      whileHover={{ scale: 1.15 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      className="relative z-10"
                    >
                      <Icon className="w-10 h-10 md:w-12 md:h-12 text-zinc-900 group-hover:text-black group-hover:drop-shadow-[0_4px_12px_rgba(0,0,0,0.3)] transition-all duration-300" />
                    </motion.div>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
