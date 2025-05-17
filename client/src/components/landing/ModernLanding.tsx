import React, { useState, useEffect } from 'react';
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";

import HeroSection from './HeroSection';
import FeaturesSection from './FeaturesSection';
import HowItWorksSection from './HowItWorksSection';
import FAQSection from './FAQSection';
import CTASection from './CTASection';
import Footer from './Footer';

export default function ModernLanding() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [theme, setTheme] = useState(() => {
    // Check if theme is stored in localStorage
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'light';
    }
    return 'light';
  });
  
  // Theme toggle function
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', newTheme);
      document.documentElement.classList.toggle('dark', newTheme === 'dark');
    }
  };
  
  // Initialize theme on mount
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);
  
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
    <div className="min-h-screen flex flex-col">
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
            <span className="text-primary text-xl font-bold">₹</span>
            <span className="text-xl font-bold">RupeeTally</span>
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
          
          {/* Theme toggle button - Minimal Circle Design (Smaller) */}
          <button
            onClick={toggleTheme}
            className={`ml-2 relative w-9 h-9 rounded-full transition-all duration-500 ease-in-out cursor-pointer focus:outline-none ${
              theme === 'dark' 
                ? 'bg-slate-800 border border-slate-700' 
                : 'bg-white border border-slate-200'
            }`}
            aria-label="Toggle theme"
          >
            {/* Sun Icon (only visible in light mode) */}
            <div 
              className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ease-in-out ${
                theme === 'dark' ? 'opacity-0 rotate-90 scale-75' : 'opacity-100 rotate-0 scale-100'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="gold" className="w-4.5 h-4.5">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" 
                  stroke="gold" 
                  strokeWidth="2" 
                  fill="none" 
                  strokeLinecap="round" />
              </svg>
            </div>
            
            {/* Moon Icon (only visible in dark mode) */}
            <div 
              className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ease-in-out ${
                theme === 'dark' ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-75'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#4d88ff" className="w-4 h-4">
                <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z" />
              </svg>
              <div className="absolute top-2 right-2.5 w-0.5 h-0.5 bg-white rounded-full opacity-70"></div>
              <div className="absolute bottom-2.5 right-3 w-0.5 h-0.5 bg-white rounded-full opacity-70"></div>
            </div>
          </button>
        </div>
      </header>

      {/* Main sections */}
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </div>
  );
}