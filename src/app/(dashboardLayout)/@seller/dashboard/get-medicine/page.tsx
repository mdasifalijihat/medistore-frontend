"use client";

import { useEffect, useState } from "react";
import { shopService } from "@/service/shop.service";
import SellerGet from "@/components/modules/seller/SellerGet";
import { Medicine } from "@/shop";

export default function GetMedicinePage() {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    shopService
      .getSellerMedicines()
      .then((data) => setMedicines(data))
      .finally(() => setLoading(false));
  }, []);

  const handleUpdate = (updated: Medicine) => {
    setMedicines((prev) =>
      prev.map((med) => (med.id === updated.id ? updated : med)),
    );
  };

  const handleDelete = (id: string) => {
    setMedicines((prev) => prev.filter((med) => med.id !== id));
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {medicines.length > 0 ? (
        medicines.map((medicine) => (
          <SellerGet
            key={medicine.id}
            medicine={medicine}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        ))
      ) : (
        <p>No medicines found</p>
      )}
    </div>
  );
}
