
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useProfile } from "@/hooks/use-profile";
import { useEffect, useState } from "react";
import type { Supplier } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";

export default function SupplierProfilePage() {
  const { toast } = useToast();
  const { supplierProfile, setSupplierProfile, loading } = useProfile();
  const [formData, setFormData] = useState<Supplier | null>(null);

  useEffect(() => {
    if (supplierProfile) {
      setFormData(supplierProfile);
    }
  }, [supplierProfile]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!formData) return;
    const { id, value } = e.target;
    setFormData(prev => ({...prev!, [id]: value}));
  };

  const handleSaveChanges = async () => {
    if (!formData) return;
    await setSupplierProfile(formData);
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
        <CardTitle>Supplier Profile</CardTitle>
        <CardDescription>Update your personal and business information.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="businessName">Business Name</Label>
          <Input id="businessName" value={formData.businessName} onChange={handleInputChange} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="name">Contact Person</Label>
          <Input id="name" value={formData.name} onChange={handleInputChange} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" value={formData.email} onChange={handleInputChange} readOnly disabled />
        </div>
        <div className="space-y-2">
          <Label htmlFor="address">Business Address</Label>
          <Input id="address" value={formData.address} onChange={handleInputChange} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="specialties">Specialties</Label>
          <Textarea id="specialties" value={formData.specialties || ""} onChange={handleInputChange} />
        </div>
        <Button onClick={handleSaveChanges}>Save Changes</Button>
      </CardContent>
    </Card>
  );
}
