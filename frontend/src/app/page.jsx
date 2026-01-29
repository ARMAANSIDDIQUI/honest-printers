import { Navbar } from "@/components/Navbar";
import { StarryBackground } from "@/components/StarryBackground";
import { ShootingStarBackground } from "@/components/ShootingStarBackground";
import MeteorBackground from "@/components/MeteorBackground";
import { HeroSection } from "@/components/HeroSection";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { CategoriesSection } from "@/components/CategoriesSection";
import { CustomDesignCTA } from "@/components/CustomDesignCTA";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden transition-colors duration-500">
      <div className="hidden dark:block">
        <StarryBackground />
      </div>
      <div className="block dark:hidden">
        {/* <ShootingStarBackground /> */}
        <MeteorBackground />
      </div>
      <Navbar />
      <main className="relative z-10">
        <HeroSection />
        <FeaturedProducts />
        <CategoriesSection />
        <CustomDesignCTA />
      </main>
      <Footer />
    </div>
  );
}