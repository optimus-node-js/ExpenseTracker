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
import { Loader2, PlusCircle, Pencil, Trash } from "lucide-react";
import { format } from "date-fns";
import { InsertLoan, Loan } from "@shared/schema";
import LoanForm from "./LoanForm";

type LoansListProps = {
  userId: number;
};

export default function LoansList({ userId }: LoansListProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState<Loan | null>(null);

  const {
    data: loans = [],
    isLoading,
    error,
  } = useQuery<Loan[]>({
    queryKey: ["/api/loans"],
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
        Error loading loans: {(error as Error).message}
      </div>
    );
  }

  const handleDeleteLoan = async (id: number) => {
    try {
      await apiRequest({
        url: `/api/loans/${id}`,
        method: "DELETE",
      });

      toast({
        title: "Loan deleted",
        description: "The loan has been deleted successfully.",
      });

      // Invalidate loans cache to refresh data
      queryClient.invalidateQueries({ queryKey: ["/api/loans"] });
      setIsDeleteDialogOpen(false);
    } catch (error) {
      console.error("Failed to delete loan:", error);
      toast({
        title: "Error",
        description: "Failed to delete the loan. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleAddSuccess = () => {
    setIsAddDialogOpen(false);
    queryClient.invalidateQueries({ queryKey: ["/api/loans"] });
  };

  const handleEditSuccess = () => {
    setIsEditDialogOpen(false);
    queryClient.invalidateQueries({ queryKey: ["/api/loans"] });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Loans & Lending</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="gap-2">
              <PlusCircle className="h-4 w-4" />
              Add New
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New Loan</DialogTitle>
              <DialogDescription>
                Add details of a new loan or money lending transaction.
              </DialogDescription>
            </DialogHeader>
            <LoanForm 
              userId={userId} 
              onSuccess={handleAddSuccess} 
            />
          </DialogContent>
        </Dialog>
      </div>

      {loans.length === 0 ? (
        <div className="text-center p-8 bg-muted rounded-lg">
          <p className="text-muted-foreground">No loans or lending transactions found.</p>
          <p className="text-muted-foreground">Click "Add New" to create one.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {loans.map((loan) => (
            <Card key={loan.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{loan.personName}</CardTitle>
                  <Badge 
                    variant={loan.type === "lent" ? "default" : "secondary"}
                  >
                    {loan.type === "lent" ? "Lent" : "Borrowed"}
                  </Badge>
                </div>
                <CardDescription>
                  Amount: ₹{parseFloat(loan.amount).toLocaleString('en-IN')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 pb-2">
                <div className="text-sm">
                  <span className="font-medium">Date: </span>
                  {format(new Date(loan.date), "PPP")}
                </div>
                {loan.dueDate && (
                  <div className="text-sm">
                    <span className="font-medium">Due Date: </span>
                    {format(new Date(loan.dueDate), "PPP")}
                  </div>
                )}
                {loan.interestRate && (
                  <div className="text-sm">
                    <span className="font-medium">Interest Rate: </span>
                    {loan.interestRate}%
                  </div>
                )}
                {loan.notes && (
                  <div className="text-sm">
                    <span className="font-medium">Notes: </span>
                    {loan.notes}
                  </div>
                )}
                <div className="text-sm">
                  <span className="font-medium">Status: </span>
                  <Badge 
                    variant={loan.status === "unpaid" ? "outline" : "default"}
                    className={loan.status === "paid" ? "bg-green-500" : ""}
                  >
                    {loan.status === "paid" ? "Paid" : "Unpaid"}
                  </Badge>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2 pt-2">
                <Dialog open={isEditDialogOpen && selectedLoan?.id === loan.id} onOpenChange={(open) => {
                  setIsEditDialogOpen(open);
                  if (!open) setSelectedLoan(null);
                }}>
                  <DialogTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setSelectedLoan(loan)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                      <DialogTitle>Edit Loan</DialogTitle>
                      <DialogDescription>
                        Update the details of this loan.
                      </DialogDescription>
                    </DialogHeader>
                    {selectedLoan && (
                      <LoanForm 
                        userId={userId} 
                        loan={selectedLoan} 
                        onSuccess={handleEditSuccess} 
                      />
                    )}
                  </DialogContent>
                </Dialog>

                <Dialog open={isDeleteDialogOpen && selectedLoan?.id === loan.id} onOpenChange={(open) => {
                  setIsDeleteDialogOpen(open);
                  if (!open) setSelectedLoan(null);
                }}>
                  <DialogTrigger asChild>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => setSelectedLoan(loan)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Confirm Deletion</DialogTitle>
                      <DialogDescription>
                        Are you sure you want to delete this loan? This action cannot be undone.
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
                        onClick={() => selectedLoan && handleDeleteLoan(selectedLoan.id)}
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