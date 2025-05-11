import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  User, 
  Settings, 
  Bell, 
  CreditCard, 
  LogOut, 
  Mail, 
  Phone, 
  Shield, 
  Upload
} from "lucide-react";

export default function Profile() {
  const [name, setName] = useState("Rahul Sharma");
  const [email, setEmail] = useState("rahul@example.com");
  const [phone, setPhone] = useState("+91 9876543210");
  
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl md:text-3xl font-bold font-heading mb-6">Profile</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left sidebar with profile summary */}
        <Card className="md:col-span-1 bg-background border border-border/40 shadow-sm">
          <CardContent className="p-6 flex flex-col items-center">
            <Avatar className="h-24 w-24 mb-4">
              <AvatarImage src="/avatar.png" alt="Profile" />
              <AvatarFallback className="bg-primary/10 text-primary text-lg">RS</AvatarFallback>
            </Avatar>
            
            <h2 className="text-xl font-bold text-center">{name}</h2>
            <p className="text-muted-foreground text-center mb-4">{email}</p>
            
            <div className="w-full mt-4">
              <Button variant="outline" className="w-full flex items-center justify-center mb-2">
                <Upload className="h-4 w-4 mr-2" />
                <span>Change Avatar</span>
              </Button>
              
              <Button variant="destructive" className="w-full flex items-center justify-center">
                <LogOut className="h-4 w-4 mr-2" />
                <span>Sign Out</span>
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Main content area with tabbed interface */}
        <div className="md:col-span-2">
          <Tabs defaultValue="personal">
            <TabsList className="w-full mb-6">
              <TabsTrigger value="personal" className="flex-1">
                <User className="h-4 w-4 mr-2" />
                <span>Personal</span>
              </TabsTrigger>
              <TabsTrigger value="security" className="flex-1">
                <Shield className="h-4 w-4 mr-2" />
                <span>Security</span>
              </TabsTrigger>
              <TabsTrigger value="payment" className="flex-1">
                <CreditCard className="h-4 w-4 mr-2" />
                <span>Payment</span>
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex-1">
                <Bell className="h-4 w-4 mr-2" />
                <span>Notifications</span>
              </TabsTrigger>
            </TabsList>
            
            {/* Personal Information */}
            <TabsContent value="personal">
              <Card className="bg-background border border-border/40 shadow-sm">
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Update your personal details here</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input 
                        id="name" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="displayName">Display Name</Label>
                      <Input 
                        id="displayName" 
                        defaultValue="Rahul" 
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input 
                      id="phone" 
                      type="tel" 
                      value={phone} 
                      onChange={(e) => setPhone(e.target.value)} 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="currency">Default Currency</Label>
                    <Input 
                      id="currency" 
                      defaultValue="INR (₹)" 
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="ml-auto">Save Changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            {/* Security Tab */}
            <TabsContent value="security">
              <Card className="bg-background border border-border/40 shadow-sm">
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>Manage your account security</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Change Password</h3>
                    
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input id="currentPassword" type="password" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input id="newPassword" type="password" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input id="confirmPassword" type="password" />
                    </div>
                    
                    <Button>Update Password</Button>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Enable 2FA</p>
                        <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                      </div>
                      <Switch id="2fa" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Payment Tab */}
            <TabsContent value="payment">
              <Card className="bg-background border border-border/40 shadow-sm">
                <CardHeader>
                  <CardTitle>Payment Methods</CardTitle>
                  <CardDescription>Manage your payment options</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center p-4 border rounded-lg">
                      <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                        <CreditCard className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">HDFC Bank Credit Card</p>
                        <p className="text-sm text-muted-foreground">Ending with 4242</p>
                      </div>
                      <Button variant="outline" size="sm">Edit</Button>
                    </div>
                    
                    <div className="flex items-center p-4 border rounded-lg">
                      <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                        <CreditCard className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">SBI Debit Card</p>
                        <p className="text-sm text-muted-foreground">Ending with 8756</p>
                      </div>
                      <Button variant="outline" size="sm">Edit</Button>
                    </div>
                    
                    <Button className="w-full">
                      <CreditCard className="h-4 w-4 mr-2" />
                      <span>Add New Payment Method</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Notifications Tab */}
            <TabsContent value="notifications">
              <Card className="bg-background border border-border/40 shadow-sm">
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>Control how you receive notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Expense Reminders</p>
                        <p className="text-sm text-muted-foreground">Receive reminders about upcoming bill payments</p>
                      </div>
                      <Switch id="expenseReminders" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Budget Alerts</p>
                        <p className="text-sm text-muted-foreground">Get notified when you're close to budget limits</p>
                      </div>
                      <Switch id="budgetAlerts" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Monthly Reports</p>
                        <p className="text-sm text-muted-foreground">Receive monthly summary of your finances</p>
                      </div>
                      <Switch id="monthlyReports" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Security Alerts</p>
                        <p className="text-sm text-muted-foreground">Get notified about suspicious activities</p>
                      </div>
                      <Switch id="securityAlerts" defaultChecked />
                    </div>
                    
                    <div className="space-y-2 mt-6">
                      <Label htmlFor="emailNotifications">Email for Notifications</Label>
                      <div className="flex items-center gap-2">
                        <Input id="emailNotifications" defaultValue={email} />
                        <Button variant="outline" size="icon">
                          <Mail className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phoneNotifications">Phone for SMS Alerts</Label>
                      <div className="flex items-center gap-2">
                        <Input id="phoneNotifications" defaultValue={phone} />
                        <Button variant="outline" size="icon">
                          <Phone className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="ml-auto">Save Preferences</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}