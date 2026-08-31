"use client";
import { RiCashLine, RiFocus2Line } from "react-icons/ri";
import MetricsCard from "@/components/adminlayout/MetricsCard";
import PayoutRequestTable from "@/components/adminlayout/PayoutRequestTable";
import RecentChallenges from "@/components/adminlayout/RecentChallenges";
import NewSignups from "@/components/adminlayout/NewSignups";
import PendingCoachApplications from "@/components/adminlayout/PendingCoachApplications";
import { TbLocation, TbUsers } from "react-icons/tb";
import { useFetchData } from "@/hook/useFetchData";

interface OverviewStats {
  totalChallenges: number;
  totalCoachChallenges: number;
  totalOrgChallenges: number;
  totalChallengeFeeAll: number;
  totalPlatformFees: number;
  totalWinnerPayoutsTalents: number;
  totalPayoutsCoaches: number;
}

export default function AdminDashboard() {
  const { data, isLoading } = useFetchData<OverviewStats>({
    name: "overview",
    endpoint: "/analytics/admin/overview",
  });

  const formatCurrency = (val: number | undefined) => {
    if (isLoading) return "...";
    if (val === undefined) return "₦0.00";
    return `₦${val.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const formatNumber = (val: number | undefined) => {
    if (isLoading) return "...";
    if (val === undefined) return "0";
    return val.toLocaleString();
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Existing Card 1 */}
        <MetricsCard
          icon={<RiCashLine />}
          value={formatCurrency(data?.totalWinnerPayoutsTalents)}
          label="Total Prizes Won"
          iconColor="text-[#596AFE]"
          iconBg="bg-[#EEF0FF]"
        />
        {/* Existing Card 2 */}
        <MetricsCard
          icon={<TbLocation />}
          value={formatCurrency(data?.totalPayoutsCoaches)}
          label="Coach Payouts"
          iconColor="text-[#8A9E3C]"
          iconBg="bg-[#ECF5CA99]"
        />
        {/* Existing Card 3 */}
        <MetricsCard
          icon={<TbUsers />}
          value="1,280"
          label="Total Users"
          iconColor="text-[#596AFE]"
          iconBg="bg-[#EEF0FF]"
        />
        {/* Existing Card 4 */}
        <MetricsCard
          icon={<RiFocus2Line />}
          value={formatNumber(data?.totalChallenges)}
          label="Total Challenges"
          iconColor="text-red-600"
          iconBg="bg-red-100"
        />

        {/* New Card 5 */}
        <MetricsCard
          icon={<RiCashLine />}
          value={formatCurrency(data?.totalChallengeFeeAll)}
          label="Total Challenge Fees"
          iconColor="text-[#596AFE]"
          iconBg="bg-[#EEF0FF]"
        />
        {/* New Card 6 */}
        <MetricsCard
          icon={<RiCashLine />}
          value={formatCurrency(data?.totalPlatformFees)}
          label="Total Platform Fees"
          iconColor="text-[#8A9E3C]"
          iconBg="bg-[#ECF5CA99]"
        />
        {/* New Card 7 */}
        <MetricsCard
          icon={<RiFocus2Line />}
          value={formatNumber(data?.totalCoachChallenges)}
          label="Coach Challenges"
          iconColor="text-[#596AFE]"
          iconBg="bg-[#EEF0FF]"
        />
        {/* New Card 8 */}
        <MetricsCard
          icon={<RiFocus2Line />}
          value={formatNumber(data?.totalOrgChallenges)}
          label="Org Challenges"
          iconColor="text-orange-600"
          iconBg="bg-orange-100"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 lg:grid-rows-2 gap-6">
        <PayoutRequestTable />
        <RecentChallenges />
        <NewSignups />
        <PendingCoachApplications />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6"></div>
    </div>
  );
}
