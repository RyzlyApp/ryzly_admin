"use client";
import React from "react";
import { Tabs, Tab } from "@heroui/react";
import { HiArrowLeft } from "react-icons/hi";
import { useRouter } from "next/navigation";

interface SubmissionDetailsHeaderProps {
  activeTab: "submission" | "feedback";
  onTabChange: (tab: "submission" | "feedback") => void;
  onAddFeedback?: () => void;
}

export default function SubmissionDetailsHeader({
  activeTab,
  onTabChange,
  onAddFeedback,
}: SubmissionDetailsHeaderProps) {
  const router = useRouter();

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Back button */}
      <div>
        <button
          type="button"
          onClick={() => router.push("/admin/work-experience/submissions")}
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#5160E7] hover:underline cursor-pointer transition-colors"
        >
          <HiArrowLeft size={16} />
          <span>Back to Submissions</span>
        </button>
      </div>

      {/* Title & Action Row */}
      <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl lg:text-3xl font-bold text-[#1D1348]">
          Submission Details
        </h1>

        <button
          type="button"
          onClick={onAddFeedback}
          className="px-6 py-2.5 bg-[#5160E7] hover:bg-[#4351D0] text-white text-sm font-semibold rounded-full shadow-sm transition-colors cursor-pointer self-start sm:self-auto"
        >
          Add Feedback
        </button>
      </div>

      {/* Tabs using HeroUI */}
      <Tabs
        aria-label="Submission Details Tabs"
        selectedKey={activeTab}
        onSelectionChange={(key) => onTabChange(key as "submission" | "feedback")}
        radius="full"
        variant="underlined"
        classNames={{
          base: "w-fit bg-white rounded-2xl",
          tabList: "p-1 gap-1",
          cursor: "bg-[#5160E7]",
          tab: "px-5 h-8 text-xs font-medium text-[#64748B] data-[selected=true]:text-[#101828] data-[selected=true]:font-semibold",
          tabContent: "group-data-[selected=true]:text-[#101828] group-data-[selected=true]:font-semibold text-[#64748B]",
        }}
      >
        <Tab key="submission" title="Submission" />
        <Tab key="feedback" title="Feedback" />
      </Tabs>
    </div>
  );
}
