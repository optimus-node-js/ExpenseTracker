import { useState } from "react";
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { insertTransactionSchema } from "@shared/schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

// Extend the transaction schema for our form
const transactionFormSchema = insertTransactionSchema.extend({
  date: z.string().min(1, { message: "Date is required" }),
});

type TransactionFormValues = z.infer<typeof transactionFormSchema>;

const paymentModes = [
  "Cash",
  "Credit Card",
  "Debit Card",
  "UPI",
  "Net Banking",
  "Bank Transfer",
  "Mobile Wallet",
  "Other"
];

const expenseCategories = [
  "Food & Dining",
  "Transportation",
  "Entertainment",
  "Shopping",
  "Housing",
  "Utilities",
  "Healthcare",
  "Education",
  "Travel",
  "Personal Care",
  "Investments",
  "Gifts & Donations",
  "Bills & Taxes",
  "Business",
  "Other"
];

const incomeCategories = [
  "Salary",
  "Freelancing",
  "Business",
  "Investments",
  "Rental Income",
  "Dividends",
  "Interest",
  "Gifts",
  "Refunds",
  "Other"
];

interface EnhancedTransactionFormProps {
  onSuccess?: () => void;
  defaultValues?: Partial<TransactionFormValues>;
  mode?: "income" | "expense" | "both";
  onCancel?: () => void;
}

export function EnhancedTransactionForm({ 
  onSuccess, 
  defaultValues, 
  mode = "both",
  onCancel
}: EnhancedTransactionFormProps) {
  const [transactionType, setTransactionType] = useState<"income" | "expense">(
    defaultValues?.type || (mode === "income" ? "income" : "expense")
  );
  const queryClient = useQueryClient();

  // Set up the form
  const form = useForm<TransactionFormValues>({
    resolver: zodResolver(transactionFormSchema),
    defaultValues: {
      description: defaultValues?.description || "",
      amount: defaultValues?.amount || 0,
      date: defaultValues?.date ? 
        new Date(defaultValues.date).toISOString().split('T')[0] : 
        new Date().toISOString().split('T')[0],
      category: defaultValues?.category || 
        (transactionType === "income" ? incomeCategories[0] : expenseCategories[0]),
      type: defaultValues?.type || transactionType,
      paymentMode: defaultValues?.paymentMode || paymentModes[0],
      notes: defaultValues?.notes || ""
      // No need to specify userId, it will be set on the server
    },
  });

  // Transaction creation mutation
  const mutation = useMutation({
    mutationFn: (data: TransactionFormValues) => apiRequest('POST', '/api/transactions', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/transactions'] });
      queryClient.invalidateQueries({ queryKey: ['/api/dashboard'] });
      toast({
        title: "Success",
        description: `${transactionType === "income" ? "Income" : "Expense"} added successfully`,
      });
      form.reset();
      if (onSuccess) onSuccess();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to add ${transactionType === "income" ? "income" : "expense"}. Please try again.`,
        variant: "destructive",
      });
      console.error("Error adding transaction:", error);
    },
  });

  // Handle form submission
  function onSubmit(data: TransactionFormValues) {
    mutation.mutate({
      ...data,
      type: transactionType,
      date: new Date(data.date).toISOString(),
    });
  }

  // Update category field when transaction type changes
  const handleTypeChange = (value: "income" | "expense") => {
    setTransactionType(value);
    form.setValue("type", value);
    // Reset category to first option of new type
    form.setValue("category", value === "income" ? incomeCategories[0] : expenseCategories[0]);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Transaction Type (if mode is 'both') */}
        {mode === "both" && (
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Transaction Type</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={(value) => handleTypeChange(value as "income" | "expense")}
                    defaultValue={transactionType}
                    className="flex space-x-2"
                  >
                    <FormItem className="flex items-center space-x-1 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="income" id="income" />
                      </FormControl>
                      <FormLabel htmlFor="income" className="font-normal cursor-pointer">Income</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-1 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="expense" id="expense" />
                      </FormControl>
                      <FormLabel htmlFor="expense" className="font-normal cursor-pointer">Expense</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {/* Description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Enter a description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Amount */}
        <FormField
          control={form.control}
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

        {/* Date */}
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className="w-full pl-3 text-left font-normal"
                    >
                      {field.value ? (
                        format(new Date(field.value), "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value ? new Date(field.value) : undefined}
                    onSelect={(date) => field.onChange(date ? date.toISOString().split('T')[0] : '')}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Category */}
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {(transactionType === "income" ? incomeCategories : expenseCategories).map((category) => (
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

        {/* Payment Mode */}
        <FormField
          control={form.control}
          name="paymentMode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Payment Method</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a payment method" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {paymentModes.map((mode) => (
                    <SelectItem key={mode} value={mode}>
                      {mode}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Notes */}
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes (Optional)</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Add any additional notes here" 
                  className="resize-none" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Action Buttons */}
        <div className="flex items-center justify-end space-x-2">
          {onCancel && (
            <Button 
              type="button" 
              variant="outline" 
              onClick={onCancel}
            >
              Cancel
            </Button>
          )}
          <Button 
            type="submit" 
            disabled={mutation.isPending}
          >
            {mutation.isPending ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                Saving...
              </>
            ) : (
              `Save ${transactionType === "income" ? "Income" : "Expense"}`
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}