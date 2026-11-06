import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { LoginForm } from "@/components/auth/LoginForm";
import { AuthNotificationWrapper } from "@/components/AuthNotificationWrapper";

export default function Login() {
  return (
    <div className="min-h-screen bg-muted/30 flex flex-col items-center justify-center p-4">
      <Link href="/" className="absolute top-4 left-4 flex items-center text-sm text-muted-foreground hover:text-primary transition-colors">
        <ArrowLeft className="mr-1 h-4 w-4" />
        Back to home
      </Link>
      
      <AuthNotificationWrapper>
        <LoginForm />
      </AuthNotificationWrapper>
    </div>
  );
}