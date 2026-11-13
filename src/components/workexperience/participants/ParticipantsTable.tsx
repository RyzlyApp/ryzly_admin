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
  Avatar,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import {
  Pagination,
  PaginationItem,
  PaginationCursor,
  PaginationItemType,
  PaginationItemRenderProps,
} from "@heroui/pagination";
import { HiOutlineDotsVertical, HiArrowLeft, HiArrowRight } from "react-icons/hi";
import { useRouter } from "next/navigation";
import { IParticipant } from "./types";

interface ParticipantsTableProps {
  participants: IParticipant[];
  onMessageParticipant?: (participant: IParticipant) => void;
  onExportParticipant?: (participant: IParticipant) => void;
}

export default function ParticipantsTable({
  participants,
  onMessageParticipant,
  onExportParticipant,
}: ParticipantsTableProps) {
  const router = useRouter();
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
  const [currentPage, setCurrentPage] = useState<number>(2);
  const totalPages = 5;

  const handleRowClick = (id: string) => {
    router.push(`/admin/work-experience/participants/${id}`);
  };

  const renderPaginationItem = ({
    ref,
    key,
    value,
    isActive,
    onNext,
    onPrevious,
    setPage,
  }: PaginationItemRenderProps) => {
    if (value === PaginationItemType.PREV) {
      return (
        <button
          key={key}
          type="button"
          onClick={onPrevious}
          disabled={currentPage === 1}
          className="flex items-center gap-2 hover:text-[#101828] disabled:opacity-40 disabled:cursor-not-allowed font-medium transition-colors cursor-pointer text-sm text-[#475467]"
        >
          <HiArrowLeft size={16} />
          <span>Previous</span>
        </button>
      );
    }

    if (value === PaginationItemType.NEXT) {
      return (
        <button
          key={key}
          type="button"
          onClick={onNext}
          disabled={currentPage === totalPages}
          className="flex items-center gap-2 hover:text-[#101828] disabled:opacity-40 disabled:cursor-not-allowed font-medium transition-colors cursor-pointer text-sm text-[#475467] ml-auto"
        >
          <span>Next</span>
          <HiArrowRight size={16} />
        </button>
      );
    }

    if (value === PaginationItemType.DOTS) {
      return (
        <PaginationItem
          key={key}
          className="w-9 h-9 flex items-center justify-center text-[#475467] list-none cursor-default"
        >
          ...
        </PaginationItem>
      );
    }

    const isFirstPage = value === 1;

    return (
      <PaginationItem
        key={key}
        ref={ref}
        value={value}
        isActive={isActive}
        onPress={() => setPage(value as number)}
        className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-medium transition-colors cursor-pointer list-none ${
          isFirstPage ? "ml-auto" : ""
        } ${
          isActive
            ? "bg-[#F2F4FF] text-[#5160E7] font-semibold"
            : "text-[#475467] hover:bg-gray-100"
        }`}
      >
        {value}
      </PaginationItem>
    );
  };

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="w-full overflow-x-auto">
        <Table
          aria-label="Participants Table"
          removeWrapper
          selectionMode="multiple"
          selectedKeys={selectedKeys}
          onSelectionChange={setSelectedKeys}
          classNames={{
            base: "w-full bg-white rounded-2xl shadow-xs",
            table: "min-w-[900px]",
            thead: "[&>tr]:first:shadow-none",
            th: "bg-transparent text-left text-sm font-bold text-[#1D1348] border-b border-gray-100 py-4 shadow-none first:rounded-none last:rounded-none",
            td: "py-4 align-middle border-b border-gray-100 first:rounded-none last:rounded-none",
            tr: "hover:bg-gray-50/50 transition-colors",
          }}
        >
          <TableHeader>
            <TableColumn key="participant" className="text-left text-sm font-bold text-[#1D1348]">
              Participant
            </TableColumn>
            <TableColumn key="programme" className="text-left text-sm font-bold text-[#1D1348]">
              Programme
            </TableColumn>
            <TableColumn key="level" className="text-left text-sm font-bold text-[#1D1348]">
              Level
            </TableColumn>
            <TableColumn key="progress" className="text-left text-sm font-bold text-[#1D1348]">
              Progress
            </TableColumn>
            <TableColumn key="joined" className="text-left text-sm font-bold text-[#1D1348]">
              Joined
            </TableColumn>
            <TableColumn key="actions" align="end" className="w-12 text-right">
              <span className="sr-only">Actions</span>
            </TableColumn>
          </TableHeader>

          <TableBody
            items={participants}
            emptyContent="No participants found matching your criteria."
          >
            {(participant) => (
              <TableRow key={participant.id}>
                {/* Participant */}
                <TableCell>
                  <div
                    onClick={() => handleRowClick(participant.id)}
                    className="flex items-center gap-3 cursor-pointer group"
                  >
                    <Avatar
                      src={participant.avatar}
                      name={participant.name}
                      size="sm"
                      className="shrink-0 w-8 h-8 rounded-full object-cover"
                    />
                    <span className="text-sm font-semibold text-[#1D1348] group-hover:text-[#5160E7] transition-colors">
                      {participant.name}
                    </span>
                  </div>
                </TableCell>

                {/* Programme */}
                <TableCell>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-[#101828] leading-tight">
                      {participant.programTitle}
                    </span>
                    <span className="text-xs text-[#64748B] mt-0.5">
                      at {participant.organization}
                    </span>
                  </div>
                </TableCell>

                {/* Level */}
                <TableCell>
                  <span
                    className={`inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium ${
                      participant.level === "Advanced"
                        ? "bg-[#F2F4FF] text-[#5160E7]"
                        : "bg-[#F2F4F7] text-[#344054]"
                    }`}
                  >
                    {participant.level}
                  </span>
                </TableCell>

                {/* Progress */}
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-28 bg-[#EEF0FF] rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-[#5160E7] h-2 rounded-full transition-all duration-300"
                        style={{ width: `${participant.progress}%` }}
                      />
                    </div>
                    <span className="text-xs font-medium text-[#475467] w-8">
                      {participant.progress}%
                    </span>
                  </div>
                </TableCell>

                {/* Joined */}
                <TableCell className="text-sm text-[#475467] whitespace-nowrap">
                  {participant.joinedDate}
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
                    <DropdownMenu aria-label="Participant Actions">
                      <DropdownItem
                        key="view"
                        onPress={() => handleRowClick(participant.id)}
                      >
                        View Details
                      </DropdownItem>
                      <DropdownItem
                        key="message"
                        onPress={() => onMessageParticipant?.(participant)}
                      >
                        Message Participant
                      </DropdownItem>
                      <DropdownItem
                        key="export"
                        onPress={() => onExportParticipant?.(participant)}
                      >
                        Export Data
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Footer using @heroui/pagination */}
      <div className="w-full flex items-center justify-between pt-4 border-t border-gray-100 text-sm text-[#475467]">
        <Pagination
          disableCursorAnimation
          showControls
          total={totalPages}
          page={currentPage}
          onChange={setCurrentPage}
          renderItem={renderPaginationItem}
          className="w-full max-w-full"
          classNames={{
            base: "w-full max-w-full",
            wrapper: "w-full max-w-full flex items-center shadow-none",
          }}
        />
      </div>
    </div>
  );
}
