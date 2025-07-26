
"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function VendorSettingsPage() {
  const { toast } = useToast();
  
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(false);
  const [theme, setTheme] = useState("light");

  const handleSaveChanges = () => {
    toast({
      title: "Settings Saved",
      description: "Your new settings have been applied.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Settings</CardTitle>
        <CardDescription>Manage your application and notification settings.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="space-y-4">
            <h3 className="text-lg font-medium font-headline">Appearance</h3>
            <div className="flex items-center justify-between rounded-lg border p-4">
                 <div className="space-y-0.5">
                    <Label htmlFor="theme" className="text-base">Theme</Label>
                    <p className="text-sm text-muted-foreground">
                        Select a theme for your dashboard.
                    </p>
                </div>
                 <Select value={theme} onValueChange={setTheme}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select theme" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium font-headline">Notifications</h3>
           <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                    <Label htmlFor="email-notifications" className="text-base">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                        Receive email notifications for deal alerts and order updates.
                    </p>
                </div>
                <Switch
                    id="email-notifications"
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                />
            </div>
             <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                    <Label htmlFor="sms-alerts" className="text-base">SMS Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                        Get instant SMS alerts for critical updates (coming soon).
                    </p>
                </div>
                <Switch
                    id="sms-alerts"
                    checked={smsAlerts}
                    onCheckedChange={setSmsAlerts}
                    disabled
                />
            </div>
        </div>
        
        <Button onClick={handleSaveChanges}>Save Changes</Button>
      </CardContent>
    </Card>
  );
}
