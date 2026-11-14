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
import { IPaymentRecord } from "./types";

interface PaymentsTableProps {
  payments: IPaymentRecord[];
  onViewReceipt?: (payment: IPaymentRecord) => void;
  onRefundPayment?: (payment: IPaymentRecord) => void;
  onRetryPayment?: (payment: IPaymentRecord) => void;
}

export default function PaymentsTable({
  payments,
  onViewReceipt,
  onRefundPayment,
  onRetryPayment,
}: PaymentsTableProps) {
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
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

  const renderStatusPill = (status: IPaymentRecord["status"]) => {
    switch (status) {
      case "Completed":
        return (
          <span className="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-semibold bg-[#E8FAF0] text-[#10B981]">
            Completed
          </span>
        );
      case "Pending":
        return (
          <span className="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-semibold bg-[#FFFBEB] text-[#F59E0B]">
            Pending
          </span>
        );
      case "Failed":
        return (
          <span className="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-semibold bg-[#FEF3F2] text-[#F04438]">
            Failed
          </span>
        );
    }
  };

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="w-full overflow-x-auto">
        <Table
          aria-label="Payments Table"
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
            <TableColumn key="paymentType" className="text-left text-sm font-bold text-[#1D1348]">
              Payment Type
            </TableColumn>
            <TableColumn key="amount" className="text-left text-sm font-bold text-[#1D1348]">
              Amount
            </TableColumn>
            <TableColumn key="status" className="text-left text-sm font-bold text-[#1D1348]">
              Status
            </TableColumn>
            <TableColumn key="date" className="text-left text-sm font-bold text-[#1D1348]">
              Date
            </TableColumn>
            <TableColumn key="actions" align="end" className="w-12 text-right">
              <span className="sr-only">Actions</span>
            </TableColumn>
          </TableHeader>

          <TableBody
            items={payments}
            emptyContent="No payments found matching your filter criteria."
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

                {/* Payment Type */}
                <TableCell>
                  <span className="text-sm font-semibold text-[#5160E7]">
                    {record.paymentType}
                  </span>
                </TableCell>

                {/* Amount */}
                <TableCell className="text-sm font-medium text-[#344054] whitespace-nowrap">
                  {record.amount}
                </TableCell>

                {/* Status */}
                <TableCell>{renderStatusPill(record.status)}</TableCell>

                {/* Date */}
                <TableCell className="text-sm text-[#475467] whitespace-nowrap">
                  {record.date}
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
                    <DropdownMenu aria-label="Payment Actions">
                      <DropdownItem
                        key="receipt"
                        onPress={() => onViewReceipt?.(record)}
                      >
                        View Receipt
                      </DropdownItem>
                      {record.status === "Completed" ? (
                        <DropdownItem
                          key="refund"
                          className="text-[#F04438]"
                          onPress={() => onRefundPayment?.(record)}
                        >
                          Refund Payment
                        </DropdownItem>
                      ) : (
                        <DropdownItem
                          key="retry"
                          className="text-[#5160E7]"
                          onPress={() => onRetryPayment?.(record)}
                        >
                          Retry Payment
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
