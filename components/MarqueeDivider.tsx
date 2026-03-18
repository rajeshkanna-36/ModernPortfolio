"use client";

import { motion } from "framer-motion";

const Star8 = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
  >
    <path d="M12 0l1.5 8.5 8.5 1.5-8.5 1.5-1.5 8.5-1.5-8.5-8.5-1.5 8.5-1.5z" />
  </svg>
);

export default function MarqueeDivider() {
  const items = [
    { text: "Full Stack", highlight: "Development" },
    { text: "DevOps", highlight: "Engineering" },
    { text: "Cloud", highlight: "Architecture" },
    { text: "CI/CD", highlight: "Pipelines" },
    { text: "Scalable", highlight: "Systems" },
  ];

  // Repeat items for seamless loop
  const repeatedItems = [...items, ...items, ...items, ...items];

  return (
    <div className="bg-zinc-950 py-5 border-y border-zinc-800/80 overflow-hidden whitespace-nowrap select-none relative z-20">
      <motion.div
        className="inline-flex items-center"
        animate={{ x: [0, -1200] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 35,
            ease: "linear",
          },
        }}
      >
        {repeatedItems.map((item, idx) => (
          <div key={idx} className="flex items-center mx-10">
            <span className="text-2xl md:text-3xl font-medium tracking-tight">
              <span className="text-[#f97316]">{item.text}</span>
              <span className="text-zinc-100 ml-2">{item.highlight}</span>
            </span>
            <Star8 className="ml-20 w-5 h-5 text-[#f97316]" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
