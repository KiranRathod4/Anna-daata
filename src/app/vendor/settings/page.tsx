"use client";

import { useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useSettings } from '@/hooks/use-settings';

export default function VendorSettingsPage() {
  const { toast } = useToast();
  const { settings, setSettings } = useSettings();

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");

    if (settings.theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(settings.theme);
  }, [settings.theme]);

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
                 <Select value={settings.theme} onValueChange={(theme) => setSettings(s => ({...s, theme: theme as 'light' | 'dark' | 'system'}))}>
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
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) => setSettings(s => ({...s, emailNotifications: checked}))}
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
                    checked={settings.smsAlerts}
                    onCheckedChange={(checked) => setSettings(s => ({...s, smsAlerts: checked}))}
                    disabled
                />
            </div>
        </div>
        
        <Button onClick={handleSaveChanges}>Save Changes</Button>
      </CardContent>
    </Card>
  );
}
