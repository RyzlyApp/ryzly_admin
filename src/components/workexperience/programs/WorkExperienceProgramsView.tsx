"use client";
import React, { useMemo, useState } from "react";
import WorkExperienceProgramsHeader from "./WorkExperienceProgramsHeader";
import WorkExperienceProgramsFilters from "./WorkExperienceProgramsFilters";
import WorkExperienceProgramsTable from "./WorkExperienceProgramsTable";
import {
  INITIAL_WORK_EXPERIENCE_PROGRAMS,
  IWorkExperienceProgram,
} from "./types";
import { addToast } from "@heroui/toast";

export default function WorkExperienceProgramsView() {
  const [programs, setPrograms] = useState<IWorkExperienceProgram[]>(
    INITIAL_WORK_EXPERIENCE_PROGRAMS
  );

  const [selectedProgram, setSelectedProgram] = useState("all");
  const [selectedIndustry, setSelectedIndustry] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const filteredPrograms = useMemo(() => {
    return programs.filter((p) => {
      // Program name filter
      if (
        selectedProgram !== "all" &&
        !p.title.toLowerCase().includes(selectedProgram.toLowerCase())
      ) {
        return false;
      }
      // Industry filter
      if (
        selectedIndustry !== "all" &&
        !p.industries.some((ind) =>
          ind.toLowerCase().includes(selectedIndustry.toLowerCase())
        )
      ) {
        return false;
      }
      // Level filter
      if (
        selectedLevel !== "all" &&
        !p.levels.some((lvl) =>
          lvl.toLowerCase().includes(selectedLevel.toLowerCase())
        )
      ) {
        return false;
      }
      // Status filter
      if (
        selectedStatus !== "all" &&
        p.status.toLowerCase() !== selectedStatus.toLowerCase()
      ) {
        return false;
      }
      return true;
    });
  }, [programs, selectedProgram, selectedIndustry, selectedLevel, selectedStatus]);

  const handleCreate = () => {
    addToast({
      title: "Create Work Experience",
      description: "Opening work experience creator...",
      color: "primary",
    });
  };

  const handleView = (program: IWorkExperienceProgram) => {
    addToast({
      title: "View Work Experience",
      description: `Opening ${program.title} ${program.subtitle || ""}`,
      color: "primary",
    });
  };

  const handleAddIndustry = (program: IWorkExperienceProgram) => {
    addToast({
      title: "Add New Industry",
      description: `Adding new industry to ${program.title}...`,
      color: "primary",
    });
  };

  const handlePublish = (program: IWorkExperienceProgram) => {
    setPrograms((prev) =>
      prev.map((p) => (p.id === program.id ? { ...p, status: "Published" } : p))
    );
    addToast({
      title: "Work Experience Published",
      description: `${program.title} has been published successfully`,
      color: "success",
    });
  };

  const handleUnpublish = (program: IWorkExperienceProgram) => {
    setPrograms((prev) =>
      prev.map((p) => (p.id === program.id ? { ...p, status: "Draft" } : p))
    );
    addToast({
      title: "Work Experience Unpublished",
      description: `${program.title} moved to draft`,
      color: "warning",
    });
  };

  const handleEdit = (program: IWorkExperienceProgram) => {
    addToast({
      title: "Edit Program",
      description: `Editing ${program.title}...`,
      color: "primary",
    });
  };

  const handleToggleStatus = (program: IWorkExperienceProgram) => {
    const nextStatus = program.status === "Published" ? "Draft" : "Published";
    setPrograms((prev) =>
      prev.map((p) => (p.id === program.id ? { ...p, status: nextStatus } : p))
    );
    addToast({
      title: "Status Updated",
      description: `${program.title} is now ${nextStatus}`,
      color: "success",
    });
  };

  const handleDelete = (program: IWorkExperienceProgram) => {
    setPrograms((prev) => prev.filter((p) => p.id !== program.id));
    addToast({
      title: "Program Removed",
      description: `${program.title} has been deleted`,
      color: "danger",
    });
  };

  return (
    <div className="w-full p-6 lg:p-8 flex flex-col gap-6">
      <WorkExperienceProgramsHeader onCreate={handleCreate} />

      <WorkExperienceProgramsFilters
        selectedProgram={selectedProgram}
        onProgramChange={setSelectedProgram}
        selectedIndustry={selectedIndustry}
        onIndustryChange={setSelectedIndustry}
        selectedLevel={selectedLevel}
        onLevelChange={setSelectedLevel}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
      />

      <WorkExperienceProgramsTable
        programs={filteredPrograms}
        onView={handleView}
        onEdit={handleEdit}
        onAddIndustry={handleAddIndustry}
        onPublish={handlePublish}
        onUnpublish={handleUnpublish}
        onToggleStatus={handleToggleStatus}
        onDelete={handleDelete}
      />
    </div>
  );
}
