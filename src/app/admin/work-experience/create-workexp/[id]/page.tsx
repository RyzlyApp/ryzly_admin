"use client";
import React from "react";
import { useParams } from "next/navigation";
import { CreateWorkExpWizard } from "@/components/workexperience";

export default function CreateWorkExperienceWithIdPage() {
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : (params?.id as string | undefined);

  return <CreateWorkExpWizard experienceId={id} />;
}
