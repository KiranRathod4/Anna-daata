import { SidebarProvider, Sidebar, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarInset, SidebarTrigger, SidebarHeader, SidebarContent } from '@/components/ui/sidebar';
import { LayoutDashboard, ShoppingBasket, Package, User } from 'lucide-react';
import { Logo } from '@/components/logo';
import { UserNav } from '@/components/user-nav';
import { DashboardHeader } from '@/components/dashboard-header';

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/browse", icon: ShoppingBasket, label: "Browse" },
  { href: "/orders", icon: Package, label: "My Orders" },
  { href: "/profile", icon: User, label: "Profile" },
];

export default function VendorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center justify-center p-2 group-data-[collapsible=icon]:hidden">
             <Logo />
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton href={item.href} tooltip={item.label}>
                  <item.icon />
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      <SidebarInset className="bg-background">
        <DashboardHeader>
          <div className="md:hidden">
            <SidebarTrigger />
          </div>
          <div className="ml-auto">
            <UserNav />
          </div>
        </DashboardHeader>
        <main className="p-4 md:p-8">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
