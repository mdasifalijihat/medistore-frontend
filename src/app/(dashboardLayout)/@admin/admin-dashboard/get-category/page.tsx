"use client";

import { useEffect, useState } from "react";
import { Category } from "@/shop";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { shopService } from "@/service/shop.service";

export default function CategoryPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");

  const fetchCategories = async () => {
    try {
      const data = await shopService.getCategories();
      setCategories(data);
    } catch {
      toast.error("Failed to fetch categories");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await shopService.deleteCategory(id);
      toast.success("Category deleted 🗑️");
      fetchCategories();
    } catch {
      toast.error("Delete failed ❌");
    }
  };

  const handleUpdate = async (id: string) => {
    try {
      await shopService.updateCategory(id, editName);
      toast.success("Category updated ✏️");
      setEditingId(null);
      fetchCategories();
    } catch {
      toast.error("Update failed ❌");
    }
  };

  return (
    <div className="p-6 grid gap-6 md:grid-cols-3">
      {categories.map((cat) => (
        <div
          key={cat.id}
          className="border rounded-2xl p-5 shadow hover:shadow-lg transition"
        >
          {editingId === cat.id ? (
            <>
              <Input
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
              />

              <div className="flex gap-2 mt-3">
                <Button size="sm" onClick={() => handleUpdate(cat.id)}>
                  Save
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setEditingId(null)}
                >
                  Cancel
                </Button>
              </div>
            </>
          ) : (
            <>
              <h3 className="text-lg font-semibold">{cat.name}</h3>
              <p className="text-xs text-muted-foreground mt-1">
                {new Date(cat.createdAt).toLocaleDateString()}
              </p>

              <div className="flex gap-2 mt-4">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setEditingId(cat.id);
                    setEditName(cat.name);
                  }}
                >
                  Edit
                </Button>

                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(cat.id)}
                >
                  Delete
                </Button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
