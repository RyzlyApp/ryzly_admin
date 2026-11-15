"use client";
import React, { useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import SubmissionDetailsHeader from "./SubmissionDetailsHeader";
import SubmissionOverviewTab from "./SubmissionOverviewTab";
import SubmissionFeedbackTab from "./SubmissionFeedbackTab";
import {
  DEFAULT_SUBMISSION_DETAILS,
  ISubmissionDetails,
} from "../types";

interface WorkExperienceSubmissionDetailsViewProps {
  id?: string;
  initialTab?: "submission" | "feedback";
}

export default function WorkExperienceSubmissionDetailsView({
  id,
  initialTab = "submission",
}: WorkExperienceSubmissionDetailsViewProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [submission, setSubmission] = useState<ISubmissionDetails>({
    ...DEFAULT_SUBMISSION_DETAILS,
    ...(id ? { id } : {}),
  });

  const tabParam = searchParams.get("tab");
  const activeTab: "submission" | "feedback" =
    tabParam === "feedback"
      ? "feedback"
      : tabParam === "submission"
      ? "submission"
      : initialTab;

  const handleTabChange = (nextTab: "submission" | "feedback") => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", nextTab);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleSaveFeedback = (feedbackData: {
    generalFeedback: string;
    outcome: "Passed" | "Needs Improvement";
    whatTheyDidWell: string;
    whatToImprove?: string;
    smallSuggestion?: string;
  }) => {
    setSubmission((prev) => ({
      ...prev,
      status: feedbackData.outcome,
      feedbackData,
    }));
  };

  return (
    <div className="w-full p-6 lg:p-8 flex flex-col gap-8">
      <SubmissionDetailsHeader
        activeTab={activeTab}
        onTabChange={handleTabChange}
        onAddFeedback={() => handleTabChange("feedback")}
      />

      {activeTab === "submission" ? (
        <SubmissionOverviewTab submission={submission} />
      ) : (
        <SubmissionFeedbackTab
          submission={submission}
          onSaveFeedback={handleSaveFeedback}
        />
      )}
    </div>
  );
}
