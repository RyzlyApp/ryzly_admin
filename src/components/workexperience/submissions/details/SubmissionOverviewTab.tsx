"use client";
import React from "react";
import { Avatar } from "@heroui/react";
import { RiFileLine, RiEyeLine, RiDownloadLine } from "react-icons/ri";
import { ISubmissionDetails } from "../types";
import { addToast } from "@heroui/toast";

interface SubmissionOverviewTabProps {
  submission: ISubmissionDetails;
}

export default function SubmissionOverviewTab({
  submission,
}: SubmissionOverviewTabProps) {
  const handleViewFile = (file: ISubmissionDetails["uploadedFiles"][0]) => {
    addToast({
      title: "View Document",
      description: `Opening preview for ${file.name}...`,
      color: "primary",
    });
  };

  const handleDownloadFile = (file: ISubmissionDetails["uploadedFiles"][0]) => {
    addToast({
      title: "Downloading File",
      description: `Downloading ${file.name} (${file.size || "PDF"})...`,
      color: "success",
    });
  };

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Left Column (Participant Submission Details) */}
      <div className="lg:col-span-7 flex flex-col gap-6 bg-white p-5 rounded-2xl shadow-xs">
        {/* Participant Header Info Card */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl border border-gray-100 bg-[#FAFAFC]">
          <div className="flex items-center gap-3">
            <Avatar
              src={submission.avatar}
              name={submission.participantName}
              size="md"
              className="w-11 h-11 rounded-full object-cover shrink-0"
            />
            <div className="flex flex-col">
              <span className="text-sm font-bold text-[#1D1348]">
                {submission.participantName}
              </span>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs text-[#64748B]">Level</span>
                <span className="bg-gray-100 text-[#344054] text-xs px-2.5 py-0.5 rounded-full font-medium">
                  {submission.level}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:text-right">
            <span className="text-xs text-[#64748B]">Submitted</span>
            <span className="text-xs font-semibold text-[#101828] mt-0.5">
              {submission.submittedAt}
            </span>
          </div>
        </div>

        {/* Description Section */}
        <div className="flex flex-col gap-2">
          <h2 className="text-sm font-bold text-[#3A3A3C]">Description</h2>
          <p className="text-sm text-[#1C1C1E] leading-relaxed bg-white p-4 rounded-2xl border border-gray-100">
            {submission.description}
          </p>
        </div>

        {/* Uploaded Files Section */}
        <div className="flex flex-col gap-3">
          <h2 className="text-sm font-bold text-[#3A3A3C]">Uploaded Files</h2>
          <div className="flex flex-col gap-2.5">
            {submission.uploadedFiles.map((file) => (
              <div
                key={file.id}
                className="flex items-center justify-between p-3.5 bg-[#7A88FE]/10 rounded-2xl transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#F2F4FF] flex items-center justify-center text-[#1D1348] shrink-0">
                    <RiFileLine size={20}/>
                  </div>
                  <span className="text-sm font-semibold text-[#1D1348]">
                    {file.name}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleViewFile(file)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#1D1348] rounded-lg bg-white transition-colors cursor-pointer"
                  >
                    <RiEyeLine size={15} />
                    <span>View</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDownloadFile(file)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#1D1348] rounded-lg bg-white transition-colors cursor-pointer"
                  >
                    <RiDownloadLine size={15} />
                    <span>Download</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Column (Task Brief Guidelines) */}
      <div className="lg:col-span-5 flex flex-col p-6 rounded-2xl bg-white">
        <h2 className="text-xl font-bold text-[#1D1348]">
          {submission.taskBrief.title}
        </h2>

        {/* Task Overview */}
        <div className="mt-5">
          <h3 className="text-sm font-bold text-[#101828]">Task Overview</h3>
          <p className="text-xs text-[#1C1C1E] leading-relaxed mt-1.5">
            {submission.taskBrief.overview}
          </p>
        </div>

        {/* What to do */}
        <div className="mt-5 flex flex-col gap-3">
          <h3 className="text-sm font-bold text-[#101828]">What to do</h3>
          <div className="flex flex-col gap-3">
            {submission.taskBrief.whatToDo.map((step, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-[#F2F4FF] text-[#5160E7] flex items-center justify-center text-xs font-semibold shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <p className="text-xs text-[#1C1C1E] leading-normal">{step}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Expected deliverable */}
        <div className="mt-6 p-4 rounded-xl bg-[#F2F4FF] border border-[#EEF0FF]">
          <h4 className="text-xs font-bold text-[#1D1348]">
            Expected deliverable
          </h4>
          <p className="text-xs text-[#3A3A3C] leading-relaxed mt-1">
            {submission.taskBrief.expectedDeliverable}
          </p>
        </div>
      </div>
    </div>
  );
}
