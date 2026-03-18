"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

type ScrambleTextProps = {
  text: string;
  className?: string;
  /** Higher is faster. Typical: 24–40 */
  fps?: number;
  /** How many frames to fully resolve. Typical: 18–28 */
  resolveFrames?: number;
  /** Only scramble on hover (default true) */
  hover?: boolean;
};

export default function ScrambleText({
  text,
  className,
  fps = 30,
  resolveFrames = 22,
  hover = true,
}: ScrambleTextProps) {
  const [out, setOut] = useState(text);
  const frameRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);
  const lastRef = useRef(0);
  const runningRef = useRef(false);
  const seedRef = useRef(0x2f6e2b1);

  const target = useMemo(() => text, [text]);

  useEffect(() => {
    setOut(target);
  }, [target]);

  const tick = (t: number) => {
    if (!runningRef.current) return;
    const interval = 1000 / fps;
    if (t - lastRef.current < interval) {
      rafRef.current = requestAnimationFrame(tick);
      return;
    }
    lastRef.current = t;
    frameRef.current = (frameRef.current ?? 0) + 1;
    const f = frameRef.current;

    const progress = Math.min(1, f / resolveFrames);
    const reveal = Math.floor(target.length * progress);

    let next = "";
    // Deterministic PRNG (no Math.random) to satisfy React purity lint rules.
    let s = seedRef.current ^ ((f * 2654435761) >>> 0);
    for (let i = 0; i < target.length; i += 1) {
      if (i < reveal) next += target[i];
      else if (target[i] === " ") next += " ";
      else {
        // LCG step
        s = (s * 1664525 + 1013904223) >>> 0;
        next += CHARS[s % CHARS.length];
      }
    }
    seedRef.current = s >>> 0;
    setOut(next);

    if (progress >= 1) {
      runningRef.current = false;
      setOut(target);
      return;
    }

    rafRef.current = requestAnimationFrame(tick);
  };

  const start = () => {
    if (runningRef.current) return;
    runningRef.current = true;
    frameRef.current = 0;
    lastRef.current = 0;
    seedRef.current = (seedRef.current + 0x9e3779b9) >>> 0;
    rafRef.current = requestAnimationFrame(tick);
  };

  useEffect(() => {
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const props = hover
    ? { onMouseEnter: start, onFocus: start }
    : { onClick: start };

  return (
    <span className={className} {...props}>
      {out}
    </span>
  );
}

