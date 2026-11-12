"use client";
import React from "react";
import { Avatar } from "@heroui/react";
import { HiArrowLeft } from "react-icons/hi";
import { useRouter } from "next/navigation";
import { IParticipant } from "../types";

interface ParticipantDetailsHeaderProps {
  participant: IParticipant;
  onMessage?: () => void;
}

export default function ParticipantDetailsHeader({
  participant,
  onMessage,
}: ParticipantDetailsHeaderProps) {
  const router = useRouter();

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Back button */}
      <div>
        <button
          type="button"
          onClick={() => router.push("/admin/work-experience/participants")}
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#5160E7] hover:underline cursor-pointer transition-colors"
        >
          <HiArrowLeft size={16} />
          <span>Back to Participants</span>
        </button>
      </div>

      {/* Profile Header Row */}
      <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white px-4 py-8 rounded-2xl shadow-xs">
        <div className="flex items-center gap-4">
          <Avatar
            src={participant.avatar}
            name={participant.name}
            className="w-16 h-16 rounded-full object-cover shrink-0 ring-2 ring-gray-100"
          />
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <h1 className="text-2xl font-bold text-[#1D1348]">
              {participant.name}
            </h1>
            <div className="flex items-center gap-1.5 text-xs text-[#64748B]">
              <span>Level</span>
              <span className="bg-[#E8FAF0] text-[#10B981] border border-[#10B981]/20 rounded-full px-3 py-0.5 font-semibold text-xs">
                {participant.level}
              </span>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={onMessage}
          className="px-6 py-2.5 bg-[#5160E7] hover:bg-[#4351D0] text-white text-sm font-semibold rounded-full shadow-sm transition-colors cursor-pointer self-start sm:self-auto"
        >
          Message Participant
        </button>
      </div>
    </div>
  );
}
