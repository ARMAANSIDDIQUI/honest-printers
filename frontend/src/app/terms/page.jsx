import { Navbar } from "@/components/Navbar";
import { StarryBackground } from "@/components/StarryBackground";
import { Footer } from "@/components/Footer";
import { StaticPageHeader } from "@/components/StaticPageHeader";

export default function TermsPage() {
  return (
    <div className="min-h-screen relative overflow-hidden transition-colors duration-500">
      <StarryBackground />
      <Navbar />
      <main className="relative z-10">
        <StaticPageHeader 
          title="Terms of Service" 
          description="Please read these terms carefully before using our website or purchasing our products." 
        />
        
        <section className="py-16 lg:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <h2 className="text-xl font-bold mb-4">1. Acceptance of Terms</h2>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                By accessing or using the Honest Graphics website, you agree to be bound by these Terms of Service 
                 and all applicable laws and regulations.
              </p>
              
              <h2 className="text-xl font-bold mb-4">2. Use License</h2>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                Permission is granted to download the products you have purchased for personal or commercial use 
                according to the specific license purchased. This is the grant of a license, not a transfer of title.
              </p>
              
              <h2 className="text-xl font-bold mb-4">3. Disclaimer</h2>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                The materials on Honest Graphics' website are provided on an 'as is' basis. Honest Graphics makes no 
                warranties, expressed or implied, and hereby disclaims and negates all other warranties including, 
                without limitation, implied warranties or conditions of merchantability.
              </p>
              
              <h2 className="text-xl font-bold mb-4">4. Limitations</h2>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                In no event shall Honest Graphics or its suppliers be liable for any damages (including, without 
                limitation, damages for loss of data or profit, or due to business interruption) arising out of the 
                use or inability to use the materials on Honest Graphics' website.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
