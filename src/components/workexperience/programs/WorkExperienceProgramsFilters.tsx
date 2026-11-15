"use client";
import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import { RiArrowDownSLine } from "react-icons/ri";

interface WorkExperienceProgramsFiltersProps {
  selectedProgram: string;
  onProgramChange: (val: string) => void;
  selectedIndustry: string;
  onIndustryChange: (val: string) => void;
  selectedLevel: string;
  onLevelChange: (val: string) => void;
  selectedStatus: string;
  onStatusChange: (val: string) => void;
}

export default function WorkExperienceProgramsFilters({
  selectedProgram,
  onProgramChange,
  selectedIndustry,
  onIndustryChange,
  selectedLevel,
  onLevelChange,
  selectedStatus,
  onStatusChange,
}: WorkExperienceProgramsFiltersProps) {
  const programOptions = [
    { key: "all", label: "All Programs" },
    { key: "Product Design", label: "Product Design" },
    { key: "Data Analytics", label: "Data Analytics" },
    { key: "Digital Marketing", label: "Digital Marketing" },
    { key: "Product Management", label: "Product Management" },
  ];

  const industryOptions = [
    { key: "all", label: "All Industries" },
    { key: "Technology", label: "Technology" },
    { key: "Fintech", label: "Fintech" },
    { key: "HealthTech", label: "HealthTech" },
    { key: "EdTech", label: "EdTech" },
  ];

  const levelOptions = [
    { key: "all", label: "All Levels" },
    { key: "Beginner", label: "Beginner" },
    { key: "Intermediate", label: "Intermediate" },
    { key: "Advanced", label: "Advanced" },
  ];

  const statusOptions = [
    { key: "all", label: "All Statuses" },
    { key: "Published", label: "Published" },
    { key: "Draft", label: "Draft" },
  ];

  const getLabel = (
    options: { key: string; label: string }[],
    currentKey: string,
    fallback: string
  ) => {
    return options.find((opt) => opt.key === currentKey)?.label || fallback;
  };

  return (
    <div className="w-full flex flex-wrap items-center gap-3 py-2">
      {/* Programs Filter */}
      <Dropdown placement="bottom-start">
        <DropdownTrigger className="bg-white">
          <button
            type="button"
            className="flex items-center gap-2 px-4 py-2 bg-white border border-[#E5E7EB] rounded-2xl text-xs lg:text-sm font-medium text-[#344054] hover:bg-white transition-colors focus:outline-none"
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

      {/* Industries Filter */}
      <Dropdown placement="bottom-start">
        <DropdownTrigger>
          <button
            type="button"
            className="flex items-center gap-2 px-4 py-2 bg-white border border-[#E5E7EB] rounded-2xl text-xs lg:text-sm font-medium text-[#344054] hover:bg-gray-50 transition-colors focus:outline-none"
          >
            <span>{getLabel(industryOptions, selectedIndustry, "All Industries")}</span>
            <RiArrowDownSLine size={16} className="text-[#667085]" />
          </button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Filter by industry"
          selectedKeys={new Set([selectedIndustry])}
          selectionMode="single"
          onSelectionChange={(keys) => {
            const val = Array.from(keys)[0] as string;
            if (val) onIndustryChange(val);
          }}
        >
          {industryOptions.map((opt) => (
            <DropdownItem key={opt.key}>{opt.label}</DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>

      {/* Levels Filter */}
      <Dropdown placement="bottom-start">
        <DropdownTrigger>
          <button
            type="button"
            className="flex items-center gap-2 px-4 py-2 bg-white border border-[#E5E7EB] rounded-2xl text-xs lg:text-sm font-medium text-[#344054] hover:bg-gray-50 transition-colors focus:outline-none"
          >
            <span>{getLabel(levelOptions, selectedLevel, "All Levels")}</span>
            <RiArrowDownSLine size={16} className="text-[#667085]" />
          </button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Filter by level"
          selectedKeys={new Set([selectedLevel])}
          selectionMode="single"
          onSelectionChange={(keys) => {
            const val = Array.from(keys)[0] as string;
            if (val) onLevelChange(val);
          }}
        >
          {levelOptions.map((opt) => (
            <DropdownItem key={opt.key}>{opt.label}</DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>

      {/* Statuses Filter */}
      <Dropdown placement="bottom-start">
        <DropdownTrigger>
          <button
            type="button"
            className="flex items-center gap-2 px-4 py-2 bg-white border border-[#E5E7EB] rounded-2xl text-xs lg:text-sm font-medium text-[#344054] hover:bg-gray-50 transition-colors focus:outline-none"
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
  );
}
