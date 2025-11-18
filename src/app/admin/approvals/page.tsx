"use client";
import { lazy, Suspense } from "react";
import ApprovalsTabs from "@/components/admin/approvals/ApprovalsTabs";
// import PayoutRequestsTable from "@/components/admin/approvals/PayoutRequestsTable";
// import ApprovalsTablePagination from "@/components/admin/approvals/ApprovalsTablePagination";
// import CoachApplicationTable from "@/components/admin/approvals/CoachApplicationTable";
// import ChallengeTable from "@/components/admin/approvals/ChallengeTable";
import { useSearchParams } from "next/navigation";

// interface ApprovalRequest {
//   id: string;
//   name: string;
//   availableBalance: string;
//   amountRequested: string;
//   date: string;
//   status: "Pending" | "Approved";
//   avatar: string;
// }


export default function AdminApprovals() {

  const query = useSearchParams();
  const tab = query?.get('tab') as string;

  const tabs = [
    { id: "payout", label: "Payout Request" },
    { id: "coach", label: "Coach Application" },
    { id: "challenge", label: "Challenge Application" },
  ];

  const CoachApproval = lazy(() => import("@/components/table").then(module => ({ default: module.CoachApproval })));
  const ChallengeApproval = lazy(() => import("@/components/table").then(module => ({ default: module.ChallengeApproval })));
  const PayoutTable = lazy(() => import("@/components/table").then(module => ({ default: module.PayoutTable })));

  return (
    <Suspense fallback={<div className="p-4 text-center">Loading...</div>}>
      <div className="bg-white rounded-lg shadow-sm">
        <ApprovalsTabs
          tabs={tabs}
          activeTab={tab}
        />

        <div className="p-6">
          {tab === "payout" && (
            <PayoutTable />
          )}

          {tab === "coach" && (
            <CoachApproval />
          )}

          {tab === "challenge" && (
            <ChallengeApproval />
          )}
        </div>
      </div>
    </Suspense>
  );
}
