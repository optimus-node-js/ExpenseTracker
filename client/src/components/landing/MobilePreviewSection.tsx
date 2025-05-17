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
                  <div className="h-full w-full bg-gradient-to-b from-primary to-blue-600 flex flex-col text-white p-0">
                    {/* Phone header */}
                    <div className="bg-primary px-3 py-2 flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <span className="text-white font-bold text-sm">₹</span>
                        <span className="text-white font-semibold text-sm">RupeeTally</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 rounded-full bg-white/20 flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-2 w-2 text-white" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                          </svg>
                        </div>
                        <div className="h-4 w-4 rounded-full bg-white/90"></div>
                      </div>
                    </div>
                    
                    {/* App content */}
                    <div className="flex-1 p-3 overflow-y-auto">
                      {/* Dashboard cards */}
                      <div className="grid grid-cols-1 gap-2 mb-3">
                        <div className="bg-white/10 backdrop-blur-sm p-2 rounded-lg">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="text-[10px] text-white/70">Total Balance</p>
                              <p className="text-base font-bold">₹45,250</p>
                              <p className="text-[10px] text-green-300 flex items-center">
                                <span>+12.5%</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-2 w-2 ml-0.5" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                                </svg>
                              </p>
                            </div>
                            <div className="flex gap-2">
                              <div className="bg-blue-400/30 p-2 rounded-lg">
                                <div className="text-[10px] text-white/70">Income</div>
                                <div className="text-xs font-bold">₹28.5K</div>
                              </div>
                              <div className="bg-red-400/30 p-2 rounded-lg">
                                <div className="text-[10px] text-white/70">Expenses</div>
                                <div className="text-xs font-bold">₹15.3K</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Expense breakdown */}
                      <div className="bg-white/10 backdrop-blur-sm p-2 rounded-lg mb-3">
                        <div className="flex justify-between items-center mb-1">
                          <h3 className="text-xs font-medium">Expense Breakdown</h3>
                          <div className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded">May 2025</div>
                        </div>
                        <div className="space-y-1 mb-1">
                          <div className="h-1 w-full bg-white/20 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-400 rounded-full" style={{ width: '35%' }}></div>
                          </div>
                          <div className="h-1 w-full bg-white/20 rounded-full overflow-hidden">
                            <div className="h-full bg-green-400 rounded-full" style={{ width: '25%' }}></div>
                          </div>
                          <div className="h-1 w-full bg-white/20 rounded-full overflow-hidden">
                            <div className="h-full bg-yellow-400 rounded-full" style={{ width: '20%' }}></div>
                          </div>
                          <div className="h-1 w-full bg-white/20 rounded-full overflow-hidden">
                            <div className="h-full bg-purple-400 rounded-full" style={{ width: '15%' }}></div>
                          </div>
                          <div className="h-1 w-full bg-white/20 rounded-full overflow-hidden">
                            <div className="h-full bg-red-400 rounded-full" style={{ width: '5%' }}></div>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-1 text-[8px]">
                          <div className="flex items-center">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mr-1"></span>
                            <span className="text-white/80">Housing (35%)</span>
                          </div>
                          <div className="flex items-center">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-400 mr-1"></span>
                            <span className="text-white/80">Food (25%)</span>
                          </div>
                          <div className="flex items-center">
                            <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 mr-1"></span>
                            <span className="text-white/80">Transport (20%)</span>
                          </div>
                          <div className="flex items-center">
                            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mr-1"></span>
                            <span className="text-white/80">Entertainment (15%)</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Recent transactions */}
                      <div className="bg-white/10 backdrop-blur-sm p-2 rounded-lg">
                        <div className="flex justify-between items-center mb-1">
                          <h3 className="text-xs font-medium">Recent Transactions</h3>
                          <div className="text-[10px] text-blue-300">View All</div>
                        </div>
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between bg-white/10 p-1.5 rounded">
                            <div className="flex items-center gap-1.5">
                              <div className="w-5 h-5 bg-red-400/30 rounded-full flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-red-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                              </div>
                              <div>
                                <p className="text-[10px] font-medium">Grocery Shopping</p>
                                <p className="text-[8px] text-white/60">Today, 10:30 AM</p>
                              </div>
                            </div>
                            <p className="text-[10px] font-medium text-red-300">- ₹2,500</p>
                          </div>
                          
                          <div className="flex items-center justify-between bg-white/10 p-1.5 rounded">
                            <div className="flex items-center gap-1.5">
                              <div className="w-5 h-5 bg-green-400/30 rounded-full flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                              </div>
                              <div>
                                <p className="text-[10px] font-medium">Salary Deposit</p>
                                <p className="text-[8px] text-white/60">Yesterday</p>
                              </div>
                            </div>
                            <p className="text-[10px] font-medium text-green-300">+ ₹28,500</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Bottom nav */}
                    <div className="bg-white/10 backdrop-blur-md px-3 py-1.5 flex justify-between items-center">
                      <div className="flex flex-col items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        <span className="text-[8px] text-white/80">Home</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        <span className="text-[8px] text-white/60">Stats</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-6 h-6 bg-blue-500 rounded-full -mt-4 shadow-lg flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                      <div className="flex flex-col items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-[8px] text-white/60">Budget</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span className="text-[8px] text-white/60">Profile</span>
                      </div>
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
                  <div className="h-full w-full bg-gradient-to-b from-blue-500 to-blue-700 flex flex-col text-white p-0">
                    {/* Phone header */}
                    <div className="bg-blue-500 px-3 py-2 flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <span className="text-white font-bold text-sm">₹</span>
                        <span className="text-white font-semibold text-sm">RupeeTally</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 rounded-full bg-white/20 flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-2 w-2 text-white" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                          </svg>
                        </div>
                        <div className="h-4 w-4 rounded-full bg-white/90"></div>
                      </div>
                    </div>
                    
                    {/* App content */}
                    <div className="flex-1 p-3 overflow-y-auto">
                      {/* Stats Header */}
                      <div className="flex justify-between items-center mb-3">
                        <h2 className="text-sm font-bold">Financial Analysis</h2>
                        <div className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded">May 2025</div>
                      </div>
                      
                      {/* Monthly overview */}
                      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 mb-3">
                        <h3 className="text-xs font-medium mb-1.5">Monthly Growth</h3>
                        <div className="h-20 flex items-end gap-1">
                          <div className="flex-1 flex flex-col items-center">
                            <div className="h-12 w-full bg-blue-300/30 rounded-t-sm"></div>
                            <span className="text-[8px] mt-1">Jan</span>
                          </div>
                          <div className="flex-1 flex flex-col items-center">
                            <div className="h-14 w-full bg-blue-300/30 rounded-t-sm"></div>
                            <span className="text-[8px] mt-1">Feb</span>
                          </div>
                          <div className="flex-1 flex flex-col items-center">
                            <div className="h-10 w-full bg-blue-300/30 rounded-t-sm"></div>
                            <span className="text-[8px] mt-1">Mar</span>
                          </div>
                          <div className="flex-1 flex flex-col items-center">
                            <div className="h-16 w-full bg-blue-300/30 rounded-t-sm"></div>
                            <span className="text-[8px] mt-1">Apr</span>
                          </div>
                          <div className="flex-1 flex flex-col items-center">
                            <div className="h-[72px] w-full bg-white/40 rounded-t-sm relative">
                              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-400 text-[8px] px-1 rounded">+12.5%</div>
                            </div>
                            <span className="text-[8px] mt-1">May</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Budget */}
                      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 mb-3">
                        <h3 className="text-xs font-medium mb-1">Budget Status</h3>
                        <div className="space-y-2.5">
                          <div>
                            <div className="flex justify-between text-[10px]">
                              <span>Housing</span>
                              <span>₹12,000 / ₹15,000</span>
                            </div>
                            <div className="h-1.5 bg-white/20 rounded-full mt-1 overflow-hidden">
                              <div className="h-full bg-green-400 rounded-full" style={{ width: '80%' }}></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between text-[10px]">
                              <span>Food</span>
                              <span>₹9,800 / ₹10,000</span>
                            </div>
                            <div className="h-1.5 bg-white/20 rounded-full mt-1 overflow-hidden">
                              <div className="h-full bg-yellow-400 rounded-full" style={{ width: '98%' }}></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between text-[10px]">
                              <span>Transport</span>
                              <span>₹3,500 / ₹5,000</span>
                            </div>
                            <div className="h-1.5 bg-white/20 rounded-full mt-1 overflow-hidden">
                              <div className="h-full bg-blue-400 rounded-full" style={{ width: '70%' }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Savings Goals */}
                      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2">
                        <h3 className="text-xs font-medium mb-1">Savings Goals</h3>
                        <div className="flex gap-2">
                          <div className="bg-white/10 p-1.5 rounded-lg flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <div className="text-[10px] font-medium">Vacation</div>
                              <div className="text-[8px] text-white/80">60%</div>
                            </div>
                            <div className="h-1 bg-white/20 rounded-full overflow-hidden">
                              <div className="h-full bg-green-400 rounded-full" style={{ width: '60%' }}></div>
                            </div>
                            <div className="mt-1 text-[8px] text-white/80">₹24,000 / ₹40,000</div>
                          </div>
                          <div className="bg-white/10 p-1.5 rounded-lg flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <div className="text-[10px] font-medium">New Car</div>
                              <div className="text-[8px] text-white/80">25%</div>
                            </div>
                            <div className="h-1 bg-white/20 rounded-full overflow-hidden">
                              <div className="h-full bg-blue-400 rounded-full" style={{ width: '25%' }}></div>
                            </div>
                            <div className="mt-1 text-[8px] text-white/80">₹125K / ₹500K</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Bottom nav */}
                    <div className="bg-white/10 backdrop-blur-md px-3 py-1.5 flex justify-between items-center">
                      <div className="flex flex-col items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        <span className="text-[8px] text-white/60">Home</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        <span className="text-[8px] text-white/80">Stats</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-6 h-6 bg-white/10 rounded-full -mt-4 flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white/60" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                      <div className="flex flex-col items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-[8px] text-white/60">Budget</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span className="text-[8px] text-white/60">Profile</span>
                      </div>
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