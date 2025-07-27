
"use client";

import { createContext, useContext } from 'react';
import type { Vendor, Supplier } from '@/lib/types';
import { useLocalStorage } from './use-local-storage';

const initialVendorProfile: Vendor = {
  id: 'vendor123',
  name: "Priya Sharma",
  email: "priya@example.com",
  role: 'vendor',
  stallName: "Mumbai Chaat House",
  location: "Juhu Beach, Mumbai",
  foodType: "Chaat, Vada Pav, Dosa",
};

const initialSupplierProfile: Supplier = {
  id: 'sup1',
  name: "Ravi Kumar",
  email: "ravi@example.com",
  role: 'supplier',
  businessName: "Fresh Veggies Co.",
  address: "123 Market Road, Bengaluru",
  specialties: "Fresh organic vegetables, leafy greens, and seasonal fruits.",
  rating: 4.8,
  reviewCount: 120,
  isTrusted: true,
};

interface ProfileContextType {
  vendorProfile: Vendor;
  setVendorProfile: React.Dispatch<React.SetStateAction<Vendor>>;
  supplierProfile: Supplier;
  setSupplierProfile: React.Dispatch<React.SetStateAction<Supplier>>;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function useProfile() {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
}

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [vendorProfile, setVendorProfile] = useLocalStorage<Vendor>('vendorProfile', initialVendorProfile);
  const [supplierProfile, setSupplierProfile] = useLocalStorage<Supplier>('supplierProfile', initialSupplierProfile);

  const value = {
    vendorProfile,
    setVendorProfile,
    supplierProfile,
    setSupplierProfile,
  };

  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
}
