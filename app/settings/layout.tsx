import type { Metadata } from "next";
import { NotificationsPopover } from "@/components/notifications/NotificationsPopover";
import { SettingsBreadcrumb } from "@/components/settings/SettingsBreadcrumb";
import { SettingsSidebar } from "@/components/settings/SettingsSidebar";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export const metadata: Metadata = {
  title: "Settings",
  description: "Manage your account settings and preferences.",
};

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <SettingsSidebar />
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b bg-background/95 backdrop-blur transition-all duration-300 ease-in-out group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 supports-[backdrop-filter]:bg-background/60">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator className="mr-2 h-4" orientation="vertical" />
            <SettingsBreadcrumb />
          </div>
          <div className="mr-2 ml-auto flex items-center gap-3 px-4">
            <ThemeToggle />
            <NotificationsPopover />
          </div>
        </header>
        <div className="flex max-w-4xl flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
