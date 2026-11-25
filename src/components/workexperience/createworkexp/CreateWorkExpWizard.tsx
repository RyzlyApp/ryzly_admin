"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useCreateWorkExperience } from "@/hook/useCreateWorkExperience";
import CreateWorkExpStepper from "./CreateWorkExpStepper";
import CreateWorkExpFooter from "./CreateWorkExpFooter";
import StepBasicInfo from "./StepBasicInfo";
import StepCompany from "./StepCompany";
import StepExperienceLevels from "./StepExperienceLevels";
import StepStages from "./StepStages";
import StepPricing from "./StepPricing";
import StepReviewPublish from "./StepReviewPublish";
import CreateWorkExpTasksView from "./CreateWorkExpTasksView";
import { WorkExpFormData } from "./types";
import { RiArrowLeftLine } from "react-icons/ri";
import { Spinner } from "@heroui/react";

interface CreateWorkExpWizardProps {
  experienceId?: string;
}

export default function CreateWorkExpWizard({ experienceId }: CreateWorkExpWizardProps = {}) {
  const router = useRouter();
  const {
    formik,
    currentStep,
    setCurrentStep,
    activeView,
    setActiveView,
    handlePrev,
    handleNext,
    handleSaveDraft,
    handleFinalPublish,
    addStage,
    removeStage,
    updateStage,
    allStages,
    isLoadingAllStages,
    fetchStageById,
    isCreatingStage,
    addTask,
    removeTask,
    isSuccessModalOpen,
    setIsSuccessModalOpen,
    isUploadingCover,
    isUploadingLogo,
    uploadCoverImage,
    uploadCompanyLogo,
    industries,
    isLoadingIndustries,
    tracks,
    isLoadingTracks,
    isLoadingDraft,
    isSubmitting,
  } = useCreateWorkExperience({ initialExperienceId: experienceId });

  // Helper delegates to Formik
  const updateBasicInfo = (info: Partial<WorkExpFormData["basicInfo"]>) => {
    formik.setValues({
      ...formik.values,
      basicInfo: { ...formik.values.basicInfo, ...info },
    });
  };

  const updateCompany = (company: Partial<WorkExpFormData["company"]>) => {
    formik.setValues({
      ...formik.values,
      company: { ...formik.values.company, ...company },
    });
  };

  const updateLevel = (
    levelKey: "beginner" | "advanced",
    config: Partial<WorkExpFormData["levels"]["beginner"]>
  ) => {
    formik.setValues({
      ...formik.values,
      levels: {
        ...formik.values.levels,
        [levelKey]: { ...formik.values.levels[levelKey], ...config },
      },
    });
  };

  const updatePricing = (pricing: Partial<WorkExpFormData["pricing"]>) => {
    formik.setValues({
      ...formik.values,
      pricing: { ...formik.values.pricing, ...pricing },
    });
  };

  // Only render full loading state if we are loading an existing draft from URL and have no local form data yet
  const hasExistingData = Boolean(
    formik.values.basicInfo.title ||
    formik.values.basicInfo.description ||
    formik.values.company.name
  );
  if (isLoadingDraft && !hasExistingData) {
    return (
      <div className="w-full max-w-6xl mx-auto p-12 flex flex-col items-center justify-center gap-4 min-h-[400px]">
        <Spinner size="lg" color="primary" />
        <p className="text-sm font-medium text-[#475467]">Loading work experience draft...</p>
      </div>
    );
  }

  // Render Tasks View when triggered from Step 4
  if (activeView === "tasks") {
    return (
      <div className="w-full max-w-6xl mx-auto p-4 lg:p-8 flex flex-col gap-6">
        <CreateWorkExpTasksView
          formData={formik.values}
          onBackToStages={() => setActiveView("wizard")}
          addTask={addTask}
          removeTask={removeTask}
        />
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-4 lg:p-8 flex flex-col gap-6">
      {/* Top Header */}
      <div className="flex flex-col gap-2">
        <button
          type="button"
          onClick={() => router.push("/admin/work-experience/programs")}
          className="w-fit flex items-center gap-1.5 text-xs font-semibold text-[#5160E7] hover:text-[#4351d1] transition-colors cursor-pointer"
        >
          <RiArrowLeftLine size={16} />
          <span>Back to Performance</span>
        </button>

        <h1 className="text-2xl lg:text-3xl font-bold text-[#101828] tracking-tight">
          Create Work Experience
        </h1>
        <p className="text-sm text-[#475467] font-normal">
          Build a structured, real-world work experience for talents.
        </p>
      </div>

      {/* Horizontal Stepper */}
      <CreateWorkExpStepper
        currentStep={currentStep}
        onStepClick={(step) => setCurrentStep(step)}
      />

      {/* Dynamic Step View */}
      <div className="mt-2 min-h-[420px]">
        {currentStep === 1 && (
          <StepBasicInfo
            formData={formik.values}
            updateBasicInfo={updateBasicInfo}
            onUploadCoverImage={uploadCoverImage}
            isUploadingCover={isUploadingCover}
            industries={industries}
            isLoadingIndustries={isLoadingIndustries}
            tracks={tracks}
            isLoadingTracks={isLoadingTracks}
          />
        )}
        {currentStep === 2 && (
          <StepCompany
            formData={formik.values}
            updateCompany={updateCompany}
            onUploadLogo={uploadCompanyLogo}
            isUploadingLogo={isUploadingLogo}
          />
        )}
        {currentStep === 3 && (
          <StepExperienceLevels
            formData={formik.values}
            updateLevel={updateLevel}
          />
        )}
        {currentStep === 4 && (
          <StepStages
            formData={formik.values}
            addStage={addStage}
            removeStage={removeStage}
            updateStage={updateStage}
            onOpenTasksView={() => setActiveView("tasks")}
            isCreatingStage={isCreatingStage}
            allStages={allStages}
            isLoadingAllStages={isLoadingAllStages}
            fetchStageById={fetchStageById}
          />
        )}
        {currentStep === 5 && (
          <StepPricing
            formData={formik.values}
            updatePricing={updatePricing}
          />
        )}
        {currentStep === 6 && (
          <StepReviewPublish
            formData={formik.values}
            onNavigateStep={(step) => setCurrentStep(step)}
            onFinalPublish={handleFinalPublish}
            isSuccessOpen={isSuccessModalOpen}
            onSuccessClose={() => {
              setIsSuccessModalOpen(false);
              router.push("/admin/work-experience/programs");
            }}
            isSubmitting={isSubmitting}
            tracks={tracks}
            industries={industries}
          />
        )}
      </div>

      {/* Sticky Bottom Actions */}
      <CreateWorkExpFooter
        currentStep={currentStep}
        onPrev={handlePrev}
        onNext={handleNext}
        onSaveDraft={handleSaveDraft}
        isLastStep={currentStep === 6}
      />
    </div>
  );
}
