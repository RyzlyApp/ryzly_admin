"use client";
import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import WorkExperienceProgramsHeader from "./WorkExperienceProgramsHeader";
import WorkExperienceProgramsFilters from "./WorkExperienceProgramsFilters";
import WorkExperienceProgramsTable from "./WorkExperienceProgramsTable";
import { IWorkExperienceProgram } from "./types";
import { addToast } from "@heroui/toast";
import useWorkExperiencePrograms from "@/hook/useWorkExperiencePrograms";

export default function WorkExperienceProgramsView() {
  const router = useRouter();
  const { programs: fetchedPrograms, isLoading, publishProgram } =
    useWorkExperiencePrograms();

  const [selectedProgram, setSelectedProgram] = useState("all");
  const [selectedIndustry, setSelectedIndustry] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const filteredPrograms = useMemo(() => {
    return fetchedPrograms.filter((p) => {
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
  }, [
    fetchedPrograms,
    selectedProgram,
    selectedIndustry,
    selectedLevel,
    selectedStatus,
  ]);

  const handleCreate = () => {
    router.push("/admin/work-experience/create-workexp");
  };

  const handleView = (program: IWorkExperienceProgram) => {
    router.push(`/admin/work-experience/create-workexp/${program.id}`);
  };

  const handleEdit = (program: IWorkExperienceProgram) => {
    router.push(`/admin/work-experience/create-workexp/${program.id}`);
  };

  const handleAddIndustry = (program: IWorkExperienceProgram) => {
    router.push(`/admin/work-experience/create-workexp/${program.id}`);
  };

  const handlePublish = async (program: IWorkExperienceProgram) => {
    try {
      await publishProgram(program.id);
    } catch {
      // Handled in mutation onError
    }
  };

  const handleUnpublish = (program: IWorkExperienceProgram) => {
    addToast({
      title: "Work Experience Status",
      description: `${program.title} status update request submitted`,
      color: "warning",
    });
  };

  const handleToggleStatus = async (program: IWorkExperienceProgram) => {
    if (program.status !== "Published") {
      await handlePublish(program);
    } else {
      handleUnpublish(program);
    }
  };

  const handleDelete = (program: IWorkExperienceProgram) => {
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
        isLoading={isLoading}
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
