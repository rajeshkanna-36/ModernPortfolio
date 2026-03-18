"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

const NAV_ITEMS = ["Work", "About", "Contact"] as const;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
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
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-white/80 backdrop-blur-md border-b border-zinc-200" : "bg-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 h-16 sm:h-20 flex flex-col justify-center">
        {/* Top Boundary Line - Always visible, minimalist detail */}
        <div className="absolute top-0 left-4 right-4 sm:left-6 sm:right-6 h-px bg-zinc-200" />

        <div className="flex items-center justify-between w-full relative">
          {/* Logo / Brand */}
          <Link href="/" className="group flex items-center gap-3">
             {/* Geometric Icon */}
            <motion.div 
              whileHover={{ rotate: 90, scale: 1.1 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-8 h-8 flex items-center justify-center border border-zinc-900 overflow-hidden group-hover:bg-zinc-900 transition-colors duration-300"
            >
               <div className="w-4 h-4 border border-zinc-900 group-hover:border-white transition-colors duration-300 transform rotate-45" />
            </motion.div>
            <span className="font-bold text-sm tracking-[0.2em] uppercase text-zinc-900">
              Rajesh Kanna
            </span>
          </Link>

          {/* Center Line Decoration */}
          <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-[1px] bg-zinc-300" />

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <div key={item} className="relative group py-1">
                <Link
                  href={`#${item.toLowerCase()}`}
                  className="text-xs uppercase tracking-widest font-medium text-zinc-600 group-hover:text-zinc-900 transition-colors duration-300"
                >
                  {item}
                </Link>
                {/* Underline geometric slide animation */}
                <motion.span 
                  className="absolute bottom-0 left-0 w-full h-[1px] bg-zinc-900 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-[0.16,1,0.3,1]"
                />
              </div>
            ))}
          </nav>

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="relative h-10 w-10 grid place-items-center text-zinc-900"
              data-cursor-hover
              onClick={() => setOpen((v) => !v)}
            >
              <span className="sr-only">{open ? "Close" : "Menu"}</span>
              <span
                className="absolute block h-px w-6 bg-current transition-transform duration-300 ease-[0.16,1,0.3,1]"
                style={{
                  transform: open
                    ? "translateY(0px) rotate(45deg)"
                    : "translateY(-6px) rotate(0deg)",
                  opacity: 0.8,
                }}
              />
              <span
                className="absolute block h-px w-6 bg-current transition-opacity duration-200"
                style={{ opacity: open ? 0 : 0.55 }}
              />
              <span
                className="absolute block h-px w-6 bg-current transition-transform duration-300 ease-[0.16,1,0.3,1]"
                style={{
                  transform: open
                    ? "translateY(0px) rotate(-45deg)"
                    : "translateY(6px) rotate(0deg)",
                  opacity: 0.8,
                }}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Panel */}
      {open ? (
        <>
          <button
            aria-label="Close menu overlay"
            className="fixed inset-0 z-40 bg-black/10 backdrop-blur-[2px] md:hidden"
            onClick={() => setOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden absolute top-full left-0 right-0 z-50"
          >
            <div className="mx-4 mt-3 rounded-2xl border border-zinc-200 bg-white/80 backdrop-blur-md overflow-hidden">
              <div className="py-1">
                {NAV_ITEMS.map((item) => (
                  <Link
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="flex items-center justify-between px-5 py-4 text-sm uppercase tracking-widest text-zinc-800 hover:bg-black/[0.03] active:bg-black/[0.05] transition-colors"
                    onClick={() => setOpen(false)}
                    data-cursor-hover
                  >
                    <span className="font-medium">{item}</span>
                    <span className="text-zinc-400">↵</span>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      ) : null}
    </motion.header>
  );
}
