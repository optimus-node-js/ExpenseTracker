import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Search } from 'lucide-react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export default function FAQ() {
  // State for search functionality
  const [searchQuery, setSearchQuery] = React.useState('');
  
  // Categories of FAQs
  const faqCategories = [
    {
      title: 'General Questions',
      items: [
        {
          question: "What is RupeeTally?",
          answer: "RupeeTally is a comprehensive expense tracking application tailored specifically for Indian users. It helps you track expenses, manage budgets, monitor investments like SIPs, track loans, and visualize your financial data through intuitive dashboards and reports."
        },
        {
          question: "Is RupeeTally free to use?",
          answer: "Yes, RupeeTally offers a free plan with essential features for personal finance tracking. We also offer premium plans with advanced features like statement import, investment tracking, and SIP management tailored for Indian investors."
        },
        {
          question: "How is my financial data kept secure?",
          answer: "We use industry-standard encryption to protect your data. We never share your information with third parties, and all sensitive data is encrypted both in transit and at rest. RupeeTally complies with all relevant Indian data protection regulations."
        }
      ]
    },
    {
      title: 'Account & Settings',
      items: [
        {
          question: "How do I create an account?",
          answer: "Click on the 'Sign Up' button on the top right of the homepage. You can create an account using your email address. We'll send you a verification email to confirm your account."
        },
        {
          question: "Can I change my account details after signing up?",
          answer: "Yes, you can update your profile information, including your name, email, and password, from the Profile section after logging in to your RupeeTally account."
        },
        {
          question: "What should I do if I forget my password?",
          answer: "Click on the 'Forgot Password' link on the login page. Enter your registered email address, and we'll send you instructions to reset your password."
        }
      ]
    },
    {
      title: 'Transactions & Statements',
      items: [
        {
          question: "Can I import transactions from my Indian bank statements?",
          answer: "Yes, RupeeTally supports importing transactions from bank statements from all major Indian banks. You can upload PDF or Excel files, and our smart system will automatically categorize transactions for you, recognizing common Indian merchants and expense types."
        },
        {
          question: "Does RupeeTally support UPI transactions?",
          answer: "Yes, RupeeTally fully supports UPI transactions. You can easily categorize and track all your UPI payments from services like Google Pay, PhonePe, Paytm and more."
        },
        {
          question: "Can I track my cash transactions and maintain a cash reserve?",
          answer: "Absolutely! RupeeTally has a dedicated cash reserve tracking feature, perfect for managing the cash component of your finances - ideal for day-to-day expenses and tracking petty cash."
        },
        {
          question: "How do I add a new transaction manually?",
          answer: "Go to the 'Transactions' page and click on 'Add New Transaction'. Fill in the details like amount, date, category, and description, then click 'Save'. You can also add receipts or additional notes to your transactions."
        }
      ]
    },
    {
      title: 'Budgeting & Planning',
      items: [
        {
          question: "How do I set up a budget?",
          answer: "Navigate to the 'Budget' section, click 'Create New Budget', select a category, set your budget amount and period (weekly or monthly), and save. RupeeTally will track your spending against your budget and send alerts when you're close to exceeding it."
        },
        {
          question: "Can I set different budgets for different categories?",
          answer: "Yes, you can create multiple budgets for different expense categories. For example, you can have separate budgets for groceries, dining out, entertainment, transportation, etc."
        },
        {
          question: "Does RupeeTally offer financial planning tools?",
          answer: "Yes, RupeeTally provides financial planning tools to help you set and track your financial goals. You can plan for short-term goals like vacations or long-term goals like buying a home or retirement."
        }
      ]
    },
    {
      title: 'Investments & SIPs',
      items: [
        {
          question: "Can I track SIPs, mutual funds, and other Indian investments?",
          answer: "Yes, our investment tracking feature is specially designed for Indian investors. You can monitor SIPs, stocks, mutual funds, PPF, gold, and other assets common in Indian portfolios. You can track performance, returns, and get insights into your investment portfolio."
        },
        {
          question: "How does RupeeTally calculate investment returns?",
          answer: "RupeeTally calculates returns using industry-standard methods including absolute returns, CAGR (Compounded Annual Growth Rate), XIRR (Extended Internal Rate of Return), and time-weighted returns, giving you comprehensive insights into your investments' performance."
        },
        {
          question: "Can I track my Provident Fund (PF) and PPF investments?",
          answer: "Yes, RupeeTally allows you to track your Provident Fund and Public Provident Fund (PPF) investments. You can enter your contributions and see how they grow over time with compound interest."
        }
      ]
    },
    {
      title: 'Loans & Borrowing',
      items: [
        {
          question: "How does the lending/borrowing tracker work?",
          answer: "Our lending/borrowing tracker allows you to record when you lend money to or borrow from friends and family. You can record the person's details, date, amount, and set reminders for repayment dates to ensure you never forget about pending transactions."
        },
        {
          question: "Can I track EMIs for my loans?",
          answer: "Yes, RupeeTally helps you track EMIs for various loans such as home loans, car loans, personal loans, and education loans. You can monitor your outstanding principal, interest paid, and remaining tenure."
        },
        {
          question: "Does RupeeTally provide loan analytics?",
          answer: "Yes, RupeeTally offers comprehensive loan analytics, showing you how much interest you're paying, your debt-to-income ratio, and potential savings through prepayments or refinancing."
        }
      ]
    },
    {
      title: 'Technical Support',
      items: [
        {
          question: "Does RupeeTally work on mobile devices?",
          answer: "Absolutely! RupeeTally is fully responsive and works on all devices including smartphones and tablets. Our mobile-optimized interface makes it easy to track expenses on the go."
        },
        {
          question: "How do I get help if I have questions?",
          answer: "We offer comprehensive support through our help center, email support, and community forums. Premium users also get access to priority support with response times under 4 hours."
        },
        {
          question: "Can I export my data from RupeeTally?",
          answer: "Yes, you can export your financial data in various formats including Excel, CSV, and PDF. This is useful for tax preparation, financial planning, or if you want to analyze your data using other tools."
        }
      ]
    },
    {
      title: 'Business & GST',
      items: [
        {
          question: "Can I generate GST invoices or track business expenses separately?",
          answer: "Yes, RupeeTally offers business expense tracking with GST categorization, helping freelancers and small business owners keep their personal and business finances separate while managing tax compliance."
        },
        {
          question: "Does RupeeTally help with tax preparation?",
          answer: "Yes, RupeeTally helps you prepare for tax filing by categorizing your income and expenses according to tax categories. You can generate tax reports that summarize your taxable income, deductions, and investments eligible for tax benefits."
        },
        {
          question: "Can I track multiple businesses or professions?",
          answer: "Yes, RupeeTally allows you to create separate profiles for different businesses or professional activities, making it easy to track income and expenses for each venture separately."
        }
      ]
    }
  ];
  
  // Filter FAQs based on search query
  const filteredFAQs = searchQuery.trim() === '' 
    ? faqCategories 
    : faqCategories.map(category => ({
        ...category,
        items: category.items.filter(item => 
          item.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
          item.answer.toLowerCase().includes(searchQuery.toLowerCase())
        )
      })).filter(category => category.items.length > 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Header with back button */}
      <header className="container mx-auto py-6 px-4">
        <Link href="/">
          <Button variant="ghost" className="flex items-center">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>
      </header>

      <main className="container mx-auto px-4 py-8 md:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
              Find answers to common questions about RupeeTally and how it can help you manage your finances better.
            </p>
            
            {/* Search bar */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                type="search" 
                placeholder="Search for answers..." 
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Display filtered FAQs by category */}
          {filteredFAQs.length > 0 ? (
            filteredFAQs.map((category, categoryIndex) => (
              category.items.length > 0 && (
                <motion.div
                  key={categoryIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                  className="mb-10"
                >
                  <h2 className="text-2xl font-semibold mb-4">{category.title}</h2>
                  <Accordion type="single" collapsible className="w-full">
                    {category.items.map((faq, faqIndex) => (
                      <AccordionItem key={faqIndex} value={`item-${categoryIndex}-${faqIndex}`}>
                        <AccordionTrigger className="text-lg font-medium text-left hover:text-primary transition-colors">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </motion.div>
              )
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-muted-foreground">No FAQs match your search. Try different keywords.</p>
              <Button className="mt-4" variant="outline" onClick={() => setSearchQuery('')}>
                Clear Search
              </Button>
            </div>
          )}
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-center mt-16 border-t pt-8"
          >
            <h3 className="text-xl font-semibold mb-2">Still have questions?</h3>
            <p className="text-muted-foreground mb-4">
              We're here to help. Contact our support team for assistance.
            </p>
            <Link href="/contact">
              <Button>Contact Support</Button>
            </Link>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}