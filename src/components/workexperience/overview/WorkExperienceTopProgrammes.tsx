"use client";
import React from "react";
import Link from "next/link";
import {
  RiComputerLine,
  RiBarChartLine,
  RiMegaphoneLine,
} from "react-icons/ri";
import { HiOutlineDotsVertical } from "react-icons/hi";

interface TopProgramItem {
  id: string;
  title: string;
  participants: number;
  completion: number;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

const TOP_PROGRAMS: TopProgramItem[] = [
  {
    id: "1",
    title: "Product Design Work Experience",
    participants: 342,
    completion: 88,
    icon: RiComputerLine,
  },
  {
    id: "2",
    title: "Data Analysis Work Experience",
    participants: 278,
    completion: 85,
    icon: RiBarChartLine,
  },
  {
    id: "3",
    title: "Digital Marketing Work Experience",
    participants: 198,
    completion: 82,
    icon: RiMegaphoneLine,
  },
];

export default function WorkExperienceTopProgrammes() {
  return (
    <div className="w-full bg-white rounded-2xl border border-gray-100 shadow-xs p-6 flex flex-col justify-between h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-bold text-[#101828]">Top Programmes</h3>
        <Link
          href="/admin/work-experience/programs"
          className="text-xs font-semibold text-[#5160E7] hover:underline flex items-center gap-1 cursor-pointer"
        >
          View all →
        </Link>
      </div>

      <div className="flex flex-col divide-y divide-gray-100">
        {TOP_PROGRAMS.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className="py-3.5 first:pt-0 last:pb-0 flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#F2F4FF] flex items-center justify-center text-[#5160E7] shrink-0">
                  <Icon size={20} />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-[#101828]">
                    {item.title}
                  </span>
                  <span className="text-xs text-[#64748B] mt-0.5">
                    {item.participants} participants • {item.completion}% completion
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="bg-[#E8FAF0] text-[#10B981] text-xs font-medium px-2.5 py-0.5 rounded-full">
                  Active
                </span>
                <button
                  type="button"
                  aria-label="Options"
                  className="p-1 rounded text-gray-400 hover:text-gray-700 hover:bg-gray-100 cursor-pointer"
                >
                  <HiOutlineDotsVertical size={16} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
