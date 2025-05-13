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
import { Loader2, PlusCircle, Pencil, Trash, Calendar, TrendingUp } from "lucide-react";
import { format } from "date-fns";
import { Sip, Investment } from "@shared/schema";
import SipForm from "./SipForm";
import { Progress } from "@/components/ui/progress";

type SipsListProps = {
  userId: number;
};

export default function SipsList({ userId }: SipsListProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedSip, setSelectedSip] = useState<Sip | null>(null);

  const {
    data: sips = [],
    isLoading,
    error,
  } = useQuery<Sip[]>({
    queryKey: ["/api/sips"],
    refetchOnWindowFocus: false,
  });

  // Also fetch investments to map investment IDs
  const { data: investments = [] } = useQuery<Investment[]>({
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
        Error loading SIPs: {(error as Error).message}
      </div>
    );
  }

  const handleDeleteSip = async (id: number) => {
    try {
      await apiRequest({
        url: `/api/sips/${id}`,
        method: "DELETE",
      });

      toast({
        title: "SIP deleted",
        description: "The SIP has been deleted successfully.",
      });

      // Invalidate SIPs cache to refresh data
      queryClient.invalidateQueries({ queryKey: ["/api/sips"] });
      setIsDeleteDialogOpen(false);
    } catch (error) {
      console.error("Failed to delete SIP:", error);
      toast({
        title: "Error",
        description: "Failed to delete the SIP. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleAddSuccess = () => {
    setIsAddDialogOpen(false);
    queryClient.invalidateQueries({ queryKey: ["/api/sips"] });
  };

  const handleEditSuccess = () => {
    setIsEditDialogOpen(false);
    queryClient.invalidateQueries({ queryKey: ["/api/sips"] });
  };

  // Helper function to format frequency
  const formatFrequency = (frequency: string) => {
    return frequency.charAt(0).toUpperCase() + frequency.slice(1);
  };

  // Helper function to get investment name from ID
  const getInvestmentName = (investmentId: number | null) => {
    if (!investmentId) return null;
    const investment = investments.find(inv => inv.id === investmentId);
    return investment ? investment.name : null;
  };

  // Calculate total monthly SIP amount
  const getTotalMonthlyAmount = () => {
    let totalMonthly = 0;
    
    sips.forEach(sip => {
      const amount = parseFloat(sip.amount);
      if (isNaN(amount)) return;
      
      switch (sip.frequency) {
        case 'daily':
          totalMonthly += amount * 30; // Approximate days in a month
          break;
        case 'weekly':
          totalMonthly += amount * 4.33; // Approximate weeks in a month
          break;
        case 'biweekly':
          totalMonthly += amount * 2.17; // Approximate bi-weeks in a month
          break;
        case 'monthly':
          totalMonthly += amount;
          break;
        case 'quarterly':
          totalMonthly += amount / 3;
          break;
        case 'annually':
          totalMonthly += amount / 12;
          break;
        default:
          break;
      }
    });
    
    return totalMonthly;
  };

  // Calculate returns
  const calculateReturns = (sip: Sip) => {
    if (!sip.currentValue || !sip.totalInvested) return { value: 0, percentage: 0 };
    
    const totalInvested = parseFloat(sip.totalInvested);
    const currentValue = parseFloat(sip.currentValue);
    const returnValue = currentValue - totalInvested;
    const returnPercentage = totalInvested > 0 ? (returnValue / totalInvested) * 100 : 0;
    
    return {
      value: returnValue,
      percentage: returnPercentage
    };
  };

  // Calculate total portfolio value
  const totalInvested = sips.reduce((sum, sip) => {
    return sum + (sip.totalInvested ? parseFloat(sip.totalInvested) : 0);
  }, 0);
  
  const totalCurrentValue = sips.reduce((sum, sip) => {
    return sum + (sip.currentValue ? parseFloat(sip.currentValue) : 0);
  }, 0);
  
  const totalReturns = totalCurrentValue - totalInvested;
  const totalReturnsPercentage = totalInvested > 0 ? (totalReturns / totalInvested) * 100 : 0;
  const totalMonthlyAmount = getTotalMonthlyAmount();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Systematic Investment Plans (SIPs)</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="gap-2">
              <PlusCircle className="h-4 w-4" />
              Add New
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add New SIP</DialogTitle>
              <DialogDescription>
                Add details of your Systematic Investment Plan.
              </DialogDescription>
            </DialogHeader>
            <SipForm 
              userId={userId} 
              onSuccess={handleAddSuccess} 
            />
          </DialogContent>
        </Dialog>
      </div>

      {sips.length > 0 && (
        <Card className="bg-primary/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">SIP Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div className="p-4 bg-background rounded-lg">
                <div className="text-muted-foreground text-sm">Monthly Investment</div>
                <div className="text-2xl font-bold">₹{totalMonthlyAmount.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</div>
              </div>
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
            
            {totalCurrentValue > 0 && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>SIPs Performance</span>
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
            )}
          </CardContent>
        </Card>
      )}

      {sips.length === 0 ? (
        <div className="text-center p-8 bg-muted rounded-lg">
          <p className="text-muted-foreground">No SIPs found.</p>
          <p className="text-muted-foreground">Click "Add New" to create one.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sips.map((sip) => {
            const returns = calculateReturns(sip);
            const returnIsPositive = returns.value >= 0;
            const investmentName = getInvestmentName(sip.investmentId);
            
            return (
              <Card key={sip.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{sip.name}</CardTitle>
                    <Badge variant="secondary" className="capitalize">
                      {formatFrequency(sip.frequency)}
                    </Badge>
                  </div>
                  <CardDescription>
                    <div className="flex flex-col">
                      <span>Amount: ₹{parseFloat(sip.amount).toLocaleString('en-IN')} / {sip.frequency}</span>
                      {investmentName && (
                        <span>Linked to: {investmentName}</span>
                      )}
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 pb-2">
                  {sip.totalInvested && (
                    <div className="text-sm">
                      <span className="font-medium">Total Invested: </span>
                      ₹{parseFloat(sip.totalInvested).toLocaleString('en-IN')}
                    </div>
                  )}
                  
                  {sip.currentValue && (
                    <div className="text-sm">
                      <span className="font-medium">Current Value: </span>
                      ₹{parseFloat(sip.currentValue).toLocaleString('en-IN')}
                    </div>
                  )}
                  
                  {sip.currentValue && sip.totalInvested && (
                    <div className="flex items-center gap-2">
                      <Badge variant={returnIsPositive ? "default" : "destructive"} className="flex gap-1 items-center">
                        {returnIsPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingUp className="h-3 w-3 rotate-180" />}
                        {returnIsPositive ? '+' : ''}
                        {returns.percentage.toFixed(2)}%
                      </Badge>
                      <span className={`text-sm ${returnIsPositive ? 'text-green-500' : 'text-red-500'}`}>
                        {returnIsPositive ? '+' : ''}₹{returns.value.toLocaleString('en-IN')}
                      </span>
                    </div>
                  )}
                  
                  <div className="text-sm flex items-center gap-1">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>Started: {format(new Date(sip.startDate), "PPP")}</span>
                  </div>
                  
                  {sip.endDate && (
                    <div className="text-sm flex items-center gap-1">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>Ends: {format(new Date(sip.endDate), "PPP")}</span>
                    </div>
                  )}
                  
                  {sip.expectedReturn && (
                    <div className="text-sm">
                      <span className="font-medium">Expected Return: </span>
                      {sip.expectedReturn}%
                    </div>
                  )}
                  
                  {sip.notes && (
                    <div className="text-sm">
                      <span className="font-medium">Notes: </span>
                      {sip.notes}
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-end gap-2 pt-2">
                  <Dialog open={isEditDialogOpen && selectedSip?.id === sip.id} onOpenChange={(open) => {
                    setIsEditDialogOpen(open);
                    if (!open) setSelectedSip(null);
                  }}>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setSelectedSip(sip)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px]">
                      <DialogHeader>
                        <DialogTitle>Edit SIP</DialogTitle>
                        <DialogDescription>
                          Update the details of this SIP.
                        </DialogDescription>
                      </DialogHeader>
                      {selectedSip && (
                        <SipForm 
                          userId={userId} 
                          sip={selectedSip} 
                          onSuccess={handleEditSuccess} 
                        />
                      )}
                    </DialogContent>
                  </Dialog>

                  <Dialog open={isDeleteDialogOpen && selectedSip?.id === sip.id} onOpenChange={(open) => {
                    setIsDeleteDialogOpen(open);
                    if (!open) setSelectedSip(null);
                  }}>
                    <DialogTrigger asChild>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => setSelectedSip(sip)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Confirm Deletion</DialogTitle>
                        <DialogDescription>
                          Are you sure you want to delete this SIP? This action cannot be undone.
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
                          onClick={() => selectedSip && handleDeleteSip(selectedSip.id)}
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