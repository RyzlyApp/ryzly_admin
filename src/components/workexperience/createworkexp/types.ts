export interface StageItem {
  id: string;
  title: string;
  duration: string;
  description: string;
  tasksCount: number;
  level: "beginner" | "advanced";
}

export interface TaskItem {
  id: string;
  stageId: string;
  title: string;
  description: string;
  estimatedHours?: number;
  points?: number;
}

export interface ExperienceLevelConfig {
  enabled: boolean;
  levelName: string;
  gains: string;
}

export interface WorkExpFormData {
  basicInfo: {
    title: string;
    description: string;
    industry: string;
    whoFor: string;
    whatGains: string;
    careers: string;
    coverImageFileName?: string;
    coverImageUrl?: string;
    durationWeeks: string;
  };
  company: {
    name: string;
    description: string;
    logoUrl?: string;
    logoFileName?: string;
  };
  levels: {
    beginner: ExperienceLevelConfig;
    advanced: ExperienceLevelConfig;
  };
  stages: StageItem[];
  tasks: TaskItem[];
  pricing: {
    usdPrice: string;
    currency: string;
    couponCode: string;
    beginnerFee: string;
    advancedFee: string;
  };
}

export type WizardStep = 1 | 2 | 3 | 4 | 5 | 6;

export type ActiveView = "wizard" | "tasks";
