import React from 'react';
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection = () => {
  const faqs = [
    {
      question: "Is RupeeTally free to use?",
      answer: "Yes, RupeeTally offers a free plan with essential features for personal finance tracking. We also offer premium plans with advanced features like statement import, investment tracking, and SIP management tailored for Indian investors."
    },
    {
      question: "How is my financial data kept secure?",
      answer: "We use industry-standard encryption to protect your data. We never share your information with third parties, and all sensitive data is encrypted both in transit and at rest. RupeeTally complies with all relevant Indian data protection regulations."
    },
    {
      question: "Can I import transactions from my Indian bank statements?",
      answer: "Yes, RupeeTally supports importing transactions from bank statements from all major Indian banks. You can upload PDF or Excel files, and our smart system will automatically categorize transactions for you, recognizing common Indian merchants and expense types."
    },
    {
      question: "Does RupeeTally work on mobile devices?",
      answer: "Absolutely! RupeeTally is fully responsive and works on all devices including smartphones and tablets. Our mobile-optimized interface makes it easy to track expenses on the go."
    },
    {
      question: "Can I track SIPs, mutual funds, and other Indian investments?",
      answer: "Yes, our investment tracking feature is specially designed for Indian investors. You can monitor SIPs, stocks, mutual funds, PPF, gold, and other assets common in Indian portfolios. You can track performance, returns, and get insights into your investment portfolio."
    },
    {
      question: "Does RupeeTally support UPI transactions?",
      answer: "Yes, RupeeTally fully supports UPI transactions. You can easily categorize and track all your UPI payments from services like Google Pay, PhonePe, Paytm and more."
    },
    {
      question: "Can I track my cash transactions and maintain a cash reserve?",
      answer: "Absolutely! RupeeTally has a dedicated cash reserve tracking feature, perfect for managing the cash component of your finances - ideal for day-to-day expenses and tracking petty cash."
    },
    {
      question: "How does the lending/borrowing tracker work?",
      answer: "Our lending/borrowing tracker allows you to record when you lend money to or borrow from friends and family. You can record the person's details, date, amount, and set reminders for repayment dates to ensure you never forget about pending transactions."
    },
    {
      question: "How do I get help if I have questions?",
      answer: "We offer comprehensive support through our help center, email support, and community forums. Premium users also get access to priority support with response times under 4 hours."
    },
    {
      question: "Can I generate GST invoices or track business expenses separately?",
      answer: "Yes, RupeeTally offers business expense tracking with GST categorization, helping freelancers and small business owners keep their personal and business finances separate while managing tax compliance."
    }
  ];

  return (
    <section id="faq" className="py-16 md:py-24 container px-4 md:px-6 mx-auto">
      <div className="space-y-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-4 max-w-[800px] mx-auto"
        >
          <Badge variant="outline" className="px-3 py-1 border-primary/20 bg-primary/10 text-foreground">
            FAQ
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">
            Frequently asked questions
          </h2>
          <p className="text-muted-foreground text-lg max-w-[600px] mx-auto">
            Find answers to the most common questions about RupeeTally and our financial tracking services designed for Indian users.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <AccordionItem value={`item-${index}`}>
                  <AccordionTrigger className="text-lg font-medium hover:text-primary transition-colors">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground">
            Still have questions? <a href="/contact" className="text-primary font-medium hover:underline">Contact our support team</a>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;