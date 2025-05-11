import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { formatCurrency } from "@/lib/utils";

interface TrendData {
  month: string;
  income: number;
  expense: number;
}

interface MonthlyTrendChartProps {
  data: TrendData[];
  isLoading?: boolean;
}

export function MonthlyTrendChart({ data, isLoading = false }: MonthlyTrendChartProps) {
  const [activeType, setActiveType] = useState<"income" | "expenses">("income");

  const toggleType = (type: "income" | "expenses") => {
    setActiveType(type);
  };

  // Format large numbers to K format (e.g. 150000 -> 150K)
  const formatYAxis = (value: number) => {
    if (value >= 1000) {
      return `₹${Math.round(value / 1000)}K`;
    }
    return `₹${value}`;
  };

  // Tooltip formatter
  const tooltipFormatter = (value: number) => {
    return formatCurrency(value);
  };

  return (
    <Card className="animate-slide-up glassmorphism lg:col-span-2">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-semibold">Monthly Trend</CardTitle>
        <div className="flex space-x-2">
          <Button
            variant={activeType === "income" ? "default" : "outline"}
            className={activeType === "income" ? "bg-primary/10 dark:bg-primary/20 text-primary hover:bg-primary/20 hover:text-primary" : ""}
            size="sm"
            onClick={() => toggleType("income")}
          >
            Income
          </Button>
          <Button
            variant={activeType === "expenses" ? "default" : "outline"}
            className={activeType === "expenses" ? "bg-muted text-muted-foreground" : ""}
            size="sm"
            onClick={() => toggleType("expenses")}
          >
            Expenses
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="h-64 w-full bg-muted rounded-md animate-pulse"></div>
        ) : (
          <div className="h-64 mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                <defs>
                  <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--destructive))" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="hsl(var(--destructive))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                <XAxis
                  dataKey="month"
                  tick={{ fill: "hsl(var(--muted-foreground))" }}
                  axisLine={{ stroke: "hsl(var(--border))" }}
                  tickLine={{ stroke: "hsl(var(--border))" }}
                />
                <YAxis
                  tickFormatter={formatYAxis}
                  tick={{ fill: "hsl(var(--muted-foreground))" }}
                  axisLine={{ stroke: "hsl(var(--border))" }}
                  tickLine={{ stroke: "hsl(var(--border))" }}
                />
                <Tooltip
                  formatter={tooltipFormatter}
                  contentStyle={{
                    backgroundColor: "hsl(var(--background))",
                    borderColor: "hsl(var(--border))",
                    borderRadius: "0.5rem",
                  }}
                  labelStyle={{ color: "hsl(var(--foreground))" }}
                />
                <Area
                  type="monotone"
                  dataKey="income"
                  stroke="hsl(var(--primary))"
                  fillOpacity={1}
                  fill="url(#colorIncome)"
                  strokeWidth={2}
                  dot={activeType === "income"}
                  activeDot={activeType === "income"}
                  hide={activeType !== "income"}
                />
                <Area
                  type="monotone"
                  dataKey="expense"
                  stroke="hsl(var(--destructive))"
                  fillOpacity={1}
                  fill="url(#colorExpense)"
                  strokeWidth={2}
                  dot={activeType === "expenses"}
                  activeDot={activeType === "expenses"}
                  hide={activeType !== "expenses"}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
