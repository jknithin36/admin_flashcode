// "use client";

// import { IconCirclePlusFilled, type Icon } from "@tabler/icons-react";

// import { Button } from "@/components/ui/button";
// import {
//   SidebarGroup,
//   SidebarGroupContent,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
// } from "@/components/ui/sidebar";

// export function NavMain({
//   items,
// }: {
//   items: {
//     title: string;
//     url: string;
//     icon?: Icon;
//   }[];
// }) {
//   return (
//     <SidebarGroup>
//       <SidebarGroupContent className="flex flex-col gap-2">
//         <SidebarMenu>
//           <SidebarMenuItem className="flex items-center gap-2">
//             <SidebarMenuButton
//               tooltip="Quick Analysis"
//               className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear"
//             >
//               <IconCirclePlusFilled />
//               <span>Quick Analysis</span>
//             </SidebarMenuButton>
//             <Button
//               size="icon"
//               className="size-8 group-data-[collapsible=icon]:opacity-0"
//               variant="outline"
//             >
//               {/* <IconMail /> */}
//               <span className="sr-only">Inbox</span>
//             </Button>
//           </SidebarMenuItem>
//         </SidebarMenu>
//         <SidebarMenu>
//           {items.map((item) => (
//             <SidebarMenuItem key={item.title}>
//               <SidebarMenuButton tooltip={item.title}>
//                 {item.icon && <item.icon />}
//                 <span>{item.title}</span>
//               </SidebarMenuButton>
//             </SidebarMenuItem>
//           ))}
//         </SidebarMenu>
//       </SidebarGroupContent>
//     </SidebarGroup>
//   );
// }
// "use client";

// import { IconCirclePlusFilled, type Icon } from "@tabler/icons-react";
// import { Button } from "@/components/ui/button";
// import {
//   SidebarGroup,
//   SidebarGroupContent,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
// } from "@/components/ui/sidebar";
// import Link from "next/link"; // Import Link for routing

// export function NavMain({
//   items,
// }: {
//   items: {
//     title: string;
//     url: string;
//     icon?: Icon;
//   }[];
// }) {
//   return (
//     <SidebarGroup>
//       <SidebarGroupContent className="flex flex-col gap-2">
//         <SidebarMenu>
//           <SidebarMenuItem className="flex items-center gap-2">
//             <SidebarMenuButton
//               tooltip="Quick Analysis"
//               className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear"
//             >
//               <IconCirclePlusFilled />
//               <span>Quick Analysis</span>
//             </SidebarMenuButton>
//             <Button
//               size="icon"
//               className="size-8 group-data-[collapsible=icon]:opacity-0"
//               variant="outline"
//             >
//               {/* Uncomment when needed */}
//               {/* <IconMail /> */}
//               <span className="sr-only">Inbox</span>
//             </Button>
//           </SidebarMenuItem>
//         </SidebarMenu>
//         <SidebarMenu>
//           {items.map((item) => (
//             <SidebarMenuItem key={item.title}>
//               <Link href={item.url}>
//                 {" "}
//                 {/* Wrap with Link for routing */}
//                 <SidebarMenuButton tooltip={item.title}>
//                   {item.icon && <item.icon />} {/* Render icon if it exists */}
//                   <span>{item.title}</span>
//                 </SidebarMenuButton>
//               </Link>
//             </SidebarMenuItem>
//           ))}
//         </SidebarMenu>
//       </SidebarGroupContent>
//     </SidebarGroup>
//   );
// }

"use client";

import { IconCirclePlusFilled, type Icon } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link"; // Import Link for routing

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: Icon;
    section: string; // New property to categorize items
  }[];
}) {
  // Group the items by their section
  const groupedItems = items.reduce((acc, item) => {
    if (!acc[item.section]) {
      acc[item.section] = [];
    }
    acc[item.section].push(item);
    return acc;
  }, {} as Record<string, { title: string; url: string; icon?: Icon }[]>);

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        {/* Quick Analysis Button */}
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2">
            <SidebarMenuButton
              tooltip="Quick Analysis"
              className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear"
            >
              <IconCirclePlusFilled />
              <span>Quick Analysis</span>
            </SidebarMenuButton>
            <Button
              size="icon"
              className="size-8 group-data-[collapsible=icon]:opacity-0"
              variant="outline"
            >
              {/* Uncomment when needed */}
              {/* <IconMail /> */}
              <span className="sr-only">Inbox</span>
            </Button>
          </SidebarMenuItem>
        </SidebarMenu>

        {/* Render the different sections */}
        {Object.keys(groupedItems).map((section) => (
          <SidebarMenu key={section}>
            <h3 className="text-lg font-semibold p-2">{section}</h3>{" "}
            {/* Section heading */}
            {groupedItems[section].map((item) => (
              <SidebarMenuItem key={item.title}>
                <Link href={item.url}>
                  <SidebarMenuButton tooltip={item.title}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        ))}
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
