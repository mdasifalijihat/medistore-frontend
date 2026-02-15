import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Link from "next/link";

import { Roles } from "@/constants/roles";
import { adminRoutes } from "@/routes/adminRoutes";
import { sellerRoutes } from "@/routes/sellerRoutes";
import { Route } from "@/types";

export function AppSidebar({
  seller,
  ...props
}: { seller: { role: string } } & React.ComponentProps<typeof Sidebar>) {
  let routes: Route[] = [];

  switch (
    seller.role 
  ) {
    case Roles.admin:
      routes = adminRoutes;
      break;
    case Roles.seller:
      routes = sellerRoutes;
      break;
    default:
      routes = [];
      break;
  }
  return (
    <Sidebar {...props}>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {routes.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.url}>{item.title}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
