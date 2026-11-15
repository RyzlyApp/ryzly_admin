"use client";
import React from "react";
import CustomButton from "@/components/custom/customButton";

interface WorkExperienceProgramsHeaderProps {
  onCreate?: () => void;
}

export default function WorkExperienceProgramsHeader({
  onCreate,
}: WorkExperienceProgramsHeaderProps) {
  return (
    <div className="w-full flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-[#1D1348] tracking-tight">
          Work Experience Programs
        </h1>
        <p className="text-sm text-[#475467] mt-1 font-normal">
          Create, manage and publish work experiences across different career tracks and
          industries.
        </p>
      </div>

      <div className="shrink-0">
        <CustomButton
          variant="primary"
          rounded="full"
          height="44px"
          fontSize="14px"
          onClick={onCreate}
        >
          Create Work Experience
        </CustomButton>
      </div>
    </div>
  );
}
