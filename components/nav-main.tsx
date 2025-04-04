"use client";

import * as React from "react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    section: string;
  }[];
}) {
  const pathname = usePathname();

  const groupedItems = items.reduce((acc, item) => {
    if (!acc[item.section]) {
      acc[item.section] = [];
    }
    acc[item.section].push(item);
    return acc;
  }, {} as Record<string, { title: string; url: string; section: string }[]>);

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-4 w-full max-w-[200px]">
        {/* ✅ Quick Analysis Button */}
        <div className="hidden md:block">
          <SidebarMenu>
            <SidebarMenuItem>
              <Link href="/quick">
                <SidebarMenuButton
                  tooltip="Quick Analysis"
                  isActive={pathname === "/quick"}
                  className="pl-4 w-full h-10 flex items-center justify-start rounded-md transition text-sm font-medium"
                >
                  <span>Calendar</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          </SidebarMenu>
        </div>

        {/* ✅ Grouped Navigation */}
        {Object.entries(groupedItems).map(([section, items]) => (
          <SidebarMenu key={section}>
            {/* ✅ Only show section name if not Home/Settings */}
            {section !== "" && section !== "Home" && section !== "Settings" && (
              <h3 className="text-xs font-medium text-muted-foreground px-2 mt-4 uppercase tracking-wide">
                {section}
              </h3>
            )}
            {items.map((item) => {
              const isActive = pathname === item.url;
              return (
                <SidebarMenuItem key={item.title}>
                  <Link href={item.url}>
                    <SidebarMenuButton
                      tooltip={item.title}
                      isActive={isActive}
                      className="pl-4 transition"
                    >
                      <span className={isActive ? "font-semibold" : ""}>
                        {item.title}
                      </span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        ))}
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
