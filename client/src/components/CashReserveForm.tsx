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
import { useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { User } from "@shared/schema";

// Schema for cash reserve form validation
const cashReserveSchema = z.object({
  amount: z.string()
    .refine((val) => !isNaN(Number(val)), {
      message: "Cash reserve must be a valid number",
    })
    .refine((val) => Number(val) >= 0, {
      message: "Cash reserve must be a positive number",
    }),
});

type CashReserveFormProps = {
  user: User;
  onSuccess?: () => void;
};

export default function CashReserveForm({ user, onSuccess }: CashReserveFormProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof cashReserveSchema>>({
    resolver: zodResolver(cashReserveSchema),
    defaultValues: {
      amount: user.cashReserve || "0",
    },
  });

  async function onSubmit(values: z.infer<typeof cashReserveSchema>) {
    try {
      await apiRequest({
        url: "/api/user/cash-reserve",
        method: "POST",
        data: { amount: Number(values.amount) },
      });

      toast({
        title: "Cash reserve updated",
        description: "Your cash reserve has been updated successfully.",
      });

      // Invalidate user profile cache to refresh data
      queryClient.invalidateQueries({ queryKey: ["/api/user/profile"] });

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("Failed to update cash reserve:", error);
      toast({
        title: "Error",
        description: "Failed to update cash reserve. Please try again.",
        variant: "destructive",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cash Reserve (₹)</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your current cash reserve"
                  {...field}
                  type="number"
                  min="0"
                  step="0.01"
                />
              </FormControl>
              <FormDescription>
                This is the amount of cash you have on hand, not in bank accounts.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Update Cash Reserve
        </Button>
      </form>
    </Form>
  );
}