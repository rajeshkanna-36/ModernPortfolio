"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";

/* ── Floating parallax shapes ── */
const SHAPES = [
  // Large circle — top-left, slow drift
  { type: "circle", cx: "8%", cy: "40%", size: 120, speed: 0.3, rotate: 15, color: "rgba(249,115,22,0.06)" },
  // Diamond — right side, medium speed
  { type: "diamond", cx: "88%", cy: "55%", size: 60, speed: 0.55, rotate: 45, color: "rgba(59,130,246,0.05)" },
  // Small dot cluster — center-left
  { type: "dot", cx: "22%", cy: "70%", size: 8, speed: 0.7, rotate: 0, color: "rgba(0,0,0,0.08)" },
  // Ring — bottom-right
  { type: "ring", cx: "78%", cy: "75%", size: 90, speed: 0.45, rotate: -20, color: "rgba(249,115,22,0.04)" },
  // Tiny cross — top-right
  { type: "cross", cx: "72%", cy: "30%", size: 24, speed: 0.65, rotate: 12, color: "rgba(0,0,0,0.06)" },
  // Large ring — center
  { type: "ring", cx: "45%", cy: "50%", size: 200, speed: 0.2, rotate: 30, color: "rgba(59,130,246,0.03)" },
  // Small diamond — left
  { type: "diamond", cx: "15%", cy: "60%", size: 32, speed: 0.8, rotate: 0, color: "rgba(249,115,22,0.07)" },
  // Dot — far right
  { type: "dot", cx: "92%", cy: "45%", size: 6, speed: 0.9, rotate: 0, color: "rgba(0,0,0,0.05)" },
];

function ShapeSVG({ type, size, color }: { type: string; size: number; color: string }) {
  switch (type) {
    case "circle":
      return (
        <svg width={size} height={size} viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="46" fill={color} />
        </svg>
      );
    case "diamond":
      return (
        <svg width={size} height={size} viewBox="0 0 100 100">
          <rect x="15" y="15" width="70" height="70" fill={color} transform="rotate(45 50 50)" />
        </svg>
      );
    case "ring":
      return (
        <svg width={size} height={size} viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="44" fill="none" stroke={color} strokeWidth="2" />
        </svg>
      );
    case "cross":
      return (
        <svg width={size} height={size} viewBox="0 0 100 100">
          <line x1="20" y1="50" x2="80" y2="50" stroke={color} strokeWidth="4" strokeLinecap="round" />
          <line x1="50" y1="20" x2="50" y2="80" stroke={color} strokeWidth="4" strokeLinecap="round" />
        </svg>
      );
    case "dot":
    default:
      return (
        <svg width={size} height={size} viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="48" fill={color} />
        </svg>
      );
  }
}

function FloatingShape({
  shape,
  scrollProgress,
}: {
  shape: (typeof SHAPES)[number];
  scrollProgress: import("framer-motion").MotionValue<number>;
}) {
  const yOffset = useTransform(scrollProgress, [0, 1], [0, -300 * shape.speed]);
  const rotate = useTransform(scrollProgress, [0, 1], [0, shape.rotate]);
  const opacity = useTransform(scrollProgress, [0, 0.3, 0.8, 1], [0, 1, 1, 0]);

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        left: shape.cx,
        top: shape.cy,
        y: yOffset,
        rotate,
        opacity,
        willChange: "transform",
      }}
    >
      <ShapeSVG type={shape.type} size={shape.size} color={shape.color} />
    </motion.div>
  );
}

/* ── Main Parallax Wrapper ── */
type HomeParallaxScrollProps = {
  hero: React.ReactNode;
  next: React.ReactNode;
};

export default function HomeParallaxScroll({ hero, next }: HomeParallaxScrollProps) {
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const smooth = useSpring(scrollYProgress, { stiffness: 100, damping: 30, mass: 0.3 });
  
  // Use raw progress on mobile to avoid 1:1 touch scroll jitter, smooth on desktop
  const activeProgress = isMobile ? scrollYProgress : smooth;

  // Hero cinematic pull-away
  const heroScale = useTransform(activeProgress, [0, 1], [1, 0.92]);
  const heroOpacity = useTransform(activeProgress, [0, 0.6, 1], [1, 0.6, 0]);
  const heroBlur = useTransform(activeProgress, [0, 1], [0, 6]);
  const heroY = useTransform(activeProgress, [0, 1], [0, -40]);

  return (
    <div ref={containerRef} className="relative">
      {/* Sticky Hero — scales down, blurs, fades as you scroll past */}
      <motion.div
        className="sticky top-0 h-screen overflow-hidden"
        style={{
          scale: heroScale,
          opacity: heroOpacity,
          y: heroY,
          filter: useTransform(heroBlur, (v) => isMobile ? "none" : `blur(${v}px)`),
          willChange: "transform, opacity",
        }}
      >
        {hero}
      </motion.div>

      {/* Floating parallax shapes — live between hero & next section */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-[5]">
        {SHAPES.map((shape, i) => (
          <FloatingShape key={i} shape={shape} scrollProgress={activeProgress} />
        ))}
      </div>

      {/* Next section slides up over the pinned hero */}
      <div className="relative z-10 bg-white">{next}</div>
    </div>
  );
}
