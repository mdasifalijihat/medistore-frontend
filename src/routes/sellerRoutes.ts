import { Route } from "@/types";
import { LayoutDashboard, ShoppingCart, PlusCircle, Pill } from "lucide-react";

export const sellerRoutes: Route[] = [
  {
    title: "Seller Panel",
    items: [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: LayoutDashboard,
      },
      {
        title: "Customer Orders",
        url: "/dashboard/orders",
        icon: ShoppingCart,
      },
      {
        title: "Create Medicine",
        url: "/dashboard/medicine",
        icon: PlusCircle,
      },
      {
        title: "Manage Medicines",
        url: "/dashboard/get-medicine",
        icon: Pill,
      },
    ],
  },
];
