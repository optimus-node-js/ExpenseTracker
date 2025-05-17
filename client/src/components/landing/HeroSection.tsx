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
            <div className="w-full h-auto rounded-xl overflow-hidden">
              <div className="flex flex-col h-full">
                {/* Dashboard header */}
                <div className="bg-primary px-4 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-white text-lg font-bold">₹</span>
                    <span className="text-white text-lg font-semibold">RupeeTally</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-white/20 rounded-full h-8 w-8 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                      </svg>
                    </div>
                    <div className="h-8 w-8 bg-white/20 rounded-full"></div>
                  </div>
                </div>
                
                {/* Dashboard content */}
                <div className="bg-white dark:bg-slate-900 p-4 flex-1">
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="bg-blue-50 dark:bg-slate-800 p-3 rounded-lg">
                      <p className="text-xs text-gray-500 dark:text-gray-400">Total Balance</p>
                      <p className="text-lg font-bold text-gray-800 dark:text-white">₹45,250</p>
                      <p className="text-xs text-green-500 flex items-center">
                        <span>+12.5%</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                        </svg>
                      </p>
                    </div>
                    <div className="bg-green-50 dark:bg-slate-800 p-3 rounded-lg">
                      <p className="text-xs text-gray-500 dark:text-gray-400">Monthly Income</p>
                      <p className="text-lg font-bold text-gray-800 dark:text-white">₹28,500</p>
                      <p className="text-xs text-green-500 flex items-center">
                        <span>+8.2%</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                        </svg>
                      </p>
                    </div>
                    <div className="bg-red-50 dark:bg-slate-800 p-3 rounded-lg">
                      <p className="text-xs text-gray-500 dark:text-gray-400">Monthly Expenses</p>
                      <p className="text-lg font-bold text-gray-800 dark:text-white">₹15,320</p>
                      <p className="text-xs text-red-500 flex items-center">
                        <span>-5.3%</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M12 13a1 1 0 100 2h5a1 1 0 001-1v-5a1 1 0 10-2 0v2.586l-4.293-4.293a1 1 0 00-1.414 0L8 9.586l-4.293-4.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0L11 9.414 14.586 13H12z" clipRule="evenodd" />
                        </svg>
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4 mb-4">
                    <div className="flex-1 bg-slate-100 dark:bg-slate-800 rounded-lg p-3">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-sm font-medium">Expense Breakdown</h3>
                        <div className="text-xs text-gray-500 bg-white dark:bg-slate-700 px-2 py-1 rounded">May 2025</div>
                      </div>
                      <div className="space-y-1">
                        <div className="h-1.5 w-full bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-500 rounded-full" style={{ width: '35%' }}></div>
                        </div>
                        <div className="h-1.5 w-full bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
                          <div className="h-full bg-green-500 rounded-full" style={{ width: '25%' }}></div>
                        </div>
                        <div className="h-1.5 w-full bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
                          <div className="h-full bg-yellow-500 rounded-full" style={{ width: '20%' }}></div>
                        </div>
                        <div className="h-1.5 w-full bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
                          <div className="h-full bg-purple-500 rounded-full" style={{ width: '15%' }}></div>
                        </div>
                        <div className="h-1.5 w-full bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
                          <div className="h-full bg-red-500 rounded-full" style={{ width: '5%' }}></div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 mt-2 text-xs">
                        <div className="flex items-center">
                          <span className="w-2 h-2 rounded-full bg-blue-500 mr-1"></span>
                          <span className="text-gray-600 dark:text-gray-300">Housing (35%)</span>
                        </div>
                        <div className="flex items-center">
                          <span className="w-2 h-2 rounded-full bg-green-500 mr-1"></span>
                          <span className="text-gray-600 dark:text-gray-300">Food (25%)</span>
                        </div>
                        <div className="flex items-center">
                          <span className="w-2 h-2 rounded-full bg-yellow-500 mr-1"></span>
                          <span className="text-gray-600 dark:text-gray-300">Transport (20%)</span>
                        </div>
                        <div className="flex items-center">
                          <span className="w-2 h-2 rounded-full bg-purple-500 mr-1"></span>
                          <span className="text-gray-600 dark:text-gray-300">Entertainment (15%)</span>
                        </div>
                        <div className="flex items-center">
                          <span className="w-2 h-2 rounded-full bg-red-500 mr-1"></span>
                          <span className="text-gray-600 dark:text-gray-300">Others (5%)</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex-1 bg-slate-100 dark:bg-slate-800 rounded-lg p-3">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-sm font-medium">Recent Transactions</h3>
                        <div className="text-primary text-xs">View All</div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between bg-white dark:bg-slate-700 p-2 rounded">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            </div>
                            <div>
                              <p className="text-xs font-medium">Grocery Shopping</p>
                              <p className="text-xs text-gray-500">Today, 10:30 AM</p>
                            </div>
                          </div>
                          <p className="text-xs font-medium text-red-500">- ₹2,500</p>
                        </div>
                        <div className="flex items-center justify-between bg-white dark:bg-slate-700 p-2 rounded">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            </div>
                            <div>
                              <p className="text-xs font-medium">Salary Deposit</p>
                              <p className="text-xs text-gray-500">Yesterday</p>
                            </div>
                          </div>
                          <p className="text-xs font-medium text-green-500">+ ₹28,500</p>
                        </div>
                        <div className="flex items-center justify-between bg-white dark:bg-slate-700 p-2 rounded">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            </div>
                            <div>
                              <p className="text-xs font-medium">Electricity Bill</p>
                              <p className="text-xs text-gray-500">15 May, 2025</p>
                            </div>
                          </div>
                          <p className="text-xs font-medium text-red-500">- ₹1,850</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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