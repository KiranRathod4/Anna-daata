"use client";

import { createContext, useContext, useState, ReactNode } from 'react';
import type { VendorOrder, SupplierOrder, Product } from '@/lib/types';
import { allVendorOrders as initialVendorOrders, allSupplierOrders as initialSupplierOrders } from '@/lib/data';

interface CartItem extends Product {
  quantity: number;
}

interface OrderContextType {
  allVendorOrders: VendorOrder[];
  allSupplierOrders: SupplierOrder[];
  addOrder: (cartItems: CartItem[], total: number) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function useOrders() {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
}

export function OrderProvider({ children }: { children: ReactNode }) {
  const [allVendorOrders, setAllVendorOrders] = useState<VendorOrder[]>(initialVendorOrders);
  const [allSupplierOrders, setAllSupplierOrders] = useState<SupplierOrder[]>(initialSupplierOrders);

  const addOrder = (cartItems: CartItem[], total: number) => {
    const newOrderId = `#AD${Math.floor(Math.random() * 1000) + 3026}`;
    const newOrderDate = new Date().toISOString();

    // Group items by supplier
    const ordersBySupplier = cartItems.reduce((acc, item) => {
      const supplierId = item.supplierId;
      if (!acc[supplierId]) {
        acc[supplierId] = {
          supplierName: item.supplierName,
          items: [],
          total: 0,
        };
      }
      acc[supplierId].items.push(item);
      acc[supplierId].total += item.price * item.quantity;
      return acc;
    }, {} as Record<string, { supplierName: string, items: CartItem[], total: number }>);


    // Create new orders for each supplier
    Object.values(ordersBySupplier).forEach((supplierOrder, index) => {
      const uniqueOrderId = `${newOrderId}-${index}`;
      const newVendorOrder: VendorOrder = {
        id: uniqueOrderId,
        supplierName: supplierOrder.supplierName,
        total: supplierOrder.total,
        status: 'Pending',
        date: newOrderDate,
      };

      const newSupplierOrder: SupplierOrder = {
        id: uniqueOrderId,
        vendorName: 'Mumbai Chaat House', // This would be dynamic in a real app
        total: supplierOrder.total,
        status: 'Pending',
        date: newOrderDate,
      };
      
      setAllVendorOrders(prev => [newVendorOrder, ...prev]);
      setAllSupplierOrders(prev => [newSupplierOrder, ...prev]);
    });
  };


  const value = {
    allVendorOrders,
    allSupplierOrders,
    addOrder,
  };

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
}
