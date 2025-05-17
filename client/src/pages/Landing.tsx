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

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {[
              {
                number: 1,
                title: "Create Your Account",
                description: "Sign up for free and create your secure personal account in seconds."
              },
              {
                number: 2,
                title: "Import Your Data",
                description: "Upload bank statements or start tracking expenses manually with our easy interface."
              },
              {
                number: 3,
                title: "Gain Financial Insights",
                description: "View beautiful visualizations and make smarter financial decisions with detailed analytics."
              }
            ].map((step, index) => (
              <motion.div 
                key={step.number}
                className="relative group"
                variants={fadeIn}
              >
                <div className="flex flex-col items-center text-center space-y-5 rounded-lg p-6 bg-card/50 backdrop-blur-sm border border-primary/10 shadow-md hover:shadow-lg transition-all duration-300">
                  <div className="relative">
                    <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl group-hover:scale-110 transition-transform duration-500">
                      {step.number}
                    </div>
                    <svg className="absolute -top-2 -right-2 w-6 h-6 text-primary animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold group-hover:text-primary transition-colors duration-300">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
                {index < 2 && (
                  <motion.div 
                    className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 }}
                  >
                    <ArrowRight className="h-8 w-8 text-primary/50" />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* App preview */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-background/80 bg-grid"></div>
        <div className="absolute -top-40 left-1/3 w-[30rem] h-[30rem] rounded-full bg-gradient-to-br from-violet-500/20 via-blue-500/20 to-indigo-500/20 blur-3xl opacity-40"></div>
        <div className="absolute top-1/3 -right-40 w-[30rem] h-[30rem] rounded-full bg-gradient-to-tr from-blue-500/10 via-indigo-500/10 to-purple-500/10 blur-3xl opacity-30"></div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <motion.div 
              className="flex-1 space-y-8"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <Badge 
                variant="outline" 
                className="border-primary/20 bg-primary/10 text-primary px-4 py-1.5 text-sm backdrop-blur-sm"
              >
                <Smartphone className="mr-2 h-4 w-4" />
                Mobile Responsive
              </Badge>
              
              <h2 className="text-3xl md:text-5xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-br from-foreground via-foreground/90 to-foreground/80">
                Access Your Finances Anywhere
              </h2>
              
              <p className="text-muted-foreground text-lg leading-relaxed">
                Our platform works beautifully on any device - desktop, tablet, or mobile. 
                Track your expenses on the go and stay in control of your finances wherever you are.
              </p>
              
              <motion.div 
                className="pt-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <Button 
                  size="lg"
                  className="group relative overflow-hidden bg-gradient-to-r from-primary/90 to-indigo-600/90 hover:from-indigo-600/90 hover:to-primary/90 transition-all duration-500"
                >
                  <span className="relative z-10 flex items-center">
                    <Smartphone className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                    Try on Mobile
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-primary/80 to-indigo-600/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </Button>
                
                <div className="flex items-center gap-3 mt-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Real-time sync</span>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Full functionality</span>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Fast & responsive</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="flex-1 flex justify-center items-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative">
                {/* Glowing background effect */}
                <div className="absolute inset-0 -m-10 bg-gradient-to-tr from-primary/20 via-blue-500/10 to-indigo-500/20 rounded-full blur-3xl animate-pulse-slow"></div>
                
                {/* Decorative floating elements */}
                <div className="absolute -top-10 -right-10 w-20 h-20 border border-primary/20 rounded-lg backdrop-blur-md rotate-12 animate-float opacity-80"></div>
                <div className="absolute -bottom-10 -left-10 w-20 h-20 border border-primary/20 rounded-lg backdrop-blur-md -rotate-12 animate-float opacity-80" style={{ animationDelay: '2s' }}></div>
                
                {/* Phone mockup */}
                <div className="relative z-10 p-8 rounded-[3rem] bg-gradient-to-b from-gray-900 to-gray-800 border-[14px] border-gray-800 shadow-2xl">
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 w-1/3 h-5 bg-gray-800 rounded-b-xl"></div>
                  <MobilePreview />
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-1/3 h-1 bg-gray-600 rounded-full"></div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="relative py-24 md:py-32 overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background to-background/80"></div>
        <div className="absolute -bottom-20 -left-20 w-[30rem] h-[30rem] rounded-full bg-gradient-to-tr from-primary/5 via-indigo-500/5 to-primary/5 blur-3xl opacity-30"></div>
        <div className="absolute -top-20 -right-20 w-[30rem] h-[30rem] rounded-full bg-gradient-to-bl from-indigo-500/5 via-primary/5 to-indigo-500/5 blur-3xl opacity-30"></div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div 
            className="text-center space-y-4 mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Badge variant="outline" className="border-primary/20 bg-primary/10 text-primary px-4 py-1.5 text-sm mb-4 mx-auto">
              FAQ
            </Badge>
            
            <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground/90 to-foreground/80">
              Frequently Asked Questions
            </h2>
            
            <p className="text-muted-foreground md:text-xl max-w-2xl mx-auto">
              Everything you need to know about FinTrackr
            </p>
          </motion.div>

          <motion.div 
            className="max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="rounded-2xl backdrop-blur-sm border border-primary/10 shadow-xl overflow-hidden bg-card/20">
              <Accordion type="single" collapsible className="w-full">
                {[
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
                ].map((faq, index) => (
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
            
            <motion.div 
              className="flex justify-center mt-10"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              <Link href="/signup">
                <Button 
                  variant="outline" 
                  className="border-primary/20 bg-background/50 text-primary hover:bg-primary/5 hover:border-primary/30 transition-all duration-300"
                >
                  Still have questions? Get in touch
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-background to-background"></div>
        <div className="absolute left-0 right-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
        
        {/* Animated background gradient */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-[40rem] left-1/2 transform -translate-x-1/2 w-[80rem] h-[80rem] rounded-full bg-gradient-to-tr from-primary/20 via-indigo-600/20 to-blue-600/20 blur-3xl opacity-30 animate-blob"></div>
        </div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div 
            className="relative max-w-4xl mx-auto glass-card rounded-3xl border border-primary/20 shadow-2xl overflow-hidden p-10 md:p-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-primary/20 blur-3xl"></div>
            <div className="absolute -bottom-24 -left-24 w-48 h-48 rounded-full bg-blue-500/20 blur-3xl"></div>
            
            <div className="flex flex-col items-center text-center space-y-6 relative z-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <Badge variant="outline" className="px-6 py-2 text-lg font-medium border-primary/30 bg-primary/10 text-primary backdrop-blur-sm mb-6">
                  Get Started Today
                </Badge>
              </motion.div>
              
              <motion.h2 
                className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-primary via-blue-600 to-indigo-600"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                Ready to Transform Your Financial Life?
              </motion.h2>
              
              <motion.p 
                className="text-xl md:text-2xl text-foreground/80 max-w-2xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                Join thousands of users who are taking control of their finances with FinTrackr.
                Get started for free today!
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 pt-6 w-full sm:w-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <Link href="/signup" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full text-lg group relative overflow-hidden bg-gradient-to-r from-primary to-blue-600 hover:from-blue-600 hover:to-primary transition-all duration-500 px-8 py-6 h-auto">
                    <motion.span 
                      className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary/40 to-blue-600/40"
                      initial={{ x: "100%", opacity: 0 }}
                      whileHover={{ x: "0%", opacity: 1 }}
                      transition={{ duration: 0.4 }}
                    />
                    <span className="relative z-10 flex items-center">
                      Create Free Account
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Button>
                </Link>
                
                <Link href="/login" className="w-full sm:w-auto">
                  <Button variant="outline" size="lg" className="w-full text-lg border-primary/20 bg-background/50 hover:bg-primary/5 hover:border-primary/30 transition-all duration-300 px-8 py-6 h-auto">
                    Already have an account? Log In
                  </Button>
                </Link>
              </motion.div>
              
              <motion.div 
                className="flex items-center gap-3 text-sm text-muted-foreground pt-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7, duration: 0.6 }}
              >
                <div className="flex items-center gap-1">
                  <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>No credit card required</span>
                </div>
                
                <div className="flex items-center gap-1">
                  <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Free forever plan</span>
                </div>
                
                <div className="flex items-center gap-1">
                  <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Cancel anytime</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-muted/10 border-t border-primary/10 py-16 mt-auto overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20"></div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <BarChart2 className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">FinTrackr</span>
              </div>
              <p className="text-muted-foreground">
                Your complete financial tracking solution designed for Indian users.
              </p>
              <p className="text-muted-foreground flex items-center gap-1">
                Made with 
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                </span>
                in India
              </p>
              
              <div className="flex gap-4 pt-2">
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                  <span className="sr-only">GitHub</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                  <span className="sr-only">LinkedIn</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              </div>
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