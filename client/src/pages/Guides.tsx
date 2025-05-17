import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Search, BookOpen, Lightbulb, ArrowRight, Clock } from 'lucide-react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Guide types and data
type GuideCategory = 
  | 'All'
  | 'Getting Started'
  | 'Expense Tracking'
  | 'Budgeting'
  | 'Investments'
  | 'SIPs'
  | 'Loans'
  | 'Taxation'
  | 'Financial Planning';

type Guide = {
  id: string;
  title: string;
  description: string;
  category: GuideCategory;
  image: string;
  readTime: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  featuredOrder?: number;
};

export default function Guides() {
  // Sample guides data
  const guides: Guide[] = [
    {
      id: "setup-account",
      title: "Setting Up Your RupeeTally Account",
      description: "A comprehensive guide to creating and configuring your personal finance dashboard with RupeeTally.",
      category: "Getting Started",
      image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=1000&auto=format&fit=crop",
      readTime: 5,
      difficulty: "Beginner",
      featuredOrder: 1
    },
    {
      id: "import-transactions",
      title: "How to Import Bank Statements",
      description: "Learn how to seamlessly import your bank statements from major Indian banks into RupeeTally.",
      category: "Getting Started",
      image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?q=80&w=1000&auto=format&fit=crop",
      readTime: 7,
      difficulty: "Beginner",
      featuredOrder: 2
    },
    {
      id: "create-budget",
      title: "Creating Your First Budget",
      description: "A step-by-step guide to setting up personalized budgets for your spending categories.",
      category: "Budgeting",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1000&auto=format&fit=crop",
      readTime: 8,
      difficulty: "Beginner",
      featuredOrder: 3
    },
    {
      id: "track-expenses",
      title: "Tracking Daily Expenses Effectively",
      description: "Master the art of categorizing and tracking your daily expenses for better financial awareness.",
      category: "Expense Tracking",
      image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=1000&auto=format&fit=crop",
      readTime: 6,
      difficulty: "Beginner"
    },
    {
      id: "investment-portfolio",
      title: "Setting Up Your Investment Portfolio",
      description: "Learn how to track and manage your investments in stocks, mutual funds, and other assets.",
      category: "Investments",
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1000&auto=format&fit=crop",
      readTime: 10,
      difficulty: "Intermediate"
    },
    {
      id: "sip-calculator",
      title: "Using the SIP Calculator & Tracker",
      description: "Understand how to use RupeeTally's SIP calculator to plan and track your mutual fund investments.",
      category: "SIPs",
      image: "https://images.unsplash.com/photo-1565514158740-064f34bd6cfd?q=80&w=1000&auto=format&fit=crop",
      readTime: 8,
      difficulty: "Intermediate"
    },
    {
      id: "loan-management",
      title: "Managing Personal Loans & EMIs",
      description: "Keep track of your loans, EMIs, and lending activities with RupeeTally's loan management features.",
      category: "Loans",
      image: "https://images.unsplash.com/photo-1603796846097-bee99e4a601f?q=80&w=1000&auto=format&fit=crop",
      readTime: 9,
      difficulty: "Intermediate"
    },
    {
      id: "tax-planning",
      title: "Tax Planning with RupeeTally",
      description: "Use RupeeTally to identify tax-saving investments and plan your taxes more efficiently.",
      category: "Taxation",
      image: "https://images.unsplash.com/photo-1586486855514-8c633cc6fd29?q=80&w=1000&auto=format&fit=crop",
      readTime: 12,
      difficulty: "Advanced"
    },
    {
      id: "financial-goals",
      title: "Setting & Tracking Financial Goals",
      description: "Learn how to set measurable financial goals and track your progress with RupeeTally.",
      category: "Financial Planning",
      image: "https://images.unsplash.com/photo-1571512599940-7ac3c1973c29?q=80&w=1000&auto=format&fit=crop",
      readTime: 7,
      difficulty: "Beginner"
    },
    {
      id: "cash-flow-analysis",
      title: "Understanding Your Cash Flow",
      description: "Use RupeeTally's analytical tools to gain insights into your income and spending patterns.",
      category: "Financial Planning",
      image: "https://images.unsplash.com/photo-1524508762098-fd966ffb6ef9?q=80&w=1000&auto=format&fit=crop",
      readTime: 8,
      difficulty: "Intermediate"
    },
    {
      id: "automating-expense-tracking",
      title: "Automating Your Expense Tracking",
      description: "Set up rules and automated categorization to streamline your expense tracking workflow.",
      category: "Expense Tracking",
      image: "https://images.unsplash.com/photo-1589920025348-4af31f1d2085?q=80&w=1000&auto=format&fit=crop",
      readTime: 10,
      difficulty: "Advanced"
    },
    {
      id: "mobile-app-guide",
      title: "Using RupeeTally's Mobile App",
      description: "Get the most out of RupeeTally's mobile app for on-the-go financial management.",
      category: "Getting Started",
      image: "https://images.unsplash.com/photo-1559306421-3303d1bf3c3b?q=80&w=1000&auto=format&fit=crop",
      readTime: 6,
      difficulty: "Beginner"
    }
  ];

  // List of categories for filtering
  const categories: GuideCategory[] = [
    'All',
    'Getting Started',
    'Expense Tracking',
    'Budgeting',
    'Investments',
    'SIPs', 
    'Loans',
    'Taxation',
    'Financial Planning'
  ];

  // State for search and filtering
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<GuideCategory>("All");

  // Filter guides based on search query and category
  const filteredGuides = guides.filter(guide => {
    const matchesSearch = 
      guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === "All" || guide.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Get featured guides for the hero section
  const featuredGuides = guides
    .filter(guide => guide.featuredOrder !== undefined)
    .sort((a, b) => (a.featuredOrder || 0) - (b.featuredOrder || 0));

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

      <main className="container mx-auto px-4 py-8 md:py-12">
        {/* Hero section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <Badge variant="outline" className="mb-4">User Guides</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Financial Management Guides</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            Learn how to make the most of RupeeTally with our comprehensive guides, tutorials, and best practices for 
            managing your personal finances.
          </p>
          
          <div className="max-w-xl mx-auto mb-10">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search for guides..." 
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </motion.div>
        
        {/* Featured guides section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold mb-6">Featured Guides</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredGuides.map((guide, index) => (
              <Card 
                key={guide.id}
                className="overflow-hidden group hover:shadow-md transition-shadow"
              >
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={guide.image} 
                    alt={guide.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <CardHeader className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <Badge variant="outline">{guide.category}</Badge>
                    <div className="flex items-center text-muted-foreground text-sm">
                      <Clock className="h-3 w-3 mr-1" />
                      {guide.readTime} min read
                    </div>
                  </div>
                  <CardTitle className="text-xl">{guide.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <CardDescription className="line-clamp-2">
                    {guide.description}
                  </CardDescription>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Link href={`/guides/${guide.id}`}>
                    <Button className="w-full">Read Guide</Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </motion.div>
        
        {/* Category tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-10"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Browse by Category</h2>
          </div>
          
          <div className="overflow-x-auto pb-2">
            <div className="flex space-x-2 min-w-max">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </motion.div>
        
        {/* Guide listing */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-16"
        >
          {filteredGuides.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGuides.map((guide) => (
                <motion.div key={guide.id} variants={itemVariants}>
                  <Card className="h-full flex flex-col hover:shadow-md transition-shadow">
                    <div className="aspect-[3/2] relative overflow-hidden">
                      <img
                        src={guide.image}
                        alt={guide.title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge>{guide.difficulty}</Badge>
                      </div>
                    </div>
                    <CardHeader className="p-4">
                      <div className="flex justify-between items-center mb-2">
                        <Badge variant="outline">{guide.category}</Badge>
                        <div className="flex items-center text-muted-foreground text-sm">
                          <Clock className="h-3 w-3 mr-1" />
                          {guide.readTime} min read
                        </div>
                      </div>
                      <CardTitle className="line-clamp-2">{guide.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0 flex-1">
                      <CardDescription className="line-clamp-3">
                        {guide.description}
                      </CardDescription>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                      <Link href={`/guides/${guide.id}`}>
                        <Button variant="outline" className="w-full group">
                          <span>Read Guide</span>
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-xl font-semibold mb-2">No guides found</h3>
              <p className="text-muted-foreground mb-6">Try adjusting your search criteria or browse a different category.</p>
              <Button onClick={() => {setSearchQuery(""); setSelectedCategory("All");}}>View All Guides</Button>
            </div>
          )}
        </motion.div>
        
        {/* Tips & Resources section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold mb-6">Quick Tips & Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Quick tips card */}
            <Card className="bg-primary/5 p-6 border">
              <div className="flex items-start gap-4">
                <div className="mt-1">
                  <Lightbulb className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4">Financial Management Tips</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-primary/20 p-1 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <span className="text-muted-foreground">Use categories consistently for better insights and reports</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-primary/20 p-1 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <span className="text-muted-foreground">Set up recurring expenses to track subscriptions automatically</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-primary/20 p-1 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <span className="text-muted-foreground">Import statements monthly for more accurate tracking</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-primary/20 p-1 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <span className="text-muted-foreground">Review your budget performance weekly for better control</span>
                    </li>
                  </ul>
                  <Link href="/blog">
                    <Button variant="link" className="px-0 mt-4 gap-1">
                      Read more tips on our blog
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
            
            {/* Tutorials card */}
            <Card className="bg-card p-6 border">
              <div className="flex items-start gap-4">
                <div className="mt-1">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4">Video Tutorials</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-primary/20 p-1 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                          <polygon points="5 3 19 12 5 21 5 3"></polygon>
                        </svg>
                      </div>
                      <span className="text-muted-foreground">Getting Started with RupeeTally (5:30)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-primary/20 p-1 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                          <polygon points="5 3 19 12 5 21 5 3"></polygon>
                        </svg>
                      </div>
                      <span className="text-muted-foreground">Setting Up Budget Categories (4:15)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-primary/20 p-1 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                          <polygon points="5 3 19 12 5 21 5 3"></polygon>
                        </svg>
                      </div>
                      <span className="text-muted-foreground">Tracking Investments & SIPs (7:20)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-primary/20 p-1 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                          <polygon points="5 3 19 12 5 21 5 3"></polygon>
                        </svg>
                      </div>
                      <span className="text-muted-foreground">Mobile App Walkthrough (6:45)</span>
                    </li>
                  </ul>
                  <Link href="/guides/videos">
                    <Button variant="link" className="px-0 mt-4 gap-1">
                      View all video tutorials
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          </div>
        </motion.div>
        
        {/* Help section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-primary/5 rounded-lg p-8 md:p-12 text-center max-w-4xl mx-auto"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Need Additional Help?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            If you couldn't find the information you were looking for, our support team is ready to assist you with any questions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/faq">
              <Button variant="outline" className="gap-2">
                <BookOpen className="h-4 w-4" />
                Browse FAQs
              </Button>
            </Link>
            <Link href="/contact">
              <Button className="gap-2">
                Contact Support
              </Button>
            </Link>
          </div>
        </motion.div>
      </main>
    </div>
  );
}