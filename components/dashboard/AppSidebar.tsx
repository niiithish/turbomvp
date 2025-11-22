"use client";

import {
  Analytics01Icon,
  Camera01Icon,
  Comment01Icon,
  DashboardCircleIcon,
  File01Icon,
  HelpCircleIcon,
  ListViewIcon,
  MagicWand01Icon,
  Settings02Icon,
} from "hugeicons-react";
import type * as React from "react";

import { NavMain } from "@/components/navigation/NavMain";
import { NavSecondary } from "@/components/navigation/NavSecondary";
import { NavUser } from "@/components/navigation/NavUser";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: DashboardCircleIcon,
    },
    {
      title: "Lifecycle",
      url: "#",
      icon: ListViewIcon,
    },
    {
      title: "Analytics",
      url: "#",
      icon: Analytics01Icon,
    },
  ],
  navClouds: [
    {
      title: "Capture",
      icon: Camera01Icon,
      isActive: true,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Proposal",
      icon: File01Icon,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Prompts",
      icon: MagicWand01Icon,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Help Center",
      url: "#",
      icon: HelpCircleIcon,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Comment01Icon,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings02Icon,
    },
  ],
};

export function AppSidebar({
  user,
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  user: {
    firstName?: string | null;
    lastName?: string | null;
    email: string;
    image?: string | null;
  };
}) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <a href="/">
                <DashboardCircleIcon className="size-5!" />
                <span className="font-semibold text-base">Logoipsum</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary className="mt-auto" items={data.navSecondary} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={{
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            avatar: user.image || "/avatars/default.jpg",
          }}
        />
      </SidebarFooter>
    </Sidebar>
  );
}
