"use client";

import React from "react";
import { Input } from "@heroui/react";
import { RiSearchLine } from "react-icons/ri";

interface ApprovalsTableHeaderProps {
  title: string;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  placeholder?: string;
  count?: number;
}

export default function ApprovalsTableHeader({
  title,
  searchTerm,
  setSearchTerm,
  placeholder = "Search...",
  count,
}: ApprovalsTableHeaderProps) {
  return (
    <div className="px-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white w-full">
      <div>
        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
        {count !== undefined && (
          <p className="text-xs text-gray-500">
            {count} {count === 1 ? "entry" : "entries"}
          </p>
        )}
      </div>
      <div className="w-full sm:w-72">
        <Input
          isClearable
          placeholder={placeholder}
          value={searchTerm}
          onValueChange={setSearchTerm}
          onClear={() => setSearchTerm("")}
          size="sm"
          variant="bordered"
          startContent={<RiSearchLine className="text-gray-400 shrink-0" size={18} />}
          classNames={{
            inputWrapper: "bg-white border border-gray-300 rounded-full h-10 shadow-none",
            input: "text-sm text-gray-900",
          }}
        />
      </div>
    </div>
  );
}
