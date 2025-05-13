import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
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
import { Textarea } from "@/components/ui/textarea";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { apiRequest } from "@/lib/queryClient";
import { Investment } from "@shared/schema";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

// Schema for investment form validation
const investmentSchema = z.object({
  name: z.string().min(1, "Name is required"),
  type: z.string().min(1, "Type is required"),
  amount: z.string()
    .refine((val) => !isNaN(Number(val)), {
      message: "Amount must be a valid number",
    })
    .refine((val) => Number(val) > 0, {
      message: "Amount must be greater than zero",
    }),
  startDate: z.date(),
  endDate: z.date().nullable().optional(),
  purchasePrice: z.string().optional().nullable(),
  currentValue: z.string().optional().nullable(),
  units: z.string().optional().nullable(),
  expectedReturn: z.string().optional().nullable(),
  notes: z.string().nullable().optional(),
});

type InvestmentFormValues = z.infer<typeof investmentSchema>;

type InvestmentFormProps = {
  userId: number;
  investment?: Investment;
  onSuccess?: () => void;
};

export default function InvestmentForm({ userId, investment, onSuccess }: InvestmentFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEditing = !!investment;

  const form = useForm<InvestmentFormValues>({
    resolver: zodResolver(investmentSchema),
    defaultValues: {
      name: investment?.name || "",
      type: investment?.type || "",
      amount: investment?.amount || "",
      startDate: investment?.startDate ? new Date(investment.startDate) : new Date(),
      endDate: investment?.endDate ? new Date(investment.endDate) : null,
      purchasePrice: investment?.purchasePrice || null,
      currentValue: investment?.currentValue || null,
      units: investment?.units || null,
      expectedReturn: investment?.expectedReturn || null,
      notes: investment?.notes || "",
    },
  });

  // Watch the investment type to conditionally show fields
  const investmentType = form.watch("type");

  async function onSubmit(values: InvestmentFormValues) {
    setIsSubmitting(true);
    try {
      if (isEditing && investment) {
        await apiRequest({
          url: `/api/investments/${investment.id}`,
          method: "PATCH",
          data: {
            ...values,
            userId,
          },
        });

        toast({
          title: "Investment updated",
          description: "The investment has been updated successfully.",
        });
      } else {
        await apiRequest({
          url: "/api/investments",
          method: "POST",
          data: {
            ...values,
            userId,
          },
        });

        toast({
          title: "Investment added",
          description: "The investment has been added successfully.",
        });
      }

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("Failed to save investment:", error);
      toast({
        title: "Error",
        description: `Failed to ${isEditing ? "update" : "add"} investment. Please try again.`,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter investment name" {...field} />
              </FormControl>
              <FormDescription>
                E.g., HDFC Bank Shares, Gold ETF, PPF
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select investment type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="stocks">Stocks</SelectItem>
                  <SelectItem value="mutual_funds">Mutual Funds</SelectItem>
                  <SelectItem value="etf">ETF</SelectItem>
                  <SelectItem value="gold">Gold</SelectItem>
                  <SelectItem value="real_estate">Real Estate</SelectItem>
                  <SelectItem value="fixed_deposit">Fixed Deposit</SelectItem>
                  <SelectItem value="ppf">PPF</SelectItem>
                  <SelectItem value="nps">NPS</SelectItem>
                  <SelectItem value="crypto">Cryptocurrency</SelectItem>
                  <SelectItem value="bonds">Bonds</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount Invested (₹)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter amount"
                    {...field}
                    type="number"
                    min="0"
                    step="0.01"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {(investmentType === "stocks" || investmentType === "mutual_funds" || investmentType === "etf") && (
            <FormField
              control={form.control}
              name="units"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Units</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter number of units"
                      {...field}
                      value={field.value || ""}
                      type="number"
                      min="0"
                      step="0.0001"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {(investmentType === "stocks" || investmentType === "mutual_funds" || investmentType === "etf" || investmentType === "crypto") && (
            <FormField
              control={form.control}
              name="purchasePrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Purchase Price (Per Unit)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter purchase price"
                      {...field}
                      value={field.value || ""}
                      type="number"
                      min="0"
                      step="0.01"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="currentValue"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current Value (₹)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter current value"
                    {...field}
                    value={field.value || ""}
                    type="number"
                    min="0"
                    step="0.01"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Start Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
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
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>End Date (Optional)</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
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
                      selected={field.value || undefined}
                      onSelect={field.onChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  For investments with maturity dates
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="expectedReturn"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Expected Return % (Optional)</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter expected return percentage"
                  {...field}
                  value={field.value || ""}
                  type="number"
                  min="0"
                  step="0.01"
                />
              </FormControl>
              <FormDescription>
                Expected annual return percentage for this investment
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes (Optional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Add any additional notes"
                  className="resize-none"
                  {...field}
                  value={field.value || ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : isEditing ? "Update Investment" : "Add Investment"}
        </Button>
      </form>
    </Form>
  );
}