"use client";
import React, { useState } from "react";
import StatCard, { StatCardProps } from "@/components/admin/users/StatCard";
import UsersTableHeader from "@/components/admin/users/UsersTableHeader";
import UsersTable from "@/components/admin/users/UsersTable";
import UsersTablePagination from "@/components/admin/users/UsersTablePagination";
import UserProfile from "@/components/admin/users/profile/UserProfile";
import { TbUsers } from "react-icons/tb";
import { RiOrganizationChart } from "react-icons/ri";
import { BsFileText } from "react-icons/bs";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import httpService from "@/helper/services/httpService";
import useUsers from "@/hook/useUsers";

export default function AdminUsers() {
  const { filter, setFilter } = useUsers();
  const [statsDetails, setStatsDetails] = useState({
    totalCoaches: 0,
    totalPendingApplications: 0,
    totalUsers: 0,
  });

  // get analytics
  const getAnalytics = async () => {
    const response = await httpService.get("/admin-analytics");
    setStatsDetails(response.data?.data);
  };

  React.useEffect(() => {
    getAnalytics();
  }, []);

  const stats: StatCardProps[] = React.useMemo(() => {
    return [
  {
    icon: <TbUsers />,
    iconBgColor: "bg-[#EEF0FF]",
    iconTextColor: "text-[#596AFE]",
    value: statsDetails?.totalUsers?.toString(),
    label: "Total Users",
    trend: "2.5%",
    trendDirection: "down",
    trendColor: "text-red-600",
    footerText: "From last month",
  },
  {
    icon: <RiOrganizationChart />,
    iconBgColor: "bg-[#ECF5CA99]",
    iconTextColor: "text-[#8A9E3C]",
    value: "0",
    label: "Organizations",
    trend: "0%",
    trendDirection: "up",
    trendColor: "text-green-600",
    footerText: "From last month",
  },
  {
    icon: <LiaChalkboardTeacherSolid />,
    iconBgColor: "bg-[#EEF0FF]",
    iconTextColor: "text-[#596AFE]",
    value: statsDetails?.totalCoaches?.toString(),
    label: "Coaches",
    trend: "3.5%",
    trendDirection: "up",
    trendColor: "text-green-600",
    footerText: "From last month",
  },
  {
    icon: <BsFileText />,
    iconBgColor: "bg-[#FFF1EE]",
    iconTextColor: "text-[#FC7753]",
    value: statsDetails?.totalPendingApplications?.toString(),
    label: "Pending Coach Applications",
    trend: "",
    trendDirection: "up",
    trendColor: "text-green-600",
    footerText: "",
  },
];
  }, [statsDetails]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => <StatCard key={index} {...stat} />)}
      </div>
      <div className="bg-white rounded-lg shadow-sm p-4">
        <UsersTableHeader sortBy={filter} setSortBy={(e) => setFilter(e)} />
        <UsersTable />
        {/* <UsersTablePagination /> */}
      </div>
    </div>
  );
}
