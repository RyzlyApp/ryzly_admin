export type SubmissionStatus = "Pending Review" | "Passed" | "Needs Improvement";

export interface ISubmissionRecord {
  id: string;
  submissionTitle: string;
  submissionType: string;
  participantName: string;
  avatar: string;
  taskName: string;
  submittedAt: string;
  status: SubmissionStatus;
  programTitle: string;
  industry: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  email?: string;
}

export interface IUploadedFile {
  id: string;
  name: string;
  size?: string;
  type: string;
  url: string;
}

export interface ISubmissionDetails extends ISubmissionRecord {
  description: string;
  uploadedFiles: IUploadedFile[];
  taskBrief: {
    title: string;
    overview: string;
    whatToDo: string[];
    expectedDeliverable: string;
  };
  feedbackData?: {
    generalFeedback: string;
    outcome: "Passed" | "Needs Improvement";
    whatTheyDidWell: string;
    whatToImprove?: string;
    smallSuggestion?: string;
  };
  assessmentCriteria: string[];
  competenciesToCheck: string[];
  passRequirements: string;
}

export const INITIAL_SUBMISSIONS_METRICS = {
  totalSubmissions: 192,
  pendingReview: 34,
  passed: 126,
  needsImprovement: 32,
};

export const INITIAL_SUBMISSIONS: ISubmissionRecord[] = [
  {
    id: "sub-1",
    submissionTitle: "Research summary",
    submissionType: "Document (PDF)",
    participantName: "Amara Okonkwo",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    taskName: "User research",
    submittedAt: "Oct 29, 2026 10:24 AM",
    status: "Pending Review",
    programTitle: "Product Design",
    industry: "HealthTech",
    level: "Beginner",
    email: "amara.okonkwo@example.com",
  },
  {
    id: "sub-2",
    submissionTitle: "Research summary",
    submissionType: "Document (PDF)",
    participantName: "Daniel Adeyemi",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    taskName: "Marketing plan",
    submittedAt: "Oct 28, 2026 4:07 PM",
    status: "Passed",
    programTitle: "Product Management",
    industry: "HealthTech",
    level: "Advanced",
    email: "daniel.adeyemi@example.com",
  },
  {
    id: "sub-3",
    submissionTitle: "Research summary",
    submissionType: "Document (PDF)",
    participantName: "Tola Benson",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    taskName: "Design solution",
    submittedAt: "Oct 28, 2026 1:56 PM",
    status: "Needs Improvement",
    programTitle: "Digital Marketing",
    industry: "HealthTech",
    level: "Beginner",
    email: "tola.benson@example.com",
  },
  {
    id: "sub-4",
    submissionTitle: "Research summary",
    submissionType: "Document (PDF)",
    participantName: "Chidi Nwosu",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80",
    taskName: "Analysis & insights",
    submittedAt: "Oct 27, 2026 6:40 PM",
    status: "Passed",
    programTitle: "Data Analytics",
    industry: "Technology",
    level: "Advanced",
    email: "chidi.nwosu@example.com",
  },
  {
    id: "sub-5",
    submissionTitle: "Final presentation",
    submissionType: "Video (MP4)",
    participantName: "Ifeoma Eze",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    taskName: "Project presentation",
    submittedAt: "Oct 27, 2026 11:12 AM",
    status: "Pending Review",
    programTitle: "UI Design",
    industry: "EdTech",
    level: "Beginner",
    email: "ifeoma.eze@example.com",
  },
];

export const DEFAULT_SUBMISSION_DETAILS: ISubmissionDetails = {
  ...INITIAL_SUBMISSIONS[0],
  description:
    "I explored two design directions for the product based on the user feedback from the previous task. Option A focuses on a cleaner, more task-focused layout, while Option B introduces a more visual and engaging experience. I recommend Option A because it better supports the core user needs and reduces friction.",
  uploadedFiles: [
    {
      id: "f-1",
      name: "doc.pdf",
      size: "2.4 MB",
      type: "application/pdf",
      url: "#",
    },
    {
      id: "f-2",
      name: "doc.pdf",
      size: "1.8 MB",
      type: "application/pdf",
      url: "#",
    },
  ],
  taskBrief: {
    title: "Explore alternative design options",
    overview:
      "Based on the feedback and insights from the previous task, create 2–3 alternative design directions for the product. Explain the thinking behind each option and how it addresses the user needs and feedback.",
    whatToDo: [
      "Define 2–3 distinct design directions (e.g. layout, flow, or visual style).",
      "Create high-fidelity or mid-fidelity screens for each direction.",
      "Write a short rationale for each option (why it works, trade-offs and risks).",
      "Recommend the direction you think we should move forward with and why.",
    ],
    expectedDeliverable:
      "A design presentation (PDF or Figma link) with your design options, rationale and recommendation.",
  },
  feedbackData: {
    generalFeedback: "This is a test project",
    outcome: "Needs Improvement",
    whatTheyDidWell: "This is a test project",
    whatToImprove: "This is a test project",
    smallSuggestion: "This is a test project",
  },
  assessmentCriteria: [
    "Relevance to the task and objectives",
    "Quality of thinking and approach",
    "Clarity and structure of the output",
  ],
  competenciesToCheck: [
    "Understand the business and product",
    "Analyse user and market needs",
    "Communicate insights clearly",
  ],
  passRequirements:
    "The submission meets all the assessment criteria and shows a clear understanding of the task, with a practical and well-reasoned output.",
};
