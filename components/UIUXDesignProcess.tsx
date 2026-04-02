"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Compass, PenTool, Layers, Rocket, CheckCircle2, User, Search, Maximize2, MoveRight, Code2, Sparkles, Layout } from "lucide-react";

export default function UIUXDesignProcess() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Main horizontal translation for the 4 sections
  const x = useTransform(smoothProgress, [0, 1], ["0%", "-75%"]);

  // --- Background Transitions ---
  const bgGradient = useTransform(
    smoothProgress,
    [0, 0.33, 0.66, 1],
    [
      "radial-gradient(circle at 50% 50%, rgba(14, 165, 233, 0.1) 0%, rgba(248, 249, 250, 1) 50%)", // Discovery (Blue)
      "radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.1) 0%, rgba(248, 249, 250, 1) 50%)", // Architecture (Purple)
      "radial-gradient(circle at 50% 50%, rgba(236, 72, 153, 0.1) 0%, rgba(248, 249, 250, 1) 50%)", // High-Fidelity (Pink)
      "radial-gradient(circle at 50% 50%, rgba(249, 115, 22, 0.15) 0%, rgba(248, 249, 250, 1) 50%)"  // Liftoff (Orange)
    ]
  );

  // --- Parallax Elements within sections ---
  // Discovery
  const dCard1Y = useTransform(smoothProgress, [0, 0.25], [100, -50]);
  const dCard2Y = useTransform(smoothProgress, [0, 0.25], [-50, 100]);
  
  // Architecture
  const aLinesScale = useTransform(smoothProgress, [0.15, 0.33, 0.5], [0.5, 1.2, 0.8]);
  
  // High Fidelity
  const hfBoxRotate = useTransform(smoothProgress, [0.4, 0.66, 0.8], [-20, 0, 20]);
  const hfBoxScale = useTransform(smoothProgress, [0.5, 0.66, 0.8], [0.8, 1.1, 0.9]);
  
  // Liftoff
  const lRocketY = useTransform(smoothProgress, [0.75, 1], [200, -200]);

  return (
    <section ref={containerRef} className="h-[400vh] relative bg-[#f8f9fa] text-zinc-900">
      
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center">
        
        {/* Dynamic Background Gradient */}
        <motion.div 
          className="absolute inset-0 z-0 pointer-events-none"
          style={{ background: bgGradient }}
        />

        {/* Global Progress Bar */}
        <div className="absolute top-10 left-10 right-10 h-1 bg-zinc-200 rounded-full z-50 overflow-hidden hidden md:block">
          <motion.div 
            className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500" 
            style={{ scaleX: smoothProgress, transformOrigin: 'left' }} 
          />
        </div>

        {/* Floating Background Grid */}
        <div 
          className="absolute inset-0 opacity-[0.3] pointer-events-none z-0"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />

        <motion.div className="flex w-[400vw] h-full z-10" style={{ x, willChange: 'transform' }}>
          
          {/* --- PHASE 1: DISCOVERY --- */}
          <div className="w-screen h-full relative flex flex-col md:flex-row items-center justify-center p-8 lg:p-24 overflow-hidden">
             
             {/* Text Content */}
             <div className="w-full md:w-1/2 z-20 flex flex-col items-start pr-0 md:pr-10">
                <div className="flex items-center gap-4 mb-6">
                   <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                      <Compass className="w-8 h-8 text-blue-600" />
                   </div>
                   <div className="text-blue-600 font-mono tracking-widest text-sm uppercase font-bold">Phase 01</div>
                </div>
                <h2 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 to-blue-700 drop-shadow-sm">
                   Discovery &<br />Research.
                </h2>
                <p className="text-xl text-zinc-600 max-w-lg font-medium leading-relaxed">
                   Before drawing a single pixel, I dive deep into the problem space. Understanding the user's needs, business goals, and the competitive landscape is crucial for meaningful design.
                </p>
             </div>

             {/* Visual Mockups */}
             <div className="w-full md:w-1/2 h-[60vh] relative z-10 mt-12 md:mt-0">
                
                {/* Search Bar float */}
                <motion.div 
                   style={{ y: dCard1Y }}
                   className="absolute top-[10%] right-[10%] w-[250px] bg-white backdrop-blur-xl border border-zinc-200 rounded-2xl p-4 shadow-xl flex items-center gap-3"
                >
                   <Search className="w-5 h-5 text-zinc-400" />
                   <div className="w-32 h-2 bg-zinc-200 rounded-full" />
                </motion.div>

                {/* Persona Card 1 */}
                <motion.div
                   animate={{ y: [0, -15, 0], rotateZ: [-2, 2, -2] }}
                   transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                   className="absolute top-[30%] left-[10%] w-[280px] bg-white backdrop-blur-3xl border border-blue-100 rounded-3xl p-6 shadow-[0_20px_40px_rgba(37,99,235,0.08)]"
                >
                   <div className="flex flex-col gap-4">
                      <div className="flex items-center gap-4">
                         <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
                            <User className="w-6 h-6 text-blue-500" />
                         </div>
                         <div>
                            <div className="w-20 h-3 bg-blue-200 rounded-full mb-2" />
                            <div className="w-12 h-2 bg-blue-100 rounded-full" />
                         </div>
                      </div>
                      <div className="space-y-2 mt-2">
                         <div className="w-full h-2 bg-zinc-100 rounded-full" />
                         <div className="w-5/6 h-2 bg-zinc-100 rounded-full" />
                         <div className="w-4/6 h-2 bg-zinc-100 rounded-full" />
                      </div>
                   </div>
                </motion.div>

                {/* Persona Card 2 */}
                <motion.div
                   style={{ y: dCard2Y }}
                   className="absolute top-[50%] right-[5%] w-[220px] bg-white/80 backdrop-blur-xl border border-zinc-100 rounded-3xl p-5 shadow-xl opacity-90"
                >
                   <div className="w-10 h-10 rounded-full bg-zinc-200 mb-4" />
                   <div className="w-24 h-2 bg-zinc-200 rounded-full mb-2" />
                   <div className="w-16 h-2 bg-zinc-100 rounded-full" />
                </motion.div>

                {/* Sticky Note */}
                <motion.div 
                   animate={{ y: [0, 10, 0], rotateZ: [10, 12, 10] }}
                   transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                   className="absolute bottom-[10%] left-[30%] w-32 h-32 bg-yellow-200 rounded-sm shadow-[0_10px_20px_rgba(250,204,21,0.2)] p-3 flex flex-col gap-2"
                >
                   <div className="w-full h-1 bg-yellow-400/50 rounded-full" />
                   <div className="w-5/6 h-1 bg-yellow-400/50 rounded-full" />
                   <div className="w-full h-1 bg-yellow-400/50 rounded-full" />
                   <div className="text-zinc-800 text-[10px] font-medium mt-auto">"Why do users drop off here?"</div>
                </motion.div>
                
             </div>

          </div>


          {/* --- PHASE 2: ARCHITECTURE --- */}
          <div className="w-screen h-full relative flex flex-col md:flex-row items-center justify-center p-8 lg:p-24 overflow-hidden">
             
             {/* Text Content */}
             <div className="w-full md:w-1/2 z-20 flex flex-col items-start pr-0 md:pr-10 order-2 md:order-1 mt-12 md:mt-0">
                <div className="flex items-center gap-4 mb-6">
                   <div className="w-16 h-16 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                      <Layout className="w-8 h-8 text-purple-600" />
                   </div>
                   <div className="text-purple-600 font-mono tracking-widest text-sm uppercase font-bold">Phase 02</div>
                </div>
                <h2 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 to-purple-700 drop-shadow-sm">
                   Information<br />Architecture.
                </h2>
                <p className="text-xl text-zinc-600 max-w-lg font-medium leading-relaxed">
                   Structuring the chaos. I map out user flows, wireframes, and prototypes to ensure a logical and frictionless journey before adding visual polish.
                </p>
             </div>

             {/* Visual Mockups */}
             <div className="w-full md:w-1/2 h-[60vh] relative z-10 order-1 md:order-2">
                
                {/* Blueprint lines */}
                <motion.div 
                   style={{ scale: aLinesScale, opacity: aLinesScale }}
                   className="absolute inset-0 flex items-center justify-center"
                >
                   <svg width="100%" height="100%" viewBox="0 0 400 400" className="text-purple-500/30 overflow-visible">
                      {/* Flowchart Boxes */}
                      <rect x="50" y="50" width="100" height="40" rx="6" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
                      <rect x="250" y="50" width="100" height="40" rx="6" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
                      <rect x="150" y="150" width="100" height="40" rx="6" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
                      {/* Connections */}
                      <path d="M 100 90 L 100 120 L 200 120 L 200 150" fill="none" stroke="currentColor" strokeWidth="2" />
                      <path d="M 300 90 L 300 120 L 200 120" fill="none" stroke="currentColor" strokeWidth="2" />
                      {/* Wireframe UI */}
                      <rect x="100" y="220" width="200" height="150" rx="12" fill="none" stroke="currentColor" strokeWidth="2" />
                      <line x1="100" y1="260" x2="300" y2="260" stroke="currentColor" strokeWidth="2" />
                      <circle cx="130" cy="240" r="8" fill="none" stroke="currentColor" strokeWidth="2" />
                   </svg>
                </motion.div>

                {/* Floating Wireframe Component */}
                <motion.div
                   animate={{ y: [-10, 10, -10], rotateY: [0, 10, 0] }}
                   transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                   className="absolute top-[20%] left-[20%] w-[180px] bg-white/90 backdrop-blur-md border border-purple-200 rounded-xl p-4 shadow-[0_20px_40px_rgba(168,85,247,0.1)]"
                >
                   <div className="w-full h-24 bg-purple-50 rounded-lg mb-3 border border-purple-100 flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full border border-purple-300" />
                   </div>
                   <div className="space-y-2">
                      <div className="w-full h-2 bg-purple-200 rounded-full" />
                      <div className="w-2/3 h-2 bg-purple-100 rounded-full" />
                   </div>
                </motion.div>

                {/* Cursor icon tracing */}
                <motion.div
                   animate={{ x: [0, 150, 50, 0], y: [0, 50, 150, 0] }}
                   transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                   className="absolute top-[10%] left-[10%] text-zinc-900 drop-shadow-md z-20"
                >
                   <svg width="24" height="24" viewBox="0 0 24 24" fill="white" stroke="currentColor" strokeWidth="2.5" ><path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z"/></svg>
                   <div className="absolute top-6 left-4 bg-zinc-900 text-white text-[10px] px-2 py-1 rounded-full font-mono flex items-center gap-1">User</div>
                </motion.div>

             </div>

          </div>


          {/* --- PHASE 3: HIGH FIDELITY --- */}
          <div className="w-screen h-full relative flex flex-col md:flex-row items-center justify-center p-8 lg:p-24 overflow-hidden">
             
             {/* Text Content */}
             <div className="w-full md:w-1/2 z-20 flex flex-col items-start pr-0 md:pr-10">
                 <div className="flex items-center gap-4 mb-6">
                   <div className="w-16 h-16 rounded-2xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center">
                      <Sparkles className="w-8 h-8 text-pink-600" />
                   </div>
                   <div className="text-pink-600 font-mono tracking-widest text-sm uppercase font-bold">Phase 03</div>
                </div>
                <h2 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 to-pink-600 drop-shadow-sm">
                   High-Fidelity<br />Perfection.
                </h2>
                <p className="text-xl text-zinc-600 max-w-lg font-medium leading-relaxed">
                   Where math meets magic. Imbuing the wireframes with brand identity, micro-interactions, responsive behaviors, and pixel-perfect aesthetics.
                </p>
             </div>

             {/* Visual Mockups */}
             <div className="w-full md:w-1/2 h-[60vh] relative z-10 mt-12 md:mt-0 flex items-center justify-center" style={{ perspective: "1000px" }}>
                
                {/* 3D Rotating Glass Bento */}
                <motion.div 
                   style={{ rotateX: hfBoxRotate, rotateY: hfBoxRotate, scale: hfBoxScale }}
                   className="w-[300px] h-[400px] md:w-[400px] md:h-[500px] relative preserve-3d"
                >
                   {/* Main Glass Panel */}
                   <div className="absolute inset-0 bg-white/60 backdrop-blur-3xl border border-white rounded-[3rem] shadow-[0_30px_60px_rgba(0,0,0,0.08)] p-6 flex flex-col gap-4">
                      
                      {/* Top Bar */}
                      <div className="w-full h-16 bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl border border-pink-100 flex items-center px-4 gap-3">
                         <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-pink-400 to-orange-400" />
                         <div className="flex-1 h-3 bg-white rounded-full shadow-inner" />
                      </div>

                      {/* Content Grid */}
                      <div className="flex-1 grid grid-cols-2 gap-4">
                         
                         {/* Bento Box 1 */}
                         <div className="col-span-2 h-32 bg-white rounded-2xl border border-zinc-100 flex items-end p-4 relative overflow-hidden group shadow-sm">
                             <div className="absolute -inset-10 bg-gradient-to-br from-pink-500/10 to-purple-500/0 blur-2xl group-hover:opacity-100 opacity-50 transition-opacity" />
                             <div className="w-12 h-12 bg-pink-50 rounded-xl border border-pink-100 flex items-center justify-center z-10">
                                <Layers className="w-6 h-6 text-pink-500" />
                             </div>
                         </div>
                         
                         {/* Bento Box 2 & 3 */}
                         <div className="bg-white rounded-2xl border border-zinc-100 flex items-center justify-center flex-col gap-2 relative overflow-hidden shadow-sm">
                             <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center border border-green-200">
                                <CheckCircle2 className="w-4 h-4 text-green-500" />
                             </div>
                             <div className="w-12 h-2 bg-zinc-100 rounded-full" />
                         </div>
                         <div className="bg-white rounded-2xl border border-zinc-100 flex items-center justify-center flex-col gap-2 relative shadow-sm">
                             <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center border border-blue-200">
                                 <div className="w-2 h-2 bg-blue-500 rounded-full animate-ping" />
                             </div>
                         </div>

                      </div>

                   </div>

                   {/* Floating Layer over Bento */}
                   <motion.div 
                      animate={{ z: [0, 50, 0], y: [-10, 10, -10] }}
                      transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                      className="absolute -top-10 -right-10 w-40 bg-white/90 backdrop-blur-xl border border-pink-200 rounded-2xl p-4 shadow-xl"
                   >
                       <div className="text-pink-600 text-xs font-mono mb-2 flex items-center gap-2">
                           <Sparkles className="w-3 h-3" /> Auto-Layout
                       </div>
                       <div className="w-full h-8 bg-pink-50 rounded-lg border border-pink-100 flex items-center justify-center">
                           <div className="w-16 h-1 bg-pink-200 rounded-full" />
                       </div>
                   </motion.div>

                </motion.div>

             </div>

          </div>


          {/* --- PHASE 4: LIFTOFF --- */}
          <div className="w-screen h-full relative flex flex-col md:flex-row items-center justify-center p-8 lg:p-24 overflow-hidden">
             
             {/* Text Content */}
             <div className="w-full md:w-1/2 z-20 flex flex-col items-start pr-0 md:pr-10 order-2 md:order-1 mt-12 md:mt-0">
                <div className="flex items-center gap-4 mb-6">
                   <div className="w-16 h-16 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
                      <Rocket className="w-8 h-8 text-orange-600" />
                   </div>
                   <div className="text-orange-600 font-mono tracking-widest text-sm uppercase font-bold">Phase 04</div>
                </div>
                <h2 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 to-orange-600 drop-shadow-sm">
                   Delivery &<br />Liftoff.
                </h2>
                <p className="text-xl text-zinc-600 max-w-lg font-medium leading-relaxed">
                   Handing off meticulously documented designs, design tokens, and components to developers, ensuring the live product matches the vision flawlessly.
                </p>
                <div className="mt-10 flex gap-4">
                   <div className="flex flex-col items-center justify-center bg-white border border-zinc-200 shadow-sm rounded-2xl p-4 w-32">
                      <div className="text-3xl font-black text-orange-500 mb-1">100%</div>
                      <div className="text-xs text-zinc-400 font-mono uppercase tracking-wider">Fidelity</div>
                   </div>
                   <div className="flex flex-col items-center justify-center bg-white border border-zinc-200 shadow-sm rounded-2xl p-4 w-32">
                      <div className="text-3xl font-black text-orange-500 mb-1">&lt;/&gt;</div>
                      <div className="text-xs text-zinc-400 font-mono uppercase tracking-wider">Dev Ready</div>
                   </div>
                </div>
             </div>

             {/* Visual Mockups */}
             <div className="w-full md:w-1/2 h-[60vh] relative z-10 order-1 md:order-2 flex items-center justify-center">
                
                {/* Code Window - Light Theme */}
                <motion.div 
                   className="w-[90%] md:w-[400px] bg-white border border-zinc-200 rounded-xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.08)] relative z-10"
                >
                   {/* Window Header */}
                   <div className="h-8 bg-zinc-100 flex items-center gap-2 border-b border-zinc-200 px-4">
                      <div className="w-3 h-3 rounded-full bg-red-400" />
                      <div className="w-3 h-3 rounded-full bg-yellow-400" />
                      <div className="w-3 h-3 rounded-full bg-green-400" />
                      <div className="ml-4 text-[10px] text-zinc-500 font-mono">export.css</div>
                   </div>
                   {/* Code Body - Light Theme Colors */}
                   <div className="p-6 font-mono text-xs md:text-sm text-zinc-700" style={{ lineHeight: '1.8' }}>
                      <p><span className="text-blue-600">const</span> <span className="text-indigo-600">Tokens</span> = {'{'}</p>
                      <p className="ml-4"><span className="text-zinc-800">colors:</span> {'{'}</p>
                      <p className="ml-8"><span className="text-pink-600">primary:</span> <span className="text-orange-600">'#F97316'</span>,</p>
                      <p className="ml-8"><span className="text-pink-600">background:</span> <span className="text-orange-600">'#F8F9FA'</span>,</p>
                      <p className="ml-4">{'}'},</p>
                      <p className="ml-4"><span className="text-zinc-800">physics:</span> {'{'}</p>
                      <p className="ml-8"><span className="text-pink-600">stiffness:</span> <span className="text-blue-600">100</span>,</p>
                      <p className="ml-8"><span className="text-pink-600">damping:</span> <span className="text-blue-600">20</span>,</p>
                      <p className="ml-4">{'}'}</p>
                      <p>{'};'}</p>
                   </div>
                </motion.div>

                {/* Animated Rocket taking off in background */}
                <motion.div 
                   style={{ y: lRocketY }}
                   className="absolute right-[10%] top-[40%] opacity-20 flex flex-col items-center gap-2"
                >
                   <Rocket className="w-32 h-32 text-orange-500" />
                   <div className="w-2 h-40 bg-gradient-to-b from-orange-400 to-transparent blur-sm rounded-full" />
                </motion.div>

             </div>

          </div>

        </motion.div>

      </div>
    </section>
  );
}
