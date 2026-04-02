"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const isHoveringInteractive = useRef(false);
  const isHoveringWhoAmI = useRef(false);
  const rafId = useRef<number>(0);

  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    // Detect if this is a coarse pointer (touchscreen like mobile/tablet)
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsDesktop(false);
      return;
    }

    const dot = dotRef.current;
    const ring = ringRef.current;
    const pill = pillRef.current;
    if (!dot || !ring || !pill) return;

    const onMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;

      dot.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      
      // If pill is active, it follows exactly with the dot
      if (isHoveringWhoAmI.current) {
         pill.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }
    };

    const updateCursorState = () => {
      if (isHoveringWhoAmI.current) {
        // Pill mode
        ring.style.opacity = "0";
        dot.style.opacity = "0";
        pill.style.opacity = "1";
        pill.style.transform = `translate3d(${mouse.current.x}px, ${mouse.current.y}px, 0) translate(-50%, -50%) scale(1)`;
      } else if (isHoveringInteractive.current) {
        // Interactive mode (links/buttons)
        pill.style.opacity = "0";
        pill.style.transform = `translate3d(${mouse.current.x}px, ${mouse.current.y}px, 0) translate(-50%, -50%) scale(0.8)`;
        
        ring.style.opacity = "1";
        ring.style.width = "56px";
        ring.style.height = "56px";
        ring.style.borderColor = "#f97316";
        ring.style.borderWidth = "3px";
        
        dot.style.opacity = "1";
        dot.style.width = "5px";
        dot.style.height = "5px";
        dot.style.background = "#f97316";
      } else {
        // Default mode
        pill.style.opacity = "0";
        pill.style.transform = `translate3d(${mouse.current.x}px, ${mouse.current.y}px, 0) translate(-50%, -50%) scale(0.8)`;
        
        ring.style.opacity = "0.8";
        ring.style.width = "42px";
        ring.style.height = "42px";
        ring.style.borderColor = "rgba(0, 0, 0, 0.7)";
        ring.style.borderWidth = "2.5px";
        
        dot.style.opacity = "1";
        dot.style.width = "10px";
        dot.style.height = "10px";
        dot.style.background = "#000000";
      }
    };

    const onMouseDown = () => {
      if (!isHoveringWhoAmI.current) {
        ring.style.width = "28px";
        ring.style.height = "28px";
        dot.style.width = "6px";
        dot.style.height = "6px";
      } else {
        pill.style.transform = `translate3d(${mouse.current.x}px, ${mouse.current.y}px, 0) translate(-50%, -50%) scale(0.95)`;
      }
    };

    const onMouseUp = () => {
       updateCursorState();
    };

    // Generic interactive hovering (links, buttons)
    const onMouseEnterInteractive = () => {
      isHoveringInteractive.current = true;
      updateCursorState();
    };

    const onMouseLeaveInteractive = () => {
      isHoveringInteractive.current = false;
      updateCursorState();
    };

    // Who Am I section hovering
    const onMouseEnterWhoAmI = () => {
      isHoveringWhoAmI.current = true;
      updateCursorState();
    };

    const onMouseLeaveWhoAmI = () => {
      isHoveringWhoAmI.current = false;
      updateCursorState();
    };

    // Ring follows with smooth lag
    const animate = () => {
      if (!isHoveringWhoAmI.current) {
         ringPos.current.x += (mouse.current.x - ringPos.current.x) * 0.22;
         ringPos.current.y += (mouse.current.y - ringPos.current.y) * 0.22;
         ring.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`;
      }
      rafId.current = requestAnimationFrame(animate);
    };

    // Use event delegation instead of attaching listeners to every element.
    // This is massively more performant — one listener on body handles everything.
    const onMouseOver = (e: Event) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      const interactive = target.closest('a, button, [role="button"], input, textarea, select, [data-cursor-hover]');
      const whoAmI = target.closest('[data-cursor="who-am-i"]');
      
      if (whoAmI) {
        if (!isHoveringWhoAmI.current) {
          isHoveringWhoAmI.current = true;
          updateCursorState();
        }
      } else if (interactive) {
        if (!isHoveringInteractive.current) {
          isHoveringInteractive.current = true;
          isHoveringWhoAmI.current = false;
          updateCursorState();
        }
      }
    };

    const onMouseOut = (e: Event) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      const relatedTarget = (e as MouseEvent).relatedTarget as HTMLElement | null;
      
      const interactive = target.closest('a, button, [role="button"], input, textarea, select, [data-cursor-hover]');
      const whoAmI = target.closest('[data-cursor="who-am-i"]');

      if (whoAmI && (!relatedTarget || !relatedTarget.closest('[data-cursor="who-am-i"]'))) {
        isHoveringWhoAmI.current = false;
        updateCursorState();
      } else if (interactive && (!relatedTarget || !relatedTarget.closest('a, button, [role="button"], input, textarea, select, [data-cursor-hover]'))) {
        isHoveringInteractive.current = false;
        updateCursorState();
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    document.body.addEventListener("mouseover", onMouseOver, { passive: true });
    document.body.addEventListener("mouseout", onMouseOut, { passive: true });

    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.body.removeEventListener("mouseover", onMouseOver);
      document.body.removeEventListener("mouseout", onMouseOut);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  if (!isDesktop) return null;

  return (
    <>
      {/* Pill (Who Am I) */}
      <div
        ref={pillRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          padding: "12px 24px",
          borderRadius: "999px",
          background: "#f97316", // Orange theme
          color: "#ffffff",
          fontSize: "13px",
          fontWeight: 600,
          letterSpacing: "0.1em",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
          zIndex: 99999,
          opacity: 0,
          transform: "translate(-50%, -50%) scale(0.8)",
          transition: "opacity 0.25s cubic-bezier(0.16, 1, 0.3, 1), transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
          willChange: "transform, opacity",
          whiteSpace: "nowrap",
          boxShadow: "0 10px 30px rgba(249, 115, 22, 0.2)",
        }}
      >
        WHO AM I
      </div>

      {/* Dot (center) */}
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "10px",
          height: "10px",
          borderRadius: "50%",
          background: "#000000",
          pointerEvents: "none",
          zIndex: 99999,
          transition: "width 0.25s cubic-bezier(0.16, 1, 0.3, 1), height 0.25s cubic-bezier(0.16, 1, 0.3, 1), background 0.25s ease, opacity 0.25s ease",
          willChange: "transform",
        }}
      />
      {/* Ring (outer) */}
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "42px",
          height: "42px",
          borderRadius: "50%",
          border: "2.5px solid rgba(0, 0, 0, 0.7)",
          pointerEvents: "none",
          zIndex: 99998,
          opacity: 0.8,
          transition:
            "width 0.3s cubic-bezier(0.16, 1, 0.3, 1), height 0.3s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease, opacity 0.3s ease, border-width 0.3s ease",
          willChange: "transform",
        }}
      />
      
      {/* Hide default cursor globally */}
      <style jsx global>{`
        @media (pointer: fine) {
          * {
             cursor: none !important;
          }
        }
      `}</style>
    </>
  );
}
