"use client";

import { motion } from "framer-motion";
import { useState, useRef } from "react";

interface FluidButtonProps {
  text?: string;
  onClick?: () => void;
  className?: string;
}

export default function FluidButton({ text = "Discover More", onClick, className = "" }: FluidButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setCoords({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
    setIsHovered(true);
  };

  return (
    <motion.button
      ref={buttonRef}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative px-10 py-4 border border-zinc-950 rounded-full overflow-hidden select-none group ${className}`}
      whileTap={{ scale: 0.98 }}
    >
      {/* Fluid Background Reveal (Originating from Mouse Entry) */}
      <motion.div
        initial={{ clipPath: "circle(0% at 50% 50%)" }}
        animate={{ 
          clipPath: isHovered 
            ? `circle(150% at ${coords.x}px ${coords.y}px)` 
            : `circle(0% at ${coords.x}px ${coords.y}px)` 
        }}
        transition={{ 
          duration: 0.7, 
          ease: [0.16, 1, 0.3, 1] 
        }}
        className="absolute inset-0 bg-zinc-950"
      />

      {/* Button Text */}
      <span 
        className={`relative z-10 text-sm font-bold uppercase tracking-[0.2em] transition-colors duration-500 ${
          isHovered ? "text-white" : "text-zinc-950"
        }`}
      >
        {text}
      </span>
    </motion.button>
  );
}
