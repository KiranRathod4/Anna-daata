"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export default function VendorProfilePage() {
  const { toast } = useToast();
  
  const [stallName, setStallName] = useState("Mumbai Chaat House");
  const [ownerName, setOwnerName] = useState("Priya Sharma");
  const [phone, setPhone] = useState("+91 87654 32109");
  const [location, setLocation] = useState("Juhu Beach, Mumbai");
  const [foodType, setFoodType] = useState("Chaat, Vada Pav, Dosa");

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
          <Input id="stall-name" value={stallName} onChange={(e) => setStallName(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="owner-name">Owner Name</Label>
          <Input id="owner-name" value={ownerName} onChange={(e) => setOwnerName(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="address">Location</Label>
          <Input id="address" value={location} onChange={(e) => setLocation(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="food-type">Food Type / Cuisine</Label>
          <Input id="food-type" value={foodType} onChange={(e) => setFoodType(e.target.value)} />
        </div>
        <Button onClick={handleSaveChanges}>Save Changes</Button>
      </CardContent>
    </Card>
  );
}
