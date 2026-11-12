"use client";
import React, { useMemo, useState } from "react";
import ParticipantsHeader from "./ParticipantsHeader";
import ParticipantsFilters from "./ParticipantsFilters";
import ParticipantsTable from "./ParticipantsTable";
import { INITIAL_PARTICIPANTS, IParticipant } from "./types";
import { addToast } from "@heroui/toast";

export default function WorkExperienceParticipantsView() {
  const [participants] = useState<IParticipant[]>(INITIAL_PARTICIPANTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProgram, setSelectedProgram] = useState("all");
  const [selectedIndustry, setSelectedIndustry] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("all");

  const filteredParticipants = useMemo(() => {
    return participants.filter((p) => {
      // Search query (name, email, or id)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = p.name.toLowerCase().includes(query);
        const matchesEmail = p.email?.toLowerCase().includes(query) ?? false;
        const matchesId = p.id.toLowerCase().includes(query);
        if (!matchesName && !matchesEmail && !matchesId) return false;
      }

      // Program filter
      if (
        selectedProgram !== "all" &&
        !p.programTitle.toLowerCase().includes(selectedProgram.toLowerCase())
      ) {
        return false;
      }

      // Industry filter
      if (
        selectedIndustry !== "all" &&
        p.industry.toLowerCase() !== selectedIndustry.toLowerCase()
      ) {
        return false;
      }

      // Level filter
      if (
        selectedLevel !== "all" &&
        p.level.toLowerCase() !== selectedLevel.toLowerCase()
      ) {
        return false;
      }

      return true;
    });
  }, [participants, searchQuery, selectedProgram, selectedIndustry, selectedLevel]);

  const handleMessageParticipant = (participant: IParticipant) => {
    addToast({
      title: "Message Participant",
      description: `Opening direct message thread with ${participant.name}...`,
      color: "primary",
    });
  };

  const handleExportParticipant = (participant: IParticipant) => {
    addToast({
      title: "Export Data",
      description: `Exporting activity report for ${participant.name}...`,
      color: "success",
    });
  };

  return (
    <div className="w-full p-6 lg:p-8 flex flex-col gap-6">
      <ParticipantsHeader />

      <ParticipantsFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedProgram={selectedProgram}
        onProgramChange={setSelectedProgram}
        selectedIndustry={selectedIndustry}
        onIndustryChange={setSelectedIndustry}
        selectedLevel={selectedLevel}
        onLevelChange={setSelectedLevel}
      />

      <ParticipantsTable
        participants={filteredParticipants}
        onMessageParticipant={handleMessageParticipant}
        onExportParticipant={handleExportParticipant}
      />
    </div>
  );
}
