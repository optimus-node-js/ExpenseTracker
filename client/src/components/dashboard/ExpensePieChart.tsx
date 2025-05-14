import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { formatCurrency, getChartColors } from "@/lib/utils";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Category data type
interface CategoryExpense {
  name: string;
  value: number;
  color: string;
}

interface ExpensePieChartProps {
  data: CategoryExpense[];
  isLoading?: boolean;
}

export function ExpensePieChart({ data, isLoading = false }: ExpensePieChartProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Filter the data when a category is selected
  const chartData = selectedCategory
    ? data.filter((item) => item.name === selectedCategory)
    : data;

  const handleCategoryClick = (category: string) => {
    if (selectedCategory === category) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(category);
    }
  };

  return (
    <Card className="animate-slide-up glassmorphism">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-semibold">Expense By Category</CardTitle>
        <div className="relative">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem onClick={() => window.location.href = '/transactions'}>
                View All Transactions
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => window.print()}>
                Print Chart
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => 
                window.location.href = '/transactions?type=expense'
              }>
                Filter Expenses
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="h-48 flex items-center justify-center">
            <div className="h-32 w-32 rounded-full border-8 border-muted animate-pulse"></div>
          </div>
        ) : (
          <div className="h-48 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={60}
                  innerRadius={40}
                  fill="#8884d8"
                  dataKey="value"
                  animationDuration={500}
                >
                  {chartData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.color || getChartColors(index)} 
                    />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number) => formatCurrency(value)}
                  contentStyle={{ 
                    borderRadius: '0.5rem',
                    backgroundColor: 'var(--background)',
                    border: '1px solid var(--border)'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Categories Legend */}
        <div className="mt-4 space-y-2">
          {data.map((category, index) => (
            <div 
              key={category.name}
              className="flex items-center justify-between cursor-pointer hover:bg-muted/50 p-1 rounded transition-colors"
              onClick={() => handleCategoryClick(category.name)}
            >
              <div className="flex items-center">
                <span 
                  className="w-3 h-3 rounded-full mr-2" 
                  style={{ backgroundColor: category.color || getChartColors(index) }}
                ></span>
                <span className="text-sm text-muted-foreground">{category.name}</span>
              </div>
              <span className="text-sm font-medium text-foreground">
                {formatCurrency(category.value)}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
