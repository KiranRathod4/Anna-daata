import { DynamicDealsCard } from "@/components/vendor/dynamic-deals-card";
import { DemandPredictionCard } from "@/components/vendor/demand-prediction-card";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { vendorRecentOrders, vendorStats } from "@/lib/data";
import { ShoppingCart, PackageCheck, Star, Clock } from "lucide-react";

export default function VendorDashboard() {
  return (
    <div className="flex flex-col gap-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{vendorStats.totalOrders}</div>
            <p className="text-xs text-muted-foreground">+5 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Orders</CardTitle>
            <PackageCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{vendorStats.completedOrders}</div>
            <p className="text-xs text-muted-foreground">2 pending</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Favorite Supplier</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold truncate">{vendorStats.favoriteSupplier}</div>
            <p className="text-xs text-muted-foreground">Based on order frequency</p>
          </CardContent>
        </Card>
         <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Last Order</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{vendorStats.lastOrderDays} days ago</div>
            <p className="text-xs text-muted-foreground">On {new Date(Date.now() - vendorStats.lastOrderDays * 86400000).toLocaleDateString()}</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-8 lg:grid-cols-2">
        <DynamicDealsCard />
        <DemandPredictionCard />
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Recent Order History</CardTitle>
          <CardDescription>A quick look at your most recent orders.</CardDescription>
        </CardHeader>
        <CardContent>
           <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Supplier</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vendorRecentOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.supplierName}</TableCell>
                  <TableCell>₹{order.total.toFixed(2)}</TableCell>
                  <TableCell>
                     <Badge variant={order.status === 'Delivered' ? 'default' : 'secondary'} 
                      className={
                        order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                        order.status === 'Confirmed' ? 'bg-blue-100 text-blue-800' :
                        order.status === 'Out for Delivery' ? 'bg-indigo-100 text-indigo-800' :
                        'bg-green-100 text-green-800'
                      }>
                      {order.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
