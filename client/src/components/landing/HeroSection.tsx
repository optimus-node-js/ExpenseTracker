import React from 'react';
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import EmptyStateDashboard from '@/components/EmptyStateDashboard';

const HeroSection = () => {
  return (
    <section className="relative py-20 md:py-28 lg:py-32 container px-4 md:px-6 mx-auto overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid"></div>
      
      {/* Gradient orbs */}
      <div className="absolute top-0 right-0 -z-10 overflow-hidden">
        <div className="absolute -top-[10rem] -right-[10rem] w-[40rem] h-[40rem] rounded-full bg-gradient-to-br from-indigo-500/30 via-blue-500/30 to-purple-600/30 blur-3xl opacity-70 animate-blob" />
      </div>
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-primary/30 rounded-full blur-3xl opacity-30 animate-pulse-slow" />
      <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-indigo-500/30 rounded-full blur-3xl opacity-30 animate-pulse-slow" />
      
      {/* Particles */}
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
      
      <div className="flex flex-col lg:flex-row gap-12 items-center relative z-10">
        <div className="flex-1 space-y-8 animate-fade-in">
          <div className="space-y-4">
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
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
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
          </div>
          
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <div className="flex -space-x-2">
              {['BJ', 'SK', 'RK', '+'].map((initials, index) => (
                <div
                  key={initials}
                  className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-medium ${
                    index === 0 ? "bg-primary/20 text-primary" :
                    index === 1 ? "bg-secondary/20 text-secondary" :
                    index === 2 ? "bg-destructive/20 text-destructive" :
                    "bg-primary/20 text-primary"
                  } shadow-md animate-fade-in-delayed`}
                  style={{ 
                    animationDelay: `${0.5 + index * 0.1}s`,
                    animationFillMode: 'both'
                  }}
                >
                  {initials}
                </div>
              ))}
            </div>
            <span>Trusted by 1,000+ Indian users</span>
          </div>
        </div>
        
        <div className="flex-1 w-full max-w-md lg:max-w-none animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <div className="relative z-10 glass-card rounded-2xl border border-primary/10 shadow-xl overflow-hidden backdrop-blur-md">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-indigo-500/5 z-0"></div>
            <div className="relative z-10 p-1">
              <EmptyStateDashboard />
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;