"use client";

import { motion } from "framer-motion";

export default function FloatingDevIcons() {
  return (
    <div className="absolute inset-0 pointer-events-none z-20 hidden md:block">
      {/* 1. UI Window (Top Right) */}
      <motion.div
        animate={{ y: [-8, 8, -8], rotate: [6, 8, 6] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 right-[-20%] lg:right-[-15%] w-36 h-28 bg-white/90 backdrop-blur-md rounded-xl shadow-[0_12px_40px_rgba(0,0,0,0.12)] border border-white p-2 flex flex-col"
      >
        {/* Mac window dots */}
        <div className="flex gap-1.5 mb-2 ml-1 mt-1">
          <div className="w-2 h-2 rounded-full bg-red-400" />
          <div className="w-2 h-2 rounded-full bg-amber-400" />
          <div className="w-2 h-2 rounded-full bg-green-400" />
        </div>
        {/* Wireframe layout */}
        <div className="flex-1 flex gap-2">
          <div className="w-1/3 h-full bg-zinc-100 rounded-lg flex flex-col gap-1.5 p-1.5">
            <div className="w-full h-2 bg-zinc-200 rounded-sm" />
            <div className="w-3/4 h-2 bg-zinc-200 rounded-sm" />
            <div className="w-5/6 h-2 bg-zinc-200 rounded-sm" />
          </div>
          <div className="w-2/3 h-full flex flex-col gap-2">
            <div className="w-full h-1/2 bg-blue-50 border border-blue-100 rounded-lg flex items-center justify-center relative overflow-hidden">
               <motion.div 
                 animate={{ x: [0, 20, 0] }} 
                 transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                 className="w-4 h-4 text-zinc-900 pointer-events-none z-10"
               >
                 <svg viewBox="0 0 24 24" fill="currentColor" className="drop-shadow-sm"><path d="M12 2L2 22l10-4 10 4L12 2z"/></svg>
               </motion.div>
            </div>
            <div className="w-full h-1/2 flex gap-1.5">
              <div className="w-1/2 h-full bg-zinc-100 rounded-lg" />
              <div className="w-1/2 h-full bg-zinc-100 rounded-lg" />
            </div>
          </div>
        </div>
      </motion.div>



      {/* 3. DevOps Server Stack (Bottom Right / Middle) */}
      <motion.div
        animate={{ y: [-5, 5, -5], rotate: [8, 10, 8] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute top-1/2 right-[-5%] lg:right-10 w-16 h-20 bg-zinc-900/90 backdrop-blur-md rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.15)] border border-zinc-700/50 flex flex-col items-center justify-center p-2 gap-1.5"
      >
        {/* Server 1 */}
        <div className="w-full h-1/3 bg-zinc-800 rounded flex items-center px-1.5 border border-zinc-700">
           <div className="w-1 h-1 rounded-full bg-green-500 shadow-[0_0_4px_#22c55e]" />
           <div className="w-4 h-1 bg-zinc-700 ml-auto rounded-sm" />
        </div>
        {/* Server 2 */}
        <div className="w-full h-1/3 bg-zinc-800 rounded flex items-center px-1.5 border border-zinc-700">
           <motion.div 
             animate={{ opacity: [1, 0.4, 1] }} 
             transition={{ duration: 2, repeat: Infinity }}
             className="w-1 h-1 rounded-full bg-green-500 shadow-[0_0_4px_#22c55e]" 
           />
           <div className="w-4 h-1 bg-zinc-700 ml-auto rounded-sm" />
        </div>
        {/* Server 3 */}
        <div className="w-full h-1/3 bg-zinc-800 rounded flex items-center px-1.5 border border-zinc-700">
           <div className="w-1 h-1 rounded-full bg-blue-500 shadow-[0_0_4px_#3b82f6]" />
           <div className="w-4 h-1 bg-zinc-700 ml-auto rounded-sm" />
        </div>
      </motion.div>

    </div>
  );
}
