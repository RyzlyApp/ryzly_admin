"use client";
import React from "react";
import { ISubmissionDetails } from "../types";
import { addToast } from "@heroui/toast";
import { CustomForm, CustomEditor, CustomButton } from "@/components/custom";

interface SubmissionFeedbackTabProps {
  submission: ISubmissionDetails;
  onSaveFeedback?: (feedbackData: {
    generalFeedback: string;
    outcome: "Passed" | "Needs Improvement";
    whatTheyDidWell: string;
    whatToImprove?: string;
    smallSuggestion?: string;
  }) => void;
}

interface FormValues {
  generalFeedback: string;
  outcome: "Passed" | "Needs Improvement";
  whatTheyDidWell: string;
  whatToImprove: string;
  smallSuggestion: string;
}

export default function SubmissionFeedbackTab({
  submission,
  onSaveFeedback,
}: SubmissionFeedbackTabProps) {
  const initialValues: FormValues = {
    generalFeedback:
      submission.feedbackData?.generalFeedback || "This is a test project",
    outcome: submission.feedbackData?.outcome || "Needs Improvement",
    whatTheyDidWell:
      submission.feedbackData?.whatTheyDidWell || "This is a test project",
    whatToImprove:
      submission.feedbackData?.whatToImprove || "This is a test project",
    smallSuggestion:
      submission.feedbackData?.smallSuggestion || "This is a test project",
  };

  const handleSubmit = (values: FormValues) => {
    const data = {
      generalFeedback: values.generalFeedback,
      outcome: values.outcome,
      whatTheyDidWell: values.whatTheyDidWell,
      ...(values.outcome === "Needs Improvement"
        ? { whatToImprove: values.whatToImprove }
        : { smallSuggestion: values.smallSuggestion }),
    };

    onSaveFeedback?.(data);

    addToast({
      title: "Feedback Recorded",
      description: `Evaluation saved with outcome: ${values.outcome}`,
      color: values.outcome === "Passed" ? "success" : "warning",
    });
  };

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Left Column (Interactive Feedback Formulation via CustomForm) */}
      <div className="lg:col-span-7 bg-white p-5 rounded-2xl shadow-xs">
        <CustomForm<FormValues>
          initialValues={initialValues}
          onSubmit={handleSubmit}
          className="flex flex-col gap-6"
        >
          {({ values, setFieldValue }) => (
            <>
              {/* General Feedback Editor using CustomEditor */}
              <div className="flex flex-col gap-1.5">
                <CustomEditor
                  name="generalFeedback"
                  label="Feedback"
                  height="120px"
                  placeholder="Provide overall feedback..."
                />
              </div>

              {/* Outcome Selector (Radio Cards) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Passed Card */}
                <div
                  onClick={() => setFieldValue("outcome", "Passed")}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 ${
                    values.outcome === "Passed"
                      ? "border-[#5160E7] ring-1 ring-[#5160E7] bg-white shadow-xs"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                >
                  <div className="mt-0.5">
                    <input
                      type="radio"
                      name="outcome"
                      checked={values.outcome === "Passed"}
                      onChange={() => setFieldValue("outcome", "Passed")}
                      className="w-4 h-4 text-[#5160E7] focus:ring-[#5160E7] cursor-pointer"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-[#101828]">
                      Passed
                    </span>
                    <span className="text-xs text-[#64748B] mt-0.5 leading-snug">
                      Meets all core requirements and criteria.
                    </span>
                  </div>
                </div>

                {/* Needs Improvement Card */}
                <div
                  onClick={() => setFieldValue("outcome", "Needs Improvement")}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 ${
                    values.outcome === "Needs Improvement"
                      ? "border-[#5160E7] ring-1 ring-[#5160E7] bg-white shadow-xs"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                >
                  <div className="mt-0.5">
                    <input
                      type="radio"
                      name="outcome"
                      checked={values.outcome === "Needs Improvement"}
                      onChange={() =>
                        setFieldValue("outcome", "Needs Improvement")
                      }
                      className="w-4 h-4 text-[#5160E7] focus:ring-[#5160E7] cursor-pointer"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-[#101828]">
                      Needs Improvement
                    </span>
                    <span className="text-xs text-[#64748B] mt-0.5 leading-snug">
                      Partially meets requirements. Re-submission advised.
                    </span>
                  </div>
                </div>
              </div>

              {/* What they did well */}
              <div className="flex flex-col gap-1.5">
                <CustomEditor
                  name="whatTheyDidWell"
                  label="What they did well"
                  height="120px"
                  placeholder="Highlight key strengths and well-executed parts..."
                />
              </div>

              {/* Dynamic section: What to improve (Needs Improvement) OR A small suggestion (Passed) */}
              {values.outcome === "Needs Improvement" ? (
                <div className="flex flex-col gap-1.5">
                  <CustomEditor
                    name="whatToImprove"
                    label="What to improve"
                    height="120px"
                    placeholder="Provide specific, actionable steps for improvement..."
                  />
                </div>
              ) : (
                <div className="flex flex-col gap-1.5">
                  <CustomEditor
                    name="smallSuggestion"
                    label="A small suggestion (optional)"
                    height="120px"
                    placeholder="Offer optional suggestions to take this to the next level..."
                  />
                </div>
              )}

              {/* Save CTA using CustomButton */}
              <div className="pt-2">
                <CustomButton
                  type="submit"
                  variant="primary"
                  rounded="full"
                  height="44px"
                  fontSize="14px"
                >
                  Save & Submit Feedback
                </CustomButton>
              </div>
            </>
          )}
        </CustomForm>
      </div>

      {/* Right Column (Assessment Criteria & Rubrics) */}
      <div className="lg:col-span-5 flex flex-col p-6 rounded-2xl bg-white h-fit">
        {/* Assessment Criteria */}
        <div>
          <h2 className="text-base font-bold text-[#101828]">
            Assessment Criteria
          </h2>
          <div className="mt-3 flex flex-col gap-2.5">
            {submission.assessmentCriteria.map((crit, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <span className="w-5 h-5 rounded-full bg-[#F2F4FF] text-[#5160E7] flex items-center justify-center text-xs font-semibold shrink-0">
                  {idx + 1}
                </span>
                <span className="text-sm text-[#3A3A3C] font-medium">
                  {crit}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Competencies to check for */}
        <div className="mt-6 pt-5 border-t border-gray-100">
          <h2 className="text-base font-bold text-[#101828]">
            Competencies to check for
          </h2>
          <div className="mt-3 flex flex-col gap-2.5">
            {submission.competenciesToCheck.map((comp, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <span className="w-5 h-5 rounded-full bg-[#F2F4FF] text-[#5160E7] flex items-center justify-center text-xs font-semibold shrink-0">
                  {idx + 1}
                </span>
                <span className="text-sm text-[#3A3A3C] font-medium">
                  {comp}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Pass Requirements Callout */}
        <div className="mt-6 p-4 rounded-xl bg-[#F2F4FF] border border-[#EEF0FF]">
          <h3 className="text-base font-bold text-[#1D1348]">
            Pass Requirements
          </h3>
          <p className="text-sm text-[#3A3A3C] leading-relaxed mt-1">
            {submission.passRequirements}
          </p>
        </div>
      </div>
    </div>
  );
}
