"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export default function VendorProfilePage() {
  const { toast } = useToast();

  const handleSaveChanges = () => {
    toast({
      title: "Profile Updated",
      description: "Your changes have been saved successfully.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>My Profile</CardTitle>
        <CardDescription>Update your personal and business information.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="stall-name">Stall Name</Label>
          <Input id="stall-name" defaultValue="Mumbai Chaat House" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="owner-name">Owner Name</Label>
          <Input id="owner-name" defaultValue="Priya Sharma" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input id="phone" type="tel" defaultValue="+91 87654 32109" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="address">Location</Label>
          <Input id="address" defaultValue="Juhu Beach, Mumbai" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="food-type">Food Type / Cuisine</Label>
          <Input id="food-type" defaultValue="Chaat, Vada Pav, Dosa" />
        </div>
        <Button onClick={handleSaveChanges}>Save Changes</Button>
      </CardContent>
    </Card>
  );
}
