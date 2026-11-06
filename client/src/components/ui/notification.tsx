import React, { useEffect, useState, useRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { 
  AlertCircle, 
  CheckCircle2, 
  Info, 
  XCircle, 
  Clock
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const notificationVariants = cva(
  "relative flex items-center gap-2 rounded-lg border p-4 shadow-md",
  {
    variants: {
      variant: {
        success: "bg-success/15 border-success text-success",
        error: "bg-destructive/15 border-destructive text-destructive",
        warning: "bg-warning/15 border-warning text-warning",
        info: "bg-primary/15 border-primary text-primary",
        loading: "bg-muted border-muted-foreground text-muted-foreground",
      },
    },
    defaultVariants: {
      variant: "info",
    },
  }
);

export interface NotificationProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onDrag'>,
    VariantProps<typeof notificationVariants> {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  duration?: number; // in milliseconds
  onClose?: () => void;
  autoClose?: boolean;
  showCloseButton?: boolean;
}

export function Notification({
  variant,
  title,
  description,
  icon,
  duration = 5000, // Default 5 seconds
  autoClose = true,
  showCloseButton = false,
  onClose,
  className,
  ...props
}: NotificationProps) {
  const [visible, setVisible] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Handle auto close
  useEffect(() => {
    if (autoClose && duration > 0) {
      timerRef.current = setTimeout(() => {
        setVisible(false);
        setTimeout(() => {
          if (onClose) onClose();
        }, 300); // Allow exit animation to complete
      }, duration);

      return () => {
        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }
      };
    }
  }, [autoClose, duration, onClose]);

  // Choose icon based on variant if not provided
  const getIcon = () => {
    if (icon) return icon;

    switch (variant) {
      case 'success':
        return <CheckCircle2 className="h-5 w-5" />;
      case 'error':
        return <XCircle className="h-5 w-5" />;
      case 'warning':
        return <AlertCircle className="h-5 w-5" />;
      case 'loading':
        return <Clock className="h-5 w-5 animate-spin" />;
      default:
        return <Info className="h-5 w-5" />;
    }
  };

  if (!visible) return null;

  return (
    <div
      className={cn(notificationVariants({ variant }), className, 
        "transition-all duration-200 animate-in fade-in slide-in-from-bottom-5")}
      {...props}
    >
      <div className="flex items-center gap-3 w-full">
        <div className="flex-shrink-0">{getIcon()}</div>
        <div className="flex-1">
          <h4 className="text-sm font-medium">{title}</h4>
          {description && (
            <p className="text-xs opacity-90 mt-1">{description}</p>
          )}
        </div>
        {showCloseButton && (
          <button
            className="text-foreground/60 hover:text-foreground transition-colors"
            onClick={() => {
              setVisible(false);
              setTimeout(() => {
                if (onClose) onClose();
              }, 300);
            }}
          >
            <XCircle className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}

export function NotificationContainer({
  children,
  position = 'bottom-right',
  className,
  ...props
}: {
  children: React.ReactNode;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top-center' | 'bottom-center';
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>) {
  const positionClasses = {
    'top-left': 'top-4 left-4',
    'top-right': 'top-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'top-center': 'top-4 left-1/2 -translate-x-1/2',
    'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
  };

  return (
    <div
      className={cn(
        'fixed z-50 flex flex-col gap-2 max-w-md w-full',
        positionClasses[position],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
} 