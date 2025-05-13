import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { apiRequest } from "@/lib/queryClient";
import { Loader2, PlusCircle, Pencil, Trash, TrendingUp, BarChart3 } from "lucide-react";
import { format } from "date-fns";
import { Investment } from "@shared/schema";
import InvestmentForm from "./InvestmentForm";
import { Progress } from "@/components/ui/progress";

type InvestmentsListProps = {
  userId: number;
};

export default function InvestmentsList({ userId }: InvestmentsListProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedInvestment, setSelectedInvestment] = useState<Investment | null>(null);

  const {
    data: investments = [],
    isLoading,
    error,
  } = useQuery<Investment[]>({
    queryKey: ["/api/investments"],
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-4 text-destructive">
        Error loading investments: {(error as Error).message}
      </div>
    );
  }

  const handleDeleteInvestment = async (id: number) => {
    try {
      await apiRequest({
        url: `/api/investments/${id}`,
        method: "DELETE",
      });

      toast({
        title: "Investment deleted",
        description: "The investment has been deleted successfully.",
      });

      // Invalidate investments cache to refresh data
      queryClient.invalidateQueries({ queryKey: ["/api/investments"] });
      setIsDeleteDialogOpen(false);
    } catch (error) {
      console.error("Failed to delete investment:", error);
      toast({
        title: "Error",
        description: "Failed to delete the investment. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleAddSuccess = () => {
    setIsAddDialogOpen(false);
    queryClient.invalidateQueries({ queryKey: ["/api/investments"] });
  };

  const handleEditSuccess = () => {
    setIsEditDialogOpen(false);
    queryClient.invalidateQueries({ queryKey: ["/api/investments"] });
  };

  // Helper function to get investment type badge style
  const getInvestmentTypeBadge = (type: string) => {
    switch (type.toLowerCase()) {
      case 'stocks':
        return { color: "bg-blue-500", label: "Stocks" };
      case 'mutual_funds':
        return { color: "bg-purple-500", label: "Mutual Funds" };
      case 'etf':
        return { color: "bg-indigo-500", label: "ETF" };
      case 'gold':
        return { color: "bg-amber-500", label: "Gold" };
      case 'real_estate':
        return { color: "bg-green-600", label: "Real Estate" };
      case 'fixed_deposit':
        return { color: "bg-cyan-500", label: "Fixed Deposit" };
      case 'ppf':
        return { color: "bg-blue-400", label: "PPF" };
      case 'nps':
        return { color: "bg-blue-600", label: "NPS" };
      case 'crypto':
        return { color: "bg-orange-500", label: "Crypto" };
      case 'bonds':
        return { color: "bg-teal-500", label: "Bonds" };
      default:
        return { color: "bg-gray-500", label: type.replace('_', ' ') };
    }
  };

  // Calculate returns
  const calculateReturns = (investment: Investment) => {
    if (!investment.currentValue || !investment.amount) return { value: 0, percentage: 0 };
    
    const initialAmount = parseFloat(investment.amount);
    const currentValue = parseFloat(investment.currentValue);
    const returnValue = currentValue - initialAmount;
    const returnPercentage = initialAmount > 0 ? (returnValue / initialAmount) * 100 : 0;
    
    return {
      value: returnValue,
      percentage: returnPercentage
    };
  };

  // Calculate total portfolio value
  const totalInvested = investments.reduce((sum, inv) => sum + parseFloat(inv.amount), 0);
  const totalCurrentValue = investments.reduce((sum, inv) => {
    const currentValue = inv.currentValue ? parseFloat(inv.currentValue) : parseFloat(inv.amount);
    return sum + currentValue;
  }, 0);
  const totalReturns = totalCurrentValue - totalInvested;
  const totalReturnsPercentage = totalInvested > 0 ? (totalReturns / totalInvested) * 100 : 0;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Investments</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="gap-2">
              <PlusCircle className="h-4 w-4" />
              Add New
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add New Investment</DialogTitle>
              <DialogDescription>
                Add details of your investment.
              </DialogDescription>
            </DialogHeader>
            <InvestmentForm 
              userId={userId} 
              onSuccess={handleAddSuccess} 
            />
          </DialogContent>
        </Dialog>
      </div>

      {investments.length > 0 && (
        <Card className="bg-primary/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Investment Portfolio Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="p-4 bg-background rounded-lg">
                <div className="text-muted-foreground text-sm">Total Invested</div>
                <div className="text-2xl font-bold">₹{totalInvested.toLocaleString('en-IN')}</div>
              </div>
              <div className="p-4 bg-background rounded-lg">
                <div className="text-muted-foreground text-sm">Current Value</div>
                <div className="text-2xl font-bold">₹{totalCurrentValue.toLocaleString('en-IN')}</div>
              </div>
              <div className="p-4 bg-background rounded-lg">
                <div className="text-muted-foreground text-sm">Total Returns</div>
                <div className={`text-2xl font-bold ${totalReturns >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {totalReturns >= 0 ? '+' : ''}₹{totalReturns.toLocaleString('en-IN')} 
                  <span className="text-sm font-normal">
                    ({totalReturns >= 0 ? '+' : ''}{totalReturnsPercentage.toFixed(2)}%)
                  </span>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Portfolio Performance</span>
                <span className={totalReturns >= 0 ? 'text-green-500' : 'text-red-500'}>
                  {totalReturnsPercentage.toFixed(2)}%
                </span>
              </div>
              <Progress 
                value={50 + (totalReturnsPercentage > 100 ? 100 : totalReturnsPercentage / 2)}
                className={`h-2 ${totalReturns >= 0 ? 'bg-green-200' : 'bg-red-200'}`}
                indicatorClassName={totalReturns >= 0 ? 'bg-green-500' : 'bg-red-500'}
              />
            </div>
          </CardContent>
        </Card>
      )}

      {investments.length === 0 ? (
        <div className="text-center p-8 bg-muted rounded-lg">
          <p className="text-muted-foreground">No investments found.</p>
          <p className="text-muted-foreground">Click "Add New" to create one.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {investments.map((investment) => {
            const returns = calculateReturns(investment);
            const returnIsPositive = returns.value >= 0;
            const badge = getInvestmentTypeBadge(investment.type);
            
            return (
              <Card key={investment.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{investment.name}</CardTitle>
                    <Badge className={badge.color}>
                      {badge.label}
                    </Badge>
                  </div>
                  <CardDescription>
                    <div className="flex flex-col">
                      <span>Invested: ₹{parseFloat(investment.amount).toLocaleString('en-IN')}</span>
                      {investment.currentValue && (
                        <span>Current Value: ₹{parseFloat(investment.currentValue).toLocaleString('en-IN')}</span>
                      )}
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 pb-2">
                  {investment.currentValue && (
                    <div className="flex items-center gap-2">
                      <Badge variant={returnIsPositive ? "default" : "destructive"} className="flex gap-1 items-center">
                        {returnIsPositive ? <TrendingUp className="h-3 w-3" /> : <BarChart3 className="h-3 w-3" />}
                        {returnIsPositive ? '+' : ''}
                        {returns.percentage.toFixed(2)}%
                      </Badge>
                      <span className={`text-sm ${returnIsPositive ? 'text-green-500' : 'text-red-500'}`}>
                        {returnIsPositive ? '+' : ''}₹{returns.value.toLocaleString('en-IN')}
                      </span>
                    </div>
                  )}
                  
                  <div className="text-sm">
                    <span className="font-medium">Start Date: </span>
                    {format(new Date(investment.startDate), "PPP")}
                  </div>
                  
                  {investment.endDate && (
                    <div className="text-sm">
                      <span className="font-medium">End/Maturity Date: </span>
                      {format(new Date(investment.endDate), "PPP")}
                    </div>
                  )}
                  
                  {investment.units && (
                    <div className="text-sm">
                      <span className="font-medium">Units: </span>
                      {investment.units}
                    </div>
                  )}
                  
                  {investment.expectedReturn && (
                    <div className="text-sm">
                      <span className="font-medium">Expected Return: </span>
                      {investment.expectedReturn}%
                    </div>
                  )}
                  
                  {investment.notes && (
                    <div className="text-sm">
                      <span className="font-medium">Notes: </span>
                      {investment.notes}
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-end gap-2 pt-2">
                  <Dialog open={isEditDialogOpen && selectedInvestment?.id === investment.id} onOpenChange={(open) => {
                    setIsEditDialogOpen(open);
                    if (!open) setSelectedInvestment(null);
                  }}>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setSelectedInvestment(investment)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px]">
                      <DialogHeader>
                        <DialogTitle>Edit Investment</DialogTitle>
                        <DialogDescription>
                          Update the details of this investment.
                        </DialogDescription>
                      </DialogHeader>
                      {selectedInvestment && (
                        <InvestmentForm 
                          userId={userId} 
                          investment={selectedInvestment} 
                          onSuccess={handleEditSuccess} 
                        />
                      )}
                    </DialogContent>
                  </Dialog>

                  <Dialog open={isDeleteDialogOpen && selectedInvestment?.id === investment.id} onOpenChange={(open) => {
                    setIsDeleteDialogOpen(open);
                    if (!open) setSelectedInvestment(null);
                  }}>
                    <DialogTrigger asChild>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => setSelectedInvestment(investment)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Confirm Deletion</DialogTitle>
                        <DialogDescription>
                          Are you sure you want to delete this investment? This action cannot be undone.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <Button 
                          variant="ghost" 
                          onClick={() => setIsDeleteDialogOpen(false)}
                        >
                          Cancel
                        </Button>
                        <Button 
                          variant="destructive" 
                          onClick={() => selectedInvestment && handleDeleteInvestment(selectedInvestment.id)}
                        >
                          Delete
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}