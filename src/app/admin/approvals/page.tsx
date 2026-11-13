"use client";
import { lazy, Suspense } from "react";
import ApprovalsTabs from "@/components/admin/approvals/ApprovalsTabs"; 
import { useSearchParams } from "next/navigation";


const CoachApproval = lazy(() => import("@/components/table").then(module => ({ default: module.CoachApproval })));
const ChallengeApproval = lazy(() => import("@/components/table").then(module => ({ default: module.ChallengeApproval })));
const PayoutTable = lazy(() => import("@/components/table").then(module => ({ default: module.PayoutTable })));


export default function AdminApprovals() {

  const query = useSearchParams();
  const tab = query?.get('tab') as string;
  const activeTab = tab || "payout";

  const tabs = [
    { id: "payout", label: "Payout Request", index: 0 },
    { id: "coach", label: "Coach Application", index: 1 },
    { id: "challenge", label: "Challenge Application", index: 2 },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <ApprovalsTabs
        tabs={tabs}
        activeTab={activeTab}
      />

      <div className="p-6">
        <Suspense fallback={<div className="p-4 text-center">Loading...</div>}>
          {activeTab === "payout" && (
            <PayoutTable />
          )}

          {activeTab === "coach" && (
            <CoachApproval />
          )}

          {activeTab === "challenge" && (
            <ChallengeApproval />
          )}
        </Suspense>
      </div>
    </div>
  );
}
