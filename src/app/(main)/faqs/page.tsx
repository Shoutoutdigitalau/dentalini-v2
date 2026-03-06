import SubHeader from "@/components/layout/SubHeader";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import dbConnect from "@/lib/mongodb";
import FAQ from "@/models/FAQ";
import { Metadata } from "next";

export const revalidate = 60; // Revalidate every 60 seconds

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Dentalini Dental Care",
  description: "Find answers to common questions about dental care, implants, cosmetic dentistry, veneers, crowns, fillings, gum disease treatment, and our practice information.",
  keywords: "dental FAQ, dental questions, dental implants FAQ, cosmetic dentistry questions, porcelain veneers, dental crowns, teeth whitening, gum disease, root canal, dental care Melbourne"
};

interface FAQType {
  _id: string;
  question: string;
  answer: string;
  category: string;
}

async function getFaqs() {
  await dbConnect();
  const faqs = await FAQ.find({}).sort({ category: 1, order: 1 }).lean();
  return JSON.parse(JSON.stringify(faqs));
}

export default async function Faqs() {
  const faqs: FAQType[] = await getFaqs();

  const categoryOrder = [
    "General Dental Care",
    "Dental Implants",
    "Cosmetic Dentistry",
    "Porcelain Veneers & Crowns",
    "Fillings & Treatments",
    "Gum Disease & Periodontal Care",
    "Practice Information"
  ];

  const categories = categoryOrder.filter(cat => faqs.some(f => f.category === cat));

  return (
    <>
      {faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": faqs.map(faq => ({
                "@type": "Question",
                "name": faq.question,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": faq.answer.replace(/<[^>]*>/g, '')
                }
              }))
            })
          }}
        />
      )}
      <div>
        <SubHeader
          title="Frequently Asked Questions"
          description="If you don't see your question here, we're happy to help by phone or email."
        />
        <section className="container mx-auto py-12 space-y-12 max-w-4xl">
          {categories.map(category => (
            <div key={category}>
              <h2 className="text-2xl font-bold mb-6">{category}</h2>
              <Accordion type="single" collapsible className="w-full">
                {faqs.filter(f => f.category === category).map(faq => (
                  <AccordionItem key={faq._id} value={faq._id}>
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent>
                      <div dangerouslySetInnerHTML={{ __html: faq.answer }} />
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </section>
      </div>
    </>
  );
}
