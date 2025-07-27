
"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import type { Vendor, Supplier } from '@/lib/types';
import { auth, db } from '@/lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, onSnapshot, setDoc, getDoc } from "firebase/firestore";

const initialVendorProfile: Omit<Vendor, 'id' | 'email'> = {
  name: "New Vendor",
  role: 'vendor',
  stallName: "My Stall",
  location: "Update your location",
  foodType: "e.g., Chaat, Vada Pav",
};

const initialSupplierProfile: Omit<Supplier, 'id' | 'email'> = {
  name: "New Supplier",
  role: 'supplier',
  businessName: "My Business",
  address: "Update your address",
  specialties: "e.g., Fresh organic vegetables",
  rating: 0,
  reviewCount: 0,
  isTrusted: false,
};

interface ProfileContextType {
  vendorProfile: Vendor | null;
  setVendorProfile: React.Dispatch<React.SetStateAction<Vendor | null>>;
  supplierProfile: Supplier | null;
  setSupplierProfile: React.Dispatch<React.SetStateAction<Supplier | null>>;
  loading: boolean;
  user: User | null;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function useProfile() {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
}

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [vendorProfile, setVendorProfile] = useState<Vendor | null>(null);
  const [supplierProfile, setSupplierProfile] = useState<Supplier | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setLoading(true);
      if (user) {
        setUser(user);
        // Assuming a user can be either a vendor or a supplier, but not both.
        // We will try to fetch both profiles and see which one exists.
        
        const vendorDocRef = doc(db, 'vendors', user.uid);
        const vendorSnap = await getDoc(vendorDocRef);
        
        if (vendorSnap.exists()) {
            const vendorData = vendorSnap.data() as Vendor;
            setVendorProfile(vendorData);
            setSupplierProfile(null); // Clear other profile type
        } else {
            // If no vendor profile, check for supplier or create a placeholder.
            const supplierDocRef = doc(db, 'suppliers', user.uid);
            const supplierSnap = await getDoc(supplierDocRef);
            if (supplierSnap.exists()) {
                const supplierData = supplierSnap.data() as Supplier;
                setSupplierProfile(supplierData);
                setVendorProfile(null);
            } else {
                // If no profile exists yet, we don't create one automatically.
                // The user must complete a profile creation step.
                // For now, we can set a null or a default placeholder state.
                setVendorProfile(null);
                setSupplierProfile(null);
            }
        }
      } else {
        setUser(null);
        setVendorProfile(null);
        setSupplierProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);
  
  // Real-time listener for Vendor Profile
    useEffect(() => {
        if (user?.uid && vendorProfile) {
            const unsub = onSnapshot(doc(db, "vendors", user.uid), (doc) => {
                if (doc.exists()) {
                    setVendorProfile(doc.data() as Vendor);
                }
            });
            return () => unsub();
        }
    }, [user, vendorProfile]);

    // Real-time listener for Supplier Profile
    useEffect(() => {
        if (user?.uid && supplierProfile) {
            const unsub = onSnapshot(doc(db, "suppliers", user.uid), (doc) => {
                if (doc.exists()) {
                    setSupplierProfile(doc.data() as Supplier);
                }
            });
            return () => unsub();
        }
    }, [user, supplierProfile]);


  const value = {
    vendorProfile,
    // A function to update and persist the profile
    setVendorProfile: async (profile) => {
        if (user && profile) {
            await setDoc(doc(db, "vendors", user.uid), profile, { merge: true });
        }
    },
    supplierProfile,
    setSupplierProfile: async (profile) => {
       if (user && profile) {
            await setDoc(doc(db, "suppliers", user.uid), profile, { merge: true });
        }
    },
    loading,
    user,
  };

  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
}
