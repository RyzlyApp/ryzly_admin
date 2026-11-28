"use client";
import React from "react";
import { WizardStep } from "./types";

interface CreateWorkExpFooterProps {
  currentStep: WizardStep;
  onPrev: () => void;
  onNext: () => void;
  onSaveDraft: () => void;
  isLastStep?: boolean;
  returnToReview?: boolean;
}

export default function CreateWorkExpFooter({
  currentStep,
  onPrev,
  onNext,
  onSaveDraft,
  isLastStep = false,
  returnToReview = false,
}: CreateWorkExpFooterProps) {
  const getPrevLabel = () => {
    switch (currentStep) {
      case 1:
        return "Back to Performance";
      case 2:
        return "Back to Basic Information";
      case 3:
        return "Back to Company";
      case 4:
        return "Back to Experience Levels";
      case 5:
        return "Back to Assessment";
      case 6:
        return "Back to Assessment";
      default:
        return "Back";
    }
  };

  return (
    <div className="w-full flex items-center justify-between py-6 mt-4">
      {/* Back Button */}
      {currentStep > 1 ? (
        <button
          type="button"
          onClick={onPrev}
          className="px-5 py-2.5 rounded-full bg-white border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-colors cursor-pointer shadow-sm"
        >
          {getPrevLabel()}
        </button>
      ) : (
        <div />
      )}

      {/* Action Buttons */}
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onSaveDraft}
          className="text-sm font-medium text-gray-600 hover:text-gray-900 px-3 py-2 transition-colors cursor-pointer"
        >
          Save as Draft
        </button>

        <button
          type="button"
          onClick={onNext}
          className="px-6 py-2.5 rounded-full bg-[#5160E7] text-white text-sm font-medium hover:bg-[#4351d1] transition-all shadow-sm cursor-pointer"
        >
          {returnToReview
            ? "Save & Return to Review"
            : isLastStep
            ? "Publish"
            : "Save & Next"}
        </button>
      </div>
    </div>
  );
}
