"use client";
import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import { RiArrowDownSLine } from "react-icons/ri";

interface PaymentsFiltersProps {
  searchQuery: string;
  onSearchChange: (val: string) => void;
  selectedProgram: string;
  onProgramChange: (val: string) => void;
  selectedPaymentType: string;
  onPaymentTypeChange: (val: string) => void;
  selectedStatus: string;
  onStatusChange: (val: string) => void;
}

export default function PaymentsFilters({
  searchQuery,
  onSearchChange,
  selectedProgram,
  onProgramChange,
  selectedPaymentType,
  onPaymentTypeChange,
  selectedStatus,
  onStatusChange,
}: PaymentsFiltersProps) {
  const programOptions = [
    { key: "all", label: "All Programs" },
    { key: "Product Design", label: "Product Design" },
    { key: "Product Management", label: "Product Management" },
    { key: "Digital Marketing", label: "Digital Marketing" },
    { key: "Data Analytics", label: "Data Analytics" },
    { key: "UX Research", label: "UX Research" },
  ];

  const paymentTypeOptions = [
    { key: "all", label: "All Payment Types" },
    { key: "Certificate", label: "Certificate" },
    { key: "Beginner", label: "Beginner" },
    { key: "Advanced", label: "Advanced" },
  ];

  const statusOptions = [
    { key: "all", label: "All Statuses" },
    { key: "Completed", label: "Completed" },
    { key: "Pending", label: "Pending" },
    { key: "Failed", label: "Failed" },
  ];

  const getLabel = (
    options: { key: string; label: string }[],
    currentKey: string,
    fallback: string
  ) => {
    return options.find((opt) => opt.key === currentKey)?.label || fallback;
  };

  return (
    <div className="w-full flex flex-col md:flex-row md:items-center justify-between gap-4 py-2">
      {/* Search Input */}
      <div className="w-full md:w-80">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search"
          className="w-full px-4 py-2 bg-white border border-[#E5E7EB] rounded-2xl text-xs lg:text-sm text-[#101828] placeholder-[#98A2B3] focus:outline-none focus:border-[#5160E7] transition-colors"
        />
      </div>

      {/* Dropdown Filters */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Programs */}
        <Dropdown placement="bottom-start">
          <DropdownTrigger>
            <button
              type="button"
              className="flex items-center gap-2 px-4 py-2 bg-white border border-[#E5E7EB] rounded-2xl text-xs lg:text-sm font-medium text-[#344054] hover:bg-gray-50 transition-colors focus:outline-none cursor-pointer"
            >
              <span>{getLabel(programOptions, selectedProgram, "All Programs")}</span>
              <RiArrowDownSLine size={16} className="text-[#667085]" />
            </button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Filter by program"
            selectedKeys={new Set([selectedProgram])}
            selectionMode="single"
            onSelectionChange={(keys) => {
              const val = Array.from(keys)[0] as string;
              if (val) onProgramChange(val);
            }}
          >
            {programOptions.map((opt) => (
              <DropdownItem key={opt.key}>{opt.label}</DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>

        {/* Payment Types */}
        <Dropdown placement="bottom-start">
          <DropdownTrigger>
            <button
              type="button"
              className="flex items-center gap-2 px-4 py-2 bg-white border border-[#E5E7EB] rounded-2xl text-xs lg:text-sm font-medium text-[#344054] hover:bg-gray-50 transition-colors focus:outline-none cursor-pointer"
            >
              <span>{getLabel(paymentTypeOptions, selectedPaymentType, "All Payment Types")}</span>
              <RiArrowDownSLine size={16} className="text-[#667085]" />
            </button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Filter by payment type"
            selectedKeys={new Set([selectedPaymentType])}
            selectionMode="single"
            onSelectionChange={(keys) => {
              const val = Array.from(keys)[0] as string;
              if (val) onPaymentTypeChange(val);
            }}
          >
            {paymentTypeOptions.map((opt) => (
              <DropdownItem key={opt.key}>{opt.label}</DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>

        {/* Statuses */}
        <Dropdown placement="bottom-start">
          <DropdownTrigger>
            <button
              type="button"
              className="flex items-center gap-2 px-4 py-2 bg-white border border-[#E5E7EB] rounded-2xl text-xs lg:text-sm font-medium text-[#344054] hover:bg-gray-50 transition-colors focus:outline-none cursor-pointer"
            >
              <span>{getLabel(statusOptions, selectedStatus, "All Statuses")}</span>
              <RiArrowDownSLine size={16} className="text-[#667085]" />
            </button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Filter by status"
            selectedKeys={new Set([selectedStatus])}
            selectionMode="single"
            onSelectionChange={(keys) => {
              const val = Array.from(keys)[0] as string;
              if (val) onStatusChange(val);
            }}
          >
            {statusOptions.map((opt) => (
              <DropdownItem key={opt.key}>{opt.label}</DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  );
}
