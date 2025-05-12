import { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage 
} from "@/components/ui/form";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { AlertCircle, Calendar, Check, CreditCard, Ellipsis, Plus, Trash2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { formatCurrency, formatDate, getCategoryColor, getCategoryIcon } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { insertSubscriptionSchema } from "@shared/schema";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

// Extend the schema with form validation
const formSchema = insertSubscriptionSchema.extend({
  startDate: z.string().min(1, { message: "Start date is required" }),
  nextBillingDate: z.string().min(1, { message: "Next billing date is required" }),
});

type SubscriptionFormValues = z.infer<typeof formSchema>;

export default function Subscriptions() {
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedSubscription, setSelectedSubscription] = useState<any>(null);

  const queryClient = useQueryClient();

  // Fetch all subscriptions
  const { data: subscriptions = [], isLoading } = useQuery({
    queryKey: ['/api/subscriptions'],
    enabled: true,
  });

  // Create a new subscription
  const createMutation = useMutation({
    mutationFn: (data: SubscriptionFormValues) => apiRequest('/api/subscriptions', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/subscriptions'] });
      toast({
        title: "Success",
        description: "Subscription added successfully",
      });
      setOpenAddDialog(false);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to add subscription. Please try again.",
        variant: "destructive",
      });
      console.error("Error adding subscription:", error);
    },
  });

  // Update an existing subscription
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: SubscriptionFormValues }) => apiRequest(`/api/subscriptions/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/subscriptions'] });
      toast({
        title: "Success",
        description: "Subscription updated successfully",
      });
      setOpenEditDialog(false);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update subscription. Please try again.",
        variant: "destructive",
      });
      console.error("Error updating subscription:", error);
    },
  });

  // Delete a subscription
  const deleteMutation = useMutation({
    mutationFn: (id: number) => apiRequest(`/api/subscriptions/${id}`, {
      method: 'DELETE',
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/subscriptions'] });
      toast({
        title: "Success",
        description: "Subscription deleted successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to delete subscription. Please try again.",
        variant: "destructive",
      });
      console.error("Error deleting subscription:", error);
    },
  });

  // Form for adding a new subscription
  const addForm = useForm<SubscriptionFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      amount: 0,
      billingCycle: "monthly",
      startDate: new Date().toISOString().split('T')[0],
      nextBillingDate: new Date().toISOString().split('T')[0],
      category: "Entertainment",
      paymentMethod: "Credit Card",
      autoRenew: true,
      active: true,
      reminderDays: 3,
      notes: "",
    },
  });

  // Form for editing an existing subscription
  const editForm = useForm<SubscriptionFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      amount: 0,
      billingCycle: "monthly",
      startDate: "",
      nextBillingDate: "",
      category: "",
      paymentMethod: "",
      autoRenew: true,
      active: true,
      reminderDays: 3,
      notes: "",
    },
  });

  // Handle form submission for adding a new subscription
  const onAddSubmit = (data: SubscriptionFormValues) => {
    createMutation.mutate(data);
  };

  // Handle form submission for editing an existing subscription
  const onEditSubmit = (data: SubscriptionFormValues) => {
    if (selectedSubscription) {
      updateMutation.mutate({ id: selectedSubscription.id, data });
    }
  };

  // Open the edit dialog and populate form with selected subscription data
  const handleEdit = (subscription: any) => {
    setSelectedSubscription(subscription);
    editForm.reset({
      name: subscription.name,
      description: subscription.description || "",
      amount: Number(subscription.amount),
      billingCycle: subscription.billingCycle,
      startDate: new Date(subscription.startDate).toISOString().split('T')[0],
      nextBillingDate: new Date(subscription.nextBillingDate).toISOString().split('T')[0],
      category: subscription.category,
      paymentMethod: subscription.paymentMethod,
      autoRenew: subscription.autoRenew,
      active: subscription.active,
      reminderDays: subscription.reminderDays || 3,
      notes: subscription.notes || "",
    });
    setOpenEditDialog(true);
  };

  // Handle deleting a subscription with confirmation
  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this subscription?")) {
      deleteMutation.mutate(id);
    }
  };

  // Calculate total monthly expenditure on subscriptions
  const monthlyTotal = subscriptions.reduce((total: number, sub: any) => {
    if (!sub.active) return total;
    
    let amount = Number(sub.amount);
    
    switch (sub.billingCycle) {
      case "weekly":
        return total + (amount * 4.33); // Average weeks in a month
      case "monthly":
        return total + amount;
      case "quarterly":
        return total + (amount / 3);
      case "yearly":
        return total + (amount / 12);
      default:
        return total + amount;
    }
  }, 0);

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-primary mb-2">Subscription Management</h1>
          <p className="text-muted-foreground">Track and manage your recurring subscriptions</p>
        </div>
        
        <div className="mt-4 md:mt-0">
          <Button onClick={() => setOpenAddDialog(true)} size="sm">
            <Plus className="mr-1 h-4 w-4" />
            Add Subscription
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Monthly Cost</CardTitle>
            <CardDescription>Estimated total for active subscriptions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">{formatCurrency(monthlyTotal)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Active Subscriptions</CardTitle>
            <CardDescription>Number of currently active services</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">
              {subscriptions.filter((sub: any) => sub.active).length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Next Payment</CardTitle>
            <CardDescription>Your upcoming subscription payment</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div>Loading...</div>
            ) : subscriptions.length === 0 ? (
              <div>No subscriptions</div>
            ) : (
              <div>
                {(() => {
                  const activeSubscriptions = subscriptions.filter((sub: any) => sub.active);
                  if (activeSubscriptions.length === 0) return <div>No active subscriptions</div>;
                  
                  const nextSubscription = activeSubscriptions.reduce((nearest: any, sub: any) => {
                    if (!nearest) return sub;
                    return new Date(sub.nextBillingDate) < new Date(nearest.nextBillingDate) ? sub : nearest;
                  }, null);
                  
                  if (!nextSubscription) return <div>No upcoming payments</div>;
                  
                  return (
                    <>
                      <div className="text-3xl font-bold text-primary">{formatCurrency(Number(nextSubscription.amount))}</div>
                      <div className="text-sm text-muted-foreground mt-1">
                        {nextSubscription.name} - {formatDate(nextSubscription.nextBillingDate)}
                      </div>
                    </>
                  );
                })()}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-4">Your Subscriptions</h2>
        
        {isLoading ? (
          <div className="flex justify-center p-8">
            <div className="text-center">
              <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
              <p className="mt-4 text-muted-foreground">Loading subscriptions...</p>
            </div>
          </div>
        ) : subscriptions.length === 0 ? (
          <div className="bg-muted/50 rounded-lg p-8 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted mb-4">
              <CreditCard className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium">No subscriptions yet</h3>
            <p className="mt-2 text-sm text-muted-foreground max-w-sm mx-auto">
              Start tracking your subscriptions to get insights into your recurring expenses.
            </p>
            <Button className="mt-4" onClick={() => setOpenAddDialog(true)}>
              <Plus className="mr-1 h-4 w-4" />
              Add Your First Subscription
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {subscriptions.map((subscription: any) => (
              <Card key={subscription.id} className={subscription.active ? "" : "opacity-70"}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <div className="flex items-center">
                      <div 
                        className="w-8 h-8 rounded-full flex items-center justify-center mr-3" 
                        style={{ backgroundColor: getCategoryColor(subscription.category) }}
                      >
                        <span className="text-white">{getCategoryIcon(subscription.category)}</span>
                      </div>
                      <div>
                        <CardTitle className="text-lg flex items-center">
                          {subscription.name}
                          {!subscription.active && (
                            <span className="ml-2 text-xs bg-muted px-2 py-0.5 rounded-full">Inactive</span>
                          )}
                        </CardTitle>
                        <CardDescription>{subscription.category}</CardDescription>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold">
                        {formatCurrency(Number(subscription.amount))}
                      </div>
                      <CardDescription>
                        {subscription.billingCycle === "monthly" ? "monthly" : 
                         subscription.billingCycle === "yearly" ? "yearly" : 
                         subscription.billingCycle === "quarterly" ? "quarterly" : "weekly"}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-4 text-sm">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>Next payment: {formatDate(subscription.nextBillingDate)}</span>
                    </div>
                    <div className="flex items-center">
                      <CreditCard className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>Payment method: {subscription.paymentMethod}</span>
                    </div>
                    {subscription.description && (
                      <div className="flex items-start col-span-2 mt-1">
                        <span className="text-muted-foreground">{subscription.description}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="pt-2">
                  <div className="flex gap-2 w-full justify-end">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={() => handleDelete(subscription.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={() => handleEdit(subscription)}
                    >
                      <Ellipsis className="h-4 w-4" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Add Subscription Dialog */}
      <Dialog open={openAddDialog} onOpenChange={setOpenAddDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Subscription</DialogTitle>
            <DialogDescription>
              Enter the details of your new subscription.
            </DialogDescription>
          </DialogHeader>

          <Form {...addForm}>
            <form onSubmit={addForm.handleSubmit(onAddSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={addForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Service Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Netflix, Spotify, etc." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={addForm.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Amount</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="0.00" 
                          {...field} 
                          onChange={(e) => field.onChange(parseFloat(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={addForm.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Entertainment">Entertainment</SelectItem>
                          <SelectItem value="Software">Software</SelectItem>
                          <SelectItem value="Utilities">Utilities</SelectItem>
                          <SelectItem value="Streaming">Streaming</SelectItem>
                          <SelectItem value="Food">Food</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={addForm.control}
                  name="billingCycle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Billing Cycle</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select billing cycle" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                          <SelectItem value="quarterly">Quarterly</SelectItem>
                          <SelectItem value="yearly">Yearly</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={addForm.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={addForm.control}
                  name="nextBillingDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Next Billing Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={addForm.control}
                  name="paymentMethod"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Payment Method</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select payment method" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Credit Card">Credit Card</SelectItem>
                          <SelectItem value="Debit Card">Debit Card</SelectItem>
                          <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                          <SelectItem value="UPI">UPI</SelectItem>
                          <SelectItem value="PayPal">PayPal</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={addForm.control}
                  name="reminderDays"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Reminder Days</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="3" 
                          {...field} 
                          onChange={(e) => field.onChange(parseInt(e.target.value))}
                        />
                      </FormControl>
                      <FormDescription>
                        Days before billing to send reminder
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="col-span-1 md:col-span-2">
                  <FormField
                    control={addForm.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="Description" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex space-x-4 items-center">
                  <FormField
                    control={addForm.control}
                    name="autoRenew"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel className="text-sm cursor-pointer">Auto Renew</FormLabel>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex space-x-4 items-center">
                  <FormField
                    control={addForm.control}
                    name="active"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel className="text-sm cursor-pointer">Active</FormLabel>
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="col-span-1 md:col-span-2">
                <FormField
                  control={addForm.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Notes (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Additional notes" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <DialogFooter>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setOpenAddDialog(false)}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={createMutation.isPending}
                >
                  {createMutation.isPending ? (
                    <>
                      <div className="animate-spin h-4 w-4 mr-2 border-2 border-t-transparent rounded-full" />
                      Adding...
                    </>
                  ) : (
                    "Add Subscription"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Edit Subscription Dialog */}
      <Dialog open={openEditDialog} onOpenChange={setOpenEditDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Subscription</DialogTitle>
            <DialogDescription>
              Update the details of your subscription.
            </DialogDescription>
          </DialogHeader>

          <Form {...editForm}>
            <form onSubmit={editForm.handleSubmit(onEditSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={editForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Service Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Netflix, Spotify, etc." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={editForm.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Amount</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="0.00" 
                          {...field} 
                          onChange={(e) => field.onChange(parseFloat(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={editForm.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Entertainment">Entertainment</SelectItem>
                          <SelectItem value="Software">Software</SelectItem>
                          <SelectItem value="Utilities">Utilities</SelectItem>
                          <SelectItem value="Streaming">Streaming</SelectItem>
                          <SelectItem value="Food">Food</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={editForm.control}
                  name="billingCycle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Billing Cycle</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select billing cycle" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                          <SelectItem value="quarterly">Quarterly</SelectItem>
                          <SelectItem value="yearly">Yearly</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={editForm.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={editForm.control}
                  name="nextBillingDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Next Billing Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={editForm.control}
                  name="paymentMethod"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Payment Method</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select payment method" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Credit Card">Credit Card</SelectItem>
                          <SelectItem value="Debit Card">Debit Card</SelectItem>
                          <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                          <SelectItem value="UPI">UPI</SelectItem>
                          <SelectItem value="PayPal">PayPal</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={editForm.control}
                  name="reminderDays"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Reminder Days</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="3" 
                          {...field} 
                          onChange={(e) => field.onChange(parseInt(e.target.value))}
                        />
                      </FormControl>
                      <FormDescription>
                        Days before billing to send reminder
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="col-span-1 md:col-span-2">
                  <FormField
                    control={editForm.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="Description" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex space-x-4 items-center">
                  <FormField
                    control={editForm.control}
                    name="autoRenew"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel className="text-sm cursor-pointer">Auto Renew</FormLabel>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex space-x-4 items-center">
                  <FormField
                    control={editForm.control}
                    name="active"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel className="text-sm cursor-pointer">Active</FormLabel>
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="col-span-1 md:col-span-2">
                <FormField
                  control={editForm.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Notes (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Additional notes" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <DialogFooter>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setOpenEditDialog(false)}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={updateMutation.isPending}
                >
                  {updateMutation.isPending ? (
                    <>
                      <div className="animate-spin h-4 w-4 mr-2 border-2 border-t-transparent rounded-full" />
                      Updating...
                    </>
                  ) : (
                    "Update Subscription"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}