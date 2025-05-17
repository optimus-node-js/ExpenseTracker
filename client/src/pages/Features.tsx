import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { ChevronLeft, IndianRupee, BarChart3, Receipt, PieChart, Wallet, LineChart, CreditCard, Landmark, FileSpreadsheet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import VisualAnalyticsGraphs from '@/components/features/VisualAnalyticsGraphs';

export default function Features() {
  // Get the query parameter for the tab
  const getTabFromUrl = () => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return params.get('tab') || 'expense-tracking';
    }
    return 'expense-tracking';
  };
  
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }, []);

  // Feature definitions with detailed info
  const features = [
    {
      id: "expense-tracking",
      title: "Expense Tracking",
      icon: <IndianRupee className="h-6 w-6 text-primary" />,
      description: "Record and manage your daily expenses with precision and ease",
      content: (
        <div className="space-y-6">
          <p className="text-muted-foreground">
            RupeeTally provides a comprehensive expense tracking system designed specifically for Indian users. It allows you to record daily expenses, categorize them, and generate insights to help you manage your money better.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Receipt className="h-5 w-5 text-primary" />
                  Transaction Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Record transactions with detailed information including amount, date, category, payment method, and notes. Split transactions across multiple categories when needed.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileSpreadsheet className="h-5 w-5 text-primary" />
                  Custom Categories
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Create your own expense categories with custom icons and colors. Our system comes pre-loaded with India-specific categories tailored to local spending patterns.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-primary" />
                  Multiple Payment Methods
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Track expenses across different payment methods including cash, UPI, credit cards, debit cards, and net banking - all the payment methods commonly used in India.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  Recurring Expenses
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Set up recurring transactions for regular expenses like rent, EMIs, or subscriptions. Get reminders when payments are due and track them automatically.
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="bg-primary/5 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-3">Advanced Features</h3>
            <ul className="space-y-3">
              <li className="flex gap-3">
                <span className="text-primary font-bold">•</span>
                <span><strong>Tagging System:</strong> Add custom tags to transactions (like "Business", "Personal", "Reimbursable") for advanced filtering and reporting</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">•</span>
                <span><strong>Receipt Scanning:</strong> Capture receipts with your camera to automatically extract transaction details</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">•</span>
                <span><strong>SMS Detection:</strong> Automatically capture expenses from bank and payment app SMS notifications</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">•</span>
                <span><strong>Multi-Currency Support:</strong> Track expenses in foreign currencies with automatic conversion to INR</span>
              </li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: "budget-management",
      title: "Budget Management",
      icon: <Wallet className="h-6 w-6 text-primary" />,
      description: "Create and manage budgets to keep your spending on track",
      content: (
        <div className="space-y-6">
          <p className="text-muted-foreground">
            Take control of your finances with RupeeTally's powerful budgeting tools. Create customized budgets tailored to your financial goals and spending patterns, then track your progress in real-time.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Landmark className="h-5 w-5 text-primary" />
                  Flexible Budget Types
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Create various types of budgets including monthly, category-specific, project-based, or annual budgets. Customize periods to match your income cycle and financial goals.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  Real-time Monitoring
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Track your spending against your budget in real time. Visual indicators show you instantly whether you're on track, approaching limits, or have exceeded your budget.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5 text-primary" />
                  Budget Allocation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Easily allocate budgets across different expense categories. Our smart suggestions analyze your spending patterns to recommend optimal budget allocations.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Receipt className="h-5 w-5 text-primary" />
                  Rolling Budgets
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Enable rollover features to carry unused budget funds to the next period or apply overspending to future budgets for more flexible financial management.
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="bg-primary/5 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-3">Budget Insights</h3>
            <ul className="space-y-3">
              <li className="flex gap-3">
                <span className="text-primary font-bold">•</span>
                <span><strong>Smart Alerts:</strong> Receive notifications when you're approaching budget limits or have exceeded them</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">•</span>
                <span><strong>Budget vs. Actual Analysis:</strong> Compare planned spending against actual expenses to refine future budgets</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">•</span>
                <span><strong>Budget Templates:</strong> Choose from pre-built budget templates optimized for different income levels and family sizes in India</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">•</span>
                <span><strong>Seasonal Adjustments:</strong> Automatically adjust budgets for seasonal expenses like festivals, vacations, or annual payments</span>
              </li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: "visual-analytics",
      title: "Visual Analytics",
      icon: <BarChart3 className="h-6 w-6 text-primary" />,
      description: "Gain insights with powerful visualizations of your financial data",
      content: (
        <div className="space-y-6">
          <p className="text-muted-foreground">
            Understand your finances at a glance with RupeeTally's comprehensive visual analytics. Our intuitive charts and graphs transform complex financial data into clear, actionable insights.
          </p>
          
          {/* Beautiful Interactive Financial Graphs */}
          <div className="mb-8 mt-6 bg-card/50 rounded-xl border p-1">
            <VisualAnalyticsGraphs />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5 text-primary" />
                  Spending Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Visualize your spending patterns across different categories with interactive pie charts and bar graphs. Drill down to identify areas where you can optimize expenses.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LineChart className="h-5 w-5 text-primary" />
                  Trend Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Track how your income, expenses, savings, and investments change over time with line charts and trend indicators. Spot seasonal patterns and long-term trends.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  Comparative Reports
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Compare financial performance across different time periods (month-to-month, year-to-year) to measure your progress and identify improvement areas.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wallet className="h-5 w-5 text-primary" />
                  Cash Flow Visualization
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Visualize your monthly cash flow with sankey diagrams and flow charts that show how money moves through your financial ecosystem.
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="bg-primary/5 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-3">Advanced Visualization Features</h3>
            <ul className="space-y-3">
              <li className="flex gap-3">
                <span className="text-primary font-bold">•</span>
                <span><strong>Customizable Dashboards:</strong> Create personalized dashboards with the charts and metrics that matter most to you</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">•</span>
                <span><strong>Predictive Analytics:</strong> View projections of future financial trends based on your historical data</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">•</span>
                <span><strong>Benchmark Comparisons:</strong> Compare your financial metrics with anonymized data from similar income groups in India</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">•</span>
                <span><strong>Export and Share:</strong> Export visualization as images or PDFs for financial planning or sharing with family members</span>
              </li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: "statement-import",
      title: "Statement Import",
      icon: <FileSpreadsheet className="h-6 w-6 text-primary" />,
      description: "Easily import transactions from bank and credit card statements",
      content: (
        <div className="space-y-6">
          <p className="text-muted-foreground">
            Say goodbye to manual data entry. RupeeTally's statement import feature automatically processes your bank and credit card statements, extracting transactions and categorizing them with high accuracy.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Landmark className="h-5 w-5 text-primary" />
                  Indian Bank Support
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Import statements from all major Indian banks including SBI, HDFC, ICICI, Axis, PNB, Bank of Baroda, and many more. Our system is designed to work with Indian bank statement formats.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-primary" />
                  Multi-Format Support
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Import statements in various formats including PDF, Excel, CSV, and OFX files. Simply upload your statement and our system will do the rest.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5 text-primary" />
                  Smart Categorization
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Our AI-powered system automatically categorizes imported transactions based on merchant names, transaction descriptions, and your previous categorization patterns.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  Duplicate Detection
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Advanced algorithms detect and prevent duplicate transactions when importing multiple statements or overlapping time periods, ensuring your financial data remains accurate.
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="bg-primary/5 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-3">Import Features</h3>
            <ul className="space-y-3">
              <li className="flex gap-3">
                <span className="text-primary font-bold">•</span>
                <span><strong>Bulk Import:</strong> Process multiple months or accounts simultaneously for faster setup and analysis</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">•</span>
                <span><strong>Import Rules:</strong> Create custom rules to automatically categorize and tag specific transactions during import</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">•</span>
                <span><strong>Review & Edit:</strong> Easily review imported transactions and make adjustments before finalizing them in your account</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">•</span>
                <span><strong>Scheduled Imports:</strong> Set up automatic imports for connected bank accounts to keep your financial data current</span>
              </li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: "investment-tracking",
      title: "Investment Tracking",
      icon: <LineChart className="h-6 w-6 text-primary" />,
      description: "Track your investments and monitor portfolio performance",
      content: (
        <div className="space-y-6">
          <p className="text-muted-foreground">
            Keep track of your entire investment portfolio in one place with RupeeTally's investment tracking features. Monitor performance, track returns, and make informed investment decisions.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Landmark className="h-5 w-5 text-primary" />
                  Comprehensive Asset Support
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Track a wide range of investments including stocks, mutual funds, fixed deposits, PPF, EPF, gold, real estate, and other assets popular among Indian investors.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LineChart className="h-5 w-5 text-primary" />
                  Performance Tracking
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Monitor the performance of your investments with key metrics like absolute returns, annualized returns, XIRR, and comparison against relevant benchmarks.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5 text-primary" />
                  Portfolio Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Analyze your portfolio with insightful visualizations showing asset allocation, sector exposure, risk assessment, and diversification metrics.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-primary" />
                  SIP Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Track your Systematic Investment Plans (SIPs) with dedicated tools for monitoring regular investments, upcoming installments, and cumulative performance.
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="bg-primary/5 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-3">Advanced Investment Features</h3>
            <ul className="space-y-3">
              <li className="flex gap-3">
                <span className="text-primary font-bold">•</span>
                <span><strong>Goal Tracking:</strong> Link investments to financial goals and track progress towards target amounts and timelines</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">•</span>
                <span><strong>Tax Implications:</strong> Monitor potential tax liabilities from investments with India-specific tax rules for STCG, LTCG, and dividend income</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">•</span>
                <span><strong>Investment Insights:</strong> Receive personalized recommendations for optimizing your portfolio based on your risk profile and financial goals</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">•</span>
                <span><strong>Document Storage:</strong> Securely store investment-related documents like purchase confirmations and account statements</span>
              </li>
            </ul>
          </div>
        </div>
      )
    }
  ];

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
          <h1 className="text-4xl md:text-5xl font-bold mb-6">RupeeTally Features</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            Discover the powerful features that make RupeeTally the ultimate financial management solution for Indian users. 
            Our comprehensive toolset helps you track expenses, manage budgets, analyze data, and grow your wealth.
          </p>
        </motion.div>
        
        {/* Features tabs */}
        <Tabs defaultValue={getTabFromUrl()} className="w-full max-w-5xl mx-auto">
          <div className="overflow-x-auto pb-3">
            <TabsList className="grid min-w-max grid-cols-5 w-full mb-8">
              {features.map((feature) => (
                <TabsTrigger 
                  key={feature.id} 
                  value={feature.id}
                  className="flex flex-col items-center gap-2 py-4 px-6"
                  onClick={() => {
                    // Update URL without full page refresh
                    const url = new URL(window.location.href);
                    url.searchParams.set('tab', feature.id);
                    window.history.pushState({}, '', url);
                  }}
                >
                  {feature.icon}
                  <span className="text-sm whitespace-nowrap">{feature.title}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          
          {features.map((feature) => (
            <TabsContent key={feature.id} value={feature.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="border-b pb-4 mb-6 flex items-center gap-4">
                  {feature.icon}
                  <div>
                    <h2 className="text-3xl font-bold">{feature.title}</h2>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
                
                {feature.content}
                
                <div className="mt-12 text-center">
                  <Link href="/signup">
                    <Button size="lg" className="px-8">
                      Try {feature.title} Now
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>
        
        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-primary/5 rounded-lg p-8 md:p-12 text-center max-w-4xl mx-auto mt-16"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Get Started with RupeeTally Today</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Join thousands of Indian users who have transformed their financial management with RupeeTally. 
            Our comprehensive features help you take control of your money and build a secure financial future.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="px-8">
                Create Free Account
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg">
                Contact Us
              </Button>
            </Link>
          </div>
        </motion.div>
      </main>
    </div>
  );
}