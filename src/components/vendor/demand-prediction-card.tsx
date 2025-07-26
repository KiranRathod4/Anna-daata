"use client";

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lightbulb, ArrowRight } from "lucide-react";

export function DemandPredictionCard() {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Lightbulb className="w-6 h-6 text-primary" />
          <CardTitle className="font-headline">Smart Reorder Assistant</CardTitle>
        </div>
        <CardDescription>Get AI-powered suggestions for optimal reorder times and quantities to prevent stockouts and reduce spoilage.</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="text-center text-muted-foreground p-4">
          Never run out of your key ingredients again. Let our AI analyze your order history and suggest what to buy and when.
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link href="/vendor/reorder">
            View Reorder Suggestions
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
