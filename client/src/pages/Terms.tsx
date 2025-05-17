import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ScrollText, UserCheck, AlertCircle, ShieldCheck, Zap, Bookmark } from 'lucide-react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function Terms() {
  // Current date for the "Last updated" field
  const currentDate = new Date().toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const sections = [
    {
      title: "1. Acceptance of Terms",
      icon: <UserCheck className="h-5 w-5" />,
      content: (
        <>
          <p className="mb-4">
            By accessing or using RupeeTally's website, mobile application, or any services offered by RupeeTally (collectively, the "Services"), 
            you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use our Services.
          </p>
          <p>
            These Terms constitute a legally binding agreement between you and RupeeTally Technologies Pvt. Ltd. ("RupeeTally," "we," "us," or "our") 
            regarding your use of the Services. You represent that you have the authority to enter into these Terms personally.
          </p>
        </>
      )
    },
    {
      title: "2. Description of Services",
      icon: <ScrollText className="h-5 w-5" />,
      content: (
        <>
          <p className="mb-4">
            RupeeTally provides a personal finance management platform that allows users to track expenses, manage budgets, 
            monitor investments, track loans, and visualize financial data. Our Services include, but are not limited to:
          </p>
          <ul className="list-disc pl-5 space-y-2 mb-4">
            <li>Expense tracking and categorization</li>
            <li>Budget creation and management</li>
            <li>Statement import and analysis</li>
            <li>Investment portfolio tracking</li>
            <li>SIP management and performance monitoring</li>
            <li>Loan and borrowing tracking</li>
            <li>Financial insights and reporting</li>
          </ul>
          <p>
            We may update or modify the Services at any time, with or without notice, at our sole discretion.
          </p>
        </>
      )
    },
    {
      title: "3. User Accounts",
      icon: <UserCheck className="h-5 w-5" />,
      content: (
        <>
          <p className="mb-4">
            To use certain features of our Services, you must create a user account. When registering for an account, you agree to:
          </p>
          <ul className="list-disc pl-5 space-y-2 mb-4">
            <li>Provide accurate, current, and complete information</li>
            <li>Maintain and promptly update your account information</li>
            <li>Keep your password secure and confidential</li>
            <li>Notify us immediately of any unauthorized access to your account</li>
            <li>Take responsibility for all activities that occur under your account</li>
          </ul>
          <p className="mb-4">
            We reserve the right to suspend or terminate your account if any information provided is inaccurate, outdated, or incomplete, 
            or if we have reason to believe that your account is being used in an unauthorized manner.
          </p>
          <p>
            You must be at least 18 years old to create an account and use our Services.
          </p>
        </>
      )
    },
    {
      title: "4. User Responsibilities",
      icon: <AlertCircle className="h-5 w-5" />,
      content: (
        <>
          <p className="mb-4">
            When using our Services, you agree not to:
          </p>
          <ul className="list-disc pl-5 space-y-2 mb-4">
            <li>Violate any applicable laws, regulations, or third-party rights</li>
            <li>Use the Services for any illegal, harmful, or unauthorized purposes</li>
            <li>Attempt to gain unauthorized access to any part of the Services or our systems</li>
            <li>Interfere with or disrupt the integrity or performance of the Services</li>
            <li>Attempt to reverse engineer or extract the source code of our software</li>
            <li>Use any automated systems or software to extract data from our Services ("scraping")</li>
            <li>Share your account credentials with others or allow others to access your account</li>
          </ul>
          <p>
            You are solely responsible for your interaction with other users of our Services. We reserve the right, but have no obligation, 
            to monitor disputes between you and other users.
          </p>
        </>
      )
    },
    {
      title: "5. Financial Data and Information",
      icon: <ShieldCheck className="h-5 w-5" />,
      content: (
        <>
          <p className="mb-4">
            RupeeTally allows you to input, import, and track your financial information. You understand and acknowledge that:
          </p>
          <ul className="list-disc pl-5 space-y-2 mb-4">
            <li>You are solely responsible for the accuracy and completeness of your financial information</li>
            <li>RupeeTally does not verify the accuracy of any financial information you provide</li>
            <li>The Services are for informational purposes only and should not be considered financial, legal, or tax advice</li>
            <li>Any financial insights, recommendations, or projections provided are estimates based on the information you provide</li>
            <li>Investment and financial decisions should be made in consultation with qualified professionals</li>
          </ul>
          <p>
            While we implement security measures to protect your data, you understand that no data transmission or storage system can guarantee 
            absolute security. You use our Services at your own risk.
          </p>
        </>
      )
    },
    {
      title: "6. Intellectual Property Rights",
      icon: <Bookmark className="h-5 w-5" />,
      content: (
        <>
          <p className="mb-4">
            All content, features, and functionality of our Services, including but not limited to text, graphics, logos, icons, 
            images, audio clips, software, and the design, selection, and arrangement thereof, are owned by RupeeTally, 
            our licensors, or other providers and are protected by copyright, trademark, and other intellectual property laws.
          </p>
          <p className="mb-4">
            Subject to your compliance with these Terms, we grant you a limited, non-exclusive, non-transferable, and revocable license 
            to access and use our Services for personal, non-commercial purposes.
          </p>
          <p>
            You may not copy, modify, distribute, sell, or lease any part of our Services without our prior written consent. 
            You may not use any of our trademarks, logos, or other proprietary information without our prior written consent.
          </p>
        </>
      )
    },
    {
      title: "7. Subscription and Billing",
      icon: <Zap className="h-5 w-5" />,
      content: (
        <>
          <p className="mb-4">
            RupeeTally offers both free and paid subscription plans. By subscribing to a paid plan, you agree to the following:
          </p>
          <ul className="list-disc pl-5 space-y-2 mb-4">
            <li>You authorize us to charge the applicable fees to your designated payment method</li>
            <li>Subscription fees are billed in advance on a monthly or annual basis, depending on your selected billing cycle</li>
            <li>Subscriptions automatically renew unless cancelled before the renewal date</li>
            <li>You can cancel your subscription at any time through your account settings</li>
            <li>Refunds are provided in accordance with our Refund Policy and applicable laws</li>
            <li>We may modify our subscription fees with notice to you before the changes take effect</li>
          </ul>
          <p>
            All payments are processed securely through our payment processors. We do not store your complete payment information on our servers.
          </p>
        </>
      )
    },
    {
      title: "8. Limitation of Liability",
      icon: <AlertCircle className="h-5 w-5" />,
      content: (
        <>
          <p className="mb-4">
            To the maximum extent permitted by law, RupeeTally and its officers, directors, employees, agents, and affiliates shall not be liable for:
          </p>
          <ul className="list-disc pl-5 space-y-2 mb-4">
            <li>Any indirect, incidental, special, consequential, or punitive damages</li>
            <li>Any loss of profits, revenue, data, or business opportunities</li>
            <li>Any damages related to your access to or use of the Services, including any loss or corruption of data</li>
            <li>Any damages related to any financial decisions you make based on information provided through the Services</li>
            <li>Any damages resulting from unauthorized access to your account or data</li>
          </ul>
          <p className="mb-4">
            In no event shall our total liability to you for all claims exceed the amount you paid to us, if any, for accessing our Services during 
            the twelve (12) months prior to the cause of action arising.
          </p>
          <p>
            These limitations apply even if we have been advised of the possibility of such damages and regardless of the form of action, 
            whether in contract, tort, strict product liability, or otherwise.
          </p>
        </>
      )
    },
    {
      title: "9. Indemnification",
      icon: <ShieldCheck className="h-5 w-5" />,
      content: (
        <p>
          You agree to indemnify, defend, and hold harmless RupeeTally and its officers, directors, employees, agents, and affiliates from and against 
          any and all claims, liabilities, damages, losses, costs, expenses, or fees (including reasonable attorneys' fees) arising from or relating to 
          (a) your use of our Services, (b) your violation of these Terms, (c) your violation of any rights of another person or entity, or 
          (d) your breach of any applicable laws or regulations.
        </p>
      )
    },
    {
      title: "10. Modifications to Terms",
      icon: <ScrollText className="h-5 w-5" />,
      content: (
        <>
          <p className="mb-4">
            We may modify these Terms at any time by posting the revised Terms on our website or within our application. Your continued use of the 
            Services after any such changes constitutes your acceptance of the revised Terms.
          </p>
          <p>
            For material changes to these Terms, we will make reasonable efforts to provide notice to you, such as through a prominent notice on our 
            website or by sending an email to the address associated with your account.
          </p>
        </>
      )
    },
    {
      title: "11. Termination",
      icon: <AlertCircle className="h-5 w-5" />,
      content: (
        <>
          <p className="mb-4">
            You may terminate your account at any time by following the instructions in your account settings or by contacting our support team.
          </p>
          <p className="mb-4">
            We may terminate or suspend your account and access to our Services at any time, without prior notice or liability, for any reason, 
            including if you violate these Terms or engage in conduct that we determine, in our sole discretion, to be harmful to our Services, 
            other users, or our business interests.
          </p>
          <p>
            Upon termination, your right to use the Services will cease immediately, and we may delete or retain your account information and 
            data in accordance with our Privacy Policy and applicable laws.
          </p>
        </>
      )
    },
    {
      title: "12. Governing Law and Dispute Resolution",
      icon: <Bookmark className="h-5 w-5" />,
      content: (
        <>
          <p className="mb-4">
            These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law principles.
          </p>
          <p className="mb-4">
            Any dispute arising out of or relating to these Terms or your use of our Services shall be subject to the exclusive jurisdiction of 
            the courts located in Bangalore, Karnataka, India.
          </p>
          <p>
            Before initiating any legal action, you agree to try to resolve the dispute informally by contacting us at legal@rupeetally.com. 
            If we cannot resolve the dispute informally within 30 days, either party may pursue legal remedies.
          </p>
        </>
      )
    },
    {
      title: "13. Contact Information",
      icon: <ScrollText className="h-5 w-5" />,
      content: (
        <p>
          If you have any questions, concerns, or feedback regarding these Terms, please contact us at legal@rupeetally.com or 
          RupeeTally Technologies Pvt. Ltd., 404, Skyline Apex, Koramangala, Bangalore - 560034, Karnataka, India.
        </p>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header with back button */}
      <header className="container mx-auto py-6 px-4">
        <Link href="/">
          <Button variant="ghost" className="flex items-center">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>
      </header>

      <main className="container mx-auto px-4 py-8 md:py-12 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">Terms & Conditions</h1>
          <p className="text-muted-foreground mb-6">Last updated: {currentDate}</p>
          <p className="text-muted-foreground">
            Please read these Terms of Service ("Terms") carefully before using the RupeeTally website, mobile application, or any services 
            provided by RupeeTally Technologies Pvt. Ltd. These Terms govern your access to and use of our services.
          </p>
        </motion.div>

        {/* Table of Contents */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8 p-6 border rounded-lg bg-muted/30"
        >
          <h2 className="text-xl font-semibold mb-4">Table of Contents</h2>
          <ol className="list-decimal pl-5 space-y-1">
            {sections.map((section, index) => (
              <li key={index}>
                <a 
                  href={`#section-${index}`} 
                  className="text-primary hover:underline"
                >
                  {section.title.split(". ")[1]}
                </a>
              </li>
            ))}
          </ol>
        </motion.div>

        {/* Terms sections as accordion */}
        <Accordion type="single" collapsible className="w-full mb-12">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              id={`section-${index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="scroll-mt-20"
            >
              <AccordionItem value={`item-${index}`} className="border-b border-border">
                <AccordionTrigger className="text-lg font-medium hover:text-primary transition-colors py-6">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-full bg-primary/10 text-primary">
                      {section.icon}
                    </div>
                    <span>{section.title}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pt-2 pb-6 pl-10">
                  {section.content}
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>

        {/* Final note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="p-6 border rounded-lg bg-primary/5"
        >
          <h2 className="text-xl font-semibold mb-2">Acknowledgement</h2>
          <p className="text-muted-foreground">
            By accessing or using RupeeTally, you acknowledge that you have read, understood, and agree to be bound by these Terms.
            If you do not agree to these Terms, please do not use our Services.
          </p>
        </motion.div>
      </main>
    </div>
  );
}