import React from 'react';
import { Badge } from "@/components/ui/badge";

const HowItWorksSection = () => {
  const steps = [
    {
      number: "01",
      title: "Sign up for free",
      description: "Create your account in seconds with just an email. No credit card required to get started."
    },
    {
      number: "02",
      title: "Track your expenses",
      description: "Add your daily expenses manually or import bank statements to automatically categorize transactions."
    },
    {
      number: "03",
      title: "Set budgets",
      description: "Create weekly or monthly budgets for different categories to keep your spending in check."
    },
    {
      number: "04",
      title: "Visualize your finances",
      description: "Get insights with beautiful charts and graphs that help you understand your spending patterns."
    }
  ];

  return (
    <section id="how-it-works" className="py-16 md:py-24 container px-4 md:px-6 mx-auto">
      <div className="space-y-12">
        <div className="text-center space-y-4 max-w-[800px] mx-auto animate-fade-in">
          <Badge variant="outline" className="px-3 py-1 border-primary/20 bg-primary/10 text-foreground">
            How it works
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">
            Simple steps to financial clarity
          </h2>
          <p className="text-muted-foreground text-lg max-w-[600px] mx-auto">
            Getting started with FinTrackr is easy. Follow these simple steps to take control of your finances.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="relative animate-fade-in"
              style={{ animationDelay: `${0.1 * index}s` }}
            >
              {/* Connecting line between steps */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-primary/30 to-transparent z-0" style={{ width: 'calc(100% - 3rem)' }}></div>
              )}
              
              {/* Step number */}
              <div className="mb-4 text-4xl font-bold text-primary/20">
                {step.number}
              </div>
              
              {/* Step content */}
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Stats/Testimonial section */}
        <div className="mt-24 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-8 animate-fade-in">
            <div className="grid grid-cols-2 gap-4 md:gap-8">
              <div className="p-6 rounded-xl border bg-card space-y-2">
                <p className="text-3xl md:text-4xl font-bold text-primary">5000+</p>
                <p className="text-muted-foreground">Active Users</p>
              </div>
              <div className="p-6 rounded-xl border bg-card space-y-2">
                <p className="text-3xl md:text-4xl font-bold text-primary">₹10Cr+</p>
                <p className="text-muted-foreground">Expenses Tracked</p>
              </div>
              <div className="p-6 rounded-xl border bg-card space-y-2">
                <p className="text-3xl md:text-4xl font-bold text-primary">15%</p>
                <p className="text-muted-foreground">Avg. Savings Increase</p>
              </div>
              <div className="p-6 rounded-xl border bg-card space-y-2">
                <p className="text-3xl md:text-4xl font-bold text-primary">12K+</p>
                <p className="text-muted-foreground">Transactions Daily</p>
              </div>
            </div>
          </div>
          
          <div className="p-8 rounded-xl border bg-card animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <div className="flex flex-col space-y-4">
              <div className="flex items-center space-x-2">
                <span className="text-yellow-500">★★★★★</span>
                <span className="text-muted-foreground">5.0 rating</span>
              </div>
              <blockquote className="text-xl md:text-2xl font-medium italic">
                "RupeeTally has completely changed how I manage my finances. I've been able to save 20% more each month!"
              </blockquote>
              <div className="flex items-center mt-4">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-primary-foreground"></div>
                <div className="ml-3">
                  <p className="font-medium">Priya Sharma</p>
                  <p className="text-sm text-muted-foreground">Product Manager</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;