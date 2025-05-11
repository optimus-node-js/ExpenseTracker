import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function UserAvatar() {
  const initials = "RS"; // Rahul Sharma
  
  return (
    <Avatar className="w-10 h-10 bg-primary">
      <AvatarFallback className="text-white font-medium text-sm">
        {initials}
      </AvatarFallback>
    </Avatar>
  );
}
