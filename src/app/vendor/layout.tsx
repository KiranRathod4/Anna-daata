import { SidebarProvider, Sidebar, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarInset, SidebarTrigger, SidebarHeader, SidebarContent } from '@/components/ui/sidebar';
import { LayoutDashboard, ShoppingBasket, Package, User, ClipboardList, Settings } from 'lucide-react';
import { Logo } from '@/components/logo';
import { UserNav } from '@/components/user-nav';
import { DashboardHeader } from '@/components/dashboard-header';
import { CartProvider } from '@/hooks/use-cart';
import { MyCart } from '@/components/vendor/my-cart';
import { OrderProvider } from '@/hooks/use-orders';
import { ProfileProvider } from '@/hooks/use-profile';
import { SettingsProvider } from '@/hooks/use-settings';
import { ListingsProvider } from '@/hooks/use-listings';

const navItems = [
  { href: "/vendor/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/vendor/browse", icon: ShoppingBasket, label: "Browse" },
  { href: "/vendor/orders", icon: Package, label: "My Orders" },
  { href: "/vendor/reorder", icon: ClipboardList, label: "Reorder" },
  { href: "/vendor/profile", icon: User, label: "Profile" },
  { href: "/vendor/settings", icon: Settings, label: "Settings" },
];

export default function VendorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SettingsProvider>
      <ProfileProvider>
        <ListingsProvider>
          <OrderProvider>
            <CartProvider>
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
                    <div className="ml-auto flex items-center gap-4">
                      <MyCart />
                      <UserNav />
                    </div>
                  </DashboardHeader>
                  <main className="p-4 md:p-8">
                    {children}
                  </main>
                </SidebarInset>
              </SidebarProvider>
            </CartProvider>
          </OrderProvider>
        </ListingsProvider>
      </ProfileProvider>
    </SettingsProvider>
  );
}
