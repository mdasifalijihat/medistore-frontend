"use client";

import React, { useEffect, useState } from "react";
import { ShieldBan, ShieldCheck } from "lucide-react";
import { shopService } from "@/service/shop.service";
import { AdminUser } from "@/types";

export default function ManageUserPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);

  const fetchUsers = async () => {
    const data = await shopService.getAdminUsers();
    setUsers(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleStatusChange = async () => {
    if (!selectedUser) return;

    const newStatus = selectedUser.status === "ACTIVE" ? "BANNED" : "ACTIVE";

    await shopService.updateUserStatus(selectedUser.id, newStatus);

    setSelectedUser(null);
    fetchUsers();
  };

  if (loading) return <div className="p-6">Loading users...</div>;

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-bold">👥 User Management</h1>

      <div className="bg-white shadow rounded-xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Role</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t">
                <td className="p-4">{user.name}</td>
                <td className="p-4">{user.email}</td>
                <td className="p-4">{user.role}</td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      user.status === "ACTIVE"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="p-4 text-center">
                  <button
                    onClick={() => setSelectedUser(user)}
                    className={`px-4 py-2 rounded-lg text-white flex items-center gap-2 mx-auto ${
                      user.status === "ACTIVE"
                        ? "bg-red-500 hover:bg-red-600"
                        : "bg-green-500 hover:bg-green-600"
                    }`}
                  >
                    {user.status === "ACTIVE" ? (
                      <>
                        <ShieldBan size={16} /> Ban
                      </>
                    ) : (
                      <>
                        <ShieldCheck size={16} /> Unban
                      </>
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Confirmation Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl shadow-lg w-87.5 space-y-4">
            <h2 className="text-lg font-semibold">Confirm Action</h2>
            <p>
              Are you sure you want to{" "}
              {selectedUser.status === "ACTIVE" ? "Ban" : "Unban"}{" "}
              <strong>{selectedUser.name}</strong>?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setSelectedUser(null)}
                className="px-4 py-2 bg-gray-200 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleStatusChange}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
