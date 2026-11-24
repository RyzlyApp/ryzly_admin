"use client";
import React, { useState } from "react";
import {
  RiArrowLeftLine,
  RiArrowUpSLine,
  RiArrowDownSLine,
  RiMoreFill,
  RiPlantLine,
  RiAddLine,
  RiPencilLine,
  RiDragMove2Fill,
} from "react-icons/ri";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/react";
import { TaskItem, WorkExpFormData } from "./types";
import { addToast } from "@heroui/toast";

interface CreateWorkExpTasksViewProps {
  formData: WorkExpFormData;
  onBackToStages: () => void;
  addTask: (task: Omit<TaskItem, "id">) => void;
  removeTask: (taskId: string, stageId: string) => void;
}

export default function CreateWorkExpTasksView({
  formData,
  onBackToStages,
  addTask,
  removeTask,
}: CreateWorkExpTasksViewProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedStageId, setSelectedStageId] = useState<string>(
    formData.stages[0]?.id || ""
  );
  const [expandedStages, setExpandedStages] = useState<Record<string, boolean>>({
    [formData.stages[0]?.id || ""]: true,
  });

  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");

  const toggleAccordion = (stageId: string) => {
    setExpandedStages((prev) => ({
      ...prev,
      [stageId]: !prev[stageId],
    }));
  };

  const handleOpenAddTaskModal = (stageId: string) => {
    setSelectedStageId(stageId);
    setNewTaskTitle("");
    setNewTaskDescription("");
    onOpen();
  };

  const handleCreateTask = (onClose: () => void) => {
    if (!newTaskTitle.trim()) {
      addToast({
        title: "Required",
        description: "Please enter a task title",
        color: "warning",
      });
      return;
    }

    addTask({
      stageId: selectedStageId,
      title: newTaskTitle,
      description: newTaskDescription,
      points: 50,
      estimatedHours: 4,
    });

    addToast({
      title: "Task Created",
      description: `${newTaskTitle} added to stage`,
      color: "success",
    });

    onClose();
  };

  const totalTasksCount = formData.tasks.length;
  const totalStagesCount = formData.stages.length;

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Top Header & Breadcrumb */}
      <div className="flex flex-col gap-2">
        <button
          type="button"
          onClick={onBackToStages}
          className="w-fit flex items-center gap-1.5 text-xs font-semibold text-[#5160E7] hover:text-[#4351d1] transition-colors cursor-pointer"
        >
          <RiArrowLeftLine size={16} />
          <span>Back to Stages</span>
        </button>

        <h1 className="text-2xl font-bold text-[#101828]">Tasks</h1>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Stages & Tasks Accordion */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 lg:p-8 flex flex-col gap-6">
          <h2 className="text-base font-semibold text-[#101828]">Add a Task</h2>

          {formData.stages.length === 0 ? (
            <div className="py-8 text-center text-gray-500">
              <p className="text-sm">No stages available to add tasks to.</p>
              <button
                type="button"
                onClick={onBackToStages}
                className="mt-3 text-xs text-[#5160E7] font-semibold hover:underline"
              >
                Go back to create stages first
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {formData.stages.map((stage, idx) => {
                const stageTasks = formData.tasks.filter(
                  (t) => t.stageId === stage.id
                );
                const isExpanded = !!expandedStages[stage.id];

                return (
                  <div
                    key={stage.id}
                    className="border border-gray-200/80 rounded-2xl overflow-hidden transition-all duration-200"
                  >
                    {/* Accordion Header */}
                    <div
                      onClick={() => toggleAccordion(stage.id)}
                      className="p-4 flex items-center justify-between bg-[#F8F9FC] hover:bg-[#F2F4FD] cursor-pointer transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-lg bg-[#EEF2FF] text-[#5160E7] text-xs font-bold flex items-center justify-center shrink-0">
                          {idx + 1}
                        </div>

                        <div>
                          <h3 className="text-sm font-bold text-[#101828]">
                            {stage.title}
                          </h3>
                          <p className="text-xs text-[#475467] capitalize">
                            {stage.level} · {stage.duration} ·{" "}
                            {stageTasks.length} tasks
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          className="p-1.5 text-gray-400 hover:text-gray-700 rounded transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleAccordion(stage.id);
                          }}
                        >
                          {isExpanded ? (
                            <RiArrowUpSLine size={18} />
                          ) : (
                            <RiArrowDownSLine size={18} />
                          )}
                        </button>
                        <button
                          type="button"
                          className="p-1.5 text-gray-400 hover:text-gray-700 rounded transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <RiMoreFill size={18} />
                        </button>
                      </div>
                    </div>

                    {/* Accordion Content */}
                    {isExpanded && (
                      <div className="p-5 bg-white flex flex-col gap-4 border-t border-gray-100">
                        {/* Subheader: Tasks Count & + Add Task Button */}
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-[#101828]">
                            Tasks ({stageTasks.length})
                          </span>

                          <button
                            type="button"
                            onClick={() => handleOpenAddTaskModal(stage.id)}
                            className="flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-[#5160E7] text-[#5160E7] text-xs font-semibold hover:bg-[#EEF2FF] transition-colors cursor-pointer"
                          >
                            <RiAddLine size={14} />
                            <span>Add Task</span>
                          </button>
                        </div>

                        {/* Tasks List */}
                        {stageTasks.length === 0 ? (
                          <div className="py-6 text-center text-xs text-gray-400 bg-gray-50/50 rounded-xl border border-dashed border-gray-200">
                            No tasks created for this stage yet. Click &ldquo;+ Add
                            Task&rdquo; to add deliverables.
                          </div>
                        ) : (
                          <div className="flex flex-col gap-3">
                            {stageTasks.map((task) => (
                              <div
                                key={task.id}
                                className="flex items-center justify-between p-3.5 rounded-xl border border-gray-100 bg-[#FAFAFC] hover:bg-white hover:border-gray-200 transition-all group"
                              >
                                <div className="flex items-start gap-3">
                                  {/* 6-dot Drag Handle */}
                                  <button
                                    type="button"
                                    className="text-gray-400 hover:text-gray-600 cursor-grab active:cursor-grabbing pt-0.5"
                                    title="Drag task"
                                  >
                                    <RiDragMove2Fill size={16} />
                                  </button>

                                  <div>
                                    <p className="text-xs font-bold text-[#101828]">
                                      {task.title}
                                    </p>
                                    <p className="text-[11px] text-[#475467] mt-0.5 leading-relaxed">
                                      {task.description}
                                    </p>
                                  </div>
                                </div>

                                <div className="flex items-center gap-2 shrink-0 ml-3">
                                  <button
                                    type="button"
                                    className="px-2.5 py-1 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 text-xs font-medium flex items-center gap-1 transition-colors cursor-pointer"
                                  >
                                    <RiPencilLine size={13} />
                                    <span>Edit</span>
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => removeTask(task.id, stage.id)}
                                    className="p-1.5 text-gray-400 hover:text-gray-700 rounded transition-colors cursor-pointer"
                                  >
                                    <RiMoreFill size={16} />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Column: Level Overview Card */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col gap-4">
          <h2 className="text-base font-bold text-[#101828]">Level overview</h2>

          <div className="flex items-center gap-3 p-3.5 rounded-xl bg-[#F8F9FC] border border-gray-100">
            <div className="w-10 h-10 rounded-xl bg-[#F2F4FF] text-[#5160E7] flex items-center justify-center shrink-0">
              <RiPlantLine size={20} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#101828]">
                Beginner Level
              </h3>
              <p className="text-xs text-[#475467]">
                {totalStagesCount} Stages · {totalTasksCount} tasks
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Add Task Modal */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="text-base font-bold text-[#101828]">
                Add Task to Stage
              </ModalHeader>
              <ModalBody className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-gray-700">
                    Task Title *
                  </label>
                  <input
                    type="text"
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    placeholder="e.g. Review project context"
                    className="w-full px-3.5 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-[#5160E7]"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-gray-700">
                    Task Summary / Deliverable
                  </label>
                  <textarea
                    rows={3}
                    value={newTaskDescription}
                    onChange={(e) => setNewTaskDescription(e.target.value)}
                    placeholder="e.g. Read the brief and summarise the key goals and requirements."
                    className="w-full px-3.5 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-[#5160E7] resize-none"
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-lg text-xs font-medium text-gray-600 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleCreateTask(onClose)}
                  className="px-5 py-2 rounded-lg bg-[#5160E7] text-white text-xs font-semibold hover:bg-[#4351d1]"
                >
                  Save Task
                </button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
