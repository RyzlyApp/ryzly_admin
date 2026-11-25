"use client";
import React, { useRef } from "react";
import { WorkExpFormData } from "./types";
import { FiUploadCloud } from "react-icons/fi";
import { RiArrowDownSLine, RiCheckLine } from "react-icons/ri";
import RichTextToolbarEditor from "./RichTextToolbarEditor";

interface StepBasicInfoProps {
  formData: WorkExpFormData;
  updateBasicInfo: (info: Partial<WorkExpFormData["basicInfo"]>) => void;
  onUploadCoverImage?: (file: File) => Promise<string>;
  isUploadingCover?: boolean;
  industries?: Array<{ _id: string; name: string }>;
  isLoadingIndustries?: boolean;
  tracks?: Array<{ _id: string; name: string }>;
  isLoadingTracks?: boolean;
}

export default function StepBasicInfo({
  formData,
  updateBasicInfo,
  onUploadCoverImage,
  isUploadingCover = false,
  industries = [],
  isLoadingIndustries = false,
  tracks = [],
  isLoadingTracks = false,
}: StepBasicInfoProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const nameOptions = [
    "Product Design Work Experience",
    "Product Management Work Experience",
    "Data Analytics Work Experience",
    "Software Engineering Work Experience",
    "Digital Marketing Work Experience",
  ];

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (onUploadCoverImage) {
        await onUploadCoverImage(file);
      } else {
        updateBasicInfo({
          coverImageFileName: file.name,
          coverImageUrl: URL.createObjectURL(file),
        });
      }
    }
  };

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Section Header */}
      <div>
        <h2 className="text-xl font-bold text-[#101828]">Basic Information</h2>
        <p className="text-sm text-[#475467] mt-1">
          Set up the foundation for this work experience.
        </p>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Form Card */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 lg:p-8 flex flex-col gap-6">
          {/* Work Experience Name */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-700">
              Work Experience Name *
            </label>
            <div className="relative">
              <select
                value={formData.basicInfo.title}
                onChange={(e) => updateBasicInfo({ title: e.target.value })}
                className="w-full appearance-none px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-[#101828] bg-white focus:outline-none focus:border-[#5160E7] focus:ring-2 focus:ring-[#5160E7]/10 cursor-pointer pr-10"
              >
                <option value="" disabled>
                  {isLoadingTracks
                    ? "Loading tracks..."
                    : "Select work experience track"}
                </option>
                {tracks.map((track) => (
                  <option key={track._id} value={track._id}>
                    {track.name}
                  </option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                <RiArrowDownSLine size={18} />
              </div>
            </div>
            <span className="text-xs text-gray-400">
              A clear, descriptive name for the work experience.
            </span>
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-700">
              Description
            </label>
            <textarea
              rows={4}
              value={formData.basicInfo.description}
              onChange={(e) =>
                updateBasicInfo({ description: e.target.value })
              }
              placeholder="Provide a clear overview of this work experience project..."
              className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm text-[#101828] placeholder-gray-400 focus:outline-none focus:border-[#5160E7] focus:ring-2 focus:ring-[#5160E7]/10 transition-all resize-none"
            />
          </div>

          {/* Industry */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-700">
              Industry *
            </label>
            <div className="relative">
              <select
                value={formData.basicInfo.industry}
                onChange={(e) => updateBasicInfo({ industry: e.target.value })}
                className="w-full appearance-none px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-[#101828] bg-white focus:outline-none focus:border-[#5160E7] focus:ring-2 focus:ring-[#5160E7]/10 cursor-pointer pr-10"
              >
                <option value="" disabled>
                  {isLoadingIndustries
                    ? "Loading industries..."
                    : "Select an Industry"}
                </option>
                {industries.map((ind) => (
                  <option key={ind._id} value={ind._id}>
                    {ind.name}
                  </option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                <RiArrowDownSLine size={18} />
              </div>
            </div>
            <span className="text-xs text-gray-400">
              A clear, descriptive name for the work experience.
            </span>
          </div>

          {/* Who the experience is for */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-700">
              Who the experience is for
            </label>
            <RichTextToolbarEditor
              value={formData.basicInfo.whoFor}
              onChange={(val) => updateBasicInfo({ whoFor: val })}
              placeholder="Describe the target learners, roles and experience level..."
              rows={4}
            />
          </div>

          {/* What talents will gain */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-700">
              What talents will gain
            </label>
            <RichTextToolbarEditor
              value={formData.basicInfo.whatGains}
              onChange={(val) => updateBasicInfo({ whatGains: val })}
              placeholder="List the competencies and tangible outcomes..."
              rows={4}
            />
          </div>

          {/* Careers this will prepare them for */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-700">
              Careers this will prepare them for
            </label>
            <RichTextToolbarEditor
              value={formData.basicInfo.careers}
              onChange={(val) => updateBasicInfo({ careers: val })}
              placeholder="e.g. Junior Product Designer, UX Researcher..."
              rows={4}
            />
          </div>

          {/* Cover Image Upload Box */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-700">
              Cover Image
            </label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,.pdf,.docx"
              onChange={handleFileChange}
              className="hidden"
            />
            <div
              onClick={() => fileInputRef.current?.click()}
              className="w-full border-2 border-dashed border-[#C7D2FE] bg-white rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-50/50 hover:border-[#5160E7] transition-all group"
            >
              {isUploadingCover ? (
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-[#EEF2FF] text-[#5160E7] flex items-center justify-center mb-3">
                    <div className="w-5 h-5 border-2 border-[#5160E7] border-t-transparent rounded-full animate-spin" />
                  </div>
                  <p className="text-sm font-semibold text-[#101828]">
                    Uploading file to server...
                  </p>
                </div>
              ) : formData.basicInfo.coverImageFileName ? (
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-[#E8FAF0] text-[#10B981] flex items-center justify-center mb-3">
                    <RiCheckLine size={24} />
                  </div>
                  <p className="text-sm font-semibold text-[#10B981]">
                    Uploaded: {formData.basicInfo.coverImageFileName}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Click to replace image
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-[#EEF2FF] text-[#5160E7] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                    <FiUploadCloud size={22} />
                  </div>
                  <p className="text-sm font-semibold text-[#101828]">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    PDF, DOCX (max 50MB)
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Info Card with Browser Illustration */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col gap-4">
          <div className="w-full h-48 rounded-xl bg-gradient-to-b from-[#F2F4FD] to-[#E9EDFD] flex items-center justify-center overflow-hidden p-4 relative">
            <svg
              className="w-48 h-36"
              viewBox="0 0 200 140"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="20"
                y="15"
                width="160"
                height="110"
                rx="10"
                fill="white"
                filter="drop-shadow(0 4px 12px rgba(81, 96, 231, 0.12))"
              />
              <circle cx="34" cy="28" r="3" fill="#5160E7" />
              <circle cx="44" cy="28" r="3" fill="#818CF8" />
              <circle cx="54" cy="28" r="3" fill="#C7D2FE" />
              <rect
                x="30"
                y="40"
                width="140"
                height="16"
                rx="3"
                fill="#F2F4FD"
              />
              <rect
                x="30"
                y="64"
                width="140"
                height="45"
                rx="4"
                fill="#F8F9FC"
              />
              <g transform="translate(142, 85)">
                <path
                  d="M0 0L14 18L7 19L11 27L7 29L3 21L0 24V0Z"
                  fill="#1D1348"
                  stroke="white"
                  strokeWidth="1.5"
                />
              </g>
            </svg>
          </div>

          <div>
            <h4 className="text-base font-bold text-[#101828]">
              Creating a Work Experience
            </h4>
            <p className="text-xs text-[#475467] mt-1.5 leading-relaxed font-normal">
              You&apos;ll set up a complete, real-world experience for talents,
              including the industry, company, stages, tasks and how they&apos;ll
              be assessed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
