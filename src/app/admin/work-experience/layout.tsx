"use client";
import React from "react";
import { WorkExperienceBottomNav } from "@/components/workexperience";

interface WorkExperienceLayoutProps {
  children: React.ReactNode;
}

export default function WorkExperienceLayout({
  children,
}: WorkExperienceLayoutProps) {
  return (
    <div className="relative w-full min-h-full pb-24">
      {children}
      <WorkExperienceBottomNav />
    </div>
  );
}
