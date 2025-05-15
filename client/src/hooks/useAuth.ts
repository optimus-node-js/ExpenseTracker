import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';

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

interface SignupCredentials {
  username: string;
  email: string;
  password: string;
  fullName: string;
}

export function useAuth() {
  const queryClient = useQueryClient();

  // Fetch user profile
  const { data: user, isLoading, error } = useQuery({
    queryKey: ['/api/user/profile'],
    retry: false,
  });

  // Login mutation
  const login = useMutation({
    mutationFn: (credentials: LoginCredentials) => 
      apiRequest('POST', '/api/login', credentials),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/user/profile'] });
    },
  });

  // Signup mutation
  const signup = useMutation({
    mutationFn: (credentials: SignupCredentials) => 
      apiRequest('POST', '/api/signup', credentials),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/user/profile'] });
    },
  });

  // Logout mutation
  const logout = useMutation({
    mutationFn: () => 
      apiRequest('POST', '/api/logout'),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/user/profile'] });
    },
  });

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    signup,
    logout,
    error,
  };
}