"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const isHoveringInteractive = useRef(false);
  const isHoveringWhoAmI = useRef(false);
  const rafId = useRef<number>(0);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    const pill = pillRef.current;
    if (!dot || !ring || !pill) return;

    const onMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;

      dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
      
      // If pill is active, it follows exactly with the dot
      if (isHoveringWhoAmI.current) {
         pill.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
      }
    };

    const updateCursorState = () => {
      if (isHoveringWhoAmI.current) {
        // Pill mode
        ring.style.opacity = "0";
        dot.style.opacity = "0";
        pill.style.opacity = "1";
        pill.style.transform = `translate(${mouse.current.x}px, ${mouse.current.y}px) translate(-50%, -50%) scale(1)`;
      } else if (isHoveringInteractive.current) {
        // Interactive mode (links/buttons)
        pill.style.opacity = "0";
        pill.style.transform = `translate(${mouse.current.x}px, ${mouse.current.y}px) translate(-50%, -50%) scale(0.8)`;
        
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
        pill.style.transform = `translate(${mouse.current.x}px, ${mouse.current.y}px) translate(-50%, -50%) scale(0.8)`;
        
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
        pill.style.transform = `translate(${mouse.current.x}px, ${mouse.current.y}px) translate(-50%, -50%) scale(0.95)`;
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
         ringPos.current.x += (mouse.current.x - ringPos.current.x) * 0.15;
         ringPos.current.y += (mouse.current.y - ringPos.current.y) * 0.15;
         ring.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px) translate(-50%, -50%)`;
      }
      rafId.current = requestAnimationFrame(animate);
    };

    const addInteractiveListeners = () => {
      // Standard interactives
      const interactives = document.querySelectorAll(
        'a, button, [role="button"], input, textarea, select, [data-cursor-hover]'
      );
      interactives.forEach((el) => {
        el.addEventListener("mouseenter", onMouseEnterInteractive);
        el.addEventListener("mouseleave", onMouseLeaveInteractive);
      });

      // Special Who Am I section
      const whoAmISections = document.querySelectorAll('[data-cursor="who-am-i"]');
      whoAmISections.forEach((el) => {
        el.addEventListener("mouseenter", onMouseEnterWhoAmI);
        el.addEventListener("mouseleave", onMouseLeaveWhoAmI);
      });

      return { interactives, whoAmISections };
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);

    const listeners = addInteractiveListeners();
    rafId.current = requestAnimationFrame(animate);

    const observer = new MutationObserver(() => {
      // Re-attach if DOM changes
      const interactives = document.querySelectorAll(
        'a, button, [role="button"], input, textarea, select, [data-cursor-hover]'
      );
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnterInteractive);
        el.removeEventListener("mouseleave", onMouseLeaveInteractive);
        el.addEventListener("mouseenter", onMouseEnterInteractive);
        el.addEventListener("mouseleave", onMouseLeaveInteractive);
      });

      const whoAmISections = document.querySelectorAll('[data-cursor="who-am-i"]');
      whoAmISections.forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnterWhoAmI);
        el.removeEventListener("mouseleave", onMouseLeaveWhoAmI);
        el.addEventListener("mouseenter", onMouseEnterWhoAmI);
        el.addEventListener("mouseleave", onMouseLeaveWhoAmI);
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      cancelAnimationFrame(rafId.current);
      observer.disconnect();
      
      listeners.interactives.forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnterInteractive);
        el.removeEventListener("mouseleave", onMouseLeaveInteractive);
      });
      listeners.whoAmISections.forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnterWhoAmI);
        el.removeEventListener("mouseleave", onMouseLeaveWhoAmI);
      });
    };
  }, []);

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
          transition: "width 0.2s ease, height 0.2s ease, background 0.2s ease, opacity 0.2s ease",
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
            "width 0.3s ease, height 0.3s ease, border-color 0.3s ease, opacity 0.3s ease, border-width 0.3s ease",
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
