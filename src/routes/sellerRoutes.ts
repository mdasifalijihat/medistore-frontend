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
        title: "Medicine Create",
        url: "/dashboard/medicine",
      },
    ],
  },
];
