"use client";

import { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import type { VendorOrder, SupplierOrder, Product } from '@/lib/types';
import { allVendorOrders as initialVendorOrders, allSupplierOrders as initialSupplierOrders } from '@/lib/data';
import { useLocalStorage } from './use-local-storage';

export interface CartItem extends Product {
  quantity: number;
}

interface OrderContextType {
  vendorOrders: VendorOrder[];
  supplierOrders: SupplierOrder[];
  addOrder: (cartItems: CartItem[], total: number) => void;
  updateSupplierOrderStatus: (orderId: string, status: SupplierOrder['status']) => void;
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
  const [vendorOrders, setVendorOrders] = useLocalStorage<VendorOrder[]>('vendorOrders', initialVendorOrders);
  const [supplierOrders, setSupplierOrders] = useLocalStorage<SupplierOrder[]>('supplierOrders', initialSupplierOrders);

  const addOrder = useCallback((cartItems: CartItem[], total: number) => {
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
    Object.values(ordersBySupplier).forEach((supplierOrder) => {
      const uniqueOrderId = `#AD${Math.floor(Math.random() * 10000) + 3000}`;
      
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
      
      setVendorOrders(prev => [newVendorOrder, ...prev]);
      setSupplierOrders(prev => [newSupplierOrder, ...prev]);
    });
  }, [setVendorOrders, setSupplierOrders]);

  const updateSupplierOrderStatus = useCallback((orderId: string, status: SupplierOrder['status']) => {
    setSupplierOrders(prev => prev.map(o => o.id === orderId ? {...o, status} : o));
    setVendorOrders(prev => prev.map(o => o.id === orderId ? {...o, status} : o));
  }, [setSupplierOrders, setVendorOrders]);


  const value = {
    vendorOrders,
    supplierOrders,
    addOrder,
    updateSupplierOrderStatus,
  };

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
}
