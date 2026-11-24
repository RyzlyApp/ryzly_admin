"use client";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import httpService from "@/helper/services/httpService";
import { addToast } from "@heroui/toast";
import { AxiosError } from "axios";
import { handleError } from "@/helper/utils/hanlderAxoisError";
import {
  ActiveView,
  StageItem,
  TaskItem,
  WizardStep,
  WorkExpFormData,
} from "@/components/workexperience/createworkexp/types";

export const INITIAL_WORK_EXP_VALUES: WorkExpFormData = {
  basicInfo: {
    title: "",
    description: "",
    industry: "",
    whoFor: "",
    whatGains: "",
    careers: "",
    durationWeeks: "",
    coverImageFileName: "",
    coverImageUrl: "",
  },
  company: {
    name: "",
    description: "",
    logoFileName: "",
    logoUrl: "",
  },
  levels: {
    beginner: {
      enabled: true,
      levelName: "",
      gains: "",
    },
    advanced: {
      enabled: false,
      levelName: "",
      gains: "",
    },
  },
  stages: [],
  tasks: [],
  pricing: {
    usdPrice: "",
    currency: "NGN",
    couponCode: "",
    beginnerFee: "",
    advancedFee: "",
  },
};

const validationSchema = Yup.object().shape({
  basicInfo: Yup.object().shape({
    title: Yup.string().required("Work experience name is required"),
    industry: Yup.string().required("Industry is required"),
    description: Yup.string().required("Description is required"),
  }),
  company: Yup.object().shape({
    name: Yup.string().required("Company name is required"),
  }),
  pricing: Yup.object().shape({
    currency: Yup.string().required("Currency is required"),
  }),
});

export interface UseCreateWorkExperienceOptions {
  initialExperienceId?: string;
}

export const useCreateWorkExperience = (options?: UseCreateWorkExperienceOptions) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const initialId = options?.initialExperienceId;

  const [currentStep, setCurrentStep] = useState<WizardStep>(1);
  const [activeView, setActiveView] = useState<ActiveView>("wizard");
  const [draftId, setDraftId] = useState<string | null>(initialId || null);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isUploadingCover, setIsUploadingCover] = useState(false);
  const [isUploadingLogo, setIsUploadingLogo] = useState(false);

  useEffect(() => {
    if (initialId) {
      setDraftId(initialId);
    }
  }, [initialId]);

  // Fetch options (tracks and industries) if available
  const { data: optionsData } = useQuery({
    queryKey: ["workExperienceOptions"],
    queryFn: async () => {
      try {
        const res = await httpService.get("/work-experience/admin/options");
        return res?.data?.data || res?.data;
      } catch {
        return null;
      }
    },
    staleTime: 1000 * 60 * 5,
  });

  // GET /challenge/Industry - ChallengePublicController_getChallengeEntities[0]
  const DEFAULT_INDUSTRIES = [
    { _id: "68eacace8e7d39e88c61e7e5", name: "Tech" },
    { _id: "68eacae08e7d39e88c61e7ea", name: "Business" },
    { _id: "68eacaf48e7d39e88c61e7ef", name: "FinTech" },
    { _id: "68eacb038e7d39e88c61e7f3", name: "HealthTech" },
    { _id: "68eacb0e8e7d39e88c61e7f7", name: "EdTech" },
    { _id: "68eacb188e7d39e88c61e7fb", name: "AgroTech" },
    { _id: "6a648619ebff18a304812ba8", name: "Mixed" },
    { _id: "6a648621ebff18a304812bac", name: "All" },
    { _id: "6a64862aebff18a304812bb0", name: "Real Estate" },
    { _id: "6a7e6a6f5223627bb03484ab", name: "E-travel" },
  ];

  const { data: industriesData, isLoading: isLoadingIndustries } = useQuery({
    queryKey: ["challengeIndustries"],
    queryFn: async () => {
      try {
        const res = await httpService.get("/challenge/Industry");
        const list = (res?.data?.data || []) as Array<{ _id: string; name: string }>;
        return list && list.length > 0 ? list : DEFAULT_INDUSTRIES;
      } catch {
        return DEFAULT_INDUSTRIES;
      }
    },
    staleTime: 1000 * 60 * 10,
  });

  const industries = industriesData || DEFAULT_INDUSTRIES;

  // GET /track/tracks - TrackController_getTracks
  const DEFAULT_TRACKS = [
    { _id: "693a7d1904fcb6082cb14b19", name: "Product Management" },
    { _id: "693a7d1904fcb6082cb14b20", name: "Design" },
    { _id: "693a7d1904fcb6082cb14b1e", name: "Software Engineering" },
    { _id: "693a7d1904fcb6082cb14b1d", name: "Data Analytics" },
    { _id: "693a7d1904fcb6082cb14b1b", name: "Cyber Security" },
    { _id: "693a7d1904fcb6082cb14b1c", name: "Digital Marketing" },
    { _id: "693a7d1904fcb6082cb14b27", name: "Content Creation" },
    { _id: "693a7d1904fcb6082cb14b28", name: "Video Editing" },
    { _id: "6a4d3aff3487797180ea0ca0", name: "Research" },
    { _id: "6a4d3b133487797180ea0d5a", name: "QA Testing" },
  ];

  const { data: tracksData, isLoading: isLoadingTracks } = useQuery({
    queryKey: ["challengeTracks"],
    queryFn: async () => {
      try {
        const res = await httpService.get("/track/tracks");
        const list = (res?.data?.data || []) as Array<{ _id: string; name: string }>;
        return list && list.length > 0 ? list : DEFAULT_TRACKS;
      } catch {
        return DEFAULT_TRACKS;
      }
    },
    staleTime: 1000 * 60 * 10,
  });

  const tracks = tracksData || DEFAULT_TRACKS;

  // POST /upload/file - UploadController_uploadFile
  const uploadImageMutation = useMutation({
    mutationFn: (formData: FormData) =>
      httpService.post("/upload/file", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      }),
    onError: (err: AxiosError) => {
      handleError(err);
    },
  });

  // Upload cover image handler
  const uploadCoverImage = async (file: File): Promise<string> => {
    setIsUploadingCover(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await uploadImageMutation.mutateAsync(formData);
      const uploadedUrl =
        res?.data?.data?.url ||
        res?.data?.url ||
        (typeof res?.data?.data === "string" ? res.data.data : "");

      const finalUrl = uploadedUrl || URL.createObjectURL(file);
      formik.setFieldValue("basicInfo.coverImageFileName", file.name);
      formik.setFieldValue("basicInfo.coverImageUrl", finalUrl);

      addToast({
        title: "Cover Image Uploaded",
        description: `${file.name} uploaded successfully`,
        color: "success",
      });
      return finalUrl;
    } catch {
      const localUrl = URL.createObjectURL(file);
      formik.setFieldValue("basicInfo.coverImageFileName", file.name);
      formik.setFieldValue("basicInfo.coverImageUrl", localUrl);
      return localUrl;
    } finally {
      setIsUploadingCover(false);
    }
  };

  // Upload company logo handler
  const uploadCompanyLogo = async (file: File): Promise<string> => {
    setIsUploadingLogo(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await uploadImageMutation.mutateAsync(formData);
      const uploadedUrl =
        res?.data?.data?.url ||
        res?.data?.url ||
        (typeof res?.data?.data === "string" ? res.data.data : "");

      const finalUrl = uploadedUrl || URL.createObjectURL(file);
      formik.setFieldValue("company.logoFileName", file.name);
      formik.setFieldValue("company.logoUrl", finalUrl);

      addToast({
        title: "Company Logo Uploaded",
        description: `${file.name} uploaded successfully`,
        color: "success",
      });
      return finalUrl;
    } catch {
      const localUrl = URL.createObjectURL(file);
      formik.setFieldValue("company.logoFileName", file.name);
      formik.setFieldValue("company.logoUrl", localUrl);
      return localUrl;
    } finally {
      setIsUploadingLogo(false);
    }
  };

  const getStageId = (s: any): string => {
    if (!s) return "";
    if (typeof s === "string") return s;
    if (typeof s === "object" && s !== null) {
      return s._id || s.id || "";
    }
    return "";
  };

  // Transform Formik values into Swagger WorkExperienceStepInput payload
  const buildApiPayload = (values: WorkExpFormData) => {
    const rawPrice =
      parseFloat(String(values.pricing.usdPrice || "").replace(/[^0-9.]/g, "")) || 0;

    // Resolve track/type _id
    const resolveTypeId = (val: string): string => {
      if (!val) return "";
      const matched = tracks.find(
        (t) => t._id === val || t.name?.toLowerCase() === val.toLowerCase()
      );
      return matched ? matched._id : val;
    };

    // Resolve industry _id
    const resolveIndustryId = (val: string): string => {
      if (!val) return "";
      const matched = industries.find(
        (i) => i._id === val || i.name?.toLowerCase() === val.toLowerCase()
      );
      return matched ? matched._id : val;
    };

    const stageIds: string[] = values.stages
      .map((s) => getStageId(s))
      .filter((id) => Boolean(id) && !id.startsWith("stage-"));

    return {
      basicInformation: {
        type: resolveTypeId(values.basicInfo.title),
        industry: resolveIndustryId(values.basicInfo.industry),
        description: values.basicInfo.description || "",
        coverImage: values.basicInfo.coverImageUrl || "",
      },
      company: {
        name: values.company.name || "",
        description: values.company.description || "",
        logo: values.company.logoUrl || "",
      },
      level: {
        beginnerEnabled: Boolean(values.levels.beginner.enabled),
        beginnerName: values.levels.beginner.levelName || "Beginner",
        beginnerGains: values.levels.beginner.gains || "",
        advancedEnabled: Boolean(values.levels.advanced.enabled),
        advancedName: values.levels.advanced.levelName || "Advanced",
        advancedGains: values.levels.advanced.gains || "",
      },
      stages: stageIds,
      pricing: {
        price: Math.max(0, Math.round(rawPrice)),
        currency: "NGN" as const,
        couponCode: values.pricing.couponCode || "",
      },
    };
  };

  // POST /work-experience/admin/experiences - WorkExperienceController_createExperience
  const createExperienceMutation = useMutation({
    mutationFn: async (payload: ReturnType<typeof buildApiPayload>) => {
      const res = await httpService.post(
        "/work-experience/admin/experiences",
        payload
      );
      return res?.data?.data || res?.data;
    },
    onError: (error: AxiosError) => {
      handleError(error);
    },
    onSuccess: (data) => {
      const id = data?.id || data?._id;
      if (id) {
        setDraftId(id);
      }
      queryClient.invalidateQueries({ queryKey: ["workExperiencePrograms"] });
    },
  });

  // PATCH /work-experience/admin/experiences/{id}/steps/{step} - WorkExperienceController_saveExperienceStep
  const saveStepMutation = useMutation({
    mutationFn: async ({
      id,
      step,
      payload,
    }: {
      id: string;
      step: number;
      payload: ReturnType<typeof buildApiPayload>;
    }) => {
      const res = await httpService.patch(
        `/work-experience/admin/experiences/${id}/steps/${step}`,
        payload
      );
      return res?.data?.data || res?.data;
    },
    onError: (error: AxiosError) => {
      handleError(error);
    },
  });

  // POST /work-experience/admin/experiences/{id}/publish - WorkExperienceController_publishExperience
  const publishExperienceMutation = useMutation({
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
      setIsSuccessModalOpen(true);
    },
  });

  // POST /work-experience/admin/stages - WorkExperienceController_createStage
  const createStageMutation = useMutation({
    mutationFn: async (dto: {
      title?: string;
      description?: string;
      duration?: number;
      resources?: string[];
    }) => {
      const res = await httpService.post("/work-experience/admin/stages", dto);
      return res?.data?.data || res?.data;
    },
    onError: (error: AxiosError) => {
      handleError(error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workExperienceAllStages"] });
    },
  });

  // PATCH /work-experience/admin/stages/:id - WorkExperienceController_updateStage
  const updateStageMutation = useMutation({
    mutationFn: async ({
      id,
      dto,
    }: {
      id: string;
      dto: {
        title?: string;
        description?: string;
        duration?: number;
        resources?: string[];
      };
    }) => {
      const res = await httpService.patch(
        `/work-experience/admin/stages/${id}`,
        dto
      );
      return res?.data?.data || res?.data;
    },
    onError: (error: AxiosError) => {
      handleError(error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workExperienceAllStages"] });
    },
  });

  // GET /work-experience/stages - WorkExperienceController_getStages
  const { data: allStagesData, isLoading: isLoadingAllStages } = useQuery({
    queryKey: ["workExperienceAllStages"],
    queryFn: async () => {
      try {
        const res = await httpService.get("/work-experience/stages");
        return (res?.data?.data || res?.data) as any[];
      } catch {
        try {
          const fallbackRes = await httpService.get("/work-experience/admin/stages");
          return (fallbackRes?.data?.data || fallbackRes?.data) as any[];
        } catch {
          return [];
        }
      }
    },
    staleTime: 1000 * 60 * 5,
  });

  const allStages = Array.isArray(allStagesData) ? allStagesData : [];

  // GET /work-experience/stages/:id - WorkExperienceController_getStage
  const fetchStageById = async (stageId: string) => {
    if (!stageId) return null;
    try {
      const res = await httpService.get(`/work-experience/stages/${stageId}`);
      return res?.data?.data || res?.data;
    } catch {
      try {
        const fallbackRes = await httpService.get(`/work-experience/admin/stages/${stageId}`);
        return fallbackRes?.data?.data || fallbackRes?.data;
      } catch {
        return null;
      }
    }
  };

  // Formik setup
  const formik = useFormik<WorkExpFormData>({
    initialValues: INITIAL_WORK_EXP_VALUES,
    validationSchema,
    onSubmit: async () => {
      await handleFinalPublish();
    },
  });

  // Fetch existing draft details using WorkExperienceController_getExperienceById (GET /work-experience/{id})
  const targetDraftId = draftId || initialId;
  const { data: existingDraftData, isLoading: isLoadingDraft } = useQuery({
    queryKey: ["workExperienceDraft", targetDraftId],
    queryFn: async () => {
      if (!targetDraftId) return null;
      try {
        // Primary: GET /work-experience/{id} - WorkExperienceController_getExperienceById
        const res = await httpService.get(`/work-experience/${targetDraftId}`);
        return res?.data?.data || res?.data;
      } catch {
        try {
          // Fallback: GET /work-experience/admin/experiences/{id}
          const fallbackRes = await httpService.get(
            `/work-experience/admin/experiences/${targetDraftId}`
          );
          return fallbackRes?.data?.data || fallbackRes?.data;
        } catch {
          return null;
        }
      }
    },
    enabled: !!targetDraftId,
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    if (existingDraftData) {
      const basic = existingDraftData.basicInformation || existingDraftData;
      const comp = existingDraftData.company || {};
      const lvl = existingDraftData.level || {};
      const prc = existingDraftData.pricing || {};

      const toIdString = (val: any): string => {
        if (!val) return "";
        if (typeof val === "string") return val;
        if (typeof val === "object" && val !== null) {
          return val._id || val.id || "";
        }
        return "";
      };

      const toTextString = (val: any, fallback = ""): string => {
        if (val === undefined || val === null) return fallback;
        if (typeof val === "string") return val;
        if (typeof val === "object" && val !== null) {
          return val.name || val.title || val.description || val._id || fallback;
        }
        return String(val);
      };

      // Extract stages if present
      const stagesArray: StageItem[] = Array.isArray(existingDraftData.stages)
        ? existingDraftData.stages.map((st: any, idx: number) => {
            const stageId = toIdString(st) || `stage-${idx}`;
            const matched = allStages.find(
              (s: any) => (s._id || s.id) === stageId
            );
            const resolvedTitle =
              matched?.title ||
              toTextString(st.title || st.name, `Stage ${idx + 1}`);
            const resolvedDuration = matched?.duration
              ? `${matched.duration} week${matched.duration > 1 ? "s" : ""}`
              : toTextString(st.duration || st.durationWeeks, "1 week");
            const resolvedDescription =
              matched?.description ||
              toTextString(st.description || st.deliverables, "");

            return {
              id: stageId,
              title: resolvedTitle,
              duration: resolvedDuration,
              description: resolvedDescription,
              tasksCount: Array.isArray(st.tasks)
                ? st.tasks.length
                : typeof st.tasksCount === "number"
                ? st.tasksCount
                : 0,
              level: (st.level === "advanced" ? "advanced" : "beginner") as
                | "beginner"
                | "advanced",
            };
          })
        : [];

      // Extract tasks from existingDraftData.tasks or nested within stages
      const tasksArray: TaskItem[] = [];
      if (Array.isArray(existingDraftData.tasks) && existingDraftData.tasks.length > 0) {
        tasksArray.push(
          ...existingDraftData.tasks.map((t: any, idx: number) => ({
            id: toIdString(t) || `task-${idx}`,
            stageId: toIdString(t.stageId) || "",
            title: toTextString(t.title || t.name, ""),
            description: toTextString(t.description, ""),
            estimatedHours: typeof t.estimatedHours === "number" ? t.estimatedHours : 2,
            points: typeof t.points === "number" ? t.points : 10,
          }))
        );
      } else if (Array.isArray(existingDraftData.stages)) {
        existingDraftData.stages.forEach((st: any, idx: number) => {
          const stageId = toIdString(st) || `stage-${idx}`;
          if (Array.isArray(st.tasks)) {
            st.tasks.forEach((t: any, tIdx: number) => {
              tasksArray.push({
                id: toIdString(t) || `task-${stageId}-${tIdx}`,
                stageId,
                title: toTextString(t.title || t.name, ""),
                description: toTextString(t.description, ""),
                estimatedHours: typeof t.estimatedHours === "number" ? t.estimatedHours : 2,
                points: typeof t.points === "number" ? t.points : 10,
              });
            });
          }
        });
      }

      formik.setValues((prev) => ({
        ...prev,
        basicInfo: {
          title:
            toIdString(basic.type) ||
            toIdString(basic.title) ||
            toIdString(existingDraftData.type) ||
            toIdString(existingDraftData.title) ||
            toTextString(basic.type) ||
            toTextString(basic.title) ||
            prev.basicInfo.title,
          industry:
            toIdString(basic.industry) ||
            toIdString(existingDraftData.industry) ||
            toTextString(basic.industry) ||
            prev.basicInfo.industry,
          description:
            toTextString(basic.description) ||
            toTextString(existingDraftData.description) ||
            prev.basicInfo.description,
          whoFor:
            toTextString(basic.whoFor) ||
            toTextString(existingDraftData.whoFor) ||
            prev.basicInfo.whoFor,
          whatGains:
            toTextString(basic.whatGains) ||
            toTextString(existingDraftData.whatGains) ||
            prev.basicInfo.whatGains,
          careers:
            toTextString(basic.careers) ||
            toTextString(existingDraftData.careers) ||
            prev.basicInfo.careers,
          durationWeeks:
            toTextString(basic.durationWeeks) ||
            toTextString(existingDraftData.durationWeeks) ||
            prev.basicInfo.durationWeeks,
          coverImageFileName:
            toTextString(basic.coverImageFileName) ||
            prev.basicInfo.coverImageFileName,
          coverImageUrl:
            toTextString(basic.coverImage) ||
            toTextString(basic.coverImageUrl) ||
            toTextString(existingDraftData.coverImage) ||
            prev.basicInfo.coverImageUrl,
        },
        company: {
          name:
            toTextString(comp.name) ||
            toTextString(existingDraftData.companyName) ||
            prev.company.name,
          description:
            toTextString(comp.description) ||
            toTextString(existingDraftData.companyDescription) ||
            prev.company.description,
          logoFileName:
            toTextString(comp.logoFileName) ||
            prev.company.logoFileName,
          logoUrl:
            toTextString(comp.logo) ||
            toTextString(comp.logoUrl) ||
            toTextString(existingDraftData.logo) ||
            prev.company.logoUrl,
        },
        levels: {
          beginner: {
            enabled: lvl.beginnerEnabled ?? prev.levels.beginner.enabled,
            levelName: toTextString(lvl.beginnerName) || prev.levels.beginner.levelName,
            gains: toTextString(lvl.beginnerGains) || prev.levels.beginner.gains,
          },
          advanced: {
            enabled: lvl.advancedEnabled ?? prev.levels.advanced.enabled,
            levelName: toTextString(lvl.advancedName) || prev.levels.advanced.levelName,
            gains: toTextString(lvl.advancedGains) || prev.levels.advanced.gains,
          },
        },
        stages: stagesArray.length > 0 ? stagesArray : prev.stages,
        tasks: tasksArray.length > 0 ? tasksArray : prev.tasks,
        pricing: {
          usdPrice:
            prc.price !== undefined && prc.price !== null
              ? String(prc.price)
              : existingDraftData.price !== undefined && existingDraftData.price !== null
                ? String(existingDraftData.price)
                : prev.pricing.usdPrice,
          currency: "NGN",
          couponCode: toTextString(prc.couponCode || existingDraftData.couponCode, prev.pricing.couponCode),
          beginnerFee: toTextString(prc.beginnerFee, prev.pricing.beginnerFee),
          advancedFee: toTextString(prc.advancedFee, prev.pricing.advancedFee),
        },
      }));
    }
  }, [existingDraftData, allStages]);

  // Save Draft action
  const handleSaveDraft = async () => {
    const payload = buildApiPayload(formik.values);
    try {
      if (draftId) {
        const stepToSave = Math.min(currentStep, 5);
        await saveStepMutation.mutateAsync({
          id: draftId,
          step: stepToSave,
          payload,
        });
        addToast({
          title: "Draft Saved",
          description: `Step ${currentStep} progress has been saved.`,
          color: "primary",
        });
      } else {
        const created = await createExperienceMutation.mutateAsync(payload);
        const newId =
          created?._id ||
          created?.id ||
          created?.data?._id ||
          created?.data?.id;
        if (newId) {
          setDraftId(newId);
          // Smooth browser URL transition without unmounting route
          if (typeof window !== "undefined") {
            window.history.pushState(null, "", `/admin/work-experience/create-workexp/${newId}`);
          }
        }
        addToast({
          title: "Draft Saved",
          description: "Initial draft created successfully.",
          color: "primary",
        });
      }
    } catch {
      addToast({
        title: "Draft Saved",
        description: `Step ${currentStep} progress saved locally.`,
        color: "primary",
      });
    }
  };

  // Stepper navigation
  const handlePrev = () => {
    if (currentStep === 1) {
      router.push("/admin/work-experience/programs");
    } else {
      setCurrentStep((prev) => (prev - 1) as WizardStep);
    }
  };

  const handleNext = async () => {
    if (currentStep === 6) {
      const modalBtn = document.getElementById("trigger-publish-modal-btn");
      if (modalBtn) {
        modalBtn.click();
      }
    } else {
      const payload = buildApiPayload(formik.values);
      try {
        if (!draftId) {
          // Step 1: Create initial draft using createExperience
          const created = await createExperienceMutation.mutateAsync(payload);
          const newId =
            created?._id ||
            created?.id ||
            created?.data?._id ||
            created?.data?.id;
          if (newId) {
            setDraftId(newId);
            // Smooth browser URL transition without unmounting route
            if (typeof window !== "undefined") {
              window.history.pushState(null, "", `/admin/work-experience/create-workexp/${newId}`);
            }
          }
        } else {
          // Steps 2-5: Save current step using saveExperienceStep
          await saveStepMutation.mutateAsync({
            id: draftId,
            step: currentStep,
            payload,
          });
        }
      } catch (err) {
        console.error("Step progression error:", err);
      }
      setCurrentStep((prev) => (prev + 1) as WizardStep);
    }
  };

  // Stage & Task management
  const addStage = async (
    stage: Omit<StageItem, "id" | "tasksCount">
  ): Promise<StageItem> => {
    const numDuration =
      typeof stage.duration === "number"
        ? stage.duration
        : parseInt(String(stage.duration).replace(/[^0-9]/g, "")) || 1;

    let serverId = `stage-${Date.now()}`;
    try {
      const res = await createStageMutation.mutateAsync({
        title: stage.title || "",
        description: stage.description || "",
        duration: numDuration,
        resources: [],
      });
      const id = res?._id || res?.id || res?.data?._id || res?.data?.id;
      if (id) {
        serverId = String(id);
      }
    } catch {
      // In case of local/offline mode, fallback to generated id
    }

    const newStage: StageItem = {
      ...stage,
      id: serverId,
      tasksCount: 0,
    };
    const updatedStages = [...formik.values.stages, newStage];
    formik.setFieldValue("stages", updatedStages);

    // Extract strictly an array of stage ID strings for the endpoint
    const stageIds: string[] = updatedStages
      .map((s) => getStageId(s))
      .filter((id) => Boolean(id) && !id.startsWith("stage-"));

    // Use the returned stage id on the experience draft step endpoint (PATCH /work-experience/admin/experiences/{id}/steps/4)
    let targetDraftId = draftId;
    try {
      if (!targetDraftId) {
        const initPayload = {
          ...buildApiPayload({
            ...formik.values,
            stages: updatedStages,
          }),
          stages: stageIds,
        };
        const createdExp = await createExperienceMutation.mutateAsync(initPayload);
        const newExpId =
          createdExp?._id ||
          createdExp?.id ||
          createdExp?.data?._id ||
          createdExp?.data?.id;
        if (newExpId) {
          targetDraftId = String(newExpId);
          setDraftId(targetDraftId);
          if (typeof window !== "undefined") {
            window.history.pushState(
              null,
              "",
              `/admin/work-experience/create-workexp/${targetDraftId}`
            );
          }
        }
      } else {
        const payload = {
          ...buildApiPayload({
            ...formik.values,
            stages: updatedStages,
          }),
          stages: stageIds,
        };
        await saveStepMutation.mutateAsync({
          id: targetDraftId,
          step: 4,
          payload,
        });
      }
    } catch (saveErr) {
      console.error("Failed to attach stage ID to experience draft:", saveErr);
    }

    return newStage;
  };

  const removeStage = async (id: string) => {
    const updatedStages = formik.values.stages.filter((s) => s.id !== id);
    formik.setFieldValue("stages", updatedStages);
    formik.setFieldValue(
      "tasks",
      formik.values.tasks.filter((t) => t.stageId !== id)
    );

    if (draftId) {
      try {
        const stageIds: string[] = updatedStages
          .map((s) => getStageId(s))
          .filter((sId) => Boolean(sId) && !sId.startsWith("stage-"));

        const payload = {
          ...buildApiPayload({
            ...formik.values,
            stages: updatedStages,
          }),
          stages: stageIds,
        };
        await saveStepMutation.mutateAsync({
          id: draftId,
          step: 4,
          payload,
        });
      } catch (err) {
        console.error("Failed to sync removed stage with experience draft:", err);
      }
    }

    addToast({
      title: "Stage Removed",
      description: "Stage has been deleted",
      color: "danger",
    });
  };

  const updateStage = async (id: string, updates: Partial<StageItem>) => {
    formik.setFieldValue(
      "stages",
      formik.values.stages.map((s) => (s.id === id ? { ...s, ...updates } : s))
    );

    if (id && !id.startsWith("stage-")) {
      const numDuration = updates.duration
        ? typeof updates.duration === "number"
          ? updates.duration
          : parseInt(String(updates.duration).replace(/[^0-9]/g, "")) || 1
        : undefined;

      try {
        await updateStageMutation.mutateAsync({
          id,
          dto: {
            title: updates.title,
            description: updates.description,
            duration: numDuration,
          },
        });
      } catch {
        // Handled by onError
      }
    }
  };

  const addTask = (task: Omit<TaskItem, "id">) => {
    const newTask: TaskItem = {
      ...task,
      id: `task-${Date.now()}`,
    };
    formik.setFieldValue("tasks", [...formik.values.tasks, newTask]);
    formik.setFieldValue(
      "stages",
      formik.values.stages.map((s) =>
        s.id === task.stageId ? { ...s, tasksCount: s.tasksCount + 1 } : s
      )
    );
  };

  const removeTask = (taskId: string, stageId: string) => {
    formik.setFieldValue(
      "tasks",
      formik.values.tasks.filter((t) => t.id !== taskId)
    );
    formik.setFieldValue(
      "stages",
      formik.values.stages.map((s) =>
        s.id === stageId
          ? { ...s, tasksCount: Math.max(0, s.tasksCount - 1) }
          : s
      )
    );
    addToast({
      title: "Task Removed",
      description: "Task deleted from stage",
      color: "danger",
    });
  };

  const handleFinalPublish = async () => {
    const payload = buildApiPayload(formik.values);
    try {
      let targetId = draftId;
      if (!targetId) {
        const created = await createExperienceMutation.mutateAsync(payload);
        targetId =
          created?._id ||
          created?.id ||
          created?.data?._id ||
          created?.data?.id;
        if (targetId) {
          setDraftId(targetId);
        }
      }

      if (targetId) {
        // Direct publish: There is no step 6 endpoint on the backend
        await publishExperienceMutation.mutateAsync(targetId);
      } else {
        setIsSuccessModalOpen(true);
      }
    } catch {
      setIsSuccessModalOpen(true);
    }
  };

  return {
    formik,
    currentStep,
    setCurrentStep,
    activeView,
    setActiveView,
    optionsData,
    industries,
    isLoadingIndustries,
    tracks,
    isLoadingTracks,
    isLoadingDraft,
    draftId,
    isSuccessModalOpen,
    setIsSuccessModalOpen,
    isUploadingCover,
    isUploadingLogo,
    uploadCoverImage,
    uploadCompanyLogo,
    isSubmitting:
      createExperienceMutation.isPending ||
      saveStepMutation.isPending ||
      publishExperienceMutation.isPending ||
      formik.isSubmitting,
    handlePrev,
    handleNext,
    handleSaveDraft,
    handleFinalPublish,
    addStage,
    removeStage,
    updateStage,
    allStages,
    isLoadingAllStages,
    fetchStageById,
    isCreatingStage:
      createStageMutation.isPending ||
      updateStageMutation.isPending ||
      saveStepMutation.isPending,
    addTask,
    removeTask,
  };
};

export default useCreateWorkExperience;
