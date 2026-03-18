"use client";

import { motion } from "framer-motion";

export default function GeometricBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Base Grid Pattern */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
          opacity: "var(--home-grid-opacity, 0.03)",
        }}
      />

      {/* Floating Geometric Shapes */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[10%] left-[5%] w-64 h-64 border border-zinc-900/5 rounded-full"
        style={{
          opacity: "var(--home-shape-opacity, 0.05)",
          transform: "translate(calc(var(--home-px, 0px) * 0.35), calc(var(--home-py, 0px) * 0.35))",
        }}
      />

      <motion.div
        animate={{
          y: [0, 30, 0],
          rotate: [0, -10, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[60%] right-[10%] w-96 h-96 border border-zinc-900/5 rotate-45"
        style={{
          opacity: "var(--home-shape-opacity, 0.05)",
          transform: "translate(calc(var(--home-px, 0px) * -0.6), calc(var(--home-py, 0px) * 0.55)) rotate(45deg)",
        }}
      />

      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.02, 0.05, 0.02],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-[20%] left-[15%] w-48 h-48 bg-zinc-900/5 rounded-xl rotate-12"
        style={{
          opacity: "var(--home-shape-opacity, 0.05)",
          transform: "translate(calc(var(--home-px, 0px) * 0.8), calc(var(--home-py, 0px) * -0.5)) rotate(12deg)",
        }}
      />

      {/* Subtle Gradient Radial */}
      <div className="absolute inset-0 bg-gradient-to-tr from-zinc-50/50 via-transparent to-transparent" />
    </div>
  );
}
