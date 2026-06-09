"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import DinoLoading from "./ui/DinoLoading";

export default function LoadingManager({ children }: { children: React.ReactNode }) {
  const [isDinoDone, setIsDinoDone] = useState(false);
  const [isWindowLoaded, setIsWindowLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Immediate reveal once Dino hits 100%
    if (isDinoDone) {
      setIsLoading(false);
    }
  }, [isDinoDone]);

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
      {children}
    </>
  );
}
