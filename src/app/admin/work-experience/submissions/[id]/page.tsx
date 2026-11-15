"use client";
import React, { use, Suspense } from "react";
import { WorkExperienceSubmissionDetailsView } from "@/components/workexperience/submissions";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function WorkExperienceSubmissionDetailsPage({
  params,
}: PageProps) {
  const resolvedParams = use(params);
  return (
    <Suspense fallback={<div className="w-full p-6 lg:p-8" />}>
      <WorkExperienceSubmissionDetailsView id={resolvedParams.id} />
    </Suspense>
  );
}
