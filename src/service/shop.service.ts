// services/shopService.ts
import { env } from "@/env";
import {
  Medicine,
  Category,
  CartItem,
  Order,
  CreateOrderPayload,
  OrderStatus,
  SellerOrder,
  CreateMedicine,
} from "@/shop";
import { AdminOrder, AdminUser } from "@/types";

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

    // const url = `${API_URL}/medicine?${query.toString()}`;
    const url = `${API_URL}/medicine?${query.toString()}`;

    // const res = await fetch(url);
    const res = await fetch(url, {
      cache: "no-store",
    });

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

  // ================= SELLER =================

  // services/shopService.ts (add inside shopService)

  createMedicine: async (data: CreateMedicine): Promise<Medicine> => {
    const res = await fetch(`${API_URL}/medicine`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(err || "Failed to create medicine");
    }

    const json = await res.json();
    return json.data;
  },

  getSellerOrders: async (): Promise<SellerOrder[]> => {
    const res = await fetch(`${API_URL}/seller/orders`, {
      credentials: "include",
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Failed to fetch seller orders");

    const json = await res.json();
    return json.data;
  },

  updateOrderStatus: async (
    orderId: string,
    status: OrderStatus,
  ): Promise<void> => {
    const res = await fetch(`${API_URL}/seller/orders/${orderId}/status`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(err || "Failed to update order status");
    }
  },

  // get seller medicine
  getSellerMedicines: async (): Promise<Medicine[]> => {
    const res = await fetch(`${API_URL}/medicine/seller/my-medicines`, {
      credentials: "include",
      cache: "no-store",
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(err || "Failed to fetch seller medicines");
    }

    const json = await res.json();
    return json.data;
  },
  // delete medicine
  deleteMedicine: async (medicineId: string) => {
    const res = await fetch(`${API_URL}/medicine/${medicineId}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(err || "Failed to delete medicine");
    }

    return null;
  },

  // update medicine
  updateMedicine: async (
    medicineId: string,
    data: Partial<{
      name: string;
      price: number;
      stock: number;
      description: string;
      image?: string;
    }>,
  ) => {
    const res = await fetch(`${API_URL}/medicine/${medicineId}`, {
      method: "PATCH",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(err || "Failed to update medicine");
    }

    const json = await res.json();
    return json.data;
  },

  // ================= CATEGORY =================

  // Create Category
  createCategory: async (name: string): Promise<Category> => {
    const res = await fetch(`${API_URL}/category`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(err || "Failed to create category");
    }

    const json = await res.json();
    return json.data;
  },

  // Update Category
  updateCategory: async (id: string, name: string): Promise<Category> => {
    const res = await fetch(`${API_URL}/category/${id}`, {
      method: "PATCH",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(err || "Failed to update category");
    }

    const json = await res.json();
    return json.data;
  },

  // Delete Category
  deleteCategory: async (id: string): Promise<void> => {
    const res = await fetch(`${API_URL}/category/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(err || "Failed to delete category");
    }
  },

  // ADMIN
  getAdminStats: async (): Promise<{
    totalUsers: number;
    totalMedicines: number;
    totalOrders: number;
  }> => {
    const res = await fetch(`${API_URL}/admin/stats`, {
      credentials: "include",
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Failed to fetch admin stats");

    const json = await res.json();
    return json.data;
  },

  // ================= ADMIN =================

  // Get all users
  getAdminUsers: async (): Promise<AdminUser[]> => {
    const res = await fetch(`${API_URL}/admin/users`, {
      credentials: "include",
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Failed to fetch users");

    const json = await res.json();
    return json.data;
  },

  // Update user status (Ban / Unban)
  updateUserStatus: async (
    userId: string,
    status: "ACTIVE" | "BANNED",
  ): Promise<void> => {
    const res = await fetch(`${API_URL}/admin/users/${userId}`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(err || "Failed to update user status");
    }
  },

  // ================= ADMIN ORDERS =================

  getAdminOrders: async (status?: OrderStatus): Promise<AdminOrder[]> => {
    const query = new URLSearchParams();

    if (status) query.append("status", status);

    const res = await fetch(`${API_URL}/admin/orders?${query.toString()}`, {
      credentials: "include",
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Failed to fetch admin orders");

    const json = await res.json();
    return json.data;
  },
};
