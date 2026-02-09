"use client";
import { useState } from "react"; 
import ChallengesTab from "./tabs/ChallengesTab";
import Certificates from "./tabs/certificates";
import Badges from "./tabs/badges"; 
import Work from "./tabs/Work";
import { IUser } from "@/helper/model/user";

interface ActivityTabsProps {
  userId: IUser;
}

export default function ActivityTabs({ userId }: ActivityTabsProps) {
  const [activeTab, setActiveTab] = useState("work");

  const tabs = [
    { key: "work", label: "Work" },
    { key: "certificates", label: "Certificates" },
    { key: "badges", label: "Badges" },
    { key: "challenges", label: "Challenges" },
    { key: "payout-request", label: "Payout request" },
    { key: "financial-history", label: "Financial history" },
    { key: "reports", label: "Reports" },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "work":
        return <Work userId={userId._id as string} />;
      case "certificates":
        return <Certificates userId={userId._id as string} />;
      case "badges":
        return <Badges user={userId as IUser} />;
      case "challenges":
        return <ChallengesTab userId={userId._id as string} />;
      // case "payout-request":
      //   return <PayoutRequestTab userId={userId._id as string} />;
      // case "financial-history":
      //   return <FinancialHistoryTab userId={userId} />;
      // case "reports":
      //   return <ReportsTab userId={userId} />;
      // default:
      //   return <WorkTab userId={userId} />;
    }
  };

  return (
    <div className="bg-white rounded-lg">
      <div>
        {tabs.map((tab) => (
          <button
            onClick={() => setActiveTab(tab.key)}
            key={tab.key}
            className={`${
              tab.key === activeTab ? "border-b-2 border-[#596AFE]" : ""
            } py-4 px-4 text-sm`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="p-4">{renderTabContent()}</div>
    </div>
  );
}
