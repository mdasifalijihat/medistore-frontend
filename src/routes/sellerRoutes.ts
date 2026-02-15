import { Route } from "@/types";

export const sellerRoutes: Route[] = [
  {
    title: "Seller Dashboard",
    items: [
      {
        title: "Customer Orders",
        url: "/dashboard/orders",
      },
      {
        title: "Create Medicine",
        url: "/dashboard/medicine",
      },
      {
        title: "Get Medicine",
        url: "/dashboard/get-medicine",
      },
    ],
  },
];
