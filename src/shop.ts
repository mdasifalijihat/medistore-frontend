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

// export interface CartItem {
//   id: string;
//   userId: string;
//   medicineId: string;
//   quantity: number;
//   medicine?: Medicine;
// }

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



