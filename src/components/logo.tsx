import Link from 'next/link';
import { ChefHat } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("flex items-center gap-2", className)}>
      <ChefHat className="h-6 w-6 text-primary" />
      <span className="text-xl font-bold font-headline text-primary">Anna Daata</span>
    </Link>
  );
}
