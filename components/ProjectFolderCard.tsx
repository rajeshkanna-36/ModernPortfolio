"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface ProjectFolderCardProps {
  title: string;
  duration: string;
  season: string;
  description: string;
  role: string;
  layers: string[]; 
  layerType?: 'landscape' | 'portrait' | 'mixed';
}

export default function ProjectFolderCard({
  title,
  duration,
  season,
  description,
  role,
  layers,
  layerType = 'landscape',
}: ProjectFolderCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      className="relative w-full max-w-[300px] mx-auto mt-8 mb-16 flex flex-col cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsHovered(!isHovered)}
      animate={{ 
        scale: isHovered ? 1.02 : 1,
        rotateX: isHovered ? 2 : 0 
      }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      {/* ── IMAGE STACK OVERLAY ── */}
      <div 
        className="relative w-full aspect-[16/10] z-0 pointer-events-none"
        style={{ clipPath: "inset(-1000px -1000px 0 -1000px)" }}
      >
        {[...layers].reverse().map((layer, reversedIndex) => {
          const totalLayers = layers.length;
          const originalIndex = totalLayers - 1 - reversedIndex;
          
          // Determine if this specific layer is a portrait card
          const isPortrait = layerType === 'portrait' || (layerType === 'mixed' && originalIndex > 0);
          const layerBaseClass = isPortrait 
            ? "absolute w-[50%] aspect-[9/19] top-[-10%] left-[25%] rounded-[24px]" 
            : "absolute inset-0 rounded-[28px]";
          
          let hoverX, hoverY, hoverRotate, defaultX, defaultY, defaultRotate;

          if (layerType === 'mixed') {
            if (originalIndex === 0) {
              // The solitary landscape front card
              hoverX = 0;
              hoverY = 25; // Drops downward into the folder to reveal cards behind
              hoverRotate = -2;
              defaultX = 0;
              defaultY = 8; // Tucked perfectly down into the folder body
              defaultRotate = 0;
            } else {
              // Organic, uneven arrangement for the 3 fanning portrait cards
              const organicOffsets = [
                { hoverX: 90, hoverY: -60, hoverRotate: 18 },  // originalIndex 1 (right card)
                { hoverX: 0, hoverY: -120, hoverRotate: -6 },   // originalIndex 2 (middle card)
                { hoverX: -90, hoverY: -45, hoverRotate: -28 }  // originalIndex 3 (left deepest card)
              ];
              
              const offsetIndex = (originalIndex - 1) % organicOffsets.length;
              const config = organicOffsets[offsetIndex];
              
              hoverX = config.hoverX; 
              hoverY = config.hoverY; 
              hoverRotate = config.hoverRotate; 
              
              // Tucked state with minimal peek
              const pCount = totalLayers - 1; 
              const pMid = (pCount + 1) / 2; 
              const pOffset = pMid - originalIndex; 
              defaultX = pOffset * -15;
              defaultY = - (originalIndex * 4); // Slightly pulled up so rims peek
              defaultRotate = pOffset * -4;
            }
          } else {
            // Standard uniform fanning Math based on Framer reference
            if (originalIndex === 0) {
              // The solitary front card acts as the folder body anchor
              hoverX = 0;
              hoverY = 25; 
              hoverRotate = -2;
              defaultX = 0;
              defaultY = 8; 
              defaultRotate = 0;
            } else {
              // Only fan the layers behind it
              const pCount = totalLayers - 1; 
              const pMid = (pCount + 1) / 2; 
              const offsetFromCenter = pMid - originalIndex; 
              
              // X Spread: 40-60px per card
              hoverX = offsetFromCenter * -50;
              
              // Y Lift: Center elements lift highest (~80px), outers lift ~50px
              const liftDropoff = Math.abs(offsetFromCenter) * 15; 
              hoverY = -80 + liftDropoff;
                
              // Roation: Center is 0, outers are +/- 10 and +/- 20
              hoverRotate = offsetFromCenter * -10; 
              
              defaultX = offsetFromCenter * -8;
              defaultY = originalIndex * 6;
              defaultRotate = offsetFromCenter * -3;
            }
          }

          return (
            <motion.div
              key={originalIndex}
              className={`${layerBaseClass}`}
              initial={{ y: defaultY, x: defaultX, rotate: defaultRotate, scale: 0.95 }}
              animate={{
                y: isHovered ? hoverY : defaultY,
                x: isHovered ? hoverX : defaultX,
                rotate: isHovered ? hoverRotate : defaultRotate,
                scale: isHovered ? 0.96 : 0.95,
              }}
              transition={{ type: "spring", stiffness: 280, damping: 22, mass: 1 + (originalIndex * 0.1) }}
            >
              {/* The Inner Image Container (which actually clips the image) */}
              <div 
                className={`absolute inset-0 w-full h-full shadow-[0_4px_16px_rgba(0,0,0,0.06)] overflow-hidden ${
                  layer?.startsWith("/") 
                    ? "bg-white ring-1 ring-inset ring-black/10"
                    : layer || "bg-zinc-200"
                }`}
                style={{ borderRadius: "inherit" }}
              >
                {layer?.startsWith("/") && (() => {
                  const [imgPath, pos] = layer.split('?pos=');
                  return (
                    <img 
                      src={imgPath} 
                      alt={`mockup layer ${originalIndex}`} 
                      className="w-full h-full object-cover" 
                      style={pos ? { objectPosition: pos.replace(/_/g, " ") } : {}}
                    />
                  );
                })()}
              </div>
              
              {/* === CHEERS PROJECT DOODLES (Music / Tipping) === */}
              <AnimatePresence>
                {/* 1. Music Notes (Right Card) */}
                {originalIndex === 1 && title === "Cheers" && isHovered && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20, rotate: -15, scale: 0.5 }}
                    animate={{ opacity: 1, y: 0, rotate: 10, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15, delay: 0.1 }}
                    className="absolute -top-12 -right-8 sm:-right-12 z-[200] text-zinc-800 pointer-events-none drop-shadow-md"
                  >
                    <svg width="64" height="64" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="rotate-12 opacity-80">
                      <path d="M30 70V25L70 15V60"></path>
                      <circle cx="21" cy="70" r="9" fill="currentColor"></circle>
                      <circle cx="61" cy="60" r="9" fill="currentColor"></circle>
                      <path d="M30 40L70 30"></path>
                      <path d="M10 20L15 15" strokeWidth="3" stroke="#f97316"></path>
                      <path d="M25 5L30 10" strokeWidth="3" stroke="#f97316"></path>
                      <path d="M85 45L95 50" strokeWidth="3" stroke="#f97316"></path>
                      <circle cx="80" cy="20" r="2" fill="#f97316" stroke="none"></circle>
                    </svg>
                  </motion.div>
                )}
                {/* 2. Curved Swoosh Arrow (Left Card) */}
                {originalIndex === 3 && title === "Cheers" && isHovered && (
                  <motion.div 
                    initial={{ opacity: 0, x: 20, rotate: 30, scale: 0.5 }}
                    animate={{ opacity: 1, x: 0, rotate: -10, scale: 1 }}
                    exit={{ opacity: 0, x: 10, scale: 0.5 }}
                    transition={{ type: "spring", stiffness: 350, damping: 15, delay: 0.2 }}
                    className="absolute -top-6 -left-14 z-[200] text-[#3b82f6] pointer-events-none drop-shadow-md"
                  >
                    <svg width="40" height="40" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" className="opacity-80">
                      <path d="M20 80 C 20 40, 50 10, 80 20" />
                      <path d="M60 10 L80 20 L70 40" />
                      <circle cx="10" cy="50" r="4" fill="currentColor" stroke="none"/>
                      <circle cx="30" cy="90" r="3" fill="currentColor" stroke="none"/>
                    </svg>
                  </motion.div>
                )}
                {/* 3. Asterisk Emphasis (Middle Card) */}
                {originalIndex === 2 && title === "Cheers" && isHovered && (
                  <motion.div 
                    initial={{ opacity: 0, y: 30, rotate: 0, scale: 0.5 }}
                    animate={{ opacity: 1, y: -20, rotate: 45, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15, delay: 0.15 }}
                    className="absolute -top-12 left-1/4 z-[200] text-[#f97316] pointer-events-none drop-shadow-md"
                  >
                    <svg width="24" height="24" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" className="opacity-90">
                      <line x1="50" y1="10" x2="50" y2="90" />
                      <line x1="10" y1="50" x2="90" y2="50" />
                      <line x1="22" y1="22" x2="78" y2="78" />
                      <line x1="22" y1="78" x2="78" y2="22" />
                    </svg>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* === DREAM LINE PROJECT DOODLES (Theme Park Pod) === */}
              <AnimatePresence>
                {/* 1. Sparkles (Left Card) */}
                {originalIndex === 3 && title === "Dream Line" && isHovered && (
                  <motion.div 
                    initial={{ opacity: 0, x: 20, rotate: 20, scale: 0.5 }}
                    animate={{ opacity: 1, x: 0, rotate: -10, scale: 1 }}
                    exit={{ opacity: 0, x: 10, scale: 0.5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15, delay: 0.15 }}
                    className="absolute -top-10 -left-12 z-[200] text-zinc-800 pointer-events-none drop-shadow-md"
                  >
                    <svg width="48" height="48" viewBox="0 0 100 100" className="opacity-80">
                      <path d="M50 10 Q 50 50 10 50 Q 50 50 50 90 Q 50 50 90 50 Q 50 50 50 10 Z" fill="#3b82f6" stroke="none"></path>
                      <path d="M20 20 Q 20 30 10 30 Q 20 30 20 40 Q 20 30 30 30 Q 20 30 20 20 Z" fill="#f97316" stroke="none"></path>
                    </svg>
                  </motion.div>
                )}
                {/* 2. Abstract Dream Cloud (Middle Card) */}
                {originalIndex === 2 && title === "Dream Line" && isHovered && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20, rotate: -20, scale: 0.5 }}
                    animate={{ opacity: 1, y: -25, rotate: 5, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15, delay: 0.2 }}
                    className="absolute -top-6 right-1/4 z-[200] text-[#3b82f6] pointer-events-none drop-shadow-md"
                  >
                    <svg width="48" height="48" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" className="opacity-80">
                      <path d="M30 60 A 20 20 0 0 1 50 30 A 25 25 0 0 1 80 50 A 15 15 0 0 1 80 80 L30 80 A 15 15 0 0 1 30 60 Z" />
                      <circle cx="20" cy="85" r="4" fill="currentColor" stroke="none" />
                      <circle cx="8" cy="95" r="2.5" fill="currentColor" stroke="none" />
                    </svg>
                  </motion.div>
                )}
                {/* 3. Swirl Loop (Right Card) */}
                {originalIndex === 1 && title === "Dream Line" && isHovered && (
                  <motion.div 
                    initial={{ opacity: 0, x: -20, rotate: -40, scale: 0.5 }}
                    animate={{ opacity: 1, x: 0, rotate: 10, scale: 1 }}
                    exit={{ opacity: 0, x: -10, scale: 0.5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15, delay: 0.1 }}
                    className="absolute -top-6 -right-10 z-[200] text-zinc-900 pointer-events-none drop-shadow-md"
                  >
                    <svg width="40" height="40" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" className="opacity-80">
                      <path d="M50 20 C 80 20, 80 80, 50 80 C 30 80, 30 40, 50 40 C 65 40, 65 65, 50 65" />
                    </svg>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* === SWAYAM PROJECT DOODLES (Education) === */}
              <AnimatePresence>
                {/* 1. Lightbulb (Right Card) */}
                {originalIndex === 1 && title === "SWAYAM" && isHovered && (
                  <motion.div 
                    initial={{ opacity: 0, y: 30, rotate: 10, scale: 0.5 }}
                    animate={{ opacity: 1, y: 0, rotate: -5, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15, delay: 0.15 }}
                    className="absolute -top-16 -right-6 md:-right-10 z-[200] text-zinc-800 pointer-events-none drop-shadow-md"
                  >
                    <svg width="64" height="64" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="opacity-80">
                      <path d="M35 70 C 20 60, 20 30, 50 15 C 80 30, 80 60, 65 70"></path>
                      <path d="M35 70h30 M40 80h20 M45 90h10" fill="none" stroke="currentColor"></path>
                      <path d="M45 70v-15l5-10l5 10v15" fill="none" stroke="currentColor"></path>
                      <path d="M50 5v-10 M20 25l-5-5 M80 25l5-5" stroke="#f97316" strokeWidth="4"></path>
                    </svg>
                  </motion.div>
                )}
                {/* 2. Mortarboard/Grad Cap (Left Card) */}
                {originalIndex === 3 && title === "SWAYAM" && isHovered && (
                  <motion.div 
                    initial={{ opacity: 0, x: 20, rotate: 15, scale: 0.5 }}
                    animate={{ opacity: 1, x: 0, rotate: -15, scale: 1 }}
                    exit={{ opacity: 0, x: 10, scale: 0.5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15, delay: 0.1 }}
                    className="absolute -top-10 -left-10 z-[200] text-[#3b82f6] pointer-events-none drop-shadow-md"
                  >
                    <svg width="48" height="48" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" className="opacity-80">
                      <path d="M10 40 L50 20 L90 40 L50 60 Z" />
                      <path d="M30 50 V70 C 30 80, 70 80, 70 70 V50" />
                      <path d="M50 40 V65" strokeWidth="3" />
                      <circle cx="50" cy="70" r="5" fill="currentColor" />
                    </svg>
                  </motion.div>
                )}
                {/* 3. Play Button Abstract (Middle Card) */}
                {originalIndex === 2 && title === "SWAYAM" && isHovered && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20, rotate: -30, scale: 0.5 }}
                    animate={{ opacity: 1, y: -30, rotate: 10, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15, delay: 0.2 }}
                    className="absolute -top-12 left-[30%] z-[200] text-[#f97316] pointer-events-none drop-shadow-md"
                  >
                    <svg width="32" height="32" viewBox="0 0 100 100" fill="currentColor" className="opacity-90">
                      <path d="M30 20 C 40 10, 80 40, 80 50 C 80 60, 40 90, 30 80 C 20 70, 20 30, 30 20 Z" />
                    </svg>
                    <svg className="absolute -top-6 -right-8 w-6 h-6 text-zinc-900" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="8">
                      <circle cx="50" cy="50" r="40" strokeLinecap="round" strokeDasharray="40 120"/>
                    </svg>
                  </motion.div>
                )}
              </AnimatePresence>

            </motion.div>
          );
        })}
      </div>

      {/* ── THE FOLDER CARD (Optical Illusion) ── */}
      <motion.div
        className="relative w-[112%] -ml-[6%] z-10"
        initial={{ y: 0, scale: 1 }}
        animate={{
          y: isHovered ? 0 : 0, // Anchored to perfectly hide the clip boundary
          scale: isHovered ? 1.04 : 1,
          filter: isHovered 
            ? "drop-shadow(0px 24px 48px rgba(0,0,0,0.08)) drop-shadow(0px 8px 16px rgba(0,0,0,0.04))" 
            : "drop-shadow(0px 6px 20px rgba(0,0,0,0.05))",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        {/* The White Card Base Body */}
        <div 
          className="absolute inset-0 bg-white"
          style={{ 
            borderBottomLeftRadius: "32px", 
            borderBottomRightRadius: "32px", 
            borderTopRightRadius: "32px" 
          }}
        />

        {/* ── TAB EXTENDING UPWARDS ── */}
        <div className="absolute top-[-40px] left-0 w-[40%] h-[40px] bg-white rounded-tl-[28px] rounded-tr-[16px]" />
        
        {/* Inward curve connecting tab to the right side */}
        <div 
          className="absolute top-[-20px] left-[40%] w-[20px] h-[20px] bg-transparent rounded-bl-[16px]" 
          style={{ boxShadow: "-10px 10px 0 0 white" }} 
        />

        {/* Meta Content sitting perfectly inside the Tab */}
        <div className="absolute top-[-28px] left-6 text-left">
          <p className="text-zinc-900 font-semibold text-[13px] leading-tight mb-0.5">{duration}</p>
          <p className="text-[#555555] font-medium text-[12px]">{season}</p>
        </div>

        {/* ── CARD BODY ── */}
        <div className="px-6 pt-10 pb-6 flex flex-col items-start text-left relative z-10">
          <h3 className="text-2xl font-semibold tracking-[-0.02em] text-zinc-900 mb-2 whitespace-nowrap">{title}</h3>
        </div>
      </motion.div>

      {/* ── PROJECT INFORMATION (OUTSIDE FOLDER) ── */}
      <div className="w-full relative pointer-events-none">
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: "auto", marginTop: 24 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="pointer-events-auto overflow-hidden w-full flex flex-col items-start px-2"
            >
              <p className="text-[14px] text-[#555555] leading-[1.6] mb-4 max-w-full">
                {description}
              </p>
              <p className="text-[13px] text-[#555555]">
                Role — <span className="text-zinc-900 font-medium">{role}</span>
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
