
"use client";

import { createContext, useContext, useEffect } from 'react';
import type { Vendor, Supplier } from '@/lib/types';
import { useLocalStorage } from './use-local-storage';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';

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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      if (user && user.email) {
        // User is signed in, update both profiles with the auth email.
        // Check if the email is different to prevent unnecessary updates.
        if (vendorProfile.email !== user.email) {
            setVendorProfile(prev => ({
                ...initialVendorProfile, // Reset to a clean slate
                id: user.uid,
                email: user.email!,
                name: "New Vendor"
            }));
        }
        if (supplierProfile.email !== user.email) {
            setSupplierProfile(prev => ({
                ...initialSupplierProfile, // Reset to a clean slate
                id: user.uid,
                email: user.email!,
                name: "New Supplier"
            }));
        }
      }
      // If user is null, we can optionally reset to initial state,
      // but localStorage persistence might be desired across logouts.
      // For now, we only act when a user logs in.
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []); // Run only once on mount

  const value = {
    vendorProfile,
    setVendorProfile,
    supplierProfile,
    setSupplierProfile,
  };

  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
}
