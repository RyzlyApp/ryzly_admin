"use client";
import React from "react";
import { RiBriefcaseLine, RiBarChartLine } from "react-icons/ri";
import { IParticipant } from "../types";

interface ParticipantDetailsCardsProps {
  participant: IParticipant;
}

export default function ParticipantDetailsCards({
  participant,
}: ParticipantDetailsCardsProps) {
  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Programme Card */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 flex flex-col justify-between shadow-xs">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#F2F4FF] flex items-center justify-center text-[#5160E7]">
              <RiBriefcaseLine size={20} />
            </div>
            <h2 className="text-base font-bold text-[#1D1348]">Programme</h2>
          </div>

          <div className="mt-4">
            <h3 className="text-base font-bold text-[#101828]">
              {participant.programTitle} Work Experience
            </h3>
            <div className="mt-3 flex flex-col gap-1 text-sm text-[#475467]">
              <p>Enrolled: {participant.joinedDate}</p>
              <p>
                Expected completion:{" "}
                {participant.expectedCompletion || "Dec 15, 2026"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Card */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 flex flex-col justify-between shadow-xs">
        <div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#F2F4FF] flex items-center justify-center text-[#5160E7]">
                <RiBarChartLine size={20} />
              </div>
              <h2 className="text-base font-bold text-[#1D1348]">Progress</h2>
            </div>
            <span className="text-base font-bold text-[#1D1348]">
              {participant.progress}%
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-[#EEF0FF] rounded-full h-2.5 overflow-hidden mt-4">
            <div
              className="bg-[#5160E7] h-full rounded-full transition-all duration-300"
              style={{ width: `${participant.progress}%` }}
            />
          </div>

          {/* Task Metrics */}
          <div className="grid grid-cols-3 gap-4 pt-5 mt-4 border-t border-gray-50">
            <div>
              <p className="text-xl font-bold text-[#101828]">
                {participant.tasksCompleted}
              </p>
              <p className="text-xs text-[#64748B] mt-0.5">Tasks completed</p>
            </div>
            <div>
              <p className="text-xl font-bold text-[#101828]">
                {participant.tasksPending}
              </p>
              <p className="text-xs text-[#64748B] mt-0.5">Task pending</p>
            </div>
            <div>
              <p className="text-xl font-bold text-[#101828]">
                {participant.totalTasks}
              </p>
              <p className="text-xs text-[#64748B] mt-0.5">Total tasks</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
