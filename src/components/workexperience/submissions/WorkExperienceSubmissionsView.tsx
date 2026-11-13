"use client";
import React, { useMemo, useState } from "react";
import SubmissionsHeader from "./SubmissionsHeader";
import SubmissionsMetrics from "./SubmissionsMetrics";
import SubmissionsFilters from "./SubmissionsFilters";
import SubmissionsTable from "./SubmissionsTable";
import {
  INITIAL_SUBMISSIONS,
  INITIAL_SUBMISSIONS_METRICS,
  ISubmissionRecord,
} from "./types";
import { addToast } from "@heroui/toast";
import { useRouter } from "next/navigation";

export default function WorkExperienceSubmissionsView() {
  const router = useRouter();
  const [submissions] = useState<ISubmissionRecord[]>(INITIAL_SUBMISSIONS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProgram, setSelectedProgram] = useState("all");
  const [selectedIndustry, setSelectedIndustry] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("all");

  const filteredSubmissions = useMemo(() => {
    return submissions.filter((s) => {
      // Search
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = s.participantName.toLowerCase().includes(query);
        const matchesTitle = s.submissionTitle.toLowerCase().includes(query);
        const matchesTask = s.taskName.toLowerCase().includes(query);
        const matchesId = s.id.toLowerCase().includes(query);
        if (!matchesName && !matchesTitle && !matchesTask && !matchesId) {
          return false;
        }
      }

      // Program
      if (
        selectedProgram !== "all" &&
        !s.programTitle.toLowerCase().includes(selectedProgram.toLowerCase())
      ) {
        return false;
      }

      // Industry
      if (
        selectedIndustry !== "all" &&
        s.industry.toLowerCase() !== selectedIndustry.toLowerCase()
      ) {
        return false;
      }

      // Status
      if (
        selectedStatus !== "all" &&
        s.status.toLowerCase() !== selectedStatus.toLowerCase()
      ) {
        return false;
      }

      // Level
      if (
        selectedLevel !== "all" &&
        s.level.toLowerCase() !== selectedLevel.toLowerCase()
      ) {
        return false;
      }

      return true;
    });
  }, [
    submissions,
    searchQuery,
    selectedProgram,
    selectedIndustry,
    selectedStatus,
    selectedLevel,
  ]);

  const handleAddFeedback = (submission: ISubmissionRecord) => {
    router.push(`/admin/work-experience/submissions/${submission.id}?tab=feedback`);
  };

  const handleDownloadFiles = (submission: ISubmissionRecord) => {
    addToast({
      title: "Downloading Assets",
      description: `Downloading files for ${submission.participantName}'s submission...`,
      color: "primary",
    });
  };

  return (
    <div className="w-full p-6 lg:p-8 flex flex-col gap-6">
      <SubmissionsHeader />

      <SubmissionsMetrics metrics={INITIAL_SUBMISSIONS_METRICS} />

      <SubmissionsFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedProgram={selectedProgram}
        onProgramChange={setSelectedProgram}
        selectedIndustry={selectedIndustry}
        onIndustryChange={setSelectedIndustry}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        selectedLevel={selectedLevel}
        onLevelChange={setSelectedLevel}
      />

      <SubmissionsTable
        submissions={filteredSubmissions}
        onAddFeedback={handleAddFeedback}
        onDownloadFiles={handleDownloadFiles}
      />
    </div>
  );
}
