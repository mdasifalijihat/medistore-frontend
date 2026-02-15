import { OrderStatus } from "@/shop";
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

export interface AdminOrder {
  id: string;
  status: OrderStatus;
  paymentMethod: "CASH_ON_DELIVERY" | "ONLINE";
  paymentStatus: "PENDING" | "PAID" | "FAILED";
  address: string;
  createdAt: string;

  user: {
    id: string;
    name: string;
    email: string;
  };

  orderItems: {
    id: string;
    price: number;
    quantity: number;
    medicine: {
      id: string;
      name: string;
      seller: {
        id: string;
        name: string;
        email: string;
      };
    };
  }[];
}
