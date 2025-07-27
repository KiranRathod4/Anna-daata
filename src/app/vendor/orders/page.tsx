"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useOrders } from "@/hooks/use-orders";

export default function VendorOrdersPage() {
  const { toast } = useToast();
  const { vendorOrders } = useOrders();

  const handleAction = (action: string, orderId: string) => {
    toast({
      title: `Action: ${action}`,
      description: `Action '${action}' was triggered for order ${orderId}. This is a placeholder.`,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>My Orders</CardTitle>
        <CardDescription>Review and track all your past and current orders.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Supplier</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Total</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vendorOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{order.supplierName}</TableCell>
                <TableCell>{order.date ? new Date(order.date).toLocaleDateString() : 'N/A'}</TableCell>
                <TableCell>
                  <Badge variant={order.status === 'Delivered' ? 'default' : 'secondary'} 
                    className={
                      order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      order.status === 'Confirmed' ? 'bg-blue-100 text-blue-800' :
                      order.status === 'Out for Delivery' ? 'bg-indigo-100 text-indigo-800' :
                      order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }>
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">₹{order.total.toFixed(2)}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleAction('View Details', order.id)}>View Details</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleAction('Leave a Review', order.id)}>Leave a Review</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleAction('Contact Supplier', order.id)}>Contact Supplier</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
