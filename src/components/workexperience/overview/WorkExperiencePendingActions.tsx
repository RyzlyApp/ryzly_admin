"use client";
import React from "react";
import Link from "next/link";
import { RiArrowRightLine } from "react-icons/ri";

interface PendingActionItem {
  id: string;
  title: string;
  href: string;
}

const ACTIONS: PendingActionItem[] = [
  { id: "1", title: "24 submissions to review", href: "/admin/work-experience/assessments" },
  { id: "2", title: "18 certificate requests to approve", href: "/admin/work-experience/certificates" },
  { id: "3", title: "Create your next work programme", href: "/admin/work-experience/programs" },
];

export default function WorkExperiencePendingActions() {
  return (
    <div className="w-full bg-white rounded-2xl border border-gray-100 shadow-xs p-6 flex flex-col h-full">
      <div className="flex items-center gap-2 mb-6">
        <h3 className="text-base font-bold text-[#101828]">Pending Actions</h3>
        <span className="w-5 h-5 rounded-full bg-[#EA580C] text-white text-[11px] font-bold flex items-center justify-center">
          3
        </span>
      </div>

      <div className="flex flex-col gap-3.5">
        {ACTIONS.slice(0,4).map((action) => (
          <Link
            key={action.id}
            href={action.href}
            className="py-2.5 first:pt-0 last:pb-0 flex items-center justify-between text-xs lg:text-sm font-medium text-[#101828] hover:text-[#5160E7] transition-colors group"
          >
            <span>{action.title}</span>
            <RiArrowRightLine
              size={18}
              className="text-[#64748B] group-hover:text-[#5160E7] group-hover:translate-x-0.5 transition-all"
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
