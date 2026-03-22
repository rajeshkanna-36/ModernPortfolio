"use client";

import { motion } from "framer-motion";

export default function Footer() {
  const giantText = "Rajesh Kanna".split("");

  return (
    <footer className="relative bg-zinc-950 text-white pt-24 pb-0 overflow-hidden min-h-screen flex flex-col justify-between border-t border-zinc-900/50">
      
      {/* Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[300px] opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-white to-transparent blur-3xl rounded-full mix-blend-overlay" />
      </div>

      {/* Top Links Section */}
      <div className="max-w-[90rem] mx-auto w-full px-8 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 relative z-20">
        
        {/* Left Hook with Creative Badge */}
        <div className="md:col-span-6 lg:col-span-7 flex flex-col justify-between relative">
          
          {/* Spinning Availability Badge */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
            className="absolute -top-12 -left-4 md:-left-8 w-32 h-32 md:w-40 md:h-40 pointer-events-none opacity-30 select-none hidden md:block"
          >
            <svg viewBox="0 0 100 100" width="100%" height="100%">
              <defs>
                <path id="circlePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
              </defs>
              <text fontSize="11" fontWeight="bold" fill="currentColor" letterSpacing="2.5">
                <textPath href="#circlePath">
                  · OPEN TO WORK · AVAILABLE QUICKLY 
                </textPath>
              </text>
            </svg>
          </motion.div>

          <div className="relative z-10 pt-4 md:pt-16 md:pl-8">
            <h2 className="text-2xl md:text-4xl font-semibold tracking-tight text-white mb-4">
              Let's build something <br className="hidden md:block"/> extraordinary.
            </h2>
            <div className="flex items-center gap-3 mb-4">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <p className="text-emerald-400/90 text-sm font-medium tracking-wide">
                Currently available for freelance
              </p>
            </div>
            <p className="text-zinc-500 text-sm md:text-base max-w-sm">
              Reach out if you're looking for a developer, have a question, or just want to connect.
            </p>
          </div>
          <a href="mailto:hello@example.com" className="md:pl-8 inline-block mt-12 md:mt-24 text-lg md:text-xl font-medium text-white hover:text-zinc-300 transition-colors w-max relative group">
            hello@rajeshkanna.com
            <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full"></span>
          </a>
        </div>

        {/* Links Grid with Magnetic Hover Physics */}
        <div className="md:col-span-6 lg:col-span-5 grid grid-cols-2 gap-4 text-[13px] md:text-sm font-medium pt-8 md:pt-16">
          <div className="flex flex-col space-y-4">
            <span className="text-zinc-600 uppercase tracking-[0.2em] text-xs mb-2 font-bold">Navigation</span>
            {['Home', 'About', 'Work', 'Experience', 'Contact'].map((link) => (
              <motion.a 
                key={link} 
                href="#" 
                whileHover={{ x: 8, color: "white" }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="text-zinc-400 hover:text-white transition-colors w-max"
              >
                {link}
              </motion.a>
            ))}
          </div>
          <div className="flex flex-col space-y-4">
            <span className="text-zinc-600 uppercase tracking-[0.2em] text-xs mb-2 font-bold">Socials</span>
            {['GitHub', 'LinkedIn', 'Twitter', 'Instagram'].map((network) => (
              <motion.a 
                key={network} 
                href="#" 
                whileHover={{ x: 8, color: "white" }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="text-zinc-400 hover:text-white transition-colors flex items-center gap-2 w-max group"
              >
                {network} 
                <motion.span 
                  initial={{ opacity: 0, x: -5, y: 5 }} 
                  whileHover={{ opacity: 1, x: 0, y: 0 }}
                  className="inherit"
                >
                  ↗
                </motion.span>
              </motion.a>
            ))}
          </div>
        </div>

      </div>

      {/* Interactive Rippling Huge Typography */}
      <div className="w-full flex justify-center items-end mt-24 relative z-10 select-none overflow-hidden">
        <h1 
          className="font-black tracking-[-0.08em] uppercase whitespace-nowrap text-center bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-800/20 flex"
          style={{ 
            fontSize: "17.5vw", 
            lineHeight: "0.75", 
            marginBottom: "-4.5vw" 
          }}
        >
          {giantText.map((char, i) => (
            <motion.span
              key={i}
              whileHover={{ 
                y: -30, 
                scale: 1.1,
                rotate: (i % 2 === 0 ? 1 : -1) * 3, // Alternate tilt
                transition: { type: "spring", stiffness: 300, damping: 10 }
              }}
              className="inline-block relative hover:text-white transition-colors duration-200"
              style={{ paddingBottom: '2vw' }} // Give the hover physics breathing room at the bottom crop
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </h1>
      </div>

    </footer>
  );
}
