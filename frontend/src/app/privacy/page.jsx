"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { StarryBackground } from "@/components/StarryBackground";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
      <StarryBackground />
      <Navbar />
      <main className="relative pt-32 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <article className="prose prose-slate dark:prose-invert lg:prose-lg mx-auto">
          <h1>Privacy Policy</h1>
          <p className="lead">Last updated: January 16, 2026</p>

          <p>
            At Honest Graphics & Printers ("we," "us," or "our"), we value your privacy and are committed to protecting your personal information. 
            This Privacy Policy explains how we collect, use, and share information about you when you use our website and services.
          </p>

          <h2>1. Information We Collect</h2>
          <p>
            We collect information that you provide directly to us, such as when you create an account, make a purchase, 
            sign up for our newsletter, or contact us for support. This information may include:
          </p>
          <ul>
            <li>Name and contact information (email address, phone number).</li>
            <li>Billing information (credit card details, billing address) processed securely by our payment processors.</li>
            <li>Account credentials (username, password).</li>
            <li>Purchase history and download logs.</li>
          </ul>

          <h2>2. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Process your orders and deliver digital products.</li>
            <li>Manage your account and provide customer support.</li>
            <li>Send you transactional emails, such as order confirmations and download links.</li>
            <li>Send you marketing communications (if you have opted in).</li>
            <li>Improve our website and services.</li>
          </ul>

          <h2>3. Sharing of Information</h2>
          <p>
            We do not sell your personal information to third parties. We may share your information with trusted service providers 
            who assist us in operating our website, conducting our business, or serving our users, so long as those parties agree 
            to keep this information confidential (e.g., Stripe for payments).
          </p>

          <h2>4. Security</h2>
          <p>
            We implement appropriate technical and organizational measures to protect the security of your personal information. 
            However, please be aware that no method of transmission over the Internet or method of electronic storage is 100% secure.
          </p>

          <h2>5. Your Rights</h2>
          <p>
            You have the right to access, correct, or delete your personal information. You can manage your account settings 
            directly through our website or contact us for assistance.
          </p>

          <h2>6. Changes to this Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy 
            on this page and updating the "Last updated" date.
          </p>

          <h2>7. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at support@honestgraphics.com.
          </p>
        </article>
      </main>
      <Footer />
    </div>
  );
}