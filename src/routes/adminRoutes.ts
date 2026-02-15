import { Route } from "@/types";
import {
  LayoutDashboard,
  ShoppingCart,
  Users,
  FolderPlus,
  Folder,
} from "lucide-react";

export const adminRoutes: Route[] = [
  {
    title: "Admin Dashboard",
    items: [
      {
        title: "Overview",
        url: "/admin-dashboard",
        icon: LayoutDashboard,
      },
      {
        title: "Orders",
        url: "/admin-dashboard/order-monitor",
        icon: ShoppingCart,
      },
      {
        title: "Users",
        url: "/admin-dashboard/get-user",
        icon: Users,
      },
      {
        title: "Add Category",
        url: "/admin-dashboard/create-category",
        icon: FolderPlus,
      },
      {
        title: "Categories",
        url: "/admin-dashboard/get-category",
        icon: Folder,
      },
    ],
  },
];
