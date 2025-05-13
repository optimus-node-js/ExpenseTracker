import { useState, useEffect } from "react";
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
import { CalendarIcon, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { apiRequest } from "@/lib/queryClient";
import { Sip, Investment } from "@shared/schema";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";

// Schema for SIP form validation
const sipSchema = z.object({
  name: z.string().min(1, "Name is required"),
  amount: z.string()
    .refine((val) => !isNaN(Number(val)), {
      message: "Amount must be a valid number",
    })
    .refine((val) => Number(val) > 0, {
      message: "Amount must be greater than zero",
    }),
  startDate: z.date(),
  endDate: z.date().nullable().optional(),
  frequency: z.string().min(1, "Frequency is required"),
  investmentId: z.number().nullable().optional(),
  currentValue: z.string().optional().nullable(),
  expectedReturn: z.string().optional().nullable(),
  totalInvested: z.string().optional().nullable(),
  notes: z.string().nullable().optional(),
});

type SipFormValues = z.infer<typeof sipSchema>;

type SipFormProps = {
  userId: number;
  sip?: Sip;
  onSuccess?: () => void;
};

export default function SipForm({ userId, sip, onSuccess }: SipFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEditing = !!sip;

  // Fetch investments for dropdown
  const { data: investments = [], isLoading: isLoadingInvestments } = useQuery<Investment[]>({
    queryKey: ["/api/investments"],
    refetchOnWindowFocus: false,
  });

  const form = useForm<SipFormValues>({
    resolver: zodResolver(sipSchema),
    defaultValues: {
      name: sip?.name || "",
      amount: sip?.amount || "",
      startDate: sip?.startDate ? new Date(sip.startDate) : new Date(),
      endDate: sip?.endDate ? new Date(sip.endDate) : null,
      frequency: sip?.frequency || "monthly",
      investmentId: sip?.investmentId || null,
      currentValue: sip?.currentValue || null,
      expectedReturn: sip?.expectedReturn || null,
      totalInvested: sip?.totalInvested || null,
      notes: sip?.notes || "",
    },
  });

  // Set total invested value when amount or dates change
  useEffect(() => {
    const startDate = form.watch("startDate");
    const amount = form.watch("amount");
    const frequency = form.watch("frequency");
    
    if (startDate && amount && frequency) {
      try {
        const amountValue = parseFloat(amount);
        
        // Get months since start date
        const now = new Date();
        const start = new Date(startDate);
        const diffInMonths = (now.getFullYear() - start.getFullYear()) * 12 + 
                            (now.getMonth() - start.getMonth());
        
        let multiplier = 0;
        switch (frequency) {
          case "daily":
            // Approximate number of days
            multiplier = Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
            break;
          case "weekly":
            multiplier = Math.floor(diffInMonths * 4.33); // Approximate weeks in a month
            break;
          case "biweekly":
            multiplier = Math.floor(diffInMonths * 2.16); // Approximate bi-weeks in a month
            break;
          case "monthly":
            multiplier = diffInMonths;
            break;
          case "quarterly":
            multiplier = Math.floor(diffInMonths / 3);
            break;
          case "annually":
            multiplier = Math.floor(diffInMonths / 12);
            break;
          default:
            multiplier = 0;
        }
        
        // Calculate total invested
        if (multiplier > 0) {
          const totalInvested = (amountValue * multiplier).toFixed(2);
          form.setValue("totalInvested", totalInvested);
        }
      } catch (e) {
        console.error("Error calculating total invested:", e);
      }
    }
  }, [form.watch("startDate"), form.watch("amount"), form.watch("frequency")]);

  async function onSubmit(values: SipFormValues) {
    setIsSubmitting(true);
    try {
      if (isEditing && sip) {
        await apiRequest({
          url: `/api/sips/${sip.id}`,
          method: "PATCH",
          data: {
            ...values,
            userId,
          },
        });

        toast({
          title: "SIP updated",
          description: "The SIP has been updated successfully.",
        });
      } else {
        await apiRequest({
          url: "/api/sips",
          method: "POST",
          data: {
            ...values,
            userId,
          },
        });

        toast({
          title: "SIP added",
          description: "The SIP has been added successfully.",
        });
      }

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("Failed to save SIP:", error);
      toast({
        title: "Error",
        description: `Failed to ${isEditing ? "update" : "add"} SIP. Please try again.`,
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
              <FormLabel>SIP Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter SIP name" {...field} />
              </FormControl>
              <FormDescription>
                E.g., HDFC Mid-Cap SIP, Axis Bluechip SIP
              </FormDescription>
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
                <FormLabel>SIP Amount (₹)</FormLabel>
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

          <FormField
            control={form.control}
            name="frequency"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Frequency</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="biweekly">Bi-weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="quarterly">Quarterly</SelectItem>
                    <SelectItem value="annually">Annually</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="investmentId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Associated Investment (Optional)</FormLabel>
              <Select
                onValueChange={(value) => field.onChange(value ? parseInt(value) : null)}
                value={field.value?.toString() || ""}
              >
                <FormControl>
                  <SelectTrigger>
                    {isLoadingInvestments ? (
                      <div className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Loading investments...</span>
                      </div>
                    ) : (
                      <SelectValue placeholder="Select an investment" />
                    )}
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="">None</SelectItem>
                  {investments.map((investment) => (
                    <SelectItem key={investment.id} value={investment.id.toString()}>
                      {investment.name} - {investment.type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Link this SIP to an existing investment
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

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
                  Leave empty for ongoing SIPs
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="totalInvested"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Total Invested (Calculated/Actual)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Total amount invested so far"
                    {...field}
                    value={field.value || ""}
                    type="number"
                    min="0"
                    step="0.01"
                  />
                </FormControl>
                <FormDescription>
                  Auto-calculated based on start date and frequency
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

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
                Expected annual return percentage for this SIP
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
          {isSubmitting ? "Saving..." : isEditing ? "Update SIP" : "Add SIP"}
        </Button>
      </form>
    </Form>
  );
}