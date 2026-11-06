import React, { useState, useEffect } from 'react';
import { useNotification } from '@/components/NotificationProvider';

// Define the NotificationContext type based on what we need
export interface NotificationContextType {
  showNotification: (notification: {
    title: string;
    description?: string;
    variant?: 'success' | 'error' | 'warning' | 'info' | 'loading';
    duration?: number;
    autoClose?: boolean;
  }) => string;
  dismissNotification: (id: string) => void;
  dismissAll: () => void;
}

// Create a context to share notification functions safely
export const SafeNotificationContext = React.createContext<NotificationContextType | null>(null);

export function AuthNotificationWrapper({ children }: { children: React.ReactNode }) {
  // State to track if we've already cleaned up
  const [isCleanedUp, setIsCleanedUp] = useState(false);
  // Create a dummy notification context that does nothing
  const dummyContext: NotificationContextType = {
    showNotification: () => '',
    dismissNotification: () => {},
    dismissAll: () => {}
  };
  
  // Try to use the real notification context
  let notificationContext: NotificationContextType | null = null;
  try {
    notificationContext = useNotification();
  } catch (error) {
    console.error("Notification context not available in auth page:", error);
    notificationContext = dummyContext;
  }
  
  // Clear any existing notifications once when the component mounts
  useEffect(() => {
    if (notificationContext && !isCleanedUp) {
      notificationContext.dismissAll();
      setIsCleanedUp(true);
    }
  }, [notificationContext, isCleanedUp]);

  return (
    <SafeNotificationContext.Provider value={notificationContext || dummyContext}>
      {children}
    </SafeNotificationContext.Provider>
  );
}

// Hook to use the safe notification context
export function useSafeNotification() {
  return React.useContext(SafeNotificationContext);
} 