"use client";
import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
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
import { ICertificateRecord } from "./types";

interface CertificatesTableProps {
  certificates: ICertificateRecord[];
  onViewCertificate?: (record: ICertificateRecord) => void;
  onIssueCertificate?: (record: ICertificateRecord) => void;
  onDownloadPdf?: (record: ICertificateRecord) => void;
}

export default function CertificatesTable({
  certificates,
  onViewCertificate,
  onIssueCertificate,
  onDownloadPdf,
}: CertificatesTableProps) {
  const [currentPage, setCurrentPage] = useState<number>(2);
  const totalPages = 5;

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
          aria-label="Certificates Table"
          removeWrapper
          classNames={{
            base: "w-full bg-white",
            table: "min-w-[850px]",
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
            <TableColumn key="status" className="text-left text-sm font-bold text-[#1D1348]">
              Status
            </TableColumn>
            <TableColumn key="completedOn" className="text-left text-sm font-bold text-[#1D1348]">
              Completed on
            </TableColumn>
            <TableColumn key="actions" align="end" className="w-12 text-right">
              <span className="sr-only">Actions</span>
            </TableColumn>
          </TableHeader>

          <TableBody
            items={certificates}
            emptyContent="No certificate records match your filters."
          >
            {(record) => (
              <TableRow key={record.id}>
                {/* Participant */}
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar
                      src={record.avatar}
                      name={record.participantName}
                      size="sm"
                      className="shrink-0 w-8 h-8 rounded-full object-cover"
                    />
                    <span className="text-sm font-semibold text-[#1D1348]">
                      {record.participantName}
                    </span>
                  </div>
                </TableCell>

                {/* Programme */}
                <TableCell>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-[#101828] leading-tight">
                      {record.programTitle}
                    </span>
                    <span className="text-xs text-[#64748B] mt-0.5">
                      at {record.organization}
                    </span>
                  </div>
                </TableCell>

                {/* Status */}
                <TableCell>
                  <span
                    className={`inline-flex items-center px-3 py-0.5 rounded-full text-xs font-semibold ${
                      record.status === "Issued"
                        ? "bg-[#E8FAF0] text-[#10B981]"
                        : "bg-[#F2F4FF] text-[#5160E7]"
                    }`}
                  >
                    {record.status}
                  </span>
                </TableCell>

                {/* Completed on */}
                <TableCell className="text-sm text-[#475467] whitespace-nowrap">
                  {record.completedOn}
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
                    <DropdownMenu aria-label="Certificate Actions">
                      <DropdownItem
                        key="view"
                        onPress={() => onViewCertificate?.(record)}
                      >
                        View Certificate
                      </DropdownItem>
                      {record.status === "Eligible" ? (
                        <DropdownItem
                          key="issue"
                          className="text-[#5160E7] font-semibold"
                          onPress={() => onIssueCertificate?.(record)}
                        >
                          Issue Certificate
                        </DropdownItem>
                      ) : (
                        <DropdownItem
                          key="download"
                          onPress={() => onDownloadPdf?.(record)}
                        >
                          Download PDF
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
