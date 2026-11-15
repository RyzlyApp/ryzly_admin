"use client";
import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";
import { IParticipantSubmission } from "../types";

interface ParticipantFeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  submission: IParticipantSubmission | null;
  onSaveFeedback: (submissionId: string, feedback: string, status: "Passed" | "Needs Improvement" | "Pending") => void;
}

export default function ParticipantFeedbackModal({
  isOpen,
  onClose,
  submission,
  onSaveFeedback,
}: ParticipantFeedbackModalProps) {
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState<"Passed" | "Needs Improvement" | "Pending">("Passed");

  useEffect(() => {
    if (submission) {
      setComment(submission.feedbackComment || "");
      setStatus(submission.status);
    }
  }, [submission]);

  if (!submission) return null;

  const handleSave = () => {
    onSaveFeedback(submission.id, comment, status);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onClose} size="lg" placement="center">
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1 text-[#1D1348]">
          <span className="text-lg font-bold">Feedback for {submission.taskName}</span>
          <span className="text-xs text-[#64748B] font-normal">
            Submitted on {submission.submittedOn}
          </span>
        </ModalHeader>
        <ModalBody className="flex flex-col gap-4">
          <div>
            <label className="text-xs font-semibold text-[#344054] block mb-1.5">
              Review Status
            </label>
            <div className="flex gap-2">
              {(["Passed", "Needs Improvement", "Pending"] as const).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setStatus(s)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    status === s
                      ? s === "Passed"
                        ? "bg-[#E8FAF0] text-[#10B981] ring-2 ring-[#10B981]"
                        : s === "Needs Improvement"
                        ? "bg-[#FEF3F2] text-[#F04438] ring-2 ring-[#F04438]"
                        : "bg-[#FFFBEB] text-[#F59E0B] ring-2 ring-[#F59E0B]"
                      : "bg-gray-100 text-[#475467] hover:bg-gray-200"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-[#344054] block mb-1.5">
              Mentor / Reviewer Feedback
            </label>
            <textarea
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Provide constructive feedback and recommended improvements..."
              className="w-full p-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#5160E7] text-[#101828]"
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button variant="light" onPress={onClose} className="rounded-full text-sm">
            Cancel
          </Button>
          <Button
            className="bg-[#5160E7] text-white rounded-full text-sm font-semibold"
            onPress={handleSave}
          >
            Save Feedback
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
