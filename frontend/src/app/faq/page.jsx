import { Navbar } from "@/components/Navbar";
import { StarryBackground } from "@/components/StarryBackground";
import { Footer } from "@/components/Footer";
import { StaticPageHeader } from "@/components/StaticPageHeader";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    question: "What file formats are included in the download?",
    answer: "Most of our templates include multiple formats such as Adobe Photoshop (PSD), Adobe Illustrator (AI), CorelDRAW (CDR), and Adobe InDesign (INDD). Please check the product description for specific formats included with each template."
  },
  {
    question: "Can I use these templates for commercial projects?",
    answer: "Yes, all our templates come with a commercial license that allows you to use them for your clients' projects or your own business marketing materials. You cannot, however, resell the templates themselves."
  },
  {
    question: "How do I download my files after purchase?",
    answer: "Immediately after your payment is processed, you will receive an email with a download link. You can also access your downloads at any time from your account dashboard on our website."
  },
  {
    question: "Do you offer refunds?",
    answer: "Due to the digital nature of our products, we generally do not offer refunds once a file has been downloaded. However, if you experience technical issues with a file, please contact our support team and we will be happy to assist you."
  },
  {
    question: "Are the fonts included in the download?",
    answer: "Due to licensing restrictions, we cannot include the font files themselves. However, we include a text file with links to where you can download the fonts used in the template (most are free Google Fonts)."
  }
];

export default function FAQPage() {
  return (
    <div className="min-h-screen relative overflow-hidden transition-colors duration-500">
      <StarryBackground />
      <Navbar />
      <main className="relative z-10">
        <StaticPageHeader 
          title="Frequently Asked Questions" 
          description="Find answers to common questions about our templates, licenses, and downloads." 
        />
        
        <section className="py-16 lg:py-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <Accordion type="single" collapsible className="w-full space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl px-6 transition-colors"
                >
                  <AccordionTrigger className="text-left font-semibold text-slate-900 dark:text-white hover:no-underline py-6">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 dark:text-slate-400 pb-6 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            
            <div className="mt-16 text-center">
              <p className="text-slate-600 dark:text-slate-400">
                Still have questions? <a href="/contact" className="text-indigo-600 font-semibold hover:underline">Contact our support team</a>
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
