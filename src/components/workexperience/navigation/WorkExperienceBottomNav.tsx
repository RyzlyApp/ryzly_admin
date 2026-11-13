"use client";
import React from "react";
import { Tooltip } from "@heroui/react";
import {
  RiHome5Line,
  RiBriefcaseLine,
  RiGroupLine,
  RiCheckboxCircleLine,
  RiBankCardLine,
} from "react-icons/ri";
import { HiOutlineClipboardCheck } from "react-icons/hi";
import { usePathname, useRouter } from "next/navigation";

export interface NavTabItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  href: string;
}

export const WORK_EXPERIENCE_NAV_TABS: NavTabItem[] = [
  { id: "overview", label: "Overview", icon: RiHome5Line, href: "/admin/work-experience" },
  { id: "programs", label: "Programs", icon: RiBriefcaseLine, href: "/admin/work-experience/programs" },
  { id: "participants", label: "Participants", icon: RiGroupLine, href: "/admin/work-experience/participants" },
  { id: "submissions", label: "Submissions", icon: HiOutlineClipboardCheck, href: "/admin/work-experience/submissions" },
  { id: "certificates", label: "Certificates", icon: RiCheckboxCircleLine, href: "/admin/work-experience/certificates" },
  { id: "payments", label: "Payments", icon: RiBankCardLine, href: "/admin/work-experience/payments" },
];

interface WorkExperienceBottomNavProps {
  onTabChange?: (tabId: string) => void;
}

export default function WorkExperienceBottomNav({
  onTabChange,
}: WorkExperienceBottomNavProps) {
  const router = useRouter();
  const pathname = usePathname();

  const getActiveTab = (): string => {
    if (pathname?.startsWith("/admin/work-experience/programs")) return "programs";
    if (pathname?.startsWith("/admin/work-experience/participants")) return "participants";
    if (
      pathname?.startsWith("/admin/work-experience/submissions") ||
      pathname?.startsWith("/admin/work-experience/assessments")
    )
      return "submissions";
    if (pathname?.startsWith("/admin/work-experience/certificates")) return "certificates";
    if (pathname?.startsWith("/admin/work-experience/payments")) return "payments";
    return "overview";
  };

  const activeTab = getActiveTab();

  const handleTabClick = (tab: NavTabItem) => {
    onTabChange?.(tab.id);
    if (tab.href !== pathname) {
      router.push(tab.href);
    }
  };

  return (
    <div className="fixed bottom-6 right-8 z-40">
      <div className="flex items-center gap-2 bg-[#FDE68A] border border-[#F59E0B]/30 rounded-full px-3 py-1.5 shadow-lg backdrop-blur-sm transition-all duration-200">
        {WORK_EXPERIENCE_NAV_TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <Tooltip
              key={tab.id}
              content={tab.label}
              placement="top"
              delay={200}
              classNames={{
                content: "text-xs font-medium text-gray-800 bg-white shadow-md border border-gray-100",
              }}
            >
              <button
                type="button"
                onClick={() => handleTabClick(tab)}
                aria-label={tab.label}
                aria-current={isActive ? "page" : undefined}
                className={`relative flex items-center justify-center transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-white text-gray-900 rounded-full p-2.5 shadow-sm"
                    : "text-[#78350F] hover:text-[#451A03] hover:bg-black/5 p-2 rounded-full"
                }`}
              >
                <Icon size={isActive ? 20 : 19} />
              </button>
            </Tooltip>
          );
        })}
      </div>
    </div>
  );
}
