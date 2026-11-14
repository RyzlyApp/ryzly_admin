"use client";
import React from "react";

export default function WorkExperienceOverviewHeader() {
  return (
    <div className="w-full bg-white rounded-2xl border border-gray-100 shadow-xs p-6 lg:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
      <div className="max-w-xl z-10">
        <h1 className="text-2xl lg:text-3xl font-bold text-[#1D1348] tracking-tight">
          Work Experience Management
        </h1>
        <p className="text-sm text-[#475467] mt-1.5 font-normal leading-relaxed">
          Create, manage and track simulated work experiences that help talents build
          real-world skills.
        </p>
      </div>

      {/* Decorative Briefcase & Badge Illustration */}
      <div className="relative shrink-0 flex items-center justify-center w-48 h-32 md:w-56 md:h-36">
        <div className="relative w-40 h-28 bg-[#5160E7] rounded-2xl shadow-md flex items-center justify-center">
          {/* Briefcase Handle */}
          <div className="absolute -top-3 w-14 h-5 border-3 border-[#5160E7] rounded-t-lg bg-white/20" />
          {/* Briefcase Center Lock */}
          <div className="w-3.5 h-3.5 rounded bg-white shadow-sm" />

          {/* Overlapping ID Card */}
          <div className="absolute -bottom-3 -right-4 w-28 h-18 bg-white rounded-xl shadow-lg border border-gray-100 p-2.5 flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-[#EEF2FF] flex items-center justify-center text-[#5160E7] shrink-0">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <div className="flex flex-col gap-1 w-full">
              <div className="w-12 h-1.5 rounded-full bg-[#5160E7]" />
              <div className="w-9 h-1 rounded-full bg-gray-200" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
