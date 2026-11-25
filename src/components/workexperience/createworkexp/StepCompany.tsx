"use client";
import React, { useRef } from "react";
import { FiUploadCloud } from "react-icons/fi";
import { RiCheckLine } from "react-icons/ri";
import { WorkExpFormData } from "./types";
import { addToast } from "@heroui/toast";

interface StepCompanyProps {
  formData: WorkExpFormData;
  updateCompany: (company: Partial<WorkExpFormData["company"]>) => void;
  onUploadLogo?: (file: File) => Promise<string>;
  isUploadingLogo?: boolean;
}

export default function StepCompany({
  formData,
  updateCompany,
  onUploadLogo,
  isUploadingLogo = false,
}: StepCompanyProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (onUploadLogo) {
        await onUploadLogo(file);
      } else {
        updateCompany({
          logoFileName: file.name,
          logoUrl: URL.createObjectURL(file),
        });
      }
    }
  };

  const handleAddCompany = () => {
    if (!formData.company.name.trim()) {
      addToast({
        title: "Required Field",
        description: "Please enter a company name",
        color: "warning",
      });
      return;
    }
    addToast({
      title: "Company Added",
      description: `${formData.company.name} company profile updated`,
      color: "success",
    });
  };

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Section Header */}
      <div>
        <h2 className="text-xl font-bold text-[#101828]">Company</h2>
        <p className="text-sm text-[#475467] mt-1">
          Create a simulated company for this work experience.
        </p>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Form Card */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 lg:p-8 flex flex-col gap-6">
          <h3 className="text-base font-semibold text-[#101828]">
            Company Details
          </h3>

          {/* Company Name */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-700">
              Company Name
            </label>
            <input
              type="text"
              value={formData.company.name}
              onChange={(e) => updateCompany({ name: e.target.value })}
              placeholder="e.g. Acme Corporation or simulated company"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-[#101828] placeholder-gray-400 focus:outline-none focus:border-[#5160E7] focus:ring-2 focus:ring-[#5160E7]/10 transition-all"
            />
            <span className="text-xs text-gray-400">
              The simulated company participants will work in.
            </span>
          </div>

          {/* Company Description */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-700">
              Company Description
            </label>
            <textarea
              rows={4}
              value={formData.company.description}
              onChange={(e) => updateCompany({ description: e.target.value })}
              placeholder="Describe the simulated company's industry, mission and scale..."
              className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm text-[#101828] placeholder-gray-400 focus:outline-none focus:border-[#5160E7] focus:ring-2 focus:ring-[#5160E7]/10 transition-all resize-none"
            />
          </div>

          {/* Company Logo Upload Box */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-700">
              Company Logo
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
              {isUploadingLogo ? (
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-[#EEF2FF] text-[#5160E7] flex items-center justify-center mb-3">
                    <div className="w-5 h-5 border-2 border-[#5160E7] border-t-transparent rounded-full animate-spin" />
                  </div>
                  <p className="text-sm font-semibold text-[#101828]">
                    Uploading logo to server...
                  </p>
                </div>
              ) : formData.company.logoFileName ? (
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-[#E8FAF0] text-[#10B981] flex items-center justify-center mb-3">
                    <RiCheckLine size={24} />
                  </div>
                  <p className="text-sm font-semibold text-[#10B981]">
                    Uploaded: {formData.company.logoFileName}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Click to replace logo
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

          {/* Add Company Button */}
          <div className="flex justify-end pt-2">
            <button
              type="button"
              onClick={handleAddCompany}
              className="px-6 py-2.5 rounded-lg bg-[#1D1348] text-white text-sm font-medium hover:bg-[#281a64] transition-colors cursor-pointer shadow-sm"
            >
              Add Company
            </button>
          </div>
        </div>

        {/* Right Column: Information Card with Illustration */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col gap-4">
          <div className="w-full h-44 rounded-xl bg-gradient-to-b from-[#F5F7FF] to-[#ECEFFE] flex items-center justify-center overflow-hidden p-4 relative">
            <div className="absolute top-4 right-8 w-2 h-0.5 bg-[#5160E7] rotate-45 rounded-full" />
            <div className="absolute top-6 right-12 w-3 h-0.5 bg-[#5160E7] -rotate-12 rounded-full" />
            <div className="absolute top-8 right-6 w-2 h-0.5 bg-[#5160E7] rotate-12 rounded-full" />

            <svg
              className="w-44 h-32"
              viewBox="0 0 160 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="20"
                y="50"
                width="36"
                height="60"
                rx="4"
                fill="#4F46E5"
              />
              <rect x="26" y="58" width="8" height="6" rx="1" fill="#C7D2FE" />
              <rect x="42" y="58" width="8" height="6" rx="1" fill="#C7D2FE" />
              <rect x="26" y="70" width="8" height="6" rx="1" fill="#C7D2FE" />
              <rect x="42" y="70" width="8" height="6" rx="1" fill="#C7D2FE" />
              <rect x="26" y="82" width="8" height="6" rx="1" fill="#C7D2FE" />
              <rect x="42" y="82" width="8" height="6" rx="1" fill="#C7D2FE" />

              <rect
                x="58"
                y="25"
                width="44"
                height="85"
                rx="6"
                fill="#3730A3"
              />
              <line
                x1="80"
                y1="12"
                x2="80"
                y2="25"
                stroke="#3730A3"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <circle cx="80" cy="11" r="2.5" fill="#5160E7" />
              <rect x="66" y="34" width="8" height="8" rx="1.5" fill="#E0E7FF" />
              <rect x="86" y="34" width="8" height="8" rx="1.5" fill="#E0E7FF" />
              <rect x="66" y="48" width="8" height="8" rx="1.5" fill="#E0E7FF" />
              <rect x="86" y="48" width="8" height="8" rx="1.5" fill="#E0E7FF" />
              <rect x="66" y="62" width="8" height="8" rx="1.5" fill="#E0E7FF" />
              <rect x="86" y="62" width="8" height="8" rx="1.5" fill="#E0E7FF" />
              <rect x="66" y="76" width="8" height="8" rx="1.5" fill="#E0E7FF" />
              <rect x="86" y="76" width="8" height="8" rx="1.5" fill="#E0E7FF" />

              <rect
                x="104"
                y="65"
                width="28"
                height="45"
                rx="4"
                fill="#4F46E5"
              />
              <rect x="110" y="73" width="6" height="18" rx="1" fill="#EEF2FF" />
              <rect x="120" y="73" width="6" height="18" rx="1" fill="#EEF2FF" />
            </svg>
          </div>

          <div>
            <h4 className="text-base font-bold text-[#101828]">
              Industries in this Work Experience
            </h4>
            <p className="text-xs text-[#475467] mt-1.5 leading-relaxed font-normal">
              Add one or more industries, each with its own simulated company,
              stages and tasks.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
