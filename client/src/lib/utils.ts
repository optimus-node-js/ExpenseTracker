import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format amount to Indian currency format (₹)
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

// Format date to Indian format (DD/MM/YYYY)
export function formatDate(date: Date | string): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return format(dateObj, "dd/MM/yyyy");
}

// Generate random colors for charts
export function getChartColors(index: number): string {
  const colors = [
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
    "hsl(var(--chart-4))",
    "hsl(var(--chart-5))",
  ];
  return colors[index % colors.length];
}

// Get icon based on transaction category
export function getCategoryIcon(category: string): string {
  const icons: Record<string, string> = {
    Food: "ri-restaurant-line",
    Travel: "ri-car-line",
    Rent: "ri-home-line",
    Bills: "ri-bill-line",
    EMI: "ri-bank-card-line",
    Medical: "ri-medicine-bottle-line",
    Shopping: "ri-shopping-bag-line",
    Subscriptions: "ri-calendar-check-line",
    Misc: "ri-more-2-fill",
    Income: "ri-money-dollar-circle-line",
  };
  return icons[category] || "ri-question-line";
}

// Get background color based on category
export function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    Food: "bg-green-100 dark:bg-green-900/30 text-secondary",
    Travel: "bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300",
    Rent: "bg-orange-100 dark:bg-orange-900/30 text-primary",
    Bills: "bg-blue-100 dark:bg-blue-900/30 text-accent",
    EMI: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300",
    Medical: "bg-red-100 dark:bg-red-900/30 text-destructive",
    Shopping: "bg-pink-100 dark:bg-pink-900/30 text-pink-800 dark:text-pink-300",
    Subscriptions: "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300",
    Misc: "bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-300",
    Income: "bg-blue-100 dark:bg-blue-900/30 text-accent",
  };
  return colors[category] || "bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-300";
}

// Get icon based on payment mode
export function getPaymentModeIcon(mode: string): string {
  const icons: Record<string, string> = {
    UPI: "ri-bank-card-line",
    Cash: "ri-wallet-3-line",
    Card: "ri-bank-card-line",
    Wallet: "ri-wallet-3-line",
    NetBanking: "ri-bank-line",
    Bank: "ri-bank-line",
  };
  return icons[mode] || "ri-question-line";
}
