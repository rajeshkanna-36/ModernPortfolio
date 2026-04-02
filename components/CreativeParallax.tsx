"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function CreativeParallax() {
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Extreme Parallax values using viewport heights for massive movement
  const yFast1 = useTransform(scrollYProgress, [0, 1], ["30vh", "-120vh"]); 
  const yFast2 = useTransform(scrollYProgress, [0, 1], ["40vh", "-100vh"]); 
  const yMedium1 = useTransform(scrollYProgress, [0, 1], ["20vh", "-80vh"]); 
  const yMedium2 = useTransform(scrollYProgress, [0, 1], ["10vh", "-60vh"]); 
  const ySlow1 = useTransform(scrollYProgress, [0, 1], ["0vh", "-30vh"]); 
  const ySlow2 = useTransform(scrollYProgress, [0, 1], ["-10vh", "-20vh"]); 
  
  // Rotations
  const rotateLeft = useTransform(scrollYProgress, [0, 1], [0, -15]);
  const rotateRight = useTransform(scrollYProgress, [0, 1], [0, 15]);

  return (
    <section 
      ref={containerRef}
      className="relative w-full h-[110vh] bg-[#f8f9fa] overflow-hidden flex items-center justify-center flex-col mt-[-100px] mb-[-50px] z-0 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]"
    >
      {/* Figma Blueprint Grid Background */}
      <div 
        className="absolute inset-0 opacity-[0.06] pointer-events-none mix-blend-multiply z-0"
        style={{
          backgroundImage: `linear-gradient(#0ea5e9 1px, transparent 1px), linear-gradient(90deg, #0ea5e9 1px, transparent 1px)`,
          backgroundSize: '32px 32px'
        }}
      />

      {/* Deep Background Layer (z-10) */}
      <div className="absolute inset-0 w-full max-w-7xl mx-auto pointer-events-none z-10 overflow-hidden">
        {/* Massive Background Quote Marks */}
        <motion.div 
          style={{ y: ySlow2 }}
          className="absolute top-[5%] left-[5%] text-[60vw] font-serif text-zinc-900 leading-none opacity-[0.03] select-none"
        >
          “
        </motion.div>
        
        {/* Deep background string texts - Fixed Opacity & Color */}
        <motion.div
           style={{ y: ySlow2 }}
           className="absolute top-[10%] right-[0%] text-zinc-900 font-extrabold text-[12vw] tracking-tighter uppercase whitespace-nowrap opacity-[0.03]"
        >
           PROTOTYPE
        </motion.div>
      </div>

      {/* Center piece text overlay - Has subtle sticky parallax effect */}
      <motion.div 
        style={{ y: ySlow1 }}
        className="relative z-20 text-center flex flex-col items-center justify-center p-8 lg:p-12 mb-10"
      >
        <div className="absolute inset-0 bg-white/70 backdrop-blur-3xl rounded-[3rem] shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-white/60 -z-10 scale-[1.1] md:scale-[1.2]" />
        
        {/* Figma Dimension Doodle on Center Box */}
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex items-center gap-2 text-blue-500 font-mono text-xs opacity-70 pointer-events-none">
           <span>|◀</span>
           <span className="border-b border-blue-500/50 w-12 border-dashed"></span>
           <span>800px</span>
           <span className="border-b border-blue-500/50 w-12 border-dashed"></span>
           <span>▶|</span>
        </div>

        <div className="text-3xl md:text-5xl font-black text-zinc-900 tracking-tight leading-tight flex flex-col items-center gap-2">
          <span>Designing for humans,</span>
          <div className="text-orange-500 flex items-center justify-center gap-3">
            <span className="italic font-serif font-medium">building for the future.</span>
            <span className="inline-flex items-center justify-center w-10 h-10 bg-white rounded-2xl shadow-sm border border-zinc-100 -rotate-[10deg] ml-2">
              <svg viewBox="0 0 24 24" className="w-[50%] h-[50%] text-orange-500" stroke="currentColor" strokeWidth={2.5} fill="none">
                 <path strokeLinecap="round" strokeLinejoin="round" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
              </svg>
            </span>
          </div>
        </div>
      </motion.div>

      {/* Extreme Parallax Quote Cards & Figma Tools - (z-30) Floating OVER everything */}
      <div className="absolute inset-0 w-full max-w-7xl mx-auto pointer-events-none z-30" style={{ perspective: "1000px" }}>
        
        {/* Floating Figma Toolbar */}
        <motion.div
           style={{ y: yFast2, rotateZ: rotateLeft }}
           className="absolute top-[10%] left-[2%] md:left-[5%] bg-zinc-900 rounded-full p-2.5 flex flex-col gap-4 shadow-[0_20px_40px_rgba(0,0,0,0.15)] border border-zinc-800"
        >
           {/* Move/Cursor */}
           <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-white">
              <svg viewBox="0 0 24 24" className="w-4 h-4 -translate-y-px -translate-x-px" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z"/></svg>
           </div>
           {/* Frame */}
           <div className="w-8 h-8 rounded-full flex items-center justify-center text-zinc-400">
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16v16H4z M4 9h16 M4 15h16 M9 4v16 M15 4v16"/></svg>
           </div>
           {/* Pen */}
           <div className="w-8 h-8 rounded-full flex items-center justify-center text-zinc-400">
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 19l7-7 3 3-7 7-3-3z M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/></svg>
           </div>
           {/* Text */}
           <div className="w-8 h-8 rounded-full flex items-center justify-center text-zinc-400 font-serif font-bold italic text-lg">T</div>
        </motion.div>

        {/* Prototyping Noodle connecting empty space to Quote 2 */}
        <motion.div
           style={{ y: yMedium2 }}
           className="absolute top-[20%] right-[10%] w-[30vw] h-[40vh] pointer-events-none opacity-80"
        >
           <svg viewBox="0 0 400 400" className="w-full h-full text-blue-500 overflow-visible">
              <path d="M 50 50 C 250 50, 150 350, 350 350" fill="none" stroke="currentColor" strokeWidth="4" />
              <circle cx="50" cy="50" r="10" fill="white" stroke="currentColor" strokeWidth="4" />
              {/* Plus icon inside circle */}
              <line x1="45" y1="50" x2="55" y2="50" stroke="currentColor" strokeWidth="2" />
              <line x1="50" y1="45" x2="50" y2="55" stroke="currentColor" strokeWidth="2" />
              {/* Arrow Head */}
              <polygon points="340,340 360,350 340,360" fill="currentColor" />
           </svg>
           <div className="absolute top-[3%] left-[18%] bg-blue-500 text-white text-[10px] px-2 py-0.5 rounded-full font-mono uppercase tracking-wider">On Click</div>
        </motion.div>



        {/* Quote Card 1 - Top Left Fast Movement */}
        <motion.div 
          style={{ y: yFast1, rotateZ: rotateLeft }}
          className="absolute top-[15%] left-[10%] md:left-[15%] w-[65vw] md:w-[24vw] p-6 rounded-[2.5rem] bg-white/90 backdrop-blur-md border border-white shadow-[0_30px_60px_rgba(0,0,0,0.08)]"
        >
          <div className="text-orange-500 text-5xl font-serif leading-[0.5] mb-3">“</div>
          <p className="text-zinc-800 font-medium text-base leading-relaxed mb-4">
            Good design is obvious. Great design is transparent.
          </p>
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-full bg-zinc-200 flex items-center justify-center font-bold text-zinc-500 text-xs">JS</div>
             <div className="text-zinc-400 text-[10px] font-bold tracking-widest uppercase">Joe Sparano</div>
          </div>
        </motion.div>

        {/* Figma Bounding Box on Quote Card 2 (Middle Right Very Fast Movement) */}
        <motion.div 
          style={{ y: yFast2, rotateZ: rotateRight }}
          className="absolute top-[50%] right-[5%] md:right-[15%] w-[70vw] md:w-[26vw] p-8 rounded-[3rem] bg-zinc-950 backdrop-blur-md border-2 border-blue-500 shadow-[0_40px_80px_rgba(0,0,0,0.2)]"
        >
          {/* Figma bounding box handles */}
          <div className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-white border border-blue-500" />
          <div className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-white border border-blue-500" />
          <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-white border border-blue-500" />
          <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-white border border-blue-500" />
          <div className="absolute -top-6 left-0 text-blue-500 text-xs font-mono font-medium flex items-center gap-1">
             <span className="opacity-70">#</span> Quote_SteveJobs
          </div>

          <div className="text-zinc-600 text-5xl font-serif leading-[0.5] mb-4">“</div>
          <p className="text-white font-medium text-lg leading-relaxed mb-5">
            Design is not just what it looks like and feels like. Design is how it works.
          </p>
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center font-bold text-white text-xs">SJ</div>
             <div className="text-orange-400 text-[10px] font-bold tracking-widest uppercase">Steve Jobs</div>
          </div>
        </motion.div>

        {/* Small Doodle Arrow pointing to Center Box */}
        <motion.div 
          style={{ y: yMedium1 }}
          className="absolute top-[70%] left-[25%] opacity-100"
        >
           <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500 rotate-45">
             <path d="M5 12h14"></path>
             <path d="M12 5l7 7-7 7"></path>
           </svg>
           <div className="absolute top-10 left-[-20px] text-red-500 font-mono text-[10px] whitespace-nowrap bg-red-50 px-2 py-0.5 border border-red-200">Glassmorphism</div>
        </motion.div>

        {/* Quote Card 3 - Bottom Left Medium Movement */}
        <motion.div 
          style={{ y: yMedium2, rotateZ: rotateRight }}
          className="absolute top-[85%] left-[10%] md:left-[20%] w-[55vw] md:w-[20vw] p-6 rounded-[2rem] bg-blue-500 backdrop-blur-md shadow-2xl shadow-blue-500/30"
        >
          <p className="text-white font-semibold text-base italic leading-relaxed">
            "Simplicity is the ultimate sophistication."
          </p>
          <div className="mt-3 opacity-80 text-white text-[10px] font-bold tracking-widest uppercase">— Leonardo da Vinci</div>
        </motion.div>

      </div>
    </section>
  );
}
