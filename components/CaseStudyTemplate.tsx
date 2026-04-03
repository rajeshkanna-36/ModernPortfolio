"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import IPhoneMockup from "./ui/IPhoneMockup";
import type { ProjectData } from "@/lib/projects";

const SECTIONS = ["Overview", "Research", "Design", "Final Product"];

export default function CaseStudyTemplate({ project }: { project: ProjectData }) {
  const [activeSection, setActiveSection] = useState("Overview");
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.08], [1, 0.96]);

  return (
    <div ref={containerRef} className="min-h-screen bg-white text-zinc-900">

      {/* ─── STICKY NAVIGATION ─── */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3">
        {/* Back Button */}
        <Link
          href="/#work"
          className="w-12 h-12 rounded-full bg-zinc-900 text-white flex items-center justify-center shadow-lg hover:bg-zinc-800 transition-colors no-underline"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </Link>

        {/* Section Tabs */}
        <div className="hidden md:flex bg-zinc-900 rounded-full px-2 py-2 gap-1 shadow-lg">
          {SECTIONS.map((section) => (
            <button
              key={section}
              onClick={() => {
                setActiveSection(section);
                document.getElementById(section.toLowerCase().replace(" ", "-"))?.scrollIntoView({ behavior: "smooth" });
              }}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                activeSection === section
                  ? "bg-white text-zinc-900"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              {section}
            </button>
          ))}
        </div>
      </nav>

      {/* ─── HERO SECTION ─── */}
      <motion.section
        id="overview"
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative w-full bg-[#f5f5f5] pt-32 pb-20 px-6 md:px-12 overflow-hidden origin-top"
      >
        <div className="max-w-6xl mx-auto">
          {/* Title Row */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8 mb-12">
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.9] mb-8"
              >
                {project.title}
              </motion.h1>

              {/* Meta Row */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="flex flex-wrap gap-x-12 gap-y-4"
              >
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-1">Main Role</p>
                  <p className="text-base font-medium text-zinc-900">{project.role}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-1">Duration</p>
                  <p className="text-base font-medium text-zinc-900">{project.duration}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-1">Project Type</p>
                  <p className="text-base font-medium text-zinc-900">{project.projectType}</p>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-orange-500 font-medium text-lg md:text-right whitespace-nowrap shrink-0"
            >
              {project.season}
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* ─── PROJECT OVERVIEW ─── */}
      <section className="w-full bg-white py-24 px-6 md:px-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Stacked Mockups */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="relative w-full aspect-[4/3] flex items-center justify-center p-4"
          >
            {project.keyScreens.slice(0, 3).map((screen, i) => (
              <div
                key={i}
                className="absolute w-[45%] z-10"
                style={{
                  left: i === 0 ? "5%" : i === 1 ? "27.5%" : "50%",
                  top: i === 0 ? "15%" : i === 1 ? "0%" : "10%",
                  zIndex: i === 1 ? 20 : i === 0 ? 10 : 5,
                  transform: i === 0 ? "rotate(-6deg)" : i === 2 ? "rotate(6deg)" : "none",
                }}
              >
                {project.layerType === 'portrait' || (project.layerType === 'mixed' && i > 0) ? (
                  <IPhoneMockup src={screen} alt={`${project.title} screen ${i + 1}`} />
                ) : (
                  <div className="rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.1)] border border-zinc-200">
                    <Image
                      src={screen}
                      alt={`${project.title} screen ${i + 1}`}
                      width={300}
                      height={600}
                      className="object-cover"
                    />
                  </div>
                )}
              </div>
            ))}
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">Project Overview</h2>
            <p className="text-lg text-zinc-600 leading-relaxed">{project.overview}</p>
          </motion.div>
        </div>
      </section>

      {/* ─── MY ROLE ─── */}
      <section className="w-full bg-[#f8f9fa] py-24 px-6 md:px-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6 italic font-serif">My Role</h2>
            <p className="text-lg text-zinc-600 leading-relaxed">{project.roleDescription}</p>
          </motion.div>

          {/* Wireframe-style mockups */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative w-full aspect-[4/3] flex items-center justify-center"
          >
            {project.keyScreens.slice(0, 3).map((screen, i) => (
              <div
                key={i}
                className="absolute rounded-xl overflow-hidden border border-zinc-200 bg-white"
                style={{
                  width: "40%",
                  aspectRatio: "9/19",
                  left: i === 0 ? "5%" : i === 1 ? "30%" : "55%",
                  top: i === 0 ? "10%" : i === 1 ? "5%" : "15%",
                  zIndex: 10 - i,
                  filter: i !== 1 ? "grayscale(1) opacity(0.5)" : "none",
                  boxShadow: i === 1 ? "0 20px 60px rgba(0,0,0,0.12)" : "0 4px 20px rgba(0,0,0,0.05)",
                }}
              >
                <Image
                  src={screen}
                  alt={`Wireframe ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="250px"
                />
                {i === 1 && (
                  <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-orange-500 -translate-x-1/2" />
                )}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── RESEARCH PLAN ─── */}
      <section id="research" className="w-full bg-white py-24 px-6 md:px-12">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">Research Plan</h2>
            <p className="text-zinc-500 text-lg mb-16">{project.researchPlan.subtitle}</p>
          </motion.div>

          {/* Concentric Circles + Stats */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-16 md:gap-24">
            {/* Stats Column */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col gap-8"
            >
              {project.researchPlan.stats.map((stat, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="text-right min-w-[80px]">
                    <div className="text-3xl font-bold text-zinc-900">{stat.value}</div>
                    <div className="text-sm text-zinc-500">{stat.label}</div>
                  </div>
                  <div className="w-[3px] h-12 bg-zinc-900 rounded-full" />
                  <div className="w-24 border-t-2 border-dashed border-zinc-300" />
                  <div className="w-3 h-3 rounded-full bg-zinc-900" />
                </div>
              ))}
            </motion.div>

            {/* Concentric Circles */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative w-64 h-64 md:w-80 md:h-80"
            >
              {project.researchPlan.methods.map((method, i) => {
                const sizes = [100, 75, 55, 35];
                const pct = sizes[i] || 30;
                return (
                  <div
                    key={method}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-zinc-200 flex items-center justify-center"
                    style={{
                      width: `${pct}%`,
                      height: `${pct}%`,
                      backgroundColor: i === project.researchPlan.methods.length - 1 ? "#f5f5f5" : "transparent",
                    }}
                  >
                    {i === project.researchPlan.methods.length - 1 && (
                      <span className="text-sm font-medium text-zinc-700">{method}</span>
                    )}
                  </div>
                );
              })}
              {/* Method Labels around circles */}
              {project.researchPlan.methods.slice(0, -1).map((method, i) => {
                const positions = [
                  { top: "100%", left: "50%", transform: "translate(-50%, 8px)" },
                  { top: "50%", left: "100%", transform: "translate(8px, -50%)" },
                  { top: "0%", left: "50%", transform: "translate(-50%, -24px)" },
                ];
                return (
                  <span
                    key={method}
                    className="absolute text-sm text-zinc-500 whitespace-nowrap"
                    style={positions[i] || {}}
                  >
                    {method}
                  </span>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── DESIGN / KEY SCREENS ─── */}
      <section id="design" className="w-full bg-[#f8f9fa] py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold tracking-tight mb-16 text-center"
          >
            Key Screens
          </motion.h2>

          {/* Scrollable Screen Gallery */}
          <div className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide">
            {project.keyScreens.map((screen, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="shrink-0 snap-center w-[260px] md:w-[300px] mb-12"
              >
                {project.layerType === 'portrait' || (project.layerType === 'mixed' && i > 0) ? (
                  <IPhoneMockup src={screen} alt={`Screen ${i + 1}`} />
                ) : (
                  <div className="rounded-[2rem] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.1)] border border-zinc-200 bg-white relative aspect-[9/19]">
                    <Image
                      src={screen}
                      alt={`Screen ${i + 1}`}
                      fill
                      className="object-cover"
                      sizes="300px"
                    />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FINAL PRODUCT / HIGHLIGHTS ─── */}
      <section id="final-product" className="w-full bg-white py-24 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold tracking-tight mb-16 text-center"
          >
            Highlights
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {project.highlights.map((highlight, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-[#f8f9fa] rounded-2xl p-8 border border-zinc-100 text-center"
              >
                <div className="w-14 h-14 rounded-full bg-orange-50 border border-orange-100 flex items-center justify-center mx-auto mb-5">
                  <span className="text-orange-500 font-bold text-lg">0{i + 1}</span>
                </div>
                <p className="text-base font-medium text-zinc-900">{highlight}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── NEXT PROJECT CTA ─── */}
      <section className="w-full bg-zinc-950 py-24 px-6 md:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-zinc-500 text-sm font-mono uppercase tracking-widest mb-4">Thank you for reading</p>
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-10">
            Want to see more work?
          </h2>
          <Link
            href="/#work"
            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-zinc-900 rounded-full font-semibold text-base hover:bg-zinc-100 transition-colors no-underline"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Back to Projects
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
