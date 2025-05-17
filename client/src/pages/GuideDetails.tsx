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
        <li>Visit the <a href="/signup">RupeeTally signup page</a></li>
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
      
      <h3>Step 3: Connecting Your Financial Accounts (Optional)</h3>
      
      <p>While RupeeTally works perfectly fine with manual entry, connecting your accounts can save you time:</p>
      
      <ol>
        <li>Go to "Settings" > "Connected Accounts"</li>
        <li>Click "Add Account"</li>
        <li>Select your bank from the list of supported Indian banks</li>
        <li>Follow the secure authentication process</li>
      </ol>
      
      <div class="note">
        <strong>Note:</strong> RupeeTally uses read-only access and industry-standard encryption to ensure your banking credentials are never stored on our servers.
      </div>
      
      <h3>Step 4: Customizing Your Dashboard</h3>
      
      <p>Your dashboard is the command center for your finances. To customize it:</p>
      
      <ol>
        <li>Click the "Customize" button in the top-right corner of your dashboard</li>
        <li>Drag and drop widgets to reorganize them</li>
        <li>Click the gear icon on any widget to configure or remove it</li>
        <li>Add new widgets by clicking "Add Widget" and selecting from the available options</li>
      </ol>
      
      <p>We recommend including these essential widgets for beginners:</p>
      <ul>
        <li>"Monthly Overview" to track income vs. expenses</li>
        <li>"Recent Transactions" for quick access to your latest financial activities</li>
        <li>"Budget Progress" to monitor your spending against your budget</li>
        <li>"Upcoming Bills" to avoid missing payments</li>
      </ul>
      
      <h3>Step 5: Setting Up Categories</h3>
      
      <p>RupeeTally comes with pre-configured categories optimized for Indian households, but you can customize them:</p>
      
      <ol>
        <li>Go to "Settings" > "Categories"</li>
        <li>Review the existing categories</li>
        <li>Click "Edit" to modify any category</li>
        <li>Click "Add Category" to create new ones</li>
        <li>Organize categories into groups for better reporting</li>
      </ol>
      
      <p>Some India-specific categories you might want to add include:</p>
      <ul>
        <li>Festival Expenses</li>
        <li>Family Functions</li>
        <li>Domestic Help</li>
        <li>Children's Education</li>
      </ul>
      
      <h3>Step 6: Creating Your First Budget</h3>
      
      <p>Setting up a budget is critical to financial success:</p>
      
      <ol>
        <li>Navigate to the "Budgets" section</li>
        <li>Click "Create New Budget"</li>
        <li>Choose a budget period (monthly is recommended for beginners)</li>
        <li>Allocate amounts to each category</li>
        <li>Save your budget</li>
      </ol>
      
      <p>RupeeTally offers budget templates tailored for Indian income levels and spending patterns. You can use these as starting points and customize them to your needs.</p>
      
      <h3>Step 7: Adding Your First Transaction</h3>
      
      <p>To begin tracking your finances:</p>
      
      <ol>
        <li>Go to the "Transactions" page</li>
        <li>Click "Add Transaction"</li>
        <li>Enter the transaction details (amount, date, category, description)</li>
        <li>Add tags if relevant (optional)</li>
        <li>Click "Save"</li>
      </ol>
      
      <p>You can also add transactions quickly from the dashboard or mobile app for on-the-go expense tracking.</p>
      
      <h3>Step 8: Exploring Reports</h3>
      
      <p>Once you have some transactions recorded, explore the Reports section:</p>
      
      <ol>
        <li>Navigate to "Reports"</li>
        <li>Experiment with different report types (Spending by Category, Income vs. Expenses, etc.)</li>
        <li>Adjust the time period to see different views of your data</li>
        <li>Save custom reports for quick access in the future</li>
      </ol>
      
      <h3>Next Steps</h3>
      
      <p>Now that your account is set up, consider exploring these additional features:</p>
      
      <ul>
        <li><strong>Mobile App:</strong> Download our mobile app for on-the-go expense tracking</li>
        <li><strong>Recurring Transactions:</strong> Set up recurring transactions for regular bills and income</li>
        <li><strong>Savings Goals:</strong> Define financial goals and track your progress</li>
        <li><strong>Investment Tracking:</strong> Add your investments to get a complete picture of your finances</li>
      </ul>
      
      <p>Remember, building good financial habits takes time. Start by consistently tracking your expenses and reviewing your dashboard weekly to gain insights into your spending patterns.</p>
      
      <p>If you have any questions or need assistance, our support team is available via the "Help" section in your account settings.</p>
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
      
      <p>Manually entering each transaction can be time-consuming. RupeeTally simplifies your financial management by allowing you to import statements directly from most major Indian banks. This guide will walk you through the process step by step.</p>
      
      <h3>Supported Banks and Statement Formats</h3>
      
      <p>RupeeTally supports statement imports from the following banks and formats:</p>
      
      <h4>Major Banks:</h4>
      <ul>
        <li>State Bank of India (SBI)</li>
        <li>HDFC Bank</li>
        <li>ICICI Bank</li>
        <li>Axis Bank</li>
        <li>Bank of Baroda</li>
        <li>Punjab National Bank</li>
        <li>Kotak Mahindra Bank</li>
        <li>Union Bank of India</li>
        <li>Canara Bank</li>
        <li>IndusInd Bank</li>
        <li>Yes Bank</li>
        <li>Federal Bank</li>
        <li>And many more...</li>
      </ul>
      
      <h4>Supported Formats:</h4>
      <ul>
        <li>PDF statements (most banks)</li>
        <li>Excel (.xls, .xlsx) files</li>
        <li>CSV files</li>
        <li>QIF and OFX formats (for certain banks)</li>
      </ul>
      
      <div class="tip">
        <strong>Tip:</strong> For the most accurate import results, use PDF statements directly downloaded from your bank's website or the Excel/CSV options when available.
      </div>
      
      <h3>Step 1: Download Your Bank Statement</h3>
      
      <p>Before importing to RupeeTally, you'll need to download your statement from your bank:</p>
      
      <ol>
        <li>Log in to your bank's website or mobile app</li>
        <li>Navigate to the account statements section</li>
        <li>Select the account and date range you want to import</li>
        <li>Choose the format (we recommend PDF or Excel when available)</li>
        <li>Download the statement to your device</li>
      </ol>
      
      <p>Most banks offer statements for download in their online banking portals. Look for options like "Download Statement" or "Export Transactions."</p>
      
      <h3>Step 2: Access the Import Feature in RupeeTally</h3>
      
      <p>To begin the import process:</p>
      
      <ol>
        <li>Log in to your RupeeTally account</li>
        <li>Navigate to "Transactions" in the main menu</li>
        <li>Click the "Import" button (or find "Import Transactions" in the dropdown menu)</li>
        <li>Select "Bank Statement Import" from the options</li>
      </ol>
      
      <h3>Step 3: Upload Your Statement</h3>
      
      <p>Now you're ready to upload your bank statement:</p>
      
      <ol>
        <li>Click "Choose File" or drag and drop your statement file into the designated area</li>
        <li>Select your bank from the dropdown menu</li>
        <li>Choose the account type (savings, current, credit card, etc.)</li>
        <li>Confirm the date format used in your statement (usually auto-detected)</li>
        <li>Click "Upload and Analyze"</li>
      </ol>
      
      <p>RupeeTally will now process your statement. This may take a few moments depending on the file size and number of transactions.</p>
      
      <h3>Step 4: Review and Confirm the Imported Transactions</h3>
      
      <p>After processing, you'll see a preview of the imported transactions:</p>
      
      <ol>
        <li>Review the transactions to ensure they were extracted correctly</li>
        <li>Check that dates, amounts, and descriptions look accurate</li>
        <li>Use the "Edit" button to fix any transactions that need correction</li>
        <li>Use the checkboxes to select which transactions to import (all are selected by default)</li>
        <li>Map any unrecognized categories to the appropriate RupeeTally categories</li>
      </ol>
      
      <div class="warning">
        <strong>Important:</strong> RupeeTally automatically detects duplicate transactions based on date, amount, and description. Potential duplicates will be highlighted for your review.
      </div>
      
      <h3>Step 5: Categorize Transactions</h3>
      
      <p>RupeeTally uses AI to automatically categorize common transactions, but you can adjust these:</p>
      
      <ol>
        <li>Review the suggested categories for each transaction</li>
        <li>Click on any transaction's category to change it if needed</li>
        <li>Use "Bulk Edit" to change multiple similar transactions at once</li>
        <li>Create category rules for recurring transactions (e.g., always categorize "SWIGGY" as "Dining Out")</li>
      </ol>
      
      <h3>Step 6: Complete the Import</h3>
      
      <p>Once you're satisfied with the review:</p>
      
      <ol>
        <li>Click "Import Transactions" to finalize</li>
        <li>Confirm the import in the dialog that appears</li>
        <li>Wait for the confirmation message indicating successful import</li>
      </ol>
      
      <p>You'll see a summary showing how many transactions were imported, categorized, and how many potential duplicates were identified.</p>
      
      <h3>Advanced Import Features</h3>
      
      <h4>Split Transactions</h4>
      <p>For transactions that cover multiple categories (like a supermarket bill with groceries and household items):</p>
      <ol>
        <li>Click the "Split" button next to the transaction</li>
        <li>Add the appropriate number of splits</li>
        <li>Assign amounts and categories to each split</li>
        <li>The total must match the original transaction amount</li>
      </ol>
      
      <h4>Recurring Import Rules</h4>
      <p>To streamline future imports:</p>
      <ol>
        <li>Go to "Settings" > "Import Rules"</li>
        <li>Create rules for how specific transactions should be handled</li>
        <li>Set up merchant name matching patterns</li>
        <li>Define default categories for specific transaction patterns</li>
      </ol>
      
      <h4>Import Schedules</h4>
      <p>For certain banks with API access, you can set up automatic imports:</p>
      <ol>
        <li>Go to "Settings" > "Connected Accounts"</li>
        <li>Enable "Scheduled Import" for supported banks</li>
        <li>Choose the frequency (daily, weekly, monthly)</li>
        <li>Review and categorize transactions after each automatic import</li>
      </ol>
      
      <h3>Troubleshooting Common Import Issues</h3>
      
      <h4>Statement Not Recognized</h4>
      <p>If your statement isn't parsed correctly:</p>
      <ul>
        <li>Ensure you've selected the correct bank from the dropdown</li>
        <li>Try downloading the statement in a different format (e.g., Excel instead of PDF)</li>
        <li>Check that the statement is not password-protected</li>
        <li>For password-protected PDFs, unlock them before uploading</li>
      </ul>
      
      <h4>Incorrect Transaction Dates</h4>
      <p>If dates are imported incorrectly:</p>
      <ul>
        <li>Check the date format setting in the import dialog</li>
        <li>Use bulk edit to fix multiple transactions at once</li>
        <li>Contact support if systematic date issues persist</li>
      </ul>
      
      <h4>Missing Transactions</h4>
      <p>If some transactions aren't appearing:</p>
      <ul>
        <li>Ensure the statement covers the full date range you expect</li>
        <li>Check if transactions have unusual formats that might not be recognized</li>
        <li>Try importing a smaller date range to identify specific issues</li>
      </ul>
      
      <h3>Best Practices for Statement Imports</h3>
      
      <ul>
        <li>Import statements monthly to keep your financial data current</li>
        <li>Create a routine to review and categorize transactions after import</li>
        <li>Use consistent categorization rules for accurate reporting</li>
        <li>Consider splitting larger statements into smaller chunks for easier review</li>
        <li>Keep original statements for a few months as backup</li>
      </ul>
      
      <p>With regular imports and proper categorization, you'll have comprehensive insights into your spending patterns without the tedious work of manual data entry.</p>
      
      <p>If you encounter any issues with statement imports, our support team is available to assist. Just click the "Help" button in the import dialog or contact us through your account settings.</p>
    `
  },
  {
    id: "create-budget",
    title: "Creating Your First Budget",
    description: "A step-by-step guide to setting up personalized budgets for your spending categories.",
    category: "Budgeting",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1000&auto=format&fit=crop",
    readTime: 8,
    difficulty: "Beginner",
    featuredOrder: 3,
    content: `
      <h2>Creating Your First Budget in RupeeTally</h2>
      
      <p>A well-planned budget is the foundation of financial success. This guide will walk you through creating an effective budget in RupeeTally that's tailored to your income, spending patterns, and financial goals.</p>
      
      <h3>Why Budgeting Matters</h3>
      
      <p>Before diving into the mechanics, it's important to understand why budgeting is essential:</p>
      
      <ul>
        <li>Provides visibility into your spending patterns</li>
        <li>Helps you prioritize financial goals</li>
        <li>Reduces financial stress and uncertainty</li>
        <li>Prevents overspending and builds saving habits</li>
        <li>Creates a roadmap for achieving long-term financial objectives</li>
      </ul>
      
      <h3>Step 1: Assess Your Financial Situation</h3>
      
      <p>Before creating a budget, gather information about your current finances:</p>
      
      <ol>
        <li>Calculate your total monthly income (salary, business income, investments, etc.)</li>
        <li>Review your past 2-3 months of expenses to understand spending patterns</li>
        <li>Identify fixed expenses (rent/mortgage, insurance, loan EMIs)</li>
        <li>List variable expenses (groceries, dining, entertainment)</li>
        <li>Note any seasonal or occasional expenses (festival shopping, annual insurance premiums)</li>
      </ol>
      
      <p>RupeeTally can help with this assessment if you've already been tracking expenses. Go to Reports > Spending Analysis to review your existing spending patterns.</p>
      
      <h3>Step 2: Choose a Budget Approach</h3>
      
      <p>RupeeTally offers multiple budgeting approaches to match your preferences:</p>
      
      <h4>Zero-Based Budget</h4>
      <p>Assign every rupee of income to a specific category until your budget equals zero. This comprehensive approach ensures all your money has a purpose.</p>
      
      <h4>50/30/20 Rule (Adapted for India)</h4>
      <p>Allocate 50% of income to needs, 30% to wants, and 20% to savings and debt repayment. This simplified framework works well for beginners.</p>
      
      <h4>Envelope System</h4>
      <p>Set spending limits for different categories, similar to putting cash in envelopes. When an envelope is empty, you stop spending in that category.</p>
      
      <h4>Custom Approach</h4>
      <p>Create your own budgeting system based on your unique financial situation and goals.</p>
      
      <div class="tip">
        <strong>Recommendation:</strong> If you're new to budgeting, start with the 50/30/20 rule as it's simple to implement and provides good structure.
      </div>
      
      <h3>Step 3: Set Up Your Budget in RupeeTally</h3>
      
      <p>Now you're ready to create your budget in the app:</p>
      
      <ol>
        <li>Navigate to the "Budget" section from the main menu</li>
        <li>Click on "Create New Budget"</li>
        <li>Select your preferred budget period (monthly recommended for beginners)</li>
        <li>Choose a template or start from scratch</li>
        <li>Enter your income amount</li>
      </ol>
      
      <p>If you're using a template, RupeeTally will suggest category allocations based on your income and the chosen budgeting approach. You can adjust these as needed.</p>
      
      <h3>Step 4: Allocate Amounts to Categories</h3>
      
      <p>Now it's time to distribute your income across spending categories:</p>
      
      <ol>
        <li>Start with essential expenses (housing, utilities, groceries, transportation)</li>
        <li>Allocate funds for debt repayment (loan EMIs, credit card payments)</li>
        <li>Set aside money for savings and investments</li>
        <li>Budget for discretionary spending (entertainment, dining out, shopping)</li>
        <li>Create a miscellaneous or buffer category for unexpected expenses</li>
      </ol>
      
      <p>As you allocate amounts, RupeeTally will show you the remaining unallocated amount and the percentage of your income assigned to each category.</p>
      
      <h3>Step 5: Review and Adjust</h3>
      
      <p>Before finalizing your budget:</p>
      
      <ul>
        <li>Ensure your total allocations don't exceed your income</li>
        <li>Check that essential needs are adequately covered</li>
        <li>Verify that savings goals are included</li>
        <li>Make sure the budget is realistic and achievable</li>
      </ul>
      
      <p>A good budget should feel slightly challenging but not impossible. It's better to be realistic than to set yourself up for failure with an overly restrictive plan.</p>
      
      <h3>Step 6: Set Up Budget Alerts</h3>
      
      <p>RupeeTally can notify you when you're approaching or exceeding budget limits:</p>
      
      <ol>
        <li>Go to "Settings" > "Notifications"</li>
        <li>Enable "Budget Alerts"</li>
        <li>Choose your preferred notification method (app, email, SMS)</li>
        <li>Set thresholds (e.g., alert at 80% and 100% of budget)</li>
      </ol>
      
      <p>These alerts help you stay on track throughout the month and make adjustments before overspending.</p>
      
      <h3>Step 7: Track and Monitor</h3>
      
      <p>A budget is only effective if you regularly track your spending against it:</p>
      
      <ul>
        <li>Add transactions consistently throughout the month</li>
        <li>Check your budget progress weekly</li>
        <li>Use the RupeeTally mobile app for on-the-go tracking</li>
        <li>Review category performance to identify areas of concern</li>
      </ul>
      
      <p>The Budget Dashboard shows your progress with visual indicators for each category, making it easy to see where you stand.</p>
      
      <h3>Step 8: Adjust as Needed</h3>
      
      <p>Your first budget might not be perfect, and that's okay. After the first month:</p>
      
      <ol>
        <li>Review your actual spending versus budgeted amounts</li>
        <li>Identify categories where you consistently over or under spend</li>
        <li>Adjust allocations to better match your real spending patterns</li>
        <li>Consider if certain categories need to be added or removed</li>
        <li>Refine your budget to make it more realistic and effective</li>
      </ol>
      
      <h3>Common Budgeting Challenges and Solutions</h3>
      
      <h4>Challenge: Irregular Income</h4>
      <p><strong>Solution:</strong> Create a budget based on your minimum monthly income, then allocate any additional income to savings or debt repayment. RupeeTally's flexible budgeting allows you to adjust as income fluctuates.</p>
      
      <h4>Challenge: Seasonal Expenses</h4>
      <p><strong>Solution:</strong> Set up sinking funds for predictable large expenses. For example, allocate a small amount each month toward festival shopping, even though the actual expense occurs only a few times per year.</p>
      
      <h4>Challenge: Joint Finances</h4>
      <p><strong>Solution:</strong> RupeeTally allows for shared budgets. Create a household budget that both partners can access, with clear allocations for joint and individual expenses.</p>
      
      <h4>Challenge: Frequent Budget Overruns</h4>
      <p><strong>Solution:</strong> Use the "Rollover" feature to better manage categories where spending varies month to month. If you underspend in a category one month, the difference adds to next month's allocation.</p>
      
      <h3>Indian-Specific Budgeting Tips</h3>
      
      <h4>Festival and Celebration Planning</h4>
      <p>Indian households often have significant expenses during festivals like Diwali, Eid, or Durga Puja. Create specific budget categories for these celebrations and save monthly toward them.</p>
      
      <h4>Family Support</h4>
      <p>Many Indians provide financial support to parents or extended family. Include these commitments as fixed expenses in your budget rather than treating them as optional.</p>
      
      <h4>Wedding and Special Occasions Fund</h4>
      <p>Indian weddings and significant celebrations can be major expenses. Consider a dedicated savings category even if the event is years away.</p>
      
      <h4>Education Expenses</h4>
      <p>From school fees to coaching classes, education costs are a priority for many Indian families. Create specific categories for these expenses to ensure they're adequately funded.</p>
      
      <h3>Advanced Budgeting Features</h3>
      
      <p>As you become more comfortable with budgeting, explore these advanced features in RupeeTally:</p>
      
      <ul>
        <li><strong>Annual Budgeting:</strong> Plan for the entire year, accounting for seasonal variations</li>
        <li><strong>Goal-Based Budgeting:</strong> Create targeted savings categories for specific financial goals</li>
        <li><strong>Budget vs. Actual Reports:</strong> Analyze your budget performance over time with detailed reports</li>
        <li><strong>Budget Scenarios:</strong> Create multiple budget scenarios to plan for different financial situations</li>
      </ul>
      
      <p>Remember that budgeting is a skill that improves with practice. Don't be discouraged if your first few budgets need significant adjustments. The most important thing is to start and remain consistent.</p>
      
      <p>With RupeeTally's intuitive budgeting tools and regular tracking, you'll gain better control over your finances and make steady progress toward your financial goals.</p>
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