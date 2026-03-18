"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ScrollTextRevealProps {
  text: string;
  className?: string;
}

function CharacterReveal({
  char,
  index,
  total,
  scrollProgress,
}: {
  char: string;
  index: number;
  total: number;
  scrollProgress: import("framer-motion").MotionValue<number>;
}) {
  // Each character has a staggered activation window
  const start = index / total;
  const end = start + 1 / total;

  const opacity = useTransform(scrollProgress, [start, end], [0.15, 1]);

  return (
    <motion.span style={{ opacity }}>
      {char}
    </motion.span>
  );
}

export default function ScrollTextReveal({
  text,
  className = "",
}: ScrollTextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.9", "start 0.25"],
  });

  // Split text into words, then characters within each word
  const words = text.split(" ");
  let globalCharIndex = 0;

  // Count total characters including spaces
  const totalChars = text.length;

  return (
    <div ref={containerRef} className={className}>
      <p
        style={{
          fontSize: "48px",
          fontWeight: 600,
          lineHeight: 1.2,
          letterSpacing: "-0.03em",
        }}
      >
        {words.map((word, wordIndex) => (
          <span
            key={wordIndex}
            style={{ display: "inline-block", whiteSpace: "nowrap" }}
          >
            {word.split("").map((char) => {
              const currentIndex = globalCharIndex++;
              return (
                <CharacterReveal
                  key={currentIndex}
                  char={char}
                  index={currentIndex}
                  total={totalChars}
                  scrollProgress={scrollYProgress}
                />
              );
            })}
            {/* Add a space after each word (except the last) */}
            {wordIndex < words.length - 1 && (
              <span style={{ display: "inline-block", width: "0.3em" }}>
                {(() => {
                  const spaceIndex = globalCharIndex++;
                  return (
                    <CharacterReveal
                      char={"\u00A0"}
                      index={spaceIndex}
                      total={totalChars}
                      scrollProgress={scrollYProgress}
                    />
                  );
                })()}
              </span>
            )}
          </span>
        ))}
      </p>
    </div>
  );
}
