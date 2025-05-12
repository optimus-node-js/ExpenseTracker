import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { User } from "@shared/schema";

export function useUser() {
  return useQuery<User>({
    queryKey: ["/api/user/profile"],
    queryFn: () => apiRequest("GET", "/api/user/profile").then(res => res.json()),
  });
}