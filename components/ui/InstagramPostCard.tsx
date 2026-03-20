"use client";

import { useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";

interface InstagramPostCardProps {
  className?: string;
}

export default function InstagramPostCard({ className = "" }: InstagramPostCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  // 3D Tilt state
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-1, 1], [15, -15]);
  const rotateY = useTransform(mouseXSpring, [-1, 1], [-15, 15]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) / (rect.width / 2));
    y.set((e.clientY - centerY) / (rect.height / 2));
  };

  // Animation variants for the stacked cards
  const card3Variants = {
    rest: { rotate: 0, x: 0, y: 0, scale: 0.95, opacity: 0.6 },
    hover: { 
      rotate: -6, 
      x: -20, 
      y: 10, 
      scale: 0.95, 
      opacity: 0.8,
      transition: { type: "spring" as const, stiffness: 300, damping: 20 }
    }
  };

  const card2Variants = {
    rest: { rotate: 0, x: 0, y: 0, scale: 0.98, opacity: 0.8 },
    hover: { 
      rotate: 6, 
      x: 20, 
      y: 5, 
      scale: 0.98, 
      opacity: 0.9,
      transition: { type: "spring" as const, stiffness: 300, damping: 20 }
    }
  };

  const mainCardVariants = {
    rest: { y: 0, scale: 1 },
    hover: { 
      y: -10, 
      scale: 1.02,
      transition: { type: "spring" as const, stiffness: 300, damping: 20 }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`relative w-full max-w-[320px] sm:max-w-[350px] ${className}`}
      style={{ perspective: 1200 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        x.set(0);
        y.set(0);
      }}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative w-full h-full"
      >
      {/* Background Card 3 */}
      <motion.div
        variants={card3Variants}
        initial="rest"
        animate={isHovered ? "hover" : "rest"}
        className="absolute inset-0 rounded-2xl shadow-sm border border-zinc-200/50 -z-20 origin-bottom-left overflow-hidden"
      >
        <Image src="/rajesh-cafe.jpg" alt="Background Post" fill className="object-cover grayscale" sizes="350px" />
        <div className="absolute inset-0 bg-zinc-100/60 backdrop-blur-[2px]" />
      </motion.div>
      
      {/* Background Card 2 */}
      <motion.div
        variants={card2Variants}
        initial="rest"
        animate={isHovered ? "hover" : "rest"}
        className="absolute inset-0 rounded-2xl shadow-md border border-zinc-200/80 -z-10 origin-bottom-right overflow-hidden"
      >
        <Image src="/rajesh-cafe.jpg" alt="Background Post" fill className="object-cover" sizes="350px" />
        <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px]" />
      </motion.div>

      {/* Main Card (Top layer) */}
      <motion.div
        variants={mainCardVariants}
        initial="rest"
        animate={isHovered ? "hover" : "rest"}
        className="bg-white rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-zinc-100 p-2.5 relative z-10"
      >
        {/* Media with overlaid name */}
        <div className="relative w-full aspect-[4/5] bg-zinc-100 rounded-[18px] overflow-hidden">
          <Image
            src="/rajesh-wall.jpg"
            alt="Rajesh Kanna Portrait"
            fill
            className="object-cover"
            sizes="(max-width: 640px) 320px, 350px"
          />

        </div>

        {/* Minimal Footer */}
        <div className="flex items-center justify-between px-2 pt-3 pb-1">
          <div className="flex items-center gap-2.5">
            <div className="relative w-9 h-9 rounded-full overflow-hidden flex-shrink-0 bg-zinc-100 border border-zinc-100">
              <Image
                src="/rajesh-photo.jpg"
                alt="Rajesh Kanna"
                fill
                className="object-cover"
                sizes="36px"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-[13.5px] font-semibold text-zinc-900 leading-tight">@rajesh-kanna</span>
              <span className="text-[12px] text-zinc-500 leading-tight">Linkedin</span>
            </div>
          </div>

          <button className="flex items-center gap-1.5 px-4 py-2 bg-black hover:bg-zinc-800 text-white text-[13px] font-medium rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-[14px] h-[14px]">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Connect
          </button>
        </div>
      </motion.div>
      </motion.div>
    </motion.div>
  );
}
