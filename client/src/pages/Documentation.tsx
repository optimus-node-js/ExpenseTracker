import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Search, BookOpen, Copy } from 'lucide-react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { toast } from '@/hooks/use-toast';

export default function Documentation() {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }, []);

  // State for search
  const [searchQuery, setSearchQuery] = useState("");
  
  // State for active section (for mobile sidebar)
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);

  // Documentation sections
  const docSections = [
    {
      id: "getting-started",
      title: "Getting Started",
      icon: <BookOpen className="h-5 w-5" />,
      subsections: [
        {
          id: "introduction",
          title: "Introduction to RupeeTally",
          content: (
            <div className="space-y-4">
              <p>
                Welcome to RupeeTally, your comprehensive financial management platform tailored specifically for Indian users. 
                RupeeTally helps you track expenses, manage budgets, monitor investments, and gain insights into your financial 
                health - all in one place.
              </p>
              
              <div className="bg-primary/5 p-4 rounded-md">
                <h4 className="font-medium mb-2">Key Features</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Expense tracking with Indian-specific categories</li>
                  <li>Budget management with custom periods</li>
                  <li>Bank statement import and analysis</li>
                  <li>Investment portfolio tracking (including SIPs)</li>
                  <li>Loan management and repayment tracking</li>
                  <li>Financial insights and reports</li>
                </ul>
              </div>
              
              <p>
                This documentation will guide you through setting up and using RupeeTally to get the most out of your 
                financial management journey.
              </p>
            </div>
          )
        },
        {
          id: "creating-account",
          title: "Creating Your Account",
          content: (
            <div className="space-y-4">
              <p>
                To get started with RupeeTally, you'll need to create an account. Follow these simple steps:
              </p>
              
              <ol className="list-decimal pl-5 space-y-2">
                <li>
                  <strong>Visit the signup page</strong>: Navigate to the <Link href="/signup" className="text-primary">Signup Page</Link> or click on "Sign Up" in the top navigation bar.
                </li>
                <li>
                  <strong>Enter your details</strong>: Fill in your name, email address, and create a strong password. Alternatively, you can use "Login with Google" for a quicker signup process.
                </li>
                <li>
                  <strong>Verify your email</strong>: Check your inbox for a verification email from RupeeTally and click the verification link.
                </li>
                <li>
                  <strong>Complete your profile</strong>: After verifying your email, you'll be prompted to fill in some basic financial information to help customize your experience.
                </li>
              </ol>
              
              <div className="bg-yellow-100/50 dark:bg-yellow-900/20 p-4 rounded-md border border-yellow-200 dark:border-yellow-900/50">
                <h4 className="font-medium mb-2">Security Note</h4>
                <p className="text-sm">
                  Your financial data is important to us. RupeeTally uses industry-standard encryption protocols and never stores your bank login credentials.
                  We only store the financial data you choose to import or enter manually.
                </p>
              </div>
            </div>
          )
        },
        {
          id: "dashboard-overview",
          title: "Dashboard Overview",
          content: (
            <div className="space-y-4">
              <p>
                The RupeeTally dashboard is your central hub for monitoring your financial health. Here's what you'll find:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="border rounded-md p-4">
                  <h4 className="font-medium mb-2">Financial Summary</h4>
                  <p className="text-sm text-muted-foreground">
                    Get a quick overview of your income, expenses, savings, and investments. The summary shows 
                    current month statistics and comparison with previous months.
                  </p>
                </div>
                
                <div className="border rounded-md p-4">
                  <h4 className="font-medium mb-2">Budget Progress</h4>
                  <p className="text-sm text-muted-foreground">
                    Visual representation of your budget usage across categories, helping you stay on track with your 
                    spending goals.
                  </p>
                </div>
                
                <div className="border rounded-md p-4">
                  <h4 className="font-medium mb-2">Recent Transactions</h4>
                  <p className="text-sm text-muted-foreground">
                    View your most recent income and expense transactions, with options to filter and search.
                  </p>
                </div>
                
                <div className="border rounded-md p-4">
                  <h4 className="font-medium mb-2">Upcoming Reminders</h4>
                  <p className="text-sm text-muted-foreground">
                    Alerts for upcoming bill payments, SIP investments, loan EMIs, and other financial deadlines.
                  </p>
                </div>
              </div>
              
              <p>
                You can customize your dashboard by rearranging widgets, adding or removing sections, and changing the 
                time period for analysis. Click the "Customize" button in the top-right corner of the dashboard to get started.
              </p>
            </div>
          )
        }
      ]
    },
    {
      id: "expense-tracking",
      title: "Expense Tracking",
      icon: <BookOpen className="h-5 w-5" />,
      subsections: [
        {
          id: "adding-transactions",
          title: "Adding Transactions",
          content: (
            <div className="space-y-4">
              <p>
                RupeeTally makes it easy to record your financial transactions. You can add transactions in several ways:
              </p>
              
              <h4 className="font-medium mt-6 mb-2">Manual Transaction Entry</h4>
              <ol className="list-decimal pl-5 space-y-2">
                <li>Navigate to the "Transactions" page from the main sidebar</li>
                <li>Click the "+ Add Transaction" button in the top-right corner</li>
                <li>
                  Fill in the transaction details:
                  <ul className="list-disc pl-5 mt-1 space-y-1">
                    <li><strong>Type</strong>: Select whether it's an income or expense</li>
                    <li><strong>Amount</strong>: Enter the transaction amount</li>
                    <li><strong>Date</strong>: Select the date when the transaction occurred</li>
                    <li><strong>Category</strong>: Choose from predefined categories or create a new one</li>
                    <li><strong>Description</strong>: Add a note about the transaction</li>
                    <li><strong>Payment Method</strong>: Select how you paid (cash, UPI, credit card, etc.)</li>
                    <li><strong>Tags</strong>: Add optional tags for better organization</li>
                  </ul>
                </li>
                <li>Click "Save" to add the transaction to your records</li>
              </ol>
              
              <h4 className="font-medium mt-6 mb-2">Importing Bank Statements</h4>
              <p>
                RupeeTally supports importing transactions from bank statements from all major Indian banks:
              </p>
              <ol className="list-decimal pl-5 space-y-2">
                <li>Navigate to the "Upload" page from the main sidebar</li>
                <li>Click the "Upload Statement" button</li>
                <li>Select your bank from the dropdown list</li>
                <li>Choose the statement period</li>
                <li>Upload your statement file (PDF or Excel format)</li>
                <li>Review the extracted transactions</li>
                <li>Confirm the import to add the transactions to your account</li>
              </ol>
            </div>
          )
        },
        {
          id: "categorizing-transactions",
          title: "Categorizing Transactions",
          content: (
            <div className="space-y-4">
              <p>
                Properly categorizing your transactions is essential for accurate financial analysis. RupeeTally offers a 
                robust categorization system tailored for Indian users.
              </p>
              
              <h4 className="font-medium mt-6 mb-2">Default Categories</h4>
              <p>
                RupeeTally comes with predefined categories commonly used in Indian households, including:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h5 className="font-medium mb-1">Expense Categories</h5>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Housing (Rent, Maintenance, Property Tax)</li>
                    <li>Groceries & Household Items</li>
                    <li>Dining Out & Food Delivery</li>
                    <li>Transportation (Fuel, Public Transport)</li>
                    <li>Shopping (Clothing, Electronics)</li>
                    <li>Bills & Utilities (Electricity, Water, Internet)</li>
                    <li>Healthcare (Medical, Insurance)</li>
                    <li>Education (Tuition, Books)</li>
                    <li>Entertainment & Recreation</li>
                    <li>Personal Care (Saloon, Spa)</li>
                    <li>Gifts & Donations</li>
                    <li>Travel & Vacation</li>
                    <li>Investments & Savings</li>
                  </ul>
                </div>
                
                <div>
                  <h5 className="font-medium mb-1">Income Categories</h5>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Salary & Wages</li>
                    <li>Business Income</li>
                    <li>Freelance & Contract Work</li>
                    <li>Investment Returns (Dividends, Interest)</li>
                    <li>Rental Income</li>
                    <li>Refunds & Reimbursements</li>
                    <li>Gifts Received</li>
                  </ul>
                </div>
              </div>
            </div>
          )
        }
      ]
    },
    {
      id: "budgeting",
      title: "Budgeting",
      icon: <BookOpen className="h-5 w-5" />,
      subsections: [
        {
          id: "creating-budget",
          title: "Creating a Budget",
          content: (
            <div className="space-y-4">
              <p>
                Budgeting is a fundamental aspect of financial management. RupeeTally makes it easy to create, track,
                and adjust your budgets.
              </p>
              
              <h4 className="font-medium mt-6 mb-2">Setting Up Your First Budget</h4>
              <ol className="list-decimal pl-5 space-y-2">
                <li>Navigate to the "Budget" page from the main sidebar</li>
                <li>Click the "+ Create Budget" button</li>
                <li>
                  Fill in the budget details:
                  <ul className="list-disc pl-5 mt-1 space-y-1">
                    <li><strong>Name</strong>: Give your budget a descriptive name</li>
                    <li><strong>Amount</strong>: Set the maximum amount you want to spend</li>
                    <li><strong>Period</strong>: Choose weekly, monthly, quarterly, or yearly</li>
                    <li><strong>Category</strong>: Select which expense category this budget applies to</li>
                    <li><strong>Start Date</strong>: When your budget period begins</li>
                    <li><strong>Rollover</strong>: Toggle whether unused budget rolls over to the next period</li>
                  </ul>
                </li>
                <li>Click "Save" to create your budget</li>
              </ol>
            </div>
          )
        }
      ]
    },
    {
      id: "investments",
      title: "Investment Tracking",
      icon: <BookOpen className="h-5 w-5" />,
      subsections: [
        {
          id: "adding-investments",
          title: "Adding Investments",
          content: (
            <div className="space-y-4">
              <p>
                RupeeTally allows you to track various types of investments popular in India, helping you monitor your 
                portfolio growth and returns.
              </p>
              
              <h4 className="font-medium mt-6 mb-2">Supported Investment Types</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="border rounded-md p-4">
                  <h5 className="font-medium mb-1">Mutual Funds</h5>
                  <p className="text-sm text-muted-foreground">
                    Track equity, debt, hybrid, and index funds from all major AMCs in India.
                  </p>
                </div>
                
                <div className="border rounded-md p-4">
                  <h5 className="font-medium mb-1">Stocks</h5>
                  <p className="text-sm text-muted-foreground">
                    Monitor individual stock holdings from NSE and BSE exchanges.
                  </p>
                </div>
                
                <div className="border rounded-md p-4">
                  <h5 className="font-medium mb-1">Fixed Deposits</h5>
                  <p className="text-sm text-muted-foreground">
                    Track bank FDs, corporate deposits, and post office time deposits.
                  </p>
                </div>
                
                <div className="border rounded-md p-4">
                  <h5 className="font-medium mb-1">Government Schemes</h5>
                  <p className="text-sm text-muted-foreground">
                    Monitor PPF, EPF, NPS, Sukanya Samriddhi, and other government-backed investments.
                  </p>
                </div>
              </div>
            </div>
          )
        }
      ]
    },
    {
      id: "tips-tricks",
      title: "Tips & Tricks",
      icon: <BookOpen className="h-5 w-5" />,
      subsections: [
        {
          id: "keyboard-shortcuts",
          title: "Keyboard Shortcuts",
          content: (
            <div className="space-y-4">
              <p>
                Speed up your financial management with these keyboard shortcuts available in RupeeTally.
              </p>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 px-4 font-medium">Action</th>
                      <th className="text-left py-2 px-4 font-medium">Windows/Linux</th>
                      <th className="text-left py-2 px-4 font-medium">macOS</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2 px-4">Add new transaction</td>
                      <td className="py-2 px-4 font-mono text-sm">Alt + T</td>
                      <td className="py-2 px-4 font-mono text-sm">⌥ + T</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-4">Create new budget</td>
                      <td className="py-2 px-4 font-mono text-sm">Alt + B</td>
                      <td className="py-2 px-4 font-mono text-sm">⌥ + B</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-4">Go to dashboard</td>
                      <td className="py-2 px-4 font-mono text-sm">Alt + D</td>
                      <td className="py-2 px-4 font-mono text-sm">⌥ + D</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-4">Open search</td>
                      <td className="py-2 px-4 font-mono text-sm">Ctrl + /</td>
                      <td className="py-2 px-4 font-mono text-sm">⌘ + /</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )
        }
      ]
    }
  ];

  // Filter sections and subsections based on search
  const filteredSections = searchQuery.trim() === "" 
    ? docSections 
    : docSections.map(section => ({
        ...section,
        subsections: section.subsections.filter(subsection => 
          subsection.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
      })).filter(section => section.subsections.length > 0);

  // Function to copy code to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "The text has been copied to your clipboard."
    });
  };

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

      <main className="container mx-auto px-4 pb-12">
        {/* Hero section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <Badge variant="outline" className="mb-4">Documentation</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">RupeeTally Documentation</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            Comprehensive guides and references to help you get the most out of RupeeTally's
            financial management features.
          </p>
          
          <div className="relative max-w-xl mx-auto mb-10">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search documentation..." 
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </motion.div>
        
        {/* Documentation content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:sticky lg:top-20 lg:self-start lg:max-h-[calc(100vh-10rem)] lg:overflow-y-auto hidden lg:block pr-6">
            <nav className="space-y-1">
              {filteredSections.map((section) => (
                <div key={section.id} className="py-2">
                  <h3 className="font-medium text-lg mb-2">{section.title}</h3>
                  <ul className="pl-4 space-y-1">
                    {section.subsections.map((subsection) => (
                      <li key={subsection.id}>
                        <a 
                          href={`#${subsection.id}`}
                          className="text-muted-foreground hover:text-primary transition-colors py-1 block"
                        >
                          {subsection.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </div>

          {/* Mobile navigation */}
          <div className="lg:hidden mb-8">
            <Accordion type="single" collapsible className="w-full">
              {filteredSections.map((section) => (
                <AccordionItem key={section.id} value={section.id}>
                  <AccordionTrigger className="flex items-center gap-2">
                    {section.icon}
                    <span>{section.title}</span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="pl-6 space-y-3">
                      {section.subsections.map((subsection) => (
                        <li key={subsection.id}>
                          <a 
                            href={`#${subsection.id}`}
                            className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                            onClick={() => setActiveSectionId(null)}
                          >
                            <span>•</span>
                            {subsection.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          
          {/* Main content */}
          <div className="lg:col-span-3">
            {filteredSections.length > 0 ? (
              <div className="space-y-16">
                {filteredSections.map((section) => (
                  <div key={section.id} id={section.id} className="scroll-mt-20">
                    {section.subsections.map((subsection) => (
                      <motion.div 
                        key={subsection.id} 
                        id={subsection.id}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="mb-12 scroll-mt-20"
                      >
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                          {section.icon}
                          {subsection.title}
                        </h2>
                        <div className="prose prose-slate dark:prose-invert max-w-none">
                          {subsection.content}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <h3 className="text-xl font-semibold mb-2">No documentation found</h3>
                <p className="text-muted-foreground mb-6">Try adjusting your search terms or browse a different section.</p>
                <Button onClick={() => setSearchQuery("")}>View All Documentation</Button>
              </div>
            )}
          </div>
        </div>
        
        {/* Help section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-primary/5 rounded-lg p-8 md:p-12 text-center max-w-4xl mx-auto mt-16"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Need More Help?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            If you couldn't find what you're looking for, check out our other support resources 
            or contact our support team directly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/faq">
              <Button variant="outline" className="gap-2">
                <BookOpen className="h-4 w-4" />
                Browse FAQs
              </Button>
            </Link>
            <Link href="/guides">
              <Button variant="outline" className="gap-2">
                <BookOpen className="h-4 w-4" />
                User Guides
              </Button>
            </Link>
            <Link href="/contact">
              <Button className="gap-2">
                Contact Support
              </Button>
            </Link>
          </div>
        </motion.div>
      </main>
    </div>
  );
}