import { Switch, Route, Redirect, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { MainLayout } from "@/layouts/MainLayout";
import { ReactNode, useState, useEffect, useRef, Component, ErrorInfo } from "react";
import { NotificationProvider } from "@/components/NotificationProvider";

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
import Logout from "@/pages/Logout";
import Contact from "@/pages/Contact";
import FAQ from "@/pages/FAQ";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import Careers from "@/pages/Careers";
import ApiDocs from "@/pages/ApiDocs";
import Guides from "@/pages/Guides";
import Documentation from "@/pages/Documentation";
import About from "@/pages/About";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import Terms from "@/pages/Terms";
import GuideDetails from "@/pages/GuideDetails";
import Features from "@/pages/Features";
import ScrollToTop from "@/components/ScrollToTop";

// Protected route component
function ProtectedRoute({ component: Component, ...rest }: { component: React.ComponentType<any>, path: string }) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [, navigate] = useLocation();
  const isAuthenticating = useRef(false);

  useEffect(() => {
    // Check if user is logged in
    const checkAuth = async () => {
      try {
        if (isAuthenticating.current) return;
        isAuthenticating.current = true;
        
        console.log("Checking authentication status");
        // Check if we have a stored auth state
        const storedAuthState = localStorage.getItem('isAuthenticated');
        console.log("Stored auth state:", storedAuthState);
        
        // If not authenticated in localStorage, redirect immediately
        if (!storedAuthState) {
          console.log("No stored auth state, redirecting to login");
          setIsLoggedIn(false);
          navigate('/login');
          isAuthenticating.current = false;
          return;
        }
        
        // Verify authentication with the server
        console.log("Verifying authentication with server");
        const response = await fetch('/api/user/profile', {
          credentials: 'include'
        });
        
        console.log("Auth verification response:", response.status);
        
        if (response.ok) {
          console.log("Authentication verified with server");
          setIsLoggedIn(true);
          localStorage.setItem('isAuthenticated', 'true');
        } else {
          console.log("Server rejected authentication, redirecting to login");
          // Server says not authenticated, clear localStorage and redirect
          setIsLoggedIn(false);
          localStorage.removeItem('isAuthenticated');
          navigate('/login');
        }
        isAuthenticating.current = false;
      } catch (error) {
        console.error('Auth check error:', error);
        setIsLoggedIn(false);
        localStorage.removeItem('isAuthenticated');
        navigate('/login');
        isAuthenticating.current = false;
      }
    };

    checkAuth();
    
    // Clean up function
    return () => {
      isAuthenticating.current = false;
    };
  }, [navigate]);

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

// Error Boundary component to catch rendering errors
class ErrorBoundary extends Component<{ children: ReactNode, fallback?: ReactNode }> {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("React ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="p-4 m-4 bg-destructive/10 border border-destructive rounded-md">
          <h2 className="text-xl font-bold text-destructive">Something went wrong</h2>
          <p className="mt-2 text-muted-foreground">
            The application encountered an error. Please try refreshing the page.
          </p>
          <button 
            className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md"
            onClick={() => window.location.reload()}
          >
            Reload page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

function Router() {
  return (
    <Switch>
      {/* Public routes */}
      <Route path="/" component={Landing} />
      <Route path="/login">
        <ErrorBoundary>
          <Login />
        </ErrorBoundary>
      </Route>
      <Route path="/signup">
        <ErrorBoundary>
          <Signup />
        </ErrorBoundary>
      </Route>
      <Route path="/logout" component={Logout} />
      <Route path="/contact" component={Contact} />
      <Route path="/faq" component={FAQ} />
      <Route path="/blog" component={Blog} />
      <Route path="/blog/:id" component={BlogPost} />
      <Route path="/careers" component={Careers} />
      <Route path="/api-docs" component={ApiDocs} />
      <Route path="/guides" component={Guides} />
      <Route path="/guides/:id" component={GuideDetails} />
      <Route path="/documentation" component={Documentation} />
      <Route path="/features" component={Features} />
      <Route path="/about" component={About} />
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
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <NotificationProvider>
            <Toaster />
            <ScrollToTop />
            <Router />
          </NotificationProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
