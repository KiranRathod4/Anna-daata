import type { Product, Review, VendorOrder, SupplierOrder } from './types';
import type { DynamicDealsAlertsInput } from '@/ai/flows/dynamic-deals-alerts';
import type { DemandPredictionInput } from '@/ai/flows/demand-prediction-agent';

// Mock Data for Anna Daata App - This data is now used as the INITIAL state for localStorage.

// All Products from various suppliers for browse page
export const allProducts: Product[] = [
  { id: 'prod1', name: 'Fresh Tomatoes', price: 40, unit: 'kg', inStock: true, stock: 100, supplierId: 'sup1', supplierName: 'Fresh Veggies Co.', supplierRating: 4.8, imageUrl: 'https://storage.googleapis.com/aif-us-build-dev-001/c6c3a3af-f698-4c12-9c3f-4e0e5ab1571d.png', aiHint: 'fresh tomatoes' },
  { id: 'prod2', name: 'Amul Gold Milk', price: 66, unit: 'liter', inStock: true, stock: 200, supplierId: 'sup2', supplierName: 'Amul Dairy Distributors', supplierRating: 4.5, imageUrl: 'https://storage.googleapis.com/aif-us-build-dev-001/a572a17f-1d44-4860-b593-35f11812a640.png', aiHint: 'milk carton' },
  { id: 'prod3', name: 'Turmeric Powder', price: 250, unit: 'kg', inStock: true, stock: 50, supplierId: 'sup3', supplierName: 'Kerala Spice Hub', supplierRating: 4.9, imageUrl: 'https://images.unsplash.com/photo-1615485500834-bc10199bc727?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHx0dXJtZXJpYyUyMHBvd2RlcnxlbnwwfHx8fDE3NTM2MzMwNTR8MA&ixlib=rb-4.1.0&q=80&w=1080', aiHint: 'turmeric powder' },
  { id: 'prod4', name: 'Onions', price: 30, unit: 'kg', inStock: true, stock: 150, supplierId: 'sup1', supplierName: 'Fresh Veggies Co.', supplierRating: 4.8, imageUrl: 'https://storage.googleapis.com/aif-us-build-dev-001/be104618-977d-410a-864a-e60f78ce6c81.png', aiHint: 'fresh onions' },
  { id: 'prod5', name: 'Whole Wheat Atta', price: 45, unit: 'kg', inStock: false, stock: 0, supplierId: 'sup4', supplierName: 'Delhi Flour & Grains', supplierRating: 4.2, imageUrl: 'https://storage.googleapis.com/aif-us-build-dev-001/f9e8a71a-4f24-4f47-8b09-5d2d47783b9e.png', aiHint: 'wheat flour' },
  { id: 'prod6', name: 'Paneer', price: 400, unit: 'kg', inStock: true, stock: 30, supplierId: 'sup2', supplierName: 'Amul Dairy Distributors', supplierRating: 4.5, imageUrl: 'https://storage.googleapis.com/aif-us-build-dev-001/1d713a68-7a56-4c4f-9a71-2675685d0d82.png', aiHint: 'paneer block' },
  { id: 'prod7', name: 'Red Chilli Powder', price: 300, unit: 'kg', inStock: true, stock: 80, supplierId: 'sup3', supplierName: 'Kerala Spice Hub', supplierRating: 4.9, imageUrl: 'https://storage.googleapis.com/aif-us-build-dev-001/c81e3e7f-8e43-4a16-9e9b-4a5e62f0a1e3.png', aiHint: 'chilli powder' },
  { id: 'prod8', name: 'Potatoes', price: 25, unit: 'kg', inStock: true, stock: 300, supplierId: 'sup1', supplierName: 'Fresh Veggies Co.', supplierRating: 4.8, imageUrl: 'https://storage.googleapis.com/aif-us-build-dev-001/4f2b9b8b-9e4a-4b9e-9b0d-5a8b9f3c9e6d.png', aiHint: 'fresh potatoes' },
];

export const allVendorOrders: VendorOrder[] = [
    { id: '#AD3025', supplierName: 'Fresh Veggies Co.', total: 1250.00, status: 'Delivered', date: '2024-05-18' },
    { id: '#AD3024', supplierName: 'Amul Dairy Distributors', total: 850.50, status: 'Out for Delivery', date: '2024-05-20' },
    { id: '#AD3023', supplierName: 'Kerala Spice Hub', total: 2500.00, status: 'Confirmed', date: '2024-05-21' },
    { id: '#AD3022', supplierName: 'Fresh Veggies Co.', total: 980.00, status: 'Delivered', date: '2024-05-15' },
    { id: '#AD3021', supplierName: 'Delhi Flour & Grains', total: 600.00, status: 'Cancelled', date: '2024-05-14' },
    { id: '#AD3020', supplierName: 'Amul Dairy Distributors', total: 1100.00, status: 'Delivered', date: '2024-05-12' },
    { id: '#AD3019', supplierName: 'Fresh Veggies Co.', total: 1500.00, status: 'Delivered', date: '2024-05-10' },
];

export const allSupplierOrders: SupplierOrder[] = [
  { id: '#V2051', vendorName: 'Mumbai Chaat House', date: '2024-05-20', status: 'Pending', total: 750.00 },
  { id: '#V2050', vendorName: 'Delhi Dosa Point', date: '2024-05-19', status: 'Delivered', total: 1500.00 },
  { id: '#V2049', vendorName: 'Kolkata Rolls', date: '2024-05-19', status: 'Out for Delivery', total: 350.50 },
  { id: '#V2048', vendorName: 'Chennai Idli Express', date: '2024-05-18', status: 'Confirmed', total: 900.00 },
  { id: '#V2047', vendorName: 'Goa Fish Curry', date: '2024-05-17', status: 'Delivered', total: 2200.00 },
  { id: '#V2046', vendorName: 'Mumbai Chaat House', date: '2024-05-16', status: 'Cancelled', total: 400.00 },
];

export const recentReviews: Review[] = [
    { id: 'rev1', vendorName: 'Mumbai Chaat House', rating: 5, comment: 'Always fresh and on time!', avatarUrl: 'https://placehold.co/40x40.png', aiHint: 'smiling woman' },
    { id: 'rev2', vendorName: 'Delhi Dosa Point', rating: 4, comment: 'Good quality, sometimes a bit late.', avatarUrl: 'https://placehold.co/40x40.png', aiHint: 'man portrait' },
    { id: 'rev3', vendorName: 'Kolkata Rolls', rating: 5, comment: 'The best onions and potatoes in the city!', avatarUrl: 'https://placehold.co/40x40.png', aiHint: 'woman face' },
];

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
