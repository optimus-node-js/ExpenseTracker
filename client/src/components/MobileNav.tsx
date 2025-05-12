import React from "react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  BarChart3,
  PlusCircle,
  User,
  DollarSign,
  CalendarClock
} from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { TransactionForm } from "@/components/TransactionForm";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/" },
  { icon: DollarSign, label: "Transactions", href: "/transactions" },
  { icon: BarChart3, label: "Analytics", href: "/analytics" },
  { icon: CalendarClock, label: "Subscriptions", href: "/subscriptions" },
  { icon: User, label: "Profile", href: "/profile" },
];

export function MobileNav() {
  const [location] = useLocation();
  
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t shadow-lg z-10">
      <div className="flex justify-around">
        {navItems.map((item, index) => {
          const isActive = location === item.href;
          const Icon = item.icon;
          
          // Position FAB in the middle
          if (index === 2) {
            return (
              <div key={`nav-item-${index}`} className="flex flex-col">
                <Link href={item.href}>
                  <div className={cn(
                    "flex flex-col items-center py-3 cursor-pointer",
                    isActive ? "text-primary" : "text-muted-foreground"
                  )}>
                    <Icon className="text-xl h-5 w-5" />
                    <span className="text-xs mt-1">{item.label}</span>
                  </div>
                </Link>
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="flex relative cursor-pointer">
                      <div className="absolute -top-5 bg-primary rounded-full p-3 w-14 h-14 flex items-center justify-center text-white shadow-lg">
                        <PlusCircle className="h-8 w-8" />
                      </div>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <TransactionForm />
                  </DialogContent>
                </Dialog>
              </div>
            );
          }
          
          return (
            <Link key={`nav-item-${index}`} href={item.href}>
              <div className={cn(
                "flex flex-col items-center py-3 cursor-pointer",
                isActive ? "text-primary" : "text-muted-foreground"
              )}>
                <Icon className="text-xl h-5 w-5" />
                <span className="text-xs mt-1">{item.label}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
