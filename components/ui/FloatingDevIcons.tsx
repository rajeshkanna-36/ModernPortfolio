"use client";

import { motion } from "framer-motion";

export default function FloatingDevIcons() {
  return (
    <div className="absolute inset-0 pointer-events-none z-20 hidden md:block">
      {/* 1. Minimal Wireframe Card (Top Right) */}
      <motion.div
        animate={{ y: [-8, 8, -8], rotate: [6, 8, 6] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 right-[-20%] lg:right-[-15%] w-36 h-28 bg-white/90 backdrop-blur-md rounded-xl shadow-[0_12px_40px_rgba(0,0,0,0.08)] border border-zinc-100 p-2.5 flex flex-col"
      >
        {/* Top bar */}
        <div className="flex items-center gap-1.5 mb-2">
          <div className="w-1.5 h-1.5 rounded-full bg-zinc-300" />
          <div className="w-1.5 h-1.5 rounded-full bg-zinc-300" />
          <div className="w-1.5 h-1.5 rounded-full bg-zinc-300" />
          <div className="ml-auto w-8 h-1.5 bg-zinc-100 rounded-full" />
        </div>
        {/* Layout wireframe */}
        <div className="flex-1 flex gap-1.5">
          {/* Sidebar */}
          <div className="w-1/4 h-full rounded-md bg-zinc-50 border border-zinc-100 flex flex-col gap-1 p-1">
            <div className="w-full h-1 bg-zinc-200 rounded-full" />
            <div className="w-3/4 h-1 bg-zinc-150 rounded-full opacity-60" />
            <div className="w-full h-1 bg-zinc-200 rounded-full" />
          </div>
          {/* Main content */}
          <div className="flex-1 flex flex-col gap-1.5">
            <div className="w-full h-2/5 rounded-md bg-zinc-50 border border-zinc-100 flex items-center justify-center overflow-hidden">
              <motion.div
                animate={{ x: [-6, 6, -6] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="w-3 h-3 border-2 border-orange-400 rounded-sm"
              />
            </div>
            <div className="flex-1 flex gap-1">
              <div className="flex-1 rounded-md bg-zinc-50 border border-zinc-100" />
              <div className="flex-1 rounded-md bg-zinc-50 border border-zinc-100" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* 2. Layers Stack (Bottom Right) */}
      <motion.div
        animate={{ y: [-5, 5, -5], rotate: [8, 10, 8] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute top-1/2 right-[-5%] lg:right-10 w-16 h-20 flex items-center justify-center"
      >
        {/* Stacked layers */}
        <motion.div
          animate={{ y: [0, -2, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
          className="absolute w-11 h-7 bg-zinc-200/80 backdrop-blur-sm rounded-lg border border-zinc-300/50 shadow-sm"
          style={{ top: "8px" }}
        />
        <motion.div
          animate={{ y: [0, -1, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
          className="absolute w-12 h-7 bg-zinc-100/90 backdrop-blur-sm rounded-lg border border-zinc-200 shadow-md"
          style={{ top: "16px" }}
        />
        <div
          className="absolute w-13 h-8 bg-white/95 backdrop-blur-md rounded-lg border border-zinc-200 shadow-[0_4px_20px_rgba(0,0,0,0.08)] flex items-center gap-1.5 px-2"
          style={{ top: "24px", width: "3.5rem" }}
        >
          <div className="w-2.5 h-2.5 rounded-sm bg-orange-400/80" />
          <div className="flex-1 flex flex-col gap-0.5">
            <div className="w-full h-1 bg-zinc-200 rounded-full" />
            <div className="w-2/3 h-1 bg-zinc-100 rounded-full" />
          </div>
        </div>
      </motion.div>

    </div>
  );
}
