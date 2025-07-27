"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useProfile } from "@/hooks/use-profile";

export default function SupplierProfilePage() {
  const { toast } = useToast();
  const { supplierProfile, setSupplierProfile } = useProfile();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setSupplierProfile(prev => ({...prev, [id]: value}));
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
        <CardTitle>Supplier Profile</CardTitle>
        <CardDescription>Update your personal and business information.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="businessName">Business Name</Label>
          <Input id="businessName" value={supplierProfile.businessName} onChange={handleInputChange} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="name">Contact Person</Label>
          <Input id="name" value={supplierProfile.name} onChange={handleInputChange} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" value={supplierProfile.email} onChange={handleInputChange} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="address">Business Address</Label>
          <Input id="address" value={supplierProfile.address} onChange={handleInputChange} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="specialties">Specialties</Label>
          <Textarea id="specialties" value={supplierProfile.specialties || ""} onChange={handleInputChange} />
        </div>
        <Button onClick={handleSaveChanges}>Save Changes</Button>
      </CardContent>
    </Card>
  );
}
