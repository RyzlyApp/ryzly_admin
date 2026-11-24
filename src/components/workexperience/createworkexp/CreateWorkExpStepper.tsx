"use client";
import React from "react";
import { WizardStep } from "./types";

interface CreateWorkExpStepperProps {
  currentStep: WizardStep;
  onStepClick: (step: WizardStep) => void;
}

const STEPS: { step: WizardStep; label: string }[] = [
  { step: 1, label: "Basic Information" },
  { step: 2, label: "Industry & Company" },
  { step: 3, label: "Experience Levels" },
  { step: 4, label: "Stages" },
  { step: 5, label: "Pricing" },
  { step: 6, label: "Review & Publish" },
];

export default function CreateWorkExpStepper({
  currentStep,
  onStepClick,
}: CreateWorkExpStepperProps) {
  return (
    <div className="w-full max-w-4xl mx-auto py-4 px-2">
      <div className="relative flex items-center justify-between">
        {/* Step Items */}
        {STEPS.map((item, index) => {
          const isCompleted = item.step < currentStep;
          const isActive = item.step === currentStep;
          const isReached = item.step <= currentStep;
          const hasNext = index < STEPS.length - 1;

          return (
            <React.Fragment key={item.step}>
              {/* Step Circle & Label */}
              <div
                onClick={() => onStepClick(item.step)}
                className="relative z-10 flex flex-col items-center cursor-pointer group transition-all"
              >
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-200 ${
                    isReached
                      ? "bg-[#5160E7] text-white shadow-sm ring-4 ring-[#5160E7]/10"
                      : "bg-white border-2 border-gray-200 text-gray-400 group-hover:border-gray-300"
                  }`}
                >
                  {item.step}
                </div>
                <span
                  className={`mt-2 text-xs text-center font-medium transition-colors whitespace-nowrap ${
                    isReached
                      ? "text-[#5160E7]"
                      : "text-gray-400 group-hover:text-gray-600"
                  }`}
                >
                  {item.label}
                </span>
              </div>

              {/* Connecting Line */}
              {hasNext && (
                <div className="flex-1 h-[2px] mx-2 -mt-6 bg-gray-200 relative overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${
                      item.step < currentStep ? "bg-[#5160E7] w-full" : "w-0"
                    }`}
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
