import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Calendar, Clock, BookOpen, Share2, ArrowLeft, ArrowRight } from 'lucide-react';
import { Link, useRoute } from 'wouter';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";

// Guide type 
type Guide = {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  readTime: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  content: string;
  featuredOrder?: number;
};

// Sample guides data - in a real app, this would come from the backend
const guides: Guide[] = [
  {
    id: "setup-account",
    title: "Setting Up Your RupeeTally Account",
    description: "A comprehensive guide to creating and configuring your personal finance dashboard with RupeeTally.",
    category: "Getting Started",
    image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=1000&auto=format&fit=crop",
    readTime: 5,
    difficulty: "Beginner",
    featuredOrder: 1,
    content: `
      <h2>Getting Started with Your RupeeTally Account</h2>
      
      <p>Welcome to RupeeTally! This guide will walk you through the process of setting up your account and configuring your personal finance dashboard to match your financial needs.</p>
      
      <h3>Step 1: Creating Your Account</h3>
      
      <p>To get started with RupeeTally, follow these simple steps:</p>
      
      <ol>
        <li>Visit the <a href="/">RupeeTally signup page</a></li>
        <li>Enter your email address</li>
        <li>Create a strong, secure password</li>
        <li>Click "Create Account"</li>
      </ol>
      
      <p>You'll receive a verification email. Click the link in the email to verify your account and proceed to the next step.</p>
      
      <h3>Step 2: Setting Up Your Profile</h3>
      
      <p>Once your account is verified, you'll be prompted to set up your profile. This includes:</p>
      
      <ul>
        <li>Your name and basic information</li>
        <li>Currency preferences (INR by default)</li>
        <li>Monthly income (optional, but recommended for budget features)</li>
        <li>Initial account balance (if you want to start tracking from a specific amount)</li>
      </ul>
      
      <p>Don't worry—all of this information can be updated later from your profile settings.</p>
      
      <h3>Step 3: Customize Your Dashboard</h3>
      
      <p>After setting up your profile, you'll be directed to your dashboard. Here's how to customize it:</p>
      
      <ol>
        <li>Click the "Settings" icon in the top-right corner</li>
        <li>Select "Dashboard Settings"</li>
        <li>Choose the widgets you want to display</li>
        <li>Arrange them in your preferred order</li>
        <li>Click "Save Changes"</li>
      </ol>
      
      <p>Your dashboard is the hub of your financial life in RupeeTally. Take time to organize it in a way that helps you focus on your most important financial goals.</p>
      
      <h3>Step 4: Connect Your Accounts (Optional)</h3>
      
      <p>To get the most out of RupeeTally, you may want to connect your financial accounts:</p>
      
      <ul>
        <li>Go to "Accounts" in the main menu</li>
        <li>Click "Add Account"</li>
        <li>Select your bank from the list of supported institutions</li>
        <li>Follow the secure connection process</li>
      </ul>
      
      <p>Note: RupeeTally uses bank-level security protocols to ensure your financial information remains safe and private.</p>
    `
  },
  {
    id: "import-transactions",
    title: "How to Import Bank Statements",
    description: "Learn how to seamlessly import your bank statements from major Indian banks into RupeeTally.",
    category: "Getting Started",
    image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?q=80&w=1000&auto=format&fit=crop",
    readTime: 7,
    difficulty: "Beginner",
    featuredOrder: 2,
    content: `
      <h2>Importing Bank Statements into RupeeTally</h2>
      
      <p>Manually entering each transaction can be time-consuming. RupeeTally simplifies your financial management by allowing you to import statements directly from most major Indian banks.</p>
      
      <h3>Supported Banks and Statement Formats</h3>
      
      <p>RupeeTally supports statement imports from all major Indian banks, including SBI, HDFC, ICICI, Axis Bank, and many more.</p>
      
      <h4>Supported Formats:</h4>
      <ul>
        <li>PDF statements (most banks)</li>
        <li>Excel (.xls, .xlsx) files</li>
        <li>CSV files</li>
      </ul>
      
      <h3>How to Import Your Bank Statement</h3>
      
      <p>Follow these steps to import your bank statement:</p>
      
      <ol>
        <li>Log in to your RupeeTally account</li>
        <li>Navigate to "Transactions" in the main menu</li>
        <li>Click the "Import" button</li>
        <li>Select "Bank Statement" from the import options</li>
        <li>Choose your bank from the dropdown menu</li>
        <li>Upload your statement file</li>
        <li>Click "Process Statement"</li>
      </ol>
      
      <p>Once uploaded, RupeeTally will automatically process your statement, which may take a few moments for larger files.</p>
      
      <h3>Reviewing and Categorizing Imported Transactions</h3>
      
      <p>After processing, you'll see a summary screen with your imported transactions:</p>
      
      <ol>
        <li>Review the automatically categorized transactions</li>
        <li>Make manual adjustments to categories if needed</li>
        <li>Add tags for better organization</li>
        <li>Click "Confirm Import" to save all transactions to your account</li>
      </ol>
      
      <p>RupeeTally's AI will learn from your manual categorizations to improve future imports.</p>
      
      <h3>Troubleshooting Common Import Issues</h3>
      
      <p>If you encounter issues during import, try these solutions:</p>
      
      <ul>
        <li><strong>Unrecognized format:</strong> Ensure you're using a supported file format</li>
        <li><strong>Parsing errors:</strong> Try exporting your statement in a different format</li>
        <li><strong>Duplicate transactions:</strong> Use the duplicate detection tool to identify and remove duplicates</li>
        <li><strong>Missing data:</strong> Some banks may not include all transaction details in exports</li>
      </ul>
      
      <p>For persistent issues, contact our support team for assistance.</p>
    `
  },
  {
    id: "budget-guide",
    title: "Creating Effective Budgets",
    description: "Master the art of budgeting with RupeeTally's powerful budget tools tailored for Indian households.",
    category: "Budgeting",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1000&auto=format&fit=crop",
    readTime: 8,
    difficulty: "Intermediate",
    featuredOrder: 3,
    content: `
      <h2>Creating Effective Budgets in RupeeTally</h2>
      
      <p>A well-planned budget is the foundation of financial success. This guide will help you create budgets that work for your unique financial situation.</p>
      
      <h3>Understanding Budget Types in RupeeTally</h3>
      
      <p>RupeeTally offers different budgeting approaches to match your financial style:</p>
      
      <ul>
        <li><strong>Category Budgets:</strong> Set limits for specific expense categories</li>
        <li><strong>Monthly Budgets:</strong> Create a comprehensive plan for all expenses in a month</li>
        <li><strong>Project Budgets:</strong> Track spending for specific events or goals</li>
      </ul>
      
      <h3>Creating Your First Budget</h3>
      
      <p>Follow these steps to create a monthly budget:</p>
      
      <ol>
        <li>Navigate to the "Budgets" section</li>
        <li>Click "Create New Budget"</li>
        <li>Select "Monthly Budget"</li>
        <li>Choose the month and year</li>
        <li>Enter your income sources</li>
        <li>Allocate amounts to expense categories</li>
        <li>Save your budget</li>
      </ol>
      
      <p>RupeeTally will automatically track your spending against this budget throughout the month.</p>
      
      <h3>Tips for Effective Budgeting</h3>
      
      <p>Here are some best practices for creating realistic and effective budgets:</p>
      
      <ul>
        <li><strong>Analyze Past Spending:</strong> Review your previous 3 months of transactions to understand your spending patterns before setting budget amounts</li>
        <li><strong>Follow the 50/30/20 Rule:</strong> Allocate 50% of income to needs, 30% to wants, and 20% to savings and debt repayment</li>
        <li><strong>Include Irregular Expenses:</strong> Account for quarterly or annual expenses by setting aside monthly amounts</li>
        <li><strong>Create Buffer Categories:</strong> Add a miscellaneous category with a small allocation for unexpected expenses</li>
        <li><strong>Revisit and Adjust:</strong> Review your budget regularly and adjust as needed</li>
      </ul>
      
      <h3>Setting Up Budget Alerts</h3>
      
      <p>RupeeTally can notify you about your budget progress:</p>
      
      <ol>
        <li>Go to "Budget Settings"</li>
        <li>Select "Notifications"</li>
        <li>Choose when you want to receive alerts (e.g., at 50%, 75%, and 100% of budget)</li>
        <li>Select notification methods (app, email, SMS)</li>
        <li>Save your preferences</li>
      </ol>
      
      <p>These alerts help you stay on track with your spending goals throughout the month.</p>
    `
  },
  {
    id: "track-expenses",
    title: "Tracking Daily Expenses Effectively",
    description: "Master the art of categorizing and tracking your daily expenses for better financial awareness.",
    category: "Expense Tracking",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=1000&auto=format&fit=crop",
    readTime: 6,
    difficulty: "Beginner",
    content: `
      <h2>Mastering Daily Expense Tracking</h2>
      
      <p>Tracking your daily expenses is the foundation of good financial management. This guide will show you how to effectively use RupeeTally to monitor where your money goes.</p>
      
      <h3>Adding Manual Transactions</h3>
      
      <p>While importing bank statements is convenient, sometimes you need to add expenses manually:</p>
      
      <ol>
        <li>Click the "+" button on the dashboard or transactions page</li>
        <li>Select "Add Expense" or "Add Income"</li>
        <li>Enter the amount and date</li>
        <li>Select or create a category</li>
        <li>Add optional notes or tags</li>
        <li>Save the transaction</li>
      </ol>
      
      <p>The mobile app includes a quick-entry mode for even faster transaction recording.</p>
      
      <h3>Working with Categories</h3>
      
      <p>Proper categorization is key to meaningful financial insights:</p>
      
      <ul>
        <li><strong>Default Categories:</strong> RupeeTally comes with common Indian expense categories pre-configured</li>
        <li><strong>Custom Categories:</strong> Create your own categories for your unique expenses</li>
        <li><strong>Subcategories:</strong> Add detail with subcategories (e.g., Transportation > Fuel)</li>
        <li><strong>Category Icons:</strong> Assign recognizable icons to make categories visually distinct</li>
      </ul>
      
      <h3>Using Tags for Detailed Tracking</h3>
      
      <p>Tags add another dimension to your transaction data:</p>
      
      <ul>
        <li>Add multiple tags to a single transaction</li>
        <li>Create tags for specific people, projects, or events</li>
        <li>Use seasonal tags like "Diwali" or "Wedding Season"</li>
        <li>Filter reports by tags to see spending patterns</li>
      </ul>
      
      <p>Example: A restaurant bill could be categorized as "Dining Out" but tagged with "Work Lunch" and "Client Meeting"</p>
      
      <h3>Recurring Transactions</h3>
      
      <p>For predictable expenses that happen regularly:</p>
      
      <ol>
        <li>Create or select an existing transaction</li>
        <li>Click "Make Recurring"</li>
        <li>Set the frequency (daily, weekly, monthly, etc.)</li>
        <li>Specify an end date or number of recurrences (optional)</li>
        <li>Save the recurring schedule</li>
      </ol>
      
      <p>RupeeTally will automatically add these transactions on schedule, saving you time and ensuring your records are complete.</p>
    `
  },
  {
    id: "investment-portfolio",
    title: "Setting Up Your Investment Portfolio",
    description: "Learn how to track and manage your investments in stocks, mutual funds, and other assets.",
    category: "Investments",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1000&auto=format&fit=crop",
    readTime: 10,
    difficulty: "Intermediate",
    content: `
      <h2>Managing Your Investment Portfolio in RupeeTally</h2>
      
      <p>Track all your investments in one place with RupeeTally's comprehensive investment monitoring tools.</p>
      
      <h3>Setting Up Your Investment Accounts</h3>
      
      <p>Begin by adding your investment accounts to RupeeTally:</p>
      
      <ol>
        <li>Navigate to the "Investments" section</li>
        <li>Click "Add Investment Account"</li>
        <li>Select the account type:
          <ul>
            <li>Stocks/Equities</li>
            <li>Mutual Funds</li>
            <li>Fixed Deposits</li>
            <li>PPF/EPF</li>
            <li>Gold/Silver</li>
            <li>Real Estate</li>
            <li>Bonds</li>
            <li>Others</li>
          </ul>
        </li>
        <li>Enter account details and initial balance</li>
        <li>Connect to your brokerage if supported (optional)</li>
      </ol>
      
      <p>RupeeTally supports popular Indian brokerages and mutual fund platforms for automatic updates.</p>
      
      <h3>Tracking Stock Investments</h3>
      
      <p>For stock portfolios, RupeeTally offers detailed tracking:</p>
      
      <ul>
        <li>Add individual stocks with purchase dates and prices</li>
        <li>View real-time or end-of-day market values</li>
        <li>Track dividends and bonus shares</li>
        <li>Analyze sector allocation and concentration risk</li>
        <li>Monitor long-term and short-term capital gains</li>
      </ul>
      
      <h3>Managing Mutual Fund Investments</h3>
      
      <p>For mutual fund investors, RupeeTally provides specialized tools:</p>
      
      <ul>
        <li>Track SIPs (Systematic Investment Plans) automatically</li>
        <li>Record lump sum investments</li>
        <li>Compare performance against benchmarks</li>
        <li>View exposure to different asset classes through fund holdings</li>
        <li>Calculate exit loads and tax implications</li>
      </ul>
      
      <h3>Performance Analysis</h3>
      
      <p>Understand how your investments are performing:</p>
      
      <ul>
        <li><strong>Performance Dashboard:</strong> Visual summary of your investment performance</li>
        <li><strong>Time-weighted Returns:</strong> See annualized returns across different timeframes</li>
        <li><strong>Comparison Tools:</strong> Compare different investments or portfolios</li>
        <li><strong>Goal Tracking:</strong> Monitor progress toward specific financial goals</li>
      </ul>
      
      <p>The performance analysis takes into account dividends, additional purchases, and partial redemptions for accurate calculations.</p>
      
      <h3>Tax Planning for Investments</h3>
      
      <p>RupeeTally helps optimize your investment taxes:</p>
      
      <ul>
        <li>Identifies tax-saving investment opportunities</li>
        <li>Calculates capital gains taxes based on holding periods</li>
        <li>Highlights tax-loss harvesting opportunities</li>
        <li>Tracks Section 80C eligible investments</li>
        <li>Provides year-end tax reports for your investments</li>
      </ul>
    `
  },
  {
    id: "sip-calculator",
    title: "Using the SIP Calculator & Tracker",
    description: "Understand how to use RupeeTally's SIP calculator to plan and track your mutual fund investments.",
    category: "SIPs",
    image: "https://images.unsplash.com/photo-1565514158740-064f34bd6cfd?q=80&w=1000&auto=format&fit=crop",
    readTime: 8,
    difficulty: "Intermediate",
    content: `
      <h2>Mastering SIP Investments with RupeeTally</h2>
      
      <p>Systematic Investment Plans (SIPs) are one of the smartest ways to build wealth. Learn how to use RupeeTally to plan, track, and optimize your SIP investments.</p>
      
      <h3>Understanding SIPs</h3>
      
      <p>Before diving into the tools, let's clarify what SIPs are:</p>
      
      <ul>
        <li>A SIP is a disciplined approach to investing in mutual funds</li>
        <li>You invest a fixed amount at regular intervals (typically monthly)</li>
        <li>SIPs leverage rupee-cost averaging to reduce the impact of market volatility</li>
        <li>They help build the habit of regular investing</li>
      </ul>
      
      <h3>Using the SIP Calculator</h3>
      
      <p>RupeeTally's SIP calculator helps you plan your investment journey:</p>
      
      <ol>
        <li>Navigate to "Tools" > "SIP Calculator"</li>
        <li>Enter your monthly investment amount</li>
        <li>Set your investment timeframe in years</li>
        <li>Input the expected annual return rate</li>
        <li>Click "Calculate" to see projected results</li>
      </ol>
      
      <p>The calculator will show you the total invested amount, expected returns, and final corpus.</p>
      
      <h3>Advanced SIP Planning Features</h3>
      
      <p>RupeeTally offers sophisticated SIP planning tools:</p>
      
      <ul>
        <li><strong>SIP Step-up:</strong> Calculate the impact of increasing your SIP amount annually</li>
        <li><strong>Goal-based Planning:</strong> Determine how much you need to invest monthly to reach a specific target amount</li>
        <li><strong>Inflation-adjusted Returns:</strong> See the real value of your investments after accounting for inflation</li>
        <li><strong>Comparison Tool:</strong> Compare different SIP scenarios side by side</li>
      </ul>
      
      <h3>Tracking Your SIP Investments</h3>
      
      <p>Once you've started your SIPs, track them effectively:</p>
      
      <ol>
        <li>Go to "Investments" > "SIP Tracker"</li>
        <li>Add your SIP investments with the following details:
          <ul>
            <li>Fund name</li>
            <li>SIP amount</li>
            <li>Start date</li>
            <li>Frequency</li>
            <li>SIP end date (if applicable)</li>
          </ul>
        </li>
        <li>Link to your actual mutual fund account for automatic updates (optional)</li>
      </ol>
      
      <h3>Analyzing SIP Performance</h3>
      
      <p>RupeeTally provides detailed analysis of your SIP investments:</p>
      
      <ul>
        <li><strong>Individual SIP Performance:</strong> Track each SIP's growth over time</li>
        <li><strong>Absolute vs. XIRR Returns:</strong> See both simple and annualized returns</li>
        <li><strong>Benchmark Comparison:</strong> Compare your fund's performance against relevant indices</li>
        <li><strong>SIP Heatmap:</strong> Visualize when your SIPs have performed well or poorly</li>
      </ul>
      
      <p>These insights help you make informed decisions about continuing, increasing, or stopping specific SIPs.</p>
    `
  },
  {
    id: "loan-management",
    title: "Managing Personal Loans & EMIs",
    description: "Keep track of your loans, EMIs, and lending activities with RupeeTally's loan management features.",
    category: "Loans",
    image: "https://images.unsplash.com/photo-1603796846097-bee99e4a601f?q=80&w=1000&auto=format&fit=crop",
    readTime: 9,
    difficulty: "Intermediate",
    content: `
      <h2>Comprehensive Loan Management with RupeeTally</h2>
      
      <p>Whether you're tracking home loans, personal loans, or money lent to friends, RupeeTally helps you manage all your lending and borrowing in one place.</p>
      
      <h3>Adding a New Loan</h3>
      
      <p>To add a new loan you've taken:</p>
      
      <ol>
        <li>Navigate to the "Loans" section</li>
        <li>Click "Add Loan"</li>
        <li>Select "I am the borrower"</li>
        <li>Enter loan details:
          <ul>
            <li>Loan name/purpose</li>
            <li>Lender name</li>
            <li>Principal amount</li>
            <li>Interest rate</li>
            <li>Loan start date</li>
            <li>Loan term</li>
            <li>Payment frequency</li>
          </ul>
        </li>
        <li>Upload any loan documents (optional)</li>
        <li>Save the loan details</li>
      </ol>
      
      <p>RupeeTally will automatically generate an amortization schedule and track your payments.</p>
      
      <h3>Recording Money You've Lent</h3>
      
      <p>For money you've lent to others:</p>
      
      <ol>
        <li>Go to "Loans" > "Add Loan"</li>
        <li>Select "I am the lender"</li>
        <li>Enter borrower details:</li>
          <ul>
            <li>Borrower's name</li>
            <li>Contact information (optional)</li>
            <li>Relationship (friend, family, etc.)</li>
          </ul>
        <li>Specify loan terms:</li>
          <ul>
            <li>Amount lent</li>
            <li>Interest (if applicable)</li>
            <li>Repayment schedule</li>
            <li>Purpose (optional)</li>
          </ul>
        <li>Set up repayment reminders (optional)</li>
        <li>Save the loan</li>
      </ol>
      
      <p>You can configure automatic reminders to send to borrowers when payments are due.</p>
      
      <h3>Tracking EMI Payments</h3>
      
      <p>For loans with regular EMIs, RupeeTally offers specialized tracking:</p>
      
      <ul>
        <li>Automatic EMI payment tracking when linked to your bank account</li>
        <li>Manual confirmation of payments</li>
        <li>Payment history with principal and interest breakdown</li>
        <li>Visual representation of loan payoff progress</li>
        <li>Prepayment impact calculator</li>
      </ul>
      
      <p>The prepayment calculator helps you understand how making extra payments can reduce your loan term and interest costs.</p>
      
      <h3>Loan Analytics and Insights</h3>
      
      <p>Get valuable insights into your loans:</p>
      
      <ul>
        <li><strong>Debt Overview:</strong> See your total debt burden and monthly obligations</li>
        <li><strong>Debt-to-Income Ratio:</strong> Monitor this critical financial health metric</li>
        <li><strong>Interest Cost Analysis:</strong> Understand the true cost of your loans over time</li>
        <li><strong>Payoff Strategies:</strong> Get recommendations for which loans to prioritize paying off</li>
      </ul>
      
      <p>These insights help you make strategic decisions about debt management and repayment prioritization.</p>
    `
  }
];

export default function GuideDetails() {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }, []);

  // Get guide ID from URL
  const [, params] = useRoute("/guides/:id");
  const guideId = params?.id;
  
  // Find the guide that matches the ID
  const guide = guides.find(guide => guide.id === guideId);
  
  // State for related guides
  const [relatedGuides, setRelatedGuides] = useState<typeof guides>([]);
  
  // Find related guides based on category and difficulty
  useEffect(() => {
    if (guide) {
      const related = guides
        .filter(g => g.id !== guide.id) // exclude current guide
        .filter(g => g.category === guide.category || g.difficulty === guide.difficulty)
        .slice(0, 3); // limit to 3 guides
      
      setRelatedGuides(related);
    }
  }, [guide]);

  // If guide not found
  if (!guide) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <h2 className="text-2xl font-bold mb-4">Guide Not Found</h2>
          <p className="text-muted-foreground mb-6">The guide you're looking for doesn't exist or may have been moved.</p>
          <Link href="/guides">
            <Button>Back to Guides</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header with back button */}
      <header className="container mx-auto py-6 px-4">
        <Link href="/guides">
          <Button variant="ghost" className="flex items-center">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Guides
          </Button>
        </Link>
      </header>

      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          {/* Guide header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Badge className="mb-4">{guide.category}</Badge>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">{guide.title}</h1>
            
            <div className="flex flex-wrap items-center gap-4 mb-6 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{guide.readTime} min read</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                <span>{guide.difficulty}</span>
              </div>
            </div>
          </motion.div>
          
          {/* Featured image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-10"
          >
            <div className="aspect-video w-full rounded-lg overflow-hidden">
              <img
                src={guide.image}
                alt={guide.title}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
          
          {/* Guide content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="prose prose-lg dark:prose-invert prose-headings:font-bold prose-headings:text-foreground prose-p:text-muted-foreground max-w-none mb-16"
            dangerouslySetInnerHTML={{ __html: guide.content }}
          />
          
          {/* Related guides */}
          {relatedGuides.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mb-12"
            >
              <h2 className="text-2xl font-bold mb-6">Related Guides</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedGuides.map((relatedGuide) => (
                  <Card key={relatedGuide.id} className="overflow-hidden">
                    <div className="aspect-[4/3] relative">
                      <img
                        src={relatedGuide.image}
                        alt={relatedGuide.title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                      />
                    </div>
                    <CardHeader className="p-4">
                      <CardTitle className="text-lg line-clamp-2">{relatedGuide.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <CardDescription className="line-clamp-2">
                        {relatedGuide.description}
                      </CardDescription>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                      <Link href={`/guides/${relatedGuide.id}`}>
                        <Button variant="outline" size="sm">Read Guide</Button>
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </motion.div>
          )}
          
          {/* Navigation between guides */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-col sm:flex-row justify-between items-center border-t pt-8"
          >
            <Link href="/guides">
              <Button variant="outline" className="mb-4 sm:mb-0 flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                All Guides
              </Button>
            </Link>
            
            <Link href="/contact">
              <Button>
                <span>Need Help?</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </main>
    </div>
  );
}