import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { UtensilsCrossed, Store } from 'lucide-react';
import { Logo } from '@/components/logo';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center sticky top-0 z-50 bg-background/80 backdrop-blur-sm">
        <Logo />
        <div className="flex items-center gap-4">
          <Button asChild variant="ghost">
            <Link href="/login?role=vendor">Vendor Login</Link>
          </Button>
          <Button asChild>
            <Link href="/login?role=supplier">Supplier Login</Link>
          </Button>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full py-20 md:py-32 lg:py-40 bg-card overflow-hidden">
           <div className="absolute inset-0 bg-primary/10 opacity-50"></div>
           <Image
            src="https://storage.googleapis.com/aif-us-build-dev-001/a0c49588-9333-42b2-a228-a5a8e239b699.png"
            alt="A female street food vendor serves fresh vegetables to a customer."
            data-ai-hint="vegetable stall"
            fill
            className="absolute inset-0 w-full h-full object-cover opacity-20"
          />
          <div className="container relative px-4 md:px-6 z-10">
            <div className="flex flex-col items-center space-y-6 text-center">
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tighter font-headline text-primary-foreground bg-primary/80 px-4 py-2 rounded-lg shadow-lg">
                The Heartbeat of India's Streets
              </h1>
              <p className="mx-auto max-w-[700px] text-foreground/90 md:text-xl font-medium bg-background/80 px-4 py-2 rounded-md">
                Anna Daata empowers street food vendors with the finest ingredients and smartest tools, turning passion into prosperity.
              </p>
              <div className="space-x-4">
                 <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                    <Link href="/login?role=vendor">Start as a Vendor</Link>
                  </Button>
              </div>
            </div>
          </div>
        </section>

        {/* The Story Section */}
        <section className="w-full py-16 md:py-24">
            <div className="container px-4 md:px-6">
                <div className="text-center space-y-3 mb-12">
                    <h2 className="text-3xl font-bold tracking-tighter md:text-4xl font-headline">From Fresh Ingredients to Happy Faces</h2>
                    <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed">This is the journey of flavor we enable every day.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                    <div className="flex flex-col items-center text-center gap-4">
                        <Image src="https://placehold.co/400x400.png" data-ai-hint="fresh vegetables market" alt="Fresh ingredients" width={400} height={400} className="rounded-lg shadow-lg object-cover" />
                        <h3 className="text-xl font-headline font-semibold">The Finest Ingredients</h3>
                        <p className="text-muted-foreground">Vendors connect with trusted suppliers for the freshest vegetables, spices, and dairy, forming the foundation of every delicious meal.</p>
                    </div>
                    <div className="flex flex-col items-center text-center gap-4">
                        <Image src="https://placehold.co/400x400.png" data-ai-hint="street food vendor" alt="Vendor cooking" width={400} height={400} className="rounded-lg shadow-lg object-cover" />
                        <h3 className="text-xl font-headline font-semibold">The Passionate Vendor</h3>
                        <p className="text-muted-foreground">With a reliable supply chain and AI-powered inventory management, our vendors focus on what they do best: creating culinary magic.</p>
                    </div>
                     <div className="flex flex-col items-center text-center gap-4">
                        <Image src="https://placehold.co/400x400.png" data-ai-hint="person eating street food" alt="Happy customer" width={400} height={400} className="rounded-lg shadow-lg object-cover" />
                        <h3 className="text-xl font-headline font-semibold">The Delighted Customer</h3>
                        <p className="text-muted-foreground">The result? A taste that brings joy. Every bite is a testament to the quality and care that started with Anna Daata.</p>
                    </div>
                </div>
            </div>
        </section>

        {/* "Who Are You?" Section */}
        <section className="w-full py-12 md:py-24 bg-card">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl font-headline">Join the Network</h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Whether you're selling on the streets or supplying the ingredients, there's a place for you.
              </p>
            </div>
            <div className="mx-auto grid max-w-sm gap-4 sm:max-w-none sm:grid-cols-2 lg:gap-8">
              <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="items-center">
                  <div className="bg-primary/10 p-4 rounded-full">
                    <UtensilsCrossed className="w-12 h-12 text-primary" />
                  </div>
                  <CardTitle className="mt-4 font-headline">I'm a Street Food Vendor</CardTitle>
                  <CardDescription>Find the best ingredients, get smart alerts, and grow your business.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                    <Link href="/login?role=vendor">Enter Vendor Portal</Link>
                  </Button>
                </CardContent>
              </Card>
              <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="items-center">
                  <div className="bg-accent/10 p-4 rounded-full">
                    <Store className="w-12 h-12 text-accent" />
                  </div>
                  <CardTitle className="mt-4 font-headline">I'm a Raw Material Supplier</CardTitle>
                  <CardDescription>Connect with a network of vendors and expand your reach.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                    <Link href="/login?role=supplier">Enter Supplier Portal</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; 2024 Anna Daata. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}