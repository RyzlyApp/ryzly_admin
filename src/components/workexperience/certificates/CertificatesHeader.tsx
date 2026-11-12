"use client";
import React from "react";

export default function CertificatesHeader() {
  return (
    <div className="w-full flex flex-col gap-1">
      <h1 className="text-2xl lg:text-3xl font-bold text-[#1D1348] tracking-tight">
        Certificates
      </h1>
      <p className="text-sm text-[#475467] font-normal">
        Issue and manage certificates for participants.
      </p>
    </div>
  );
}
