export type CertificateStatus = "Issued" | "Eligible";

export interface ICertificateRecord {
  id: string;
  participantName: string;
  avatar: string;
  programTitle: string;
  organization: string;
  status: CertificateStatus;
  completedOn: string;
  industry: string;
  email?: string;
}

export interface ICertificateMetrics {
  certificatesIssued: number;
  currentEligible: number;
}

export const INITIAL_CERTIFICATES: ICertificateRecord[] = [
  {
    id: "cert-1",
    participantName: "Amara Okonkwo",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    programTitle: "Product Design",
    organization: "NovaHealth",
    status: "Issued",
    completedOn: "Oct 20, 2026",
    industry: "HealthTech",
    email: "amara.okonkwo@example.com",
  },
  {
    id: "cert-2",
    participantName: "Daniel Adeyemi",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    programTitle: "Product Management",
    organization: "Novahealth",
    status: "Eligible",
    completedOn: "Oct 19, 2026",
    industry: "HealthTech",
    email: "daniel.adeyemi@example.com",
  },
  {
    id: "cert-3",
    participantName: "Tola Benson",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    programTitle: "Digital Marketing",
    organization: "Novahealth",
    status: "Issued",
    completedOn: "Oct 18, 2026",
    industry: "HealthTech",
    email: "tola.benson@example.com",
  },
  {
    id: "cert-4",
    participantName: "Chidi Nwosu",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80",
    programTitle: "Data Analytics",
    organization: "Ryzly",
    status: "Eligible",
    completedOn: "Oct 18, 2026",
    industry: "Technology",
    email: "chidi.nwosu@example.com",
  },
  {
    id: "cert-5",
    participantName: "Marcus Lee",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
    programTitle: "UX Research",
    organization: "Innovatech",
    status: "Eligible",
    completedOn: "Nov 5, 2026",
    industry: "Technology",
    email: "marcus.lee@example.com",
  },
  {
    id: "cert-6",
    participantName: "Sofia Patel",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
    programTitle: "Product Management",
    organization: "TechWave",
    status: "Issued",
    completedOn: "Dec 1, 2026",
    industry: "Fintech",
    email: "sofia.patel@example.com",
  },
];
