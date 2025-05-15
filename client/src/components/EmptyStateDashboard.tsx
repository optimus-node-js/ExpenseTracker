import React from 'react';

const EmptyStateDashboard: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-card rounded-lg border shadow-sm">
      <div className="w-24 h-24 mb-4 text-muted-foreground">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect width="18" height="14" x="3" y="8" rx="2" />
          <path d="M7 8V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="9" y1="16" x2="10" y2="16" />
          <line x1="13" y1="16" x2="14" y2="16" />
          <line x1="17" y1="16" x2="18" y2="16" />
        </svg>
      </div>
      <h3 className="text-xl font-medium">Welcome to Your Financial Dashboard</h3>
      <p className="text-muted-foreground text-center max-w-lg mt-2">
        Track expenses, manage budgets, and visualize your financial health
      </p>
    </div>
  );
};

export default EmptyStateDashboard;