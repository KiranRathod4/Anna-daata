
"use client";

import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Star, Search, ShoppingCart } from "lucide-react";
import { useListings, ListingsProvider } from "@/hooks/use-listings";
import { useToast } from '@/hooks/use-toast';
import { useCart } from '@/hooks/use-cart';
import type { Product } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

function BrowsePageComponent() {
  const [searchTerm, setSearchTerm] = useState('');
  const { products: allProducts, loading } = useListings();
  const { toast } = useToast();
  // Note: We can't use useCart() here because this page is not within the vendor layout.
  // The add to cart button will just show a toast. A real implementation would prompt login.

  const handleAddToCart = (product: Product) => {
    // addToCart(product);
    toast({
      title: "Please Log In",
      description: `You must be logged in as a vendor to add items to your cart.`,
    });
  };

  const filteredProducts = allProducts.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold font-headline tracking-tight">Browse Ingredients</h1>
        <p className="text-muted-foreground">Find the best quality materials from trusted suppliers.</p>
      </div>
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search for vegetables, spices, dairy..."
          className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {loading ? (
          Array.from({ length: 8 }).map((_, index) => (
             <Card key={index} className="overflow-hidden shadow-md flex flex-col">
              <CardContent className="p-4 flex-grow">
                 <Skeleton className="h-5 w-3/4 mb-2" />
                 <Skeleton className="h-4 w-1/2" />
                 <Skeleton className="h-6 w-1/4 mt-2" />
              </CardContent>
              <CardFooter className="p-4 bg-muted/50">
                 <Skeleton className="h-10 w-full" />
              </CardFooter>
            </Card>
          ))
        ) : filteredProducts.map((product) => (
          <Card key={product.id} className="overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col">
            <CardContent className="p-4 flex-grow">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg font-headline">{product.name}</CardTitle>
                  <CardDescription>by {product.supplierName}</CardDescription>
                </div>
                 <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className="text-sm font-bold">{product.supplierRating.toFixed(1)}</span>
                </div>
              </div>
              <p className="text-xl font-semibold mt-4">₹{product.price.toFixed(2)} <span className="text-sm font-normal text-muted-foreground">/ {product.unit}</span></p>
            </CardContent>
            <CardFooter className="p-4 bg-muted/50">
              <Button className="w-full gap-2" onClick={() => handleAddToCart(product)}>
                <ShoppingCart className="w-4 h-4"/>
                Add to Cart
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default function BrowsePage() {
  return (
    <ListingsProvider>
      <BrowsePageComponent />
    </ListingsProvider>
  )
}
