export type PaymentType = "Certificate" | "Beginner" | "Advanced";

export type PaymentStatus = "Completed" | "Pending" | "Failed";

export interface IPaymentRecord {
  id: string;
  participantName: string;
  avatar: string;
  programTitle: string;
  organization: string;
  paymentType: PaymentType;
  amount: string;
  amountNumeric: number;
  status: PaymentStatus;
  date: string;
  email?: string;
}

export interface IPaymentsSummary {
  totalRevenue: string;
  completedPayments: string;
  pending: string;
  failed: string;
}

export const INITIAL_PAYMENTS: IPaymentRecord[] = [
  {
    id: "pay-1",
    participantName: "Amara Okonkwo",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    programTitle: "Product Design",
    organization: "NovaHealth",
    paymentType: "Certificate",
    amount: "₦5,000",
    amountNumeric: 5000,
    status: "Completed",
    date: "Oct 20, 2026",
    email: "amara.okonkwo@example.com",
  },
  {
    id: "pay-2",
    participantName: "Daniel Adeyemi",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    programTitle: "Product Management",
    organization: "Novahealth",
    paymentType: "Beginner",
    amount: "₦20,000",
    amountNumeric: 20000,
    status: "Pending",
    date: "Oct 19, 2026",
    email: "daniel.adeyemi@example.com",
  },
  {
    id: "pay-3",
    participantName: "Tola Benson",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    programTitle: "Digital Marketing",
    organization: "Novahealth",
    paymentType: "Advanced",
    amount: "₦30,000",
    amountNumeric: 30000,
    status: "Completed",
    date: "Oct 18, 2026",
    email: "tola.benson@example.com",
  },
  {
    id: "pay-4",
    participantName: "Chidi Nwosu",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80",
    programTitle: "Data Analytics",
    organization: "Ryzly",
    paymentType: "Certificate",
    amount: "₦5,000",
    amountNumeric: 5000,
    status: "Failed",
    date: "Oct 18, 2026",
    email: "chidi.nwosu@example.com",
  },
  {
    id: "pay-5",
    participantName: "Marcus Lee",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
    programTitle: "UX Research",
    organization: "Innovatech",
    paymentType: "Advanced",
    amount: "₦30,000",
    amountNumeric: 30000,
    status: "Pending",
    date: "Nov 5, 2026",
    email: "marcus.lee@example.com",
  },
  {
    id: "pay-6",
    participantName: "Sofia Patel",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
    programTitle: "Product Management",
    organization: "TechWave",
    paymentType: "Certificate",
    amount: "₦5,000",
    amountNumeric: 5000,
    status: "Completed",
    date: "Dec 1, 2026",
    email: "sofia.patel@example.com",
  },
];
