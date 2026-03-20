"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

type HeroDoodlesProps = {
  /** Scroll target for "Say Hi" */
  contactId?: string;
};

function useIsCoarsePointer() {
  const [isCoarse, setIsCoarse] = useState(false);

  useEffect(() => {
    setIsCoarse(window.matchMedia?.("(pointer: coarse)")?.matches ?? false);
  }, []);

  return isCoarse;
}

export default function HeroDoodles({ contactId = "contact" }: HeroDoodlesProps) {
  const coarse = useIsCoarsePointer();

  const goContact = () => {
    const el = document.getElementById(contactId);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    else window.location.hash = `#${contactId}`;
  };

  const commonDrag = coarse
    ? {}
    : {
        drag: true as const,
        dragElastic: 0.22,
        dragMomentum: false,
      };

  return (
    <div className="pointer-events-none absolute inset-0 z-20">
      {/* Say Hi sticker */}
      <motion.button
        type="button"
        aria-label="Say hi"
        className="pointer-events-auto absolute left-3 top-24 sm:left-6 sm:top-28 md:left-10 md:top-28 select-none"
        data-cursor-hover
        onClick={goContact}
        whileHover={{ rotate: -6, scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 380, damping: 18 }}
        {...commonDrag}
      >
        <motion.svg
          width="120"
          height="120"
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="opacity-90"
        >
          {/* red smiley */}
          <motion.circle
            cx="44"
            cy="32"
            r="14"
            stroke="#ef4444"
            strokeWidth="2.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, ease: "easeInOut", delay: 0.4 }}
          />
          <motion.path
            d="M39 30.5H39.01M49 30.5H49.01"
            stroke="#ef4444"
            strokeWidth="3.2"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, ease: "easeInOut", delay: 0.7 }}
          />
          <motion.path
            d="M39 37.5C41.5 40 46.5 40 49 37.5"
            stroke="#ef4444"
            strokeWidth="2.6"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.9, ease: "easeInOut", delay: 0.9 }}
          />

          {/* say hi text */}
          <motion.text
            x="56"
            y="48"
            fill="#ef4444"
            fontSize="14"
            fontWeight="700"
            style={{ letterSpacing: "0.08em" }}
            transform="rotate(-18 56 48)"
            initial={{ opacity: 0, y: -2 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            Say Hi!
          </motion.text>

          {/* curly arrow */}
          <motion.path
            d="M65 58C52 66 58 79 73 82C88 85 92 98 78 104"
            stroke="#111827"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0.55 }}
            animate={{ pathLength: 1, opacity: 0.8 }}
            transition={{ duration: 1.4, ease: "easeInOut", delay: 0.6 }}
          />
          <motion.path
            d="M77 100L79 106L73 105"
            stroke="#111827"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0.55 }}
            animate={{ pathLength: 1, opacity: 0.8 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 1.6 }}
          />
        </motion.svg>
      </motion.button>

      {/* Blue guide line nudge (interactive hint) */}
      <motion.div
        className="hidden sm:block pointer-events-none absolute right-6 top-[42%] md:right-12"
        initial={{ opacity: 0, x: 8 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.svg
          width="110"
          height="110"
          viewBox="0 0 110 110"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="opacity-40"
        >
          <motion.path
            d="M18 28C40 20 55 40 50 55C45 70 65 75 90 68"
            stroke="#3b82f6"
            strokeWidth="2.4"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.4, delay: 1.3, ease: "easeInOut" }}
          />
          <motion.path
            d="M82 60L90 68L80 70"
            stroke="#3b82f6"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.7, delay: 2.1, ease: "easeOut" }}
          />
        </motion.svg>
      </motion.div>

      {/* Small black swirl (purely decorative, draggable on desktop) */}
      <motion.div
        className="pointer-events-auto absolute right-4 bottom-24 sm:right-6 sm:bottom-28 md:right-10 md:bottom-32 opacity-70"
        aria-hidden="true"
        whileHover={{ rotate: 8, scale: 1.03 }}
        transition={{ type: "spring", stiffness: 360, damping: 20 }}
        {...commonDrag}
      >
        <motion.svg
          width="86"
          height="86"
          viewBox="0 0 86 86"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            d="M54 18C41 12 26 19 27 34C28 52 56 45 56 60C56 72 40 74 33 64"
            stroke="#111827"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.6, ease: "easeInOut", delay: 1.0 }}
          />
        </motion.svg>
      </motion.div>
    </div>
  );
}

