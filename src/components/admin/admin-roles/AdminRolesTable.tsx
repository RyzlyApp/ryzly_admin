"use client";
import React from "react";
import {
  Avatar,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

export interface AdminRow {
  id: string;
  name: string;
  role: string;
  email: string;
  access: string[] | string;
  avatarUrl?: string;
}

interface AdminRolesTableProps {
  admins: AdminRow[];
  onEditAccess: (row: AdminRow) => void;
  onRemove: (row: AdminRow) => void;
}

export default function AdminRolesTable({
  admins,
  onEditAccess,
  onRemove,
}: AdminRolesTableProps) {
  const formatRole = (role: string) => {
    if (!role) return "Admin";
    return role.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
  };

  const parseAccessList = (access: string[] | string): string[] => {
    if (Array.isArray(access)) return access;
    if (typeof access === "string" && access.trim()) {
      return access.split(",").map((s) => s.trim()).filter(Boolean);
    }
    return [];
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Role
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Access
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {admins.length === 0 ? (
            <tr>
              <td colSpan={5} className="py-12 text-center text-sm text-gray-500">
                <div className="flex flex-col items-center justify-center gap-1.5">
                  <p className="font-semibold text-gray-700">No administrators found</p>
                  <p className="text-xs text-gray-400">Click &quot;Add Administrator&quot; to invite a new admin</p>
                </div>
              </td>
            </tr>
          ) : (
            admins.map((row) => {
              const accessList = parseAccessList(row.access);
              return (
                <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <Avatar
                        className="w-8 h-8 text-xs shrink-0"
                        name={row.name}
                        color="primary"
                        src={row.avatarUrl && row.avatarUrl !== "/work.jpg" ? row.avatarUrl : undefined}
                      />
                      <span className="text-sm font-medium text-gray-900">{row.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        row.role === "SUPER_ADMIN"
                          ? "bg-purple-100 text-purple-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {formatRole(row.role)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{row.email}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {accessList.length === 0 ? (
                      <span className="text-xs text-gray-400">No access assigned</span>
                    ) : (
                      <div className="flex flex-wrap items-center gap-1.5 max-w-md">
                        {accessList.slice(0, 3).map((item, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-700"
                          >
                            {item.replace(/_/g, " ").toLowerCase().replace(/\b\w/g, (l) => l.toUpperCase())}
                          </span>
                        ))}
                        {accessList.length > 3 && (
                          <span className="text-xs font-medium text-gray-500">
                            +{accessList.length - 3} more
                          </span>
                        )}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    <Dropdown placement="bottom-end">
                      <DropdownTrigger>
                        <button
                          className="p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors focus:outline-none"
                          aria-label="Actions"
                        >
                          <HiOutlineDotsHorizontal size={18} />
                        </button>
                      </DropdownTrigger>
                      <DropdownMenu aria-label="Admin Actions">
                        <DropdownItem key="edit" onPress={() => onEditAccess(row)}>
                          Edit access
                        </DropdownItem>
                        <DropdownItem
                          key="remove"
                          className="text-danger"
                          color="danger"
                          onPress={() => onRemove(row)}
                        >
                          Remove
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
