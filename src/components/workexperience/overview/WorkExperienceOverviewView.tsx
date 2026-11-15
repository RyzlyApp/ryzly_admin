"use client";
import React from "react";
import WorkExperienceOverviewHeader from "./WorkExperienceOverviewHeader";
import WorkExperienceStatsCards from "./WorkExperienceStatsCards";
import WorkExperiencePerformanceChart from "./WorkExperiencePerformanceChart";
import WorkExperienceRecentActivities from "./WorkExperienceRecentActivities";
import WorkExperienceTopProgrammes from "./WorkExperienceTopProgrammes";
import WorkExperiencePendingActions from "./WorkExperiencePendingActions";

export default function WorkExperienceOverviewView() {
  return (
    <div className="w-full flex flex-col gap-6">
      {/* Top Banner */}
      <WorkExperienceOverviewHeader />

      {/* 4 Metric Stats */}
      <WorkExperienceStatsCards />

      {/* Mid Row: Performance Chart + Recent Activities */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-7 h-full">
          <WorkExperiencePerformanceChart />
        </div>
        <div className="lg:col-span-5 h-full">
          <WorkExperienceRecentActivities />
        </div>
      </div>

      {/* Bottom Row: Top Programmes + Pending Actions */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-7 h-full">
          <WorkExperienceTopProgrammes />
        </div>
        <div className="lg:col-span-5 h-full">
          <WorkExperiencePendingActions />
        </div>
      </div>
    </div>
  );
}
