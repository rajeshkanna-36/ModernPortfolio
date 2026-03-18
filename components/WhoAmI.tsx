"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ScrollTextReveal from "./ScrollTextReveal";
import InfiniteMarquee from "./InfiniteMarquee";
import FluidButton from "./ui/FluidButton";
import InstagramPostCard from "./ui/InstagramPostCard";
import FloatingDevIcons from "./ui/FloatingDevIcons";

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
          <div className="flex justify-center lg:justify-start order-2 lg:order-1">
             <InstagramPostCard />
          </div>

          <div className="order-1 lg:order-2 relative">
            <div style={{
              maxWidth: "350px",
              overflow: "hidden",
              maskImage: "linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%)"
            }}>
              <InfiniteMarquee text="WHO I AM!" repeat={3} speed={4} className="relative mb-10 text-orange-500" />
            </div>
            <ScrollTextReveal
              text="Architecting digital elegance & scalable cloud infrastructures. I build high-performance products that bridge the gap between complex code, intuitive design, and robust deployments."
              className="relative text-zinc-950 z-10"
            />
            <FluidButton text="Get in Touch" className="mt-8 relative z-10" />
            
            <FloatingDevIcons />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
