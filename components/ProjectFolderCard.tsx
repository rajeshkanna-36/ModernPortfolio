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
              className={`${layerBaseClass} shadow-[0_4px_16px_rgba(0,0,0,0.06)] overflow-hidden ${
                layer?.startsWith("/") 
                  ? "bg-white ring-1 ring-inset ring-black/10"
                  : layer || "bg-zinc-200"
              }`}
              initial={{ y: defaultY, x: defaultX, rotate: defaultRotate, scale: 0.95 }}
              animate={{
                y: isHovered ? hoverY : defaultY,
                x: isHovered ? hoverX : defaultX,
                rotate: isHovered ? hoverRotate : defaultRotate,
                scale: isHovered ? 0.96 : 0.95,
              }}
              transition={{ type: "spring", stiffness: 280, damping: 22, mass: 1 + (originalIndex * 0.1) }}
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
              
              {/* Coming Soon badge attached to the highest fanning portrait card (middle one) */}
              {originalIndex === 2 && title === "Dream Line" && isHovered && (
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-5 py-2 bg-white border border-zinc-200 rounded-full shadow-md text-[13px] font-medium tracking-wide text-zinc-900 z-[100] whitespace-nowrap">
                  Coming Soon
                </div>
              )}
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
