import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

export default function Terms() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-8">
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to home
        </Link>

        <div className="prose prose-sm md:prose-base lg:prose-lg dark:prose-invert max-w-none">
          <h1>Terms of Service</h1>
          <p>Last updated: May 15, 2025</p>

          <h2>Introduction</h2>
          <p>
            Welcome to FinTrackr! These Terms of Service ("Terms") govern your access to and use of the FinTrackr website, 
            mobile applications, and services (collectively, the "Service"). By accessing or using the Service, 
            you agree to be bound by these Terms. If you disagree with any part of the Terms, you may not access the Service.
          </p>

          <h2>1. Account Registration</h2>
          <p>
            To use certain features of the Service, you must register for an account. When you register, you agree to provide accurate, 
            current, and complete information. You are responsible for maintaining the confidentiality of your account and password 
            and for restricting access to your computer. You agree to accept responsibility for all activities that occur under your account.
          </p>

          <h2>2. User Conduct</h2>
          <p>You agree not to use the Service to:</p>
          <ul>
            <li>Violate any applicable laws or regulations</li>
            <li>Infringe the intellectual property rights of others</li>
            <li>Transmit any material that is defamatory, offensive, or otherwise objectionable</li>
            <li>Impersonate any person or entity or falsely state or misrepresent your affiliation with a person or entity</li>
            <li>Interfere with or disrupt the Service or servers or networks connected to the Service</li>
            <li>Attempt to gain unauthorized access to any part of the Service</li>
          </ul>

          <h2>3. Financial Data</h2>
          <p>
            The Service allows you to input and track your financial information. You are solely responsible for the accuracy of the 
            financial information you provide. The Service is not intended to provide financial, investment, legal, or tax advice, 
            and we make no representations regarding the accuracy, completeness, or timeliness of any content provided through the Service.
          </p>

          <h2>4. Intellectual Property</h2>
          <p>
            The Service and its original content, features, and functionality are and will remain the exclusive property of FinTrackr and 
            its licensors. The Service is protected by copyright, trademark, and other laws. Our trademarks and trade dress may not be used 
            in connection with any product or service without the prior written consent of FinTrackr.
          </p>

          <h2>5. User Content</h2>
          <p>
            You retain all rights to any content you submit, post, or display on or through the Service ("User Content"). By submitting, 
            posting, or displaying User Content on or through the Service, you grant us a worldwide, non-exclusive, royalty-free license 
            to use, reproduce, modify, adapt, publish, translate, create derivative works from, distribute, and display such content in any media.
          </p>

          <h2>6. Privacy</h2>
          <p>
            Our Privacy Policy, which is incorporated into these Terms by reference, describes how we collect, use, and share information about you 
            when you use our Service. By using the Service, you consent to our collection, use, and sharing of information as described in our Privacy Policy.
          </p>

          <h2>7. Termination</h2>
          <p>
            We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole 
            discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.
            If you wish to terminate your account, you may simply discontinue using the Service, or you may delete your account through the account settings.
          </p>

          <h2>8. Limitation of Liability</h2>
          <p>
            In no event shall FinTrackr, its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, 
            special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, 
            resulting from your access to or use of or inability to access or use the Service.
          </p>

          <h2>9. Disclaimer</h2>
          <p>
            The Service is provided on an "AS IS" and "AS AVAILABLE" basis. The Service is provided without warranties of any kind, whether express or implied, 
            including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, non-infringement, or course of performance.
          </p>

          <h2>10. Governing Law</h2>
          <p>
            These Terms shall be governed and construed in accordance with the laws of India, without regard to its conflict of law provisions.
            Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
          </p>

          <h2>11. Changes to Terms</h2>
          <p>
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 
            30 days' notice before any new terms take effect. What constitutes a material change will be determined at our sole discretion.
            By continuing to access or use our Service after any revisions become effective, you agree to be bound by the revised terms.
          </p>

          <h2>12. Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us at terms@fintrackr.com.
          </p>
        </div>
      </div>
    </div>
  );
}