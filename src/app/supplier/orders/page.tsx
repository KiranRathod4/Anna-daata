"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { useOrders } from "@/hooks/use-orders";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

// Define Order type
type Order = {
  id: string;
  date: string;
  vendorName: string;
  vendorEmail?: string;
  vendorPhone?: string;
  status: string;
  total: number;
};

export default function SupplierOrdersPage() {
  const { allSupplierOrders } = useOrders();

  // Step 1: Local state copy
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [dialogType, setDialogType] = useState<"details" | "status" | "contact" | null>(null);

  useEffect(() => {
    // Clone the orders on first load
    setOrders(allSupplierOrders);
  }, [allSupplierOrders]);

  // Open Dialog
  const openDialog = (order: Order, type: "details" | "status" | "contact") => {
    setSelectedOrder(order);
    setDialogType(type);
  };

  // Close Dialog
  const closeDialog = () => {
    setSelectedOrder(null);
    setDialogType(null);
  };

  // Step 2: Handle Status Change & Update Local Order List
  const handleStatusChange = (newStatus: string) => {
    if (!selectedOrder) return;

    const updatedOrders = orders.map((order) =>
      order.id === selectedOrder.id ? { ...order, status: newStatus } : order
    );

    setOrders(updatedOrders);
    setSelectedOrder({ ...selectedOrder, status: newStatus });
  };

  return (
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
              <TableHead><span className="sr-only">Actions</span></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                <TableCell>{order.vendorName}</TableCell>
                <TableCell>
                  <Badge
                    variant={order.status === "Delivered" ? "default" : "secondary"}
                    className={
                      order.status === "Pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : order.status === "Confirmed"
                        ? "bg-blue-100 text-blue-800"
                        : order.status === "Out for Delivery"
                        ? "bg-indigo-100 text-indigo-800"
                        : order.status === "Delivered"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }
                  >
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right font-sans"
                  style={{ fontFamily: "Segoe UI, Roboto, Arial, sans-serif" }}>
                  ₹{order.total.toFixed(2)}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => openDialog(order, "details")}>
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => openDialog(order, "status")}>
                        Update Status
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => openDialog(order, "contact")}>
                        Contact Vendor
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Dialog for all three actions */}
        {selectedOrder && dialogType && (
          <Dialog open={!!dialogType} onOpenChange={closeDialog}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {dialogType === "details"
                    ? `Order Details - ${selectedOrder.id}`
                    : dialogType === "status"
                    ? `Update Status - ${selectedOrder.id}`
                    : `Contact Vendor - ${selectedOrder.vendorName}`}
                </DialogTitle>
                <DialogDescription>
                  {dialogType === "details" && (
                    <div className="space-y-2">
                      <p><strong>Date:</strong> {new Date(selectedOrder.date).toLocaleDateString()}</p>
                      <p><strong>Vendor:</strong> {selectedOrder.vendorName}</p>
                      <p><strong>Status:</strong> {selectedOrder.status}</p>
                      <p className="font-sans"><strong>Total:</strong> ₹{selectedOrder.total.toFixed(2)}</p>
                    </div>
                  )}

                  {dialogType === "status" && (
                    <div className="space-y-3">
                      <label htmlFor="status" className="font-medium">Change Order Status:</label>
                      <select
                        id="status"
                        value={selectedOrder.status}
                        onChange={(e) => handleStatusChange(e.target.value)}
                        className="border rounded p-2 w-full"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Out for Delivery">Out for Delivery</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>
                  )}

                  {dialogType === "contact" && (
                    <div className="space-y-2">
                      <p><strong>Email:</strong> {selectedOrder.vendorEmail || "vendor@example.com"}</p>
                      <p><strong>Phone:</strong> {selectedOrder.vendorPhone || "+91-0000000000"}</p>
                    </div>
                  )}
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        )}
      </CardContent>
    </Card>
  );
}
