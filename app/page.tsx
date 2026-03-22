"use client";

import dynamic from "next/dynamic";
import HeroSection from "@/components/HeroSection";
import WhoAmI from "@/components/WhoAmI";
import MarqueeDivider from "@/components/MarqueeDivider";
import HomeInteractions from "@/components/home/HomeInteractions";
import SkillsBubble from "@/components/ui/SkillsBubble";
import Footer from "@/components/Footer";

// Dynamic imports for heavy or client-only components
const GeometricBackground = dynamic(() => import("@/components/GeometricBackground"), { ssr: false });
const HomeParallaxScroll = dynamic(() => import("@/components/home/HomeParallaxScroll"), { ssr: false });

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
              <SkillsBubble />
              <Footer />
            </>
          }
        />
      </main>
    </HomeInteractions>
  );
}
