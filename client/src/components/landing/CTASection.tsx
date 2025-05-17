import React from 'react';
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-20 md:py-32 container px-4 md:px-6 mx-auto relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid opacity-10"></div>
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
      <div className="absolute -top-[10rem] -right-[10rem] w-[40rem] h-[40rem] rounded-full bg-gradient-to-br from-blue-500/10 via-indigo-500/10 to-purple-600/10 blur-3xl opacity-70"></div>
      
      <div className="relative max-w-4xl mx-auto text-center space-y-8 z-10 animate-fade-in">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tighter">
          Ready to take control of your finances?
        </h2>
        <p className="text-muted-foreground text-lg md:text-xl max-w-[800px] mx-auto">
          Join thousands of users who are already tracking, managing, and growing their finances with RupeeTally.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Link href="/signup">
            <Button size="lg" className="gap-2 w-full sm:w-auto">
              Get started for free
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="/login">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              Log in
            </Button>
          </Link>
        </div>
        
        <p className="text-sm text-muted-foreground flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-4 pt-2">
          <span className="flex items-center gap-1">
            <span className="h-1 w-1 rounded-full bg-primary"></span>
            No credit card required
          </span>
          <span className="flex items-center gap-1">
            <span className="h-1 w-1 rounded-full bg-primary"></span>
            Free plan available
          </span>
          <span className="flex items-center gap-1">
            <span className="h-1 w-1 rounded-full bg-primary"></span>
            Cancel anytime
          </span>
        </p>
      </div>
    </section>
  );
};

export default CTASection;