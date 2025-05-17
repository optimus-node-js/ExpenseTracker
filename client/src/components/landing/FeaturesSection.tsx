import React from 'react';
import { Badge } from "@/components/ui/badge";
import { CreditCard, DollarSign, FileText, LineChart, PieChart, Users } from "lucide-react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, delay = 0 }) => {
  return (
    <div 
      className="relative group overflow-hidden rounded-2xl border border-primary/10 bg-card/50 p-8 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 animate-fade-in"
      style={{ animationDelay: `${delay}s`, animationFillMode: 'both' }}
    >
      <div className="relative z-10">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-6 group-hover:bg-primary/20 transition-colors duration-300">
          {icon}
        </div>
        <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors duration-300">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
      <div className="absolute top-0 right-0 -mt-10 -mr-10 h-40 w-40 rounded-full bg-primary/5 blur-xl group-hover:bg-primary/10 transition-colors duration-500"></div>
    </div>
  );
};

const FeaturesSection = () => {
  const features = [
    {
      icon: <DollarSign className="h-6 w-6" />,
      title: "Expense Tracking",
      description: "Easily record and categorize your expenses with a simple interface. Import bank statements for automatic processing."
    },
    {
      icon: <CreditCard className="h-6 w-6" />,
      title: "Budget Management",
      description: "Create custom budgets by category, set goals, and get alerts when you're approaching your limits."
    },
    {
      icon: <PieChart className="h-6 w-6" />,
      title: "Visual Analytics",
      description: "Gain insights with beautiful charts and graphs that show your spending patterns and financial health."
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Statement Import",
      description: "Automatically import and parse bank statements from all major Indian banks in PDF or Excel format."
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Money Lending Tracker",
      description: "Keep track of money borrowed or lent to friends and family with due dates and status tracking."
    },
    {
      icon: <LineChart className="h-6 w-6" />,
      title: "Investment Tracking",
      description: "Monitor your investments, SIPs, and portfolio performance with projected returns visualization."
    }
  ];

  return (
    <section id="features" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/5 via-secondary/10 to-secondary/5 bg-grid"></div>
      <div className="absolute -bottom-80 -right-80 w-[40rem] h-[40rem] rounded-full bg-primary/5 blur-3xl opacity-50"></div>
      <div className="absolute -top-80 -left-80 w-[40rem] h-[40rem] rounded-full bg-indigo-500/5 blur-3xl opacity-50"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center space-y-4 mb-16 animate-fade-in">
          <Badge variant="outline" className="border-primary/20 bg-primary/10 text-primary px-4 py-1.5 text-sm mb-4 mx-auto">
            Powerful Features
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground/90 to-foreground/80">
            Everything You Need For Financial Success
          </h2>
          <p className="text-muted-foreground md:text-xl max-w-3xl mx-auto">
            Our comprehensive suite of tools helps you manage every aspect of your finances
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={0.1 * index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;