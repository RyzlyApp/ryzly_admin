"use client";
import React, { useState } from "react";
import ParticipantDetailsHeader from "./ParticipantDetailsHeader";
import ParticipantDetailsCards from "./ParticipantDetailsCards";
import ParticipantSubmissionsTable from "./ParticipantSubmissionsTable";
import ParticipantFeedbackModal from "./ParticipantFeedbackModal";
import { INITIAL_PARTICIPANTS, IParticipant, IParticipantSubmission } from "../types";
import { addToast } from "@heroui/toast";

interface WorkExperienceParticipantDetailsViewProps {
  id?: string;
}

export default function WorkExperienceParticipantDetailsView({
  id,
}: WorkExperienceParticipantDetailsViewProps) {
  const [participants, setParticipants] = useState<IParticipant[]>(INITIAL_PARTICIPANTS);

  const participant =
    participants.find((p) => p.id === id) || participants[0];

  const [activeSubmission, setActiveSubmission] = useState<IParticipantSubmission | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenFeedback = (submission: IParticipantSubmission) => {
    setActiveSubmission(submission);
    setIsModalOpen(true);
  };

  const handleSaveFeedback = (
    submissionId: string,
    comment: string,
    status: "Passed" | "Needs Improvement" | "Pending"
  ) => {
    setParticipants((prev) =>
      prev.map((p) => {
        if (p.id !== participant.id) return p;
        const updatedSubs = (p.submissions || []).map((s) => {
          if (s.id !== submissionId) return s;
          return {
            ...s,
            feedbackComment: comment,
            status,
            feedbackStatus: "View feedback" as const,
          };
        });
        return {
          ...p,
          submissions: updatedSubs,
        };
      })
    );

    addToast({
      title: "Feedback Saved",
      description: "Feedback and task status updated successfully",
      color: "success",
    });
  };

  const handleMessage = () => {
    addToast({
      title: "Direct Message",
      description: `Opening message thread with ${participant.name}...`,
      color: "primary",
    });
  };

  return (
    <div className="w-full p-6 lg:p-8 flex flex-col gap-8">
      <ParticipantDetailsHeader
        participant={participant}
        onMessage={handleMessage}
      />

      <ParticipantDetailsCards participant={participant} />

      <ParticipantSubmissionsTable
        submissions={participant.submissions || []}
        onOpenFeedback={handleOpenFeedback}
      />

      <ParticipantFeedbackModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        submission={activeSubmission}
        onSaveFeedback={handleSaveFeedback}
      />
    </div>
  );
}
