import { useState, useEffect } from 'react';
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Badge } from "@/components/ui/badge";
import { ArrowRight, BarChart2, CreditCard, DollarSign, FileText, LineChart, PieChart, Smartphone, Users } from "lucide-react";
import EmptyStateDashboard from '@/components/EmptyStateDashboard';
import MobilePreview from '@/components/MobilePreview';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const scaleUp = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

const slideInRight = {
  hidden: { x: 100, opacity: 0 },
  visible: { 
    x: 0, 
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20
    }
  }
};

const slideInLeft = {
  hidden: { x: -100, opacity: 0 },
  visible: { 
    x: 0, 
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20
    }
  }
};

const FloatingGradientOrb = () => {
  return (
    <div className="absolute top-0 right-0 -z-10 overflow-hidden">
      <div className="absolute -top-[10rem] -right-[10rem] w-[40rem] h-[40rem] rounded-full bg-gradient-to-br from-indigo-500/30 via-blue-500/30 to-purple-600/30 blur-3xl opacity-70 animate-blob" />
    </div>
  );
};

const Particles = () => {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {Array.from({ length: 30 }).map((_, i) => (
        <div 
          key={i}
          className="absolute rounded-full bg-primary/10"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 8 + 2}px`,
            height: `${Math.random() * 8 + 2}px`,
            opacity: Math.random() * 0.5 + 0.3,
            animation: `float ${Math.random() * 10 + 10}s linear infinite`,
            animationDelay: `${Math.random() * 5}s`
          }}
        />
      ))}
    </div>
  );
};

// Feature cards and other UI components are now implemented directly in the relevant sections

export default function Landing() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  
  // Parallax effects
  const heroImageY = useTransform(scrollY, [0, 300], [0, 50]);
  const heroTextY = useTransform(scrollY, [0, 300], [0, -30]);
  
  // Track scrolling for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/60 flex flex-col">
      {/* Navbar */}
      <header 
        className={`sticky top-0 z-50 w-full transition-all duration-200 ${
          isScrolled 
            ? 'backdrop-blur-lg bg-background/80 border-b shadow-sm' 
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <BarChart2 className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">FinTrackr</span>
          </div>
          <nav className="hidden md:flex gap-6 items-center">
            <a href="#features" className="text-sm font-medium hover:text-primary transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="text-sm font-medium hover:text-primary transition-colors">
              How It Works
            </a>
            <a href="#faq" className="text-sm font-medium hover:text-primary transition-colors">
              FAQ
            </a>
            <Link href="/login">
              <Button variant="outline" size="sm">Log In</Button>
            </Link>
            <Link href="/signup">
              <Button size="sm">Sign Up Free</Button>
            </Link>
          </nav>
          <div className="flex md:hidden">
            <Link href="/login">
              <Button variant="ghost" size="sm" className="mr-2">Log In</Button>
            </Link>
            <Link href="/signup">
              <Button size="sm">Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero section */}
      <section className="relative py-16 md:py-28 lg:py-36 container px-4 md:px-6 mx-auto overflow-hidden bg-grid">
        <FloatingGradientOrb />
        <Particles />
        
        {/* Background Glow */}
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-primary/30 rounded-full blur-3xl opacity-30 animate-pulse-slow" />
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-indigo-500/30 rounded-full blur-3xl opacity-30 animate-pulse-slow" />
        
        <div className="flex flex-col lg:flex-row gap-12 items-center relative z-10">
          <motion.div 
            className="flex-1 space-y-8"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            style={{ y: heroTextY }}
          >
            <motion.div className="space-y-4" variants={fadeIn}>
              <Badge 
                variant="outline" 
                className="border-primary/20 bg-primary/10 text-primary px-4 py-1.5 text-sm backdrop-blur-sm"
              >
                <span className="animate-pulse mr-1.5 relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                Powerful Expense Tracker - Built for India
              </Badge>
              
              <h1 className="text-4xl md:text-6xl font-bold tracking-tighter leading-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">
                Take Control of Your Financial Future
              </h1>
              
              <p className="text-muted-foreground text-lg md:text-xl max-w-[600px] leading-relaxed">
                Track expenses, manage budgets, visualize investments, and optimize your financial health
                with our comprehensive, secure, and easy-to-use expense tracking platform.
              </p>
            </motion.div>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              variants={fadeIn}
            >
              <Link href="/signup">
                <Button size="lg" className="w-full sm:w-auto group relative overflow-hidden bg-gradient-to-r from-primary to-blue-600 hover:from-blue-600 hover:to-primary transition-all duration-300">
                  <span className="relative z-10 flex items-center">
                    Start for Free
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-primary/80 to-blue-600/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </Button>
              </Link>
              
              <a href="#how-it-works">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="w-full sm:w-auto border-primary/20 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300"
                >
                  Learn More
                </Button>
              </a>
            </motion.div>
            
            <motion.div 
              className="flex items-center gap-3 text-sm text-muted-foreground"
              variants={fadeIn}
            >
              <div className="flex -space-x-2">
                {['BJ', 'SK', 'RK', '+'].map((initials, index) => (
                  <motion.div 
                    key={initials}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-medium ${
                      index === 0 ? "bg-primary/20 text-primary" :
                      index === 1 ? "bg-secondary/20 text-secondary" :
                      index === 2 ? "bg-destructive/20 text-destructive" :
                      "bg-primary/20 text-primary"
                    } shadow-md`}
                  >
                    {initials}
                  </motion.div>
                ))}
              </div>
              <span>Trusted by 1,000+ Indian users</span>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="flex-1 w-full max-w-md lg:max-w-none"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            style={{ y: heroImageY }}
          >
            <div className="relative z-10 glass-card rounded-2xl border border-primary/10 shadow-xl overflow-hidden backdrop-blur-md">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-indigo-500/5 z-0"></div>
              <div className="relative z-10 p-1">
                <EmptyStateDashboard />
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl"></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features section */}
      <section id="features" className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/5 via-secondary/10 to-secondary/5 bg-grid"></div>
        <div className="absolute -bottom-80 -right-80 w-[40rem] h-[40rem] rounded-full bg-primary/5 blur-3xl opacity-50"></div>
        <div className="absolute -top-80 -left-80 w-[40rem] h-[40rem] rounded-full bg-indigo-500/5 blur-3xl opacity-50"></div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div 
            className="text-center space-y-4 mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Badge variant="outline" className="border-primary/20 bg-primary/10 text-primary px-4 py-1.5 text-sm mb-4 mx-auto">
              Powerful Features
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground/90 to-foreground/80">
              Everything You Need For Financial Success
            </h2>
            <p className="text-muted-foreground md:text-xl max-w-3xl mx-auto">
              Our comprehensive suite of tools helps you manage every aspect of your finances
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div variants={fadeIn}>
              <div className="relative group overflow-hidden rounded-2xl border border-primary/10 bg-card/50 p-8 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="relative z-10">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                    <DollarSign className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors duration-300">Expense Tracking</h3>
                  <p className="text-muted-foreground">Easily record and categorize your expenses with a simple interface. Import bank statements for automatic processing.</p>
                </div>
                <div className="absolute top-0 right-0 -mt-10 -mr-10 h-40 w-40 rounded-full bg-primary/5 blur-xl group-hover:bg-primary/10 transition-colors duration-500"></div>
              </div>
            </motion.div>
            
            <motion.div variants={fadeIn}>
              <div className="relative group overflow-hidden rounded-2xl border border-primary/10 bg-card/50 p-8 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="relative z-10">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                    <CreditCard className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors duration-300">Budget Management</h3>
                  <p className="text-muted-foreground">Create custom budgets by category, set goals, and get alerts when you're approaching your limits.</p>
                </div>
                <div className="absolute top-0 right-0 -mt-10 -mr-10 h-40 w-40 rounded-full bg-primary/5 blur-xl group-hover:bg-primary/10 transition-colors duration-500"></div>
              </div>
            </motion.div>
            
            <motion.div variants={fadeIn}>
              <div className="relative group overflow-hidden rounded-2xl border border-primary/10 bg-card/50 p-8 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="relative z-10">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                    <PieChart className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors duration-300">Visual Analytics</h3>
                  <p className="text-muted-foreground">Gain insights with beautiful charts and graphs that show your spending patterns and financial health.</p>
                </div>
                <div className="absolute top-0 right-0 -mt-10 -mr-10 h-40 w-40 rounded-full bg-primary/5 blur-xl group-hover:bg-primary/10 transition-colors duration-500"></div>
              </div>
            </motion.div>
            
            <motion.div variants={fadeIn}>
              <div className="relative group overflow-hidden rounded-2xl border border-primary/10 bg-card/50 p-8 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="relative z-10">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                    <FileText className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors duration-300">Statement Import</h3>
                  <p className="text-muted-foreground">Automatically import and parse bank statements from all major Indian banks in PDF or Excel format.</p>
                </div>
                <div className="absolute top-0 right-0 -mt-10 -mr-10 h-40 w-40 rounded-full bg-primary/5 blur-xl group-hover:bg-primary/10 transition-colors duration-500"></div>
              </div>
            </motion.div>
            
            <motion.div variants={fadeIn}>
              <div className="relative group overflow-hidden rounded-2xl border border-primary/10 bg-card/50 p-8 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="relative z-10">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                    <Users className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors duration-300">Money Lending Tracker</h3>
                  <p className="text-muted-foreground">Keep track of money borrowed or lent to friends and family with due dates and status tracking.</p>
                </div>
                <div className="absolute top-0 right-0 -mt-10 -mr-10 h-40 w-40 rounded-full bg-primary/5 blur-xl group-hover:bg-primary/10 transition-colors duration-500"></div>
              </div>
            </motion.div>
            
            <motion.div variants={fadeIn}>
              <div className="relative group overflow-hidden rounded-2xl border border-primary/10 bg-card/50 p-8 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="relative z-10">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                    <LineChart className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors duration-300">Investment Tracking</h3>
                  <p className="text-muted-foreground">Monitor your investments, SIPs, and portfolio performance with projected returns visualization.</p>
                </div>
                <div className="absolute top-0 right-0 -mt-10 -mr-10 h-40 w-40 rounded-full bg-primary/5 blur-xl group-hover:bg-primary/10 transition-colors duration-500"></div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center space-y-3 mb-12">
            <h2 className="text-2xl md:text-4xl font-bold">How FinTrackr Works</h2>
            <p className="text-muted-foreground md:text-lg max-w-2xl mx-auto">
              Get started in minutes and take control of your finances
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">1</div>
              <h3 className="text-xl font-semibold">Create Your Account</h3>
              <p className="text-muted-foreground">Sign up for free and create your secure personal account in seconds.</p>
            </div>
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">2</div>
              <h3 className="text-xl font-semibold">Import Your Data</h3>
              <p className="text-muted-foreground">Upload bank statements or start tracking expenses manually with our easy interface.</p>
            </div>
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">3</div>
              <h3 className="text-xl font-semibold">Gain Financial Insights</h3>
              <p className="text-muted-foreground">View beautiful visualizations and make smarter financial decisions with detailed analytics.</p>
            </div>
          </div>
        </div>
      </section>

      {/* App preview */}
      <section className="py-16 md:py-24 bg-muted/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row gap-8 items-center">
            <div className="flex-1 space-y-6">
              <Badge variant="outline" className="border-primary/20 bg-primary/10 text-primary">
                Mobile Responsive
              </Badge>
              <h2 className="text-2xl md:text-4xl font-bold">Access Your Finances Anywhere</h2>
              <p className="text-muted-foreground">
                Our platform works beautifully on any device - desktop, tablet, or mobile. 
                Track your expenses on the go and stay in control of your finances wherever you are.
              </p>
              <div className="flex gap-3">
                <Button variant="default">
                  <Smartphone className="mr-2 h-4 w-4" />
                  Try on Mobile
                </Button>
              </div>
            </div>
            <div className="flex-1 p-4 rounded-lg border bg-card shadow-sm w-full max-w-md flex justify-center">
              <MobilePreview />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center space-y-3 mb-12">
            <h2 className="text-2xl md:text-4xl font-bold">Frequently Asked Questions</h2>
            <p className="text-muted-foreground md:text-lg max-w-2xl mx-auto">
              Everything you need to know about FinTrackr
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Is FinTrackr free to use?</AccordionTrigger>
                <AccordionContent>
                  Yes! FinTrackr is completely free to use with all core features included. We may introduce premium features in the future, but our commitment is to keep the essential expense tracking functionality free for everyone.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Is my financial data secure?</AccordionTrigger>
                <AccordionContent>
                  Absolutely. We take security very seriously. All your data is encrypted, and we never share your financial information with third parties. Your bank statements are securely processed and stored with industry-standard encryption.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Which Indian banks are supported?</AccordionTrigger>
                <AccordionContent>
                  FinTrackr supports statement imports from all major Indian banks including HDFC, SBI, ICICI, Axis, Kotak, Yes Bank, and many more. Our system can parse most standard PDF and Excel statement formats.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>Can I track investments and SIPs?</AccordionTrigger>
                <AccordionContent>
                  Yes! FinTrackr includes comprehensive investment tracking features. You can track your mutual funds, stocks, gold, and SIPs. The platform helps you visualize your investment growth and projected returns.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger>How do I get started?</AccordionTrigger>
                <AccordionContent>
                  Getting started is easy! Just sign up for a free account, and you'll be guided through the setup process. You can begin by manually adding transactions or import a bank statement to quickly populate your expense history.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-primary/5">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4 max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-4xl font-bold">Ready to Transform Your Financial Life?</h2>
            <p className="text-muted-foreground md:text-lg">
              Join thousands of users who are taking control of their finances with FinTrackr.
              Get started for free today!
            </p>
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Link href="/signup">
                <Button size="lg" className="w-full sm:w-auto">
                  Create Free Account
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Already have an account? Log In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/30 py-12 mt-auto">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <BarChart2 className="h-5 w-5 text-primary" />
                <span className="font-bold">FinTrackr</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Your complete financial tracking solution designed for Indian users.
              </p>
              <p className="text-xs text-muted-foreground">Made with ❤️ in India</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Features</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-muted-foreground hover:text-primary">Expense Tracking</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">Budget Management</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">Statement Import</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">Investment Tracking</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">Reports & Analytics</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-muted-foreground hover:text-primary">About Us</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">Contact</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">Careers</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">Blog</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/privacy-policy" className="text-muted-foreground hover:text-primary">Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-muted-foreground hover:text-primary">Terms of Service</Link></li>
                <li><Link href="/security" className="text-muted-foreground hover:text-primary">Security</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-6 border-t text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} FinTrackr. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <Card className="transition-all hover:shadow-md">
      <CardHeader>
        <div className="p-2 w-fit rounded-md bg-primary/10 mb-3">
          {icon}
        </div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardContent>
    </Card>
  );
}