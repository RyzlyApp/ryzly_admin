"use client";
import React from "react";
import {
  RiBriefcaseLine,
  RiGroupLine,
  RiCheckboxCircleLine,
  RiAwardLine,
} from "react-icons/ri";

interface StatItem {
  count: string;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

const STATS: StatItem[] = [
  { count: "12", label: "Work Programmes", icon: RiBriefcaseLine },
  { count: "1,248", label: "Participants", icon: RiGroupLine },
  { count: "892", label: "Completed", icon: RiCheckboxCircleLine },
  { count: "326", label: "Certificates Issued", icon: RiAwardLine },
];

export default function WorkExperienceStatsCards() {
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {STATS.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <div
            key={idx}
            className="bg-white rounded-2xl border border-gray-100 shadow-xs p-5 flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-[#F2F4FF] flex items-center justify-center text-[#5160E7] shrink-0">
              <Icon size={24} />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-[#101828] leading-tight">
                {stat.count}
              </span>
              <span className="text-xs text-[#475467] font-medium mt-0.5">
                {stat.label}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
