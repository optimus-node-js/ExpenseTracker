import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { MainLayout } from "@/layouts/MainLayout";
import Dashboard from "@/pages/Dashboard";
import Transactions from "@/pages/Transactions";
import Analytics from "@/pages/Analytics";
import Budget from "@/pages/Budget";
import Profile from "@/pages/Profile";
import UploadStatements from "@/pages/UploadStatements";
import Subscriptions from "@/pages/Subscriptions";
import Investments from "@/pages/Investments";
import Income from "@/pages/Income";
import Loans from "@/pages/Loans";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/transactions" component={Transactions} />
      <Route path="/analytics" component={Analytics} />
      <Route path="/budget" component={Budget} />
      <Route path="/upload" component={UploadStatements} />
      <Route path="/subscriptions" component={Subscriptions} />
      <Route path="/investments" component={Investments} />
      <Route path="/income" component={Income} />
      <Route path="/loans" component={Loans} />
      <Route path="/profile" component={Profile} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <MainLayout>
          <Router />
        </MainLayout>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
