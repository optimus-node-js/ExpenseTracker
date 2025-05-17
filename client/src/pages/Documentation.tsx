import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Search, BookOpen, ChevronRight, Copy, ExternalLink, ChevronDown } from 'lucide-react';
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

type DocSection = {
  id: string;
  title: string;
  icon: React.ReactNode;
  subsections: DocSubsection[];
};

type DocSubsection = {
  id: string;
  title: string;
  content: React.ReactNode;
};

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
  const docSections: DocSection[] = [
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
              
              <div className="bg-primary/5 p-4 rounded-md">
                <h4 className="font-medium mb-2">Supported Bank Formats</h4>
                <ul className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  <li>HDFC Bank</li>
                  <li>ICICI Bank</li>
                  <li>SBI</li>
                  <li>Axis Bank</li>
                  <li>Kotak Mahindra</li>
                  <li>Bank of Baroda</li>
                  <li>Canara Bank</li>
                  <li>Punjab National Bank</li>
                  <li>Union Bank</li>
                  <li>And many more!</li>
                </ul>
              </div>
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
              
              <h4 className="font-medium mt-6 mb-2">Creating Custom Categories</h4>
              <p>
                You can create your own categories to better match your financial structure:
              </p>
              <ol className="list-decimal pl-5 space-y-2">
                <li>Navigate to "Settings" from the profile menu</li>
                <li>Select "Categories" from the settings menu</li>
                <li>Click "Add New Category"</li>
                <li>Enter a name for your category</li>
                <li>Select a parent category (optional)</li>
                <li>Choose an icon and color</li>
                <li>Click "Save" to create your new category</li>
              </ol>
              
              <h4 className="font-medium mt-6 mb-2">Auto-Categorization Rules</h4>
              <p>
                RupeeTally can automatically categorize your transactions based on rules:
              </p>
              <ol className="list-decimal pl-5 space-y-2">
                <li>Go to "Settings" and then "Auto-Categorization"</li>
                <li>Click "Add New Rule"</li>
                <li>Set conditions (e.g., description contains "Swiggy" - category "Dining Out")</li>
                <li>Save your rule</li>
              </ol>
              <p className="text-sm text-muted-foreground">
                The system will automatically apply your rules to new transactions, saving you time on manual categorization.
              </p>
            </div>
          )
        },
        {
          id: "transaction-tags",
          title: "Using Transaction Tags",
          content: (
            <div className="space-y-4">
              <p>
                Tags provide an additional layer of organization beyond categories. While categories group transactions 
                by general purpose, tags can help you track specific events, projects, or contexts.
              </p>
              
              <h4 className="font-medium mt-6 mb-2">How to Use Tags</h4>
              <p>
                When adding or editing a transaction, you can add one or more tags:
              </p>
              <ol className="list-decimal pl-5 space-y-2">
                <li>In the transaction form, find the "Tags" field</li>
                <li>Type a tag name and press Enter (or select from existing tags)</li>
                <li>Add multiple tags as needed</li>
              </ol>
              
              <h4 className="font-medium mt-6 mb-2">Example Use Cases for Tags</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Trip tracking</strong>: Tag all expenses related to a specific trip (e.g., "Goa2025") to 
                  calculate the total cost of your vacation
                </li>
                <li>
                  <strong>Project expenses</strong>: Tag expenses related to a home renovation or special event
                </li>
                <li>
                  <strong>Family members</strong>: Tag transactions made for specific family members
                </li>
                <li>
                  <strong>Tax deductible</strong>: Tag expenses that may be eligible for tax deductions
                </li>
                <li>
                  <strong>Reimbursable</strong>: Tag expenses that will be reimbursed by your employer
                </li>
              </ul>
              
              <h4 className="font-medium mt-6 mb-2">Filtering by Tags</h4>
              <p>
                To view transactions with specific tags:
              </p>
              <ol className="list-decimal pl-5 space-y-2">
                <li>Navigate to the "Transactions" page</li>
                <li>Click the "Filter" button</li>
                <li>Select one or more tags from the dropdown</li>
                <li>Apply the filter to see matching transactions</li>
              </ol>
              
              <div className="bg-primary/5 p-4 rounded-md">
                <h4 className="font-medium mb-2">Pro Tip</h4>
                <p className="text-sm">
                  You can create tag-based reports to analyze spending patterns for specific tags. Go to "Reports" and then 
                  "Custom Report" and select tags as a grouping dimension.
                </p>
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
              
              <h4 className="font-medium mt-6 mb-2">Budget Types</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="border rounded-md p-4">
                  <h5 className="font-medium mb-1">Category Budget</h5>
                  <p className="text-sm text-muted-foreground">
                    Set spending limits for specific categories like groceries, dining out, or entertainment.
                  </p>
                </div>
                
                <div className="border rounded-md p-4">
                  <h5 className="font-medium mb-1">Overall Budget</h5>
                  <p className="text-sm text-muted-foreground">
                    Create a total spending limit across all categories to control your overall expenses.
                  </p>
                </div>
                
                <div className="border rounded-md p-4">
                  <h5 className="font-medium mb-1">Group Budget</h5>
                  <p className="text-sm text-muted-foreground">
                    Combine multiple categories into a single budget (e.g., "Entertainment" could include movies, 
                    dining out, and recreation).
                  </p>
                </div>
                
                <div className="border rounded-md p-4">
                  <h5 className="font-medium mb-1">Goal-based Budget</h5>
                  <p className="text-sm text-muted-foreground">
                    Set up saving targets for specific goals like vacations, major purchases, or emergency funds.
                  </p>
                </div>
              </div>
              
              <h4 className="font-medium mt-6 mb-2">Budget Templates</h4>
              <p>
                RupeeTally offers several budget templates tailored for Indian households:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>50-30-20 Rule</strong>: 50% on needs, 30% on wants, 20% on savings and debt repayment 
                  (adapted for Indian contexts)
                </li>
                <li>
                  <strong>Zero-based Budget</strong>: Allocate every rupee to a specific category or purpose
                </li>
                <li>
                  <strong>Envelope System</strong>: Divide your income into different spending categories
                </li>
                <li>
                  <strong>Custom Template</strong>: Create your own budget allocation based on your priorities
                </li>
              </ul>
              <p>
                To use a template, click "Use Template" when creating a new budget and select your preferred
                template from the dropdown menu.
              </p>
            </div>
          )
        },
        {
          id: "tracking-budget",
          title: "Tracking Budget Performance",
          content: (
            <div className="space-y-4">
              <p>
                Once you've set up your budgets, RupeeTally provides tools to monitor your spending and ensure you 
                stay on track.
              </p>
              
              <h4 className="font-medium mt-6 mb-2">Budget Dashboard</h4>
              <p>
                The Budget Dashboard gives you a visual overview of your budget performance:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Progress Bars</strong>: See how much of each budget you've used, with color-coding 
                  (green: within budget, yellow: approaching limit, red: exceeded)
                </li>
                <li>
                  <strong>Spending Trends</strong>: View historical spending patterns to identify trends
                </li>
                <li>
                  <strong>Category Breakdown</strong>: See which subcategories contribute most to your spending
                </li>
                <li>
                  <strong>Remaining Amount</strong>: Track how much you have left to spend in each budget
                </li>
              </ul>
              
              <h4 className="font-medium mt-6 mb-2">Budget Alerts</h4>
              <p>
                Set up notifications to stay informed about your budget status:
              </p>
              <ol className="list-decimal pl-5 space-y-2">
                <li>Go to "Settings" and then "Notifications"</li>
                <li>Enable "Budget Alerts"</li>
                <li>
                  Configure alert thresholds (e.g., notify when you've spent 75% of a budget, 
                  or when you've exceeded a budget)
                </li>
                <li>Choose notification methods (app, email, or SMS)</li>
              </ol>
              
              <h4 className="font-medium mt-6 mb-2">Adjusting Budgets</h4>
              <p>
                Life happens, and sometimes budgets need to change. To modify an existing budget:
              </p>
              <ol className="list-decimal pl-5 space-y-2">
                <li>Navigate to the "Budget" page</li>
                <li>Find the budget you want to adjust</li>
                <li>Click the "Edit" button (pencil icon)</li>
                <li>Make your changes to amount, period, or other settings</li>
                <li>Click "Save" to update the budget</li>
              </ol>
              
              <div className="bg-primary/5 p-4 rounded-md">
                <h4 className="font-medium mb-2">Budget Insights</h4>
                <p className="text-sm">
                  At the end of each budget period, RupeeTally generates insights about your spending patterns 
                  and suggests potential adjustments to make your budgets more realistic based on your actual spending habits.
                </p>
              </div>
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
                
                <div className="border rounded-md p-4">
                  <h5 className="font-medium mb-1">Gold & Other Assets</h5>
                  <p className="text-sm text-muted-foreground">
                    Track physical gold, digital gold, real estate, and other alternative investments.
                  </p>
                </div>
                
                <div className="border rounded-md p-4">
                  <h5 className="font-medium mb-1">Insurance Policies</h5>
                  <p className="text-sm text-muted-foreground">
                    Monitor ULIPs, endowment plans, and other insurance policies with investment components.
                  </p>
                </div>
              </div>
              
              <h4 className="font-medium mt-6 mb-2">Adding a New Investment</h4>
              <ol className="list-decimal pl-5 space-y-2">
                <li>Navigate to the "Investments" page from the main sidebar</li>
                <li>Click "+ Add Investment"</li>
                <li>
                  Select the investment type and fill in the details:
                  <ul className="list-disc pl-5 mt-1 space-y-1">
                    <li><strong>Name/Scheme</strong>: Enter the investment name or select from our database</li>
                    <li><strong>Purchase Date</strong>: When you made the investment</li>
                    <li><strong>Purchase Value</strong>: Initial amount invested</li>
                    <li><strong>Quantity/Units</strong>: Number of units or shares (if applicable)</li>
                    <li><strong>Current Value</strong>: Present value (updated automatically for many investments)</li>
                    <li><strong>Notes</strong>: Any additional information you want to record</li>
                  </ul>
                </li>
                <li>Click "Save" to add the investment to your portfolio</li>
              </ol>
              
              <h4 className="font-medium mt-6 mb-2">Bulk Import</h4>
              <p>
                For users with multiple investments, RupeeTally offers a bulk import feature:
              </p>
              <ol className="list-decimal pl-5 space-y-2">
                <li>Click "Import Investments" on the Investments page</li>
                <li>Download the template Excel file</li>
                <li>Fill in your investment details following the template format</li>
                <li>Upload the completed file</li>
                <li>Review and confirm the imported investments</li>
              </ol>
              
              <div className="bg-yellow-100/50 dark:bg-yellow-900/20 p-4 rounded-md border border-yellow-200 dark:border-yellow-900/50">
                <h4 className="font-medium mb-2">Note</h4>
                <p className="text-sm">
                  For many mutual funds and stocks, RupeeTally can automatically fetch current values through our data 
                  providers. For other investments, you'll need to update values manually for the most accurate portfolio analysis.
                </p>
              </div>
            </div>
          )
        },
        {
          id: "tracking-sips",
          title: "Tracking SIPs",
          content: (
            <div className="space-y-4">
              <p>
                Systematic Investment Plans (SIPs) are a popular investment method in India. RupeeTally offers specialized 
                features to track your SIP investments.
              </p>
              
              <h4 className="font-medium mt-6 mb-2">Setting Up SIP Tracking</h4>
              <ol className="list-decimal pl-5 space-y-2">
                <li>Navigate to the "SIPs" section under the Investments tab</li>
                <li>Click "+ Add SIP"</li>
                <li>
                  Enter the SIP details:
                  <ul className="list-disc pl-5 mt-1 space-y-1">
                    <li><strong>Fund Name</strong>: Select the mutual fund from our database</li>
                    <li><strong>SIP Amount</strong>: Monthly investment amount</li>
                    <li><strong>Start Date</strong>: When your SIP began</li>
                    <li><strong>Frequency</strong>: Monthly, quarterly, or custom</li>
                    <li><strong>SIP Day</strong>: Day of the month when investment happens</li>
                    <li><strong>Duration</strong>: How long the SIP will continue (optional)</li>
                    <li><strong>Folio Number</strong>: For reference (optional)</li>
                  </ul>
                </li>
                <li>Click "Save" to set up SIP tracking</li>
              </ol>
              
              <h4 className="font-medium mt-6 mb-2">SIP Performance Analysis</h4>
              <p>
                RupeeTally provides comprehensive analytics for your SIP investments:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Total Investment</strong>: Cumulative amount invested through the SIP
                </li>
                <li>
                  <strong>Current Value</strong>: Present worth of your SIP investments
                </li>
                <li>
                  <strong>Returns</strong>: Calculated as XIRR (Extended Internal Rate of Return) for accurate performance measurement
                </li>
                <li>
                  <strong>Graphical Representation</strong>: Visual tracking of investment growth over time
                </li>
                <li>
                  <strong>Individual Installments</strong>: Track the performance of each SIP installment separately
                </li>
              </ul>
              
              <h4 className="font-medium mt-6 mb-2">SIP Calculator</h4>
              <p>
                Plan your future investments with the built-in SIP calculator:
              </p>
              <ol className="list-decimal pl-5 space-y-2">
                <li>Go to the "Tools" section and select "SIP Calculator"</li>
                <li>
                  Enter your parameters:
                  <ul className="list-disc pl-5 mt-1 space-y-1">
                    <li>Monthly investment amount</li>
                    <li>Expected annual return rate</li>
                    <li>Investment duration in years</li>
                    <li>Step-up percentage (annual increase in SIP amount, if any)</li>
                  </ul>
                </li>
                <li>View projected results including:
                  <ul className="list-disc pl-5 mt-1 space-y-1">
                    <li>Total amount invested</li>
                    <li>Expected wealth generated</li>
                    <li>Wealth gain</li>
                    <li>Year-by-year breakdown</li>
                  </ul>
                </li>
              </ol>
              
              <div className="bg-primary/5 p-4 rounded-md">
                <h4 className="font-medium mb-2">SIP Reminders</h4>
                <p className="text-sm">
                  RupeeTally can send you notifications before each SIP due date to ensure you have sufficient 
                  funds in your bank account. Enable this feature in Settings, then Notifications, then Investment Alerts.
                </p>
              </div>
            </div>
          )
        }
      ]
    },
    {
      id: "loans-tracking",
      title: "Loans & Borrowing",
      icon: <BookOpen className="h-5 w-5" />,
      subsections: [
        {
          id: "tracking-loans",
          title: "Tracking Loans & EMIs",
          content: (
            <div className="space-y-4">
              <p>
                RupeeTally helps you manage all your loans and EMIs in one place, giving you a clear picture of your 
                liabilities and repayment schedules.
              </p>
              
              <h4 className="font-medium mt-6 mb-2">Adding a Loan</h4>
              <ol className="list-decimal pl-5 space-y-2">
                <li>Navigate to the "Loans" page from the main sidebar</li>
                <li>Click "+ Add Loan"</li>
                <li>
                  Fill in the loan details:
                  <ul className="list-disc pl-5 mt-1 space-y-1">
                    <li><strong>Loan Type</strong>: Home, car, personal, education, etc.</li>
                    <li><strong>Principal Amount</strong>: Total loan amount</li>
                    <li><strong>Interest Rate</strong>: Annual interest rate percentage</li>
                    <li><strong>Loan Start Date</strong>: When the loan was disbursed</li>
                    <li><strong>Loan Tenure</strong>: Total duration in months or years</li>
                    <li><strong>EMI Amount</strong>: Monthly payment amount</li>
                    <li><strong>Lender Name</strong>: Bank or financial institution</li>
                    <li><strong>Payment Date</strong>: Date of the month when EMI is due</li>
                  </ul>
                </li>
                <li>Click "Save" to add the loan to your records</li>
              </ol>
              
              <h4 className="font-medium mt-6 mb-2">Loan Dashboard Features</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="border rounded-md p-4">
                  <h5 className="font-medium mb-1">Repayment Schedule</h5>
                  <p className="text-sm text-muted-foreground">
                    View a complete month-by-month breakdown of your EMIs, showing principal and interest components.
                  </p>
                </div>
                
                <div className="border rounded-md p-4">
                  <h5 className="font-medium mb-1">Loan Summary</h5>
                  <p className="text-sm text-muted-foreground">
                    See your outstanding principal, interest paid to date, remaining tenure, and total cost of the loan.
                  </p>
                </div>
                
                <div className="border rounded-md p-4">
                  <h5 className="font-medium mb-1">Prepayment Calculator</h5>
                  <p className="text-sm text-muted-foreground">
                    Calculate the impact of making additional payments toward your loan principal.
                  </p>
                </div>
                
                <div className="border rounded-md p-4">
                  <h5 className="font-medium mb-1">EMI Reminders</h5>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications before EMI due dates to avoid late payment penalties.
                  </p>
                </div>
              </div>
              
              <h4 className="font-medium mt-6 mb-2">Recording EMI Payments</h4>
              <p>
                RupeeTally can automatically track your EMI payments if they come from a linked bank account. 
                For manual tracking:
              </p>
              <ol className="list-decimal pl-5 space-y-2">
                <li>Go to the "Loans" page and select the loan</li>
                <li>Click "Record Payment"</li>
                <li>Enter the payment date and amount</li>
                <li>Add any additional notes (e.g., prepayment details)</li>
                <li>Click "Save" to record the payment</li>
              </ol>
              
              <div className="bg-primary/5 p-4 rounded-md">
                <h4 className="font-medium mb-2">Pro Tip: Loan Analytics</h4>
                <p className="text-sm">
                  Visit the "Analytics" section to view your debt-to-income ratio and loan distribution by type. 
                  These insights can help you maintain a healthy financial balance and make informed decisions 
                  about future borrowing.
                </p>
              </div>
            </div>
          )
        },
        {
          id: "lending-tracking",
          title: "Personal Lending Tracker",
          content: (
            <div className="space-y-4">
              <p>
                Beyond institutional loans, RupeeTally helps you track money borrowed from or lent to friends and family members.
              </p>
              
              <h4 className="font-medium mt-6 mb-2">Recording Personal Loans</h4>
              <ol className="list-decimal pl-5 space-y-2">
                <li>Navigate to the "Loans" page and select the "Personal" tab</li>
                <li>Click "+ Add Entry"</li>
                <li>
                  Select the loan type:
                  <ul className="list-disc pl-5 mt-1 space-y-1">
                    <li><strong>Money Lent</strong>: You gave money to someone</li>
                    <li><strong>Money Borrowed</strong>: You borrowed money from someone</li>
                  </ul>
                </li>
                <li>
                  Fill in the details:
                  <ul className="list-disc pl-5 mt-1 space-y-1">
                    <li><strong>Person's Name</strong>: Who you lent to or borrowed from</li>
                    <li><strong>Amount</strong>: The sum of money involved</li>
                    <li><strong>Date</strong>: When the transaction occurred</li>
                    <li><strong>Due Date</strong>: Expected repayment date (optional)</li>
                    <li><strong>Interest</strong>: If any interest is applicable (usually zero for personal loans)</li>
                    <li><strong>Purpose</strong>: Reason for the loan</li>
                    <li><strong>Notes</strong>: Any additional details</li>
                  </ul>
                </li>
                <li>Click "Save" to record the personal loan</li>
              </ol>
              
              <h4 className="font-medium mt-6 mb-2">Managing Repayments</h4>
              <p>
                To record repayments for personal loans:
              </p>
              <ol className="list-decimal pl-5 space-y-2">
                <li>Find the loan in your Personal loans list</li>
                <li>Click "Record Repayment"</li>
                <li>Enter the amount being repaid and the date</li>
                <li>If it's a partial repayment, the loan will remain active with the reduced amount</li>
                <li>For full repayments, you can mark the loan as "Completed"</li>
              </ol>
              
              <h4 className="font-medium mt-6 mb-2">Reminders and Notifications</h4>
              <p>
                Set up reminders for personal loans to avoid awkward situations:
              </p>
              <ol className="list-decimal pl-5 space-y-2">
                <li>When adding or editing a personal loan, enable "Set Reminder"</li>
                <li>Choose when to be reminded (e.g., 3 days before due date)</li>
                <li>Select notification method (app, email, or SMS)</li>
              </ol>
              <p>
                Reminders can be set for both money you've lent (to follow up with borrowers) and 
                money you've borrowed (to ensure timely repayment).
              </p>
              
              <div className="bg-yellow-100/50 dark:bg-yellow-900/20 p-4 rounded-md border border-yellow-200 dark:border-yellow-900/50">
                <h4 className="font-medium mb-2">Personal Lending Best Practices</h4>
                <p className="text-sm">
                  For significant personal loans, consider documenting the terms in writing. RupeeTally allows you to 
                  attach files (such as promissory notes or payment receipts) to personal loan records for better documentation.
                </p>
              </div>
            </div>
          )
        }
      ]
    },
    {
      id: "reports-analytics",
      title: "Reports & Analytics",
      icon: <BookOpen className="h-5 w-5" />,
      subsections: [
        {
          id: "standard-reports",
          title: "Standard Reports",
          content: (
            <div className="space-y-4">
              <p>
                RupeeTally offers a variety of pre-built reports to help you analyze your financial data 
                and gain valuable insights.
              </p>
              
              <h4 className="font-medium mt-6 mb-2">Available Standard Reports</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="border rounded-md p-4">
                  <h5 className="font-medium mb-1">Monthly Summary</h5>
                  <p className="text-sm text-muted-foreground">
                    Overview of income, expenses, savings, and budget performance for each month.
                  </p>
                </div>
                
                <div className="border rounded-md p-4">
                  <h5 className="font-medium mb-1">Category Analysis</h5>
                  <p className="text-sm text-muted-foreground">
                    Breakdown of spending by category with trends and comparisons to previous periods.
                  </p>
                </div>
                
                <div className="border rounded-md p-4">
                  <h5 className="font-medium mb-1">Income vs. Expenses</h5>
                  <p className="text-sm text-muted-foreground">
                    Compare your income sources against expense categories with surplus/deficit analysis.
                  </p>
                </div>
                
                <div className="border rounded-md p-4">
                  <h5 className="font-medium mb-1">Annual Tax Report</h5>
                  <p className="text-sm text-muted-foreground">
                    Summary of tax-related transactions, categorized by applicable tax sections.
                  </p>
                </div>
                
                <div className="border rounded-md p-4">
                  <h5 className="font-medium mb-1">Net Worth Tracker</h5>
                  <p className="text-sm text-muted-foreground">
                    Overview of your assets, liabilities, and resulting net worth over time.
                  </p>
                </div>
                
                <div className="border rounded-md p-4">
                  <h5 className="font-medium mb-1">Investment Performance</h5>
                  <p className="text-sm text-muted-foreground">
                    Analysis of your investment portfolio with returns, asset allocation, and growth metrics.
                  </p>
                </div>
              </div>
              
              <h4 className="font-medium mt-6 mb-2">Accessing Reports</h4>
              <ol className="list-decimal pl-5 space-y-2">
                <li>Navigate to the "Reports" page from the main sidebar</li>
                <li>Select the desired report type from the list</li>
                <li>Choose the time period for analysis (e.g., current month, last quarter, custom date range)</li>
                <li>View the generated report with charts, tables, and insights</li>
              </ol>
              
              <h4 className="font-medium mt-6 mb-2">Report Actions</h4>
              <p>
                Once a report is generated, you can:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Export</strong>: Download reports in PDF, Excel, or CSV formats for sharing or further analysis
                </li>
                <li>
                  <strong>Save</strong>: Save report configurations for quick access in the future
                </li>
                <li>
                  <strong>Schedule</strong>: Set up automated report generation and delivery to your email
                </li>
                <li>
                  <strong>Compare</strong>: View side-by-side comparisons with previous periods
                </li>
              </ul>
              
              <div className="bg-primary/5 p-4 rounded-md">
                <h4 className="font-medium mb-2">Scheduled Reports</h4>
                <p className="text-sm">
                  Set up monthly or quarterly summary reports to be automatically sent to your email. This helps you 
                  stay on top of your finances without having to manually generate reports each time.
                </p>
                <p className="text-sm mt-2">
                  To set up scheduled reports, go to "Reports" > "Schedule" and configure your preferences.
                </p>
              </div>
            </div>
          )
        },
        {
          id: "custom-reports",
          title: "Creating Custom Reports",
          content: (
            <div className="space-y-4">
              <p>
                Beyond the standard reports, RupeeTally allows you to create custom reports tailored to your 
                specific financial analysis needs.
              </p>
              
              <h4 className="font-medium mt-6 mb-2">Building a Custom Report</h4>
              <ol className="list-decimal pl-5 space-y-2">
                <li>Navigate to "Reports" > "Custom Reports"</li>
                <li>Click "Create New Report"</li>
                <li>
                  Configure your report components:
                  <ul className="list-disc pl-5 mt-1 space-y-1">
                    <li><strong>Data Source</strong>: Choose transactions, budget, investments, or loans data</li>
                    <li><strong>Time Period</strong>: Select the date range for analysis</li>
                    <li><strong>Grouping</strong>: Decide how to group data (e.g., by category, month, payment method)</li>
                    <li><strong>Filters</strong>: Apply filters to focus on specific data points</li>
                    <li><strong>Calculations</strong>: Select metrics to calculate (sum, average, count, etc.)</li>
                    <li><strong>Visualization</strong>: Choose how to display data (tables, pie charts, bar graphs, etc.)</li>
                  </ul>
                </li>
                <li>Add multiple components to create a comprehensive dashboard</li>
                <li>Name and save your custom report</li>
              </ol>
              
              <h4 className="font-medium mt-6 mb-2">Advanced Report Features</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="border rounded-md p-4">
                  <h5 className="font-medium mb-1">Data Drill-Down</h5>
                  <p className="text-sm text-muted-foreground">
                    Click on any data point in charts or tables to view the underlying transactions or details.
                  </p>
                </div>
                
                <div className="border rounded-md p-4">
                  <h5 className="font-medium mb-1">Conditional Formatting</h5>
                  <p className="text-sm text-muted-foreground">
                    Highlight data based on conditions (e.g., red for over-budget categories, green for savings goals met).
                  </p>
                </div>
                
                <div className="border rounded-md p-4">
                  <h5 className="font-medium mb-1">Calculated Fields</h5>
                  <p className="text-sm text-muted-foreground">
                    Create custom calculations using existing data fields (e.g., percentage of income spent on discretionary items).
                  </p>
                </div>
                
                <div className="border rounded-md p-4">
                  <h5 className="font-medium mb-1">Template Sharing</h5>
                  <p className="text-sm text-muted-foreground">
                    Share report templates with family members or save them as favorites for quick access.
                  </p>
                </div>
              </div>
              
              <h4 className="font-medium mt-6 mb-2">Example Custom Reports</h4>
              <p>
                Here are some useful custom reports you might consider creating:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Discretionary Spending Analysis</strong>: Track non-essential expenses to identify potential savings
                </li>
                <li>
                  <strong>Tag-based Reports</strong>: Analyze expenses related to specific tags like "Work Reimbursable" or "Tax Deductible"
                </li>
                <li>
                  <strong>Payment Method Breakdown</strong>: See how much you spend via different payment methods (cash, credit cards, UPI, etc.)
                </li>
                <li>
                  <strong>Annual Financial Summary</strong>: Create a comprehensive year-end report for financial planning
                </li>
                <li>
                  <strong>Goal Progress Tracker</strong>: Monitor progress toward specific financial goals
                </li>
              </ul>
              
              <div className="bg-yellow-100/50 dark:bg-yellow-900/20 p-4 rounded-md border border-yellow-200 dark:border-yellow-900/50">
                <h4 className="font-medium mb-2">Report Performance Note</h4>
                <p className="text-sm">
                  Complex custom reports analyzing large datasets may take longer to generate. For optimal performance,
                  consider using specific date ranges and applying appropriate filters.
                </p>
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
                    <tr className="border-b">
                      <td className="py-2 px-4">Save form</td>
                      <td className="py-2 px-4 font-mono text-sm">Ctrl + S</td>
                      <td className="py-2 px-4 font-mono text-sm">⌘ + S</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-4">Cancel/close form</td>
                      <td className="py-2 px-4 font-mono text-sm">Esc</td>
                      <td className="py-2 px-4 font-mono text-sm">Esc</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-4">Generate report</td>
                      <td className="py-2 px-4 font-mono text-sm">Alt + R</td>
                      <td className="py-2 px-4 font-mono text-sm">⌥ + R</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-4">Export data</td>
                      <td className="py-2 px-4 font-mono text-sm">Ctrl + E</td>
                      <td className="py-2 px-4 font-mono text-sm">⌘ + E</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-4">Help</td>
                      <td className="py-2 px-4 font-mono text-sm">F1</td>
                      <td className="py-2 px-4 font-mono text-sm">F1</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-4">Toggle dark/light mode</td>
                      <td className="py-2 px-4 font-mono text-sm">Alt + Shift + D</td>
                      <td className="py-2 px-4 font-mono text-sm">⌥ + ⇧ + D</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <p className="text-sm text-muted-foreground mt-4">
                To view a complete list of keyboard shortcuts within the application, press <code className="font-mono">?</code> from any screen.
              </p>
            </div>
          )
        },
        {
          id: "power-user-tips",
          title: "Power User Tips",
          content: (
            <div className="space-y-4">
              <p>
                Take your RupeeTally experience to the next level with these advanced tips and tricks.
              </p>
              
              <h4 className="font-medium mt-6 mb-2">Data Management</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Bulk Operations</strong>: Use the checkbox selection in transaction lists to perform bulk actions 
                  like categorizing, tagging, or deleting multiple transactions at once.
                </li>
                <li>
                  <strong>Split Transactions</strong>: For purchases that span multiple categories (e.g., supermarket trips), 
                  use the "Split Transaction" feature to allocate portions to different categories.
                </li>
                <li>
                  <strong>Transaction Rules</strong>: Create rules to automatically categorize recurring transactions based 
                  on description patterns, amounts, or vendors.
                </li>
                <li>
                  <strong>Data Cleanup</strong>: Use the "Find Duplicates" tool in Settings to identify and merge duplicate 
                  transactions.
                </li>
              </ul>
              
              <h4 className="font-medium mt-6 mb-2">Customization</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Custom Categories</strong>: Create a category hierarchy that matches your spending patterns for 
                  more meaningful reports.
                </li>
                <li>
                  <strong>Dashboard Widgets</strong>: Customize your dashboard by adding, removing, or rearranging widgets 
                  to focus on what matters most.
                </li>
                <li>
                  <strong>Report Templates</strong>: Save custom report configurations as templates for quick access to frequently 
                  used financial insights.
                </li>
                <li>
                  <strong>Notification Settings</strong>: Fine-tune notifications to receive alerts for important events while 
                  minimizing interruptions.
                </li>
              </ul>
              
              <h4 className="font-medium mt-6 mb-2">Workflow Optimization</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Weekly Review</strong>: Set aside 15 minutes each week to review and categorize recent transactions, 
                  ensuring your data stays accurate.
                </li>
                <li>
                  <strong>Monthly Analysis</strong>: Conduct a monthly review using the "Monthly Summary" report to identify 
                  spending patterns and opportunities for improvement.
                </li>
                <li>
                  <strong>Quarterly Goals</strong>: Use the "Financial Goals" feature to set and track progress on 3-month 
                  savings or debt reduction goals.
                </li>
                <li>
                  <strong>Annual Reset</strong>: At the start of each year, review and adjust your budget categories and 
                  financial goals.
                </li>
              </ul>
              
              <h4 className="font-medium mt-6 mb-2">Mobile App Tips</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Quick Add</strong>: Use the + button in the bottom-right corner of the mobile app to quickly add 
                  transactions on the go.
                </li>
                <li>
                  <strong>Receipt Scanning</strong>: Snap a photo of receipts to automatically extract and add transaction 
                  details.
                </li>
                <li>
                  <strong>Offline Mode</strong>: Enable offline mode in settings to add transactions without an internet 
                  connection, which will sync when you're back online.
                </li>
                <li>
                  <strong>Widget Support</strong>: Add RupeeTally widgets to your phone's home screen for quick access to 
                  budget status and recent transactions.
                </li>
              </ul>
              
              <div className="bg-primary/5 p-4 rounded-md">
                <h4 className="font-medium mb-2">Data Sync Between Devices</h4>
                <p className="text-sm">
                  For seamless experience across devices, ensure you're logged in with the same account on all devices. 
                  Changes made on one device will automatically sync to others when connected to the internet.
                </p>
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
          subsection.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          React.Children.toArray(subsection.content)
            .filter(child => typeof child === 'string' || typeof child?.props?.children === 'string')
            .some(child => 
              (typeof child === 'string' && child.toLowerCase().includes(searchQuery.toLowerCase())) ||
              (typeof child?.props?.children === 'string' && child.props.children.toLowerCase().includes(searchQuery.toLowerCase()))
            )
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
                            <ChevronRight className="h-3 w-3" />
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