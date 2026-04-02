"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ScrollTextReveal from "./ScrollTextReveal";
import InfiniteMarquee from "./InfiniteMarquee";
import FluidButton from "./ui/FluidButton";
import InstagramPostCard from "./ui/InstagramPostCard";
import FloatingDevIcons from "./ui/FloatingDevIcons";

const InlineIcon = ({ type }: { type: "pencil" | "cursor" | "toggle" | "sparkle" }) => {
  switch (type) {
    case "pencil":
      return (
        <span className="inline-block align-middle mx-1.5 -translate-y-1.5 rotate-[15deg]">
          <svg width="22" height="38" viewBox="0 0 24 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-sm">
            {/* Eraser */}
            <path d="M4 8C4 5.79 5.79 4 8 4h8c2.21 0 4 1.79 4 4v2H4V8z" fill="#3F3F46" />
            {/* Body */}
            <path d="M4 10h16v16L12 36 4 26V10z" fill="white" stroke="#E4E4E7" strokeWidth="1.5" />
            {/* Blue band */}
            <rect x="4" y="10" width="16" height="3" fill="#3B82F6" />
            {/* Wood lines */}
            <line x1="9" y1="13" x2="9" y2="28" stroke="#E4E4E7" strokeWidth="1" />
            <line x1="15" y1="13" x2="15" y2="28" stroke="#E4E4E7" strokeWidth="1" />
            {/* Graphite tip */}
            <path d="M10 32l2 4 2-4h-4z" fill="#18181B" />
          </svg>
        </span>
      );
    case "cursor":
      return (
        <span className="inline-flex items-center justify-center w-11 h-11 bg-white rounded-xl shadow-[0_3px_12px_rgba(0,0,0,0.08)] border border-zinc-100 align-middle mx-1.5 -translate-y-1 -rotate-6">
          <span className="relative w-full h-full block">
            <span className="absolute top-2 left-2 w-4 h-4 bg-blue-500 rounded-[4px] block" />
            <svg className="absolute bottom-1.5 right-1.5 w-5 h-5 text-black drop-shadow-sm rotate-[15deg]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M7 2l12 11.2-5.8.5 3.3 7.3-2.2.9-3.2-7.4-4.4 5z"/>
            </svg>
          </span>
        </span>
      );
    case "toggle":
      return (
        <span className="inline-flex items-center justify-center w-[3rem] h-[1.75rem] bg-white rounded-full shadow-[0_3px_12px_rgba(0,0,0,0.08)] border border-zinc-100 align-middle mx-1.5 -translate-y-0.5 rotate-3 p-1">
          <span className="w-full h-full bg-blue-500 rounded-full flex items-center px-1">
            <span className="w-4 h-4 bg-white rounded-full shadow-sm ml-auto block" />
          </span>
        </span>
      );
    case "sparkle":
      return (
        <span className="inline-flex items-center justify-center w-10 h-10 bg-white rounded-2xl shadow-[0_3px_12px_rgba(0,0,0,0.08)] border border-zinc-100 align-middle mx-1.5 -translate-y-1 rotate-[8deg]">
          <svg viewBox="0 0 24 24" className="w-[50%] h-[50%] text-orange-500" fill="currentColor">
            <path d="M12 0l1.5 8.5 8.5 1.5-8.5 1.5-1.5 8.5-1.5-8.5-8.5-1.5 8.5-1.5z"/>
          </svg>
        </span>
      );
  }
};

export default function WhoAmI() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start 0.4"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [80, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.96, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.4, 1], [0, 0.6, 1]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center px-6 py-28 md:py-44 text-zinc-950 bg-white"
      data-cursor="who-am-i"
    >
      {/* subtle mesh texture (dark on light) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.2) 1px, transparent 1px)",
          backgroundSize: "3px 3px",
        }}
      />

      <motion.div
        className="max-w-7xl mx-auto w-full relative z-10"
        style={{ y, scale, opacity }}
      >
        <div className="mb-12 relative grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-12 lg:gap-20 items-center">
          <motion.div 
            className="flex justify-center lg:justify-start"
            initial={{ opacity: 0, x: -80, rotate: -5 }}
            whileInView={{ opacity: 1, x: 0, rotate: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          >
             <InstagramPostCard />
          </motion.div>

          <div className="relative">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0 }}
              style={{
                maxWidth: "min(350px, 100vw)",
                overflow: "hidden",
                maskImage: "linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%)"
              }}
            >
              <InfiniteMarquee text="WHO I AM!" repeat={3} speed={4} className="relative mb-10 text-orange-500" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            >
              <ScrollTextReveal
                elements={[
                  "Crafting meaningful experiences through thoughtful design ",
                  <InlineIcon key="1" type="pencil" />,
                  " & creative problem-solving ",
                  <InlineIcon key="2" type="cursor" />,
                  ". I transform complex challenges into elegant, user-centered solutions that seamlessly blend form, function ",
                  <InlineIcon key="3" type="toggle" />,
                  ", and delight ",
                  <InlineIcon key="4" type="sparkle" />,
                  "."
                ]}
                className="relative text-zinc-950 z-10"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
            >
              <FluidButton text="Get in Touch" className="mt-8 relative z-10" />
            </motion.div>
            
            <FloatingDevIcons />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
