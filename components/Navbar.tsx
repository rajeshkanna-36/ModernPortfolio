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
                <div className="hidden md:flex items-center gap-6 pl-2 pr-1 h-full">
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
                <div className="hidden md:flex items-center gap-1 pl-2 pr-4 py-2 h-full">
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
          {/* Mobile Geometric Burger Icon */}
          <motion.div layout className="flex md:hidden items-center pr-2 pl-2 border-l border-zinc-200/50 h-5 my-1.5 overflow-hidden">
            <button 
              onClick={() => setOpen(!open)}
              className="relative w-8 h-8 flex items-center justify-center text-zinc-900 focus:outline-none"
            >
              <motion.span 
                 animate={{ rotate: open ? 45 : 0, y: open ? 0 : -3 }}
                 transition={{ type: "spring", bounce: 0.3 }}
                 className="absolute w-5 h-[2px] bg-current rounded-full"
              />
              <motion.span 
                 animate={{ rotate: open ? -45 : 0, y: open ? 0 : 3 }}
                 transition={{ type: "spring", bounce: 0.3 }}
                 className="absolute w-5 h-[2px] bg-current rounded-full"
              />
            </button>
          </motion.div>
        </motion.nav>
      </div>

      {/* Expanded Menu Dropdown (When clicked on the burger) */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-zinc-900/10 backdrop-blur-sm md:hidden"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -15, scale: 0.98, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -15, scale: 0.98, filter: "blur(4px)" }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="fixed z-50 top-24 left-4 right-4 md:hidden bg-white/90 backdrop-blur-2xl border border-white/40 shadow-[0_24px_48px_rgba(0,0,0,0.06)] rounded-3xl overflow-hidden p-2"
            >
              <div className="flex flex-col bg-zinc-50/80 rounded-2xl p-4 border border-zinc-100/50">
                <div className="flex justify-between items-center mb-6 px-2">
                  <span className="text-[12px] font-medium tracking-widest uppercase text-zinc-400">
                    Menu
                  </span>
                </div>
                {NAV_ITEMS.map((item) => (
                  <Link
                    key={item}
                    href={`#${item.toLowerCase().replace(' ', '-')}`}
                    className="group flex items-center justify-between px-2 py-4 border-b border-zinc-200/60 last:border-0"
                    onClick={() => setOpen(false)}
                  >
                    <span className="text-3xl font-semibold tracking-tighter text-zinc-900">{item}</span>
                    <motion.div 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                      className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-zinc-400 group-hover:text-[#f97316] group-hover:shadow transition-all"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </motion.div>
                  </Link>
                ))}
                
                <button 
                   className="group flex items-center justify-between px-2 py-4 mt-2 border-t border-zinc-200/60 w-full"
                   onClick={() => setOpen(false)}
                >
                  <span className="text-3xl font-semibold tracking-tighter text-zinc-900">Resume</span>
                  <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-zinc-400 group-hover:text-[#f97316] group-hover:shadow transition-all">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                       <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                       <polyline points="7 10 12 15 17 10"></polyline>
                       <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                  </div>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
