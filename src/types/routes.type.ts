import { LucideIcon } from "lucide-react";

export interface RouteItem {
  title: string;
  url: string;
  icon?: LucideIcon;
}

export interface Route {
  title: string;
  items: RouteItem[];
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: "CUSTOMER" | "SELLER" | "ADMIN";
  status: "ACTIVE" | "BANNED";
  createdAt: string;
}
