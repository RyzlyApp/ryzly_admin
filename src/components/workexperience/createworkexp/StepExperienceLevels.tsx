"use client";
import React from "react";
import { Switch } from "@heroui/react";
import { RiPlantLine, RiBarChartLine, RiArrowDownSLine } from "react-icons/ri";
import { WorkExpFormData } from "./types";
import RichTextToolbarEditor from "./RichTextToolbarEditor";

interface StepExperienceLevelsProps {
  formData: WorkExpFormData;
  updateLevel: (
    levelKey: "beginner" | "advanced",
    config: Partial<WorkExpFormData["levels"]["beginner"]>
  ) => void;
}

export default function StepExperienceLevels({
  formData,
  updateLevel,
}: StepExperienceLevelsProps) {
  const beginnerOptions = ["Foundations", "Starter", "Core Skills", "Explorer"];
  const advancedOptions = ["Build and Grow", "Specialist", "Mastery", "Executive"];

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Section Header */}
      <div>
        <h2 className="text-xl font-bold text-[#101828]">Experience Levels</h2>
        <p className="text-sm text-[#475467] mt-1">
          Set up the experience levels for this work experience. Choose the levels
          to offer, write a description for each and set the duration in weeks.
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Level Cards */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* Beginner Level Card */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col gap-5">
            {/* Header with Switch */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#F2F4FF] text-[#5160E7] flex items-center justify-center shrink-0">
                  <RiPlantLine size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#101828]">
                    Beginner Level
                  </h3>
                  <p className="text-xs text-[#475467] mt-0.5">
                    An entry-level experience for talents who are new to the role.
                  </p>
                </div>
              </div>

              <Switch
                isSelected={formData.levels.beginner.enabled}
                onValueChange={(val) => updateLevel("beginner", { enabled: val })}
                color="primary"
                size="sm"
                classNames={{
                  wrapper: "group-data-[selected=true]:bg-[#5160E7]",
                }}
              />
            </div>

            {formData.levels.beginner.enabled && (
              <>
                {/* Level Name Select */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-gray-700">
                    Level Name *
                  </label>
                  <div className="relative">
                    <select
                      value={formData.levels.beginner.levelName}
                      onChange={(e) =>
                        updateLevel("beginner", { levelName: e.target.value })
                      }
                      className="w-full appearance-none px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-[#101828] bg-white focus:outline-none focus:border-[#5160E7] focus:ring-2 focus:ring-[#5160E7]/10 cursor-pointer pr-10"
                    >
                      {beginnerOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                      <RiArrowDownSLine size={18} />
                    </div>
                  </div>
                </div>

                {/* Gains WYSIWYG Editor */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-gray-700">
                    What would talents gain?
                  </label>
                  <RichTextToolbarEditor
                    value={formData.levels.beginner.gains}
                    onChange={(val) => updateLevel("beginner", { gains: val })}
                    placeholder="Describe what learners will learn and achieve..."
                    rows={4}
                  />
                </div>
              </>
            )}
          </div>

          {/* Advanced Level Card */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col gap-5">
            {/* Header with Switch */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#F2F4FF] text-[#5160E7] flex items-center justify-center shrink-0">
                  <RiBarChartLine size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#101828]">
                    Advanced Level
                  </h3>
                  <p className="text-xs text-[#475467] mt-0.5">
                    A higher-level experience for talents with some prior knowledge
                    or experience.
                  </p>
                </div>
              </div>

              <Switch
                isSelected={formData.levels.advanced.enabled}
                onValueChange={(val) => updateLevel("advanced", { enabled: val })}
                color="primary"
                size="sm"
                classNames={{
                  wrapper: "group-data-[selected=true]:bg-[#5160E7]",
                }}
              />
            </div>

            {formData.levels.advanced.enabled && (
              <>
                {/* Level Name Select */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-gray-700">
                    Level Name *
                  </label>
                  <div className="relative">
                    <select
                      value={formData.levels.advanced.levelName}
                      onChange={(e) =>
                        updateLevel("advanced", { levelName: e.target.value })
                      }
                      className="w-full appearance-none px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-[#101828] bg-white focus:outline-none focus:border-[#5160E7] focus:ring-2 focus:ring-[#5160E7]/10 cursor-pointer pr-10"
                    >
                      {advancedOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                      <RiArrowDownSLine size={18} />
                    </div>
                  </div>
                </div>

                {/* Gains WYSIWYG Editor */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-gray-700">
                    What would talents gain?
                  </label>
                  <RichTextToolbarEditor
                    value={formData.levels.advanced.gains}
                    onChange={(val) => updateLevel("advanced", { gains: val })}
                    placeholder="Describe higher-level deliverables and competencies..."
                    rows={4}
                  />
                </div>
              </>
            )}
          </div>
        </div>

        {/* Right Column: Info Cards */}
        <div className="lg:col-span-4 flex flex-col gap-5">
          {/* About Experience Levels Card */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col gap-4">
            {/* Podium Flag SVG Illustration */}
            <div className="w-full h-44 rounded-xl bg-gradient-to-b from-[#F5F7FF] to-[#ECEFFE] flex items-center justify-center overflow-hidden p-4 relative">
              <div className="absolute top-4 right-10 w-2 h-0.5 bg-[#5160E7] rotate-45 rounded-full" />
              <div className="absolute top-7 right-6 w-2.5 h-0.5 bg-[#5160E7] -rotate-12 rounded-full" />

              <svg
                className="w-40 h-32"
                viewBox="0 0 160 120"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Step 1 Bar */}
                <rect x="25" y="75" width="22" height="40" rx="3" fill="#C7D2FE" />
                {/* Step 2 Bar */}
                <rect x="47" y="60" width="22" height="55" rx="3" fill="#818CF8" />
                {/* Step 3 Bar (Center High) */}
                <rect x="69" y="38" width="26" height="77" rx="3" fill="#4F46E5" />
                {/* Step 4 Bar */}
                <rect x="95" y="52" width="22" height="63" rx="3" fill="#818CF8" />
                {/* Step 5 Bar */}
                <rect x="117" y="70" width="20" height="45" rx="3" fill="#C7D2FE" />

                {/* Flag on center bar */}
                <line
                  x1="82"
                  y1="22"
                  x2="82"
                  y2="38"
                  stroke="#1D1348"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M82 22L98 27L82 32V22Z"
                  fill="#5160E7"
                />
              </svg>
            </div>

            <div>
              <h4 className="text-base font-bold text-[#101828]">
                About Experience Levels
              </h4>
              <p className="text-xs text-[#475467] mt-1.5 leading-relaxed font-normal">
                Experience levels let you offer a progressive learning journey for
                participants, with a clear duration for each level.
              </p>
            </div>
          </div>

          {/* Key things to know Card */}
          <div className="bg-[#F2F4FF] rounded-2xl p-6 flex flex-col gap-3">
            <h4 className="text-sm font-bold text-[#101828]">
              Key things to know
            </h4>
            <div className="flex flex-col gap-2.5 text-xs text-[#475467] leading-relaxed">
              <p>Set how many weeks each level will run.</p>
              <p>
                Each level will have its own stages and tasks per industry.
              </p>
              <p>You can offer one level or both (Beginner and Advanced).</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
