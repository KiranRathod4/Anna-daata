
"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { useOrders } from "@/hooks/use-orders";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useState } from "react";
import { Order } from "@/lib/types";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Timestamp } from "firebase/firestore";

export default function SupplierOrdersPage() {
  const { supplierOrders, updateSupplierOrderStatus } = useOrders();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const { toast } = useToast();

  const handleOpenDialog = (order: Order, type: 'view' | 'update') => {
    setSelectedOrder(order);
    if (type === 'view') setIsViewOpen(true);
    if (type === 'update') setIsUpdateOpen(true);
  };

  const handleContact = () => {
    toast({
      title: "Contact Vendor",
      description: "This would open an email client or messaging system.",
    });
  };

  const handleStatusChange = (status: "Pending" | "Confirmed" | "Out for Delivery" | "Delivered" | "Cancelled") => {
    if (selectedOrder) {
      updateSupplierOrderStatus(selectedOrder.id, status);
      toast({
        title: "Order Status Updated",
        description: `Order ${selectedOrder.id.substring(0,7)} is now ${status}.`,
      });
      setIsUpdateOpen(false);
    }
  }
  
  const formatDate = (timestamp: any) => {
    if (timestamp instanceof Timestamp) {
      return timestamp.toDate().toLocaleDateString();
    }
    if (typeof timestamp === 'string') {
        return new Date(timestamp).toLocaleDateString();
    }
    return 'N/A';
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Incoming Orders</CardTitle>
          <CardDescription>View and manage all orders from vendors.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Vendor</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {supplierOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id.substring(0,7)}</TableCell>
                  <TableCell>{formatDate(order.createdAt)}</TableCell>
                  <TableCell>{order.vendorName}</TableCell>
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
                        <DropdownMenuItem onClick={() => handleOpenDialog(order, 'view')}>View Details</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleOpenDialog(order, 'update')}>Update Status</DropdownMenuItem>
                        <DropdownMenuItem onClick={handleContact}>Contact Vendor</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      {/* View Details Dialog */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Order Details: {selectedOrder?.id.substring(0,7)}</DialogTitle>
            <DialogDescription>
              From {selectedOrder?.vendorName} on {selectedOrder ? formatDate(selectedOrder.createdAt) : ''}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <p><strong>Status:</strong> {selectedOrder?.status}</p>
            <div>
                <strong>Items:</strong>
                <ul>
                    {selectedOrder?.items.map(item => (
                        <li key={item.productId}>{item.name} - {item.quantity} x ₹{item.price.toFixed(2)}</li>
                    ))}
                </ul>
            </div>
            <Separator />
            <div className="flex justify-between font-bold">
              <p>Total:</p>
              <p>₹{selectedOrder?.total.toFixed(2)}</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Update Status Dialog */}
      <Dialog open={isUpdateOpen} onOpenChange={setIsUpdateOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Status for {selectedOrder?.id.substring(0,7)}</DialogTitle>
            <DialogDescription>
              Select the new status for this order. The vendor will be notified.
            </DialogDescription>
          </DialogHeader>
           <div className="py-4">
            <Select onValueChange={(value) => handleStatusChange(value as Order['status'])} defaultValue={selectedOrder?.status}>
              <SelectTrigger>
                <SelectValue placeholder="Select a status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Confirmed">Confirmed</SelectItem>
                <SelectItem value="Out for Delivery">Out for Delivery</SelectItem>
                <SelectItem value="Delivered">Delivered</SelectItem>
                <SelectItem value="Cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
