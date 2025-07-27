
"use client";

import { createContext, useContext, useCallback, ReactNode } from 'react';
import type { Product } from '@/lib/types';
import { allProducts as initialProducts } from '@/lib/data';
import { useLocalStorage } from './use-local-storage';

interface ListingsContextType {
  products: Product[];
  addProduct: (productData: Omit<Product, 'id' | 'supplierId' | 'supplierName' | 'supplierRating'>) => void;
  updateProduct: (productId: string, updatedData: Partial<Product>) => void;
  deleteProduct: (productId: string) => void;
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
  const [products, setProducts] = useLocalStorage<Product[]>('products', initialProducts);
  
  const addProduct = useCallback((productData: Omit<Product, 'id' | 'supplierId' | 'supplierName' | 'supplierRating'>) => {
    setProducts(prev => {
        const newProduct: Product = {
            id: `prod${Date.now()}`,
            supplierId: 'sup1', // Mocked for now
            supplierName: 'Fresh Veggies Co.', // Mocked for now
            supplierRating: 4.8, // Mocked for now
            ...productData,
        };
        return [newProduct, ...prev];
    });
  }, [setProducts]);

  const updateProduct = useCallback((productId: string, updatedData: Partial<Product>) => {
     setProducts(prev => prev.map(p => p.id === productId ? {...p, ...updatedData} : p));
  }, [setProducts]);

  const deleteProduct = useCallback((productId: string) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
  }, [setProducts]);

  const value = {
    products,
    addProduct,
    updateProduct,
    deleteProduct
  };

  return <ListingsContext.Provider value={value}>{children}</ListingsContext.Provider>;
}
