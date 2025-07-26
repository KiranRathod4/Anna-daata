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
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  vendorId: string;
  supplierId: string;
  items: OrderItem[];
  total: number;
  status: 'Pending' | 'Confirmed' | 'Out for Delivery' | 'Delivered' | 'Cancelled';
  date: string;
}

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
