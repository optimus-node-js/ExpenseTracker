import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/Logo";
import { UserAvatar } from "@/components/UserAvatar";
import { useUser } from "@/hooks/use-user";
import {
  LayoutDashboard,
  BarChart3,
  CreditCard,
  Upload,
  DollarSign,
  CalendarClock,
  User,
  TrendingUp,
  CircleDollarSign,
  HandCoins,
  Coins,
  Wallet,
  Landmark,
} from "lucide-react";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/" },
  { icon: DollarSign, label: "Transactions", href: "/transactions" },
  { icon: Wallet, label: "Income", href: "/income" },
  { icon: HandCoins, label: "Loans & Lending", href: "/loans" },
  { icon: Coins, label: "Investments", href: "/investments" },
  { icon: BarChart3, label: "Analytics", href: "/analytics" },
  { icon: CreditCard, label: "Budgets", href: "/budget" },
  { icon: CalendarClock, label: "Subscriptions", href: "/subscriptions" },
  { icon: Upload, label: "Upload Statements", href: "/upload" },
];

export function Sidebar() {
  const [location] = useLocation();
  const { data: user, isLoading } = useUser();

  return (
    <aside className="hidden md:flex flex-col w-64 bg-card border-r shadow-sm transition-all duration-200">
      {/* Logo section */}
      <div className="flex items-center justify-center py-8">
        <Logo size="large" />
      </div>
      
      {/* Navigation Links */}
      <nav className="flex-1 px-4 mt-6">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const isActive = location === item.href;
            const Icon = item.icon;
            
            return (
              <li key={item.href}>
                <Link href={item.href}>
                  <div
                    className={cn(
                      "flex items-center px-4 py-3 rounded-lg font-medium transition-colors duration-200 cursor-pointer",
                      isActive 
                        ? "text-foreground bg-muted dark:bg-muted"
                        : "text-muted-foreground hover:bg-muted dark:hover:bg-muted"
                    )}
                  >
                    <Icon className={cn("mr-3 h-5 w-5", isActive ? "text-primary" : "text-muted-foreground")} />
                    <span>{item.label}</span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      
      {/* User Profile */}
      <div className="p-4 mt-auto">
        <Link href="/profile">
          <div className="flex items-center space-x-3 px-4 py-3 bg-muted rounded-lg cursor-pointer hover:bg-muted/80 transition-colors">
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
        </Link>
      </div>
    </aside>
  );
}
