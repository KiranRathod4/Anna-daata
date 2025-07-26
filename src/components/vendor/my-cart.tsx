"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCart } from "@/hooks/use-cart";
import { ShoppingBag, Trash2 } from "lucide-react";
import Image from 'next/image';
import { useToast } from "@/hooks/use-toast";

export function MyCart() {
  const { cart, removeFromCart, total, clearCart } = useCart();
  const { toast } = useToast();

  const handleCheckout = () => {
     if (cart.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Add items to your cart before checking out.",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Checkout Successful",
      description: "Your order has been placed.",
    });
    clearCart();
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingBag className="h-5 w-5" />
          <span className="sr-only">My Cart</span>
          {cart.length > 0 && (
            <Badge className="absolute -right-2 -top-2 h-5 w-5 justify-center p-0">{cart.reduce((acc, item) => acc + (item.quantity ?? 1), 0)}</Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle>My Cart</SheetTitle>
          <SheetDescription>
            Review your items before proceeding to checkout.
          </SheetDescription>
        </SheetHeader>
        <Separator />
        <div className="flex-1">
          {cart.length > 0 ? (
            <ScrollArea className="h-full pr-4">
              <div className="flex flex-col gap-4 py-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    <Image src={item.imageUrl} alt={item.name} width={64} height={64} className="rounded-md object-cover"/>
                    <div className="flex-1">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">Quantity: {item.quantity ?? 1}</p>
                       <p className="text-sm font-semibold">₹{(item.price * (item.quantity ?? 1)).toFixed(2)}</p>
                    </div>
                     <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                     </Button>
                  </div>
                ))}
              </div>
            </ScrollArea>
          ) : (
            <div className="flex h-full items-center justify-center">
              <p className="text-muted-foreground">Your cart is empty.</p>
            </div>
          )}
        </div>
        <Separator />
        <SheetFooter className="space-y-4">
           <div className="flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span>₹{total.toFixed(2)}</span>
          </div>
          <Button className="w-full" onClick={handleCheckout}>Proceed to Checkout</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
