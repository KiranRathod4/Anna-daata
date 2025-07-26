import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function SupplierProfilePage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Supplier Profile</CardTitle>
        <CardDescription>Update your personal and business information.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="business-name">Business Name</Label>
          <Input id="business-name" defaultValue="Fresh Veggies Co." />
        </div>
        <div className="space-y-2">
          <Label htmlFor="contact-person">Contact Person</Label>
          <Input id="contact-person" defaultValue="Ravi Kumar" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input id="phone" type="tel" defaultValue="+91 98765 43210" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="address">Business Address</Label>
          <Input id="address" defaultValue="123 Market Road, Bengaluru" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="specialties">Specialties</Label>
          <Textarea id="specialties" defaultValue="Fresh organic vegetables, leafy greens, and seasonal fruits." />
        </div>
        <Button>Save Changes</Button>
      </CardContent>
    </Card>
  );
}
