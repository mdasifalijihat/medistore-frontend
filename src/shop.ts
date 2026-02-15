export interface User {
  id: string;
  name: string;
  email: string;
  role: "CUSTOMER" | "SELLER" | "ADMIN";
  status: "ACTIVE" | "BANNED";
  image?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  createdAt: string;
}

export interface Medicine {
  id: string;
  name: string;
  price: number;
  stock: number;
  description: string;
  createdAt: string;
  categoryId: string;
  sellerId: string;
  image?: string;
  rating?: number;
  category?: Category;
  seller?: User;
}

export interface CartItem {
  id: string;
  userId: string;
  medicineId: string;
  quantity: number;
  medicine: {
    id: string;
    name: string;
    price: number;
    image?: string;
  };
}

export interface Order {
  id: string;
  userId: string;
  status: "PLACED" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED";
  paymentMethod: "CASH_ON_DELIVERY" | "ONLINE";
  paymentStatus: "PENDING" | "PAID" | "FAILED";
  address: string;
  createdAt: string;
  orderItems?: OrderItem[];
}

export interface CreateOrderPayload {
  paymentMethod: "CASH_ON_DELIVERY" | "ONLINE";
  address: string;
  orderItems: {
    medicineId: string;
    price: number;
    quantity: number;
  }[];
}

export interface OrderItem {
  id: string;
  orderId: string;
  medicineId: string;
  price: number;
  quantity: number;
  medicine?: Medicine;
}
export type OrderStatus =
  | "PLACED"
  | "PROCESSING"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED";

export interface SellerOrder {
  id: string;
  userId: string;
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
    medicineId: string;
    price: number;
    quantity: number;
    medicine: {
      id: string;
      name: string;
      price: number;
      stock: number;
      sellerId: string;
    };
  }[];
}

export interface CreateMedicine {
  name: string;
  price: number;
  stock: number;
  description: string;
  image?: string;
  categoryId: string;
}
