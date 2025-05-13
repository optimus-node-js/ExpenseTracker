import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Transaction } from "@shared/schema";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Download, 
  Plus, 
  Filter, 
  Calendar, 
  FileDown, 
  Trash2, 
  Edit2, 
  ArrowDown, 
  ArrowUp, 
  FileText, 
  Wallet, 
  PiggyBank 
} from "lucide-react";
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
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
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
  SelectValue
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { EnhancedTransactionForm } from "@/components/EnhancedTransactionForm";
import { toast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { formatCurrency, formatDate, getCategoryColor, getCategoryIcon, getPaymentModeIcon } from "@/lib/utils";

export default function Transactions() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState<string | null>(null);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedTab, setSelectedTab] = useState("all");
  const queryClient = useQueryClient();
  
  // Fetch transactions
  const { data: transactions = [], isLoading } = useQuery<Transaction[]>({
    queryKey: ['/api/transactions'],
    enabled: true,
  });

  // Delete transaction mutation
  const deleteMutation = useMutation({
    mutationFn: (id: number) => apiRequest('DELETE', `/api/transactions/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/transactions'] });
      queryClient.invalidateQueries({ queryKey: ['/api/dashboard'] });
      toast({
        title: "Transaction deleted",
        description: "The transaction has been deleted successfully."
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete transaction. Please try again.",
        variant: "destructive"
      });
    }
  });

  // Handle transaction deletion
  const handleDeleteTransaction = (id: number) => {
    if (confirm("Are you sure you want to delete this transaction?")) {
      deleteMutation.mutate(id);
    }
  };

  // Get unique categories and payment modes for filters
  const categories = useMemo(() => {
    const uniqueCategories = new Set<string>();
    transactions.forEach((transaction: any) => {
      if (transaction.category) {
        uniqueCategories.add(transaction.category);
      }
    });
    return Array.from(uniqueCategories).sort();
  }, [transactions]);

  // Filter transactions
  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction: any) => {
      // Filter by search term
      const matchesSearch = searchTerm === "" || 
        transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.paymentMode.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Filter by transaction type
      const matchesType = filterType === null || transaction.type === filterType;
      
      // Filter by category
      const matchesCategory = filterCategory === null || transaction.category === filterCategory;
      
      // Filter by tab
      if (selectedTab === "income" && transaction.type !== "income") return false;
      if (selectedTab === "expense" && transaction.type !== "expense") return false;
      
      return matchesSearch && matchesType && matchesCategory;
    });
  }, [transactions, searchTerm, filterType, filterCategory, selectedTab]);

  // Calculate totals
  const totals = useMemo(() => {
    let income = 0;
    let expense = 0;
    
    transactions.forEach((transaction: any) => {
      if (transaction.type === "income") {
        income += Number(transaction.amount);
      } else if (transaction.type === "expense") {
        expense += Number(transaction.amount);
      }
    });
    
    return {
      income,
      expense,
      balance: income - expense
    };
  }, [transactions]);

  // Reset all filters
  const resetFilters = () => {
    setSearchTerm("");
    setFilterType(null);
    setFilterCategory(null);
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-primary mb-2">Transactions</h1>
          <p className="text-muted-foreground">Manage and track your income and expenses</p>
        </div>
        
        <div className="flex items-center space-x-2 mt-4 md:mt-0">
          <Dialog open={openAddDialog} onOpenChange={setOpenAddDialog}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Transaction
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Add New Transaction</DialogTitle>
                <DialogDescription>
                  Record a new income or expense transaction.
                </DialogDescription>
              </DialogHeader>
              <EnhancedTransactionForm 
                onSuccess={() => setOpenAddDialog(false)}
                onCancel={() => setOpenAddDialog(false)}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <ArrowDown className="mr-2 h-5 w-5 text-green-500" />
              Income
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">
              {formatCurrency(totals.income)}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <ArrowUp className="mr-2 h-5 w-5 text-red-500" />
              Expenses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">
              {formatCurrency(totals.expense)}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Wallet className="mr-2 h-5 w-5 text-primary" />
              Balance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${totals.balance >= 0 ? "text-green-500" : "text-red-500"}`}>
              {formatCurrency(totals.balance)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search transactions..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Button 
            variant="outline" 
            className="md:w-auto"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="mr-2 h-4 w-4" />
            {showFilters ? "Hide Filters" : "Show Filters"}
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="md:w-auto">
                <FileDown className="mr-2 h-4 w-4" />
                Export
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Export Options</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <FileText className="mr-2 h-4 w-4" />
                Export as CSV
              </DropdownMenuItem>
              <DropdownMenuItem>
                <FileText className="mr-2 h-4 w-4" />
                Export as Excel
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        {showFilters && (
          <div className="bg-muted p-4 rounded-md">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <p className="text-sm font-medium mb-2">Transaction Type</p>
                <Select 
                  value={filterType || ""} 
                  onValueChange={(value) => setFilterType(value || null)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All types</SelectItem>
                    <SelectItem value="income">Income</SelectItem>
                    <SelectItem value="expense">Expense</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex-1">
                <p className="text-sm font-medium mb-2">Category</p>
                <Select 
                  value={filterCategory || ""} 
                  onValueChange={(value) => setFilterCategory(value || null)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-end">
                <Button variant="secondary" onClick={resetFilters}>
                  Reset Filters
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Transactions */}
      <Card>
        <CardHeader className="pb-0">
          <Tabs defaultValue="all" onValueChange={setSelectedTab}>
            <TabsList>
              <TabsTrigger value="all">All Transactions</TabsTrigger>
              <TabsTrigger value="income">Income</TabsTrigger>
              <TabsTrigger value="expense">Expenses</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent className="pt-6">
          {isLoading ? (
            <div className="py-20 text-center">
              <div className="inline-block animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
              <p className="mt-4 text-muted-foreground">Loading transactions...</p>
            </div>
          ) : filteredTransactions.length === 0 ? (
            <div className="py-20 text-center">
              <PiggyBank className="mx-auto h-12 w-12 text-muted" />
              <h3 className="mt-4 text-lg font-medium">No transactions found</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {searchTerm || filterType || filterCategory ? 
                  "Try adjusting your filters to see more results" : 
                  "Start adding transactions to track your finances"}
              </p>
              {filteredTransactions.length === 0 && transactions.length === 0 && (
                <Button
                  className="mt-4"
                  onClick={() => setOpenAddDialog(true)}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Your First Transaction
                </Button>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="text-sm text-muted-foreground">
                Showing {filteredTransactions.length} transactions
              </div>
              
              <div className="divide-y">
                {filteredTransactions.map((transaction: any) => (
                  <div key={transaction.id} className="py-4">
                    <div className="flex flex-row items-center justify-between gap-4">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div 
                          className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center" 
                          style={{ backgroundColor: getCategoryColor(transaction.category) }}
                        >
                          <span className="text-white">{getCategoryIcon(transaction.category)}</span>
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="font-medium truncate">{transaction.description}</div>
                          <div className="text-sm text-muted-foreground flex items-center mt-1 flex-wrap">
                            <div className="flex items-center">
                              <Calendar className="h-3 w-3 mr-1" />
                              {formatDate(transaction.date)}
                            </div>
                            <Separator orientation="vertical" className="mx-2 h-3" />
                            <div className="flex items-center">
                              <span>{getPaymentModeIcon(transaction.paymentMode)}</span>
                              <span className="ml-1">{transaction.paymentMode}</span>
                            </div>
                          </div>
                          <div className="flex mt-2 flex-wrap gap-2">
                            <Badge variant="outline" className="text-xs">
                              {transaction.category}
                            </Badge>
                            {transaction.notes && (
                              <Tooltip>
                                <TooltipTrigger>
                                  <Badge variant="secondary" className="text-xs">
                                    Note
                                  </Badge>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p className="max-w-xs">{transaction.notes}</p>
                                </TooltipContent>
                              </Tooltip>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-end gap-3 flex-shrink-0">
                        <div className={`text-lg font-semibold whitespace-nowrap ${
                          transaction.type === 'income' ? 'text-green-500' : 'text-red-500'
                        }`}>
                          {transaction.type === 'income' ? '+ ' : '- '}
                          {formatCurrency(Number(transaction.amount))}
                        </div>
                        
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleDeleteTransaction(transaction.id)}
                          className="flex-shrink-0"
                        >
                          <Trash2 className="h-4 w-4 text-muted-foreground" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="border-t bg-muted/50 flex justify-between">
          <div className="text-sm text-muted-foreground">
            {filteredTransactions.length} of {transactions.length} transactions
          </div>
          <Button variant="ghost" size="sm" onClick={() => setOpenAddDialog(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Transaction
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}