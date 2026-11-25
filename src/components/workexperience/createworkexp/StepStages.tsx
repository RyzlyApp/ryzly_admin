"use client";
import React, { useState } from "react";
import {
  RiDragMove2Fill,
  RiPencilLine,
  RiDeleteBinLine,
} from "react-icons/ri";
import { StageItem, WorkExpFormData } from "./types";
import RichTextToolbarEditor from "./RichTextToolbarEditor";
import { addToast } from "@heroui/toast";

interface StepStagesProps {
  formData: WorkExpFormData;
  addStage: (
    stage: Omit<StageItem, "id" | "tasksCount">
  ) => Promise<StageItem> | StageItem;
  removeStage: (id: string) => void;
  updateStage: (id: string, updates: Partial<StageItem>) => Promise<void> | void;
  onOpenTasksView: () => void;
  isCreatingStage?: boolean;
  allStages?: any[];
  isLoadingAllStages?: boolean;
  fetchStageById?: (stageId: string) => Promise<any>;
}

export default function StepStages({
  formData,
  addStage,
  removeStage,
  updateStage,
  onOpenTasksView,
  isCreatingStage = false,
  allStages = [],
  isLoadingAllStages = false,
  fetchStageById,
}: StepStagesProps) {
  const [title, setTitle] = useState("Onboarding & Discovery");
  const [duration, setDuration] = useState("1 week");
  const [description, setDescription] = useState("This is a test project");
  const [editingStageId, setEditingStageId] = useState<string | null>(null);

  const resetForm = () => {
    setTitle("");
    setDuration("1 week");
    setDescription("");
    setEditingStageId(null);
  };

  const handleAddStageOnly = async () => {
    if (!title.trim()) {
      addToast({
        title: "Required",
        description: "Please enter a stage title",
        color: "warning",
      });
      return;
    }

    if (editingStageId) {
      await updateStage(editingStageId, {
        title,
        duration,
        description,
      });
      addToast({
        title: "Stage Updated",
        description: `${title} updated successfully`,
        color: "success",
      });
      resetForm();
    } else {
      await addStage({
        title,
        duration,
        description,
        level: "beginner",
      });
      addToast({
        title: "Stage Added",
        description: `${title} created successfully`,
        color: "success",
      });
      resetForm();
    }
  };

  const handleAddAndCreateTasks = async () => {
    if (title.trim()) {
      if (editingStageId) {
        await updateStage(editingStageId, { title, duration, description });
      } else {
        await addStage({
          title,
          duration,
          description,
          level: "beginner",
        });
      }
      resetForm();
    }
    onOpenTasksView();
  };

  const handleStartEdit = async (stage: StageItem) => {
    setEditingStageId(stage.id);
    setTitle(stage.title);
    setDuration(stage.duration);
    setDescription(stage.description);

    if (fetchStageById && stage.id && !stage.id.startsWith("stage-")) {
      try {
        const fresh = await fetchStageById(stage.id);
        if (fresh) {
          if (fresh.title) setTitle(fresh.title);
          if (fresh.duration)
            setDuration(
              `${fresh.duration} week${fresh.duration > 1 ? "s" : ""}`
            );
          if (fresh.description) setDescription(fresh.description);
        }
      } catch {
        // Fall back to current stage values
      }
    }
  };

  const beginnerStages = formData.stages.filter((s) => s.level === "beginner");

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Section Header */}
      <div>
        <h2 className="text-xl font-bold text-[#101828]">Stages</h2>
        <p className="text-sm text-[#475467] mt-1">
          Create the stages for each industry and experience level. Stages group
          related tasks and guide the participant&apos;s progress.
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Add a Stage Form */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 lg:p-8 flex flex-col gap-5">
          <h3 className="text-base font-semibold text-[#101828]">
            {editingStageId ? "Edit Stage" : "Add a Stage"}
          </h3>

          {/* Quick Select from Existing Reusable Stages (GET /work-experience/stages) */}
          {!editingStageId && allStages && allStages.length > 0 && (
            <div className="flex flex-col gap-1.5 p-3 rounded-xl bg-[#F8F9FC] border border-gray-100">
              <label className="text-xs font-semibold text-[#475467]">
                Or select an existing reusable stage to prefill:
              </label>
              <select
                aria-label="Select an existing reusable stage"
                className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-white text-xs text-[#101828] focus:outline-none focus:border-[#5160E7]"
                defaultValue=""
                onChange={(e) => {
                  const selectedId = e.target.value;
                  if (!selectedId) return;
                  const found = allStages.find(
                    (s: any) => (s._id || s.id) === selectedId
                  );
                  if (found) {
                    setTitle(found.title || "");
                    setDuration(
                      found.duration
                        ? `${found.duration} week${found.duration > 1 ? "s" : ""}`
                        : "1 week"
                    );
                    setDescription(found.description || "");
                  }
                }}
              >
                <option value="">-- Choose an existing reusable stage --</option>
                {allStages.map((st: any) => {
                  const sId = st._id || st.id;
                  return (
                    <option key={sId} value={sId}>
                      {st.title} {st.duration ? `(${st.duration} wk)` : ""}
                    </option>
                  );
                })}
              </select>
            </div>
          )}

          {/* Title & Duration in 2 Columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-700">
                Stage Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Onboarding & Discovery"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-[#101828] placeholder-gray-400 focus:outline-none focus:border-[#5160E7] focus:ring-2 focus:ring-[#5160E7]/10 transition-all"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-700">
                Duration
              </label>
              <input
                type="text"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="e.g. 1 week"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-[#101828] placeholder-gray-400 focus:outline-none focus:border-[#5160E7] focus:ring-2 focus:ring-[#5160E7]/10 transition-all"
              />
            </div>
          </div>

          {/* Stage Description WYSIWYG */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-700">
              Stage Description
            </label>
            <RichTextToolbarEditor
              value={description}
              onChange={setDescription}
              placeholder="Describe this stage's goals and expectations..."
              rows={4}
              maxLength={200}
              showCharCount={true}
            />
          </div>

          {/* Action Buttons Row */}
          <div className="flex items-center justify-end gap-3 pt-2">
            {editingStageId && (
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2.5 rounded-lg border border-gray-200 text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                Cancel
              </button>
            )}

            <button
              type="button"
              disabled={isCreatingStage}
              onClick={handleAddStageOnly}
              className="px-5 py-2.5 rounded-lg bg-white border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer disabled:opacity-50"
            >
              {isCreatingStage
                ? "Saving Stage..."
                : editingStageId
                ? "Update Stage Only"
                : "Add Stage Only"}
            </button>

            <button
              type="button"
              disabled={isCreatingStage}
              onClick={handleAddAndCreateTasks}
              className="px-5 py-2.5 rounded-lg bg-[#101828] text-white text-sm font-medium hover:bg-[#1D1348] transition-colors cursor-pointer shadow-sm disabled:opacity-50"
            >
              {isCreatingStage ? "Saving..." : "Add Stage & Create Tasks"}
            </button>
          </div>
        </div>

        {/* Right Column: Stages List & Info Card */}
        <div className="lg:col-span-4 flex flex-col gap-5">
          {/* Beginner Stages List Card */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col gap-4">
            <h4 className="text-base font-bold text-[#101828]">
              Beginner ({beginnerStages.length})
            </h4>

            {beginnerStages.length === 0 ? (
              /* Empty State (Image 5) */
              <div className="py-6 flex flex-col gap-1 text-left">
                <p className="text-sm font-bold text-[#101828]">
                  No Stages Added Yet
                </p>
                <p className="text-xs text-[#475467] leading-relaxed">
                  Add stages to structure the learning journey for your learners.
                  Each stage will contain its own tasks.
                </p>
              </div>
            ) : (
              /* Populated State (Image 4) */
              <div className="flex flex-col gap-3">
                {beginnerStages.map((stage, idx) => (
                  <div
                    key={stage.id}
                    className="flex items-center justify-between p-3 rounded-xl border border-gray-100 bg-[#FAFAFC] hover:bg-white hover:border-gray-200 transition-all group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      {/* Drag Handle */}
                      <button
                        type="button"
                        className="text-gray-400 hover:text-gray-600 cursor-grab active:cursor-grabbing p-1"
                        title="Drag to reorder"
                      >
                        <RiDragMove2Fill size={16} />
                      </button>

                      {/* Number Badge */}
                      <div className="w-7 h-7 rounded-lg bg-[#EEF2FF] text-[#5160E7] text-xs font-bold flex items-center justify-center shrink-0">
                        {idx + 1}
                      </div>

                      {/* Title & Metadata */}
                      <div className="truncate">
                        <p className="text-xs font-bold text-[#101828] truncate">
                          {stage.title}
                        </p>
                        <p className="text-[11px] text-[#475467]">
                          {stage.duration} · {stage.tasksCount} tasks
                        </p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-1 shrink-0 ml-2">
                      <button
                        type="button"
                        onClick={() => handleStartEdit(stage)}
                        className="p-1.5 text-gray-400 hover:text-gray-700 rounded hover:bg-gray-200/50 transition-colors cursor-pointer"
                        title="Edit stage"
                      >
                        <RiPencilLine size={15} />
                      </button>
                      <button
                        type="button"
                        onClick={() => removeStage(stage.id)}
                        className="p-1.5 text-gray-400 hover:text-red-500 rounded hover:bg-red-50 transition-colors cursor-pointer"
                        title="Delete stage"
                      >
                        <RiDeleteBinLine size={15} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* About stages Info Card */}
          <div className="bg-[#F2F4FF] border border-[#EEF0FF] rounded-2xl p-6 flex flex-col gap-2">
            <h4 className="text-sm font-bold text-[#101828]">About stages</h4>
            <p className="text-xs text-[#475467] leading-relaxed">
              Stages break the work experience into meaningful phases (e.g.
              Onboarding, Research, Design, Delivery). Each stage will have its
              own tasks in the next step.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
