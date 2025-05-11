import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Download, Plus, Filter, Calendar, FileDown, Trash2, Edit2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn, formatCurrency, formatDate, getCategoryColor, getCategoryIcon, getPaymentModeIcon } from "@/lib/utils";
import { TransactionForm } from "@/components/TransactionForm";
import { Transaction } from "@/types";
import { ColumnDef } from "@tanstack/react-table";

export default function Transactions() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedPaymentMode, setSelectedPaymentMode] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  
  // Query transactions
  const { data: transactions, isLoading } = useQuery({ 
    queryKey: ["/api/transactions"],
    queryFn: async () => {
      // Will fetch from the API in production
      return [
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
        {
          id: "6",
          description: "Mobile Bill",
          amount: 999,
          date: "2023-07-10",
          category: "Bills",
          type: "expense",
          paymentMode: "UPI",
          source: "Jio",
        },
        {
          id: "7",
          description: "Gym Membership",
          amount: 1200,
          date: "2023-07-03",
          category: "Subscriptions",
          type: "expense",
          paymentMode: "Card",
          source: "Cult Fit",
        },
        {
          id: "8",
          description: "Doctor Visit",
          amount: 1500,
          date: "2023-07-18",
          category: "Medical",
          type: "expense",
          paymentMode: "Cash",
          source: "Apollo Hospital",
        },
        {
          id: "9",
          description: "Mutual Fund Investment",
          amount: 10000,
          date: "2023-07-05",
          category: "Investment",
          type: "expense",
          paymentMode: "NetBanking",
          source: "HDFC MF",
        },
        {
          id: "10",
          description: "Freelance Payment",
          amount: 15000,
          date: "2023-07-20",
          category: "Income",
          type: "income",
          paymentMode: "Bank",
          source: "Client XYZ",
        },
      ];
    }
  });

  // Apply filters
  const filteredTransactions = transactions?.filter((transaction) => {
    // Apply category filter
    if (selectedCategory !== "all" && transaction.category !== selectedCategory) {
      return false;
    }
    
    // Apply payment mode filter
    if (selectedPaymentMode !== "all" && transaction.paymentMode !== selectedPaymentMode) {
      return false;
    }
    
    // Apply search filter
    if (searchTerm && !transaction.description.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    // Apply date range filter
    if (startDate && endDate) {
      const transactionDate = new Date(transaction.date);
      if (transactionDate < startDate || transactionDate > endDate) {
        return false;
      }
    }
    
    return true;
  }) || [];

  // Reset all filters
  const resetFilters = () => {
    setSelectedCategory("all");
    setSelectedPaymentMode("all");
    setSearchTerm("");
    setStartDate(undefined);
    setEndDate(undefined);
  };

  // Get unique categories and payment modes for filters
  const categories = [...new Set(transactions?.map(t => t.category))];
  const paymentModes = [...new Set(transactions?.map(t => t.paymentMode))];

  // Get total income and expense of filtered transactions
  const totalIncome = filteredTransactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);
    
  const totalExpense = filteredTransactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  // Define columns for data table
  const columns: ColumnDef<Transaction>[] = [
    {
      accessorKey: "description",
      header: "Transaction",
      cell: ({ row }) => (
        <div className="flex items-center">
          <div className={`flex-shrink-0 h-8 w-8 rounded-full ${
            row.original.type === "expense" 
              ? "bg-red-100 dark:bg-red-900/30 text-destructive" 
              : "bg-green-100 dark:bg-green-900/30 text-secondary"
          } flex items-center justify-center`}>
            <i className={getCategoryIcon(row.original.category)}></i>
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-foreground">{row.original.description}</div>
            <div className="text-xs text-muted-foreground">{row.original.source || "Manual Entry"}</div>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => (
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getCategoryColor(row.original.category)}`}>
          {row.original.category}
        </span>
      ),
    },
    {
      accessorKey: "date",
      header: "Date",
      cell: ({ row }) => (
        <div className="text-sm text-muted-foreground">{formatDate(row.original.date)}</div>
      ),
    },
    {
      accessorKey: "paymentMode",
      header: "Payment",
      cell: ({ row }) => (
        <div className="flex items-center text-sm text-muted-foreground">
          <i className={`${getPaymentModeIcon(row.original.paymentMode)} mr-1`}></i>
          {row.original.paymentMode}
        </div>
      ),
    },
    {
      accessorKey: "amount",
      header: () => <div className="text-right">Amount</div>,
      cell: ({ row }) => (
        <div className={`whitespace-nowrap text-right text-sm font-medium ${
          row.original.type === "income" ? "text-success" : "text-destructive"
        }`}>
          {row.original.type === "income" ? "+" : "-"}
          {formatCurrency(row.original.amount)}
        </div>
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <div className="text-right">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-more-vertical">
                  <circle cx="12" cy="12" r="1" />
                  <circle cx="12" cy="5" r="1" />
                  <circle cx="12" cy="19" r="1" />
                </svg>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex items-center">
                <Edit2 className="h-4 w-4 mr-2" /> Edit
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center cursor-pointer text-destructive focus:text-destructive">
                <Trash2 className="h-4 w-4 mr-2" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Transactions</h1>
          <p className="text-muted-foreground mt-1">
            Manage and track all your financial transactions
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

      <Card className="mb-6 glassmorphism">
        <CardHeader className="pb-3">
          <CardTitle>Transaction Summary</CardTitle>
          <CardDescription>Overview of your financial activity</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">Total Transactions</p>
              <p className="text-2xl font-bold">{filteredTransactions.length}</p>
            </div>
            <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">Total Income</p>
              <p className="text-2xl font-bold text-secondary">{formatCurrency(totalIncome)}</p>
            </div>
            <div className="bg-red-100 dark:bg-red-900/30 p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">Total Expense</p>
              <p className="text-2xl font-bold text-destructive">{formatCurrency(totalExpense)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="glassmorphism">
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search transactions..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={selectedPaymentMode} onValueChange={setSelectedPaymentMode}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Payment Mode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Payments</SelectItem>
                  {paymentModes.map((mode) => (
                    <SelectItem key={mode} value={mode}>
                      {mode}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span className="hidden sm:inline">Date Range</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <div className="p-4 space-y-2">
                    <h4 className="font-medium text-sm">Select Date Range</h4>
                    <div className="grid gap-2">
                      <div className="grid gap-1">
                        <label className="text-xs text-muted-foreground">Start Date</label>
                        <CalendarComponent
                          mode="single"
                          selected={startDate}
                          onSelect={setStartDate}
                          className="border rounded-md p-3"
                        />
                      </div>
                      <div className="grid gap-1">
                        <label className="text-xs text-muted-foreground">End Date</label>
                        <CalendarComponent
                          mode="single"
                          selected={endDate}
                          onSelect={setEndDate}
                          className="border rounded-md p-3"
                        />
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
              
              <Button variant="ghost" onClick={resetFilters}>
                Clear Filters
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="py-10 text-center">
              <div className="h-16 w-16 mx-auto mb-4 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              <p className="text-muted-foreground">Loading transactions...</p>
            </div>
          ) : filteredTransactions.length === 0 ? (
            <div className="py-10 text-center">
              <div className="h-16 w-16 mx-auto mb-4 text-muted-foreground">
                <Filter className="h-16 w-16 opacity-20" />
              </div>
              <p className="text-muted-foreground mb-2">No transactions found.</p>
              <p className="text-sm text-muted-foreground">Try changing your filters or adding a new transaction.</p>
            </div>
          ) : (
            <DataTable
              columns={columns}
              data={filteredTransactions}
            />
          )}
        </CardContent>
        <CardFooter>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto flex items-center gap-2">
                <FileDown className="h-4 w-4" />
                <span>Export Data</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Export as CSV</DropdownMenuItem>
              <DropdownMenuItem>Export as PDF</DropdownMenuItem>
              <DropdownMenuItem>Export as Excel</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardFooter>
      </Card>
    </div>
  );
}
