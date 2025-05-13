import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { User } from "@shared/schema";
import IncomeSourcesList from "@/components/IncomeSourcesList";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Calculator, CircleDollarSign, TrendingUp } from "lucide-react";

export default function Income() {
  const { toast } = useToast();

  // Fetch user profile for user ID
  const { data: user, isLoading: isLoadingUser } = useQuery<User>({
    queryKey: ['/api/user/profile'],
    enabled: true,
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to load user profile. Please refresh the page.",
        variant: "destructive",
      });
      console.error("Error fetching user profile:", error);
    },
  });

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-primary mb-2">Income Management</h1>
          <p className="text-muted-foreground">Track and analyze your income sources</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <CircleDollarSign className="mr-2 h-5 w-5 text-blue-500" />
              Income Sources
            </CardTitle>
            <CardDescription>
              Track all your income streams
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Add and manage all your income sources including salary, 
              freelancing, business income, and passive income streams.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <TrendingUp className="mr-2 h-5 w-5 text-green-500" />
              Income Growth
            </CardTitle>
            <CardDescription>
              Track your year-over-year growth
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Visualize how your income grows over time across different 
              sources and identify opportunities for increasing your earning potential.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Calculator className="mr-2 h-5 w-5 text-purple-500" />
              Income Analysis
            </CardTitle>
            <CardDescription>
              Analyze your income patterns
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Get detailed insights on your income distribution, identify 
              seasonal patterns, and make informed decisions to optimize your income.
            </p>
          </CardContent>
        </Card>
      </div>

      {user && <IncomeSourcesList userId={user.id} />}

      <Separator className="my-8" />

      <div className="bg-muted p-4 rounded-lg text-sm text-muted-foreground">
        <h3 className="font-medium mb-2">Income Management Tips</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>Diversify your income sources to create financial stability.</li>
          <li>Regularly track and review all income streams to identify growth opportunities.</li>
          <li>Consider developing passive income sources that generate money with minimal ongoing effort.</li>
          <li>Reinvest a portion of your income into assets that can generate additional income.</li>
          <li>Track seasonal variations in income to better plan for leaner periods.</li>
        </ul>
      </div>
    </div>
  );
}