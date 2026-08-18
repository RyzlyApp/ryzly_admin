"use client";

import React, { useState } from "react";
import { TransactionTable } from "@/components/admin/transactions/TransactionTable";
import { TransactionDetailModal } from "@/components/admin/transactions/TransactionDetailModal"; 
import { CustomSelect } from "@/components/custom";
import { Formik, Form } from "formik";
import { useFetchData } from "@/hook/useFetchData";
import { LoadingLayout } from "@/components/shared";
import { DatePicker } from "@heroui/react";
import { DateValue, getLocalTimeZone } from "@internationalized/date";

export interface ServerTransaction {
  _id: string;
  isDeleted: boolean;
  type: string;
  creatorType: string;
  source: string;
  flow: string;
  typeId: string;
  reference: string;
  amount: number;
  senderId: any;
  currencyType: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

export default function TransactionsPage() {
  const [selectedTransaction, setSelectedTransaction] =
    useState<ServerTransaction | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  
  // React state for HeroUI date pickers
  const [startDate, setStartDate] = useState<DateValue | null>(null);
  const [endDate, setEndDate] = useState<DateValue | null>(null);

  const { data, isLoading } = useFetchData<ServerTransaction[]>({
    name: "transactions",
    endpoint: "/analytics/admin/transactions",
  });

  const rawTransactions = data || [];

  const handleTransactionClick = (transaction: ServerTransaction) => {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Formik
      initialValues={{
        typeFilter: "all",
        flowFilter: "all",
        statusFilter: "all",
      }}
      onSubmit={() => {}}
    >
      {({ values, resetForm }) => {
        // Filter transactions based on Formik values and date range states
        const filteredTransactions = rawTransactions.filter((tx) => {
          if (values.typeFilter !== "all" && tx.type !== values.typeFilter) {
            return false;
          }
          if (values.flowFilter !== "all" && tx.flow !== values.flowFilter) {
            return false;
          }
          if (values.statusFilter !== "all" && tx.status !== values.statusFilter) {
            return false;
          }
          if (startDate) {
            const startJsDate = startDate.toDate(getLocalTimeZone());
            startJsDate.setHours(0, 0, 0, 0);
            if (!tx.createdAt || new Date(tx.createdAt).getTime() < startJsDate.getTime()) {
              return false;
            }
          }
          if (endDate) {
            const endJsDate = endDate.toDate(getLocalTimeZone());
            endJsDate.setHours(23, 59, 59, 999);
            if (!tx.createdAt || new Date(tx.createdAt).getTime() > endJsDate.getTime()) {
              return false;
            }
          }
          return true;
        });

        const itemsPerPage = 10;
        const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
        const activePage = Math.min(currentPage, Math.max(1, totalPages));

        const paginatedTransactions = filteredTransactions.slice(
          (activePage - 1) * itemsPerPage,
          activePage * itemsPerPage
        );

        return (
          <div className="p-6 bg-white rounded-lg">
            <Form className="flex flex-wrap items-end gap-4 mb-6">
              {/* Type Select */}
              <div className="w-48">
                <CustomSelect
                  name="typeFilter"
                  label="Transaction Type"
                  options={[
                    { value: "all", label: "All Types" },
                    { value: "DEPOSIT", label: "Deposit" },
                    { value: "WITHDRAW", label: "Withdraw" },
                    { value: "CHALLENGE_FEE", label: "Challenge Fee" },
                    { value: "CHALLENGE_REWARD", label: "Challenge Reward" },
                  ]}
                  placeholder="Select type"
                />
              </div>

              {/* Flow Select */}
              <div className="w-40">
                <CustomSelect
                  name="flowFilter"
                  label="Flow"
                  options={[
                    { value: "all", label: "All Flows" },
                    { value: "INBOUND", label: "Inbound" },
                    { value: "OUTBOUND", label: "Outbound" },
                  ]}
                  placeholder="Select flow"
                />
              </div>

              {/* Status Select */}
              <div className="w-40">
                <CustomSelect
                  name="statusFilter"
                  label="Status"
                  options={[
                    { value: "all", label: "All Statuses" },
                    { value: "SUCCESS", label: "Success" },
                    { value: "FAILED", label: "Failed" },
                    { value: "PENDING", label: "Pending" },
                  ]}
                  placeholder="Select status"
                />
              </div>

              {/* Start Date picker (HeroUI) */}
              <div className="w-48">
                <DatePicker
                  label="Start Date"
                  value={startDate}
                  onChange={setStartDate}
                  className="w-full"
                />
              </div>

              {/* End Date picker (HeroUI) */}
              <div className="w-48">
                <DatePicker
                  label="End Date"
                  value={endDate}
                  onChange={setEndDate}
                  className="w-full"
                />
              </div>

              {/* Reset Button */}
              <div>
                <button
                  type="button"
                  onClick={() => {
                    resetForm();
                    setStartDate(null);
                    setEndDate(null);
                    setCurrentPage(1);
                  }}
                  style={{ height: "45px" }}
                  className="px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-xl border border-gray-300 transition-colors duration-150 cursor-pointer"
                >
                  Reset Filters
                </button>
              </div>
            </Form>

            <LoadingLayout loading={isLoading} lenght={filteredTransactions.length}>
              <TransactionTable
                transactions={paginatedTransactions}
                onTransactionClick={handleTransactionClick}
                currentPage={activePage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </LoadingLayout>

            {selectedTransaction && (
              <TransactionDetailModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                transaction={selectedTransaction}
              />
            )}
          </div>
        );
      }}
    </Formik>
  );
}
