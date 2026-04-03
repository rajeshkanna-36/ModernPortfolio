"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface IPhoneMockupProps {
  src: string;
  alt?: string;
  className?: string;
  priority?: boolean;
}

export default function IPhoneMockup({ src, alt = "iPhone Mockup", className = "", priority = false }: IPhoneMockupProps) {
  return (
    <div className={`relative w-full aspect-[9/19.5] max-w-[300px] mx-auto ${className}`}>
      {/* Outer Frame */}
      <div className="absolute inset-0 bg-zinc-900 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] p-[3%] ring-1 ring-white/10 overflow-hidden">
        {/* Screen Bezel */}
        <div className="absolute inset-[1.5%] bg-black rounded-[2.8rem] overflow-hidden">
          {/* Dynamic Island */}
          <div className="absolute top-[3%] left-1/2 -translate-x-1/2 w-[35%] h-[2.5%] bg-black rounded-full z-20 flex items-center justify-between px-[5%]">
            <div className="w-[10%] aspect-square rounded-full bg-zinc-800/50" />
            <div className="w-[40%] h-[40%] rounded-full bg-zinc-800/30" />
          </div>

          {/* Screen Content */}
          <div className="relative w-full h-full rounded-[2.6rem] overflow-hidden bg-zinc-950">
            <Image
              src={src}
              alt={alt}
              fill
              priority={priority}
              className="object-cover"
              sizes="(max-width: 768px) 300px, 400px"
            />
          </div>
        </div>
      </div>
      
      {/* Side Buttons (Subtle) */}
      <div className="absolute left-[-2px] top-[15%] w-[4px] h-[8%] bg-zinc-800 rounded-l-sm" />
      <div className="absolute left-[-2px] top-[25%] w-[4px] h-[12%] bg-zinc-800 rounded-l-sm" />
      <div className="absolute left-[-2px] top-[38%] w-[4px] h-[12%] bg-zinc-800 rounded-l-sm" />
      <div className="absolute right-[-2px] top-[28%] w-[4px] h-[18%] bg-zinc-800 rounded-r-sm" />
    </div>
  );
}
