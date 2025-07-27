
"use client";

import { Suspense, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Logo } from '@/components/logo';
import { useRouter } from 'next/navigation';
import { auth, db } from '@/lib/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import type { Vendor, Supplier } from '@/lib/types';

function AuthComponent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();
  const role = searchParams.get('role') || 'vendor';

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);


  const handleSignUp = async () => {
    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, signupEmail, signupPassword);
      const user = userCredential.user;

      // Create a user profile document in Firestore
      if (role === 'vendor') {
        const newVendorProfile: Vendor = {
          id: user.uid,
          email: user.email!,
          name: signupName,
          role: 'vendor',
          stallName: `${signupName}'s Stall`,
          location: 'Not set',
          foodType: 'Not set',
        };
        await setDoc(doc(db, 'vendors', user.uid), newVendorProfile);
        router.push('/vendor/dashboard');
      } else {
        const newSupplierProfile: Supplier = {
            id: user.uid,
            email: user.email!,
            name: signupName,
            role: 'supplier',
            businessName: `${signupName}'s Supplies`,
            address: 'Not set',
            rating: 0,
            reviewCount: 0,
            isTrusted: false,
        };
        await setDoc(doc(db, 'suppliers', user.uid), newSupplierProfile);
        router.push('/supplier/dashboard');
      }
      
      toast({
        title: "Account Created",
        description: "You've successfully signed up!",
      });

    } catch (error: any) {
      toast({
        title: "Sign Up Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      const user = userCredential.user;

       // Check if the user has the correct role
       const docRef = doc(db, `${role}s`, user.uid);
       const docSnap = await getDoc(docRef);

       if (!docSnap.exists()) {
           throw new Error(`No ${role} account found for this user. Try switching roles.`);
       }

       toast({
        title: "Logged In",
        description: "Welcome back!",
      });
      
      if (role === 'vendor') {
        router.push('/vendor/dashboard');
      } else {
        router.push('/supplier/dashboard');
      }
    } catch (error: any) {
      toast({
        title: "Login Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const roleName = role.charAt(0).toUpperCase() + role.slice(1);

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Tabs defaultValue="login" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <Card>
            <CardHeader>
              <div className="flex justify-center mb-4">
                <Logo />
              </div>
              <CardTitle className="font-headline">{roleName} Login</CardTitle>
              <CardDescription>Enter your credentials to access your portal.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="m@example.com" required value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" required value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleLogin} className="w-full" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Login
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="signup">
          <Card>
            <CardHeader>
              <div className="flex justify-center mb-4">
                <Logo />
              </div>
              <CardTitle className="font-headline">{roleName} Sign Up</CardTitle>
              <CardDescription>Create an account to get started.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="Your Name" required value={signupName} onChange={(e) => setSignupName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email-signup">Email</Label>
                <Input id="email-signup" type="email" placeholder="m@example.com" required value={signupEmail} onChange={(e) => setSignupEmail(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password-signup">Password</Label>
                <Input id="password-signup" type="password" required value={signupPassword} onChange={(e) => setSignupPassword(e.target.value)}/>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSignUp} className="w-full" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Sign Up
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <div className="mt-4 text-center text-sm">
          {role === 'vendor' ? 'Not a vendor?' : 'Not a supplier?'}
          <Link href={`/login?role=${role === 'vendor' ? 'supplier' : 'vendor'}`} className="underline ml-1">
            Switch to {role === 'vendor' ? 'Supplier' : 'Vendor'}
          </Link>
        </div>
      </Tabs>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthComponent />
    </Suspense>
  );
}
