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
  HandCoins,
  Home,
  CircleDollarSign,
  Landmark,
  FileText
} from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { TransactionForm } from "@/components/TransactionForm";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

// Chart colors for consistent visualization
const chartColors = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
  "hsl(var(--chart-6, 280 65% 60%))",
  "hsl(var(--chart-7, 200 65% 60%))",
  "hsl(var(--chart-8, 120 65% 60%))",
];

export default function Dashboard() {
  // Fetch user profile data
  const { data: userData, isLoading: userLoading } = useQuery({
    queryKey: ['/api/user/profile'],
    queryFn: async () => {
      const response = await apiRequest('GET', '/api/user/profile');
      return response.json();
    }
  });

  // Fetch dashboard data
  const { data: dashboardData, isLoading } = useQuery({
    queryKey: ["/api/dashboard"],
    queryFn: async () => {
      const response = await apiRequest('GET', '/api/dashboard');
      return response.json();
    },
  });

  // Fetch transactions
  const { data: transactions, isLoading: transactionsLoading } = useQuery<Transaction[]>({
    queryKey: ["/api/transactions"],
    queryFn: async () => {
      const response = await apiRequest('GET', '/api/transactions');
      return response.json();
    },
  });

  // Fetch investments (assets)
  const { data: investments = [] } = useQuery({
    queryKey: ["/api/investments"],
    queryFn: async () => {
      try {
        const response = await apiRequest('GET', '/api/investments');
        return await response.json();
      } catch (error) {
        console.error("Error fetching investments:", error);
        return [];
      }
    },
  });

  // Fetch loans (liabilities)
  const { data: loans = [] } = useQuery({
    queryKey: ["/api/loans"],
    queryFn: async () => {
      try {
        const response = await apiRequest('GET', '/api/loans');
        return await response.json();
      } catch (error) {
        console.error("Error fetching loans:", error);
        return [];
      }
    },
  });

  // Calculate total assets from investments
  const totalAssets = investments.reduce((acc: number, asset: any) => acc + (Number(asset.amount) || 0), 0);
  
  // Calculate total liabilities from loans
  const totalLiabilities = loans.reduce((acc: number, liability: any) => acc + (Number(liability.amount) || 0), 0);
  
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
                  <span className="text-lg font-semibold">₹{(dashboardData?.totalIncome || 0).toLocaleString()}</span>
                </div>
              </div>
              <div>
                <p className="text-muted-foreground text-sm mb-1">Monthly Outflow</p>
                <div className="flex items-center">
                  <ArrowDown className="h-4 w-4 text-destructive mr-1" />
                  <span className="text-lg font-semibold">₹{(dashboardData?.totalExpenses || 0).toLocaleString()}</span>
                </div>
              </div>
              <div>
                <p className="text-muted-foreground text-sm mb-1">Net Flow</p>
                <div className="flex items-center">
                  <Wallet className="h-4 w-4 text-primary mr-1" />
                  <span className="text-lg font-semibold">₹{(dashboardData?.monthlySavings || 0).toLocaleString()}</span>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-muted-foreground text-sm mb-1">Cash Flow Ratio (Income/Expense)</p>
              <Progress 
                value={dashboardData?.totalExpenses && dashboardData?.totalExpenses > 0 
                  ? (dashboardData?.totalIncome / dashboardData?.totalExpenses) * 50
                  : 50} 
                className="h-2 mt-1" 
              />
              <div className="flex justify-between mt-1">
                <span className="text-xs text-muted-foreground">0</span>
                <span className="text-xs text-muted-foreground">1.0</span>
                <span className="text-xs text-muted-foreground">2.0+</span>
              </div>
              <p className="text-sm mt-2">
                {dashboardData?.totalExpenses && dashboardData?.totalExpenses > 0 ? (
                  <>
                    <span className="font-medium">
                      {(dashboardData?.totalIncome / dashboardData?.totalExpenses).toFixed(2) || '0.00'}
                    </span> - {
                    (dashboardData?.totalIncome / dashboardData?.totalExpenses) >= 1.5 
                      ? "Excellent savings rate" 
                      : (dashboardData?.totalIncome / dashboardData?.totalExpenses) >= 1.2 
                        ? "Good savings rate" 
                        : "Needs improvement"
                    }
                  </>
                ) : (
                  <span className="font-medium">No expenses recorded yet</span>
                )}
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
              {(totalAssets > 0 || totalLiabilities > 0) ? (
                <Badge variant="outline" className={`bg-success/10 text-success`}>
                  Your financial overview
                </Badge>
              ) : (
                <Badge variant="outline" className="bg-primary/10 text-primary">
                  Add your assets and loans
                </Badge>
              )}
              
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
              {investments.map((investment: any, index: number) => (
                <div key={index} className="flex items-center justify-between p-4">
                  <div>
                    <div className="flex items-center">
                      {investment.type === 'stock' && <TrendingUp className="h-4 w-4 text-accent mr-2" />}
                      {investment.type === 'mutual_fund' && <BarChart3 className="h-4 w-4 text-secondary mr-2" />}
                      {investment.type === 'gold' && <DollarSign className="h-4 w-4 text-primary mr-2" />}
                      {investment.type === 'fixed_deposit' && <Building className="h-4 w-4 text-success mr-2" />}
                      {investment.type === 'real_estate' && <Home className="h-4 w-4 text-warning mr-2" />}
                      {!investment.type && <CircleDollarSign className="h-4 w-4 text-primary mr-2" />}
                      <span className="font-medium">{investment.name || 'Investment'}</span>
                    </div>
                    <p className="text-muted-foreground text-xs">
                      {investment.expectedReturn ? `Expected Return: ${investment.expectedReturn}% p.a.` : 'No return data'}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">₹{Number(investment.amount || 0).toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">
                      {totalAssets > 0 ? `${((Number(investment.amount || 0) / totalAssets) * 100).toFixed(1)}% of assets` : '0% of assets'}
                    </p>
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
              {loans.map((loan: any, index: number) => (
                <div key={index} className="flex items-center justify-between p-4">
                  <div>
                    <div className="flex items-center">
                      {loan.type === 'credit_card' && 
                        <CreditCard className="h-4 w-4 text-destructive mr-2" />}
                      {loan.type === 'home_loan' && 
                        <Home className="h-4 w-4 text-muted-foreground mr-2" />}
                      {loan.type === 'personal_loan' && 
                        <FileText className="h-4 w-4 text-accent mr-2" />}
                      {loan.type === 'auto_loan' && 
                        <CircleDollarSign className="h-4 w-4 text-secondary mr-2" />}
                      {loan.type === 'education_loan' && 
                        <Building className="h-4 w-4 text-warning mr-2" />}
                      {(!loan.type || !['credit_card', 'home_loan', 'personal_loan', 'auto_loan', 'education_loan'].includes(loan.type)) && 
                        <Landmark className="h-4 w-4 text-primary mr-2" />}
                      <span className="font-medium">{loan.name || 'Loan'}</span>
                    </div>
                    <p className="text-muted-foreground text-xs">
                      {loan.interestRate ? `Interest: ${loan.interestRate}% • ` : ''}
                      {loan.borrowedFrom ? `From: ${loan.borrowedFrom}` : loan.lentTo ? `To: ${loan.lentTo}` : ''}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">₹{Number(loan.amount || 0).toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">
                      {totalLiabilities > 0 ? `${((Number(loan.amount || 0) / totalLiabilities) * 100).toFixed(1)}% of debt` : '0% of debt'}
                    </p>
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
              <div className="text-2xl font-bold">₹{userData && parseFloat(userData.cashReserve || "0").toLocaleString('en-IN')}</div>
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
