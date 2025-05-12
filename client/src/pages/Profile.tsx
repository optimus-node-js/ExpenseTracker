import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, BadgeCheck, CreditCard, Lock, Mail, User, UserCog } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

// Form schemas
const profileSchema = z.object({
  fullName: z.string().min(1, { message: "Full name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
});

const securitySchema = z.object({
  currentPassword: z.string().min(6, { message: "Current password is required" }),
  newPassword: z.string().min(6, { message: "Password must be at least 6 characters" }),
  confirmPassword: z.string().min(6, { message: "Password must be at least 6 characters" }),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type ProfileFormValues = z.infer<typeof profileSchema>;
type SecurityFormValues = z.infer<typeof securitySchema>;

export default function Profile() {
  const [activeTab, setActiveTab] = useState("profile");
  const queryClient = useQueryClient();
  
  // Fetch user profile
  const { data: user, isLoading } = useQuery({
    queryKey: ['/api/user/profile'],
    enabled: true,
  });

  // Setup forms
  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: "",
      email: "",
    },
  });

  const securityForm = useForm<SecurityFormValues>({
    resolver: zodResolver(securitySchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  // Update profile form with user data when it loads
  React.useEffect(() => {
    if (user) {
      profileForm.reset({
        fullName: user.fullName || "",
        email: user.email || "",
      });
    }
  }, [user, profileForm]);

  // Profile update mutation
  const updateProfileMutation = useMutation({
    mutationFn: (data: ProfileFormValues) => apiRequest('/api/user/profile', {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/user/profile'] });
      toast({
        title: "Profile updated",
        description: "Your profile information has been updated successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Update failed",
        description: "There was a problem updating your profile. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Password change mutation (Currently just mocked)
  const changePasswordMutation = useMutation({
    mutationFn: (data: SecurityFormValues) => {
      // This would normally hit an API endpoint
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ success: true });
        }, 1000);
      });
    },
    onSuccess: () => {
      securityForm.reset({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      toast({
        title: "Password updated",
        description: "Your password has been changed successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Update failed",
        description: "There was a problem changing your password. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Handle profile form submission
  const onProfileSubmit = (data: ProfileFormValues) => {
    updateProfileMutation.mutate(data);
  };

  // Handle security form submission
  const onSecuritySubmit = (data: SecurityFormValues) => {
    changePasswordMutation.mutate(data);
  };

  // Generate user initials for avatar fallback
  const getInitials = (name: string) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map(part => part[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-primary mb-2">Your Profile</h1>
          <p className="text-muted-foreground">Manage your account settings and preferences</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <Card className="lg:col-span-1">
          <CardHeader className="pb-2">
            <div className="flex justify-center mb-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src="" />
                <AvatarFallback className="text-lg bg-primary/10 text-primary">
                  {isLoading ? "..." : getInitials(user?.fullName || "")}
                </AvatarFallback>
              </Avatar>
            </div>
            <CardTitle className="text-center text-xl">
              {isLoading ? "Loading..." : user?.fullName || "User"}
            </CardTitle>
            <CardDescription className="text-center">
              {isLoading ? "..." : user?.email || "user@example.com"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-1 mt-3">
              <Button 
                variant={activeTab === "profile" ? "default" : "ghost"}
                className="w-full justify-start" 
                onClick={() => setActiveTab("profile")}
              >
                <User className="mr-2 h-4 w-4" />
                Personal Information
              </Button>
              <Button 
                variant={activeTab === "security" ? "default" : "ghost"}
                className="w-full justify-start" 
                onClick={() => setActiveTab("security")}
              >
                <Lock className="mr-2 h-4 w-4" />
                Security
              </Button>
              <Button 
                variant={activeTab === "preferences" ? "default" : "ghost"}
                className="w-full justify-start" 
                onClick={() => setActiveTab("preferences")}
              >
                <UserCog className="mr-2 h-4 w-4" />
                Preferences
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {activeTab === "profile" && (
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>
                  Update your personal details and contact information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={profileForm.handleSubmit(onProfileSubmit)}>
                  <div className="grid gap-6">
                    <div className="grid gap-3">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input
                        id="fullName"
                        placeholder="Your full name"
                        {...profileForm.register("fullName")}
                      />
                      {profileForm.formState.errors.fullName && (
                        <p className="text-sm text-destructive">
                          {profileForm.formState.errors.fullName.message}
                        </p>
                      )}
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Your email address"
                        {...profileForm.register("email")}
                      />
                      {profileForm.formState.errors.email && (
                        <p className="text-sm text-destructive">
                          {profileForm.formState.errors.email.message}
                        </p>
                      )}
                    </div>
                    <Button 
                      type="submit" 
                      disabled={updateProfileMutation.isPending || !profileForm.formState.isDirty}
                    >
                      {updateProfileMutation.isPending ? "Saving..." : "Save Changes"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {activeTab === "security" && (
            <Card>
              <CardHeader>
                <CardTitle>Security</CardTitle>
                <CardDescription>
                  Manage your account security settings and change your password
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={securityForm.handleSubmit(onSecuritySubmit)}>
                  <div className="grid gap-6">
                    <div className="grid gap-3">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input
                        id="currentPassword"
                        type="password"
                        {...securityForm.register("currentPassword")}
                      />
                      {securityForm.formState.errors.currentPassword && (
                        <p className="text-sm text-destructive">
                          {securityForm.formState.errors.currentPassword.message}
                        </p>
                      )}
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input
                        id="newPassword"
                        type="password"
                        {...securityForm.register("newPassword")}
                      />
                      {securityForm.formState.errors.newPassword && (
                        <p className="text-sm text-destructive">
                          {securityForm.formState.errors.newPassword.message}
                        </p>
                      )}
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        {...securityForm.register("confirmPassword")}
                      />
                      {securityForm.formState.errors.confirmPassword && (
                        <p className="text-sm text-destructive">
                          {securityForm.formState.errors.confirmPassword.message}
                        </p>
                      )}
                    </div>
                    <Button 
                      type="submit" 
                      disabled={changePasswordMutation.isPending || !securityForm.formState.isDirty}
                    >
                      {changePasswordMutation.isPending ? "Updating..." : "Update Password"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {activeTab === "preferences" && (
            <Card>
              <CardHeader>
                <CardTitle>Preferences</CardTitle>
                <CardDescription>
                  Customize your app experience and notification settings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">App Settings</h3>
                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Preference settings</AlertTitle>
                      <AlertDescription>
                        Preferences will be available in a future update.
                      </AlertDescription>
                    </Alert>
                  </div>
                  <Separator />
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Notifications</h3>
                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Notification settings</AlertTitle>
                      <AlertDescription>
                        Notification preferences will be available in a future update.
                      </AlertDescription>
                    </Alert>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Account summary section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <BadgeCheck className="mr-2 h-5 w-5 text-blue-500" />
              Account Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Status</span>
              <span className="font-semibold text-green-500">Active</span>
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="text-muted-foreground">Member since</span>
              <span className="font-semibold">
                {isLoading ? "..." : new Date(user?.createdAt || Date.now()).toLocaleDateString()}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Mail className="mr-2 h-5 w-5 text-blue-500" />
              Email Verification
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Status</span>
              <span className="font-semibold text-green-500">Verified</span>
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="text-muted-foreground">Email</span>
              <span className="font-semibold">
                {isLoading ? "..." : user?.email || "user@example.com"}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <CreditCard className="mr-2 h-5 w-5 text-blue-500" />
              Account Data
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Transactions</span>
              <span className="font-semibold">125</span>
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="text-muted-foreground">Subscriptions</span>
              <span className="font-semibold">6</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}