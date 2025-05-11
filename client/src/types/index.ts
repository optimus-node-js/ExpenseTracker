export interface Transaction {
  id: string;
  description: string;
  amount: number;
  date: string;
  category: string;
  type: "income" | "expense";
  paymentMode: string;
  tags?: string[];
  notes?: string;
  source?: string;
}

export interface BudgetItem {
  id: string;
  category: string;
  amount: number;
  spent: number;
  period: "weekly" | "monthly";
}

export interface CategorySummary {
  name: string;
  value: number;
  color: string;
}

export interface MonthlyTrend {
  month: string;
  income: number;
  expense: number;
}

export interface DashboardData {
  totalIncome: number;
  totalExpenses: number;
  monthlySavings: number;
  budgetUtilization: number;
  incomeChange: {
    value: number;
    isPositive: boolean;
  };
  expenseChange: {
    value: number;
    isPositive: boolean;
  };
  savingsChange: {
    value: number;
    isPositive: boolean;
  };
  categoryBreakdown: CategorySummary[];
  monthlyTrend: MonthlyTrend[];
  recentTransactions: Transaction[];
}
