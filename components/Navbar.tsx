"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

const NAV_ITEMS = ["Work", "About Me"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Collapse when scrolled past 100px
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check immediately
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", bounce: 0.2, duration: 0.8 }}
          layout
          className="bg-white/95 backdrop-blur-md shadow-[0_4px_24px_rgba(0,0,0,0.06)] border border-zinc-200/80 rounded-full flex items-center p-1.5 overflow-hidden"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* Always Visible: Symbol & Name */}
          <motion.div layout className="flex items-center gap-3 pl-1 pr-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-10 h-10 rounded-full bg-[#f97316] flex items-center justify-center flex-shrink-0">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinejoin="round">
                <rect x="4" y="4" width="16" height="16" rx="1" transform="rotate(45 12 12)" />
              </svg>
            </div>
            <span style={{ fontFamily: "var(--font-geist-mono), monospace" }} className="text-zinc-950 font-medium tracking-[-0.02em] text-[14px] whitespace-nowrap">
              Rajesh Kanna
            </span>
          </motion.div>

          {/* Links Section (Expanded) */}
          {/* Links Section — visible when NOT scrolled, OR when hovered while scrolled */}
          <AnimatePresence initial={false}>
            {(!scrolled || hovered) && (
              <motion.div
                key="full-menu"
                layout
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center whitespace-nowrap overflow-hidden"
              >
                <div className="flex items-center gap-6 pl-2 pr-1 h-full">
                  {NAV_ITEMS.map((item) => (
                    <Link
                      key={item}
                      href={`#${item.toLowerCase().replace(' ', '-')}`}
                      className="text-[14px] font-semibold text-zinc-900 hover:text-zinc-500 transition-colors whitespace-nowrap"
                    >
                      {item}
                    </Link>
                  ))}
                  <button className="px-5 py-2 rounded-full border border-zinc-200 text-[14px] font-semibold text-zinc-900 hover:bg-zinc-50 transition-colors whitespace-nowrap ml-2">
                    Resume
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Animated Loading Dots (Collapsed & not hovered) */}
          <AnimatePresence initial={false}>
            {scrolled && !hovered && (
              <motion.div
                key="collapsed-dots"
                layout
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center whitespace-nowrap overflow-hidden"
              >
                <div className="flex items-center gap-1 pl-2 pr-4 py-2 h-full">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-[5px] h-[5px] rounded-full bg-zinc-400"
                      animate={{ 
                        y: [0, -4, 0],
                        opacity: [0.4, 1, 0.4]
                      }}
                      transition={{
                        duration: 1.2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 0.15,
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      </div>

      {/* Expanded Menu Dropdown (When clicked on the ellipsis) */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/5 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="fixed z-50 top-24 left-1/2 -translate-x-1/2 w-[90%] max-w-[320px] bg-white border border-zinc-200 rounded-3xl shadow-xl overflow-hidden p-3"
            >
              <div className="flex flex-col gap-1">
                {NAV_ITEMS.map((item) => (
                  <Link
                    key={item}
                    href={`#${item.toLowerCase().replace(' ', '-')}`}
                    className="flex items-center px-4 py-3 text-[15px] font-semibold text-zinc-900 hover:bg-zinc-100 rounded-xl transition-colors"
                    onClick={() => setOpen(false)}
                  >
                    {item}
                  </Link>
                ))}
                <div className="h-px bg-zinc-100 my-1 w-full" />
                <button className="flex items-center px-4 py-3 text-[15px] font-semibold text-zinc-900 hover:bg-zinc-100 rounded-xl transition-colors text-left w-full">
                  Resume
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
