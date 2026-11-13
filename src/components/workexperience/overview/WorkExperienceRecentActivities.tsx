"use client";
import React from "react";

interface ActivityItem {
  id: string;
  title: string;
  time: string;
}

const ACTIVITIES: ActivityItem[] = [
  { id: "1", title: "48 new participants enrolled", time: "2 hours ago" },
  { id: "2", title: "Product Design Work Experience completed", time: "4 hours ago" },
  { id: "3", title: "32 certificate requests submitted", time: "6 hours ago" },
  { id: "4", title: "New programme published: Data Analysis", time: "1 day ago" },
];

export default function WorkExperienceRecentActivities() {
  return (
    <div className="w-full bg-white rounded-2xl border border-gray-100 shadow-xs p-6 flex flex-col justify-between h-fit">
      <h3 className="text-base font-bold text-[#101828] mb-4">
        Recent Activities
      </h3>

      <div className="flex flex-col divide-y divide-gray-100">
        {ACTIVITIES.map((act) => (
          <div
            key={act.id}
            className="py-3.5 first:pt-0 last:pb-0 flex items-center justify-between gap-4"
          >
            <span className="text-xs lg:text-sm font-medium text-[#101828]">
              {act.title}
            </span>
            <span className="text-xs text-[#64748B] shrink-0 font-normal">
              {act.time}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
