"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { PenTool, Layers, Compass, Rocket } from "lucide-react";

export default function DesignProcess() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Opacity phases
  const p1Opacity = useTransform(smoothProgress, [0, 0.15, 0.25, 0.3], [0, 1, 1, 0]);
  const p2Opacity = useTransform(smoothProgress, [0.25, 0.4, 0.5, 0.55], [0, 1, 1, 0]);
  const p3Opacity = useTransform(smoothProgress, [0.5, 0.65, 0.75, 0.8], [0, 1, 1, 0]);
  const p4Opacity = useTransform(smoothProgress, [0.75, 0.9, 1, 1.2], [0, 1, 1, 0]);

  // Scale / Y-position phases to create entrance/exit animations
  const p1Scale = useTransform(smoothProgress, [0, 0.15, 0.25, 0.3], [0.8, 1, 1, 1.2]);
  const p1Y = useTransform(smoothProgress, [0, 0.15, 0.25, 0.3], [50, 0, 0, -50]);

  const p2Scale = useTransform(smoothProgress, [0.25, 0.4, 0.5, 0.55], [0.8, 1, 1, 1.2]);
  const p2Y = useTransform(smoothProgress, [0.25, 0.4, 0.5, 0.55], [50, 0, 0, -50]);

  const p3Scale = useTransform(smoothProgress, [0.5, 0.65, 0.75, 0.8], [0.8, 1, 1, 1.2]);
  const p3Y = useTransform(smoothProgress, [0.5, 0.65, 0.75, 0.8], [50, 0, 0, -50]);

  const p4Scale = useTransform(smoothProgress, [0.75, 0.9, 1], [0.8, 1, 1]);
  const p4Y = useTransform(smoothProgress, [0.75, 0.9, 1], [50, 0, 0]);

  // Progress Bar
  const progressHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={containerRef} className="h-[400vh] w-full bg-[#0a0a0a] text-white relative">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* Progress Bar Timeline */}
        <div className="absolute left-6 md:left-12 top-[20%] bottom-[20%] w-1 bg-white/10 rounded-full z-50">
          <motion.div 
            className="w-full bg-gradient-to-b from-orange-500 to-purple-600 rounded-full"
            style={{ height: progressHeight }}
          />
        </div>

        {/* --- Phase 1: Discovery --- */}
        <motion.div 
          className="absolute inset-0 flex flex-col items-center justify-center p-8"
          style={{ opacity: p1Opacity, scale: p1Scale, y: p1Y, pointerEvents: 'none' }}
        >
          <div className="relative w-full max-w-4xl h-[60vh] flex items-center justify-center">
            <motion.div 
              className="absolute top-[20%] left-[15%] md:left-[25%] bg-yellow-200/90 text-black p-4 rotate-[-6deg] shadow-2xl rounded-sm text-lg font-medium w-48 border border-yellow-300 backdrop-blur-md"
              initial={{ y: 20 }}
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
            >
              Who is the user?
            </motion.div>
            <motion.div 
              className="absolute bottom-[20%] right-[15%] md:right-[25%] bg-blue-200/90 text-black p-4 rotate-[8deg] shadow-2xl rounded-sm text-lg font-medium w-52 border border-blue-300 backdrop-blur-md"
              initial={{ y: -15 }}
              animate={{ y: [0, 15, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut', delay: 1 }}
            >
              What is the core problem?
            </motion.div>
            <div className="text-center z-10 p-8 rounded-3xl bg-black/40 backdrop-blur-md border border-white/5 shadow-2xl">
              <Compass className="w-16 h-16 mx-auto mb-6 text-orange-400 drop-shadow-[0_0_15px_rgba(251,146,60,0.5)]" />
              <h2 className="text-5xl md:text-7xl font-bold mb-4 tracking-tighter">01. Discovery</h2>
              <p className="text-xl text-white/70 max-w-lg mx-auto font-light leading-relaxed">Embracing the messy middle. Gathering insights, asking questions, and understanding the core problem.</p>
            </div>
          </div>
        </motion.div>

        {/* --- Phase 2: Wireframing --- */}
        <motion.div 
          className="absolute inset-0 flex flex-col items-center justify-center p-8"
          style={{ opacity: p2Opacity, scale: p2Scale, y: p2Y, pointerEvents: 'none' }}
        >
          <div className="relative w-full max-w-4xl h-[60vh] flex items-center justify-center">
            {/* Blueprint wires */}
            <div className="absolute inset-x-4 md:inset-x-20 inset-y-[20%] border border-dashed border-blue-400/30 rounded-3xl" />
            <div className="absolute inset-x-12 md:inset-x-[30%] inset-y-[30%] border border-blue-400/20 rounded-2xl" />
            
            <div className="text-center z-10 bg-[#0a0a0a]/80 backdrop-blur-xl p-10 rounded-[2.5rem] border border-blue-500/20 shadow-[0_0_50px_rgba(59,130,246,0.1)]">
              <PenTool className="w-16 h-16 mx-auto mb-6 text-blue-400 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
              <h2 className="text-5xl md:text-7xl font-bold mb-4 tracking-tighter text-blue-50">02. Architecture</h2>
              <p className="text-xl text-white/70 max-w-lg mx-auto font-light leading-relaxed">Creating blueprints. Defining flows, structures, and low-fidelity concepts to establish the foundation.</p>
            </div>
          </div>
        </motion.div>

        {/* --- Phase 3: High-Fidelity --- */}
        <motion.div 
          className="absolute inset-0 flex flex-col items-center justify-center p-8"
          style={{ opacity: p3Opacity, scale: p3Scale, y: p3Y, pointerEvents: 'none' }}
        >
          <div className="relative w-full max-w-4xl h-[60vh] flex items-center justify-center">
            {/* UI Cards floating behind */}
            <motion.div 
              className="absolute -top-10 -left-10 md:left-10 w-72 h-72 bg-gradient-to-br from-purple-500/30 to-pink-500/20 blur-3xl rounded-full"
            />
            <motion.div 
              className="absolute -bottom-10 -right-10 md:right-10 w-72 h-72 bg-gradient-to-br from-blue-500/30 to-teal-500/20 blur-3xl rounded-full"
            />
            <div className="absolute grid grid-cols-2 gap-4 w-[85%] md:w-2/3 max-w-2xl opacity-60">
              <div className="h-40 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 shadow-2xl backdrop-blur-md transform -skew-y-3" />
              <div className="h-40 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 shadow-2xl backdrop-blur-md transform skew-y-3" />
            </div>
            
            <div className="text-center z-10 bg-[#121212]/90 border border-white/10 backdrop-blur-2xl p-12 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
              <Layers className="w-16 h-16 mx-auto mb-6 text-purple-400 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]" />
              <h2 className="text-5xl md:text-7xl font-bold mb-4 tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white to-white/60">03. High-Fidelity</h2>
              <p className="text-xl text-white/70 max-w-lg mx-auto font-light leading-relaxed">Polishing the pixels. Applying typography, color systems, and interactions to bring out the premium feel.</p>
            </div>
          </div>
        </motion.div>

        {/* --- Phase 4: Handoff & Impact --- */}
        <motion.div 
          className="absolute inset-0 flex flex-col items-center justify-center p-8"
          style={{ opacity: p4Opacity, scale: p4Scale, y: p4Y, pointerEvents: 'none' }}
        >
          <div className="relative w-full max-w-4xl h-[60vh] flex items-center justify-center">
             <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent blur-2xl" />
             <div className="text-center z-10 p-10">
              <Rocket className="w-20 h-20 mx-auto mb-8 text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.8)]" />
              <h2 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter drop-shadow-xl text-white">04. Liftoff</h2>
              <p className="text-2xl text-white/80 max-w-xl mx-auto font-light leading-relaxed">The final product is ready. Seamless developer handoff, testing, and ultimately, real-world impact.</p>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
