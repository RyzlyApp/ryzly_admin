"use client";
import { useEffect, useState } from "react";
import AdminRolesHeader from "@/components/admin/admin-roles/AdminRolesHeader";
import AdminRolesTable, {
  AdminRow,
} from "@/components/admin/admin-roles/AdminRolesTable";
import AddAdminModal from "@/components/admin/admin-roles/AddAdminModal";
import EditAccessModal from "@/components/admin/admin-roles/EditAccessModal";
import RemoveAdminModal from "@/components/admin/admin-roles/RemoveAdminModal";
import { useQuery } from "@tanstack/react-query";
import httpService from "@/helper/services/httpService";
import { uniqBy } from "lodash";
import type { AxiosResponse } from "axios";

interface AdminApiUser {
  _id: string;
  isDeleted: boolean;
  fullname: string;
  email: string;
  role: string;
  access: string[];
  suspended: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const seedAdmins: AdminRow[] = [
  {
    id: "1",
    name: "Albert Flores (You)",
    role: "Super Admin",
    email: "albertflores@mail.com",
    access: "Dashboard, Users, Challenges, +4 others",
    avatarUrl: "/work.jpg",
  },
  {
    id: "2",
    name: "Eleanor Pena",
    role: "Community Support",
    email: "eleanorpena@mail.com",
    access: "Dashboard, Users, Challenges, +4 others",
    avatarUrl: "/work.jpg",
  },
  {
    id: "3",
    name: "Wade Warren",
    role: "Growth Manager",
    email: "wadewarren@mail.com",
    access: "Dashboard, Users, Challenges, +4 others",
    avatarUrl: "/work.jpg",
  },
];

export default function AdminRolesPage() {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editRow, setEditRow] = useState<AdminRow | null>(null);
  const [removeRow, setRemoveRow] = useState<AdminRow | null>(null);

  const [admins, setNetworkAdmins] = useState<AdminRow[]>(seedAdmins);

  const { data, isLoading } = useQuery({
    queryKey: ["admins"],
    queryFn: () => httpService.get("/admin-auth/admins"),
  });

  useEffect(() => {
    if (isLoading) return;

    const apiAdmins = Array.isArray(data?.data?.data) ? data?.data?.data : [];
    const normalizedApiAdmins: AdminRow[] = apiAdmins.map(
      (item: AdminApiUser, index: number) => ({
        id: String(item?._id ?? index),
        name: String(item?.fullname ?? ""),
        role: String(item?.role ?? ""),
        email: String(item?.email ?? ""),
        access: Array.isArray(item?.access) ? item.access.join(", ") : "",
        avatarUrl: "/work.jpg",
      })
    );

    setNetworkAdmins(uniqBy([...normalizedApiAdmins], "id"));
  }, [data, isLoading]);

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg shadow-sm">
        <AdminRolesHeader onAdd={() => setIsAddOpen(true)} />
        <AdminRolesTable
          admins={admins}
          onEditAccess={(row) => setEditRow(row)}
          onRemove={(row) => setRemoveRow(row)}
        />
      </div>

      <AddAdminModal
        open={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onSubmit={() => {}}
      />
      <EditAccessModal
        open={!!editRow}
        onClose={() => setEditRow(null)}
        adminName={editRow?.name || ""}
        currentAccess={["dashboard", "users", "challenges"]}
        onSave={() => {}}
      />
      <RemoveAdminModal
        open={!!removeRow}
        onClose={() => setRemoveRow(null)}
        adminName={removeRow?.name || ""}
        avatarUrl={removeRow?.avatarUrl}
        onConfirm={() => {}}
      />
    </div>
  );
}
