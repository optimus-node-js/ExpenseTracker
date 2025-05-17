import React from 'react';
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import CountUpAnimation from '../animations/CountUpAnimation';

const HowItWorksSection = () => {
  const steps = [
    {
      number: "01",
      title: "Sign up for free",
      description: "Create your account in seconds with just an email. No credit card required to get started."
    },
    {
      number: "02",
      title: "Track your expenses",
      description: "Add your daily expenses manually or import bank statements to automatically categorize transactions."
    },
    {
      number: "03",
      title: "Set budgets",
      description: "Create weekly or monthly budgets for different categories to keep your spending in check."
    },
    {
      number: "04",
      title: "Visualize your finances",
      description: "Get insights with beautiful charts and graphs that help you understand your spending patterns."
    }
  ];

  // Testimonials with more Indian names and contexts
  const testimonials = [
    {
      quote: "RupeeTally has completely changed how I manage my finances. I've been able to save 20% more each month for my daughter's education!",
      name: "Priya Sharma",
      job: "Product Manager",
      rating: 5
    },
    {
      quote: "The UPI transaction tracking is fantastic! Now I can keep track of all my digital payments in one place instead of using multiple apps.",
      name: "Rahul Verma",
      job: "Software Engineer",
      rating: 5
    },
    {
      quote: "As a freelancer, the GST expense tracking feature has simplified my tax filing process considerably!",
      name: "Neha Patel",
      job: "Graphic Designer",
      rating: 5
    }
  ];

  // Get a random testimonial
  const randomTestimonial = testimonials[Math.floor(Math.random() * testimonials.length)];

  return (
    <section id="how-it-works" className="py-16 md:py-24 container px-4 md:px-6 mx-auto">
      <div className="space-y-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-4 max-w-[800px] mx-auto"
        >
          <Badge variant="outline" className="px-3 py-1 border-primary/20 bg-primary/10 text-foreground">
            How it works
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">
            Simple steps to financial clarity
          </h2>
          <p className="text-muted-foreground text-lg max-w-[600px] mx-auto">
            Getting started with RupeeTally is easy. Follow these simple steps to take control of your finances.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              {/* Connecting line between steps */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-primary/30 to-transparent z-0" style={{ width: 'calc(100% - 3rem)' }}></div>
              )}
              
              {/* Step number */}
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="mb-4 text-5xl font-bold text-primary/20"
              >
                {step.number}
              </motion.div>
              
              {/* Step content */}
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Stats/Testimonial section */}
        <div className="mt-24 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div className="grid grid-cols-2 gap-4 md:gap-8">
              <motion.div 
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="p-6 rounded-xl border bg-card space-y-2 hover:shadow-md"
              >
                <p className="text-3xl md:text-4xl font-bold text-primary">
                  <CountUpAnimation end={5000} suffix="+" />
                </p>
                <p className="text-muted-foreground">Active Users</p>
              </motion.div>
              
              <motion.div 
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="p-6 rounded-xl border bg-card space-y-2 hover:shadow-md"
              >
                <p className="text-3xl md:text-4xl font-bold text-primary">
                  <CountUpAnimation end={10} prefix="₹" suffix="Cr+" />
                </p>
                <p className="text-muted-foreground">Expenses Tracked</p>
              </motion.div>
              
              <motion.div 
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="p-6 rounded-xl border bg-card space-y-2 hover:shadow-md"
              >
                <p className="text-3xl md:text-4xl font-bold text-primary">
                  <CountUpAnimation end={15} suffix="%" />
                </p>
                <p className="text-muted-foreground">Avg. Savings Increase</p>
              </motion.div>
              
              <motion.div 
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="p-6 rounded-xl border bg-card space-y-2 hover:shadow-md"
              >
                <p className="text-3xl md:text-4xl font-bold text-primary">
                  <CountUpAnimation end={12000} suffix="+" />
                </p>
                <p className="text-muted-foreground">Transactions Daily</p>
              </motion.div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ scale: 1.02 }}
            className="p-8 rounded-xl border bg-card shadow-sm hover:shadow"
          >
            <div className="flex flex-col space-y-4">
              <div className="flex items-center space-x-2">
                <span className="text-yellow-500">★★★★★</span>
                <span className="text-muted-foreground">5.0 rating</span>
              </div>
              <blockquote className="text-xl md:text-2xl font-medium italic">
                "{randomTestimonial.quote}"
              </blockquote>
              <div className="flex items-center mt-4">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-primary-foreground"></div>
                <div className="ml-3">
                  <p className="font-medium">{randomTestimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{randomTestimonial.job}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;