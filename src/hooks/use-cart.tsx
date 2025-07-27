
"use client";

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import type { Product } from '@/lib/types';
import { useLocalStorage } from './use-local-storage';

export interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

// Cart remains in local storage as it's a client-side only feature.
export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useLocalStorage<CartItem[]>('cart', []);
  const [total, setTotal] = useState(0);
  const [itemCount, setItemCount] = useState(0);

  useEffect(() => {
    const newTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const newItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);
    setTotal(newTotal);
    setItemCount(newItemCount);
  }, [cart]);

  const addToCart = useCallback((product: Product, quantity = 1) => {
    setCart(prevCart => {
      const existingItemIndex = prevCart.findIndex(item => item.id === product.id);
      if (existingItemIndex > -1) {
        const newCart = [...prevCart];
        newCart[existingItemIndex].quantity += quantity;
        return newCart;
      } else {
        return [...prevCart, { ...product, quantity }];
      }
    });
  }, [setCart]);

  const removeFromCart = useCallback((productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  }, [setCart]);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prevCart => {
      return prevCart.map(item =>
        item.id === productId ? { ...item, quantity } : item
      );
    });
  }, [setCart, removeFromCart]);
  
  const clearCart = useCallback(() => {
    setCart([]);
  }, [setCart]);

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    total,
    itemCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
