import { useState } from 'react';
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

export default function Landing() {
  const [isScrolled, setIsScrolled] = useState(false);

  // Track scrolling for navbar styling
  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    });
  }

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
      <section className="py-12 md:py-24 lg:py-32 container px-4 md:px-6 mx-auto">
        <div className="flex flex-col lg:flex-row gap-8 items-center">
          <div className="flex-1 space-y-6">
            <div className="space-y-2">
              <Badge variant="outline" className="border-primary/20 bg-primary/10 text-primary">
                Powerful Expense Tracker - Built for India
              </Badge>
              <h1 className="text-3xl md:text-5xl font-bold tracking-tighter">
                Take Control of Your Financial Future
              </h1>
              <p className="text-muted-foreground text-sm md:text-base max-w-[600px]">
                Track expenses, manage budgets, visualize investments, and optimize your financial health
                with our comprehensive, secure, and easy-to-use expense tracking platform.
              </p>
            </div>
            <div className="flex flex-col md:flex-row gap-3">
              <Link href="/signup">
                <Button size="lg" className="w-full md:w-auto">
                  Start for Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <a href="#how-it-works">
                <Button variant="outline" size="lg" className="w-full md:w-auto">
                  Learn More
                </Button>
              </a>
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <div className="flex -space-x-2">
                <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-xs text-primary font-medium">BJ</div>
                <div className="h-8 w-8 rounded-full bg-secondary/20 flex items-center justify-center text-xs text-secondary font-medium">SK</div>
                <div className="h-8 w-8 rounded-full bg-destructive/20 flex items-center justify-center text-xs text-destructive font-medium">RK</div>
                <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-xs text-primary font-medium">+</div>
              </div>
              <span>Trusted by 1,000+ Indian users</span>
            </div>
          </div>
          <div className="flex-1 p-4 rounded-lg border bg-card shadow-sm w-full max-w-md lg:max-w-none">
            <div className="rounded-md shadow-md w-full aspect-video">
              <EmptyStateDashboard />
            </div>
          </div>
        </div>
      </section>

      {/* Features section */}
      <section id="features" className="bg-secondary/10 py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center space-y-3 mb-12">
            <h2 className="text-2xl md:text-4xl font-bold">Everything You Need For Financial Success</h2>
            <p className="text-muted-foreground md:text-lg max-w-2xl mx-auto">
              Our comprehensive suite of tools helps you manage every aspect of your finances
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard 
              icon={<DollarSign className="h-8 w-8 text-primary" />}
              title="Expense Tracking"
              description="Easily record and categorize your expenses with a simple interface. Import bank statements for automatic processing."
            />
            <FeatureCard 
              icon={<CreditCard className="h-8 w-8 text-primary" />}
              title="Budget Management"
              description="Create custom budgets by category, set goals, and get alerts when you're approaching your limits."
            />
            <FeatureCard 
              icon={<PieChart className="h-8 w-8 text-primary" />}
              title="Visual Analytics"
              description="Gain insights with beautiful charts and graphs that show your spending patterns and financial health."
            />
            <FeatureCard 
              icon={<FileText className="h-8 w-8 text-primary" />}
              title="Statement Import"
              description="Automatically import and parse bank statements from all major Indian banks in PDF or Excel format."
            />
            <FeatureCard 
              icon={<Users className="h-8 w-8 text-primary" />}
              title="Money Lending Tracker"
              description="Keep track of money borrowed or lent to friends and family with due dates and status tracking."
            />
            <FeatureCard 
              icon={<LineChart className="h-8 w-8 text-primary" />}
              title="Investment Tracking"
              description="Monitor your investments, SIPs, and portfolio performance with projected returns visualization."
            />
          </div>
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