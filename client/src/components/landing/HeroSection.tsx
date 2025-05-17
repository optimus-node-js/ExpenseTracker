import React from 'react';
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "@/components/ThemeProvider";

const HeroSection = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  
  return (
    <section className="relative py-16 md:py-28 lg:py-36 container px-4 md:px-6 mx-auto overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid opacity-20 transition-opacity duration-500"></div>
      
      {/* Enhanced gradient blob */}
      <motion.div 
        className="absolute -top-[10rem] -right-[10rem] w-[40rem] h-[40rem] rounded-full bg-gradient-to-br blur-3xl opacity-70"
        style={{
          background: isDark 
            ? "linear-gradient(to bottom right, rgba(99, 102, 241, 0.3), rgba(59, 130, 246, 0.3), rgba(147, 51, 234, 0.3))" 
            : "linear-gradient(to bottom right, rgba(59, 130, 246, 0.3), rgba(79, 70, 229, 0.3), rgba(124, 58, 237, 0.3))"
        }}
        animate={{
          scale: [1, 1.05, 1],
          rotate: [0, 3, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "mirror"
        }}
      />
      
      {/* Enhanced floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 30 }).map((_, i) => {
          const size = Math.random() * 8 + 2;
          const duration = Math.random() * 10 + 10;
          const delay = Math.random() * 5;
          const posX = Math.random() * 100;
          const posY = Math.random() * 100;
          
          return (
            <motion.div 
              key={i}
              className="absolute rounded-full"
              style={{
                top: `${posY}%`,
                left: `${posX}%`,
                width: `${size}px`,
                height: `${size}px`,
                backgroundColor: isDark 
                  ? `rgba(${56 + Math.random() * 100}, ${189 + Math.random() * 30}, ${248 + Math.random() * 30}, ${0.3 + Math.random() * 0.2})`
                  : `rgba(${79 + Math.random() * 50}, ${70 + Math.random() * 50}, ${229 + Math.random() * 25}, ${0.3 + Math.random() * 0.2})`,
                boxShadow: isDark 
                  ? '0 0 5px rgba(147, 197, 253, 0.5)' 
                  : '0 0 5px rgba(165, 180, 252, 0.5)'
              }}
              animate={{
                y: [-20, 20, -20],
                x: [-10, 10, -10],
                opacity: [0.4, 0.7, 0.4]
              }}
              transition={{
                duration: duration,
                repeat: Infinity,
                repeatType: "mirror",
                delay: delay,
                ease: "easeInOut"
              }}
            />
          );
        })}
      </div>

      {/* Hero content with enhanced animations */}
      <div className="relative grid gap-6 lg:grid-cols-2 lg:gap-10 xl:gap-16 items-center">
        <motion.div 
          className="space-y-8 max-w-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <Badge variant="outline" className="px-3 py-1 border-primary/20 bg-primary/10 text-foreground">
                Financial management made simple
              </Badge>
            </motion.div>
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Take Control of Your Financial Future
            </motion.h1>
            <motion.p 
              className="text-muted-foreground text-lg md:text-xl max-w-[600px]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              Track expenses, manage budgets, and visualize your financial journey with our comprehensive dashboard built for Indian users.
            </motion.p>
          </div>
          <motion.div 
            className="flex flex-col sm:flex-row gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <Link href="/signup">
              <motion.div 
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Button size="lg" className="gap-2 w-full sm:w-auto">
                  Start for free
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }}
                  >
                    <ArrowRight className="h-4 w-4" />
                  </motion.div>
                </Button>
              </motion.div>
            </Link>
            <Link href="/login">
              <motion.div 
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Log in
                </Button>
              </motion.div>
            </Link>
          </motion.div>
          <motion.div 
            className="pt-2 text-muted-foreground text-sm flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <motion.span 
              className="h-1 w-1 rounded-full bg-primary"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            ></motion.span>
            No credit card required
          </motion.div>
        </motion.div>

        {/* Dashboard preview with enhanced animations */}
        <motion.div 
          className="relative w-full lg:pl-10"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
        >
          <motion.div 
            className="relative z-10 rounded-xl overflow-hidden shadow-2xl border bg-background"
            whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-full h-auto rounded-xl overflow-hidden">
              <div className="flex flex-col h-full">
                {/* Dashboard header */}
                <div className="bg-primary px-4 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <motion.span 
                      className="text-white text-lg font-bold"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity, repeatType: "loop" }}
                    >₹</motion.span>
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
                <div className="bg-white dark:bg-slate-900 p-4 flex-1 transition-colors duration-500">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                    <motion.div 
                      className="bg-blue-50 dark:bg-slate-800 p-3 rounded-lg transition-colors duration-500"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      whileHover={{ y: -3 }}
                    >
                      <p className="text-xs text-gray-500 dark:text-gray-400">Total Balance</p>
                      <p className="text-lg font-bold text-gray-800 dark:text-white">₹45,250</p>
                      <p className="text-xs text-green-500 flex items-center">
                        <span>+12.5%</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                        </svg>
                      </p>
                    </motion.div>
                    <motion.div 
                      className="bg-green-50 dark:bg-slate-800 p-3 rounded-lg transition-colors duration-500"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.6 }}
                      whileHover={{ y: -3 }}
                    >
                      <p className="text-xs text-gray-500 dark:text-gray-400">Monthly Income</p>
                      <p className="text-lg font-bold text-gray-800 dark:text-white">₹28,500</p>
                      <p className="text-xs text-green-500 flex items-center">
                        <span>+8.2%</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                        </svg>
                      </p>
                    </motion.div>
                    <motion.div 
                      className="bg-red-50 dark:bg-slate-800 p-3 rounded-lg transition-colors duration-500"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.7 }}
                      whileHover={{ y: -3 }}
                    >
                      <p className="text-xs text-gray-500 dark:text-gray-400">Monthly Expenses</p>
                      <p className="text-lg font-bold text-gray-800 dark:text-white">₹15,320</p>
                      <p className="text-xs text-red-500 flex items-center">
                        <span>-5.3%</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M12 13a1 1 0 100 2h5a1 1 0 001-1v-5a1 1 0 10-2 0v2.586l-4.293-4.293a1 1 0 00-1.414 0L8 9.586l-4.293-4.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0L11 9.414 14.586 13H12z" clipRule="evenodd" />
                        </svg>
                      </p>
                    </motion.div>
                  </div>
                  
                  <div className="flex flex-col lg:flex-row gap-4 mb-4">
                    <motion.div 
                      className="flex-1 bg-slate-100 dark:bg-slate-800 rounded-lg p-3 transition-colors duration-500"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.8 }}
                      whileHover={{ y: -3 }}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-sm font-medium">Expense Breakdown</h3>
                        <div className="text-xs text-gray-500 bg-white dark:bg-slate-700 px-2 py-1 rounded">May 2025</div>
                      </div>
                      <div className="space-y-1">
                        <motion.div className="h-1.5 w-full bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
                          <motion.div 
                            className="h-full bg-blue-500 rounded-full" 
                            initial={{ width: '0%' }}
                            animate={{ width: '35%' }}
                            transition={{ duration: 1, delay: 0.9 }}
                          ></motion.div>
                        </motion.div>
                        <motion.div className="h-1.5 w-full bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
                          <motion.div 
                            className="h-full bg-green-500 rounded-full" 
                            initial={{ width: '0%' }}
                            animate={{ width: '25%' }}
                            transition={{ duration: 1, delay: 1.0 }}
                          ></motion.div>
                        </motion.div>
                        <motion.div className="h-1.5 w-full bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
                          <motion.div 
                            className="h-full bg-yellow-500 rounded-full" 
                            initial={{ width: '0%' }}
                            animate={{ width: '20%' }}
                            transition={{ duration: 1, delay: 1.1 }}
                          ></motion.div>
                        </motion.div>
                        <motion.div className="h-1.5 w-full bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
                          <motion.div 
                            className="h-full bg-purple-500 rounded-full" 
                            initial={{ width: '0%' }}
                            animate={{ width: '15%' }}
                            transition={{ duration: 1, delay: 1.2 }}
                          ></motion.div>
                        </motion.div>
                        <motion.div className="h-1.5 w-full bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
                          <motion.div 
                            className="h-full bg-red-500 rounded-full" 
                            initial={{ width: '0%' }}
                            animate={{ width: '5%' }}
                            transition={{ duration: 1, delay: 1.3 }}
                          ></motion.div>
                        </motion.div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2 text-xs">
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
                    </motion.div>
                    
                    <motion.div 
                      className="flex-1 bg-slate-100 dark:bg-slate-800 rounded-lg p-3 transition-colors duration-500"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.9 }}
                      whileHover={{ y: -3 }}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-sm font-medium">Recent Transactions</h3>
                        <div className="text-primary text-xs">View All</div>
                      </div>
                      <div className="space-y-2">
                        <motion.div 
                          className="flex items-center justify-between bg-white dark:bg-slate-700 p-2 rounded"
                          initial={{ x: 20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 1.0 }}
                          whileHover={{ x: 3 }}
                        >
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
                        </motion.div>
                        <motion.div 
                          className="flex items-center justify-between bg-white dark:bg-slate-700 p-2 rounded"
                          initial={{ x: 20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 1.1 }}
                          whileHover={{ x: 3 }}
                        >
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
                        </motion.div>
                        <motion.div 
                          className="flex items-center justify-between bg-white dark:bg-slate-700 p-2 rounded"
                          initial={{ x: 20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 1.2 }}
                          whileHover={{ x: 3 }}
                        >
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
                        </motion.div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent transition-colors duration-500"></div>
          </motion.div>
          
          {/* Modern floating cards like in the image */}
          <motion.div 
            className="absolute -bottom-24 right-[10%] p-4 rounded-xl shadow-lg border bg-white dark:bg-background z-30"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.5 }}
            whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
            style={{ width: "220px" }}
          >
            <div className="flex flex-col">
              <div className="flex items-center gap-3 mb-1">
                <motion.div 
                  className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center"
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.4, type: "spring", stiffness: 400, damping: 10 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>
                <p className="text-sm font-medium">Expense saved</p>
              </div>
              <motion.p 
                className="text-xl font-bold pl-[52px]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.5 }}
              >₹2,500</motion.p>
            </div>
          </motion.div>
          
          <motion.div 
            className="absolute -bottom-24 left-[10%] p-4 rounded-xl shadow-lg border bg-white dark:bg-background z-30"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.5 }}
            whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
            style={{ width: "220px" }}
          >
            <div className="flex flex-col">
              <div className="flex items-center gap-3 mb-1">
                <motion.div 
                  className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center"
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.5, type: "spring", stiffness: 400, damping: 10 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </motion.div>
                <p className="text-sm font-medium">Monthly growth</p>
              </div>
              <motion.p 
                className="text-xl font-bold text-green-500 pl-[52px]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.6, duration: 0.5 }}
              >+12.5%</motion.p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;