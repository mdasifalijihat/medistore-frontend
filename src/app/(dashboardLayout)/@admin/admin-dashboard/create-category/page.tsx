"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { shopService } from "@/service/shop.service";

export default function CreateCategoryPage() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    try {
      setLoading(true);
      await shopService.createCategory(name);
      toast.success("Category created successfully 🎉");
      setName("");
    } catch (err) {
      toast.error("Failed to create category ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto py-12">
      <div className="border rounded-2xl shadow p-6 space-y-4">
        <h2 className="text-xl font-bold">Create Category</h2>

        <Input
          placeholder="Category name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <Button onClick={handleCreate} disabled={loading}>
          {loading ? "Creating..." : "Create Category"}
        </Button>
      </div>
    </div>
  );
}
