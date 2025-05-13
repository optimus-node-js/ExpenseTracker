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
import { Loader2, PlusCircle, Pencil, Trash, TrendingUp } from "lucide-react";
import { format } from "date-fns";
import { IncomeSource } from "@shared/schema";
import IncomeSourceForm from "./IncomeSourceForm";

type IncomeSourcesListProps = {
  userId: number;
};

export default function IncomeSourcesList({ userId }: IncomeSourcesListProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedIncomeSource, setSelectedIncomeSource] = useState<IncomeSource | null>(null);

  const {
    data: incomeSources = [],
    isLoading,
    error,
  } = useQuery<IncomeSource[]>({
    queryKey: ["/api/income-sources"],
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
        Error loading income sources: {(error as Error).message}
      </div>
    );
  }

  const handleDeleteIncomeSource = async (id: number) => {
    try {
      await apiRequest({
        url: `/api/income-sources/${id}`,
        method: "DELETE",
      });

      toast({
        title: "Income source deleted",
        description: "The income source has been deleted successfully.",
      });

      // Invalidate income sources cache to refresh data
      queryClient.invalidateQueries({ queryKey: ["/api/income-sources"] });
      setIsDeleteDialogOpen(false);
    } catch (error) {
      console.error("Failed to delete income source:", error);
      toast({
        title: "Error",
        description: "Failed to delete the income source. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleAddSuccess = () => {
    setIsAddDialogOpen(false);
    queryClient.invalidateQueries({ queryKey: ["/api/income-sources"] });
  };

  const handleEditSuccess = () => {
    setIsEditDialogOpen(false);
    queryClient.invalidateQueries({ queryKey: ["/api/income-sources"] });
  };

  // Helper function to get category badge style
  const getCategoryBadgeStyle = (category: string) => {
    switch (category.toLowerCase()) {
      case 'salary':
        return "bg-blue-500";
      case 'business':
        return "bg-green-500";
      case 'freelance':
        return "bg-purple-500";
      case 'investment':
        return "bg-amber-500";
      case 'rental':
        return "bg-teal-500";
      default:
        return "bg-gray-500";
    }
  };

  // Helper function to format frequency
  const formatFrequency = (frequency: string) => {
    return frequency.charAt(0).toUpperCase() + frequency.slice(1);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Income Sources</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="gap-2">
              <PlusCircle className="h-4 w-4" />
              Add New
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New Income Source</DialogTitle>
              <DialogDescription>
                Add details of a new income source.
              </DialogDescription>
            </DialogHeader>
            <IncomeSourceForm 
              userId={userId} 
              onSuccess={handleAddSuccess} 
            />
          </DialogContent>
        </Dialog>
      </div>

      {incomeSources.length === 0 ? (
        <div className="text-center p-8 bg-muted rounded-lg">
          <p className="text-muted-foreground">No income sources found.</p>
          <p className="text-muted-foreground">Click "Add New" to create one.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {incomeSources.map((incomeSource) => (
            <Card key={incomeSource.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{incomeSource.name}</CardTitle>
                  <Badge 
                    className={getCategoryBadgeStyle(incomeSource.category)}
                  >
                    {incomeSource.category}
                  </Badge>
                </div>
                <CardDescription>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="h-4 w-4" />
                    ₹{parseFloat(incomeSource.amount).toLocaleString('en-IN')} 
                    <span className="text-xs">({formatFrequency(incomeSource.frequency)})</span>
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 pb-2">
                <div className="text-sm">
                  <span className="font-medium">Start Date: </span>
                  {format(new Date(incomeSource.startDate), "PPP")}
                </div>
                {incomeSource.endDate && (
                  <div className="text-sm">
                    <span className="font-medium">End Date: </span>
                    {format(new Date(incomeSource.endDate), "PPP")}
                  </div>
                )}
                {incomeSource.notes && (
                  <div className="text-sm">
                    <span className="font-medium">Notes: </span>
                    {incomeSource.notes}
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-end gap-2 pt-2">
                <Dialog open={isEditDialogOpen && selectedIncomeSource?.id === incomeSource.id} onOpenChange={(open) => {
                  setIsEditDialogOpen(open);
                  if (!open) setSelectedIncomeSource(null);
                }}>
                  <DialogTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setSelectedIncomeSource(incomeSource)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                      <DialogTitle>Edit Income Source</DialogTitle>
                      <DialogDescription>
                        Update the details of this income source.
                      </DialogDescription>
                    </DialogHeader>
                    {selectedIncomeSource && (
                      <IncomeSourceForm 
                        userId={userId} 
                        incomeSource={selectedIncomeSource} 
                        onSuccess={handleEditSuccess} 
                      />
                    )}
                  </DialogContent>
                </Dialog>

                <Dialog open={isDeleteDialogOpen && selectedIncomeSource?.id === incomeSource.id} onOpenChange={(open) => {
                  setIsDeleteDialogOpen(open);
                  if (!open) setSelectedIncomeSource(null);
                }}>
                  <DialogTrigger asChild>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => setSelectedIncomeSource(incomeSource)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Confirm Deletion</DialogTitle>
                      <DialogDescription>
                        Are you sure you want to delete this income source? This action cannot be undone.
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
                        onClick={() => selectedIncomeSource && handleDeleteIncomeSource(selectedIncomeSource.id)}
                      >
                        Delete
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}