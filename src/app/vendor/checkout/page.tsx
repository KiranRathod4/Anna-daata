"use client";

import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { useOrders } from "@/hooks/use-orders";

export default function CheckoutPage() {
  const { cart, total, clearCart } = useCart();
  const { addOrder } = useOrders();
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    // Redirect if cart is empty when the page loads
    if (cart.length === 0) {
      router.replace('/vendor/browse');
    }
  }, [cart, router]);

  const handleConfirmOrder = () => {
    addOrder(cart, total);
    toast({
      title: "Order Placed!",
      description: "Your order has been successfully placed. Thank you!",
    });
    clearCart();
    router.push('/vendor/orders');
  };

  // Prevent rendering if cart is empty to avoid flash of content
  if (cart.length === 0) {
    return null; 
  }

  return (
    <div className="flex flex-col gap-8 max-w-2xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold font-headline tracking-tight">Checkout</h1>
        <p className="text-muted-foreground">Please confirm your order details.</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
          <CardDescription>Here's what you're ordering.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {cart.map((item) => (
            <div key={item.id} className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                </div>
              </div>
              <p className="font-semibold">₹{(item.price * item.quantity).toFixed(2)}</p>
            </div>
          ))}
          <Separator />
          <div className="flex justify-between items-center text-lg font-bold">
            <span>Total</span>
            <span>₹{total.toFixed(2)}</span>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
            <Button className="w-full" size="lg" onClick={handleConfirmOrder}>Confirm Order</Button>
            <Button variant="outline" className="w-full" asChild>
                <Link href="/vendor/browse">Continue Shopping</Link>
            </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
