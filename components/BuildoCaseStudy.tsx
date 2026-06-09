"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";

import { ProjectData } from "@/lib/projects";

export default function BuildoCaseStudy({ project }: { project?: ProjectData }) {
  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-yellow-200 overflow-x-hidden relative">
      
      {/* Floating Header */}
      <header className="w-full px-6 py-6 flex justify-between items-center max-w-[1400px] mx-auto absolute top-0 left-0 right-0 z-50">
        <Link href="/#work" className="flex items-center gap-2 text-zinc-600 hover:text-black transition-colors font-bold text-sm bg-white/80 backdrop-blur-md px-4 py-2 rounded-full border border-zinc-100">
          <ChevronLeft size={18} />
          Back to Portfolio
        </Link>
      </header>

      {/* Case Study Full Image */}
      <section className="w-full flex items-start justify-center pt-24 pb-24">
        <div className="w-full max-w-5xl px-4 md:px-8">
          <img 
            src="/projects/buildo/case-study.svg" 
            alt="Buildo Case Study" 
            className="w-full h-auto block"
            onError={(e) => {
              // Fallback to PNG if SVG is not found
              if (e.currentTarget.src.endsWith('.svg')) {
                 e.currentTarget.src = "/projects/buildo/case-study.png";
              }
            }}
          />
        </div>
      </section>

    </div>
  );
}
