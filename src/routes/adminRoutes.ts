import { Route } from "@/types";

export const adminRoutes: Route[] = [
  {
    title: "Admin Dashboard",
    items: [
      {
        title: "Dashboard",
        url: "/admin-dashboard",
      },
      {
        title: "Create Category",
        url: "/admin-dashboard/create-category",
      },
      {
        title: "Get All Category",
        url: "/admin-dashboard/get-category",
      },
      {
        title: "Get User",
        url: "/admin-dashboard/get-user",
      },
    ],
  },
];
