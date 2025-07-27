
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { auth } from '@/lib/firebase';
import { signOut } from "firebase/auth";
import { useToast } from "@/hooks/use-toast";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

export function UserNav() {
  const { toast } = useToast();
  const router = useRouter();
  const pathname = usePathname();

  const isVendor = pathname.startsWith('/vendor');
  const profilePath = isVendor ? '/vendor/profile' : '/supplier/profile';
  const settingsPath = isVendor ? '/vendor/settings' : '/supplier/settings';
  
  const userName = isVendor ? "Priya Sharma" : "Ravi Kumar";
  const userEmail = isVendor ? "priya@example.com" : "ravi@example.com";
  const userFallback = isVendor ? "PS" : "RK";
  const userAvatarUrl = isVendor 
    ? "https://images.unsplash.com/photo-1542940871-21694936245f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw4fHxpbmRpYW4lMjB3b21hbnxlbnwwfHx8fDE3NTM3MDYwNzF8MA&ixlib=rb-4.1.0&q=80&w=1080" 
    : "https://images.unsplash.com/photo-1618569977872-3566141b2b46?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBtYW58ZW58MHx8fHwxNzUzNzA2MTQxfDA&ixlib=rb-4.1.0&q=80&w=1080";
  const userAvatarHint = isVendor ? "indian woman" : "indian man";

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out.",
      });
      router.push('/');
    } catch (error: any) {
      toast({
        title: "Logout Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-9 w-9">
            <AvatarImage src={userAvatarUrl} alt={userName} data-ai-hint={userAvatarHint} />
            <AvatarFallback>{userFallback}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{userName}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {userEmail}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => router.push(profilePath)}>Profile</DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push(settingsPath)}>Settings</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
