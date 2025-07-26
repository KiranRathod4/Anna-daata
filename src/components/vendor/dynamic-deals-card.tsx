"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tag, Loader2, Star, CheckCircle } from "lucide-react";
import { getDynamicDealsAlerts, DynamicDealsAlertsOutput } from '@/ai/flows/dynamic-deals-alerts';
import { useToast } from "@/hooks/use-toast";
import { mockDynamicDealsInput } from '@/lib/data';
import { Skeleton } from '../ui/skeleton';

export function DynamicDealsCard() {
  const [deals, setDeals] = useState<DynamicDealsAlertsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGetDeals = async () => {
    setIsLoading(true);
    setDeals(null);
    try {
      const result = await getDynamicDealsAlerts(mockDynamicDealsInput);
      setDeals(result);
    } catch (error) {
      console.error("Error fetching dynamic deals:", error);
      toast({
        title: "Error",
        description: "Failed to fetch deals. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Tag className="w-6 h-6 text-accent" />
          <CardTitle className="font-headline">Bargain Hunter Agent</CardTitle>
        </div>
        <CardDescription>Your AI assistant for finding the best deals on ingredients.</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <ScrollArea className="h-72">
          {isLoading ? (
            <div className="space-y-4 p-1">
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
            </div>
          ) : deals ? (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground p-1">{deals.summary}</p>
              <Separator />
              {deals.alerts.map((alert) => (
                <div key={alert.itemId} className="p-1">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold">{alert.itemName}</p>
                    <Badge>₹{alert.price.toFixed(2)}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{alert.dealDescription}</p>
                   <div className="flex items-center justify-between text-xs text-muted-foreground mt-1">
                    <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" /> {alert.supplierRating}/5.0
                    </div>
                    {alert.isTrustedSupplier && (
                        <div className="flex items-center gap-1 text-green-600">
                           <CheckCircle className="w-3 h-3" /> Trusted Supplier
                        </div>
                    )}
                   </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-muted-foreground pt-12">
              Click the button to find the latest deals from trusted suppliers.
            </div>
          )}
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <Button onClick={handleGetDeals} disabled={isLoading} className="w-full" variant="secondary">
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Tag className="mr-2 h-4 w-4" />}
          {isLoading ? 'Hunting for Bargains...' : 'Find Deals Now'}
        </Button>
      </CardFooter>
    </Card>
  );
}
