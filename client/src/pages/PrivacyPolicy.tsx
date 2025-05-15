import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-8">
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to home
        </Link>

        <div className="prose prose-sm md:prose-base lg:prose-lg dark:prose-invert max-w-none">
          <h1>Privacy Policy</h1>
          <p>Last updated: May 15, 2025</p>

          <h2>Introduction</h2>
          <p>
            At FinTrackr, we value your privacy and are committed to protecting your personal information. 
            This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our expense tracking service.
          </p>
          <p>
            Please read this Privacy Policy carefully. By accessing or using our service, you acknowledge that you have read, understood, and agree to be bound by all the terms outlined in this Privacy Policy.
          </p>

          <h2>Information We Collect</h2>
          <h3>Personal Information</h3>
          <p>When you create an account, we collect:</p>
          <ul>
            <li>Full name</li>
            <li>Email address</li>
            <li>Username</li>
            <li>Password (securely hashed)</li>
          </ul>

          <h3>Financial Information</h3>
          <p>To provide our expense tracking service, we collect financial information that you choose to input or upload, including:</p>
          <ul>
            <li>Transaction details (date, amount, category, description)</li>
            <li>Bank statement data (when you choose to upload statements)</li>
            <li>Budget information</li>
            <li>Investment details</li>
            <li>Income sources</li>
          </ul>

          <h3>Usage Information</h3>
          <p>We automatically collect certain information about your device and how you interact with our service, including:</p>
          <ul>
            <li>IP address</li>
            <li>Device type and operating system</li>
            <li>Browser type</li>
            <li>Pages visited and features used</li>
            <li>Time and date of your visits</li>
            <li>Referring website or application</li>
          </ul>

          <h2>How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Provide, maintain, and improve our services</li>
            <li>Process and complete transactions</li>
            <li>Send you technical notices, updates, security alerts, and administrative messages</li>
            <li>Respond to your comments, questions, and customer service requests</li>
            <li>Analyze usage patterns and trends to enhance user experience</li>
            <li>Protect against, identify, and prevent fraud and other illegal activities</li>
          </ul>

          <h2>Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to protect the security of your personal information. 
            However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
          </p>

          <h2>Third-Party Services</h2>
          <p>
            Our service may contain links to third-party websites or services that are not owned or controlled by FinTrackr. 
            We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites or services.
          </p>

          <h2>Data Retention</h2>
          <p>
            We retain your personal information for as long as your account is active or as needed to provide you with our services. 
            If you close your account, we will retain and use your information as necessary to comply with our legal obligations, 
            resolve disputes, and enforce our agreements.
          </p>

          <h2>Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access the personal information we have about you</li>
            <li>Correct inaccurate or incomplete personal information</li>
            <li>Delete your personal information</li>
            <li>Object to or restrict the processing of your personal information</li>
            <li>Receive a copy of your personal information in a structured, commonly used, and machine-readable format</li>
          </ul>

          <h2>Children's Privacy</h2>
          <p>
            Our service is not directed to individuals under the age of 18. We do not knowingly collect personal information from children. 
            If you are a parent or guardian and believe that your child has provided us with personal information, please contact us.
          </p>

          <h2>Changes to This Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page 
            and updating the "Last updated" date at the top of this page. You are advised to review this Privacy Policy periodically for any changes.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at support@fintrackr.com.
          </p>
        </div>
      </div>
    </div>
  );
}