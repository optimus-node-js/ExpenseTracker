import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";

const MobilePreviewSection = () => {
  return (
    <section className="py-16 md:py-24 container px-4 md:px-6 mx-auto relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid opacity-10"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] rounded-full bg-gradient-to-br from-blue-500/10 via-indigo-500/10 to-purple-600/10 blur-3xl opacity-70"></div>
      
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        {/* Text content */}
        <div className="space-y-8 max-w-xl animate-fade-in order-2 lg:order-1">
          <div className="space-y-4">
            <Badge variant="outline" className="px-3 py-1 border-primary/20 bg-primary/10 text-foreground">
              Mobile Ready
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">
              Manage your finances on the go
            </h2>
            <p className="text-muted-foreground text-lg max-w-[600px]">
              RupeeTally works beautifully on mobile devices, allowing you to track expenses, check budgets, and analyze your finances wherever you are.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border bg-card shadow-sm animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <h3 className="font-medium mb-2 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-primary"></span>
                Quick expense tracking
              </h3>
              <p className="text-sm text-muted-foreground">
                Add expenses in seconds with custom categories and quick selects for common items.
              </p>
            </div>
            
            <div className="p-4 rounded-xl border bg-card shadow-sm animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <h3 className="font-medium mb-2 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-primary"></span>
                Instant notifications
              </h3>
              <p className="text-sm text-muted-foreground">
                Get alerts when you're nearing budget limits or when a statement is processed.
              </p>
            </div>
            
            <div className="p-4 rounded-xl border bg-card shadow-sm animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <h3 className="font-medium mb-2 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-primary"></span>
                Offline mode
              </h3>
              <p className="text-sm text-muted-foreground">
                Add transactions even when offline - they'll sync automatically when you're back online.
              </p>
            </div>
            
            <div className="p-4 rounded-xl border bg-card shadow-sm animate-fade-in" style={{ animationDelay: "0.5s" }}>
              <h3 className="font-medium mb-2 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-primary"></span>
                Touch ID / Face ID
              </h3>
              <p className="text-sm text-muted-foreground">
                Secure your financial data with biometric authentication for quick and safe access.
              </p>
            </div>
          </div>
          
          <div className="pt-4">
            <Button size="lg" className="gap-2 animate-fade-in" style={{ animationDelay: "0.6s" }}>
              <Smartphone className="h-4 w-4" />
              Get the app
            </Button>
          </div>
        </div>
        
        {/* Mobile mockups */}
        <div className="relative h-[500px] md:h-[600px] w-full flex justify-center items-center order-1 lg:order-2 animate-fade-in">
          {/* Container to prevent overflow */}
          <div className="relative w-full h-full flex justify-center items-center">
            {/* Main phone mockup */}
            <div className="relative w-[200px] sm:w-[250px] h-[400px] sm:h-[500px] border-6 sm:border-8 border-background rounded-[28px] sm:rounded-[32px] shadow-xl bg-card overflow-hidden z-20">
              <div className="absolute inset-0 p-1">
                <div className="absolute top-0 inset-x-0 h-6 bg-background rounded-t-xl flex justify-center items-center">
                  <div className="w-16 sm:w-20 h-3 sm:h-4 bg-slate-800 rounded-full"></div>
                </div>
                <div className="rounded-2xl overflow-hidden h-full w-full pt-6">
                  <div className="h-full w-full bg-primary flex items-center justify-center text-white text-center p-4">
                    <div className="space-y-4">
                      <div className="text-xl font-bold">RupeeTally App</div>
                      <div className="text-sm opacity-80">Track your expenses on the go</div>
                      <div className="py-2 px-4 bg-white/20 rounded-lg mx-auto text-sm">Expense Tracker</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Secondary phone mockup (slightly behind) */}
            <div className="hidden sm:block absolute w-[200px] sm:w-[250px] h-[400px] sm:h-[500px] border-6 sm:border-8 border-background rounded-[28px] sm:rounded-[32px] shadow-xl bg-card overflow-hidden z-10 right-0 sm:-right-10 lg:-right-16 bottom-12 sm:bottom-16 opacity-75 rotate-6">
              <div className="absolute inset-0 p-1">
                <div className="absolute top-0 inset-x-0 h-6 bg-background rounded-t-xl flex justify-center items-center">
                  <div className="w-16 sm:w-20 h-3 sm:h-4 bg-slate-800 rounded-full"></div>
                </div>
                <div className="rounded-2xl overflow-hidden h-full w-full pt-6">
                  <div className="h-full w-full bg-blue-400 flex items-center justify-center text-white text-center p-4">
                    <div className="space-y-4">
                      <div className="text-xl font-bold">RupeeTally Stats</div>
                      <div className="text-sm opacity-80">View your financial progress</div>
                      <div className="py-2 px-4 bg-white/20 rounded-lg mx-auto text-sm">Financial Reports</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MobilePreviewSection;