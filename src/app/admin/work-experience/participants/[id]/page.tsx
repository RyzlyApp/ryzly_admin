"use client";
import React, { use } from "react";
import { WorkExperienceParticipantDetailsView } from "@/components/workexperience/participants";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function WorkExperienceParticipantDetailsPage({
  params,
}: PageProps) {
  const resolvedParams = use(params);
  return <WorkExperienceParticipantDetailsView id={resolvedParams.id} />;
}
