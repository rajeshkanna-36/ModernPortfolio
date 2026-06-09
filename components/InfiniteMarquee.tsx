"use client";

import { motion } from "framer-motion";

interface InfiniteMarqueeProps {
  text: string;
  repeat?: number;
  speed?: number;
  className?: string;
}

export default function InfiniteMarquee({
  text,
  repeat = 3,
  speed = 15,
  className = "",
}: InfiniteMarqueeProps) {
  const items = Array.from({ length: repeat }, (_, i) => i);

  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <motion.div
        className="inline-flex"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: speed,
            ease: "linear",
          },
        }}
      >
        {/* First set */}
        {items.map((i) => (
          <span key={i} className="inline-flex items-center">
            <span
              style={{
                fontSize: "clamp(20px, 2.5vw, 28px)",
                fontWeight: 600,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
            >
              {text}
            </span>
            <span
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: "currentColor",
                margin: "0 1.5em",
                flexShrink: 0,
              }}
            />
          </span>
        ))}
        {/* Duplicate for seamless loop */}
        {items.map((i) => (
          <span key={`dup-${i}`} className="inline-flex items-center">
            <span
              style={{
                fontSize: "clamp(20px, 2.5vw, 28px)",
                fontWeight: 600,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
            >
              {text}
            </span>
            <span
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: "currentColor",
                margin: "0 1.5em",
                flexShrink: 0,
              }}
            />
          </span>
        ))}
      </motion.div>
    </div>
  );
}
