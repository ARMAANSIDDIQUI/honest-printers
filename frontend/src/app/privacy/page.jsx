import { Navbar } from "@/components/Navbar";
import { StarryBackground } from "@/components/StarryBackground";
import { Footer } from "@/components/Footer";
import { StaticPageHeader } from "@/components/StaticPageHeader";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen relative overflow-hidden transition-colors duration-500">
      <StarryBackground />
      <Navbar />
      <main className="relative z-10">
        <StaticPageHeader 
          title="Privacy Policy" 
          description="Your privacy is important to us. Learn how we collect, use, and protect your personal information." 
        />
        
        <section className="py-16 lg:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <h2 className="text-xl font-bold mb-4">1. Information We Collect</h2>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                We collect information you provide directly to us when you create an account, make a purchase, or 
                communicate with us. This includes your name, email address, billing address, and payment information.
              </p>
              
              <h2 className="text-xl font-bold mb-4">2. How We Use Your Information</h2>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                We use the information we collect to process your transactions, provide customer support, and send you 
                updates about your orders. We may also send you promotional emails about new products or special 
                offers if you have opted in to receive them.
              </p>
              
              <h2 className="text-xl font-bold mb-4">3. Information Sharing</h2>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                We do not sell or rent your personal information to third parties. We may share your information with 
                service providers who perform services on our behalf, such as payment processing and email delivery.
              </p>
              
              <h2 className="text-xl font-bold mb-4">4. Data Security</h2>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                We take reasonable measures to protect your personal information from loss, theft, and unauthorized 
                access. However, no method of transmission over the internet is 100% secure.
              </p>
              
              <h2 className="text-xl font-bold mb-4">5. Your Choices</h2>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                You can access and update your account information at any time by logging into your account. You can 
                also opt out of receiving promotional emails by following the instructions in those emails.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
