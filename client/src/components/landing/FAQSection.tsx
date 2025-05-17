import React from 'react';
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection = () => {
  const faqs = [
    {
      question: "Is FinTrackr free to use?",
      answer: "Yes, FinTrackr offers a free plan with essential features for personal finance tracking. We also offer premium plans with advanced features like statement import and investment tracking."
    },
    {
      question: "How is my financial data kept secure?",
      answer: "We use industry-standard encryption to protect your data. We never share your information with third parties, and all sensitive data is encrypted both in transit and at rest."
    },
    {
      question: "Can I import transactions from my bank?",
      answer: "Yes, FinTrackr supports importing transactions from bank statements. You can upload PDF or Excel files, and our system will automatically categorize transactions for you."
    },
    {
      question: "Does FinTrackr work on mobile devices?",
      answer: "Absolutely! FinTrackr is fully responsive and works on all devices including smartphones and tablets. We also offer dedicated mobile apps for iOS and Android."
    },
    {
      question: "Can I track investments like SIPs and stocks?",
      answer: "Yes, our investment tracking feature allows you to monitor SIPs, stocks, mutual funds, gold, and other assets. You can track performance, returns, and get insights into your portfolio."
    },
    {
      question: "How do I get help if I have questions?",
      answer: "We offer comprehensive support through our help center, email support, and community forums. Premium users also get access to priority support."
    }
  ];

  return (
    <section id="faq" className="py-16 md:py-24 container px-4 md:px-6 mx-auto">
      <div className="space-y-12">
        <div className="text-center space-y-4 max-w-[800px] mx-auto animate-fade-in">
          <Badge variant="outline" className="px-3 py-1 border-primary/20 bg-primary/10 text-foreground">
            FAQ
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">
            Frequently asked questions
          </h2>
          <p className="text-muted-foreground text-lg max-w-[600px] mx-auto">
            Find answers to the most common questions about FinTrackr and our financial tracking services.
          </p>
        </div>

        <div className="max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-lg font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;