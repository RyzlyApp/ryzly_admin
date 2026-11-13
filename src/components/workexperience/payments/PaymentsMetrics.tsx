"use client";
import React from "react";
import { IPaymentsSummary } from "./types";

interface PaymentsMetricsProps {
  summary: IPaymentsSummary;
}

export default function PaymentsMetrics({ summary }: PaymentsMetricsProps) {
  const metrics = [
    { label: "Total Revenue", value: summary.totalRevenue },
    { label: "Completed Payments", value: summary.completedPayments },
    { label: "Pending", value: summary.pending },
    { label: "Failed", value: summary.failed },
  ];

  return (
    <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-6 py-2">
      {metrics.map((m, idx) => (
        <div key={idx} className="flex flex-col bg-white rounded-2xl shadow-xs p-5 space-y-3">
          <span className="text-xs font-semibold text-[#3A3A3C]">
            {m.label}
          </span>
          <p className="text-2xl lg:text-3xl font-bold text-[#101828] mt-1 tracking-tight">
            {m.value}
          </p>
        </div>
      ))}
    </div>
  );
}
