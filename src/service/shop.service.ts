// services/shopService.ts
import { env } from "@/env";
import { Medicine, } from "@/shop";

const API_URL = env.API_URL;

export const shopService = {
  //   Get all medicines (optionally filter by category)
  // getMedicines: async (): Promise<Medicine[]> => {
  //   const res = await fetch(`${env.API_URL}/medicine/}`);
  //   if (!res.ok) throw new Error("Failed to fetch medicines");
  //   return res.json();
  // },

  getMedicines: async (): Promise<Medicine[]> => {
    const url = `${env.API_URL}/medicine/`;
    try {
      const res = await fetch(url);
      if (!res.ok) {
        const text = await res.text(); // read error body
        throw new Error(
          `Failed to fetch medicines: ${res.status} ${res.statusText} - ${text}`,
        );
      }
      const json = await res.json();
      return json.data;
    } catch (err) {
      console.error("Error fetching medicines from", url, err);
      throw err;
    }
  },

  
};
