import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { apiRequest } from "@/lib/queryClient";
import { SummaryCard } from "@/components/dashboard/SummaryCard";
import { ExpensePieChart } from "@/components/dashboard/ExpensePieChart";
import { MonthlyTrendChart } from "@/components/dashboard/MonthlyTrendChart";
import { TransactionList } from "@/components/dashboard/TransactionList";
import { Button } from "@/components/ui/button";
import { Transaction } from "@/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ArrowUpRight, 
  Download, 
  Plus, 
  Wallet, 
  LineChart, 
  BarChart3, 
  PieChart,
  Clock,
  ArrowUp,
  ArrowDown,
  DollarSign,
  Building,
  CreditCard,
  TrendingUp,
  BadgeDollarSign,
  Coins,
  HandCoins
} from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { TransactionForm } from "@/components/TransactionForm";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

// Mock data for initial development
const mockCategoryData = [
  { name: "Food & Dining", value: 24350, color: "hsl(var(--chart-1))" },
  { name: "Rent & Bills", value: 18200, color: "hsl(var(--chart-2))" },
  { name: "Travel", value: 12500, color: "hsl(var(--chart-3))" },
  { name: "Shopping", value: 9800, color: "hsl(var(--chart-4))" },
  { name: "Others", value: 13600, color: "hsl(var(--chart-5))" },
];

const mockTrendData = [
  { month: "Jan", income: 95000, expense: 62000 },
  { month: "Feb", income: 98000, expense: 67000 },
  { month: "Mar", income: 105000, expense: 69000 },
  { month: "Apr", income: 110000, expense: 72000 },
  { month: "May", income: 118000, expense: 75000 },
  { month: "Jun", income: 115000, expense: 77000 },
  { month: "Jul", income: 125000, expense: 78450 },
];

// Mock asset and liability data
const mockAssetData = [
  { name: "Savings Account", value: 250000, growth: 2.5, type: "liquid" },
  { name: "Fixed Deposits", value: 500000, growth: 6.5, type: "fixed" },
  { name: "Stocks", value: 350000, growth: 12.5, type: "investment" },
  { name: "Mutual Funds", value: 275000, growth: 9.8, type: "investment" },
  { name: "Property", value: 4500000, growth: 5.2, type: "property" },
];

const mockLiabilityData = [
  { name: "Home Loan", value: 2800000, interestRate: 7.5, remainingTenure: 180 },
  { name: "Car Loan", value: 450000, interestRate: 8.2, remainingTenure: 36 },
  { name: "Personal Loan", value: 125000, interestRate: 12.5, remainingTenure: 12 },
  { name: "Credit Card", value: 45000, interestRate: 36, remainingTenure: 1 },
];

export default function Dashboard() {
  // Fetch user profile data
  const { data: userData, isLoading: userLoading } = useQuery({
    queryKey: ['/api/user/profile'],
    queryFn: async () => {
      const data = await apiRequest('/api/user/profile', { method: 'GET' });
      return data;
    }
  });

  // Fetch dashboard data
  const { data: dashboardData, isLoading } = useQuery({
    queryKey: ["/api/dashboard"],
    queryFn: async () => {
      // Will fetch from the API in production
      return {
        totalIncome: 125000,
        totalExpenses: 78450,
        monthlySavings: 46550,
        budgetUtilization: 78.5,
        incomeChange: {
          value: 12.5,
          isPositive: true,
        },
        expenseChange: {
          value: 8.3,
          isPositive: false,
        },
        savingsChange: {
          value: 5.2,
          isPositive: true,
        },
        categoryBreakdown: mockCategoryData,
        monthlyTrend: mockTrendData,
        recentTransactions: [],
        assets: mockAssetData,
        liabilities: mockLiabilityData,
        netWorth: 3000000,
        netWorthChange: {
          value: 3.8,
          isPositive: true,
        },
        cashFlow: {
          inflow: 125000,
          outflow: 78450,
          netFlow: 46550,
          flowRatio: 1.59, // inflow/outflow ratio
        }
      };
    },
  });

  // Fetch transactions
  const { data: transactions, isLoading: transactionsLoading } = useQuery<Transaction[]>({
    queryKey: ["/api/transactions"],
    queryFn: async () => {
      // Will fetch from the API in production
      const mockTransactions: Transaction[] = [
        {
          id: "1",
          description: "Grocery Shopping",
          amount: 2450,
          date: "2023-07-24",
          category: "Food",
          type: "expense",
          paymentMode: "Card",
          source: "BigBasket",
        },
        {
          id: "2",
          description: "Salary Credit",
          amount: 85000,
          date: "2023-07-01",
          category: "Income",
          type: "income",
          paymentMode: "Bank",
          source: "ABC Technologies",
        },
        {
          id: "3",
          description: "House Rent",
          amount: 18000,
          date: "2023-07-05",
          category: "Rent",
          type: "expense",
          paymentMode: "UPI",
          source: "July 2023",
        },
        {
          id: "4",
          description: "Restaurant Dinner",
          amount: 4200,
          date: "2023-07-15",
          category: "Food",
          type: "expense",
          paymentMode: "Card",
          source: "Taj Hotel",
        },
        {
          id: "5",
          description: "Fuel Expenses",
          amount: 3100,
          date: "2023-07-22",
          category: "Travel",
          type: "expense",
          paymentMode: "Cash",
          source: "Indian Oil",
        },
      ];
      return mockTransactions;
    },
  });

  // Calculate total assets and liabilities
  const totalAssets = dashboardData?.assets?.reduce((acc, asset) => acc + asset.value, 0) || 0;
  const totalLiabilities = dashboardData?.liabilities?.reduce((acc, liability) => acc + liability.value, 0) || 0;
  
  return (
    <div className="pb-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold font-heading text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back! Here's your financial overview.
          </p>
        </div>
        
        <div className="flex items-center space-x-3 mt-4 md:mt-0">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </Button>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2 bg-primary hover:bg-primary/90">
                <Plus className="h-4 w-4" />
                <span>Add Transaction</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <TransactionForm />
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      {/* Key Metrics Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6">
        <Card className="bg-background border border-border/40 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="rounded-full p-2 bg-primary/10">
                <ArrowUp className="h-5 w-5 text-primary" />
              </div>
              <Badge variant="outline" className={`bg-success/10 text-success`}>
                +{dashboardData?.incomeChange?.value || 0}%
              </Badge>
            </div>
            <h3 className="text-2xl font-bold mt-2 font-heading">₹{(dashboardData?.totalIncome || 0).toLocaleString()}</h3>
            <p className="text-muted-foreground text-sm">Monthly Income</p>
          </CardContent>
        </Card>
        
        <Card className="bg-background border border-border/40 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="rounded-full p-2 bg-secondary/10">
                <ArrowDown className="h-5 w-5 text-secondary" />
              </div>
              <Badge variant="outline" className={`bg-destructive/10 text-destructive`}>
                +{dashboardData?.expenseChange?.value || 0}%
              </Badge>
            </div>
            <h3 className="text-2xl font-bold mt-2 font-heading">₹{(dashboardData?.totalExpenses || 0).toLocaleString()}</h3>
            <p className="text-muted-foreground text-sm">Monthly Expenses</p>
          </CardContent>
        </Card>
        
        <Card className="bg-background border border-border/40 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="rounded-full p-2 bg-accent/10">
                <Wallet className="h-5 w-5 text-accent" />
              </div>
              <Badge variant="outline" className={`bg-success/10 text-success`}>
                +{dashboardData?.savingsChange?.value || 0}%
              </Badge>
            </div>
            <h3 className="text-2xl font-bold mt-2 font-heading">₹{(dashboardData?.monthlySavings || 0).toLocaleString()}</h3>
            <p className="text-muted-foreground text-sm">Monthly Savings</p>
          </CardContent>
        </Card>
        
        <Card className="bg-background border border-border/40 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="rounded-full p-2 bg-success/10">
                <BadgeDollarSign className="h-5 w-5 text-success" />
              </div>
              <Badge variant="outline" className={`bg-accent/10 text-accent`}>
                {(100 - (dashboardData?.budgetUtilization || 0)).toFixed(1)}% remaining
              </Badge>
            </div>
            <h3 className="text-2xl font-bold mt-2 font-heading">{dashboardData?.budgetUtilization || 0}%</h3>
            <p className="text-muted-foreground text-sm">Budget Utilization</p>
          </CardContent>
        </Card>
      </div>
      
      {/* Cash Flow Section */}
      <div className="mb-6">
        <h2 className="text-xl font-bold font-heading mb-4">Cash Flow</h2>
        <Card className="bg-background border border-border/40 shadow-sm">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-muted-foreground text-sm mb-1">Monthly Inflow</p>
                <div className="flex items-center">
                  <ArrowUp className="h-4 w-4 text-success mr-1" />
                  <span className="text-lg font-semibold">₹{(dashboardData?.cashFlow?.inflow || 0).toLocaleString()}</span>
                </div>
              </div>
              <div>
                <p className="text-muted-foreground text-sm mb-1">Monthly Outflow</p>
                <div className="flex items-center">
                  <ArrowDown className="h-4 w-4 text-destructive mr-1" />
                  <span className="text-lg font-semibold">₹{(dashboardData?.cashFlow?.outflow || 0).toLocaleString()}</span>
                </div>
              </div>
              <div>
                <p className="text-muted-foreground text-sm mb-1">Net Flow</p>
                <div className="flex items-center">
                  <Wallet className="h-4 w-4 text-primary mr-1" />
                  <span className="text-lg font-semibold">₹{(dashboardData?.cashFlow?.netFlow || 0).toLocaleString()}</span>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-muted-foreground text-sm mb-1">Cash Flow Ratio (Income/Expense)</p>
              <Progress value={(dashboardData?.cashFlow?.flowRatio || 1) * 50} className="h-2 mt-1" />
              <div className="flex justify-between mt-1">
                <span className="text-xs text-muted-foreground">0</span>
                <span className="text-xs text-muted-foreground">1.0</span>
                <span className="text-xs text-muted-foreground">2.0+</span>
              </div>
              <p className="text-sm mt-2">
                <span className="font-medium">{dashboardData?.cashFlow?.flowRatio?.toFixed(2) || '0.00'}</span> - {
                (dashboardData?.cashFlow?.flowRatio || 0) >= 1.5 
                  ? "Excellent savings rate" 
                  : (dashboardData?.cashFlow?.flowRatio || 0) >= 1.2 
                    ? "Good savings rate" 
                    : "Needs improvement"
                }
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Charts Section with improved layout */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-6">
        <Card className="col-span-3 bg-background border border-border/40 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-heading">Revenue &amp; Expense Trends</CardTitle>
            <CardDescription>Last 6 months overview. Click for details.</CardDescription>
          </CardHeader>
          <CardContent>
            <MonthlyTrendChart
              data={dashboardData?.monthlyTrend || []}
              isLoading={isLoading}
            />
          </CardContent>
        </Card>
        
        <Card className="col-span-2 bg-background border border-border/40 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-heading">Expense Breakdown</CardTitle>
            <CardDescription>By category this month</CardDescription>
          </CardHeader>
          <CardContent>
            <ExpensePieChart
              data={dashboardData?.categoryBreakdown || []}
              isLoading={isLoading}
            />
          </CardContent>
        </Card>
      </div>
      
      {/* Net Worth and Assets/Liabilities Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className="bg-background border border-border/40 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-heading">Net Worth</CardTitle>
            <CardDescription>Assets minus liabilities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-4">
              <h3 className="text-3xl font-bold font-heading mb-2">₹{((totalAssets - totalLiabilities) || 0).toLocaleString()}</h3>
              <Badge variant="outline" className={`bg-success/10 text-success`}>
                {dashboardData?.netWorthChange?.isPositive ? "+" : ""}{dashboardData?.netWorthChange?.value}% from last month
              </Badge>
              
              <div className="mt-6">
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Assets</span>
                  <span className="text-sm">₹{totalAssets.toLocaleString()}</span>
                </div>
                <Progress value={(totalAssets / (totalAssets + totalLiabilities)) * 100} className="h-2 bg-muted" />
                
                <div className="flex justify-between mt-3 mb-1">
                  <span className="text-sm">Liabilities</span>
                  <span className="text-sm">₹{totalLiabilities.toLocaleString()}</span>
                </div>
                <Progress value={(totalLiabilities / (totalAssets + totalLiabilities)) * 100} className="h-2 bg-muted" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-background border border-border/40 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-heading">Assets</CardTitle>
            <CardDescription>Your investments and holdings</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {dashboardData?.assets?.map((asset, index) => (
                <div key={index} className="flex items-center justify-between p-4">
                  <div>
                    <div className="flex items-center">
                      {asset.type === 'liquid' && <DollarSign className="h-4 w-4 text-primary mr-2" />}
                      {asset.type === 'fixed' && <Building className="h-4 w-4 text-secondary mr-2" />}
                      {asset.type === 'investment' && <TrendingUp className="h-4 w-4 text-accent mr-2" />}
                      {asset.type === 'property' && <Building className="h-4 w-4 text-success mr-2" />}
                      <span className="font-medium">{asset.name}</span>
                    </div>
                    <p className="text-muted-foreground text-xs">Growth: {asset.growth}% p.a.</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">₹{asset.value.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">{((asset.value / totalAssets) * 100).toFixed(1)}% of assets</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-background border border-border/40 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-heading">Liabilities</CardTitle>
            <CardDescription>Your loans and debts</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {dashboardData?.liabilities?.map((liability, index) => (
                <div key={index} className="flex items-center justify-between p-4">
                  <div>
                    <div className="flex items-center">
                      {liability.name.includes('Credit') ? 
                        <CreditCard className="h-4 w-4 text-destructive mr-2" /> : 
                        <Building className="h-4 w-4 text-muted-foreground mr-2" />
                      }
                      <span className="font-medium">{liability.name}</span>
                    </div>
                    <p className="text-muted-foreground text-xs">Interest: {liability.interestRate}% • {liability.remainingTenure} {liability.remainingTenure === 1 ? 'month' : 'months'} left</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">₹{liability.value.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">{((liability.value / totalLiabilities) * 100).toFixed(1)}% of debt</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Financial Management Summary */}
      <div className="mb-6">
        <h2 className="text-xl font-bold font-heading mb-4">Financial Management</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-background border border-border/40 shadow-sm hover:shadow transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <div className="rounded-full p-2 bg-blue-100 dark:bg-blue-900">
                  <BadgeDollarSign className="h-5 w-5 text-blue-600 dark:text-blue-300" />
                </div>
                <h3 className="text-lg font-bold ml-3">Cash Reserve</h3>
              </div>
              <div className="text-2xl font-bold">₹{parseFloat(userData?.cashReserve || "0").toLocaleString('en-IN')}</div>
              <p className="text-muted-foreground text-sm mt-1">Available on hand</p>
              <Button variant="outline" size="sm" className="w-full mt-4" asChild>
                <Link to="/profile?tab=preferences">Manage Cash</Link>
              </Button>
            </CardContent>
          </Card>
          
          <Card className="bg-background border border-border/40 shadow-sm hover:shadow transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <div className="rounded-full p-2 bg-purple-100 dark:bg-purple-900">
                  <Coins className="h-5 w-5 text-purple-600 dark:text-purple-300" />
                </div>
                <h3 className="text-lg font-bold ml-3">Investments & SIPs</h3>
              </div>
              <div className="flex justify-between">
                <div>
                  <div className="text-sm text-muted-foreground">Portfolio</div>
                  <div className="font-semibold">View Summary</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Monthly SIPs</div>
                  <div className="font-semibold">Track Progress</div>
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full mt-4" asChild>
                <Link to="/investments">Manage Portfolio</Link>
              </Button>
            </CardContent>
          </Card>
          
          <Card className="bg-background border border-border/40 shadow-sm hover:shadow transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <div className="rounded-full p-2 bg-green-100 dark:bg-green-900">
                  <HandCoins className="h-5 w-5 text-green-600 dark:text-green-300" />
                </div>
                <h3 className="text-lg font-bold ml-3">Loans & Lending</h3>
              </div>
              <div className="flex justify-between">
                <div>
                  <div className="text-sm text-muted-foreground">Personal Loans</div>
                  <div className="font-semibold">Track Records</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Manage</div>
                  <div className="font-semibold">View Details</div>
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full mt-4" asChild>
                <Link to="/loans">Manage Loans</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Recent Transactions Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold font-heading">Recent Transactions</h2>
          <Button variant="link" className="text-primary">View All</Button>
        </div>
        <Card className="bg-background border border-border/40 shadow-sm">
          <CardContent className="p-0">
            <TransactionList
              transactions={transactions || []}
              isLoading={transactionsLoading}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
