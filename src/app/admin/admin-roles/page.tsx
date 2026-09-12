"use client";
import React, { useEffect, useState } from "react";
import AdminRolesHeader from "@/components/admin/admin-roles/AdminRolesHeader";
import AdminRolesTable, {
  AdminRow,
} from "@/components/admin/admin-roles/AdminRolesTable";
import AddAdminModal from "@/components/admin/admin-roles/AddAdminModal";
import EditAccessModal from "@/components/admin/admin-roles/EditAccessModal";
import RemoveAdminModal from "@/components/admin/admin-roles/RemoveAdminModal";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import httpService from "@/helper/services/httpService";
import { LoadingLayout } from "@/components/shared";
import { addToast } from "@heroui/toast";
import { AxiosError } from "axios";
import { uniqBy } from "lodash";

export default function AdminRolesPage() {
  const queryClient = useQueryClient();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editRow, setEditRow] = useState<AdminRow | null>(null);
  const [removeRow, setRemoveRow] = useState<AdminRow | null>(null);

  const [admins, setAdmins] = useState<AdminRow[]>([]);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["admins"],
    queryFn: () => httpService.get("/admin-auth/admins"),
  });

  const deleteAdminMutation = useMutation({
    mutationFn: (id: string) => httpService.delete(`/admin-auth/${id}`),
    onError: (error: AxiosError) => {
      const message =
        (error?.response?.data as { message?: string })?.message ||
        "Failed to remove administrator. Please try again.";
      addToast({
        title: "Error",
        description: message,
        color: "danger",
      });
    },
    onSuccess: async (res) => {
      const message =
        (res?.data as { message?: string })?.message ||
        "Administrator removed successfully";
      addToast({
        title: "Success",
        description: message,
        color: "success",
      });
      await queryClient.invalidateQueries({ queryKey: ["admins"] });
      setRemoveRow(null);
    },
  });

  useEffect(() => {
    if (isLoading) return;

    const rawAdmins = Array.isArray(data?.data?.data)
      ? data?.data?.data
      : Array.isArray(data?.data)
      ? data?.data
      : Array.isArray(data?.data?.admins)
      ? data?.data?.admins
      : [];

    const normalizedApiAdmins: AdminRow[] = rawAdmins.map(
      (item: any, index: number) => ({
        id: String(item?._id ?? item?.id ?? index),
        name: String(item?.fullName ?? item?.fullname ?? item?.name ?? "Administrator"),
        role: String(item?.role ?? "ADMIN"),
        email: String(item?.email ?? ""),
        access: Array.isArray(item?.access)
          ? item.access
          : typeof item?.access === "string" && item.access
          ? item.access.split(",").map((s: string) => s.trim())
          : [],
        avatarUrl: item?.profilePicture || item?.avatar || "",
      })
    );

    setAdmins(uniqBy(normalizedApiAdmins, "id"));
  }, [data, isLoading]);

  const parseAccessArray = (access: string[] | string | undefined): string[] => {
    if (Array.isArray(access)) return access;
    if (typeof access === "string" && access) {
      return access.split(",").map((s) => s.trim()).filter(Boolean);
    }
    return [];
  };

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg shadow-sm">
        <AdminRolesHeader
          onAdd={() => setIsAddOpen(true)}
          count={admins.length}
        />
        <LoadingLayout loading={isLoading} lenght={admins.length}>
          <AdminRolesTable
            admins={admins}
            onEditAccess={(row) => setEditRow(row)}
            onRemove={(row) => setRemoveRow(row)}
          />
        </LoadingLayout>
      </div>

      <AddAdminModal
        open={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onSubmit={() => {
          refetch();
        }}
      />
      <EditAccessModal
        open={!!editRow}
        onClose={() => setEditRow(null)}
        adminName={editRow?.name || ""}
        currentAccess={parseAccessArray(editRow?.access)}
        onSave={() => {
          // Placeholder for future edit-access API endpoint
        }}
      />
      <RemoveAdminModal
        open={!!removeRow}
        onClose={() => setRemoveRow(null)}
        adminName={removeRow?.name || ""}
        avatarUrl={removeRow?.avatarUrl}
        isLoading={deleteAdminMutation.isPending}
        onConfirm={() => {
          if (removeRow?.id) {
            deleteAdminMutation.mutate(removeRow.id);
          }
        }}
      />
    </div>
  );
}
