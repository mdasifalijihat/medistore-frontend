"use client";

import React, { useEffect, useState } from "react";

import { Users, Pill, ShoppingCart } from "lucide-react";
import { shopService } from "@/service/shop.service";

interface Stats {
  totalUsers: number;
  totalMedicines: number;
  totalOrders: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      const data = await shopService.getAdminStats();
      setStats(data);
    };

    fetchStats();
  }, []);

  if (!stats) {
    return <div className="p-6">Loading dashboard...</div>;
  }

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* USERS */}
        <div className="bg-white shadow-lg rounded-xl p-6 flex items-center gap-4 hover:scale-105 transition">
          <div className="bg-blue-100 p-4 rounded-full">
            <Users className="text-blue-600" size={28} />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Total Users</h2>
            <p className="text-2xl font-bold text-blue-600">
              {stats.totalUsers}
            </p>
          </div>
        </div>

        {/* MEDICINES */}
        <div className="bg-white shadow-lg rounded-xl p-6 flex items-center gap-4 hover:scale-105 transition">
          <div className="bg-green-100 p-4 rounded-full">
            <Pill className="text-green-600" size={28} />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Total Medicines</h2>
            <p className="text-2xl font-bold text-green-600">
              {stats.totalMedicines}
            </p>
          </div>
        </div>

        {/* ORDERS */}
        <div className="bg-white shadow-lg rounded-xl p-6 flex items-center gap-4 hover:scale-105 transition">
          <div className="bg-purple-100 p-4 rounded-full">
            <ShoppingCart className="text-purple-600" size={28} />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Total Orders</h2>
            <p className="text-2xl font-bold text-purple-600">
              {stats.totalOrders}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
