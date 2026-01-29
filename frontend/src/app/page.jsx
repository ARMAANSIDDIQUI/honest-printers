import { Navbar } from "@/components/Navbar";

import { HeroSection } from "@/components/HeroSection";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { CategoriesSection } from "@/components/CategoriesSection";
import { CustomDesignCTA } from "@/components/CustomDesignCTA";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden transition-colors duration-500">

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