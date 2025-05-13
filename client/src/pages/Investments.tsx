import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { User } from "@shared/schema";
import InvestmentsList from "@/components/InvestmentsList";
import SipsList from "@/components/SipsList";
import { Separator } from "@/components/ui/separator";
import { CircleArrowUp, Coins } from "lucide-react";

export default function Investments() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("investments");

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
          <h1 className="text-3xl font-bold text-primary mb-2">Investment Portfolio</h1>
          <p className="text-muted-foreground">Manage your investments, SIPs, and track your financial growth</p>
        </div>
      </div>

      <Tabs
        defaultValue="investments"
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList className="grid grid-cols-2 w-full md:w-[400px]">
          <TabsTrigger value="investments" className="flex items-center gap-2">
            <Coins className="h-4 w-4" />
            <span>Investments</span>
          </TabsTrigger>
          <TabsTrigger value="sips" className="flex items-center gap-2">
            <CircleArrowUp className="h-4 w-4" />
            <span>SIPs</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="investments" className="space-y-4">
          {user && <InvestmentsList userId={user.id} />}
        </TabsContent>

        <TabsContent value="sips" className="space-y-4">
          {user && <SipsList userId={user.id} />}
        </TabsContent>
      </Tabs>

      <Separator className="my-8" />

      <div className="bg-muted p-4 rounded-lg text-sm text-muted-foreground">
        <h3 className="font-medium mb-2">Investment Tips</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>Diversify your portfolio across different asset classes to reduce risk.</li>
          <li>Consider starting SIPs to benefit from rupee cost averaging in fluctuating markets.</li>
          <li>Regularly review your investments and rebalance your portfolio as needed.</li>
          <li>Align your investment choices with your financial goals and risk tolerance.</li>
          <li>For long-term investments, focus on the power of compounding rather than short-term market movements.</li>
        </ul>
      </div>
    </div>
  );
}