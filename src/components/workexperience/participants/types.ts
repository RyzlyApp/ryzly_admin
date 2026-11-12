export type ParticipantLevel = "Beginner" | "Intermediate" | "Advanced";

export interface IParticipantSubmission {
  id: string;
  taskName: string;
  submittedOn: string;
  feedbackStatus: "View feedback" | "Add feedback";
  feedbackComment?: string;
  status: "Passed" | "Needs Improvement" | "Pending";
}

export interface IParticipant {
  id: string;
  name: string;
  avatar: string;
  programTitle: string;
  organization: string;
  level: ParticipantLevel;
  progress: number;
  joinedDate: string;
  industry: string;
  email?: string;
  expectedCompletion?: string;
  tasksCompleted: number;
  tasksPending: number;
  totalTasks: number;
  submissions?: IParticipantSubmission[];
}

export const INITIAL_PARTICIPANTS: IParticipant[] = [
  {
    id: "amara-okonkwo",
    name: "Amara Okonkwo",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    programTitle: "Product Design",
    organization: "NovaHealth",
    level: "Beginner",
    progress: 75,
    joinedDate: "Oct 20, 2026",
    industry: "HealthTech",
    email: "amara.okonkwo@example.com",
    expectedCompletion: "Dec 15, 2026",
    tasksCompleted: 3,
    tasksPending: 1,
    totalTasks: 4,
    submissions: [
      {
        id: "sub-1",
        taskName: "User research plan",
        submittedOn: "Oct 29, 2026, 10:24 AM",
        feedbackStatus: "View feedback",
        feedbackComment: "Excellent research scope and clear problem framing. Methodologies align well with persona goals.",
        status: "Passed",
      },
      {
        id: "sub-2",
        taskName: "Interview insights",
        submittedOn: "Oct 25, 2026, 2:16 PM",
        feedbackStatus: "View feedback",
        feedbackComment: "Good transcription, but synthesize the qualitative patterns further into clear affinity clusters.",
        status: "Needs Improvement",
      },
      {
        id: "sub-3",
        taskName: "Research presentation",
        submittedOn: "Oct 20, 2026, 9:03 AM",
        feedbackStatus: "Add feedback",
        status: "Pending",
      },
    ],
  },
  {
    id: "daniel-adeyemi",
    name: "Daniel Adeyemi",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    programTitle: "Product Management",
    organization: "Novahealth",
    level: "Advanced",
    progress: 58,
    joinedDate: "Oct 19, 2026",
    industry: "HealthTech",
    email: "daniel.adeyemi@example.com",
    expectedCompletion: "Dec 20, 2026",
    tasksCompleted: 2,
    tasksPending: 2,
    totalTasks: 4,
  },
  {
    id: "tola-benson",
    name: "Tola Benson",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    programTitle: "Digital Marketing",
    organization: "Novahealth",
    level: "Beginner",
    progress: 64,
    joinedDate: "Oct 18, 2026",
    industry: "HealthTech",
    email: "tola.benson@example.com",
    expectedCompletion: "Dec 18, 2026",
    tasksCompleted: 2,
    tasksPending: 1,
    totalTasks: 3,
  },
  {
    id: "chidi-nwosu",
    name: "Chidi Nwosu",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80",
    programTitle: "Data Analytics",
    organization: "Ryzly",
    level: "Advanced",
    progress: 90,
    joinedDate: "Oct 18, 2026",
    industry: "Technology",
    email: "chidi.nwosu@example.com",
    expectedCompletion: "Nov 30, 2026",
    tasksCompleted: 4,
    tasksPending: 0,
    totalTasks: 4,
  },
  {
    id: "ifeoma-eze",
    name: "Ifeoma Eze",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    programTitle: "UI Design",
    organization: "Prepfora",
    level: "Beginner",
    progress: 100,
    joinedDate: "Oct 17, 2026",
    industry: "EdTech",
    email: "ifeoma.eze@example.com",
    expectedCompletion: "Nov 15, 2026",
    tasksCompleted: 4,
    tasksPending: 0,
    totalTasks: 4,
  },
  {
    id: "marcus-lee",
    name: "Marcus Lee",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
    programTitle: "UX Research",
    organization: "Innovatech",
    level: "Intermediate",
    progress: 75,
    joinedDate: "Nov 5, 2026",
    industry: "Technology",
    email: "marcus.lee@example.com",
    expectedCompletion: "Jan 10, 2027",
    tasksCompleted: 3,
    tasksPending: 1,
    totalTasks: 4,
  },
  {
    id: "sofia-patel",
    name: "Sofia Patel",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
    programTitle: "Product Management",
    organization: "TechWave",
    level: "Advanced",
    progress: 85,
    joinedDate: "Dec 1, 2026",
    industry: "Fintech",
    email: "sofia.patel@example.com",
    expectedCompletion: "Jan 25, 2027",
    tasksCompleted: 3,
    tasksPending: 1,
    totalTasks: 4,
  },
];
