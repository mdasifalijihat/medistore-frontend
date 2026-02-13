// services/shopService.ts
import { env } from "@/env";
import {
  Medicine,
  Category,
  CartItem,
  Order,
  OrderItem,
  CreateOrderPayload,
} from "@/shop";

const API_URL = env.NEXT_PUBLIC_API_URL;

export const shopService = {
  // get all medicine
  getMedicines: async (params?: {
    search?: string;
    categoryId?: string;
    minPrice?: number;
    maxPrice?: number;
  }): Promise<Medicine[]> => {
    const query = new URLSearchParams();

    if (params?.search) query.append("search", params.search);
    if (params?.categoryId) query.append("categoryId", params.categoryId);
    if (params?.minPrice) query.append("minPrice", String(params.minPrice));
    if (params?.maxPrice) query.append("maxPrice", String(params.maxPrice));

    const url = `${env.API_URL}/medicine?${query.toString()}`;

    const res = await fetch(url);

    if (!res.ok) {
      throw new Error("Failed to fetch medicines");
    }

    const json = await res.json();
    return json.data;
  },

  //Get all categories
  getCategories: async (): Promise<Category[]> => {
    const res = await fetch(`${API_URL}/category`, {
      cache: "no-store", // optional: always fresh
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("Failed to fetch categories:", text);
      throw new Error("Failed to fetch categories");
    }

    const json = await res.json();
    return json.categories; // matches backend response
  },

  // Fetch cart items for logged-in user
  getCart: async (): Promise<{
    cartItems: CartItem[];
    totalPrice: number;
  }> => {
    const res = await fetch(`${API_URL}/cart`, {
      credentials: "include", // 🔥 VERY IMPORTANT
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch cart");
    }

    const json = await res.json();

    return json.data; // { cartItems, totalPrice }
  },

  // Add item to cart
  addToCart: async (
    userId: string,
    medicineId: string,
    quantity: number,
  ): Promise<CartItem> => {
    const res = await fetch(`${API_URL}/cart/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, medicineId, quantity }),
    });
    if (!res.ok) throw new Error("Failed to add to cart");
    return res.json();
  },

  // Remove item from cart
  removeFromCart: async (medicineId: string): Promise<void> => {
    const res = await fetch(`${API_URL}/cart/${medicineId}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!res.ok) throw new Error("Failed to remove item");
  },

  // Create order
  createOrder: async (order: CreateOrderPayload): Promise<Order> => {
    const res = await fetch(`${API_URL}/orders`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    });

    if (!res.ok) throw new Error("Failed to create order");
    return res.json();
  },

  // Get user orders
  getOrders: async (): Promise<Order[]> => {
    const res = await fetch(`${API_URL}/orders`, {
      credentials: "include",
    });

    if (!res.ok) throw new Error("Failed to fetch orders");
    const data = await res.json();
    return data.data;
  },

  //  Update order status (seller/admin)
  updateOrderStatus: async (
    orderId: string,
    status: Order["status"],
  ): Promise<Order> => {
    const res = await fetch(`${API_URL}/orders/${orderId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (!res.ok) throw new Error("Failed to update order status");
    return res.json();
  },
};
