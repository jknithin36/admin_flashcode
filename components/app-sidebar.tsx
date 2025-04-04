"use client";

import * as React from "react";
import { NavMain } from "@/components/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "@/components/ui/sidebar";

const data = {
  user: {
    name: "flascode",
  },
  navMain: [
    { title: "Home", url: "/", section: "Home" }, // ⚠️ still using section name for grouping
    { title: "Analysis", url: "/analysis", section: "Analytics & Reports" },
    { title: "Reports", url: "/reports", section: "Analytics & Reports" },
    { title: "Users", url: "/users", section: "Application" },
    { title: "Questions", url: "/questions", section: "Application" },
    { title: "Tags", url: "/tags", section: "Application" },
    { title: "Events", url: "/events", section: "KentX" },
    { title: "Magazines", url: "/magazines", section: "KentX" },
    { title: "Schedule", url: "/schedule", section: "KentX" },
    { title: "Settings", url: "/settings", section: "Settings" },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      collapsible="offcanvas"
      className="flex flex-col justify-between bg-sidebar text-sidebar-foreground"
      {...props}
    >
      {/* Logo Header */}
      <SidebarHeader className="py-4">
        <div className="w-full flex p-3">
          <a href="#">
            <span className="text-white text-[24px] font-bold tracking-tight">
              Flashcode
            </span>
          </a>
        </div>
      </SidebarHeader>

      {/* Centered Navigation Menu */}
      <SidebarContent className="flex-1 flex items-center justify-center">
        <NavMain items={data.navMain} />
      </SidebarContent>

      {/* Footer (User Info) */}
    </Sidebar>
  );
}
