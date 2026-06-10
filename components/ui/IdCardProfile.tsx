"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Caveat } from "next/font/google";

// For the handwritten signature look
const caveat = Caveat({ subsets: ["latin"], weight: ["700"] });

interface IdCardProfileProps {
  className?: string;
}

export default function IdCardProfile({ className = "" }: IdCardProfileProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotate: -5 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      className={`relative flex flex-col items-center justify-start origin-top pt-[140px] md:pt-[200px] -mt-[140px] md:-mt-[200px] z-10 ${className}`}
      // Gentle constant swing after initial reveal
      animate={{
        rotate: [-1, 2, -1],
      }}
      transition={{ 
        duration: 0.8, 
        ease: [0.22, 1, 0.36, 1],
        rotate: {
          repeat: Infinity,
          duration: 6,
          ease: "easeInOut",
        }
      }}
    >
      {/* The Lanyard Strap - Absolute positioned to fill the extruded padding and tuck under the black marquee above */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-[148px] md:h-[208px] z-0">
        <div 
          className="absolute inset-0 mx-auto w-full h-full bg-[#8c8c8c] rounded-t-sm shadow-inner overflow-hidden border-x border-zinc-400"
          style={{
            backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)"
          }}
        />
        {/* Shadow cast by lanyard on card */}
        <div className="absolute bottom-[-8px] left-1/2 -translate-x-1/2 w-14 h-8 bg-black/20 blur-md rounded-full" />
      </div>

      {/* The ID Card Holder */}
      <div 
        className="relative z-10 w-[280px] sm:w-[320px] bg-[#abaa9f] p-4 sm:p-5 pb-5 sm:pb-6 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-white/20"
        style={{
          boxShadow: "inset 0 1px 1px rgba(255,255,255,0.4), 0 20px 40px rgba(0,0,0,0.15), 0 10px 20px rgba(0,0,0,0.1)"
        }}
      >
        {/* Clip punch hole at top center */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-12 h-3.5 bg-zinc-800/80 rounded-full shadow-inner shadow-black/50 border border-white/10" />

        <motion.div 
          whileHover={{ scale: 1.02, rotate: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="mt-6 flex flex-col gap-4 sm:gap-5"
        >
          {/* Profile Photo Wrapper */}
          <div className="relative w-full aspect-[4/4.5] rounded-[1.5rem] overflow-hidden shadow-inner bg-zinc-200">
            <Image
              src="/rajesh-wall.jpg"
              alt="Rajesh Kanna Profile"
              fill
              className="object-cover"
              sizes="(max-width: 640px) 280px, 320px"
              priority
            />
          </div>

          {/* Details Card */}
          <div className="relative w-full bg-[#f4f2ec] rounded-[1.5rem] py-5 px-4 flex flex-col items-center justify-center shadow-sm">
            
            {/* Scroll Down Sticker overlay */}
            <div className="absolute -left-2 sm:-left-4 top-1/2 -translate-y-1/2 rotate-[-5deg] bg-white border border-zinc-200 shadow-md rounded-full px-3 py-1 flex items-center gap-1 z-20">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
              <span className="text-[9px] sm:text-[10px] font-bold text-zinc-600 uppercase tracking-wider">Scroll Down</span>
            </div>

            <h3 className={`${caveat.className} text-5xl sm:text-6xl text-[#e26a2c] -mt-2 mb-1`}>
              Rajesh
            </h3>
            <p className="text-[10px] sm:text-[11px] font-bold text-zinc-700 uppercase tracking-[0.2em] font-sans">
              Product Designer
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
