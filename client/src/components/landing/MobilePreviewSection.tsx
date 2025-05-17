import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Smartphone } from "lucide-react";
import MobilePreview from '@/components/MobilePreview';

const MobilePreviewSection = () => {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-background/80 bg-grid"></div>
      <div className="absolute -top-40 left-1/3 w-[30rem] h-[30rem] rounded-full bg-gradient-to-br from-violet-500/20 via-blue-500/20 to-indigo-500/20 blur-3xl opacity-40"></div>
      <div className="absolute top-1/3 -right-40 w-[30rem] h-[30rem] rounded-full bg-gradient-to-tr from-blue-500/10 via-indigo-500/10 to-purple-500/10 blur-3xl opacity-30"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="flex-1 space-y-8 animate-fade-in">
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
            
            <div className="pt-4">
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
            </div>
          </div>
          
          <div className="flex-1 flex justify-center items-center animate-fade-in" style={{ animationDelay: "0.2s" }}>
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default MobilePreviewSection;