import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { format } from "date-fns";
import { CalendarIcon, Check, PlusCircle, X } from "lucide-react";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";

// Transaction schema for the form
const transactionFormSchema = z.object({
  description: z.string().min(2, "Description must be at least 2 characters"),
  amount: z.coerce.number().min(0.01, "Amount must be greater than 0"),
  date: z.string(),
  category: z.string().min(1, "Please select a category"),
  type: z.enum(["income", "expense"]),
  paymentMode: z.string().min(1, "Please select a payment mode"),
  notes: z.string().optional(),
  tags: z.array(z.string()).optional(),
  source: z.string().default("manual"),
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

// Category groups with icons
const expenseCategories = [
  { value: "Food & Dining", icon: "🍽️", color: "bg-orange-500" },
  { value: "Restaurant", icon: "🍲", color: "bg-orange-500" },
  { value: "Cafe & Snacks", icon: "☕", color: "bg-orange-500" },
  { value: "Groceries", icon: "🛒", color: "bg-green-500" },
  { value: "Transportation", icon: "🚗", color: "bg-blue-500" },
  { value: "Fuel", icon: "⛽", color: "bg-blue-500" },
  { value: "Taxi/Cab", icon: "🚕", color: "bg-blue-500" },
  { value: "Public Transport", icon: "🚇", color: "bg-blue-500" },
  { value: "Entertainment", icon: "🎭", color: "bg-purple-500" },
  { value: "Movies", icon: "🎬", color: "bg-purple-500" },
  { value: "Music & Video", icon: "🎵", color: "bg-purple-500" },
  { value: "Games", icon: "🎮", color: "bg-purple-500" },
  { value: "Shopping", icon: "🛍️", color: "bg-pink-500" },
  { value: "Clothing", icon: "👕", color: "bg-pink-500" },
  { value: "Electronics", icon: "📱", color: "bg-pink-500" },
  { value: "Accessories", icon: "👜", color: "bg-pink-500" },
  { value: "Housing", icon: "🏠", color: "bg-yellow-600" },
  { value: "Rent", icon: "🏢", color: "bg-yellow-600" },
  { value: "Mortgage", icon: "🏦", color: "bg-yellow-600" },
  { value: "Maintenance", icon: "🔧", color: "bg-yellow-600" },
  { value: "Utilities", icon: "💡", color: "bg-indigo-500" },
  { value: "Electricity", icon: "⚡", color: "bg-indigo-500" },
  { value: "Water", icon: "💧", color: "bg-indigo-500" },
  { value: "Gas", icon: "🔥", color: "bg-indigo-500" },
  { value: "Internet", icon: "🌐", color: "bg-indigo-500" },
  { value: "Mobile Recharge", icon: "📱", color: "bg-indigo-500" },
  { value: "DTH/Cable", icon: "📺", color: "bg-indigo-500" },
  { value: "Healthcare", icon: "⚕️", color: "bg-red-500" },
  { value: "Medicine", icon: "💊", color: "bg-red-500" },
  { value: "Doctor Visit", icon: "🩺", color: "bg-red-500" },
  { value: "Hospital", icon: "🏥", color: "bg-red-500" },
  { value: "Insurance", icon: "🔰", color: "bg-teal-500" },
  { value: "Health Insurance", icon: "❤️", color: "bg-teal-500" },
  { value: "Car Insurance", icon: "🚙", color: "bg-teal-500" },
  { value: "Life Insurance", icon: "🧬", color: "bg-teal-500" },
  { value: "Education", icon: "📚", color: "bg-amber-500" },
  { value: "Books", icon: "📖", color: "bg-amber-500" },
  { value: "Tuition", icon: "🎓", color: "bg-amber-500" },
  { value: "Courses", icon: "📝", color: "bg-amber-500" },
  { value: "Personal Care", icon: "💆", color: "bg-rose-500" },
  { value: "Haircut", icon: "💇", color: "bg-rose-500" },
  { value: "Spa", icon: "🧖", color: "bg-rose-500" },
  { value: "Cosmetics", icon: "💄", color: "bg-rose-500" },
  { value: "Fitness", icon: "🏋️", color: "bg-rose-500" },
  { value: "Gifts & Donations", icon: "🎁", color: "bg-cyan-500" },
  { value: "Charity", icon: "🤲", color: "bg-cyan-500" },
  { value: "Gifts", icon: "🎀", color: "bg-cyan-500" },
  { value: "Bills & Taxes", icon: "📑", color: "bg-slate-500" },
  { value: "Taxes", icon: "💰", color: "bg-slate-500" },
  { value: "Fines", icon: "🚫", color: "bg-slate-500" },
  { value: "Fees", icon: "💸", color: "bg-slate-500" },
  { value: "Investments", icon: "📊", color: "bg-lime-500" },
  { value: "Stocks", icon: "📈", color: "bg-lime-500" },
  { value: "Mutual Funds", icon: "💼", color: "bg-lime-500" },
  { value: "SIP", icon: "🔄", color: "bg-lime-500" },
  { value: "Travel", icon: "✈️", color: "bg-sky-500" },
  { value: "Vacation", icon: "🏖️", color: "bg-sky-500" },
  { value: "Hotel", icon: "🏨", color: "bg-sky-500" },
  { value: "Flight", icon: "🛫", color: "bg-sky-500" },
  { value: "Train", icon: "🚅", color: "bg-sky-500" },
  { value: "Business", icon: "💼", color: "bg-emerald-500" },
  { value: "Supplies", icon: "📌", color: "bg-emerald-500" },
  { value: "Marketing", icon: "📣", color: "bg-emerald-500" },
  { value: "Services", icon: "🛠️", color: "bg-emerald-500" },
  { value: "Subscriptions", icon: "🔁", color: "bg-fuchsia-500" },
  { value: "Streaming", icon: "📺", color: "bg-fuchsia-500" },
  { value: "Software", icon: "💻", color: "bg-fuchsia-500" },
  { value: "Newspaper", icon: "📰", color: "bg-fuchsia-500" },
  { value: "Other", icon: "❓", color: "bg-gray-500" },
];

const incomeCategories = [
  { value: "Salary", icon: "💵", color: "bg-green-500" },
  { value: "Bonus", icon: "🎉", color: "bg-green-500" },
  { value: "Allowance", icon: "💰", color: "bg-green-500" },
  { value: "Freelancing", icon: "👨‍💻", color: "bg-blue-500" },
  { value: "Consulting", icon: "🤝", color: "bg-blue-500" },
  { value: "Contract Work", icon: "📝", color: "bg-blue-500" },
  { value: "Business", icon: "🏢", color: "bg-purple-500" },
  { value: "Sales", icon: "🛒", color: "bg-purple-500" },
  { value: "Services", icon: "🛠️", color: "bg-purple-500" },
  { value: "Investments", icon: "📊", color: "bg-yellow-500" },
  { value: "Dividends", icon: "💲", color: "bg-yellow-500" },
  { value: "Interest", icon: "🏦", color: "bg-yellow-500" },
  { value: "Capital Gains", icon: "📈", color: "bg-yellow-500" },
  { value: "Rental Income", icon: "🏠", color: "bg-pink-500" },
  { value: "Property", icon: "🏘️", color: "bg-pink-500" },
  { value: "Parking Space", icon: "🅿️", color: "bg-pink-500" },
  { value: "Refunds", icon: "↩️", color: "bg-indigo-500" },
  { value: "Tax Refund", icon: "📑", color: "bg-indigo-500" },
  { value: "Product Return", icon: "📦", color: "bg-indigo-500" },
  { value: "Gifts", icon: "🎁", color: "bg-red-500" },
  { value: "Inheritance", icon: "📜", color: "bg-amber-500" },
  { value: "Pension", icon: "👴", color: "bg-teal-500" },
  { value: "Government Benefits", icon: "🏛️", color: "bg-cyan-500" },
  { value: "Scholarship", icon: "🎓", color: "bg-lime-500" },
  { value: "Lottery", icon: "🎰", color: "bg-rose-500" },
  { value: "Other", icon: "❓", color: "bg-gray-500" },
];

// Tags for common expenses and income
const commonTags = [
  // Food & Dining related
  "Breakfast", "Lunch", "Dinner", "Coffee", "Tea", "Snacks", "Dessert", "Fast Food", "Restaurant", "Takeout",
  // Shopping related
  "Clothes", "Shoes", "Electronics", "Gifts", "Home Decor", "Furniture", "Accessories", 
  // Entertainment
  "Movies", "Concert", "Theatre", "Sports Event", "Subscription", "Books", "Games", "Hobby",
  // Utilities
  "Electricity", "Water", "Gas", "Internet", "Phone Bill", "Cable TV", "Cleaning", "Repair",
  // Transportation
  "Fuel", "Parking", "Toll", "Ticket", "Car Maintenance", "Public Transport", "Car Wash", "Ride Share",
  // Personal
  "Haircut", "Spa", "Gym", "Medical", "Dental", "Pharmacy", "Beauty Products", "Cosmetics",
  // Work
  "Office Supplies", "Client Meeting", "Networking", "Business Trip", "Training", "Software",
  // Others
  "Charity", "Loan", "EMI", "Rent", "Grocery", "Festival", "Wedding", "Birthday", "Anniversary",
  // Income
  "Salary", "Bonus", "Freelance", "Investment", "Dividend", "Interest", "Refund", "Side Income"
];

interface EnhancedTransactionFormProps {
  onSuccess?: () => void;
  defaultValues?: Partial<TransactionFormValues>;
  mode?: "income" | "expense" | "both";
  onCancel?: () => void;
}

export function EnhancedTransactionFormNew({ 
  onSuccess, 
  defaultValues, 
  mode = "both",
  onCancel
}: EnhancedTransactionFormProps) {
  const [transactionType, setTransactionType] = useState<"income" | "expense">(
    defaultValues?.type || (mode === "income" ? "income" : "expense")
  );
  const [currentCategories, setCurrentCategories] = useState(
    transactionType === "income" ? incomeCategories : expenseCategories
  );
  const [selectedTags, setSelectedTags] = useState<string[]>(defaultValues?.tags || []);
  const [tagInput, setTagInput] = useState("");
  const [customCategory, setCustomCategory] = useState("");
  const [showCustomCategory, setShowCustomCategory] = useState(false);
  
  const { toast } = useToast();
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
        (transactionType === "income" ? incomeCategories[0].value : expenseCategories[0].value),
      type: defaultValues?.type || transactionType,
      paymentMode: defaultValues?.paymentMode || paymentModes[0],
      notes: defaultValues?.notes || "",
      tags: defaultValues?.tags || [],
      source: "manual"
    },
  });

  // Filtered categories based on search
  const [filteredCategories, setFilteredCategories] = useState(currentCategories);

  // Effect to update categories when transaction type changes
  useEffect(() => {
    setCurrentCategories(transactionType === "income" ? incomeCategories : expenseCategories);
    setFilteredCategories(transactionType === "income" ? incomeCategories : expenseCategories);
  }, [transactionType]);
  
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
      setSelectedTags([]);
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
    // If using custom category, replace the category value
    const finalData = {
      ...data,
      type: transactionType,
      date: new Date(data.date).toISOString(),
      tags: selectedTags,
      category: showCustomCategory && customCategory ? customCategory : data.category
    };
    
    mutation.mutate(finalData);
  }

  // Update category field when transaction type changes
  const handleTypeChange = (value: "income" | "expense") => {
    setTransactionType(value);
    form.setValue("type", value);
    // Reset category to first option of new type
    const newCategories = value === "income" ? incomeCategories : expenseCategories;
    form.setValue("category", newCategories[0].value);
  };

  // Filter categories when searching
  const handleCategorySearch = (value: string) => {
    if (!value) {
      setFilteredCategories(currentCategories);
      setShowCustomCategory(false);
      return;
    }

    const filtered = currentCategories.filter(cat => 
      cat.value.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredCategories(filtered);
    
    // If no exact match, show option to add custom category
    const exactMatch = currentCategories.some(cat => 
      cat.value.toLowerCase() === value.toLowerCase()
    );
    setShowCustomCategory(!exactMatch);
    setCustomCategory(value);
  };

  // Handle tag input
  const handleTagInput = (value: string) => {
    setTagInput(value);
  };

  // Add a tag
  const addTag = (tag: string) => {
    if (tag && !selectedTags.includes(tag) && selectedTags.length < 10) {
      setSelectedTags([...selectedTags, tag]);
      setTagInput("");
    }
  };

  // Remove a tag
  const removeTag = (tag: string) => {
    setSelectedTags(selectedTags.filter(t => t !== tag));
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
                    className="flex flex-wrap gap-3"
                  >
                    <FormItem className="flex items-center space-x-1 space-y-0 rounded-md border border-border/50 px-3 py-2 hover:bg-accent/30">
                      <FormControl>
                        <RadioGroupItem value="income" id="income" />
                      </FormControl>
                      <FormLabel htmlFor="income" className="font-normal cursor-pointer pl-2">Income</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-1 space-y-0 rounded-md border border-border/50 px-3 py-2 hover:bg-accent/30">
                      <FormControl>
                        <RadioGroupItem value="expense" id="expense" />
                      </FormControl>
                      <FormLabel htmlFor="expense" className="font-normal cursor-pointer pl-2">Expense</FormLabel>
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
                <Input placeholder="What was this transaction for?" {...field} />
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
                <div className="relative">
                  <span className="absolute left-3 top-2.5">₹</span>
                  <Input
                    type="number"
                    placeholder="0.00"
                    min={0}
                    step="0.01"
                    className="pl-8"
                    {...field}
                  />
                </div>
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
                      className={`w-full pl-3 text-left font-normal ${!field.value ? "text-muted-foreground" : ""}`}
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
                    onSelect={(date) => field.onChange(date ? date.toISOString().split('T')[0] : "")}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Category with search and icons */}
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Category</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={`w-full justify-between ${!field.value ? "text-muted-foreground" : ""}`}
                    >
                      {field.value ? (
                        <div className="flex items-center">
                          <span className="mr-2">
                            {(currentCategories.find(cat => cat.value === field.value) || { icon: "❓" }).icon}
                          </span>
                          {field.value}
                        </div>
                      ) : (
                        "Select category"
                      )}
                      <CalendarIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[300px] p-0">
                  <Command>
                    <CommandInput 
                      placeholder="Search category..." 
                      onValueChange={handleCategorySearch}
                    />
                    <CommandList>
                      <CommandEmpty>
                        No category found
                        {showCustomCategory && (
                          <CommandItem
                            className="flex items-center mt-2 px-2 py-2 bg-accent/30 rounded"
                            onSelect={() => {
                              field.onChange(customCategory);
                              // If this is a new category, add it to the list
                              if (!currentCategories.some(cat => cat.value === customCategory)) {
                                const newCategory = {
                                  value: customCategory,
                                  icon: "➕",
                                  color: "bg-gray-500"
                                };
                                // Update current categories (for temporary use)
                                setCurrentCategories([...currentCategories, newCategory]);
                              }
                            }}
                          >
                            <PlusCircle className="mr-2 h-4 w-4" />
                            <span>Add "{customCategory}"</span>
                          </CommandItem>
                        )}
                      </CommandEmpty>
                      <CommandGroup className="max-h-[300px] overflow-y-auto">
                        {filteredCategories.map((category) => (
                          <CommandItem
                            key={category.value}
                            value={category.value}
                            onSelect={() => {
                              field.onChange(category.value);
                            }}
                            className={`flex items-center ${field.value === category.value ? 'bg-accent' : ''}`}
                          >
                            <div className={`flex items-center ${field.value === category.value ? "font-medium" : ""}`}>
                              <span className="mr-2">{category.icon}</span>
                              {category.value}
                            </div>
                            {field.value === category.value && (
                              <Check className="ml-auto h-4 w-4" />
                            )}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
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
              <FormLabel>Payment Mode</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select payment mode" />
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

        {/* Tags */}
        <div className="space-y-2">
          <Label htmlFor="tags">Tags (Optional)</Label>
          <div className="flex flex-wrap gap-2 mb-2">
            {selectedTags.map(tag => (
              <Badge 
                key={tag} 
                variant="secondary"
                className="text-sm py-1 px-2 flex items-center gap-1"
              >
                {tag}
                <X 
                  className="h-3 w-3 cursor-pointer opacity-70 hover:opacity-100" 
                  onClick={() => removeTag(tag)}
                />
              </Badge>
            ))}
          </div>
          
          <div className="flex">
            <Input
              id="tagInput"
              value={tagInput}
              onChange={(e) => handleTagInput(e.target.value)}
              placeholder="Add tags (e.g., breakfast, bills)"
              className="flex-1"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && tagInput) {
                  e.preventDefault();
                  addTag(tagInput);
                }
              }}
            />
            <Button 
              type="button" 
              variant="secondary" 
              className="ml-2"
              onClick={() => tagInput && addTag(tagInput)}
            >
              Add
            </Button>
          </div>
          
          <div className="flex flex-wrap gap-1 mt-2">
            {commonTags
              .filter(tag => !selectedTags.includes(tag))
              .slice(0, 12)
              .map(tag => (
                <Badge 
                  key={tag} 
                  variant="outline"
                  className="cursor-pointer hover:bg-accent"
                  onClick={() => addTag(tag)}
                >
                  {tag}
                </Badge>
              ))}
          </div>
        </div>

        {/* Notes */}
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes (Optional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Add any additional details about this transaction..."
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