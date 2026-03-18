"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type HomeInteractionsProps = {
  /** Adds/removes home-only body classes + sets CSS vars for parallax/spotlight. */
  children?: React.ReactNode;
};

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

export default function HomeInteractions({ children }: HomeInteractionsProps) {
  const rafRef = useRef<number | null>(null);
  const pendingRef = useRef<{ x: number; y: number } | null>(null);
  const [blueprint, setBlueprint] = useState(false);

  const keySeq = useMemo(() => ["b", "l", "u", "e"], []);
  const keyIndexRef = useRef(0);

  useEffect(() => {
    const body = document.body;
    body.classList.add("home-interactive");

    const apply = (x: number, y: number) => {
      const w = window.innerWidth || 1;
      const h = window.innerHeight || 1;
      const nx = clamp((x / w) * 2 - 1, -1, 1);
      const ny = clamp((y / h) * 2 - 1, -1, 1);

      // Spotlight center (px)
      document.documentElement.style.setProperty("--home-mx", `${x}px`);
      document.documentElement.style.setProperty("--home-my", `${y}px`);

      // Parallax offsets (px)
      document.documentElement.style.setProperty("--home-px", `${nx * 14}px`);
      document.documentElement.style.setProperty("--home-py", `${ny * 12}px`);
    };

    const onMove = (e: MouseEvent) => {
      pendingRef.current = { x: e.clientX, y: e.clientY };
      if (rafRef.current != null) return;
      rafRef.current = window.requestAnimationFrame(() => {
        rafRef.current = null;
        const p = pendingRef.current;
        if (p) apply(p.x, p.y);
      });
    };

    const onKeyDown = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();

      // Hidden "BLUE" sequence toggles blueprint mode.
      if (k === keySeq[keyIndexRef.current]) {
        keyIndexRef.current += 1;
        if (keyIndexRef.current >= keySeq.length) {
          keyIndexRef.current = 0;
          setBlueprint((v) => !v);
        }
      } else {
        keyIndexRef.current = 0;
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("keydown", onKeyDown);

    // Seed centered values so first paint looks intentional.
    apply(window.innerWidth / 2, window.innerHeight / 2);

    return () => {
      body.classList.remove("home-interactive");
      body.classList.remove("home-blueprint");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("keydown", onKeyDown);
      if (rafRef.current != null) window.cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      pendingRef.current = null;
    };
  }, [keySeq]);

  useEffect(() => {
    document.body.classList.toggle("home-blueprint", blueprint);
  }, [blueprint]);

  return (
    <>
      {children}

      <style jsx global>{`
        /* Home-only interaction layer (mounted on / only). */
        body.home-interactive {
          --home-grid-opacity: 0.03;
          --home-shape-opacity: 0.05;
        }

        body.home-blueprint {
          --home-grid-opacity: 0.08;
          --home-shape-opacity: 0.12;
        }

        /* Make blueprint mode feel “crazy” but still minimal. */
        body.home-blueprint main * {
          text-shadow: 0 0 0 rgba(0, 0, 0, 0);
        }
      `}</style>
    </>
  );
}

