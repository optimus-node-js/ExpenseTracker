import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Calendar, Clock, BookOpen, Share2, ArrowLeft, ArrowRight } from 'lucide-react';
import { Link, useRoute } from 'wouter';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";

// Guide type 
type Guide = {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  readTime: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  content: string;
  featuredOrder?: number;
};

// Sample guides data - in a real app, this would come from the backend
const guides: Guide[] = [
  {
    id: "setup-account",
    title: "Setting Up Your RupeeTally Account",
    description: "A comprehensive guide to creating and configuring your personal finance dashboard with RupeeTally.",
    category: "Getting Started",
    image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=1000&auto=format&fit=crop",
    readTime: 5,
    difficulty: "Beginner",
    featuredOrder: 1,
    content: `
      <h2>Getting Started with Your RupeeTally Account</h2>
      
      <p>Welcome to RupeeTally! This guide will walk you through the process of setting up your account and configuring your personal finance dashboard to match your financial needs.</p>
      
      <h3>Step 1: Creating Your Account</h3>
      
      <p>To get started with RupeeTally, follow these simple steps:</p>
      
      <ol>
        <li>Visit the <a href="/signup">RupeeTally signup page</a></li>
        <li>Enter your email address</li>
        <li>Create a strong, secure password</li>
        <li>Click "Create Account"</li>
      </ol>
      
      <p>You'll receive a verification email. Click the link in the email to verify your account and proceed to the next step.</p>
      
      <h3>Step 2: Setting Up Your Profile</h3>
      
      <p>Once your account is verified, you'll be prompted to set up your profile. This includes:</p>
      
      <ul>
        <li>Your name and basic information</li>
        <li>Currency preferences (INR by default)</li>
        <li>Monthly income (optional, but recommended for budget features)</li>
        <li>Initial account balance (if you want to start tracking from a specific amount)</li>
      </ul>
      
      <p>Don't worry—all of this information can be updated later from your profile settings.</p>
    `
  },
  {
    id: "import-transactions",
    title: "How to Import Bank Statements",
    description: "Learn how to seamlessly import your bank statements from major Indian banks into RupeeTally.",
    category: "Getting Started",
    image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?q=80&w=1000&auto=format&fit=crop",
    readTime: 7,
    difficulty: "Beginner",
    featuredOrder: 2,
    content: `
      <h2>Importing Bank Statements into RupeeTally</h2>
      
      <p>Manually entering each transaction can be time-consuming. RupeeTally simplifies your financial management by allowing you to import statements directly from most major Indian banks.</p>
      
      <h3>Supported Banks and Statement Formats</h3>
      
      <p>RupeeTally supports statement imports from all major Indian banks, including SBI, HDFC, ICICI, Axis Bank, and many more.</p>
      
      <h4>Supported Formats:</h4>
      <ul>
        <li>PDF statements (most banks)</li>
        <li>Excel (.xls, .xlsx) files</li>
        <li>CSV files</li>
      </ul>
    `
  },
  {
    id: "budget-guide",
    title: "Creating Effective Budgets",
    description: "Master the art of budgeting with RupeeTally's powerful budget tools tailored for Indian households.",
    category: "Budgeting",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1000&auto=format&fit=crop",
    readTime: 8,
    difficulty: "Intermediate",
    featuredOrder: 3,
    content: `
      <h2>Creating Effective Budgets in RupeeTally</h2>
      
      <p>A well-planned budget is the foundation of financial success. This guide will help you create budgets that work for your unique financial situation.</p>
      
      <h3>Understanding Budget Types in RupeeTally</h3>
      
      <p>RupeeTally offers different budgeting approaches to match your financial style:</p>
      
      <ul>
        <li><strong>Category Budgets:</strong> Set limits for specific expense categories</li>
        <li><strong>Monthly Budgets:</strong> Create a comprehensive plan for all expenses in a month</li>
        <li><strong>Project Budgets:</strong> Track spending for specific events or goals</li>
      </ul>
    `
  }
];

export default function GuideDetails() {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }, []);

  // Get guide ID from URL
  const [, params] = useRoute("/guides/:id");
  const guideId = params?.id;
  
  // Find the guide that matches the ID
  const guide = guides.find(guide => guide.id === guideId);
  
  // State for related guides
  const [relatedGuides, setRelatedGuides] = useState<typeof guides>([]);
  
  // Find related guides based on category and difficulty
  useEffect(() => {
    if (guide) {
      const related = guides
        .filter(g => g.id !== guide.id) // exclude current guide
        .filter(g => g.category === guide.category || g.difficulty === guide.difficulty)
        .slice(0, 3); // limit to 3 guides
      
      setRelatedGuides(related);
    }
  }, [guide]);

  // If guide not found
  if (!guide) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <h2 className="text-2xl font-bold mb-4">Guide Not Found</h2>
          <p className="text-muted-foreground mb-6">The guide you're looking for doesn't exist or may have been moved.</p>
          <Link href="/guides">
            <Button>Back to Guides</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header with back button */}
      <header className="container mx-auto py-6 px-4">
        <Link href="/guides">
          <Button variant="ghost" className="flex items-center">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Guides
          </Button>
        </Link>
      </header>

      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          {/* Guide header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Badge className="mb-4">{guide.category}</Badge>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">{guide.title}</h1>
            
            <div className="flex flex-wrap items-center gap-4 mb-6 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{guide.readTime} min read</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                <span>{guide.difficulty}</span>
              </div>
            </div>
          </motion.div>
          
          {/* Featured image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-10"
          >
            <div className="aspect-video w-full rounded-lg overflow-hidden">
              <img
                src={guide.image}
                alt={guide.title}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
          
          {/* Guide content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="prose prose-lg dark:prose-invert prose-headings:font-bold prose-headings:text-foreground prose-p:text-muted-foreground max-w-none mb-16"
            dangerouslySetInnerHTML={{ __html: guide.content }}
          />
          
          {/* Related guides */}
          {relatedGuides.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mb-12"
            >
              <h2 className="text-2xl font-bold mb-6">Related Guides</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedGuides.map((relatedGuide) => (
                  <Card key={relatedGuide.id} className="overflow-hidden">
                    <div className="aspect-[4/3] relative">
                      <img
                        src={relatedGuide.image}
                        alt={relatedGuide.title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                      />
                    </div>
                    <CardHeader className="p-4">
                      <CardTitle className="text-lg line-clamp-2">{relatedGuide.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <CardDescription className="line-clamp-2">
                        {relatedGuide.description}
                      </CardDescription>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                      <Link href={`/guides/${relatedGuide.id}`}>
                        <Button variant="outline" size="sm">Read Guide</Button>
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </motion.div>
          )}
          
          {/* Navigation between guides */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-col sm:flex-row justify-between items-center border-t pt-8"
          >
            <Link href="/guides">
              <Button variant="outline" className="mb-4 sm:mb-0 flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                All Guides
              </Button>
            </Link>
            
            <Link href="/contact">
              <Button>
                <span>Need Help?</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </main>
    </div>
  );
}