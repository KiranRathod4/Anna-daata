
"use client";

import { createContext, useContext, useState, ReactNode, useCallback, useEffect } from 'react';
import type { VendorOrder, SupplierOrder, Product, Order } from '@/lib/types';
import { useProfile } from './use-profile';
import { db } from '@/lib/firebase';
import { collection, addDoc, updateDoc, doc, query, where, onSnapshot, serverTimestamp, writeBatch } from 'firebase/firestore';


export interface CartItem extends Product {
  quantity: number;
}

interface OrderContextType {
  vendorOrders: Order[];
  supplierOrders: Order[];
  addOrder: (cartItems: CartItem[], total: number) => void;
  updateSupplierOrderStatus: (orderId: string, status: Order['status']) => void;
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
  const { user, vendorProfile, supplierProfile } = useProfile();
  const [vendorOrders, setVendorOrders] = useState<Order[]>([]);
  const [supplierOrders, setSupplierOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch orders for the current user (vendor)
  useEffect(() => {
    if (user && vendorProfile) {
      setLoading(true);
      const q = query(collection(db, "orders"), where("vendorId", "==", user.uid));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const ordersData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Order));
        setVendorOrders(ordersData);
        setLoading(false);
      });
      return () => unsubscribe();
    } else {
        setVendorOrders([]);
    }
  }, [user, vendorProfile]);

  // Fetch orders for the current user (supplier)
  useEffect(() => {
    if (user && supplierProfile) {
      setLoading(true);
      const q = query(collection(db, "orders"), where("supplierId", "==", user.uid));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const ordersData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Order));
        setSupplierOrders(ordersData);
        setLoading(false);
      });
      return () => unsubscribe();
    } else {
        setSupplierOrders([]);
    }
  }, [user, supplierProfile]);


  const addOrder = useCallback(async (cartItems: CartItem[], total: number) => {
    if (!user || !vendorProfile) {
        console.error("User is not logged in or is not a vendor.");
        return;
    }
    
    const ordersBySupplier = cartItems.reduce((acc, item) => {
      const { supplierId, supplierName, ...rest } = item;
      if (!acc[supplierId]) {
        acc[supplierId] = {
          supplierId,
          supplierName,
          items: [],
          total: 0,
        };
      }
      acc[supplierId].items.push({
          productId: rest.id,
          name: rest.name,
          quantity: rest.quantity,
          price: rest.price,
      });
      acc[supplierId].total += item.price * item.quantity;
      return acc;
    }, {} as Record<string, { supplierId: string; supplierName: string; items: any[], total: number }>);
    
    const batch = writeBatch(db);

    Object.values(ordersBySupplier).forEach((supplierOrder) => {
        const newOrderRef = doc(collection(db, "orders"));
        const orderData: Omit<Order, 'id'> = {
            vendorId: user.uid,
            vendorName: vendorProfile.stallName,
            supplierId: supplierOrder.supplierId,
            supplierName: supplierOrder.supplierName,
            items: supplierOrder.items,
            total: supplierOrder.total,
            status: 'Pending',
            createdAt: serverTimestamp(),
        };
        batch.set(newOrderRef, orderData);
    });
    
    await batch.commit();

  }, [user, vendorProfile]);

  const updateSupplierOrderStatus = useCallback(async (orderId: string, status: Order['status']) => {
    const orderDocRef = doc(db, "orders", orderId);
    await updateDoc(orderDocRef, { status });
  }, []);


  const value = {
    vendorOrders,
    supplierOrders,
    addOrder,
    updateSupplierOrderStatus,
  };

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
}
