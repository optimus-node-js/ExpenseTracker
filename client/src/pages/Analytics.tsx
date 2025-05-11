import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { formatCurrency, getChartColors } from "@/lib/utils";
import {
  PieChart,
  Pie,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  AreaChart,
  Area
} from "recharts";
import { CalendarDays, Download, Printer, Share2 } from "lucide-react";

// Type definitions for analytics data
interface MonthlyData {
  month: string;
  income: number;
  expense: number;
  savings: number;
}

interface CategoryData {
  category: string;
  value: number;
  percentage: number;
}

interface PaymentModeData {
  mode: string;
  count: number;
  value: number;
}

interface SpendingTrendData {
  date: string;
  amount: number;
}

export default function Analytics() {
  const [timeRange, setTimeRange] = useState<string>("thisMonth");
  const [activeChart, setActiveChart] = useState<string>("overview");
  
  // Fetch analytics data
  const { data: analyticsData, isLoading } = useQuery({
    queryKey: ["/api/analytics", timeRange],
    queryFn: async () => {
      // This would fetch from the API in production
      // For now, return structured mock data
      return {
        summary: {
          totalIncome: 125000,
          totalExpense: 78450,
          savings: 46550,
          savingsRate: 37.24,
          transactionCount: 42,
          averageExpense: 1867.85
        },
        monthlyData: [
          { month: "Jan", income: 95000, expense: 62000, savings: 33000 },
          { month: "Feb", income: 98000, expense: 67000, savings: 31000 },
          { month: "Mar", income: 105000, expense: 69000, savings: 36000 },
          { month: "Apr", income: 110000, expense: 72000, savings: 38000 },
          { month: "May", income: 118000, expense: 75000, savings: 43000 },
          { month: "Jun", income: 115000, expense: 77000, savings: 38000 },
          { month: "Jul", income: 125000, expense: 78450, savings: 46550 }
        ],
        categoryData: [
          { category: "Food", value: 24350, percentage: 31.04 },
          { category: "Rent", value: 18000, percentage: 22.94 },
          { category: "Travel", value: 12500, percentage: 15.93 },
          { category: "Shopping", value: 9800, percentage: 12.49 },
          { category: "Bills", value: 7500, percentage: 9.56 },
          { category: "Others", value: 6300, percentage: 8.03 }
        ],
        paymentModeData: [
          { mode: "UPI", count: 18, value: 32450 },
          { mode: "Card", count: 12, value: 25600 },
          { mode: "Cash", count: 8, value: 12300 },
          { mode: "NetBanking", count: 4, value: 8100 }
        ],
        spendingTrend: [
          { date: "1 Jul", amount: 2100 },
          { date: "5 Jul", amount: 19500 },
          { date: "10 Jul", amount: 3600 },
          { date: "15 Jul", amount: 7900 },
          { date: "20 Jul", amount: 15000 },
          { date: "25 Jul", amount: 8450 },
          { date: "30 Jul", amount: 21900 }
        ]
      };
    }
  });
  
  // Custom tooltip formatter for currency
  const currencyFormatter = (value: number) => formatCurrency(value);
  
  // Loading state
  if (isLoading) {
    return (
      <div className="flex flex-col space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Analytics</h1>
          <div className="flex items-center space-x-2">
            <div className="w-32 h-10 bg-muted rounded-md animate-pulse"></div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="glassmorphism">
              <CardContent className="p-6">
                <div className="h-24 bg-muted rounded-md animate-pulse"></div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <Card className="glassmorphism">
          <CardContent className="p-6">
            <div className="h-80 bg-muted rounded-md animate-pulse"></div>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  if (!analyticsData) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <p className="text-muted-foreground">No analytics data available.</p>
        <Button variant="outline" className="mt-4">Refresh Data</Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Analytics</h1>
          <p className="text-muted-foreground mt-1">Gain insights into your spending patterns</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="thisMonth">This Month</SelectItem>
              <SelectItem value="lastMonth">Last Month</SelectItem>
              <SelectItem value="last3Months">Last 3 Months</SelectItem>
              <SelectItem value="last6Months">Last 6 Months</SelectItem>
              <SelectItem value="thisYear">This Year</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" size="icon" className="hidden md:flex">
            <CalendarDays className="h-4 w-4" />
          </Button>
          
          <Button variant="outline" size="icon" className="hidden md:flex">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <Card className="glassmorphism">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Total Income</p>
            <h3 className="text-xl font-bold mt-1 font-mono">{formatCurrency(analyticsData.summary.totalIncome)}</h3>
          </CardContent>
        </Card>
        
        <Card className="glassmorphism">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Total Expenses</p>
            <h3 className="text-xl font-bold mt-1 font-mono">{formatCurrency(analyticsData.summary.totalExpense)}</h3>
          </CardContent>
        </Card>
        
        <Card className="glassmorphism">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Savings</p>
            <h3 className="text-xl font-bold mt-1 font-mono">{formatCurrency(analyticsData.summary.savings)}</h3>
          </CardContent>
        </Card>
        
        <Card className="glassmorphism">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Savings Rate</p>
            <h3 className="text-xl font-bold mt-1">{analyticsData.summary.savingsRate.toFixed(1)}%</h3>
          </CardContent>
        </Card>
        
        <Card className="glassmorphism">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Transactions</p>
            <h3 className="text-xl font-bold mt-1">{analyticsData.summary.transactionCount}</h3>
          </CardContent>
        </Card>
        
        <Card className="glassmorphism">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Avg. Expense</p>
            <h3 className="text-xl font-bold mt-1 font-mono">{formatCurrency(analyticsData.summary.averageExpense)}</h3>
          </CardContent>
        </Card>
      </div>
      
      {/* Charts Section */}
      <Card className="glassmorphism">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle>Financial Analysis</CardTitle>
            <div className="flex space-x-2">
              <Button variant="outline" size="icon" className="h-8 w-8">
                <Printer className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="h-8 w-8">
                <Share2 className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="h-8 w-8">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <CardDescription>
            Visualize your financial data across different dimensions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview" value={activeChart} onValueChange={setActiveChart} className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="category">By Category</TabsTrigger>
              <TabsTrigger value="trend">Spending Trend</TabsTrigger>
              <TabsTrigger value="payment">Payment Methods</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="mt-0">
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={analyticsData.monthlyData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                    <XAxis dataKey="month" tick={{ fill: "hsl(var(--muted-foreground))" }} />
                    <YAxis 
                      tickFormatter={(value) => `₹${value/1000}K`} 
                      tick={{ fill: "hsl(var(--muted-foreground))" }} 
                    />
                    <Tooltip 
                      formatter={currencyFormatter}
                      contentStyle={{
                        backgroundColor: "hsl(var(--background))",
                        borderColor: "hsl(var(--border))",
                        borderRadius: "8px"
                      }}
                    />
                    <Legend />
                    <Bar 
                      name="Income" 
                      dataKey="income" 
                      fill="hsl(var(--primary))" 
                      radius={[4, 4, 0, 0]} 
                    />
                    <Bar 
                      name="Expense" 
                      dataKey="expense" 
                      fill="hsl(var(--destructive))" 
                      radius={[4, 4, 0, 0]} 
                    />
                    <Bar 
                      name="Savings" 
                      dataKey="savings" 
                      fill="hsl(var(--secondary))" 
                      radius={[4, 4, 0, 0]} 
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
            
            <TabsContent value="category" className="mt-0">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="h-[400px] w-full flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={analyticsData.categoryData}
                        cx="50%"
                        cy="50%"
                        innerRadius={80}
                        outerRadius={120}
                        paddingAngle={2}
                        dataKey="value"
                        label={({ category, percentage }) => `${category} (${percentage.toFixed(1)}%)`}
                        labelLine={true}
                      >
                        {analyticsData.categoryData.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={getChartColors(index)} 
                          />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={currencyFormatter}
                        contentStyle={{
                          backgroundColor: "hsl(var(--background))",
                          borderColor: "hsl(var(--border))",
                          borderRadius: "8px"
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="flex flex-col justify-center">
                  <h3 className="text-lg font-semibold mb-4">Expense Breakdown</h3>
                  <div className="space-y-4">
                    {analyticsData.categoryData.map((item, index) => (
                      <div key={index} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium flex items-center">
                            <span 
                              className="w-3 h-3 rounded-full mr-2 inline-block"
                              style={{ backgroundColor: getChartColors(index) }}
                            ></span>
                            {item.category}
                          </span>
                          <span className="font-mono">{formatCurrency(item.value)}</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className="h-2 rounded-full" 
                            style={{ 
                              width: `${item.percentage}%`,
                              backgroundColor: getChartColors(index)
                            }}
                          ></div>
                        </div>
                        <p className="text-xs text-muted-foreground text-right">{item.percentage.toFixed(1)}%</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="trend" className="mt-0">
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={analyticsData.spendingTrend}
                    margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                  >
                    <defs>
                      <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                    <XAxis dataKey="date" tick={{ fill: "hsl(var(--muted-foreground))" }} />
                    <YAxis 
                      tickFormatter={currencyFormatter} 
                      tick={{ fill: "hsl(var(--muted-foreground))" }} 
                    />
                    <Tooltip 
                      formatter={currencyFormatter}
                      contentStyle={{
                        backgroundColor: "hsl(var(--background))",
                        borderColor: "hsl(var(--border))",
                        borderRadius: "8px"
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="amount" 
                      stroke="hsl(var(--primary))" 
                      fill="url(#colorAmount)" 
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
            
            <TabsContent value="payment" className="mt-0">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="h-[400px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={analyticsData.paymentModeData}
                      layout="vertical"
                      margin={{ top: 20, right: 30, left: 60, bottom: 20 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                      <XAxis 
                        type="number" 
                        tickFormatter={currencyFormatter} 
                        tick={{ fill: "hsl(var(--muted-foreground))" }} 
                      />
                      <YAxis 
                        type="category" 
                        dataKey="mode" 
                        tick={{ fill: "hsl(var(--muted-foreground))" }} 
                      />
                      <Tooltip 
                        formatter={currencyFormatter}
                        contentStyle={{
                          backgroundColor: "hsl(var(--background))",
                          borderColor: "hsl(var(--border))",
                          borderRadius: "8px"
                        }}
                      />
                      <Bar 
                        name="Amount" 
                        dataKey="value" 
                        fill="hsl(var(--accent))" 
                        radius={[0, 4, 4, 0]} 
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="h-[400px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={analyticsData.paymentModeData}
                        cx="50%"
                        cy="50%"
                        innerRadius={0}
                        outerRadius={120}
                        paddingAngle={1}
                        dataKey="count"
                        nameKey="mode"
                        label={({ mode, count }) => `${mode} (${count})`}
                      >
                        {analyticsData.paymentModeData.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={getChartColors(index)} 
                          />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value) => [`${value} transactions`, "Count"]}
                        contentStyle={{
                          backgroundColor: "hsl(var(--background))",
                          borderColor: "hsl(var(--border))",
                          borderRadius: "8px"
                        }}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
