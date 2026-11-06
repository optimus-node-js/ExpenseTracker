import React, { createContext, useContext, useState, useCallback } from 'react';
import { Notification, NotificationContainer } from './ui/notification';

// Notification type
interface NotificationItem {
  id: string;
  title: string;
  description?: string;
  variant?: 'success' | 'error' | 'warning' | 'info' | 'loading';
  duration?: number;
  autoClose?: boolean;
  timestamp: number;
}

// Context type
interface NotificationContextType {
  showNotification: (notification: Omit<NotificationItem, 'id' | 'timestamp'>) => string;
  dismissNotification: (id: string) => void;
  dismissAll: () => void;
}

// Create context
const NotificationContext = createContext<NotificationContextType | null>(null);

// Generate unique ID
const generateId = (): string => {
  return Math.random().toString(36).substring(2, 9);
};

// Maximum number of notifications to show at once
const MAX_NOTIFICATIONS = 3;

// Provider component
export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  // Show notification
  const showNotification = useCallback((notification: Omit<NotificationItem, 'id' | 'timestamp'>) => {
    const id = generateId();
    const timestamp = Date.now();

    setNotifications((prev) => {
      // Add new notification and keep only MAX_NOTIFICATIONS most recent
      const updatedNotifications = [{ ...notification, id, timestamp }, ...prev];
      
      // Sort by timestamp (newest first) and limit
      return updatedNotifications
        .sort((a, b) => b.timestamp - a.timestamp)
        .slice(0, MAX_NOTIFICATIONS);
    });
    
    return id;
  }, []);

  // Dismiss notification
  const dismissNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id));
  }, []);

  // Dismiss all notifications
  const dismissAll = useCallback(() => {
    setNotifications([]);
  }, []);

  // Create context value with memoized callbacks
  const contextValue = {
    showNotification,
    dismissNotification,
    dismissAll,
  };

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
      <NotificationContainer position="bottom-right">
        {notifications.map((notification) => (
          <Notification
            key={notification.id}
            variant={notification.variant}
            title={notification.title}
            description={notification.description}
            duration={notification.duration ?? 3000} // Default duration of 3 seconds
            autoClose={notification.autoClose ?? true}
            onClose={() => dismissNotification(notification.id)}
          />
        ))}
      </NotificationContainer>
    </NotificationContext.Provider>
  );
}

// Hook to use the notification context
export function useNotification() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
} 