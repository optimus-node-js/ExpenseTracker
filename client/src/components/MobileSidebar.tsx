import { useState } from "react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/Logo";
import { UserAvatar } from "@/components/UserAvatar";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useUser } from "@/hooks/use-user";
import {
  LayoutDashboard,
  BarChart3,
  CreditCard,
  Upload,
  DollarSign,
  X,
  Menu,
} from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/" },
  { icon: DollarSign, label: "Transactions", href: "/transactions" },
  { icon: BarChart3, label: "Analytics", href: "/analytics" },
  { icon: CreditCard, label: "Budgets", href: "/budget" },
  { icon: Upload, label: "Upload Statements", href: "/upload" },
];

export function MobileSidebar() {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);
  const { data: user, isLoading } = useUser();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          type="button"
          className="md:hidden text-muted-foreground hover:text-foreground focus:outline-none"
          aria-label="Open Menu"
        >
          <Menu className="h-6 w-6" />
        </button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0">
        <SheetHeader className="border-b p-4">
          <SheetTitle className="flex items-center justify-between">
            <Logo />
            <button onClick={() => setOpen(false)} className="rounded-full p-1 hover:bg-muted">
              <X className="h-5 w-5" />
            </button>
          </SheetTitle>
        </SheetHeader>

        {/* Mobile Navigation */}
        <div className="py-4 px-2">
          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = location === item.href;
              const Icon = item.icon;
              
              return (
                <Link 
                  key={item.href} 
                  href={item.href}
                  onClick={() => setOpen(false)}
                >
                  <a
                    className={cn(
                      "flex items-center px-4 py-3 rounded-lg font-medium transition-colors duration-200",
                      isActive 
                        ? "text-foreground bg-muted"
                        : "text-muted-foreground hover:bg-muted"
                    )}
                  >
                    <Icon className={cn("mr-3 h-5 w-5", isActive ? "text-primary" : "text-muted-foreground")} />
                    <span>{item.label}</span>
                  </a>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Mobile Footer */}
        <div className="mt-auto border-t p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <UserAvatar />
              <div>
                <p className="text-sm font-medium text-foreground">
                  {user?.fullName || "Loading..."}
                </p>
                <p className="text-xs text-muted-foreground">
                  {user?.email || ""}
                </p>
              </div>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
