// "use client";

// import * as React from "react";
// import { IconInnerShadowTop } from "@tabler/icons-react";

// import { NavMain } from "@/components/nav-main";
// import { NavUser } from "@/components/nav-user";
// import {
//   Sidebar,
//   SidebarContent,
//   SidebarFooter,
//   SidebarHeader,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
// } from "@/components/ui/sidebar";

// const data = {
//   user: {
//     name: "shadcn",
//     email: "m@example.com",
//     avatar: "/avatars/shadcn.jpg",
//   },
// };

// export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
//   return (
//     <Sidebar collapsible="offcanvas" {...props}>
//       <SidebarHeader>
//         <SidebarMenu>
//           <SidebarMenuItem>
//             <SidebarMenuButton
//               asChild
//               className="data-[slot=sidebar-menu-button]:!p-1.5"
//             >
//               <a href="#">
//                 <IconInnerShadowTop className="!size-5" />
//                 <span className="text-base font-semibold">Flashcode</span>
//               </a>
//             </SidebarMenuButton>
//           </SidebarMenuItem>
//         </SidebarMenu>
//       </SidebarHeader>
//       <SidebarContent>
//         <NavMain items={data.navMain} />
//         {/* <NavDocuments items={data.documents} />
//         <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
//       </SidebarContent>
//       <SidebarFooter>
//         <NavUser user={data.user} />
//       </SidebarFooter>
//     </Sidebar>
//   );
// }
// "use client";

// import * as React from "react";
// import { NavMain } from "@/components/nav-main";
// import { NavUser } from "@/components/nav-user";
// import {
//   IconChartBar,
//   IconDashboard,
//   IconFolder,
//   IconInnerShadowTop,
//   IconListDetails,
//   IconUsers,
// } from "@tabler/icons-react";
// import {
//   Sidebar,
//   SidebarContent,
//   SidebarFooter,
//   SidebarHeader,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
// } from "@/components/ui/sidebar";

// const data = {
//   user: {
//     name: "nithin",
//     email: "nithin@example.com",
//     avatar: "/avatars/shadcn.jpg",
//   },
//   // Ensure that navMain is properly defined
//   navMain: [
//     {
//       title: "Home",
//       url: "/home",
//       icon: IconDashboard,
//     },
//     {
//       title: "Analysis",
//       url: "/analysis",
//       icon: IconListDetails,
//     },
//     {
//       title: "Reports",
//       url: "/reports",
//       icon: IconChartBar,
//     },
//     {
//       title: "Users",
//       url: "/users",
//       icon: IconFolder,
//     },
//     {
//       title: "Questions",
//       url: "/questions",
//       icon: IconUsers,
//     },
//     {
//       title: "Tags",
//       url: "/tags",
//       icon: IconUsers,
//     },
//     {
//       title: "Events",
//       url: "/events",
//       icon: IconUsers,
//     },
//     {
//       title: "Magazines",
//       url: "/magazines",
//       icon: IconUsers,
//     },
//     {
//       title: "Schedule",
//       url: "/schedule",
//       icon: IconUsers,
//     },

//     {
//       title: "Settings",
//       url: "/settings",
//       icon: IconUsers,
//     },
//   ],
// };

// export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
//   return (
//     <Sidebar collapsible="offcanvas" {...props}>
//       <SidebarHeader>
//         <SidebarMenu>
//           <SidebarMenuItem>
//             <SidebarMenuButton
//               asChild
//               className="data-[slot=sidebar-menu-button]:!p-1.5"
//             >
//               <a href="#">
//                 <IconInnerShadowTop className="!size-5" />
//                 <span className="text-base font-semibold">Flashcode</span>
//               </a>
//             </SidebarMenuButton>
//           </SidebarMenuItem>
//         </SidebarMenu>
//       </SidebarHeader>
//       <SidebarContent>
//         {/* Ensure navMain is populated */}
//         <NavMain items={data.navMain} />
//         {/* <NavDocuments items={data.documents} />
//         <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
//       </SidebarContent>
//       <SidebarFooter>
//         <NavUser user={data.user} />
//       </SidebarFooter>
//     </Sidebar>
//   );
// }

"use client";

import * as React from "react";
import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  IconChartBar,
  IconDashboard,
  IconFolder,
  IconInnerShadowTop,
  IconListDetails,
  IconUsers,
} from "@tabler/icons-react";
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
  user: {
    name: "nithin",
    email: "nithin@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  // Ensure that navMain is properly defined
  navMain: [
    {
      title: "Home",
      url: "/home",
      icon: IconDashboard,
      section: "Dashboard", // Grouped under "Dashboard"
    },
    {
      title: "Analysis",
      url: "/analysis",
      icon: IconListDetails,
      section: "Analytics & Reports", // Grouped under "Analytics & Reports"
    },
    {
      title: "Reports",
      url: "/reports",
      icon: IconChartBar,
      section: "Analytics & Reports",
    },
    {
      title: "Users",
      url: "/users",
      icon: IconFolder,
      section: "Application", // Grouped under "Application"
    },
    {
      title: "Questions",
      url: "/questions",
      icon: IconUsers,
      section: "Application",
    },
    {
      title: "Tags",
      url: "/tags",
      icon: IconUsers,
      section: "Application",
    },
    {
      title: "Events",
      url: "/events",
      icon: IconUsers,
      section: "KentX", // Grouped under "KentX"
    },
    {
      title: "Magazines",
      url: "/magazines",
      icon: IconUsers,
      section: "KentX",
    },
    {
      title: "Schedule",
      url: "/schedule",
      icon: IconUsers,
      section: "KentX",
    },
    {
      title: "Settings",
      url: "/settings",
      icon: IconUsers,
      section: "Settings", // A separate section for settings
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">Flashcode</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {/* Ensure navMain is populated */}
        <NavMain items={data.navMain} />
        {/* <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
