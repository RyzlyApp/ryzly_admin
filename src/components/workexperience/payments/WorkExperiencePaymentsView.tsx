"use client";
import React, { useMemo, useState } from "react";
import PaymentsHeader from "./PaymentsHeader";
import PaymentsMetrics from "./PaymentsMetrics";
import PaymentsFilters from "./PaymentsFilters";
import PaymentsTable from "./PaymentsTable";
import { INITIAL_PAYMENTS, IPaymentRecord, IPaymentsSummary } from "./types";
import { addToast } from "@heroui/toast";

export default function WorkExperiencePaymentsView() {
  const [payments, setPayments] = useState<IPaymentRecord[]>(INITIAL_PAYMENTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProgram, setSelectedProgram] = useState("all");
  const [selectedPaymentType, setSelectedPaymentType] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const filteredPayments = useMemo(() => {
    return payments.filter((p) => {
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = p.participantName.toLowerCase().includes(query);
        const matchesEmail = p.email?.toLowerCase().includes(query) ?? false;
        const matchesId = p.id.toLowerCase().includes(query);
        if (!matchesName && !matchesEmail && !matchesId) return false;
      }

      // Program filter
      if (
        selectedProgram !== "all" &&
        !p.programTitle.toLowerCase().includes(selectedProgram.toLowerCase())
      ) {
        return false;
      }

      // Payment Type filter
      if (
        selectedPaymentType !== "all" &&
        p.paymentType.toLowerCase() !== selectedPaymentType.toLowerCase()
      ) {
        return false;
      }

      // Status filter
      if (
        selectedStatus !== "all" &&
        p.status.toLowerCase() !== selectedStatus.toLowerCase()
      ) {
        return false;
      }

      return true;
    });
  }, [payments, searchQuery, selectedProgram, selectedPaymentType, selectedStatus]);

  const summary: IPaymentsSummary = {
    totalRevenue: "₦720,000",
    completedPayments: "₦620,000",
    pending: "₦20,000",
    failed: "₦100,000",
  };

  const handleViewReceipt = (payment: IPaymentRecord) => {
    addToast({
      title: "View Receipt",
      description: `Viewing transaction receipt for ${payment.participantName} (${payment.amount})`,
      color: "primary",
    });
  };

  const handleRefundPayment = (payment: IPaymentRecord) => {
    setPayments((prev) =>
      prev.map((p) => (p.id === payment.id ? { ...p, status: "Failed" } : p))
    );
    addToast({
      title: "Payment Refunded",
      description: `Refund initiated for ${payment.participantName} (${payment.amount})`,
      color: "warning",
    });
  };

  const handleRetryPayment = (payment: IPaymentRecord) => {
    setPayments((prev) =>
      prev.map((p) => (p.id === payment.id ? { ...p, status: "Completed" } : p))
    );
    addToast({
      title: "Payment Successful",
      description: `Payment reprocessed for ${payment.participantName}`,
      color: "success",
    });
  };

  return (
    <div className="w-full p-6 lg:p-8 flex flex-col gap-6">
      <PaymentsHeader />

      <PaymentsMetrics summary={summary} />

      <PaymentsFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedProgram={selectedProgram}
        onProgramChange={setSelectedProgram}
        selectedPaymentType={selectedPaymentType}
        onPaymentTypeChange={setSelectedPaymentType}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
      />

      <PaymentsTable
        payments={filteredPayments}
        onViewReceipt={handleViewReceipt}
        onRefundPayment={handleRefundPayment}
        onRetryPayment={handleRetryPayment}
      />
    </div>
  );
}
