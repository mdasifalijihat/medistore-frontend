"use client";

import React, { useState } from "react";
import { Medicine } from "@/shop";
import { Button } from "@/components/ui/button";
import { shopService } from "@/service/shop.service";
import { toast } from "sonner";
import { Dialog } from "@headlessui/react";
import { Input } from "@/components/ui/input";

interface SellerGetProps {
  medicine: Medicine;
  onUpdate?: (updated: Medicine) => void;
  onDelete?: (id: string) => void;
}

export default function SellerGet({
  medicine,
  onUpdate,
  onDelete,
}: SellerGetProps) {
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: medicine.name,
    price: medicine.price,
    stock: medicine.stock,
  });

  // DELETE with Sonner Confirm
  const handleDelete = () => {
    toast.custom((t) => (
      <div className="bg-white p-4 rounded-lg shadow-md flex flex-col gap-4">
        <p>
          Are you sure you want to delete <b>{medicine.name}</b>?
        </p>
        <div className="flex justify-end gap-2">
          <Button
            size="sm"
            variant="secondary"
            onClick={() => toast.dismiss((t as any).id)}
          >
            Cancel
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={async () => {
              toast.dismiss((t as any).id);
              setLoading(true);
              try {
                await shopService.deleteMedicine(medicine.id as string);
                toast.success("Medicine deleted successfully");
                if (onDelete) onDelete(medicine.id);
              } catch (err: any) {
                toast.error(err.message || "Failed to delete medicine");
              } finally {
                setLoading(false);
              }
            }}
          >
            Confirm
          </Button>
        </div>
      </div>
    ));
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const updated = await shopService.updateMedicine(String(medicine.id), {
        name: formData.name,
        price: formData.price,
        stock: formData.stock,
      });
      toast.success("Medicine updated successfully");
      if (onUpdate) onUpdate(updated);
      setIsOpen(false);
    } catch (err: any) {
      toast.error(err.message || "Failed to update medicine");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 relative">
      {loading && (
        <div className="absolute inset-0 bg-white/50 flex items-center justify-center z-20">
          Loading...
        </div>
      )}

      {/* Image */}
      <div className="w-full h-48 bg-gray-100 relative">
        {medicine.image ? (
          <img
            src={medicine.image}
            alt={medicine.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            No Image
          </div>
        )}
      </div>

      {/* Details */}
      <div className="p-4">
        <h3 className="text-lg font-semibold">{medicine.name}</h3>
        <p className="text-gray-600 mt-1">{medicine.category?.name}</p>
        <p className="text-gray-800 mt-2 font-medium">
          Price: <span className="text-green-600">${medicine.price}</span>
        </p>
        <p className="text-gray-500 mt-1">
          Stock:{" "}
          <span
            className={medicine.stock > 0 ? "text-blue-600" : "text-red-600"}
          >
            {medicine.stock}
          </span>
        </p>
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center p-4 border-t">
        <Button size="sm" variant="default" onClick={() => setIsOpen(true)}>
          Edit
        </Button>
        <Button size="sm" variant="destructive" onClick={handleDelete}>
          Delete
        </Button>
      </div>

      {/* Modal */}
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="fixed inset-0 z-50 flex items-center justify-center"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <Dialog.Panel className="bg-white rounded-lg max-w-md w-full p-6 z-50">
          <Dialog.Title className="text-lg font-semibold mb-4">
            Edit Medicine
          </Dialog.Title>

          <div className="space-y-4">
            <div>
              <label className="block text-gray-700">Name</label>
              <Input
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-gray-700">Price</label>
              <Input
                type="number"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: Number(e.target.value) })
                }
              />
            </div>
            <div>
              <label className="block text-gray-700">Stock</label>
              <Input
                type="number"
                value={formData.stock}
                onChange={(e) =>
                  setFormData({ ...formData, stock: Number(e.target.value) })
                }
              />
            </div>
          </div>

          <div className="flex justify-end mt-6 gap-2">
            <Button variant="secondary" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdate}>Update</Button>
          </div>
        </Dialog.Panel>
      </Dialog>
    </div>
  );
}
