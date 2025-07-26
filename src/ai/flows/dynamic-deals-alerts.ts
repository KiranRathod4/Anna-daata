'use server';

/**
 * @fileOverview Implements the Dynamic Deals Alerts flow for vendors, alerting them to special deals or significantly better prices from trusted suppliers.
 *
 * - getDynamicDealsAlerts - A function that handles the dynamic deals alerts process.
 * - DynamicDealsAlertsInput - The input type for the getDynamicDealsAlerts function.
 * - DynamicDealsAlertsOutput - The return type for the getDynamicDealsAlerts function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DynamicDealsAlertsInputSchema = z.object({
  vendorId: z.string().describe('The ID of the vendor.'),
  currentSupplierIds: z
    .array(z.string())
    .describe('The list of IDs of the vendor\'s current suppliers.'),
  frequentlyPurchasedItemNames: z
    .array(z.string())
    .describe('List of names of frequently purchased items by the vendor.'),
  recentOrderHistory: z.string().describe('The recent order history of the vendor.'),
});
export type DynamicDealsAlertsInput = z.infer<typeof DynamicDealsAlertsInputSchema>;

const DynamicDealsAlertsOutputSchema = z.object({
  alerts: z.array(
    z.object({
      itemId: z.string().describe('The ID of the item on offer.'),
      supplierId: z.string().describe('The ID of the supplier offering the deal.'),
      itemName: z.string().describe('The name of the item on offer.'),
      dealDescription: z.string().describe('A description of the deal being offered.'),
      price: z.number().describe('Price of the item in the deal'),
      isTrustedSupplier: z
        .boolean()
        .describe('Whether the supplier is currently trusted by the vendor.'),
      supplierRating: z.number().describe('Average supplier rating (1-5 stars)'),
    })
  ),
  summary: z.string().describe('A summary of the deals and recommendations'),
});
export type DynamicDealsAlertsOutput = z.infer<typeof DynamicDealsAlertsOutputSchema>;

export async function getDynamicDealsAlerts(
  input: DynamicDealsAlertsInput
): Promise<DynamicDealsAlertsOutput> {
  return dynamicDealsAlertsFlow(input);
}

const dynamicDealsAlertsPrompt = ai.definePrompt({
  name: 'dynamicDealsAlertsPrompt',
  input: {schema: DynamicDealsAlertsInputSchema},
  output: {schema: DynamicDealsAlertsOutputSchema},
  prompt: `You are an AI assistant that helps street food vendors discover great deals on raw materials.

  Analyze the vendor's purchasing history, current suppliers, and market prices to identify potential deals.
  Consider the vendor's current suppliers, the names of items that are frequently purchased, and recent order history.
  Pay close attention to the reputation of new suppliers, and only suggest them if they have sufficient reviews.

  Provide alerts for deals that the vendor might be interested in.

  Recent Order History: {{{recentOrderHistory}}}
  Current Suppliers: {{#each currentSupplierIds}}{{{this}}} {{/each}}
  Frequently Purchased Items: {{#each frequentlyPurchasedItemNames}}{{{this}}} {{/each}}

  Output the deals in JSON format.
  `,
});

const dynamicDealsAlertsFlow = ai.defineFlow(
  {
    name: 'dynamicDealsAlertsFlow',
    inputSchema: DynamicDealsAlertsInputSchema,
    outputSchema: DynamicDealsAlertsOutputSchema,
  },
  async input => {
    const {output} = await dynamicDealsAlertsPrompt(input);
    return output!;
  }
);
