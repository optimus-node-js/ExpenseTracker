import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
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
      answer: "Yes! FinTrackr is completely free to use with all core features included. We may introduce premium features in the future, but our commitment is to keep the essential expense tracking functionality free for everyone."
    },
    {
      question: "Is my financial data secure?",
      answer: "Absolutely. We take security very seriously. All your data is encrypted, and we never share your financial information with third parties. Your bank statements are securely processed and stored with industry-standard encryption."
    },
    {
      question: "Which Indian banks are supported?",
      answer: "FinTrackr supports statement imports from all major Indian banks including HDFC, SBI, ICICI, Axis, Kotak, Yes Bank, and many more. Our system can parse most standard PDF and Excel statement formats."
    },
    {
      question: "Can I track investments and SIPs?",
      answer: "Yes! FinTrackr includes comprehensive investment tracking features. You can track your mutual funds, stocks, gold, and SIPs. The platform helps you visualize your investment growth and projected returns."
    },
    {
      question: "How do I get started?",
      answer: "Getting started is easy! Just sign up for a free account, and you'll be guided through the setup process. You can begin by manually adding transactions or import a bank statement to quickly populate your expense history."
    }
  ];

  return (
    <section id="faq" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background to-background/80"></div>
      <div className="absolute -bottom-20 -left-20 w-[30rem] h-[30rem] rounded-full bg-gradient-to-tr from-primary/5 via-indigo-500/5 to-primary/5 blur-3xl opacity-30"></div>
      <div className="absolute -top-20 -right-20 w-[30rem] h-[30rem] rounded-full bg-gradient-to-bl from-indigo-500/5 via-primary/5 to-indigo-500/5 blur-3xl opacity-30"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center space-y-4 mb-16 animate-fade-in">
          <Badge variant="outline" className="border-primary/20 bg-primary/10 text-primary px-4 py-1.5 text-sm mb-4 mx-auto">
            FAQ
          </Badge>
          
          <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground/90 to-foreground/80">
            Frequently Asked Questions
          </h2>
          
          <p className="text-muted-foreground md:text-xl max-w-2xl mx-auto">
            Everything you need to know about FinTrackr
          </p>
        </div>

        <div className="max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <div className="rounded-2xl backdrop-blur-sm border border-primary/10 shadow-xl overflow-hidden bg-card/20">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={`item-${index + 1}`} value={`item-${index + 1}`} className="border-b border-primary/10 last:border-0">
                  <AccordionTrigger className="py-6 px-6 text-lg font-medium hover:text-primary transition-colors duration-200">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6 text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          
          <div className="flex justify-center mt-10 animate-fade-in" style={{ animationDelay: "0.6s" }}>
            <Link href="/signup">
              <Button 
                variant="outline" 
                className="border-primary/20 bg-background/50 text-primary hover:bg-primary/5 hover:border-primary/30 transition-all duration-300"
              >
                Still have questions? Get in touch
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;