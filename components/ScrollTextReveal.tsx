"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ScrollTextRevealProps {
  text?: string;
  elements?: (string | React.ReactNode)[];
  className?: string;
}

function CharacterReveal({
  children,
  index,
  total,
  scrollProgress,
}: {
  children: React.ReactNode;
  index: number;
  total: number;
  scrollProgress: import("framer-motion").MotionValue<number>;
}) {
  // Each character has a staggered activation window
  const start = index / total;
  const end = start + 1 / total;

  const opacity = useTransform(scrollProgress, [start, end], [0.15, 1]);

  return (
    <motion.span style={{ opacity, display: "inline-block" }}>
      {children}
    </motion.span>
  );
}

export default function ScrollTextReveal({
  text,
  elements,
  className = "",
}: ScrollTextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.9", "start 0.25"],
  });

  const contentArray = elements || (text ? [text] : []);

  // Normalize into structured items: words, spaces, and React nodes
  const normalizedItems: Array<{ type: "word" | "space" | "node"; content: any }> = [];

  contentArray.forEach((el) => {
    if (typeof el === "string") {
      const parts = el.split(/(\s+)/);
      parts.forEach((part) => {
        if (part.match(/^\s+$/)) {
          normalizedItems.push({ type: "space", content: part });
        } else if (part.length > 0) {
          normalizedItems.push({ type: "word", content: part });
        }
      });
    } else {
      normalizedItems.push({ type: "node", content: el });
    }
  });

  let totalChars = 0;
  normalizedItems.forEach((item) => {
    if (item.type === "word" || item.type === "space") {
      totalChars += item.content.length;
    } else if (item.type === "node") {
      totalChars += 1;
    }
  });

  let globalCharIndex = 0;

  return (
    <div ref={containerRef} className={className}>
      <div
        style={{
          fontSize: "clamp(28px, 6.5vw, 48px)",
          fontWeight: 600,
          lineHeight: 1.2,
          letterSpacing: "-0.03em",
          display: "block"
        }}
      >
        {normalizedItems.map((item, i) => {
          if (item.type === "word") {
            return (
              <span key={i} style={{ display: "inline-block", whiteSpace: "nowrap" }}>
                {item.content.split("").map((char: string) => {
                  const currentIndex = globalCharIndex++;
                  return (
                    <CharacterReveal
                      key={currentIndex}
                      index={currentIndex}
                      total={totalChars}
                      scrollProgress={scrollYProgress}
                    >
                      {char}
                    </CharacterReveal>
                  );
                })}
              </span>
            );
          } else if (item.type === "space") {
            return (
              <span key={i} style={{ display: "inline-block", whiteSpace: "pre" }}>
                {item.content.split("").map((spaceChar: string) => {
                  const currentIndex = globalCharIndex++;
                  return (
                    <CharacterReveal
                      key={currentIndex}
                      index={currentIndex}
                      total={totalChars}
                      scrollProgress={scrollYProgress}
                    >
                      {spaceChar === " " ? "\u00A0" : spaceChar}
                    </CharacterReveal>
                  );
                })}
              </span>
            );
          } else if (item.type === "node") {
            const currentIndex = globalCharIndex++;
            return (
              <span
                key={i}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  verticalAlign: "middle",
                  margin: "0 0.15em",
                  position: "relative",
                  top: "-0.1em"
                }}
              >
                <CharacterReveal
                  index={currentIndex}
                  total={totalChars}
                  scrollProgress={scrollYProgress}
                >
                  {item.content}
                </CharacterReveal>
              </span>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
}
