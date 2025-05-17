import React from 'react';
import { Link } from "wouter";
import { BarChart2 } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="relative bg-muted/10 border-t border-primary/10 py-16 mt-auto overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-20"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8">
          <div className="space-y-4 animate-fade-in">
            <div className="flex items-center gap-2">
              <span className="text-primary text-xl font-bold">₹</span>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">RupeeTally</span>
            </div>
            <p className="text-muted-foreground">
              Your complete financial tracking solution designed for Indian users.
            </p>
            <p className="text-muted-foreground flex items-center gap-1">
              Made with 
              <span className="text-red-500">❤️</span>
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
          
          <div className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <h3 className="text-lg font-semibold mb-6">Features</h3>
            <ul className="space-y-3">
              {["Expense Tracking", "Budget Management", "Visual Analytics", "Statement Import", "Investment Tracking"].map((item, i) => (
                <li 
                  key={item}
                  className="animate-fade-in"
                  style={{ animationDelay: `${0.1 * i + 0.3}s` }}
                >
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center gap-2">
                    <span className="h-1 w-1 rounded-full bg-primary/50"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <h3 className="text-lg font-semibold mb-6">Resources</h3>
            <ul className="space-y-3">
              {[
                { name: "Guides", path: "/guides" },
                { name: "API Documentation", path: "/api-docs" },
                { name: "FAQ", path: "/faq" },
                { name: "Contact Support", path: "/contact" }
              ].map((item, i) => (
                <li 
                  key={item.name}
                  className="animate-fade-in"
                  style={{ animationDelay: `${0.1 * i + 0.3}s` }}
                >
                  <Link href={item.path} className="text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center gap-2">
                    <span className="h-1 w-1 rounded-full bg-primary/50"></span>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <h3 className="text-lg font-semibold mb-6">Company</h3>
            <ul className="space-y-3">
              {[
                { name: "About", path: "/about" },
                { name: "Blog", path: "/blog" },
                { name: "Careers", path: "/careers" },
                { name: "Privacy Policy", path: "/privacy-policy" },
                { name: "Terms of Service", path: "/terms" }
              ].map((item, i) => (
                <li 
                  key={item.name}
                  className="animate-fade-in"
                  style={{ animationDelay: `${0.1 * i + 0.3}s` }}
                >
                  <Link href={item.path} className="text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center gap-2">
                    <span className="h-1 w-1 rounded-full bg-primary/50"></span>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div 
          className="border-t border-primary/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center animate-fade-in"
          style={{ animationDelay: "0.8s" }}
        >
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} RupeeTally. All rights reserved.
          </p>
          
          <div className="flex gap-6 mt-4 md:mt-0">
            {[
              { name: "Privacy", path: "/privacy-policy" },
              { name: "Terms", path: "/terms" },
              { name: "Contact", path: "/contact" }
            ].map((item) => (
              <Link key={item.name} href={item.path} className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;