// services/shopService.ts
import { env } from "@/env";
import { Medicine, Category,  } from "@/shop";

const API_URL = env.API_URL;

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


};
