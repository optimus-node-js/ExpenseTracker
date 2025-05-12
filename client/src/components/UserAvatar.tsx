import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useUser } from "@/hooks/use-user";
import { Skeleton } from "@/components/ui/skeleton";

export function UserAvatar() {
  const { data: user, isLoading } = useUser();
  
  // Calculate initials from user's full name
  const initials = user?.fullName
    ? user.fullName
        .split(' ')
        .map(name => name[0])
        .join('')
        .substring(0, 2)
        .toUpperCase()
    : '?';
  
  if (isLoading) {
    return <Skeleton className="w-10 h-10 rounded-full" />;
  }
  
  return (
    <Avatar className="w-10 h-10 bg-primary">
      <AvatarFallback className="text-white font-medium text-sm">
        {initials}
      </AvatarFallback>
    </Avatar>
  );
}
