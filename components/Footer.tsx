"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { useState, useEffect, useRef, MouseEvent } from "react";
import { Check, Copy, ArrowUpRight, Clock, MousePointer2, Sparkles, Layout } from "lucide-react";

export default function Footer() {
  const giantText = "RAJESH KANNA";
  const [copied, setCopied] = useState(false);
  const [time, setTime] = useState("");
  const containerRef = useRef<HTMLElement>(null);

  // Live Clock effect
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-US", { timeZone: "Asia/Kolkata", hour12: true, hour: "numeric", minute: "2-digit" }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Ambient mouse tracking for the entire footer spotlight & text mask
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Smooth springs for the cursor spotlight
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  function handleMouseMove(e: MouseEvent<HTMLElement>) {
    if (!containerRef.current) return;
    const { left, top } = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  }

  const handleCopy = () => {
    navigator.clipboard.writeText("rajeshkanna.swe@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Mask image template for the giant text hover effect
  const maskImage = useMotionTemplate`radial-gradient(40vw circle at ${smoothX}px ${smoothY}px, black 0%, transparent 100%)`;
  // Standard spotlight for background (subtle dark shadow on light bg)
  const backgroundSpotlight = useMotionTemplate`radial-gradient(600px circle at ${smoothX}px ${smoothY}px, rgba(59,130,246,0.05), transparent 80%)`;

  return (
    <footer 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative bg-[#fafafa] pointer-events-auto text-zinc-900 pt-24 pb-0 overflow-hidden min-h-screen flex flex-col justify-between border-t border-zinc-200 group"
    >
      {/* Figma-style Blueprint Grid (Light Theme) */}
      <div 
        className="absolute inset-0 opacity-[0.4] pointer-events-none z-0"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Dynamic Ambient Spotlight tracking mouse */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-0"
        style={{ background: backgroundSpotlight }}
      />

      {/* Top Links Section */}
      <div className="max-w-[90rem] mx-auto w-full px-8 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 relative z-20">
        
        {/* Left Side: Contact & Info */}
        <div className="md:col-span-6 lg:col-span-7 flex flex-col justify-between relative">
          
          <div className="relative z-10 pt-4 md:pt-16 md:pl-8">
            {/* Status & Clock Ribbon */}
            <div className="flex flex-wrap items-center gap-4 mb-8">
               
               <div className="flex items-center gap-2 bg-white border border-zinc-200 shadow-sm rounded-full px-4 py-1.5 w-max">
                 <span className="relative flex h-2 w-2">
                   <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                   <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                 </span>
                 <p className="text-zinc-600 text-xs font-mono uppercase tracking-wider">
                   Available for freelance
                 </p>
               </div>

               <div className="flex items-center gap-2 bg-white border border-zinc-200 shadow-sm rounded-full px-4 py-1.5 w-max">
                 <Clock className="w-3 h-3 text-zinc-500" />
                 <p className="text-zinc-600 text-xs font-mono uppercase tracking-wider">
                   LOCAL TIME IN INDIA · {time ? time : "--:--"}
                 </p>
               </div>

            </div>

            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-zinc-950 mb-6 leading-[0.95]">
              Let's craft the <br className="hidden md:block"/> 
              <span className="italic font-serif text-blue-600 font-light">future</span> together.
            </h2>
            
            <p className="text-zinc-500 text-lg md:text-xl max-w-md font-medium leading-relaxed">
              If you’re looking for a product designer who codes, cares about motion, and obsesses over the smallest details—drop me a line.
            </p>
          </div>

          <div className="md:pl-8 mt-12 md:mt-24 w-max relative group/copy">
            {/* Interactive Glassmorphic Email Button (Light Theme) */}
            <button 
               onClick={handleCopy}
               className="flex items-center gap-6 px-1 py-1 pr-6 bg-white hover:bg-zinc-50 border border-zinc-200 hover:border-zinc-300 shadow-sm rounded-full transition-all duration-300 relative group/btn overflow-hidden cursor-pointer"
            >
               {/* Shine effect */}
               <div className="absolute inset-0 -translate-x-full group-hover/btn:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-blue-500/10 to-transparent skew-x-12 z-0" />
               
               <div className="w-14 h-14 rounded-full bg-zinc-900 text-white flex items-center justify-center relative z-10 transition-transform duration-300 group-hover/btn:scale-95 shadow-md">
                  {copied ? <Check className="w-5 h-5 text-emerald-400" /> : <Copy className="w-5 h-5" />}
               </div>
               
               <div className="flex flex-col items-start relative z-10">
                  <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest">{copied ? "Copied!" : "Drop me a line"}</span>
                  <span className="text-lg md:text-xl font-bold text-zinc-900 group-hover/btn:text-blue-600 transition-colors">rajeshkanna.swe@gmail.com</span>
               </div>
            </button>
          </div>
        </div>

        {/* Right Side: Links & Figma UI Mock */}
        <div className="md:col-span-6 lg:col-span-5 flex flex-col pt-8 md:pt-16 relative">
          
          {/* Floating Figma Toolbar (Light Edition) */}
          <motion.div
             animate={{ y: [0, -10, 0] }}
             transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
             className="absolute top-0 right-0 hidden lg:flex bg-white border border-zinc-200 rounded-full p-2 flex-col gap-3 shadow-[0_10px_40px_rgba(0,0,0,0.06)] z-30"
          >
             <div className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center text-blue-500 border border-zinc-200/50">
                <MousePointer2 className="w-4 h-4 fill-blue-500/20" />
             </div>
             <div className="w-8 h-8 rounded-full hover:bg-zinc-100 flex items-center justify-center text-zinc-500 hover:text-zinc-800 transition-colors cursor-pointer">
                <Sparkles className="w-4 h-4" />
             </div>
             <div className="w-8 h-8 rounded-full hover:bg-zinc-100 flex items-center justify-center text-zinc-500 hover:text-zinc-800 transition-colors cursor-pointer">
                <Layout className="w-4 h-4" />
             </div>
          </motion.div>

          <div className="grid grid-cols-2 gap-8 md:gap-16 text-[15px] font-bold mt-auto mb-10 w-full max-w-sm ml-auto">
             <div className="flex flex-col space-y-5">
               <span className="text-zinc-400 font-mono text-xs uppercase tracking-widest mb-2 border-b border-zinc-200 pb-2">Platform</span>
                {[
                  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/rajesh-kanna36/' },
                  { name: 'GitHub', url: 'https://github.com/rajeshkanna-36' },
                  { name: 'Dribbble', url: '#' },
                  { name: 'Twitter', url: '#' },
                ].map((network) => (
                  <a 
                    key={network.name} 
                    href={network.url}
                    target={network.url !== '#' ? '_blank' : undefined}
                    rel={network.url !== '#' ? 'noopener noreferrer' : undefined}
                    className="text-zinc-600 hover:text-blue-600 transition-all w-max flex items-center gap-1 group/link"
                  >
                    {network.name}
                    <ArrowUpRight className="w-4 h-4 opacity-0 -translate-x-2 translate-y-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 group-hover/link:-translate-y-0 text-blue-600 transition-all duration-300" />
                  </a>
                ))}
             </div>
             
             <div className="flex flex-col space-y-5">
               <span className="text-zinc-400 font-mono text-xs uppercase tracking-widest mb-2 border-b border-zinc-200 pb-2">Menu</span>
               {['Work', 'About', 'Experience', 'Contact'].map((link) => (
                 <a 
                   key={link} 
                   href="#" 
                   className="text-zinc-600 hover:text-blue-600 transition-all w-max relative overflow-hidden group/menu"
                 >
                   <span className="relative z-10">{link}</span>
                   <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-blue-600 transition-all duration-300 group-hover/menu:w-full" />
                 </a>
               ))}
             </div>
          </div>

        </div>
      </div>

      {/* --- MASKED HOVER GIANT TEXT --- */}
      <div className="w-full flex justify-center items-end mt-32 relative select-none overflow-hidden h-[25vw] sm:h-[20vw] border-t border-zinc-200 bg-white">
        
        {/* Base Layer: Dim outline text (Light theme outline) */}
        <h1 
          className="absolute bottom-0 font-black tracking-[-0.05em] uppercase whitespace-nowrap text-center text-transparent"
          style={{ 
            fontSize: "19vw", 
            lineHeight: "0.8", 
            marginBottom: "-4.5vw",
            WebkitTextStroke: "1px rgba(0,0,0,0.1)"
          }}
        >
          {giantText}
        </h1>

        {/* Hover Mask Layer: Vibrant & Filled */}
        <motion.div
           className="absolute inset-0 pointer-events-none z-10"
           style={{ WebkitMaskImage: maskImage, maskImage }}
        >
           {/* The vibrant gradient that matches the project's creative Blue/Orange vibe */}
           <div className="absolute inset-0 bg-gradient-to-r from-[#3b82f6] via-purple-500 to-[#f97316]" />
           {/* Inner Blueprint over the gradient */}
           <div 
             className="absolute inset-0 mix-blend-overlay opacity-[0.15]"
             style={{
               backgroundImage: `linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)`,
               backgroundSize: '20px 20px'
             }}
           />

           {/* The actual text used to clip out the gradient */}
           <h1 
             className="absolute bottom-0 font-black tracking-[-0.05em] uppercase whitespace-nowrap text-center w-full bg-white text-black mix-blend-screen"
             style={{ 
               fontSize: "19vw", 
               lineHeight: "0.8", 
               marginBottom: "-4.5vw",
             }}
           >
             {giantText}
           </h1>
        </motion.div>

        {/* Interactive Mouse Helper Text inside spotlight */}
        <motion.div
           className="absolute pointer-events-none z-20 mix-blend-difference hidden md:flex items-center gap-2"
           style={{ x: smoothX, y: smoothY }}
        >
           <span className="w-2 h-2 rounded-full bg-zinc-900" />
        </motion.div>

      </div>

    </footer>
  );
}
