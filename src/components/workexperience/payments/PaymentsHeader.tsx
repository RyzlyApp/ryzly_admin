"use client";
import React from "react";

export default function PaymentsHeader() {
  return (
    <div className="w-full flex flex-col gap-1">
      <h1 className="text-2xl lg:text-3xl font-bold text-[#1D1348] tracking-tight">
        Payments
      </h1>
      <p className="text-sm text-[#475467] font-normal">
        Monitor all payments, including program access and certificate fees.
      </p>
    </div>
  );
}
