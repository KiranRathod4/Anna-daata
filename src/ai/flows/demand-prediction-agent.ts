'use server';

/**
 * @fileOverview This file defines a Genkit flow for the Demand Prediction Agent.
 *
 * It analyzes a vendor's past order history to suggest optimal reorder times and quantities for frequently used raw materials.
 *
 * - demandPredictionAgent - The function to trigger the demand prediction flow.
 * - DemandPredictionInput - The input type for the demandPredictionAgent function.
 * - DemandPredictionOutput - The return type for the demandPredictionAgent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';


const DemandPredictionInputSchema = z.object({
  vendorId: z.string().describe('The ID of the vendor.'),
  orderHistory: z.array(
    z.object({
      orderId: z.string(),
      orderTimestamp: z.string().datetime(),
      orderItems: z.array(
        z.object({
          itemId: z.string(),
          quantity: z.number(),
          price: z.number(),
        })
      ),
      totalAmount: z.number(),
    })
  ).describe('The order history of the vendor.'),
});

export type DemandPredictionInput = z.infer<typeof DemandPredictionInputSchema>;

const DemandPredictionOutputSchema = z.object({
  reorderSuggestions: z.array(
    z.object({
      itemId: z.string().describe('The ID of the item to reorder.'),
      itemName: z.string().describe('The name of the item to reorder.'),
      suggestedQuantity: z.number().describe('The suggested quantity to reorder.'),
      suggestedOrderDate: z.string().datetime().describe('The suggested date to place the order.'),
    })
  ).describe('The reorder suggestions for the vendor.'),
});

export type DemandPredictionOutput = z.infer<typeof DemandPredictionOutputSchema>;

export async function demandPredictionAgent(input: DemandPredictionInput): Promise<DemandPredictionOutput> {
  return demandPredictionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'demandPredictionPrompt',
  input: { schema: DemandPredictionInputSchema },
  output: { schema: DemandPredictionOutputSchema },
  prompt: `You are an AI assistant designed to help street food vendors manage their inventory efficiently. Analyze the vendor's order history and provide reorder suggestions.

Order History:
{{#each orderHistory}}
  Order ID: {{orderId}}
  Timestamp: {{orderTimestamp}}
  Total Amount: {{totalAmount}}
  Items:
  {{#each orderItems}}
    Item ID: {{itemId}}
    Quantity: {{quantity}}
    Price: {{price}}
  {{/each}}
{{/each}}

Based on this order history, provide reorder suggestions for the vendor. Include the item ID, suggested quantity, and suggested order date for each item.

Format your output as a JSON array of reorder suggestions.
`, 
});

const demandPredictionFlow = ai.defineFlow(
  {
    name: 'demandPredictionFlow',
    inputSchema: DemandPredictionInputSchema,
    outputSchema: DemandPredictionOutputSchema,
  },
  async input => {
    //In the future, this could call an external service or perform more complex logic.
    const { output } = await prompt(input);
    return output!;
  }
);
