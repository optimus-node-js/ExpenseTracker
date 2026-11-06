import { useState, useCallback } from "react";
import { useLocation } from "wouter";
import { useSafeNotification } from "@/components/AuthNotificationWrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

interface LoginCredentials {
  username: string;
  password: string;
}

interface LoginResponse {
  message: string;
  user: any;
}

export function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [, navigate] = useLocation();
  const notification = useSafeNotification();

  // Create login mutation directly in the component to avoid hook order issues
  const login = useMutation<LoginResponse, Error, LoginCredentials>({
    mutationFn: async (credentials) => {
      const response = await apiRequest('POST', '/api/login', credentials);
      const data = await response.json();
      return data;
    },
    onSuccess: () => {
      localStorage.setItem('isAuthenticated', 'true');
    },
    onError: (error) => {
      console.error("Login error:", error);
      localStorage.removeItem('isAuthenticated');
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Show loading notification
      notification?.showNotification({
        title: "Logging in...",
        description: "Please wait while we verify your credentials",
        variant: "loading",
        duration: 2000
      });
      
      await login.mutateAsync({
        username,
        password,
      });
      
      // Show success notification
      notification?.showNotification({
        title: "Login successful",
        description: "Welcome back! Redirecting to dashboard...",
        variant: "success",
        duration: 3000
      });
      
      // Redirect after a short delay
      setTimeout(() => {
        navigate("/dashboard");
      }, 500);
    } catch (error) {
      // Show error notification
      notification?.showNotification({
        title: "Login failed",
        description: error instanceof Error 
          ? error.message 
          : "Invalid username or password. Please try again.",
        variant: "error",
        duration: 4000
      });
    }
  };

  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
        <CardDescription>Enter your credentials to sign in to your account</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              placeholder="Your username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <a href="#" className="text-xs text-primary hover:underline">
                Forgot password?
              </a>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="Your password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button type="submit" className="w-full" disabled={login.isPending}>
            {login.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Sign In
          </Button>
          <div className="text-sm text-center text-muted-foreground">
            Don't have an account?{' '}
            <a href="/signup" className="text-primary hover:underline">
              Sign up
            </a>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
}