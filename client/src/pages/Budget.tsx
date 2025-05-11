import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { formatCurrency, getCategoryColor, getCategoryIcon } from "@/lib/utils";
import { AlertCircle, Edit, Plus, Trash2 } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { queryClient } from "@/lib/queryClient";

// Budget form schema
const budgetFormSchema = z.object({
  category: z.string({
    required_error: "Please select a category",
  }),
  amount: z.string().min(1, "Amount is required").refine(
    (val) => !isNaN(Number(val)) && Number(val) > 0,
    {
      message: "Amount must be a positive number",
    }
  ),
  period: z.enum(["monthly", "weekly"], {
    required_error: "Please select a period",
  }),
});

type BudgetFormValues = z.infer<typeof budgetFormSchema>;

// Budget category type
interface Budget {
  id: string;
  category: string;
  amount: number;
  spent: number;
  period: "weekly" | "monthly";
}

export default function Budget() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentBudget, setCurrentBudget] = useState<Budget | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  
  // Define categories for selection
  const categories = [
    "Food",
    "Travel",
    "Rent",
    "Bills",
    "EMI",
    "Medical",
    "Shopping",
    "Subscriptions",
    "Misc",
  ];
  
  // Budget form
  const form = useForm<BudgetFormValues>({
    resolver: zodResolver(budgetFormSchema),
    defaultValues: {
      period: "monthly",
    },
  });
  
  // Fetch budgets
  const { data: budgets, isLoading: budgetsLoading } = useQuery({
    queryKey: ["/api/budgets"],
    queryFn: async () => {
      // This would fetch from the API in production
      // For now, return structured mock data
      return [
        { id: "1", category: "Food", amount: 15000, spent: 12450, period: "monthly" },
        { id: "2", category: "Travel", amount: 8000, spent: 6200, period: "monthly" },
        { id: "3", category: "Rent", amount: 22000, spent: 18000, period: "monthly" },
        { id: "4", category: "Bills", amount: 5000, spent: 4800, period: "monthly" },
        { id: "5", category: "Shopping", amount: 10000, spent: 9800, period: "monthly" },
        { id: "6", category: "Medical", amount: 5000, spent: 0, period: "monthly" },
      ] as Budget[];
    },
  });
  
  // Get total budget amount and spent
  const totalBudget = budgets?.reduce((acc, budget) => acc + budget.amount, 0) || 0;
  const totalSpent = budgets?.reduce((acc, budget) => acc + budget.spent, 0) || 0;
  
  // Calculate budget utilization percentage
  const utilization = totalBudget > 0 ? Math.round((totalSpent / totalBudget) * 100) : 0;
  
  // Open edit dialog with budget data
  const handleEditBudget = (budget: Budget) => {
    setIsEditing(true);
    setCurrentBudget(budget);
    form.reset({
      category: budget.category,
      amount: budget.amount.toString(),
      period: budget.period,
    });
    setDialogOpen(true);
  };
  
  // Open add budget dialog
  const handleAddBudget = () => {
    setIsEditing(false);
    setCurrentBudget(null);
    form.reset({
      category: "",
      amount: "",
      period: "monthly",
    });
    setDialogOpen(true);
  };
  
  // Handle form submission
  const onSubmit = async (data: BudgetFormValues) => {
    setIsSubmitting(true);
    try {
      const payload = {
        ...data,
        amount: Number(data.amount),
        id: isEditing && currentBudget ? currentBudget.id : undefined,
      };
      
      // Use appropriate HTTP method based on whether we're adding or editing
      const method = isEditing ? "PUT" : "POST";
      const endpoint = isEditing ? `/api/budgets/${currentBudget?.id}` : "/api/budgets";
      
      await apiRequest(method, endpoint, payload);
      
      // Show success message
      toast({
        title: isEditing ? "Budget updated" : "Budget added",
        description: isEditing 
          ? `Your ${data.category} budget has been updated.`
          : `Your ${data.category} budget has been added.`,
      });
      
      // Reset form and close dialog
      form.reset();
      setDialogOpen(false);
      
      // Invalidate budget queries to refresh data
      queryClient.invalidateQueries({ queryKey: ["/api/budgets"] });
      
    } catch (error) {
      console.error("Error saving budget:", error);
      toast({
        title: "Error",
        description: "There was a problem saving your budget.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Delete a budget
  const handleDeleteBudget = async (budgetId: string) => {
    try {
      await apiRequest("DELETE", `/api/budgets/${budgetId}`, undefined);
      
      toast({
        title: "Budget deleted",
        description: "Your budget has been deleted successfully.",
      });
      
      // Invalidate budget queries to refresh data
      queryClient.invalidateQueries({ queryKey: ["/api/budgets"] });
      
    } catch (error) {
      console.error("Error deleting budget:", error);
      toast({
        title: "Error",
        description: "There was a problem deleting your budget.",
        variant: "destructive",
      });
    }
  };
  
  // Helper function to get utilization status
  const getUtilizationStatus = (budget: Budget) => {
    const percentage = Math.round((budget.spent / budget.amount) * 100);
    
    if (percentage >= 90) return "danger";
    if (percentage >= 75) return "warning";
    return "normal";
  };
  
  // Helper to get progress bar color
  const getProgressColor = (status: string) => {
    switch (status) {
      case "danger":
        return "bg-destructive";
      case "warning":
        return "bg-amber-500";
      default:
        return "bg-primary";
    }
  };

  return (
    <div className="flex flex-col space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Budgets</h1>
          <p className="text-muted-foreground mt-1">Manage your monthly and weekly spending limits</p>
        </div>
        
        <Button onClick={handleAddBudget} className="flex items-center gap-2 bg-primary hover:bg-primary/90">
          <Plus className="h-4 w-4" />
          <span>Add Budget</span>
        </Button>
      </div>
      
      {/* Overall Budget Status */}
      <Card className="glassmorphism">
        <CardHeader className="pb-2">
          <CardTitle>Budget Overview</CardTitle>
          <CardDescription>Your overall budget utilization this month</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-muted/30 rounded-lg">
              <h3 className="text-sm font-medium text-muted-foreground">Total Budget</h3>
              <p className="text-2xl font-bold mt-1">{formatCurrency(totalBudget)}</p>
            </div>
            
            <div className="p-4 bg-muted/30 rounded-lg">
              <h3 className="text-sm font-medium text-muted-foreground">Spent So Far</h3>
              <p className="text-2xl font-bold mt-1">{formatCurrency(totalSpent)}</p>
            </div>
            
            <div className="p-4 bg-muted/30 rounded-lg">
              <h3 className="text-sm font-medium text-muted-foreground">Remaining</h3>
              <p className="text-2xl font-bold mt-1">{formatCurrency(totalBudget - totalSpent)}</p>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Budget Utilization</span>
              <span className="text-sm font-medium">{utilization}%</span>
            </div>
            <Progress value={utilization} className="h-2" />
            {utilization >= 90 && (
              <Alert variant="destructive" className="mt-2">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Warning</AlertTitle>
                <AlertDescription>
                  You've used {utilization}% of your budget. Consider reviewing your expenses.
                </AlertDescription>
              </Alert>
            )}
            {utilization >= 75 && utilization < 90 && (
              <Alert className="bg-amber-100 dark:bg-amber-900/20 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-800 mt-2">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Attention</AlertTitle>
                <AlertDescription>
                  You've used {utilization}% of your budget. Consider monitoring expenses closely.
                </AlertDescription>
              </Alert>
            )}
          </div>
        </CardContent>
      </Card>
      
      {/* Individual Budgets */}
      <Card className="glassmorphism">
        <CardHeader className="pb-2">
          <CardTitle>Category Budgets</CardTitle>
          <CardDescription>Track your spending by category</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="monthly">
            <TabsList className="mb-4">
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
            </TabsList>
            
            <TabsContent value="monthly" className="mt-0">
              {budgetsLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="animate-pulse">
                      <div className="h-16 bg-muted rounded-lg"></div>
                    </div>
                  ))}
                </div>
              ) : budgets && budgets.filter(b => b.period === "monthly").length > 0 ? (
                <div className="space-y-4">
                  {budgets
                    .filter(budget => budget.period === "monthly")
                    .map((budget) => {
                      const percentage = Math.round((budget.spent / budget.amount) * 100);
                      const status = getUtilizationStatus(budget);
                      
                      return (
                        <div key={budget.id} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center">
                              <span className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${getCategoryColor(budget.category)}`}>
                                <i className={getCategoryIcon(budget.category)}></i>
                              </span>
                              <div>
                                <h3 className="font-medium">{budget.category}</h3>
                                <div className="flex items-center space-x-2">
                                  <span className="text-sm text-muted-foreground">
                                    {formatCurrency(budget.spent)} of {formatCurrency(budget.amount)}
                                  </span>
                                  <Badge 
                                    variant={status === "danger" ? "destructive" : status === "warning" ? "outline" : "default"}
                                    className={status === "warning" ? "border-amber-500 text-amber-500" : ""}
                                  >
                                    {percentage}%
                                  </Badge>
                                </div>
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              <Button variant="ghost" size="icon" onClick={() => handleEditBudget(budget)}>
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" onClick={() => handleDeleteBudget(budget.id)}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          <Progress 
                            value={percentage} 
                            className="h-2" 
                            indicatorClassName={getProgressColor(status)} 
                          />
                        </div>
                      );
                    })}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8">
                  <p className="text-muted-foreground mb-4">No monthly budgets set up yet.</p>
                  <Button onClick={handleAddBudget}>Create Budget</Button>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="weekly" className="mt-0">
              {budgetsLoading ? (
                <div className="space-y-4">
                  {[1, 2].map((i) => (
                    <div key={i} className="animate-pulse">
                      <div className="h-16 bg-muted rounded-lg"></div>
                    </div>
                  ))}
                </div>
              ) : budgets && budgets.filter(b => b.period === "weekly").length > 0 ? (
                <div className="space-y-4">
                  {budgets
                    .filter(budget => budget.period === "weekly")
                    .map((budget) => {
                      const percentage = Math.round((budget.spent / budget.amount) * 100);
                      const status = getUtilizationStatus(budget);
                      
                      return (
                        <div key={budget.id} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center">
                              <span className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${getCategoryColor(budget.category)}`}>
                                <i className={getCategoryIcon(budget.category)}></i>
                              </span>
                              <div>
                                <h3 className="font-medium">{budget.category}</h3>
                                <div className="flex items-center space-x-2">
                                  <span className="text-sm text-muted-foreground">
                                    {formatCurrency(budget.spent)} of {formatCurrency(budget.amount)}
                                  </span>
                                  <Badge 
                                    variant={status === "danger" ? "destructive" : status === "warning" ? "outline" : "default"}
                                    className={status === "warning" ? "border-amber-500 text-amber-500" : ""}
                                  >
                                    {percentage}%
                                  </Badge>
                                </div>
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              <Button variant="ghost" size="icon" onClick={() => handleEditBudget(budget)}>
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" onClick={() => handleDeleteBudget(budget.id)}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          <Progress 
                            value={percentage} 
                            className="h-2" 
                            indicatorClassName={getProgressColor(status)} 
                          />
                        </div>
                      );
                    })}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8">
                  <p className="text-muted-foreground mb-4">No weekly budgets set up yet.</p>
                  <Button onClick={handleAddBudget}>Create Budget</Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      {/* Budget Form Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{isEditing ? "Edit Budget" : "Add Budget"}</DialogTitle>
            <DialogDescription>
              {isEditing ? "Update your budget allocation" : "Set up a new budget for a spending category"}
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select
                      disabled={isEditing}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Budget Amount (₹)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        step="100"
                        placeholder="10000"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Set an appropriate budget for this category
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="period"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Budget Period</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a period" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Saving..." : isEditing ? "Update Budget" : "Create Budget"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
