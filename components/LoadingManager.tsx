"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import DinoLoading from "./ui/DinoLoading";

export default function LoadingManager({ children }: { children: React.ReactNode }) {
  const [isDinoDone, setIsDinoDone] = useState(false);
  const [isWindowLoaded, setIsWindowLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (document.readyState === "complete") {
      setIsWindowLoaded(true);
    } else {
      const handleLoad = () => setIsWindowLoaded(true);
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  useEffect(() => {
    // Immediate reveal once Dino hits 100% AND window is loaded
    if (isDinoDone && isWindowLoaded) {
      setIsLoading(false);
    }
  }, [isDinoDone, isWindowLoaded]);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="loading"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[100]"
          >
            <DinoLoading onComplete={() => setIsDinoDone(true)} />
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: isLoading ? 0 : 1, y: isLoading ? 10 : 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      >
        {/*
          By changing the key when loading finishes, we force React to remount the entire children tree.
          This guarantees all Framer Motion entrance animations (like in HeroSection) restart perfectly
          in sync with the loading screen fading out.
        */}
        <div key={isLoading ? "loading" : "ready"}>
          {children}
        </div>
      </motion.div>
    </>
  );
}
