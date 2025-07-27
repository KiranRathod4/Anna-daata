
import { FieldValue } from "firebase/firestore";

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'vendor' | 'supplier';
}

export interface Vendor extends User {
  role: 'vendor';
  stallName: string;
  location: string;
  foodType: string;
}

export interface Supplier extends User {
  role: 'supplier';
  businessName: string;
  address: string;
  rating: number;
  reviewCount: number;
  isTrusted: boolean;
  specialties?: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  unit: 'kg' | 'liter' | 'piece';
  inStock: boolean;
  stock: number;
  supplierId: string;
  supplierName: string;
  supplierRating: number;
  imageUrl: string;
  aiHint?: string;
  quantity?: number;
}

export interface OrderItem {
  productId: string;
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  vendorId: string;
  vendorName: string;
  supplierId: string;
  supplierName: string;
  items: OrderItem[];
  total: number;
  status: 'Pending' | 'Confirmed' | 'Out for Delivery' | 'Delivered' | 'Cancelled';
  createdAt: FieldValue;
}

// These are now deprecated as we use the main Order type
export interface VendorOrder {
    id: string;
    supplierName: string;
    total: number;
    status: Order['status'];
    date?: string;
}

export interface SupplierOrder {
    id: string;
    vendorName: string;
    total: number;
    status: Order['status'];
    date: string;
}

export interface Review {
  id: string;
  vendorName: string;
  rating: number;
  comment: string;
  avatarUrl?: string;
  aiHint?: string;
}


export type Settings = {
  theme: 'light' | 'dark' | 'system';
  emailNotifications: boolean;
  smsAlerts: boolean;
}
