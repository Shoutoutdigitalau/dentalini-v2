'use client';

import { useEffect, useState } from "react";
import SubHeader from "@/components/layout/SubHeader";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQ {
  _id: string;
  question: string;
  answer: string;
  category: string;
}

export default function Faqs() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);

  useEffect(() => {
    fetch("/api/faqs")
      .then(res => res.json())
      .then(data => setFaqs(data.faqs || []));
  }, []);

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
  );
}
