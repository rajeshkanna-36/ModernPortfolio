"use client";

import dynamic from "next/dynamic";
import HeroSection from "@/components/HeroSection";
import MarqueeDivider from "@/components/MarqueeDivider";
import HomeInteractions from "@/components/home/HomeInteractions";

// Dynamic imports for heavy or client-only components
const GeometricBackground = dynamic(() => import("@/components/GeometricBackground"), { ssr: false });
const HomeParallaxScroll = dynamic(() => import("@/components/home/HomeParallaxScroll"), { ssr: false });

const WhoAmI = dynamic(() => import("@/components/WhoAmI"));

const FeaturedProjects = dynamic(() => import("@/components/FeaturedProjects"));
const SkillsBubble = dynamic(() => import("@/components/ui/SkillsBubble"));

const Footer = dynamic(() => import("@/components/Footer"));

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

              <FeaturedProjects />
              <SkillsBubble />

              <Footer />
            </>
          }
        />
      </main>
    </HomeInteractions>
  );
}
