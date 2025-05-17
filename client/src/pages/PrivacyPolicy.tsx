import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Shield, Lock, FileText, Eye, Server, Clock, HelpCircle } from 'lucide-react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function PrivacyPolicy() {
  // Current date for the "Last updated" field
  const currentDate = new Date().toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Policy sections with icons
  const policySections = [
    {
      id: 'information-collection',
      icon: <FileText className="h-5 w-5" />,
      title: 'Information We Collect',
      content: (
        <div className="space-y-4">
          <p>
            We collect several types of information to provide, improve, and protect the RupeeTally services:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Account Information:</strong> When you register for a RupeeTally account, we collect your name, email address, and password.
            </li>
            <li>
              <strong>Financial Information:</strong> To provide our services, we collect financial data you enter or import such as transactions, 
              budgets, expenses, income sources, investment details, and loan information.
            </li>
            <li>
              <strong>Usage Information:</strong> We collect information about how you use RupeeTally, including log data, device information, and browsing behavior.
            </li>
            <li>
              <strong>Communications:</strong> We may collect information from your communications with our customer support team.
            </li>
          </ul>
          <p>
            We do not collect or store complete bank account numbers, PINs, or credit card CVV codes.
          </p>
        </div>
      )
    },
    {
      id: 'information-use',
      icon: <Eye className="h-5 w-5" />,
      title: 'How We Use Your Information',
      content: (
        <div className="space-y-4">
          <p>
            We use the information we collect for the following purposes:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>To Provide Our Services:</strong> We use your information to deliver the RupeeTally services, process transactions, 
              maintain your account, and provide customer support.
            </li>
            <li>
              <strong>To Improve Our Services:</strong> We analyze usage patterns to enhance existing features and develop new services.
            </li>
            <li>
              <strong>To Personalize Your Experience:</strong> We use your data to provide personalized financial insights and recommendations.
            </li>
            <li>
              <strong>To Communicate With You:</strong> We may send you service announcements, updates, security alerts, and support messages.
            </li>
            <li>
              <strong>For Security Purposes:</strong> We use information to verify accounts, prevent fraud, and ensure the security of our platform.
            </li>
          </ul>
          <p>
            We process your data based on your consent, our legitimate interests, and/or the necessity to perform our contractual obligations to you.
          </p>
        </div>
      )
    },
    {
      id: 'information-sharing',
      icon: <Server className="h-5 w-5" />,
      title: 'Information Sharing and Disclosure',
      content: (
        <div className="space-y-4">
          <p>
            RupeeTally takes your privacy seriously. We do not sell, rent, or trade your personal information to third parties for marketing purposes.
          </p>
          <p>
            We may share your information in the following limited circumstances:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>With Service Providers:</strong> We may share your information with third-party vendors who perform services on our behalf, 
              such as hosting, data analysis, payment processing, and customer service. These service providers are bound by confidentiality obligations.
            </li>
            <li>
              <strong>For Legal Reasons:</strong> We may disclose your information if required by law, regulation, legal process, or governmental request.
            </li>
            <li>
              <strong>With Your Consent:</strong> We may share information with third parties when you explicitly consent to such sharing.
            </li>
            <li>
              <strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your information may be transferred as a business asset.
            </li>
          </ul>
          <p>
            All third parties with whom we share your information are required to protect it in accordance with applicable laws and regulations.
          </p>
        </div>
      )
    },
    {
      id: 'data-security',
      icon: <Lock className="h-5 w-5" />,
      title: 'Data Security',
      content: (
        <div className="space-y-4">
          <p>
            Protecting your information is our highest priority. We implement robust security measures to safeguard your personal and financial data.
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Encryption:</strong> We use industry-standard encryption protocols to protect data in transit and at rest.
            </li>
            <li>
              <strong>Access Controls:</strong> We implement strict access controls and authentication mechanisms to prevent unauthorized access.
            </li>
            <li>
              <strong>Regular Audits:</strong> We conduct regular security audits and vulnerability assessments of our systems.
            </li>
            <li>
              <strong>Compliance:</strong> Our security practices comply with relevant Indian regulations, including the Information Technology 
              Act, 2000 and the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011.
            </li>
          </ul>
          <p>
            While we take significant steps to protect your information, no method of transmission over the Internet or electronic storage is 100% secure. 
            We encourage you to use strong, unique passwords and to keep your login credentials confidential.
          </p>
        </div>
      )
    },
    {
      id: 'data-retention',
      icon: <Clock className="h-5 w-5" />,
      title: 'Data Retention and Deletion',
      content: (
        <div className="space-y-4">
          <p>
            We retain your information for as long as your account is active or as needed to provide you with our services.
          </p>
          <p>
            If you delete your account, we will delete or anonymize your personal information within 90 days, unless:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              We are required to retain it to comply with applicable laws or regulations.
            </li>
            <li>
              We need to maintain it for legitimate business purposes, such as fraud prevention or to address technical issues.
            </li>
            <li>
              The information is in backups or archived copies, which will be deleted according to our regular backup deletion schedule.
            </li>
          </ul>
          <p>
            You can request a copy of your data or deletion of your account at any time by contacting our support team.
          </p>
        </div>
      )
    },
    {
      id: 'your-rights',
      icon: <Shield className="h-5 w-5" />,
      title: 'Your Rights and Choices',
      content: (
        <div className="space-y-4">
          <p>
            You have several rights regarding your personal information:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Access and Portability:</strong> You can access and export your RupeeTally data at any time through your account settings.
            </li>
            <li>
              <strong>Correction:</strong> You can update or correct your personal information through your account settings.
            </li>
            <li>
              <strong>Deletion:</strong> You can delete your account and associated data through your account settings or by contacting our support team.
            </li>
            <li>
              <strong>Objection and Restriction:</strong> You can object to or request restriction of processing of your personal information in certain circumstances.
            </li>
            <li>
              <strong>Withdrawal of Consent:</strong> Where we process your data based on consent, you can withdraw that consent at any time.
            </li>
          </ul>
          <p>
            To exercise these rights, please contact us at privacy@rupeetally.com. We will respond to your request within a reasonable timeframe, 
            typically within 30 days.
          </p>
        </div>
      )
    },
    {
      id: 'policy-updates',
      icon: <HelpCircle className="h-5 w-5" />,
      title: 'Changes to This Policy',
      content: (
        <div className="space-y-4">
          <p>
            We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons.
          </p>
          <p>
            If we make material changes to this policy, we will notify you by:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Posting a notice on our website
            </li>
            <li>
              Sending an email to the address associated with your account
            </li>
            <li>
              Providing a notification through the RupeeTally application
            </li>
          </ul>
          <p>
            We encourage you to review our Privacy Policy periodically to stay informed about our data practices.
          </p>
        </div>
      )
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

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
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-muted-foreground mb-2">Last updated: {currentDate}</p>
          <p className="text-muted-foreground">
            This Privacy Policy describes how RupeeTally ("we", "our", or "us") collects, uses, and shares your personal information
            when you use our website, mobile application, and services (collectively, the "Services").
          </p>
        </motion.div>

        {/* Quick navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <h2 className="text-xl font-semibold mb-4">Contents</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {policySections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                >
                  {section.icon}
                  <span>{section.title}</span>
                </a>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Policy content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-12"
        >
          {policySections.map((section) => (
            <motion.div
              key={section.id}
              id={section.id}
              variants={itemVariants}
              className="scroll-mt-20"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 rounded-full bg-primary/10 text-primary">
                  {section.icon}
                </div>
                <h2 className="text-2xl font-bold">{section.title}</h2>
              </div>
              <div className="pl-10">
                {section.content}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Contact information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-16 p-6 border rounded-lg bg-muted/30"
        >
          <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
          <p className="mb-4">
            If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us at:
          </p>
          <div className="space-y-2">
            <p><strong>Email:</strong> privacy@rupeetally.com</p>
            <p><strong>Address:</strong> RupeeTally Technologies Pvt. Ltd., 404, Skyline Apex, Koramangala, Bangalore - 560034, Karnataka, India</p>
            <p><strong>Phone:</strong> +91 88669 90123</p>
          </div>
        </motion.div>
      </main>
    </div>
  );
}