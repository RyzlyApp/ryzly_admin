"use client";
import React from "react";
import CustomButton from "@/components/custom/customButton";

interface AdminRolesHeaderProps {
  onAdd: () => void;
}

export default function AdminRolesHeader({ onAdd }: AdminRolesHeaderProps) {
  return (
    <div className="p-6 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-bold text-gray-900">Admin Roles</h3>
        </div>
        <p className="text-xs text-gray-500 mt-0.5">
          Manage administrator accounts, assigned roles, and module access permissions
        </p>
      </div>
      <CustomButton variant="primary" onClick={onAdd}>
        Add Administrator
      </CustomButton>
    </div>
  );
}
