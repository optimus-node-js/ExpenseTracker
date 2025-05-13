import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { User } from "@shared/schema";
import LoansList from "@/components/LoansList";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { HandCoins, Landmark, ShieldAlert } from "lucide-react";

export default function Loans() {
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
          <h1 className="text-3xl font-bold text-primary mb-2">Loans & Lending</h1>
          <p className="text-muted-foreground">Track money borrowed and lent to friends, family, or institutions</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <HandCoins className="mr-2 h-5 w-5 text-blue-500" />
              Personal Lending
            </CardTitle>
            <CardDescription>
              Track money lent to others
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Keep track of all the money you've lent to friends, family, or colleagues.
              Record details such as borrower's name, amount, date, and expected repayment date.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Landmark className="mr-2 h-5 w-5 text-green-500" />
              Personal Borrowing
            </CardTitle>
            <CardDescription>
              Track money borrowed from others
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Maintain records of money you've borrowed from others, including 
              lender details, amount, date borrowed, and repayment schedule.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <ShieldAlert className="mr-2 h-5 w-5 text-purple-500" />
              Lending Best Practices
            </CardTitle>
            <CardDescription>
              Smart and safe personal finance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Always document loans clearly, set specific repayment terms, 
              and consider your financial position before lending money to others.
            </p>
          </CardContent>
        </Card>
      </div>

      {user && <LoansList userId={user.id} />}

      <Separator className="my-8" />

      <div className="bg-muted p-4 rounded-lg text-sm text-muted-foreground">
        <h3 className="font-medium mb-2">Personal Lending Tips</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>Always document your personal loans, even among friends and family.</li>
          <li>Set clear repayment terms including due dates and any applicable interest.</li>
          <li>Only lend money you can afford to lose in worst-case scenarios.</li>
          <li>Consider the potential impact on relationships before lending significant amounts.</li>
          <li>Regularly follow up on unpaid loans in a respectful manner.</li>
        </ul>
      </div>
    </div>
  );
}