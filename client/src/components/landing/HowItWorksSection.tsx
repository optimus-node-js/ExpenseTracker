import React from 'react';
import { ArrowRight } from 'lucide-react';

const HowItWorksSection = () => {
  const steps = [
    {
      number: 1,
      title: "Create Your Account",
      description: "Sign up for free and create your secure personal account in seconds."
    },
    {
      number: 2,
      title: "Import Your Data",
      description: "Upload bank statements or start tracking expenses manually with our easy interface."
    },
    {
      number: 3,
      title: "Gain Financial Insights",
      description: "View beautiful visualizations and make smarter financial decisions with detailed analytics."
    }
  ];

  return (
    <section id="how-it-works" className="relative py-24 md:py-28 bg-background overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-30"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center space-y-3 mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground/90 to-foreground/80">
            How FinTrackr Works
          </h2>
          <p className="text-muted-foreground md:text-lg max-w-2xl mx-auto">
            Get started in minutes and take control of your finances
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={step.number} className="relative group">
              <div className="flex flex-col items-center text-center space-y-5 rounded-lg p-6 bg-card/50 backdrop-blur-sm border border-primary/10 shadow-md hover:shadow-lg transition-all duration-300 animate-fade-in" style={{ animationDelay: `${0.1 * index}s` }}>
                <div className="relative">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl group-hover:scale-110 transition-transform duration-500">
                    {step.number}
                  </div>
                  <svg className="absolute -top-2 -right-2 w-6 h-6 text-primary animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold group-hover:text-primary transition-colors duration-300">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
              {index < 2 && (
                <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10 text-primary/50">
                  <ArrowRight className="h-8 w-8" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;