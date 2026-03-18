import HeroSection from "@/components/HeroSection";
import WhoAmI from "@/components/WhoAmI";
import MarqueeDivider from "@/components/MarqueeDivider";
import GeometricBackground from "@/components/GeometricBackground";
import HomeInteractions from "@/components/home/HomeInteractions";
import HomeParallaxScroll from "@/components/home/HomeParallaxScroll";

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
            </>
          }
        />
      </main>
    </HomeInteractions>
  );
}
