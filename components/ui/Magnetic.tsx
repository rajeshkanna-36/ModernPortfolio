"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";

type MagneticProps = {
  children: React.ReactNode;
  className?: string;
  strength?: number; // px
};

export default function Magnetic({ children, className, strength = 18 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 18, mass: 0.2 });
  const sy = useSpring(y, { stiffness: 260, damping: 18, mass: 0.2 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      const nx = dx / (r.width / 2 || 1);
      const ny = dy / (r.height / 2 || 1);
      x.set(nx * strength);
      y.set(ny * strength);
    };
    const onLeave = () => {
      x.set(0);
      y.set(0);
    };

    el.addEventListener("pointermove", onMove, { passive: true });
    el.addEventListener("pointerleave", onLeave);

    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [strength, x, y]);

  return (
    <motion.div ref={ref} className={className} style={{ x: sx, y: sy }}>
      {children}
    </motion.div>
  );
}

