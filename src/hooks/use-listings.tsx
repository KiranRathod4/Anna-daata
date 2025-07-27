
"use client";

import { createContext, useContext, useCallback, ReactNode, useState, useEffect } from 'react';
import type { Product } from '@/lib/types';
import { collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc, query } from "firebase/firestore";
import { db } from '@/lib/firebase';
import { useProfile } from './use-profile';

interface ListingsContextType {
  products: Product[];
  addProduct: (productData: Omit<Product, 'id' | 'supplierId' | 'supplierName' | 'supplierRating'>) => void;
  updateProduct: (productId: string, updatedData: Partial<Product>) => void;
  deleteProduct: (productId: string) => void;
  loading: boolean;
}

const ListingsContext = createContext<ListingsContextType | undefined>(undefined);

export function useListings() {
  const context = useContext(ListingsContext);
  if (context === undefined) {
    throw new Error('useListings must be used within a ListingsProvider');
  }
  return context;
}

export function ListingsProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { supplierProfile } = useProfile();

  useEffect(() => {
    setLoading(true);
    const q = query(collection(db, "products"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const productsData: Product[] = [];
      querySnapshot.forEach((doc) => {
        productsData.push({ id: doc.id, ...doc.data() } as Product);
      });
      setProducts(productsData);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching listings:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);
  
  const addProduct = useCallback(async (productData: Omit<Product, 'id' | 'supplierId' | 'supplierName' | 'supplierRating'>) => {
    if (!supplierProfile) {
        console.error("No supplier profile found to add a listing.");
        return;
    }
    const newProduct: Omit<Product, 'id'> = {
        ...productData,
        supplierId: supplierProfile.id,
        supplierName: supplierProfile.businessName,
        supplierRating: supplierProfile.rating,
    };
    await addDoc(collection(db, "products"), newProduct);
  }, [supplierProfile]);

  const updateProduct = useCallback(async (productId: string, updatedData: Partial<Product>) => {
     const productDocRef = doc(db, "products", productId);
     await updateDoc(productDocRef, updatedData);
  }, []);

  const deleteProduct = useCallback(async (productId: string) => {
    const productDocRef = doc(db, "products", productId);
    await deleteDoc(productDocRef);
  }, []);

  const value = {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    loading,
  };

  return <ListingsContext.Provider value={value}>{children}</ListingsContext.Provider>;
}
