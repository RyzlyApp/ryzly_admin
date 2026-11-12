"use client";
import React from "react";

interface SubmissionsMetricsProps {
  metrics: {
    totalSubmissions: number;
    pendingReview: number;
    passed: number;
    needsImprovement: number;
  };
}

export default function SubmissionsMetrics({
  metrics,
}: SubmissionsMetricsProps) {
  const items = [
    { label: "Total Submissions", value: metrics.totalSubmissions },
    { label: "Pending Review", value: metrics.pendingReview },
    { label: "Passed", value: metrics.passed },
    { label: "Needs Improvement", value: metrics.needsImprovement },
  ];

  return (
    <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-6 py-2">
      {items.map((m, idx) => (
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
