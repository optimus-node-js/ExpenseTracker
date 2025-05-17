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
          
          {/* Theme toggle button - Circular design */}
          <button 
            onClick={toggleTheme}
            className={`ml-2 relative h-10 w-10 rounded-full flex items-center justify-center focus:outline-none transition-colors duration-300 ${
              theme === 'dark' ? 'bg-blue-600' : 'bg-amber-400'
            }`}
            aria-label="Toggle theme"
          >
            {/* Sun Icon (light mode) */}
            <div 
              className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
                theme === 'dark' ? 'opacity-0' : 'opacity-100'
              }`}
            >
              <Sun className="h-5 w-5 text-white" />
              
              {/* Sun rays */}
              <div className="absolute inset-0 overflow-hidden rounded-full">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={`ray-${i}`}
                    className="absolute h-0.5 bg-yellow-100 origin-center"
                    style={{
                      left: "50%",
                      top: "50%",
                      width: "40%",
                      transform: `rotate(${i * 45}deg) translateX(50%)`,
                      opacity: 0.7
                    }}
                  />
                ))}
              </div>
            </div>
            
            {/* Moon Icon (dark mode) */}
            <div 
              className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
                theme === 'dark' ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <Moon className="h-5 w-5 text-white" />
              
              {/* Stars */}
              <div className="absolute inset-0 overflow-hidden rounded-full">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={`star-${i}`}
                    className="absolute w-1 h-1 bg-white rounded-full"
                    style={{
                      top: `${15 + (i * 18)}%`,
                      left: `${15 + (i * 18)}%`,
                      opacity: 0.7
                    }}
                  />
                ))}
              </div>
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