import { Navbar } from "@/components/Navbar";
import { StarryBackground } from "@/components/StarryBackground";
import { Footer } from "@/components/Footer";
import { StaticPageHeader } from "@/components/StaticPageHeader";

export default function AboutPage() {
  return (
    <div className="min-h-screen relative overflow-hidden transition-colors duration-500">
      <StarryBackground />
      <Navbar />
      <main className="relative z-10">
        <StaticPageHeader 
          title="About Honest Graphics" 
          description="We are dedicated to providing the highest quality design templates for creative professionals worldwide." 
        />
        
        <section className="py-16 lg:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <h2 className="text-2xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                At Honest Graphics & Printers, we believe that professional design should be accessible to everyone. 
                Our mission is to empower designers, small business owners, and creative enthusiasts by providing 
                ready-to-use, high-quality templates that save time and elevate their brand.
              </p>
              
              <div className="grid md:grid-cols-2 gap-12 my-16">
                <div>
                  <h3 className="text-xl font-bold mb-4">Quality First</h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    Every template in our store is crafted by professional designers with years of experience in the 
                    printing and digital media industry. We ensure correct color profiles, bleed areas, and 
                    fully organized layers.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-4">Format Versatility</h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    We understand that different designers use different tools. That's why we offer our files in 
                    Photoshop (PSD), Illustrator (AI), CorelDRAW (CDR), and InDesign (INDD) formats.
                  </p>
                </div>
              </div>
              
              <h2 className="text-2xl font-bold mb-6">Our Story</h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                Founded in Mumbai, India, Honest Graphics started as a small printing press. Over time, we realized 
                the struggle many businesses faced in getting high-quality designs quickly. We decided to bridge 
                this gap by creating a digital marketplace for premium design assets.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
