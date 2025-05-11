import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Skeleton } from "@/components/ui/skeleton";
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select";
import { TransactionItem } from "./TransactionItem";
import { formatCurrency, formatDate, getCategoryColor, getCategoryIcon, getPaymentModeIcon } from "@/lib/utils";
import { Transaction } from "@/types";
import { Eye, ArrowUpDown, ChevronDown } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";

interface TransactionListProps {
  transactions: Transaction[];
  isLoading?: boolean;
}

export function TransactionList({ transactions, isLoading = false }: TransactionListProps) {
  const [filter, setFilter] = useState<"all" | "income" | "expense">("all");
  const [timeRange, setTimeRange] = useState<string>("thisMonth");

  // Filter transactions based on the selected filter
  const filteredTransactions = transactions.filter((transaction) => {
    if (filter === "all") return true;
    return transaction.type === filter;
  });

  const columns: ColumnDef<Transaction>[] = [
    {
      accessorKey: "description",
      header: "Transaction",
      cell: ({ row }) => (
        <div className="flex items-center">
          <div className="flex-shrink-0 h-8 w-8 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-destructive">
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
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="-ml-4"
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
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
  ];

  return (
    <Card className="animate-slide-up glassmorphism">
      <CardHeader className="flex flex-row items-center justify-between pb-2 border-b">
        <CardTitle className="text-lg font-semibold">Recent Transactions</CardTitle>
        <Button variant="ghost" className="text-xs text-primary">
          View All
        </Button>
      </CardHeader>
      
      {/* Transactions Filter */}
      <div className="flex flex-wrap items-center justify-between p-4 border-b bg-muted/30">
        <div className="flex items-center space-x-2 mb-2 sm:mb-0">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            size="sm"
            className={filter === "all" ? "bg-primary text-primary-foreground" : ""}
            onClick={() => setFilter("all")}
          >
            All
          </Button>
          <Button
            variant={filter === "income" ? "default" : "outline"}
            size="sm"
            className={filter === "income" ? "bg-secondary text-secondary-foreground" : ""}
            onClick={() => setFilter("income")}
          >
            Income
          </Button>
          <Button
            variant={filter === "expense" ? "default" : "outline"}
            size="sm"
            className={filter === "expense" ? "bg-destructive text-destructive-foreground" : ""}
            onClick={() => setFilter("expense")}
          >
            Expense
          </Button>
        </div>
        <div className="flex items-center">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[140px] h-8 text-xs">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="thisMonth">This Month</SelectItem>
              <SelectItem value="lastMonth">Last Month</SelectItem>
              <SelectItem value="last3Months">Last 3 Months</SelectItem>
              <SelectItem value="customRange">Custom Range</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <CardContent className="p-0">
        {isLoading ? (
          <div className="p-4 space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center space-x-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-3 w-[200px]" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <DataTable
            columns={columns}
            data={filteredTransactions}
            pagination={false}
          />
        )}
      </CardContent>
    </Card>
  );
}
