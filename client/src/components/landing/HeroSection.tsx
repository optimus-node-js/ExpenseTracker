import React from 'react';
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative py-16 md:py-28 lg:py-36 container px-4 md:px-6 mx-auto overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid opacity-20"></div>
      <div className="absolute -top-[10rem] -right-[10rem] w-[40rem] h-[40rem] rounded-full bg-gradient-to-br from-indigo-500/30 via-blue-500/30 to-purple-600/30 blur-3xl opacity-70 animate-blob"></div>
      <div className="absolute inset-0 overflow-hidden">
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

      {/* Hero content */}
      <div className="relative grid gap-6 lg:grid-cols-2 lg:gap-10 xl:gap-16 items-center">
        <div className="space-y-8 max-w-xl animate-fade-in">
          <div className="space-y-4">
            <Badge variant="outline" className="px-3 py-1 border-primary/20 bg-primary/10 text-foreground">
              Financial management made simple
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">
              Take Control of Your Financial Future
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-[600px]">
              Track expenses, manage budgets, and visualize your financial journey with our comprehensive dashboard built for Indian users.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/signup">
              <Button size="lg" className="gap-2 w-full sm:w-auto animate-fade-in" style={{ animationDelay: "0.2s" }}>
                Start for free
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" size="lg" className="w-full sm:w-auto animate-fade-in" style={{ animationDelay: "0.3s" }}>
                Log in
              </Button>
            </Link>
          </div>
          <div className="pt-2 text-muted-foreground text-sm flex items-center gap-2 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <span className="h-1 w-1 rounded-full bg-primary"></span>
            No credit card required
          </div>
        </div>

        {/* Dashboard preview */}
        <div className="relative lg:pl-10 animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <div className="relative z-10 rounded-xl overflow-hidden shadow-2xl border bg-background animate-pulse-slow">
            <img 
              src="https://placehold.co/800x500/0066CC/FFFFFF?text=RupeeTally+Dashboard" 
              alt="RupeeTally Dashboard"  
              className="w-full h-auto rounded-xl shadow-lg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
          </div>
          
          {/* Floating cards */}
          <div className="absolute top-[20%] -left-20 animate-fade-in-delayed p-3 rounded-xl shadow-lg border bg-background/90 backdrop-blur-sm" style={{ animationDelay: "0.6s", maxWidth: "220px" }}>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium">Expense saved</p>
                <p className="text-lg font-bold">₹2,500</p>
              </div>
            </div>
          </div>
          
          <div className="absolute bottom-[15%] -right-5 animate-fade-in-delayed p-3 rounded-xl shadow-lg border bg-background/90 backdrop-blur-sm" style={{ animationDelay: "0.9s", maxWidth: "220px" }}>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium">Monthly growth</p>
                <p className="text-lg font-bold">+12.5%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;