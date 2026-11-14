"use client";
import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Selection,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import {
  RiComputerLine,
  RiBarChartLine,
  RiMegaphoneLine,
  RiBox3Line,
  RiGroupLine,
} from "react-icons/ri";
import { HiOutlineDotsVertical } from "react-icons/hi";
import {
  IWorkExperienceProgram,
  ProgramIconType,
} from "./types";

interface WorkExperienceProgramsTableProps {
  programs: IWorkExperienceProgram[];
  onView?: (program: IWorkExperienceProgram) => void;
  onEdit?: (program: IWorkExperienceProgram) => void;
  onAddIndustry?: (program: IWorkExperienceProgram) => void;
  onPublish?: (program: IWorkExperienceProgram) => void;
  onUnpublish?: (program: IWorkExperienceProgram) => void;
  onToggleStatus?: (program: IWorkExperienceProgram) => void;
  onDelete?: (program: IWorkExperienceProgram) => void;
}

export default function WorkExperienceProgramsTable({
  programs,
  onView,
  onEdit,
  onAddIndustry,
  onPublish,
  onUnpublish,
  onToggleStatus,
  onDelete,
}: WorkExperienceProgramsTableProps) {
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));

  const renderProgramIcon = (type: ProgramIconType) => {
    switch (type) {
      case "design":
        return <RiComputerLine size={22} className="text-[#5160E7]" />;
      case "analytics":
        return <RiBarChartLine size={22} className="text-[#5160E7]" />;
      case "marketing":
        return <RiMegaphoneLine size={22} className="text-[#5160E7]" />;
      case "management":
        return <RiBox3Line size={22} className="text-[#5160E7]" />;
      default:
        return <RiComputerLine size={22} className="text-[#5160E7]" />;
    }
  };

  return (
    <div className="w-full overflow-x-auto">
      <Table
        aria-label="Work Experience Programs Table"
        removeWrapper
        selectionMode="multiple"
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
        classNames={{
          base: "w-full bg-white rounded-2xl",
          table: "min-w-[900px]",
          thead: "[&>tr]:first:shadow-none",
          th: "bg-transparent text-left text-sm font-bold text-[#1D1348] border-b border-gray-100 py-4 shadow-none first:rounded-none last:rounded-none",
          td: "py-4 align-middle border-b border-gray-100 first:rounded-none last:rounded-none",
          tr: "hover:bg-white transition-colors",
        }}
      >
        <TableHeader>
          <TableColumn key="programs" className="text-left text-sm font-bold text-[#1D1348]">
            Programs
          </TableColumn>
          <TableColumn key="industries" className="text-left text-sm font-bold text-[#1D1348]">
            Industries
          </TableColumn>
          <TableColumn key="level" className="text-left text-sm font-bold text-[#1D1348]">
            Level
          </TableColumn>
          <TableColumn key="participants" className="text-left text-sm font-bold text-[#1D1348]">
            Participants
          </TableColumn>
          <TableColumn key="status" className="text-left text-sm font-bold text-[#1D1348]">
            Status
          </TableColumn>
          <TableColumn key="lastUpdated" className="text-left text-sm font-bold text-[#1D1348]">
            Last Updated
          </TableColumn>
          <TableColumn key="actions" align="end" className="w-12 text-right">
            <span className="sr-only">Actions</span>
          </TableColumn>
        </TableHeader>

        <TableBody
          items={programs}
          emptyContent="No work experience programs found matching your filters."
        >
          {(program) => (
            <TableRow key={program.id}>
              {/* Programs */}
              <TableCell>
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-[#F2F4FF] flex items-center justify-center shrink-0">
                    {renderProgramIcon(program.iconType)}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-[#101828] leading-tight">
                      {program.title}
                    </span>
                    {program.subtitle && (
                      <span className="text-sm font-semibold text-[#101828] leading-tight mt-0.5">
                        {program.subtitle}
                      </span>
                    )}
                  </div>
                </div>
              </TableCell>

              {/* Industries */}
              <TableCell>
                <div className="flex flex-col gap-1 items-start">
                  {program.industries.map((ind, idx) => (
                    <span
                      key={idx}
                      className="bg-[#F2F4F7] text-[#344054] text-xs px-2.5 py-0.5 rounded font-medium"
                    >
                      {ind}
                    </span>
                  ))}
                  {program.extraIndustriesCount ? (
                    <span className="bg-[#F2F4F7] text-[#475467] text-xs px-2 py-0.5 rounded font-medium">
                      +{program.extraIndustriesCount}
                    </span>
                  ) : null}
                </div>
              </TableCell>

              {/* Level */}
              <TableCell>
                <div className="flex flex-col gap-1.5 items-start">
                  {program.levels.map((lvl, idx) => (
                    <span
                      key={idx}
                      className={`text-xs px-3 py-0.5 rounded-full font-medium ${
                        lvl === "Advanced"
                          ? "bg-[#F2F4FF] text-[#5160E7]"
                          : "bg-[#F2F4F7] text-[#344054]"
                      }`}
                    >
                      {lvl}
                    </span>
                  ))}
                </div>
              </TableCell>

              {/* Participants */}
              <TableCell>
                <div className="flex items-center gap-2 text-[#475467] whitespace-nowrap">
                  <RiGroupLine size={18} className="text-[#667085]" />
                  <span className="text-sm font-medium text-[#101828]">
                    {program.participants}
                  </span>
                </div>
              </TableCell>

              {/* Status */}
              <TableCell>
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                    program.status === "Published"
                      ? "bg-[#E8FAF0] text-[#10B981]"
                      : "bg-[#F2F4F7] text-[#475467]"
                  }`}
                >
                  {program.status}
                </span>
              </TableCell>

              {/* Last Updated */}
              <TableCell className="text-sm text-[#475467] whitespace-nowrap">
                {program.lastUpdated}
              </TableCell>

              {/* Actions */}
              <TableCell className="text-right">
                <Dropdown placement="bottom-end">
                  <DropdownTrigger>
                    <button
                      type="button"
                      className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors focus:outline-none cursor-pointer"
                      aria-label="Actions"
                    >
                      <HiOutlineDotsVertical size={18} />
                    </button>
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Program Actions">
                    <DropdownItem key="view" onPress={() => onView?.(program)}>
                      View Work Experience
                    </DropdownItem>
                    <DropdownItem
                      key="add-industry"
                      onPress={() => onAddIndustry?.(program)}
                    >
                      Add New Industry
                    </DropdownItem>
                    {program.status !== "Published" ? (
                      <DropdownItem
                        key="publish"
                        className="text-success font-medium"
                        color="success"
                        onPress={() =>
                          onPublish ? onPublish(program) : onToggleStatus?.(program)
                        }
                      >
                        Publish Work Experience
                      </DropdownItem>
                    ) : (
                      <DropdownItem
                        key="unpublish"
                        onPress={() =>
                          onUnpublish
                            ? onUnpublish(program)
                            : onToggleStatus?.(program)
                        }
                      >
                        Unpublish Work Experience
                      </DropdownItem>
                    )}
                  </DropdownMenu>
                </Dropdown>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
