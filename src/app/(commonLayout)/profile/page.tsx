"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

export default function ProfilePage() {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [image, setImage] = useState(user?.image || "");
  const [loading, setLoading] = useState(false);

  if (isPending) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <div className="text-center py-20">Not Logged In</div>;
  }

  const role = (user as any)?.role;
  const status = (user as any)?.status;

  const handleUpdate = async () => {
    try {
      setLoading(true);

      await authClient.updateUser({
        name,
        image,
      });

      setIsEditing(false);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <div className="bg-card shadow-lg border-2 rounded-2xl p-8 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-6">
          <img
            src={user.image || "/avatar.png"}
            alt="avatar"
            className="h-24 w-24 rounded-full object-cover border"
          />

          <div>
            <h2 className="text-2xl font-bold">{user.name}</h2>
            <p className="text-muted-foreground">{user.email}</p>

            <div className="flex gap-2 mt-2">
              <span className="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary">
                {role}
              </span>

              <span
                className={`px-3 py-1 text-xs rounded-full ${
                  status === "ACTIVE"
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {status}
              </span>
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="grid gap-4 pt-6 border-t">
          <div>
            <label className="text-sm font-medium">User ID</label>
            <p className="text-muted-foreground text-sm">{user.id}</p>
          </div>

          <div>
            <label className="text-sm font-medium">Created At</label>
            <p className="text-muted-foreground text-sm">
              {new Date(user.createdAt).toLocaleString()}
            </p>
          </div>

          <div>
            <label className="text-sm font-medium">Email Verified</label>
            <p className="text-muted-foreground text-sm">
              {user.emailVerified ? "Verified ✅" : "Not Verified ❌"}
            </p>
          </div>
        </div>

        {/* Edit Section */}
        <div className="pt-6 border-t space-y-4">
          {isEditing ? (
            <>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
              />

              <Input
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="Image URL"
              />

              <div className="flex gap-3">
                <Button onClick={handleUpdate} disabled={loading}>
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Save Changes
                </Button>

                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
              </div>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
          )}
        </div>
      </div>
    </div>
  );
}

