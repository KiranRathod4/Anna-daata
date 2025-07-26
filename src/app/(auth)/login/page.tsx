"use client";

import { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Logo } from '@/components/logo';
import { useRouter } from 'next/navigation';

function AuthComponent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const role = searchParams.get('role') || 'vendor';

  const handleAuth = () => {
    // Mock authentication logic
    if (role === 'vendor') {
      router.push('/dashboard');
    } else {
      router.push('/supplier/dashboard');
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
                <Input id="email" type="email" placeholder="m@example.com" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" required />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleAuth} className="w-full">Login</Button>
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
                <Input id="name" placeholder="Your Name" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email-signup">Email</Label>
                <Input id="email-signup" type="email" placeholder="m@example.com" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password-signup">Password</Label>
                <Input id="password-signup" type="password" required />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleAuth} className="w-full">Sign Up</Button>
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
