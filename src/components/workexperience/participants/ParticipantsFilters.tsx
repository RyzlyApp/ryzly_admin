"use client";
import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import { RiArrowDownSLine } from "react-icons/ri";

interface ParticipantsFiltersProps {
  searchQuery: string;
  onSearchChange: (val: string) => void;
  selectedProgram: string;
  onProgramChange: (val: string) => void;
  selectedIndustry: string;
  onIndustryChange: (val: string) => void;
  selectedLevel: string;
  onLevelChange: (val: string) => void;
}

export default function ParticipantsFilters({
  searchQuery,
  onSearchChange,
  selectedProgram,
  onProgramChange,
  selectedIndustry,
  onIndustryChange,
  selectedLevel,
  onLevelChange,
}: ParticipantsFiltersProps) {
  const programOptions = [
    { key: "all", label: "All Programs" },
    { key: "Product Design", label: "Product Design" },
    { key: "Product Management", label: "Product Management" },
    { key: "Digital Marketing", label: "Digital Marketing" },
    { key: "Data Analytics", label: "Data Analytics" },
    { key: "UI Design", label: "UI Design" },
    { key: "UX Research", label: "UX Research" },
  ];

  const industryOptions = [
    { key: "all", label: "All Industries" },
    { key: "HealthTech", label: "HealthTech" },
    { key: "Technology", label: "Technology" },
    { key: "Fintech", label: "Fintech" },
    { key: "EdTech", label: "EdTech" },
  ];

  const levelOptions = [
    { key: "all", label: "All Levels" },
    { key: "Beginner", label: "Beginner" },
    { key: "Intermediate", label: "Intermediate" },
    { key: "Advanced", label: "Advanced" },
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
          placeholder="Search by name, email or ID"
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

        {/* Industries */}
        <Dropdown placement="bottom-start">
          <DropdownTrigger>
            <button
              type="button"
              className="flex items-center gap-2 px-4 py-2 bg-white border border-[#E5E7EB] rounded-2xl text-xs lg:text-sm font-medium text-[#344054] hover:bg-gray-50 transition-colors focus:outline-none cursor-pointer"
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

        {/* Levels */}
        <Dropdown placement="bottom-start">
          <DropdownTrigger>
            <button
              type="button"
              className="flex items-center gap-2 px-4 py-2 bg-white border border-[#E5E7EB] rounded-2xl text-xs lg:text-sm font-medium text-[#344054] hover:bg-gray-50 transition-colors focus:outline-none cursor-pointer"
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
      </div>
    </div>
  );
}
