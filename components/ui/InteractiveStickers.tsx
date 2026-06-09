"use client";

import { motion } from "framer-motion";
import { Coffee, Code, GitBranch, Bug, Terminal, Cpu } from "lucide-react";
import { ReactNode } from "react";

interface StickerProps {
  children: ReactNode;
  label: string;
  className?: string;
  initialX?: number;
  initialY?: number;
  rotation?: number;
}

const HudElement = ({ label, value, initialX = 0, initialY = 0, rotation = 0, color = "orange" }: any) => {
  return (
    <motion.div
      drag
      dragConstraints={{ left: -250, right: 250, top: -250, bottom: 250 }}
      initial={{ x: initialX, y: initialY, rotate: rotation, opacity: 0 }}
      animate={{ opacity: 1 }}
      whileHover={{ 
        scale: 1.02, 
        rotate: rotation + 2, 
        zIndex: 50,
      }}
      whileDrag={{ cursor: "grabbing" }}
      className="absolute p-4 border border-zinc-200 bg-white/40 backdrop-blur-[2px] min-w-[140px] select-none cursor-grab active:cursor-grabbing group transition-colors hover:border-orange-500/50"
    >
      {/* Corner Brackets */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-orange-500" />
      <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-zinc-300 group-hover:border-orange-500" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-zinc-300 group-hover:border-orange-500" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-orange-500" />

      <div className="flex flex-col gap-1">
        <div className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest flex justify-between">
          <span>{label}</span>
          <span className="text-orange-500">SYS_OK</span>
        </div>
        <div className="text-sm font-mono font-bold text-zinc-950 mt-1">
          {value}
        </div>
        {/* Simple Progress Bar or Signal Line */}
        <div className="w-full h-[2px] bg-zinc-100 mt-2 relative overflow-hidden">
          <motion.div 
            animate={{ x: ["-100%", "200%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 w-1/2 bg-orange-500/30" 
          />
        </div>
      </div>
    </motion.div>
  );
};

export default function InteractiveStickers() {
  return (
    <div className="relative w-full h-[500px] mt-24 md:mt-0 md:absolute md:-top-20 md:-right-20 md:w-1/2 pointer-events-none">
      <div className="relative w-full h-full pointer-events-auto">
        <HudElement label="CPU_CORE_01" value="OPTIMIZED" initialX={0} initialY={40} rotation={-5} />
        <HudElement label="GIT_BRANCH" value="PROD/STABLE" initialX={180} initialY={100} rotation={3} />
        <HudElement label="LATENCY_MS" value="0.42 ms" initialX={40} initialY={260} rotation={-2} />
        <HudElement label="COMMIT_HASH" value="0x1A2B3C4" initialX={240} initialY={280} rotation={8} />
        <HudElement label="DEV_STATUS" value="READY_TO_BUILD" initialX={280} initialY={0} rotation={-10} />
        <HudElement label="MEMORY_USE" value="12.4 GB" initialX={100} initialY={400} rotation={-4} />
      </div>
    </div>
  );
}
