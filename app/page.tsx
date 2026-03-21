"use client";

import dynamic from "next/dynamic";
import HeroSection from "@/components/HeroSection";
import WhoAmI from "@/components/WhoAmI";
import MarqueeDivider from "@/components/MarqueeDivider";
import HomeInteractions from "@/components/home/HomeInteractions";

// Dynamic imports for heavy or client-only components
const GeometricBackground = dynamic(() => import("@/components/GeometricBackground"), { ssr: false });
const HomeParallaxScroll = dynamic(() => import("@/components/home/HomeParallaxScroll"), { ssr: false });
const ProjectsPreview = dynamic(() => import("@/components/home/ProjectsPreview"), { ssr: false });

export default function Home() {
  return (
    <HomeInteractions>
      <main className="min-h-screen relative">
        <GeometricBackground />
        <HomeParallaxScroll
          hero={<HeroSection />}
          next={
            <>
              <MarqueeDivider />
              <WhoAmI />
              <ProjectsPreview />
            </>
          }
        />
      </main>
    </HomeInteractions>
  );
}
