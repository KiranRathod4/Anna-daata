import { SidebarProvider, Sidebar, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarInset, SidebarTrigger, SidebarHeader, SidebarContent, useSidebar } from '@/components/ui/sidebar';
import { LayoutDashboard, ClipboardList, Truck, User, Settings } from 'lucide-react';
import { Logo } from '@/components/logo';
import { UserNav } from '@/components/user-nav';
import { DashboardHeader } from '@/components/dashboard-header';
import { OrderProvider } from '@/hooks/use-orders';
import { ProfileProvider } from '@/hooks/use-profile';
import { SettingsProvider } from '@/hooks/use-settings';
import { ListingsProvider } from '@/hooks/use-listings';

const navItems = [
  { href: "/supplier/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/supplier/listings", icon: ClipboardList, label: "Listings" },
  { href: "/supplier/orders", icon: Truck, label: "Orders" },
  { href: "/supplier/profile", icon: User, label: "Profile" },
  { href: "/supplier/settings", icon: Settings, label: "Settings" },
];

export default function SupplierLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SettingsProvider>
      <ProfileProvider>
        <OrderProvider>
          <ListingsProvider>
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
          </ListingsProvider>
        </OrderProvider>
      </ProfileProvider>
    </SettingsProvider>
  );
}
