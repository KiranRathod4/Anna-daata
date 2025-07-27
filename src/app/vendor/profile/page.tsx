"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useProfile } from "@/hooks/use-profile";

export default function VendorProfilePage() {
  const { toast } = useToast();
  const { vendorProfile, setVendorProfile } = useProfile();
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setVendorProfile(prev => ({...prev, [id]: value}));
  };

  const handleSaveChanges = () => {
    // The state is already updated on change, and the hook persists it.
    // This button just provides user feedback.
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
          <Label htmlFor="stallName">Stall Name</Label>
          <Input id="stallName" value={vendorProfile.stallName} onChange={handleInputChange} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="name">Owner Name</Label>
          <Input id="name" value={vendorProfile.name} onChange={handleInputChange} />
        </div>
         <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" value={vendorProfile.email} onChange={handleInputChange} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input id="location" value={vendorProfile.location} onChange={handleInputChange} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="foodType">Food Type / Cuisine</Label>
          <Input id="foodType" value={vendorProfile.foodType} onChange={handleInputChange} />
        </div>
        <Button onClick={handleSaveChanges}>Save Changes</Button>
      </CardContent>
    </Card>
  );
}
