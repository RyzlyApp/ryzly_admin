"use client";
import React from "react";
import Image from "next/image";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/react";
import {
  RiPencilLine,
  RiArrowRightSLine,
  RiSendPlaneLine,
} from "react-icons/ri";
import { WizardStep, WorkExpFormData } from "./types";
import { addToast } from "@heroui/toast";

interface StepReviewPublishProps {
  formData: WorkExpFormData;
  onNavigateStep: (step: WizardStep) => void;
  onFinalPublish: () => void;
  isSuccessOpen?: boolean;
  onSuccessClose?: () => void;
  isSubmitting?: boolean;
  tracks?: Array<{ _id: string; name: string }>;
  industries?: Array<{ _id: string; name: string }>;
  errorSteps?: number[];
}

export default function StepReviewPublish({
  formData,
  onNavigateStep,
  onFinalPublish,
  isSuccessOpen: externalSuccessOpen,
  onSuccessClose,
  isSubmitting = false,
  tracks = [],
  industries = [],
  errorSteps = [],
}: StepReviewPublishProps) {
  // Confirmation modal disclosure
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // Celebration success modal disclosure (internal fallback)
  const {
    isOpen: internalSuccessOpen,
    onOpen: onSuccessOpen,
    onOpenChange: onSuccessOpenChange,
  } = useDisclosure();

  const isModalVisible =
    externalSuccessOpen !== undefined ? externalSuccessOpen : internalSuccessOpen;

  const getSafeTrackName = (): string => {
    const raw = formData?.basicInfo?.title as any;
    if (!raw) return "Product Design Work Experience";
    if (typeof raw === "object" && raw !== null) {
      return String(raw.name || raw.title || raw._id || "Product Design Work Experience");
    }
    const matchedTrack = tracks.find((t) => t._id === raw || t.name === raw);
    if (matchedTrack?.name) return matchedTrack.name;
    return typeof raw === "string" && raw.trim() ? raw : "Product Design Work Experience";
  };

  const trackName = getSafeTrackName();

  const getSafeIndustryName = (): string => {
    const raw = formData?.basicInfo?.industry as any;
    if (!raw) return "Technology";
    if (typeof raw === "object" && raw !== null) {
      return String(raw.name || raw.title || raw._id || "Technology");
    }
    const matched = industries.find((ind) => ind._id === raw || ind.name === raw);
    return matched?.name || (typeof raw === "string" && raw.trim() ? raw : "Technology");
  };

  const industryName = getSafeIndustryName();

  const numericPrice =
    parseFloat(String(formData.pricing?.usdPrice || "").replace(/[^0-9.]/g, "")) || 0;
  const formattedPrice = numericPrice > 0 ? `₦${numericPrice.toLocaleString()}` : "₦0";

  const handleConfirmPublish = (onClose: () => void) => {
    onClose();
    onFinalPublish();
  };

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Section Header */}
      <div>
        <h2 className="text-xl font-bold text-[#101828]">Review &amp; Publish</h2>
        <p className="text-sm text-[#475467] mt-1">
          Check the details below before publishing this work experience.
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: 4 Cards */}
        <div className="lg:col-span-8 flex flex-col gap-5">
          {/* 1. Basic Information Card */}
          <div
            className={`bg-white rounded-2xl border shadow-sm p-6 flex flex-col gap-3 transition-all ${
              errorSteps.includes(1)
                ? "border-red-400 ring-2 ring-red-500/10 bg-red-50/10"
                : "border-gray-100"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-[#101828]">
                  Basic Information
                </h3>
                {errorSteps.includes(1) && (
                  <span className="text-[11px] font-semibold text-red-600 bg-red-100 px-2 py-0.5 rounded-full">
                    Required fields missing
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={() => onNavigateStep(1)}
                className={`flex items-center gap-1.5 text-xs font-semibold transition-colors cursor-pointer ${
                  errorSteps.includes(1)
                    ? "text-red-600 hover:text-red-700"
                    : "text-gray-600 hover:text-[#5160E7]"
                }`}
              >
                <RiPencilLine size={14} />
                <span>Edit</span>
              </button>
            </div>
            <div>
              <p className="text-sm font-bold text-[#101828]">
                {trackName}
              </p>
              <p className="text-xs text-[#475467] mt-1 leading-relaxed">
                {formData.basicInfo.description ||
                  "A hands-on experience that helps participants build real product design skills through industry-type tasks and feedback."}
              </p>
            </div>
          </div>

          {/* 2. Industries & Companies Card */}
          <div
            className={`bg-white rounded-2xl border shadow-sm p-6 flex flex-col gap-3 transition-all ${
              errorSteps.includes(2)
                ? "border-red-400 ring-2 ring-red-500/10 bg-red-50/10"
                : "border-gray-100"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-[#101828]">
                  Industries &amp; Companies
                </h3>
                {errorSteps.includes(2) && (
                  <span className="text-[11px] font-semibold text-red-600 bg-red-100 px-2 py-0.5 rounded-full">
                    Company name required
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={() => onNavigateStep(2)}
                className={`flex items-center gap-1.5 text-xs font-semibold transition-colors cursor-pointer ${
                  errorSteps.includes(2)
                    ? "text-red-600 hover:text-red-700"
                    : "text-gray-600 hover:text-[#5160E7]"
                }`}
              >
                <RiPencilLine size={14} />
                <span>Edit</span>
              </button>
            </div>
            <div>
              <p className="text-xs text-[#475467]">{industryName}</p>
              <div className="flex flex-wrap items-center gap-2.5 mt-2.5">
                <span className="px-3.5 py-1.5 rounded-lg bg-[#F8F9FC] border border-gray-200/60 text-xs font-medium text-gray-700">
                  {industryName} ({formData.company.name || "Company"})
                </span>
              </div>
            </div>
          </div>

          {/* 3. Experience Levels Card */}
          <div
            className={`bg-white rounded-2xl border shadow-sm p-6 flex flex-col gap-3 transition-all ${
              errorSteps.includes(3)
                ? "border-red-400 ring-2 ring-red-500/10 bg-red-50/10"
                : "border-gray-100"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-[#101828]">
                  Experience Levels
                </h3>
                {errorSteps.includes(3) && (
                  <span className="text-[11px] font-semibold text-red-600 bg-red-100 px-2 py-0.5 rounded-full">
                    At least 1 level required
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={() => onNavigateStep(3)}
                className={`flex items-center gap-1.5 text-xs font-semibold transition-colors cursor-pointer ${
                  errorSteps.includes(3)
                    ? "text-red-600 hover:text-red-700"
                    : "text-gray-600 hover:text-[#5160E7]"
                }`}
              >
                <RiPencilLine size={14} />
                <span>Edit</span>
              </button>
            </div>
            <p className="text-xs text-[#475467]">
              Beginner: 6 weeks • Advanced: 8 weeks
            </p>
          </div>

          {/* 4. Stages & Tasks Card */}
          <div
            className={`bg-white rounded-2xl border shadow-sm p-6 flex flex-col gap-3 transition-all ${
              errorSteps.includes(4)
                ? "border-red-400 ring-2 ring-red-500/10 bg-red-50/10"
                : "border-gray-100"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-[#101828]">
                  Stages &amp; Tasks
                </h3>
                {errorSteps.includes(4) && (
                  <span className="text-[11px] font-semibold text-red-600 bg-red-100 px-2 py-0.5 rounded-full">
                    At least 1 stage required
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={() => onNavigateStep(4)}
                className={`flex items-center gap-1.5 text-xs font-semibold transition-colors cursor-pointer ${
                  errorSteps.includes(4)
                    ? "text-red-600 hover:text-red-700"
                    : "text-gray-600 hover:text-[#5160E7]"
                }`}
              >
                <RiPencilLine size={14} />
                <span>Edit</span>
              </button>
            </div>
            <p className="text-xs text-[#475467]">
              3 stages • 9 tasks (Beginner) • 12 tasks (Advanced)
            </p>

            <div className="flex flex-col gap-2 mt-2">
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#F8F9FC] border border-gray-100 text-xs">
                <span className="font-semibold text-[#101828]">
                  Stage 1: Onboarding &amp; Research
                </span>
                <div className="flex items-center gap-1 text-[#475467]">
                  <span>3 tasks</span>
                  <RiArrowRightSLine size={16} />
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-[#F8F9FC] border border-gray-100 text-xs">
                <span className="font-semibold text-[#101828]">
                  Stage 2: Design &amp; Iteration
                </span>
                <div className="flex items-center gap-1 text-[#475467]">
                  <span>4 tasks</span>
                  <RiArrowRightSLine size={16} />
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-[#F8F9FC] border border-gray-100 text-xs">
                <span className="font-semibold text-[#101828]">
                  Stage 3: Final Delivery
                </span>
                <div className="flex items-center gap-1 text-[#475467]">
                  <span>2 tasks</span>
                  <RiArrowRightSLine size={16} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: 3 Cards */}
        <div className="lg:col-span-4 flex flex-col gap-5">
          {/* Card 1: Manager Assignment */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#101828]">
                Manager Assignment
              </h3>
              <button
                type="button"
                className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 hover:text-[#5160E7] transition-colors cursor-pointer"
              >
                <RiPencilLine size={14} />
                <span>Edit</span>
              </button>
            </div>
            <p className="text-xs text-[#475467]">3 managers</p>

            <div className="flex items-center gap-2 mt-1">
              <div className="w-8 h-8 rounded-full bg-[#FBBF24] text-white font-bold text-xs flex items-center justify-center shadow-sm">
                A
              </div>
              <div className="w-8 h-8 rounded-full bg-[#F59E0B] text-white font-bold text-xs flex items-center justify-center shadow-sm">
                T
              </div>
              <div className="w-8 h-8 rounded-full bg-[#D97706] text-white font-bold text-xs flex items-center justify-center shadow-sm">
                G
              </div>
            </div>
          </div>

          {/* Card 2: Assessment */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#101828]">Assessment</h3>
              <button
                type="button"
                className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 hover:text-[#5160E7] transition-colors cursor-pointer"
              >
                <RiPencilLine size={14} />
                <span>Edit</span>
              </button>
            </div>
            <p className="text-xs text-[#475467]">4 competencies</p>
          </div>

          {/* Card 3: Pricing */}
          <div
            className={`bg-white rounded-2xl border shadow-sm p-6 flex flex-col gap-3 transition-all ${
              errorSteps.includes(5)
                ? "border-red-400 ring-2 ring-red-500/10 bg-red-50/10"
                : "border-gray-100"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-[#101828]">Pricing</h3>
                {errorSteps.includes(5) && (
                  <span className="text-[11px] font-semibold text-red-600 bg-red-100 px-2 py-0.5 rounded-full">
                    Price required
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={() => onNavigateStep(5)}
                className={`flex items-center gap-1.5 text-xs font-semibold transition-colors cursor-pointer ${
                  errorSteps.includes(5)
                    ? "text-red-600 hover:text-red-700"
                    : "text-gray-600 hover:text-[#5160E7]"
                }`}
              >
                <RiPencilLine size={14} />
                <span>Edit</span>
              </button>
            </div>

            <div className="flex flex-col gap-2.5 pt-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#475467]">Enrolment Fee</span>
                <span className="font-bold text-[#101828]">{formattedPrice}</span>
              </div>
              {formData.pricing?.couponCode ? (
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#475467]">Coupon Code</span>
                  <span className="font-bold font-mono text-[#5160E7]">
                    {formData.pricing.couponCode}
                  </span>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal: Publish Work Experience? (Image 3) */}
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
        size="md"
        classNames={{
          base: "rounded-3xl p-2",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col items-center justify-center pt-6 pb-2 text-center">
                <div className="w-12 h-12 rounded-2xl bg-[#F2F4FF] text-[#5160E7] flex items-center justify-center mb-3">
                  <RiSendPlaneLine size={24} />
                </div>
                <h3 className="text-lg font-bold text-[#101828]">
                  Publish Work Experience?
                </h3>
                <p className="text-xs text-[#475467] font-normal mt-1">
                  You&apos;re about to make this work experience available to
                  participants on Ryzly.
                </p>
              </ModalHeader>

              <ModalBody className="flex flex-col gap-4 py-3">
                <div className="border border-[#EEF2FF] rounded-xl p-4 bg-[#F8F9FC]">
                  <p className="text-xs font-bold text-[#101828]">
                    {trackName}
                  </p>
                  <p className="text-[11px] text-[#475467] mt-1 leading-relaxed">
                    {formData.basicInfo.description ||
                      "A hands-on experience that helps participants build real product design skills through industry-type tasks and feedback."}
                  </p>
                </div>

                <div className="flex flex-col gap-2.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Enrolment fee</span>
                    <span className="font-semibold text-[#101828]">
                      {formattedPrice}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Industry</span>
                    <span className="font-semibold text-[#101828]">
                      {industryName}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Experience levels</span>
                    <span className="font-semibold text-[#101828]">
                      Beginner and Advanced
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Participant access</span>
                    <span className="font-semibold text-[#101828]">
                      Participants can now enrol
                    </span>
                  </div>
                </div>
              </ModalBody>

              <ModalFooter className="flex items-center justify-between pt-4 pb-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl border border-gray-200 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleConfirmPublish(onClose)}
                  className="px-6 py-2.5 rounded-xl bg-[#5160E7] text-white text-xs font-medium hover:bg-[#4351d1] transition-all shadow-sm"
                >
                  Publish Work Experience
                </button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* Success Celebration Modal: Your work experience is live! (Exact Match to New Image) */}
      <Modal
        isOpen={isModalVisible}
        onOpenChange={(open) => {
          if (!open && onSuccessClose) {
            onSuccessClose();
          } else {
            onSuccessOpenChange();
          }
        }}
        placement="center"
        hideCloseButton={true}
        classNames={{
          base: "rounded-3xl border border-[#86EFAC] bg-[#FCFDF7] shadow-xl p-2 max-w-sm sm:max-w-md",
        }}
      >
        <ModalContent>
          {() => (
            <ModalBody className="flex flex-col items-center text-center p-6 sm:p-8">
              {/* 3D Lime Smiley Sphere Image */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 relative flex items-center justify-center my-2">
                <Image
                  src="/images/live-experience-smiley.png"
                  alt="Work experience is live"
                  width={80}
                  height={80}
                  className="w-full h-full object-contain drop-shadow-md"
                  priority
                />
              </div>

              {/* Title & Subtitle */}
              <h3 className="text-base sm:text-lg font-bold text-[#101828] mt-2">
                Your work experience is live!
              </h3>
              <p className="text-xs text-[#475467] font-normal mt-1 leading-relaxed">
                Users can now see and join your work experience
              </p>

              {/* Back to Programs Button */}
              <button
                type="button"
                onClick={onSuccessClose || onFinalPublish}
                className="w-full py-2.5 sm:py-3 px-6 mt-6 rounded-full bg-white border border-gray-300 hover:bg-gray-50 text-xs sm:text-sm font-semibold text-gray-800 transition-colors shadow-sm cursor-pointer"
              >
                Back to Programs
              </button>
            </ModalBody>
          )}
        </ModalContent>
      </Modal>

      {/* Hidden button ref trigger for wizard footer */}
      <button
        id="trigger-publish-modal-btn"
        type="button"
        onClick={onOpen}
        className="hidden"
      />
    </div>
  );
}
