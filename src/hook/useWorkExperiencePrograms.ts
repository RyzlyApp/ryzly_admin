"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import httpService from "@/helper/services/httpService";
import { AxiosError } from "axios";
import { handleError } from "@/helper/utils/hanlderAxoisError";
import { addToast } from "@heroui/toast";
import {
  IWorkExperienceProgram,
  ProgramIconType,
  ProgramLevel,
  ProgramStatus,
} from "@/components/workexperience/programs/types";

// Helper to determine icon based on program title/type
const inferProgramIcon = (title: string): ProgramIconType => {
  const lower = (title || "").toLowerCase();
  if (lower.includes("design") || lower.includes("ui") || lower.includes("ux")) {
    return "design";
  }
  if (lower.includes("analytic") || lower.includes("data")) {
    return "analytics";
  }
  if (lower.includes("market")) {
    return "marketing";
  }
  if (lower.includes("manage") || lower.includes("product")) {
    return "management";
  }
  return "design";
};

// Helper to format date nicely
const formatDate = (dateStr?: string): string => {
  if (!dateStr) return "Recent";
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return "Recent";
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return "Recent";
  }
};

// Helper to normalize raw backend object into IWorkExperienceProgram
export const normalizeWorkExperience = (raw: any, index: number): IWorkExperienceProgram => {
  const id = raw?._id || raw?.id || `program-${index}`;

  // Title extraction
  const typeObj = raw?.basicInformation?.type || raw?.type;
  let title = "Work Experience";
  if (typeof typeObj === "object" && typeObj !== null && typeObj.name) {
    title = typeObj.name;
  } else if (typeof typeObj === "string" && typeObj.trim()) {
    title = typeObj;
  } else if (raw?.basicInformation?.title) {
    title = raw.basicInformation.title;
  } else if (raw?.title) {
    title = raw.title;
  } else if (raw?.name) {
    title = raw.name;
  }

  // Subtitle
  const subtitle = raw?.company?.name || raw?.subtitle || "Work Experience";

  // Industries extraction
  const industryObj = raw?.basicInformation?.industry || raw?.industry;
  let industriesList: string[] = [];
  if (Array.isArray(industryObj)) {
    industriesList = industryObj.map((i: any) =>
      typeof i === "object" && i !== null ? i.name || i.title || String(i) : String(i)
    );
  } else if (typeof industryObj === "object" && industryObj !== null && industryObj.name) {
    industriesList = [industryObj.name];
  } else if (typeof industryObj === "string" && industryObj.trim()) {
    industriesList = [industryObj];
  } else if (Array.isArray(raw?.industries)) {
    industriesList = raw.industries;
  }

  if (industriesList.length === 0) {
    industriesList = ["Technology"];
  }

  const displayedIndustries = industriesList.slice(0, 2);
  const extraIndustriesCount =
    industriesList.length > 2 ? industriesList.length - 2 : undefined;

  // Levels extraction
  const levels: ProgramLevel[] = [];
  const levelObj = raw?.level;
  if (levelObj) {
    if (levelObj.beginnerEnabled !== false) {
      levels.push("Beginner");
    }
    if (levelObj.advancedEnabled) {
      levels.push("Advanced");
    }
  } else if (Array.isArray(raw?.levels)) {
    raw.levels.forEach((l: any) => {
      const str = String(l).toLowerCase();
      if (str.includes("beginner") && !levels.includes("Beginner")) levels.push("Beginner");
      if (str.includes("intermediate") && !levels.includes("Intermediate"))
        levels.push("Intermediate");
      if (str.includes("advanced") && !levels.includes("Advanced")) levels.push("Advanced");
    });
  }

  if (levels.length === 0) {
    levels.push("Beginner", "Advanced");
  }

  // Participants
  const participants =
    Number(raw?.participants || raw?.participantsCount || raw?.enrollmentCount || 0) || 0;

  // Status
  const rawStatus = String(raw?.status || "").toLowerCase();
  const status: ProgramStatus = rawStatus === "draft" ? "Draft" : "Published";

  // Last Updated
  const lastUpdated = formatDate(raw?.updatedAt || raw?.createdAt);

  // Image extraction (coverImage, company logo, or image)
  const image =
    raw?.basicInformation?.coverImage ||
    raw?.coverImage ||
    raw?.company?.logo ||
    raw?.logo ||
    raw?.image ||
    "";

  return {
    id: String(id),
    title,
    subtitle,
    iconType: inferProgramIcon(title),
    image: image ? String(image) : undefined,
    industries: displayedIndustries,
    extraIndustriesCount,
    levels,
    participants,
    status,
    lastUpdated,
  };
};

export const useWorkExperiencePrograms = () => {
  const queryClient = useQueryClient();

  // GET /work-experience/published (WorkExperienceController_published)
  const {
    data: rawProgramsData,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["workExperiencePrograms"],
    queryFn: async () => {
      try {
        const res = await httpService.get("/work-experience/published");
        const list = res?.data?.data || res?.data;
        return Array.isArray(list) ? list : [];
      } catch (err) {
        // Fallback to admin published or experiences query
        try {
          const fallbackRes = await httpService.get(
            "/work-experience/admin/experiences?status=published"
          );
          const list = fallbackRes?.data?.data || fallbackRes?.data;
          return Array.isArray(list) ? list : [];
        } catch {
          try {
            const fallbackAdminRes = await httpService.get(
              "/work-experience/admin/published"
            );
            const list = fallbackAdminRes?.data?.data || fallbackAdminRes?.data;
            return Array.isArray(list) ? list : [];
          } catch {
            return [];
          }
        }
      }
    },
    staleTime: 1000 * 60 * 2,
  });

  const rawPrograms = Array.isArray(rawProgramsData) ? rawProgramsData : [];

  const programs: IWorkExperienceProgram[] = rawPrograms.map((item, idx) =>
    normalizeWorkExperience(item, idx)
  );

  // POST /work-experience/admin/experiences/{id}/publish
  const publishMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await httpService.post(
        `/work-experience/admin/experiences/${id}/publish`
      );
      return res?.data?.data || res?.data;
    },
    onError: (error: AxiosError) => {
      handleError(error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workExperiencePrograms"] });
      addToast({
        title: "Program Published",
        description: "Work experience has been published successfully.",
        color: "success",
      });
    },
  });

  return {
    programs,
    rawPrograms,
    isLoading,
    isError,
    refetch,
    publishProgram: (id: string) => publishMutation.mutateAsync(id),
    isPublishing: publishMutation.isPending,
  };
};

export default useWorkExperiencePrograms;
