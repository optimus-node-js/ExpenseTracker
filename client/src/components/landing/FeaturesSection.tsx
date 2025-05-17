import React from 'react';
import { Link } from 'wouter';
import { Badge } from "@/components/ui/badge";
import { DollarSign, CreditCard, PieChart, FileText, Users, LineChart } from "lucide-react";

const FeatureCard = ({ 
  icon, 
  title, 
  description, 
  delay = 0,
  link
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
  delay?: number;
  link: string;
}) => {
  return (
    <a href={link} className="no-underline text-foreground">
      <div 
        className="group flex flex-col p-6 space-y-4 rounded-xl border bg-card shadow-sm transition-all duration-200 hover:shadow-md animate-fade-in cursor-pointer"
        style={{ animationDelay: `${delay}s` }}
      >
        <div className="p-2 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
          {icon}
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-muted-foreground">{description}</p>
        </div>
      </div>
    </a>
  );
};

const FeaturesSection = () => {
  const features = [
    {
      icon: <DollarSign className="h-6 w-6 text-primary" />,
      title: "Expense Tracking",
      description: "Effortlessly track your daily expenses with custom categories and tags tailored for Indian financial needs.",
      link: "/features?tab=expense-tracking"
    },
    {
      icon: <CreditCard className="h-6 w-6 text-primary" />,
      title: "Budget Management",
      description: "Create and monitor weekly or monthly budgets with smart alerts to keep your spending in check.",
      link: "/features?tab=budget-management"
    },
    {
      icon: <PieChart className="h-6 w-6 text-primary" />,
      title: "Visual Analytics",
      description: "Understand your spending patterns with intuitive charts and graphs that reveal financial insights.",
      link: "/features?tab=visual-analytics"
    },
    {
      icon: <FileText className="h-6 w-6 text-primary" />,
      title: "Statement Import",
      description: "Easily import bank statements and automatically categorize transactions for hassle-free tracking.",
      link: "/features?tab=statement-import"
    },
    {
      icon: <Users className="h-6 w-6 text-primary" />,
      title: "Lending Tracker",
      description: "Keep records of money lent or borrowed, with details on repayment schedules and outstanding amounts.",
      link: "/features"
    },
    {
      icon: <LineChart className="h-6 w-6 text-primary" />,
      title: "Investment Tracking",
      description: "Monitor your investments including SIPs, stocks, and gold with performance analysis and growth projections.",
      link: "/features?tab=investment-tracking"
    },
  ];

  return (
    <section id="features" className="py-16 md:py-24 container px-4 md:px-6 mx-auto relative">
      <div className="absolute inset-0 bg-grid opacity-10"></div>
      
      <div className="relative space-y-12 z-10">
        <div className="text-center space-y-4 max-w-[800px] mx-auto animate-fade-in">
          <Badge variant="outline" className="px-3 py-1 border-primary/20 bg-primary/10 text-foreground">
            Features
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">
            Everything you need to manage your finances
          </h2>
          <p className="text-muted-foreground text-lg max-w-[600px] mx-auto">
            Our comprehensive suite of tools helps you track, manage, and grow your finances with confidence.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={0.1 * index}
              link={feature.link}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;