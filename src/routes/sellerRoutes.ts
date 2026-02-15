import { Route } from "@/types";
import { LayoutDashboard, ShoppingCart, Pill, PlusCircle } from "lucide-react";

export const sellerRoutes: Route[] = [
  {
    title: "Seller Dashboard",
    items: [
      {
        title: "Overview",
        url: "/dashboard",
        icon: LayoutDashboard,
      },
      {
        title: "Orders",
        url: "/dashboard/orders",
        icon: ShoppingCart,
      },
      {
        title: "Products",
        url: "/dashboard/get-medicine",
        icon: Pill,
      },
      {
        title: "Add Product",
        url: "/dashboard/medicine",
        icon: PlusCircle,
      },
    ],
  },
];
