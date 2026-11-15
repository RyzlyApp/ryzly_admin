export type ProgramIconType = "design" | "analytics" | "marketing" | "management";

export type ProgramLevel = "Beginner" | "Intermediate" | "Advanced";

export type ProgramStatus = "Published" | "Draft";

export interface IWorkExperienceProgram {
  id: string;
  title: string;
  subtitle?: string;
  iconType: ProgramIconType;
  industries: string[];
  extraIndustriesCount?: number;
  levels: ProgramLevel[];
  participants: number;
  status: ProgramStatus;
  lastUpdated: string;
}

export const INITIAL_WORK_EXPERIENCE_PROGRAMS: IWorkExperienceProgram[] = [
  {
    id: "1",
    title: "Product Design",
    subtitle: "Work Experience",
    iconType: "design",
    industries: ["Technology", "Fintech"],
    extraIndustriesCount: 2,
    levels: ["Beginner", "Advanced"],
    participants: 342,
    status: "Published",
    lastUpdated: "Oct 10, 2026",
  },
  {
    id: "2",
    title: "Data Analytics",
    subtitle: "Work Experience",
    iconType: "analytics",
    industries: ["Technology", "Fintech"],
    extraIndustriesCount: 2,
    levels: ["Beginner", "Advanced"],
    participants: 342,
    status: "Published",
    lastUpdated: "Oct 10, 2026",
  },
  {
    id: "3",
    title: "Digital Marketing",
    subtitle: "Work Experience",
    iconType: "marketing",
    industries: ["Technology", "Fintech"],
    extraIndustriesCount: 2,
    levels: ["Beginner", "Advanced"],
    participants: 342,
    status: "Draft",
    lastUpdated: "Oct 10, 2026",
  },
  {
    id: "4",
    title: "Product Management",
    subtitle: "Work Experience",
    iconType: "management",
    industries: ["Technology", "Fintech"],
    extraIndustriesCount: 2,
    levels: ["Beginner", "Advanced"],
    participants: 342,
    status: "Draft",
    lastUpdated: "Oct 10, 2026",
  },
];
