"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Lightbulb, ShoppingCart } from "lucide-react";
import { demandPredictionAgent, DemandPredictionOutput } from '@/ai/flows/demand-prediction-agent';
import { useToast } from "@/hooks/use-toast";
import { mockDemandPredictionInput } from '@/lib/data';
import { Skeleton } from '@/components/ui/skeleton';
import { useCart } from '@/hooks/use-cart';
import { useListings } from '@/hooks/use-listings';

export default function ReorderPage() {
  const [prediction, setPrediction] = useState<DemandPredictionOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { addToCart } = useCart();
  const { products: allProducts } = useListings();


  const handlePrediction = async () => {
    setIsLoading(true);
    setPrediction(null);
    try {
      const result = await demandPredictionAgent(mockDemandPredictionInput);
      setPrediction(result);
    } catch (error) {
      console.error("Error fetching demand prediction:", error);
      toast({
        title: "Error",
        description: "Failed to fetch reorder suggestions. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToCart = (itemName: string, quantity: number) => {
    const product = allProducts.find(p => p.name === itemName);
    if (product) {
      addToCart(product, quantity);
      toast({
        title: "Added to Cart",
        description: `${quantity} ${product.unit}(s) of ${itemName} has been added to your cart for reordering.`,
      });
    } else {
       toast({
        title: "Item not found",
        description: `Could not find "${itemName}" in the product list.`,
        variant: "destructive",
      });
    }
  };

  const getSupplierForItem = (itemName: string) => {
    const product = allProducts.find(p => p.name === itemName);
    return product ? product.supplierName : 'Unknown';
  };

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold font-headline tracking-tight">Smart Reorder Assistant</h1>
        <p className="text-muted-foreground">Get AI-powered suggestions on what and when to reorder.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Reorder Suggestions</CardTitle>
          <CardDescription>
            Based on your past sales and inventory levels, here’s what we recommend you reorder soon.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!prediction && !isLoading && (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">Click the button below to analyze your inventory and generate suggestions.</p>
              <Button onClick={handlePrediction}>
                <Lightbulb className="mr-2 h-4 w-4" />
                Generate Suggestions
              </Button>
            </div>
          )}
          {isLoading ? (
            <div className="space-y-2">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          ) : prediction && prediction.reorderSuggestions.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item Name</TableHead>
                  <TableHead>Supplier</TableHead>
                  <TableHead>Suggested Quantity</TableHead>
                  <TableHead>Suggested Order Date</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {prediction.reorderSuggestions.map((item) => (
                  <TableRow key={item.itemId}>
                    <TableCell className="font-medium">{item.itemName}</TableCell>
                    <TableCell>{getSupplierForItem(item.itemName)}</TableCell>
                    <TableCell>{item.suggestedQuantity}</TableCell>
                    <TableCell>{new Date(item.suggestedOrderDate).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <Button size="sm" onClick={() => handleAddToCart(item.itemName, item.suggestedQuantity)}>
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Add to Cart
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : prediction && prediction.reorderSuggestions.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No reorder suggestions at this time. Looks like your inventory is well-stocked!</p>
            </div>
          ) : null }
        </CardContent>
      </Card>
    </div>
  );
}
