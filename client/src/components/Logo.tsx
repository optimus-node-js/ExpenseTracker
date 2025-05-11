import { Wallet } from "lucide-react";

interface LogoProps {
  size?: "small" | "medium" | "large";
}

export function Logo({ size = "medium" }: LogoProps) {
  const sizes = {
    small: "text-xl",
    medium: "text-2xl",
    large: "text-3xl",
  };
  
  return (
    <div className="flex items-center space-x-2">
      <span className={`text-primary ${sizes[size]}`}>
        <Wallet className="h-6 w-6" />
      </span>
      <h1 className={`font-bold text-foreground ${sizes[size]}`}>RupeeTally</h1>
    </div>
  );
}
