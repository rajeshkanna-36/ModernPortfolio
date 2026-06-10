"use client";


import HeroSection from "@/components/HeroSection";
import MarqueeDivider from "@/components/MarqueeDivider";
import HomeInteractions from "@/components/home/HomeInteractions";

import GeometricBackground from "@/components/GeometricBackground";
import HomeParallaxScroll from "@/components/home/HomeParallaxScroll";
import WhoAmI from "@/components/WhoAmI";
import FeaturedProjects from "@/components/FeaturedProjects";
import SkillsBubble from "@/components/ui/SkillsBubble";
import Footer from "@/components/Footer";

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
