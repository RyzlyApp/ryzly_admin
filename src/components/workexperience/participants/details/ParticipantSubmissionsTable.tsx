"use client";
import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { IParticipantSubmission } from "../types";

interface ParticipantSubmissionsTableProps {
  submissions: IParticipantSubmission[];
  onOpenFeedback: (submission: IParticipantSubmission) => void;
}

export default function ParticipantSubmissionsTable({
  submissions,
  onOpenFeedback,
}: ParticipantSubmissionsTableProps) {
  const renderStatusPill = (status: IParticipantSubmission["status"]) => {
    switch (status) {
      case "Passed":
        return (
          <span className="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-semibold bg-[#E8FAF0] text-[#10B981]">
            Passed
          </span>
        );
      case "Needs Improvement":
        return (
          <span className="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-semibold bg-[#FEF3F2] text-[#F04438]">
            Needs Improvement
          </span>
        );
      case "Pending":
      default:
        return (
          <span className="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-semibold bg-[#FFFBEB] text-[#F59E0B]">
            Pending
          </span>
        );
    }
  };

  return (
    <div className="w-full flex flex-col gap-4 mt-4 bg-white p-5 rounded-2xl shadow-xs">
      <h2 className="text-xl font-bold text-[#1D1348]">Submissions</h2>

      <div className="w-full overflow-x-auto">
        <Table
          aria-label="Participant Submissions Table"
          removeWrapper
          classNames={{
            base: "w-full",
            table: "min-w-[700px]",
            thead: "[&>tr]:first:shadow-none",
            th: "bg-transparent text-left text-sm font-bold text-[#1D1348] border-b border-gray-100 py-4 shadow-none first:rounded-none last:rounded-none",
            td: "py-4 align-middle first:rounded-none last:rounded-none",
            tr: " transition-colors",
          }}
        >
          <TableHeader>
            <TableColumn key="task" className="text-left text-sm font-bold text-[#1D1348]">
              Task
            </TableColumn>
            <TableColumn key="submittedOn" className="text-left text-sm font-bold text-[#1D1348]">
              Submitted on
            </TableColumn>
            <TableColumn key="feedback" className="text-left text-sm font-bold text-[#1D1348]">
              Feedback
            </TableColumn>
            <TableColumn key="status" className="text-left text-sm font-bold text-[#1D1348]">
              Status
            </TableColumn>
            <TableColumn key="actions" align="end" className="w-12 text-right">
              <span className="sr-only">Actions</span>
            </TableColumn>
          </TableHeader>

          <TableBody
            items={submissions}
            emptyContent="No task submissions recorded for this participant."
          >
            {(item) => (
              <TableRow key={item.id}>
                {/* Task */}
                <TableCell className="text-sm font-semibold text-[#101828]">
                  {item.taskName}
                </TableCell>

                {/* Submitted on */}
                <TableCell className="text-sm text-[#475467] whitespace-nowrap">
                  {item.submittedOn}
                </TableCell>

                {/* Feedback */}
                <TableCell>
                  <button
                    type="button"
                    onClick={() => onOpenFeedback(item)}
                    className="text-sm font-semibold text-[#5160E7] hover:underline cursor-pointer"
                  >
                    {item.feedbackStatus}
                  </button>
                </TableCell>

                {/* Status */}
                <TableCell>{renderStatusPill(item.status)}</TableCell>

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
                    <DropdownMenu aria-label="Submission Actions">
                      <DropdownItem
                        key="feedback"
                        onPress={() => onOpenFeedback(item)}
                      >
                        Review Feedback
                      </DropdownItem>
                      <DropdownItem key="view">
                        View Submission Files
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
