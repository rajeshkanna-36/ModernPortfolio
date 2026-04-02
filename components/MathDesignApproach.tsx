"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Orbit, Maximize, GitCommit, Sparkles } from "lucide-react";

export default function MathDesignApproach() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 20,
    restDelta: 0.001
  });

  // Phases of the animation
  // 0.0 - 0.25: The Blueprint
  // 0.25 - 0.50: Sacred Geometry (Golden Ratio)
  // 0.50 - 0.75: Physics of Motion
  // 0.75 - 1.0: Synthesis

  // Phase 1: Blueprint
  const p1Opacity = useTransform(smoothProgress, [0, 0.15, 0.22, 0.28], [0, 1, 1, 0]);
  const p1Scale = useTransform(smoothProgress, [0, 0.2, 0.3], [0.8, 1, 1.2]);
  
  // Phase 2: Golden Ratio
  const p2Opacity = useTransform(smoothProgress, [0.22, 0.35, 0.45, 0.52], [0, 1, 1, 0]);
  const p2Y = useTransform(smoothProgress, [0.22, 0.35, 0.45, 0.52], [100, 0, 0, -100]);

  // Phase 3: Physics
  const p3Opacity = useTransform(smoothProgress, [0.48, 0.6, 0.7, 0.78], [0, 1, 1, 0]);
  const p3Scale = useTransform(smoothProgress, [0.48, 0.6, 0.7, 0.78], [0.8, 1, 1, 1.1]);

  // Phase 4: Synthesis
  const p4Opacity = useTransform(smoothProgress, [0.72, 0.85, 1], [0, 1, 1]);
  const p4Scale = useTransform(smoothProgress, [0.72, 0.85, 1], [0.9, 1, 1]);

  // Global Grid Opacity - fades out at the end
  const gridOpacity = useTransform(smoothProgress, [0, 0.75, 1], [0.1, 0.2, 0]);

  return (
    <div ref={containerRef} className="h-[400vh] w-full bg-[#050505] text-white relative flex flex-col items-center">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* Dynamic Blueprint Grid Background */}
        <motion.div 
          className="absolute inset-0 pointer-events-none"
          style={{ opacity: gridOpacity }}
        >
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)`,
              backgroundSize: '40px 40px',
              backgroundPosition: 'center center'
            }}
          />
          {/* Axis Lines */}
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-blue-500/50 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
          <div className="absolute top-0 left-1/2 w-[1px] h-full bg-blue-500/50 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
        </motion.div>

        {/* --- Phase 1: The Blueprint --- */}
        <motion.div 
          className="absolute inset-0 flex flex-col items-center justify-center p-8"
          style={{ opacity: p1Opacity, scale: p1Scale, pointerEvents: 'none' }}
        >
          <div className="relative z-10 text-center flex flex-col items-center">
            <Orbit className="w-20 h-20 text-blue-400 mb-8 animate-[spin_10s_linear_infinite]" />
            <div className="bg-black/50 border border-blue-500/30 backdrop-blur-md px-6 py-2 rounded-full text-blue-300 font-mono text-sm mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              var logic = new DesignSystem();
            </div>
            <h2 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-blue-100 to-blue-600">
              Engineering <br /> Aesthetics.
            </h2>
            <p className="text-xl md:text-2xl text-blue-200/70 max-w-2xl font-light leading-relaxed">
              Every beautiful interaction is backed by cold, hard math. We don't just guess layout proportions; we calculate them.
            </p>
          </div>

          {/* Floating Math Equations */}
          <motion.div className="absolute top-[20%] left-[10%] text-blue-500/40 font-mono text-lg font-bold"
            animate={{ y: [0, -20, 0] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}>
            ƒ(x) = A sin(ωx + φ)
          </motion.div>
          <motion.div className="absolute bottom-[20%] right-[15%] text-blue-500/40 font-mono text-lg font-bold"
            animate={{ y: [0, 20, 0] }} transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}>
            ∇²·E = μ₀·ε₀(∂²E/∂t²)
          </motion.div>
        </motion.div>

        {/* --- Phase 2: Golden Ratio --- */}
        <motion.div 
          className="absolute inset-0 flex flex-col items-center justify-center p-8"
          style={{ opacity: p2Opacity, y: p2Y, pointerEvents: 'none' }}
        >
          <div className="relative w-full max-w-5xl h-[70vh] flex items-center justify-center">
            
            {/* Golden Ratio Visualizer */}
            <div className="absolute w-[300px] h-[300px] md:w-[450px] md:h-[450px] border border-emerald-500/40 flex items-end justify-start p-4 bg-emerald-950/20 backdrop-blur-sm">
                <div className="w-[185px] h-[300px] md:w-[278px] md:h-[450px] border-r border-emerald-500/40 absolute top-0 right-0 flex items-end justify-center">
                   <div className="text-emerald-500/50 font-mono text-xs mb-2">1.618</div>
                </div>
                <div className="absolute inset-0 z-0 opacity-50 flex items-center justify-center">
                   <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" className="text-emerald-500 animate-[spin_20s_linear_infinite_reverse]">
                       <path d="M0,100 A100,100 0 0,0 100,0" fill="none" stroke="currentColor" strokeWidth="0.5" />
                   </svg>
                </div>
            </div>

            <div className="relative z-10 text-center bg-[#050505]/80 p-10 border border-emerald-500/20 rounded-3xl backdrop-blur-xl shadow-[0_0_50px_rgba(16,185,129,0.15)]">
              <Maximize className="w-16 h-16 text-emerald-400 mx-auto mb-6" />
              <div className="text-emerald-400 font-mono tracking-widest text-sm mb-4 uppercase">Sacred Geometry</div>
              <h2 className="text-5xl md:text-7xl font-bold mb-4 tracking-tighter text-white">
                Precision in <br/> Proportions.
              </h2>
              <p className="text-lg text-emerald-100/70 max-w-md mx-auto font-light leading-relaxed">
                Using the Fibonacci sequence and Golden Ratios to ensure layouts feel naturally pleasing to the human eye. Pixel perfect isn't an accident.
              </p>
            </div>
          </div>
        </motion.div>

        {/* --- Phase 3: Physics & Motion --- */}
        <motion.div 
          className="absolute inset-0 flex flex-col items-center justify-center p-8"
          style={{ opacity: p3Opacity, scale: p3Scale, pointerEvents: 'none' }}
        >
          <div className="relative w-full max-w-6xl h-[70vh] flex items-center justify-center gap-12 flex-col md:flex-row">
            
            <div className="w-full md:w-1/2 flex justify-center items-center relative">
               {/* Bezier Graph Background */}
               <div className="absolute inset-0 opacity-20">
                  <svg viewBox="0 0 100 100" className="w-full h-full text-purple-500" preserveAspectRatio="none">
                     <path d="M0,100 C25,100 50,0 100,0" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
                     {/* Axes */}
                     <line x1="0" y1="100" x2="100" y2="100" stroke="white" strokeWidth="0.5" />
                     <line x1="0" y1="100" x2="0" y2="0" stroke="white" strokeWidth="0.5" />
                  </svg>
               </div>

               <div className="z-10 bg-purple-950/40 border border-purple-500/50 p-8 rounded-2xl backdrop-blur-md relative overflow-hidden group">
                  <div className="absolute -inset-2 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-20 transition-opacity blur-xl rounded-full" />
                  <div className="text-purple-300 font-mono text-sm mb-4 bg-purple-900/50 px-3 py-1 rounded-md inline-block">
                     cubic-bezier(0.25, 1, 0.5, 1)
                  </div>
                  <div className="text-white/60 font-mono text-xs space-y-1 mb-6">
                     <p>mass: 1</p>
                     <p>stiffness: 100</p>
                     <p>damping: 10</p>
                  </div>
                  {/* Mock Button that animates automatically */}
                  <motion.div 
                    className="w-full h-12 bg-white text-black rounded-lg flex items-center justify-center font-bold shadow-[0_0_20px_rgba(168,85,247,0.4)]"
                    animate={{ scale: [1, 0.9, 1.05, 1] }}
                    transition={{ repeat: Infinity, duration: 4, ease: [0.25, 1, 0.5, 1] }}
                  >
                     Calculating Feel...
                  </motion.div>
               </div>
            </div>

            <div className="w-full md:w-1/2 text-left z-10">
              <GitCommit className="w-16 h-16 text-purple-400 mb-6 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]" />
              <h2 className="text-5xl md:text-7xl font-bold mb-6 tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-purple-200">
                The Physics <br/> of Motion.
              </h2>
              <p className="text-xl text-purple-100/70 max-w-lg font-light leading-relaxed">
                Great interfaces don't just move; they react. We implement real-world spring physics to ensure elements have weight, momentum, and completely natural fluid feedback.
              </p>
            </div>
            
          </div>
        </motion.div>

        {/* --- Phase 4: Creative Synthesis --- */}
        <motion.div 
          className="absolute inset-0 flex flex-col items-center justify-center p-8 bg-[radial-gradient(circle_at_center,_rgba(255,165,0,0.15)_0%,_rgba(0,0,0,0)_60%)]"
          style={{ opacity: p4Opacity, scale: p4Scale }}
        >
          <div className="relative text-center z-20 flex flex-col items-center">
            
            <div className="relative mb-12">
               <motion.div 
                 className="absolute inset-0 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 blur-3xl opacity-50"
                 animate={{ rotate: 360 }}
                 transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
               />
               <div className="relative bg-white/10 backdrop-blur-3xl border border-white/20 p-10 md:p-16 rounded-[3rem] shadow-[0_20px_60px_rgba(0,0,0,0.5)] flex flex-col items-center max-w-2xl transform transition-transform hover:scale-105 duration-500 cursor-pointer group">
                   
                   <div className="absolute -top-6 -right-6 bg-white text-black text-xs font-bold px-4 py-2 rounded-full shadow-xl transform rotate-12 group-hover:rotate-6 transition-transform">
                     Ready to Deploy
                   </div>

                   <Sparkles className="w-12 h-12 text-orange-400 mb-6" />
                   <h3 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-4 text-center">
                      Where Math <br/> Meets Magic.
                   </h3>
                   <p className="text-white/70 font-light text-center">
                      The culmination of precise geometry, physics-based motion, and vibrant aesthetic. It's not just a website—it's an engineered experience perfectly calibrated to captivate.
                   </p>
                   
                   <button className="mt-8 px-8 py-4 bg-white text-black font-semibold rounded-2xl hover:bg-zinc-200 transition-colors shadow-[0_0_30px_rgba(255,255,255,0.3)]">
                      Explore Projects
                   </button>
               </div>
            </div>

          </div>
        </motion.div>

      </div>
    </div>
  );
}
