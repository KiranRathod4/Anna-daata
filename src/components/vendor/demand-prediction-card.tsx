"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Lightbulb, Loader2 } from "lucide-react";
import { demandPredictionAgent, DemandPredictionOutput } from '@/ai/flows/demand-prediction-agent';
import { useToast } from "@/hooks/use-toast";
import { mockDemandPredictionInput } from '@/lib/data';
import { Skeleton } from '../ui/skeleton';

export function DemandPredictionCard() {
  const [prediction, setPrediction] = useState<DemandPredictionOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

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
        description: "Failed to fetch demand prediction. Please try again.",
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
          <Lightbulb className="w-6 h-6 text-primary" />
          <CardTitle className="font-headline">Demand Predictor Agent</CardTitle>
        </div>
        <CardDescription>AI-powered suggestions for optimal reorder times and quantities.</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        {isLoading ? (
          <div className="space-y-2">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
          </div>
        ) : prediction ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Order By</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {prediction.reorderSuggestions.map((item) => (
                <TableRow key={item.itemId}>
                  <TableCell className="font-medium">{item.itemName}</TableCell>
                  <TableCell>{item.suggestedQuantity}</TableCell>
                  <TableCell>{new Date(item.suggestedOrderDate).toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center text-muted-foreground p-4">
            Click the button below to generate inventory suggestions.
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={handlePrediction} disabled={isLoading} className="w-full">
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Lightbulb className="mr-2 h-4 w-4" />}
          {isLoading ? 'Analyzing...' : 'Generate Reorder Suggestions'}
        </Button>
      </CardFooter>
    </Card>
  );
}
