import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/utils";
import { ArrowUpRight, ArrowDownRight, Wallet, PieChart } from "lucide-react";

interface SummaryCardProps {
  title: string;
  value: number;
  change?: { value: number; isPositive: boolean };
  changeLabel?: string;
  icon: "income" | "expense" | "savings" | "budget";
  isLoading?: boolean;
}

export function SummaryCard({
  title,
  value,
  change,
  changeLabel,
  icon,
  isLoading = false,
}: SummaryCardProps) {
  const getIcon = () => {
    switch (icon) {
      case "income":
        return (
          <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-secondary">
            <ArrowUpRight className="h-6 w-6" />
          </div>
        );
      case "expense":
        return (
          <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-destructive">
            <ArrowDownRight className="h-6 w-6" />
          </div>
        );
      case "savings":
        return (
          <div className="w-12 h-12 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary">
            <Wallet className="h-6 w-6" />
          </div>
        );
      case "budget":
        return (
          <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-accent">
            <PieChart className="h-6 w-6" />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-card rounded-xl shadow-sm border glassmorphism p-5 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          {isLoading ? (
            <div className="h-8 w-32 bg-muted rounded animate-pulse mt-1"></div>
          ) : (
            <h3 className="text-2xl font-mono font-bold text-foreground mt-1">
              {icon === "budget" ? `${value}%` : formatCurrency(value)}
            </h3>
          )}
          {change && (
            <p className={cn(
              "text-xs flex items-center mt-1",
              change.isPositive ? "text-success" : "text-destructive"
            )}>
              {change.isPositive ? (
                <ArrowUpRight className="mr-1 h-3 w-3" />
              ) : (
                <ArrowDownRight className="mr-1 h-3 w-3" />
              )}
              {change.value}% {changeLabel || 'vs last month'}
            </p>
          )}
        </div>
        {getIcon()}
      </div>
    </div>
  );
}
