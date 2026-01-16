"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { StarryBackground } from "@/components/StarryBackground";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
      <StarryBackground />
      <Navbar />
      <main className="relative pt-32 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <article className="prose prose-slate dark:prose-invert lg:prose-lg mx-auto">
          <h1>Terms of Service</h1>
          <p className="lead">Last updated: January 16, 2026</p>

          <p>
            Please read these Terms of Service ("Terms") carefully before using the Honest Graphics & Printers website. 
            By accessing or using our service, you agree to be bound by these Terms.
          </p>

          <h2>1. Digital Products & Licensing</h2>
          <p>
            All products available on Honest Graphics & Printers are digital downloads. Upon purchase, you are granted a 
            non-exclusive, non-transferable license to use the product in accordance with the specific license type purchased 
            (Standard or Extended).
          </p>
          <ul>
            <li><strong>Standard License:</strong> Allows use in a single end product for personal or commercial use. You may not resell or redistribute the source files.</li>
            <li><strong>Prohibitions:</strong> You may not sub-license, resell, share, transfer, or otherwise redistribute the item on its own.</li>
          </ul>

          <h2>2. Purchases and Refunds</h2>
          <p>
            Due to the nature of digital products, all sales are final. We do not offer refunds once the files have been downloaded, 
            except in cases where the file is technically defective and cannot be fixed by our support team.
          </p>

          <h2>3. User Accounts</h2>
          <p>
            You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility 
            for all activities that occur under your account.
          </p>

          <h2>4. Intellectual Property</h2>
          <p>
            The content, organization, graphics, design, compilation, and other matters related to the Site are protected under 
            applicable copyrights and other proprietary (including but not limited to intellectual property) rights. 
            The copying, redistribution, use, or publication by you of any such matters or any part of the Site is strictly prohibited.
          </p>

          <h2>5. Limitation of Liability</h2>
          <p>
            In no event shall Honest Graphics & Printers, nor its directors, employees, partners, agents, suppliers, or affiliates, 
            be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, 
            loss of profits, data, use, goodwill, or other intangible losses.
          </p>

          <h2>6. Governing Law</h2>
          <p>
            These Terms shall be governed and construed in accordance with the laws of India, without regard to its conflict of law provisions.
          </p>

          <h2>7. Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us at support@honestgraphics.com.
          </p>
        </article>
      </main>
      <Footer />
    </div>
  );
}