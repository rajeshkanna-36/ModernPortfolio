"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const photos = [
  { src: "/images/portrait-3.png", rotate: -6, x: -20, y: 10, z: 10 },
  { src: "/images/portrait-2.png", rotate: 8, x: 25, y: -15, z: 20 },
  { src: "/images/portrait-1.png", rotate: -2, x: 0, y: 0, z: 30 },
];

export default function ProfilePhotoStack() {
  return (
    <div className="relative w-full max-w-[320px] aspect-[3/4] mx-auto md:mx-0">
      {photos.map((photo, i) => (
        <motion.div
          key={i}
          className="absolute inset-0 bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl"
          initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
          whileInView={{ 
            opacity: 1, 
            scale: 1, 
            rotate: photo.rotate,
            x: photo.x,
            y: photo.y 
          }}
          viewport={{ once: true }}
          transition={{ 
            delay: i * 0.2, 
            duration: 0.8, 
            ease: [0.16, 1, 0.3, 1] 
          }}
          style={{ zIndex: photo.z }}
          whileHover={{ 
            scale: 1.05, 
            rotate: photo.rotate * 0.5,
            zIndex: 50,
            transition: { duration: 0.3 }
          }}
        >
          <Image
            src={photo.src}
            alt={`Developer Portrait ${i + 1}`}
            fill
            className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
            sizes="(max-width: 768px) 100vw, 320px"
          />
          
          {/* Decorative UI elements (like stories) */}
          <div className="absolute top-4 left-4 right-4 h-1 bg-white/20 rounded-full overflow-hidden">
             <motion.div 
               className="h-full bg-white/60" 
               initial={{ width: 0 }}
               whileInView={{ width: "60%" }}
               transition={{ delay: 1 + i * 0.2, duration: 2 }}
             />
          </div>
          
          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-[10px] font-mono text-white/50 border-t border-white/10 pt-3">
             <span>0{i+1}</span>
             <span>WHO I AM //</span>
          </div>
        </motion.div>
      ))}
      
      {/* Floating accent elements */}
      <motion.div 
        className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-2xl"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />
    </div>
  );
}
