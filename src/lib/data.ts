
import type { Product, Review, VendorOrder, SupplierOrder } from './types';
import type { DynamicDealsAlertsInput } from '@/ai/flows/dynamic-deals-alerts';
import type { DemandPredictionInput } from '@/ai/flows/demand-prediction-agent';

// This file now primarily contains data structures for AI agents,
// as the main application data is now fetched from Firestore.

// AI Flow Inputs
export const mockDynamicDealsInput: DynamicDealsAlertsInput = {
  vendorId: 'vendor123',
  currentSupplierIds: ['sup1', 'sup2'],
  frequentlyPurchasedItemNames: ['Tomatoes', 'Onions', 'Paneer', 'Milk'],
  recentOrderHistory: '5kg tomatoes, 10kg onions from sup1 on 2024-05-15; 2kg paneer, 20L milk from sup2 on 2024-05-12',
};

export const mockDemandPredictionInput: DemandPredictionInput = {
    vendorId: 'vendor123',
    orderHistory: [
        { orderId: 'ord1', orderTimestamp: '2024-05-01T10:00:00Z', orderItems: [{ itemId: 'prod1', quantity: 10, price: 40 }, { itemId: 'prod4', quantity: 20, price: 30 }], totalAmount: 1000 },
        { orderId: 'ord2', orderTimestamp: '2024-05-08T10:00:00Z', orderItems: [{ itemId: 'prod1', quantity: 12, price: 40 }, { itemId: 'prod4', quantity: 25, price: 30 }], totalAmount: 1230 },
        { orderId: 'ord3', orderTimestamp: '2024-05-15T10:00:00Z', orderItems: [{ itemId: 'prod1', quantity: 10, price: 40 }, { itemId: 'prod4', quantity: 20, price: 30 }], totalAmount: 1000 },
        { orderId: 'ord4', orderTimestamp: '2024-05-04T10:00:00Z', orderItems: [{ itemId: 'prod2', quantity: 20, price: 66 }, { itemId: 'prod6', quantity: 5, price: 400 }], totalAmount: 3320 },
        { orderId: 'ord5', orderTimestamp: '2024-05-12T10:00:00Z', orderItems: [{ itemId: 'prod2', quantity: 25, price: 66 }, { itemId: 'prod6', quantity: 7, price: 400 }], totalAmount: 4450 },
    ],
};

// Kept for static components like recent reviews on supplier dashboard, can be moved to firestore later.
export const recentReviews: Review[] = [
    { id: 'rev1', vendorName: 'Mumbai Chaat House', rating: 5, comment: 'Always fresh and on time!', avatarUrl: 'https://placehold.co/40x40.png', aiHint: 'smiling woman' },
    { id: 'rev2', vendorName: 'Delhi Dosa Point', rating: 4, comment: 'Good quality, sometimes a bit late.', avatarUrl: 'https://placehold.co/40x40.png', aiHint: 'man portrait' },
    { id: 'rev3', vendorName: 'Kolkata Rolls', rating: 5, comment: 'The best onions and potatoes in the city!', avatarUrl: 'https://placehold.co/40x40.png', aiHint: 'woman face' },
];
