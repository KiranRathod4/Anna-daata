"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CircleDollarSign, Package, Star, TrendingUp } from "lucide-react";
import { recentReviews } from "@/lib/data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useOrders } from "@/hooks/use-orders";
import { useEffect, useState } from "react";
import { useProfile } from "@/hooks/use-profile";
import { useListings } from "@/hooks/use-listings";

export default function SupplierDashboard() {
  const { supplierOrders } = useOrders();
  const { supplierProfile } = useProfile();
  const { products } = useListings();

  const [stats, setStats] = useState({
    totalRevenue: 0,
    newOrders: 0,
    reputation: 4.8,
    reviewCount: 120,
    topSellingItem: 'N/A',
  });

  useEffect(() => {
    const totalRevenue = supplierOrders.reduce((acc, order) => acc + order.total, 0);
    const newOrders = supplierOrders.length;
    
    // In a real app, top selling item would be calculated from order items.
    // For now, we'll just show the first product if available.
    const topSellingItem = products.length > 0 ? products[0].name : 'N/A';
    
    setStats(prevStats => ({
      ...prevStats,
      totalRevenue: totalRevenue,
      newOrders: newOrders,
      topSellingItem: topSellingItem,
    }));

  }, [supplierOrders, products]);

  const recentOrders = supplierOrders.slice(0, 3);

  return (
    <div className="flex flex-col gap-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <CircleDollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{stats.totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.newOrders}</div>
            <p className="text-xs text-muted-foreground">+180.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reputation</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{supplierProfile.rating.toFixed(1)}/5.0</div>
            <p className="text-xs text-muted-foreground">Based on {supplierProfile.reviewCount} reviews</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Selling Item</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold truncate">{stats.topSellingItem}</div>
            <p className="text-xs text-muted-foreground">Most popular this month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>A list of your most recent orders.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Vendor</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>
                      <div className="font-medium">{order.vendorName}</div>
                      <div className="text-sm text-muted-foreground">{order.id}</div>
                    </TableCell>
                    <TableCell>₹{order.total.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge variant={order.status === 'Delivered' ? 'default' : 'secondary'} className={order.status === 'Pending' ? 'bg-yellow-200 text-yellow-800' : order.status === 'Out for Delivery' ? 'bg-blue-200 text-blue-800' : 'bg-green-200 text-green-800'}>{order.status}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Reviews</CardTitle>
            <CardDescription>Latest feedback from your customers.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {recentReviews.map((review) => (
              <div key={review.id} className="flex items-start gap-4">
                <Avatar>
                  <AvatarImage src={review.avatarUrl} alt={review.vendorName} />
                  <AvatarFallback>{review.vendorName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold">{review.vendorName}</p>
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-bold">{review.rating.toFixed(1)}</span>
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400"/>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{review.comment}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
