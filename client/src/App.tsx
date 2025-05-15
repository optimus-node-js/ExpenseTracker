import { Switch, Route, Redirect, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { MainLayout } from "@/layouts/MainLayout";
import { ReactNode, useState, useEffect } from "react";

// Main app pages
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

// Auth and public pages
import Landing from "@/pages/Landing";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import Terms from "@/pages/Terms";

// Protected route component
function ProtectedRoute({ component: Component, ...rest }: { component: React.ComponentType<any>, path: string }) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [, setLocation] = useLocation();

  useEffect(() => {
    // Check if user is logged in
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/user/profile', {
          credentials: 'include'
        });
        
        if (response.ok) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
          setLocation('/login');
        }
      } catch (error) {
        console.error('Auth check error:', error);
        setIsLoggedIn(false);
        setLocation('/login');
      }
    };

    checkAuth();
  }, [setLocation]);

  // Show loading state while checking auth
  if (isLoggedIn === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // If authenticated, render the protected component
  return isLoggedIn ? <Component {...rest} /> : null;
}

// AppLayout wrapper - decides whether to show main layout with sidebar or not
function AppLayout({ children, withSidebar = false }: { children: ReactNode, withSidebar?: boolean }) {
  if (withSidebar) {
    return <MainLayout>{children}</MainLayout>;
  }
  return <>{children}</>;
}

function Router() {
  return (
    <Switch>
      {/* Public routes */}
      <Route path="/" component={Landing} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/privacy-policy" component={PrivacyPolicy} />
      <Route path="/terms" component={Terms} />
      
      {/* Protected routes with sidebar */}
      <Route path="/dashboard">
        <AppLayout withSidebar>
          <ProtectedRoute component={Dashboard} path="/dashboard" />
        </AppLayout>
      </Route>
      <Route path="/transactions">
        <AppLayout withSidebar>
          <ProtectedRoute component={Transactions} path="/transactions" />
        </AppLayout>
      </Route>
      <Route path="/analytics">
        <AppLayout withSidebar>
          <ProtectedRoute component={Analytics} path="/analytics" />
        </AppLayout>
      </Route>
      <Route path="/budget">
        <AppLayout withSidebar>
          <ProtectedRoute component={Budget} path="/budget" />
        </AppLayout>
      </Route>
      <Route path="/upload">
        <AppLayout withSidebar>
          <ProtectedRoute component={UploadStatements} path="/upload" />
        </AppLayout>
      </Route>
      <Route path="/subscriptions">
        <AppLayout withSidebar>
          <ProtectedRoute component={Subscriptions} path="/subscriptions" />
        </AppLayout>
      </Route>
      <Route path="/investments">
        <AppLayout withSidebar>
          <ProtectedRoute component={Investments} path="/investments" />
        </AppLayout>
      </Route>
      <Route path="/income">
        <AppLayout withSidebar>
          <ProtectedRoute component={Income} path="/income" />
        </AppLayout>
      </Route>
      <Route path="/loans">
        <AppLayout withSidebar>
          <ProtectedRoute component={Loans} path="/loans" />
        </AppLayout>
      </Route>
      <Route path="/profile">
        <AppLayout withSidebar>
          <ProtectedRoute component={Profile} path="/profile" />
        </AppLayout>
      </Route>
      
      {/* Redirect from old root to dashboard */}
      <Route path="/home">
        <Redirect to="/dashboard" />
      </Route>
      
      {/* 404 fallback */}
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
