"use client";
import React from "react";

interface CertificatesMetricsProps {
  issuedCount: number;
  eligibleCount: number;
}

export default function CertificatesMetrics({
  issuedCount,
  eligibleCount,
}: CertificatesMetricsProps) {
  return (
    <div className="w-full flex items-center justify-between gap-4 py-2">
      <div className="bg-white p-5 rounded-2xl shadow-xs space-y-3 w-full">
        <span className="text-xs font-semibold text-[#3A3A3C]">
          Certificates Issued
        </span>
        <p className="text-3xl font-bold text-[#101828] mt-1 tracking-tight">
          {issuedCount}
        </p>
      </div>

      <div className="bg-white p-5 rounded-2xl shadow-xs  space-y-3 w-full">
        <span className="text-xs font-semibold text-[#3A3A3C]">
          Current Eligible
        </span>
        <p className="text-3xl font-bold text-[#101828] mt-1 tracking-tight">
          {eligibleCount}
        </p>
      </div>
    </div>
  );
}
