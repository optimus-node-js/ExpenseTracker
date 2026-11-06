import { useEffect } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { AuthNotificationWrapper, useSafeNotification } from "@/components/AuthNotificationWrapper";

function LogoutContent() {
  const { logout } = useAuth();
  const [, navigate] = useLocation();
  const notification = useSafeNotification();

  useEffect(() => {
    const performLogout = async () => {
      try {
        // Show "logging out" notification
        notification?.showNotification({
          title: "Logging out...",
          description: "Please wait while we sign you out",
          variant: "loading",
          duration: 2000
        });

        // Call the logout endpoint
        await logout.mutateAsync();
        
        // Show success notification
        notification?.showNotification({
          title: "Logged out successfully",
          description: "You have been signed out of your account",
          variant: "success",
          duration: 3000
        });
        
        // Redirect to login page after a short delay
        setTimeout(() => {
          navigate("/login");
        }, 500);
      } catch (error) {
        // Show error notification
        notification?.showNotification({
          title: "Logout failed",
          description: "There was an issue signing you out. Please try again.",
          variant: "error",
          duration: 4000
        });
        
        // Redirect to dashboard anyway
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      }
    };

    // Start the logout process
    performLogout();
  }, [logout, navigate, notification]);

  // Instead of showing a loading state, just redirect immediately
  // The notifications will handle the user feedback
  return null;
}

export default function Logout() {
  return (
    <AuthNotificationWrapper>
      <LogoutContent />
    </AuthNotificationWrapper>
  );
} 