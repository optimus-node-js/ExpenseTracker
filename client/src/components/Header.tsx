import { useState } from "react";
import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";
import { MobileSidebar } from "@/components/MobileSidebar";
import { Bell } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function Header() {
  const [notifications] = useState(1); // Example notification count
  
  return (
    <header className="bg-card border-b shadow-sm">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Mobile Menu Button and Logo */}
        <div className="flex items-center">
          <div className="md:hidden mr-2">
            <MobileSidebar />
          </div>
          <div className="md:hidden">
            <Logo size="medium" />
          </div>
        </div>
        
        {/* Search Bar */}
        <div className="hidden md:flex flex-1 px-4 md:px-8 lg:px-12">
          <div className="relative w-full max-w-md">
            <Input
              type="text"
              className="pl-10 py-2 bg-muted border-transparent focus:bg-background focus:border-input"
              placeholder="Search transactions..."
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-muted-foreground"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>
        
        {/* Right Nav Items */}
        <div className="flex items-center space-x-4">
          {/* Notification Bell */}
          <Button 
            variant="ghost" 
            size="icon"
            className="relative w-9 h-9 rounded-full"
          >
            <Bell className="h-5 w-5" />
            {notifications > 0 && (
              <span className="absolute top-0 right-0 w-2 h-2 bg-primary rounded-full"></span>
            )}
          </Button>
          
          {/* Dark/Light Mode Toggle */}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
