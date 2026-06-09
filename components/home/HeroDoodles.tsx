"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

function useIsCoarsePointer() {
  const [isCoarse, setIsCoarse] = useState(false);
  useEffect(() => {
    setIsCoarse(window.matchMedia?.("(pointer: coarse)")?.matches ?? false);
  }, []);
  return isCoarse;
}

/* ── Speech Bubble Tooltip ────────────────────────────────── */
function SpeechBubble({
  text,
  show,
  position = "top",
}: {
  text: string;
  show: boolean;
  position?: "top" | "bottom" | "left" | "right";
}) {
  const posClasses: Record<string, string> = {
    top: "-top-12 left-1/2 -translate-x-1/2",
    bottom: "-bottom-12 left-1/2 -translate-x-1/2",
    left: "top-1/2 -translate-y-1/2 -left-4 -translate-x-full",
    right: "top-1/2 -translate-y-1/2 -right-4 translate-x-full",
  };

  const arrowClasses: Record<string, string> = {
    top: "-bottom-1.5 left-1/2 -translate-x-1/2 rotate-45",
    bottom: "-top-1.5 left-1/2 -translate-x-1/2 rotate-45",
    left: "-right-1.5 top-1/2 -translate-y-1/2 rotate-45",
    right: "-left-1.5 top-1/2 -translate-y-1/2 rotate-45",
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          className={`absolute z-50 ${posClasses[position]}`}
        >
          <div className="relative px-3 py-1.5 bg-zinc-900 rounded-lg shadow-lg whitespace-nowrap">
            <span className="text-[11px] text-white font-medium">{text}</span>
            <div className={`absolute w-3 h-3 bg-zinc-900 ${arrowClasses[position]}`} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ── Twinkling sparkle ────────────────────────────────────── */
function Sparkle({ className, delay = 0 }: { className?: string; delay?: number }) {
  return (
    <motion.svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      animate={{
        scale: [1, 1.3, 1, 0.8, 1],
        opacity: [0.5, 1, 0.5, 0.3, 0.5],
        rotate: [0, 15, 0, -15, 0],
      }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay }}
    >
      <path d="M12 0l1.5 8.5 8.5 1.5-8.5 1.5-1.5 8.5-1.5-8.5-8.5-1.5 8.5-1.5z" />
    </motion.svg>
  );
}

/* ── Tool icon ────────────────────────────────────────────── */
function ToolIcon({
  children,
  isActive = false,
  label,
}: {
  children: React.ReactNode;
  isActive?: boolean;
  label: string;
}) {
  return (
    <motion.div
      className={`relative w-7 h-7 rounded-lg flex items-center justify-center cursor-pointer transition-colors ${
        isActive ? "bg-zinc-700" : "bg-zinc-800 hover:bg-zinc-700"
      }`}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.9 }}
      title={label}
    >
      {children}
      {isActive && (
        <motion.div
          className="absolute inset-0 rounded-lg border border-orange-400/40"
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}
    </motion.div>
  );
}

export default function HeroDoodles() {
  const coarse = useIsCoarsePointer();
  const [keyPressed, setKeyPressed] = useState(false);
  const [keysHovered, setKeysHovered] = useState(false);
  const [pillHovered, setPillHovered] = useState(false);
  const [toolsHovered, setToolsHovered] = useState(false);
  const [swatchHovered, setSwatchHovered] = useState(false);
  const [hintShown, setHintShown] = useState(false);
  const [discovered, setDiscovered] = useState(false);

  const commonDrag = coarse
    ? {}
    : { drag: true as const, dragConstraints: { top: 0, bottom: 0, left: 0, right: 0 }, dragElastic: 0.18, dragMomentum: false };

  // Auto-press ⌘Z periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setKeyPressed(true);
      setTimeout(() => setKeyPressed(false), 200);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Auto-show a hint speech bubble after 2s to teach users
  useEffect(() => {
    if (discovered) return;
    const timer = setTimeout(() => setHintShown(true), 2000);
    const hideTimer = setTimeout(() => setHintShown(false), 5000);
    return () => { clearTimeout(timer); clearTimeout(hideTimer); };
  }, [discovered]);

  // Mark as discovered when any element is hovered
  const onDiscover = () => {
    if (!discovered) setDiscovered(true);
  };

  return (
    <div className="pointer-events-none absolute inset-0 z-20">
      {/* Pulsing ring hint style — only active before user discovers hover */}
      {!discovered && (
        <style>{`
          @keyframes hint-pulse {
            0%, 100% { box-shadow: 0 0 0 0 rgba(249,115,22,0.3); }
            50% { box-shadow: 0 0 0 6px rgba(249,115,22,0); }
          }
          .hint-pulse { animation: hint-pulse 2s ease-in-out infinite; }
        `}</style>
      )}

      {/* ── ⌘ + Z  Keyboard shortcut (Top Left) ───────────── */}
      <motion.div
        className={`pointer-events-auto absolute left-6 top-28 sm:left-14 sm:top-32 md:left-24 md:top-36 select-none hidden sm:flex items-center gap-2 ${!discovered ? 'hint-pulse' : ''} rounded-2xl`}
        initial={{ opacity: 0, y: 10, rotate: -8 }}
        animate={{ opacity: 1, y: 0, rotate: -8 }}
        transition={{ duration: 0.6, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ rotate: -2, scale: 1.06 }}
        onHoverStart={() => { setKeysHovered(true); onDiscover(); }}
        onHoverEnd={() => setKeysHovered(false)}
        {...commonDrag}
      >
        <SpeechBubble text="Oops! Let me undo that real quick 😅" show={keysHovered || hintShown} position="top" />
        <motion.div
          animate={keyPressed ? { y: 2, scale: 0.95 } : { y: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 15 }}
          className="w-12 h-12 bg-zinc-900 rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.15)] flex items-center justify-center border border-zinc-700"
        >
          <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"/>
          </svg>
        </motion.div>
        <motion.div
          animate={keyPressed ? { y: 2, scale: 0.95 } : { y: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 15, delay: 0.03 }}
          className="w-12 h-12 bg-zinc-100 rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.08)] flex items-center justify-center border border-zinc-200"
        >
          <span className="text-zinc-800 text-base font-bold">Z</span>
        </motion.div>
        <motion.span
          animate={keyPressed ? { opacity: 1, x: 0 } : { opacity: 0, x: -5 }}
          transition={{ duration: 0.2 }}
          className="text-[10px] text-zinc-400 font-medium ml-1"
        >
          Undo
        </motion.span>
      </motion.div>

      {/* ── "UX Design Portfolio" pill with shimmer ────────── */}
      <motion.div
        className={`pointer-events-auto absolute left-1/2 -translate-x-1/2 top-28 sm:top-32 md:top-36 select-none hidden sm:block ${!discovered ? 'hint-pulse' : ''} rounded-full`}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ scale: 1.06, y: -2 }}
        whileTap={{ scale: 0.98 }}
        onHoverStart={() => { setPillHovered(true); onDiscover(); }}
        onHoverEnd={() => setPillHovered(false)}
        {...commonDrag}
      >
        <SpeechBubble text="Yes, you found the secret badge! 🏆" show={pillHovered} position="top" />
        <div className="relative px-6 py-2 bg-white rounded-full border border-zinc-200 shadow-sm flex items-center gap-2 overflow-hidden">
          <span className="text-sm font-semibold text-zinc-600 tracking-wide relative z-10">UX Design Portfolio</span>
          <Sparkle className="w-4 h-4 text-zinc-400 relative z-10" delay={0.5} />
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-transparent"
            animate={{ x: ["-100%", "200%"] }}
            transition={{ duration: 3, repeat: Infinity, repeatDelay: 4, ease: "easeInOut" }}
          />
        </div>
      </motion.div>

      {/* ── Twinkling sparkles ─────────────────────────────── */}
      <Sparkle className="absolute right-[22%] top-[18%] w-6 h-6 text-zinc-800 hidden md:block" delay={0} />
      <Sparkle className="absolute left-[26%] bottom-[25%] w-5 h-5 text-zinc-500 hidden md:block" delay={1.5} />
      <Sparkle className="absolute right-[15%] bottom-[32%] w-4.5 h-4.5 text-zinc-400 hidden lg:block" delay={3} />
      <Sparkle className="absolute left-[15%] top-[42%] w-4 h-4 text-zinc-300 hidden lg:block" delay={2.2} />

      {/* ── Design Tools Panel (Right side) ───────────────── */}
      <motion.div
        className={`pointer-events-auto absolute right-6 top-1/2 -translate-y-1/2 sm:right-12 md:right-20 select-none hidden md:block ${!discovered ? 'hint-pulse' : ''} rounded-2xl`}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 0.9, x: 0 }}
        transition={{ duration: 0.7, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ opacity: 1 }}
        onHoverStart={() => { setToolsHovered(true); onDiscover(); }}
        onHoverEnd={() => setToolsHovered(false)}
        {...commonDrag}
      >
        <SpeechBubble text="My weapons of choice ⚔️" show={toolsHovered} position="left" />
        <motion.div
          className="bg-zinc-900 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.2)] border border-zinc-700/50 p-3 grid grid-cols-2 gap-2.5 w-[88px]"
          animate={{ y: [-4, 4, -4] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ToolIcon label="Select">
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-zinc-300" fill="currentColor">
              <path d="M4 2l16 9.5-7 1.5-2.5 7z"/>
            </svg>
          </ToolIcon>
          <ToolIcon label="Move">
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-zinc-300" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M12 2v20M2 12h20M5 5l2 2M17 5l-2 2M5 19l2-2M17 19l-2-2"/>
            </svg>
          </ToolIcon>
          <ToolIcon label="Pen Tool" isActive>
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-orange-400" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 19l7-7 3 3-7 7-3-3z"/>
              <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/>
              <path d="M2 2l7.586 7.586"/>
              <circle cx="11" cy="11" r="2"/>
            </svg>
          </ToolIcon>
          <ToolIcon label="Text">
            <span className="text-zinc-300 text-xs font-bold">T</span>
          </ToolIcon>
          <ToolIcon label="Frame">
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-zinc-300" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <rect x="3" y="3" width="18" height="18" rx="2"/>
            </svg>
          </ToolIcon>
          <ToolIcon label="Shapes">
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-zinc-300" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="9"/>
            </svg>
          </ToolIcon>
        </motion.div>
      </motion.div>

      {/* ── Floating color swatch (Bottom Left) ────────────── */}
      <motion.div
        className={`pointer-events-auto absolute left-8 bottom-28 sm:left-16 sm:bottom-32 md:left-28 md:bottom-36 select-none hidden sm:block ${!discovered ? 'hint-pulse' : ''} rounded-2xl`}
        initial={{ opacity: 0, scale: 0.8, rotate: -12 }}
        animate={{ opacity: 0.75, scale: 1, rotate: -12 }}
        transition={{ duration: 0.6, delay: 1.6, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ opacity: 1, rotate: 0, scale: 1.08 }}
        onHoverStart={() => { setSwatchHovered(true); onDiscover(); }}
        onHoverEnd={() => setSwatchHovered(false)}
        {...commonDrag}
      >
        <SpeechBubble text="Orange is always the answer 🍊" show={swatchHovered} position="top" />
        <motion.div
          className="flex gap-1.5 p-2 bg-white rounded-xl shadow-[0_4px_16px_rgba(0,0,0,0.08)] border border-zinc-100"
          animate={{ y: [-3, 3, -3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        >
          <motion.div
            className="w-7 h-7 rounded-lg bg-[#f97316] cursor-pointer"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
          <motion.div
            className="w-6 h-6 rounded-lg bg-zinc-900 cursor-pointer"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
          <motion.div
            className="w-6 h-6 rounded-lg bg-[#3b82f6] cursor-pointer"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
          <motion.div
            className="w-6 h-6 rounded-lg bg-white border-2 border-zinc-200 cursor-pointer"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
