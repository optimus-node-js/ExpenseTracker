import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useEffect } from 'react';

interface User {
  id: number;
  username: string;
  email: string;
  fullName: string;
  cashReserve: number;
  createdAt: string;
}

interface LoginCredentials {
  username: string;
  password: string;
}

interface SignupCredentials extends LoginCredentials {
  email: string;
  fullName: string;
}

interface LoginResponse {
  message: string;
  user: User;
}

interface SignupResponse {
  message: string;
  user: User;
}

interface LogoutResponse {
  message: string;
}

export function useAuth() {
  const queryClient = useQueryClient();

  // Fetch user profile
  const { data: user, isLoading, error, refetch } = useQuery<User | null, Error>({
    queryKey: ['/api/user/profile'],
    retry: 1,
    retryDelay: 1000,
  });

  // Handle auth state based on profile fetch using useEffect
  useEffect(() => {
    if (error) {
      console.error("Profile fetch error:", error);
      // If we get an auth error, clear the local storage flag
      if (error.message.includes("401")) {
        localStorage.removeItem('isAuthenticated');
      }
    } else if (user) {
      console.log("User is authenticated");
      localStorage.setItem('isAuthenticated', 'true');
    }
  }, [user, error]);

  // Login mutation
  const login = useMutation<LoginResponse, Error, LoginCredentials>({
    mutationFn: async (credentials) => {
      console.log("Attempting login for user:", credentials.username);
      const response = await apiRequest('POST', '/api/login', credentials);
      const data = await response.json();
      console.log("Login response:", data);
      return data;
    },
    onSuccess: () => {
      console.log("Login successful, updating auth state");
      localStorage.setItem('isAuthenticated', 'true');
      refetch(); // Immediately refetch the user profile
    },
    onError: (error) => {
      console.error("Login error:", error);
      localStorage.removeItem('isAuthenticated');
    }
  });

  // Signup mutation
  const signup = useMutation<SignupResponse, Error, SignupCredentials>({
    mutationFn: async (credentials) => {
      console.log("Attempting signup for user:", credentials.username);
      const response = await apiRequest('POST', '/api/signup', credentials);
      const data = await response.json();
      console.log("Signup response:", data);
      return data;
    },
    onSuccess: () => {
      console.log("Signup successful, updating auth state");
      localStorage.setItem('isAuthenticated', 'true');
      refetch(); // Immediately refetch the user profile
    },
    onError: (error) => {
      console.error("Signup error:", error);
      localStorage.removeItem('isAuthenticated');
    }
  });

  // Logout mutation
  const logout = useMutation<LogoutResponse, Error>({
    mutationFn: async () => {
      console.log("Attempting logout");
      const response = await apiRequest('POST', '/api/logout');
      const data = await response.json();
      console.log("Logout response:", data);
      return data;
    },
    onSuccess: () => {
      console.log("Logout successful, clearing auth state");
      localStorage.removeItem('isAuthenticated');
      queryClient.invalidateQueries({ queryKey: ['/api/user/profile'] });
    },
    onError: (error) => {
      console.error("Logout error:", error);
      // Still remove the auth flag on error, just to be safe
      localStorage.removeItem('isAuthenticated');
    }
  });

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    signup,
    logout,
    error,
    refetchUser: refetch
  };
}