import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { UtensilsCrossed, Store } from 'lucide-react';
import { Logo } from '@/components/logo';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Logo />
        <Button asChild variant="ghost">
          <Link href="/login">Log In</Link>
        </Button>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-card">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tighter font-headline text-primary">
                Anna Daata
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                The Smart Procurement & Trust Network for India's Street Food Entrepreneurs.
              </p>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg">
                Connecting vendors with trusted suppliers, powered by AI.
              </p>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl font-headline">Who Are You?</h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Choose your path to get started on the platform.
              </p>
            </div>
            <div className="mx-auto grid max-w-sm gap-4 sm:max-w-none sm:grid-cols-2 lg:gap-8">
              <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="items-center">
                  <div className="bg-primary/10 p-4 rounded-full">
                    <UtensilsCrossed className="w-12 h-12 text-primary" />
                  </div>
                  <CardTitle className="mt-4 font-headline">Street Food Vendor</CardTitle>
                  <CardDescription>Find the best ingredients from trusted suppliers.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                    <Link href="/login?role=vendor">Vendor Portal</Link>
                  </Button>
                </CardContent>
              </Card>
              <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="items-center">
                  <div className="bg-accent/10 p-4 rounded-full">
                    <Store className="w-12 h-12 text-accent" />
                  </div>
                  <CardTitle className="mt-4 font-headline">Raw Material Supplier</CardTitle>
                  <CardDescription>Grow your business by reaching more vendors.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                    <Link href="/login?role=supplier">Supplier Portal</Link>
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
