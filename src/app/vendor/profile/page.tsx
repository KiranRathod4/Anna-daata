
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useProfile } from "@/hooks/use-profile";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";
import type { Vendor } from "@/lib/types";

export default function VendorProfilePage() {
  const { toast } = useToast();
  const { vendorProfile, setVendorProfile, loading } = useProfile();
  const [formData, setFormData] = useState<Vendor | null>(null);

  useEffect(() => {
    if (vendorProfile) {
      setFormData(vendorProfile);
    }
  }, [vendorProfile]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!formData) return;
    const { id, value } = e.target;
    setFormData(prev => ({...prev!, [id]: value}));
  };

  const handleSaveChanges = async () => {
    if (!formData) return;
    await setVendorProfile(formData);
    toast({
      title: "Profile Updated",
      description: "Your changes have been saved successfully.",
    });
  };

  if (loading || !formData) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-8 w-1/4" />
          <Skeleton className="h-4 w-1/2" />
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Skeleton className="h-4 w-1/6" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-1/6" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-1/6" />
            <Skeleton className="h-10 w-full" />
          </div>
          <Skeleton className="h-10 w-32" />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>My Profile</CardTitle>
        <CardDescription>Update your personal and business information.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="stallName">Stall Name</Label>
          <Input id="stallName" value={formData.stallName} onChange={handleInputChange} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="name">Owner Name</Label>
          <Input id="name" value={formData.name} onChange={handleInputChange} />
        </div>
         <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" value={formData.email} onChange={handleInputChange} readOnly disabled />
        </div>
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input id="location" value={formData.location} onChange={handleInputChange} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="foodType">Food Type / Cuisine</Label>
          <Input id="foodType" value={formData.foodType} onChange={handleInputChange} />
        </div>
        <Button onClick={handleSaveChanges}>Save Changes</Button>
      </CardContent>
    </Card>
  );
}
