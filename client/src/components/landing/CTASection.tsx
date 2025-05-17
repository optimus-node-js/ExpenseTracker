import React from 'react';
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

const CTASection = () => {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-background to-background"></div>
      <div className="absolute left-0 right-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
      
      {/* Animated background gradient */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-[40rem] left-1/2 transform -translate-x-1/2 w-[80rem] h-[80rem] rounded-full bg-gradient-to-tr from-primary/20 via-indigo-600/20 to-blue-600/20 blur-3xl opacity-30 animate-blob"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="relative max-w-4xl mx-auto glass-card rounded-3xl border border-primary/20 shadow-2xl overflow-hidden p-10 md:p-16 animate-fade-in">
          <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-primary/20 blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-48 h-48 rounded-full bg-blue-500/20 blur-3xl"></div>
          
          <div className="flex flex-col items-center text-center space-y-6 relative z-10">
            <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <Badge variant="outline" className="px-6 py-2 text-lg font-medium border-primary/30 bg-primary/10 text-primary backdrop-blur-sm mb-6">
                Get Started Today
              </Badge>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-primary via-blue-600 to-indigo-600 animate-fade-in" style={{ animationDelay: "0.3s" }}>
              Ready to Transform Your Financial Life?
            </h2>
            
            <p className="text-xl md:text-2xl text-foreground/80 max-w-2xl animate-fade-in" style={{ animationDelay: "0.4s" }}>
              Join thousands of users who are taking control of their finances with FinTrackr.
              Get started for free today!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-6 w-full sm:w-auto animate-fade-in" style={{ animationDelay: "0.5s" }}>
              <Link href="/signup" className="w-full sm:w-auto">
                <Button size="lg" className="w-full text-lg group relative overflow-hidden bg-gradient-to-r from-primary to-blue-600 hover:from-blue-600 hover:to-primary transition-all duration-500 px-8 py-6 h-auto">
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
            </div>
            
            <div className="flex items-center gap-3 text-sm text-muted-foreground pt-4 animate-fade-in" style={{ animationDelay: "0.7s" }}>
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;