"use client";

import { useRouter } from "next/navigation";

interface Tab {
  id: string;
  label: string;
}

interface ApprovalsTabsProps {
  tabs: Tab[];
  activeTab: string; 
}

export default function ApprovalsTabs({
  tabs,
  activeTab, 
}: ApprovalsTabsProps) {

  const router = useRouter()

  const handleClick = (item: string) => { 
      router.push(`/admin/approvals?tab=${item}`) 
  }

  return (
    <div className="border-b border-gray-200">
      <nav className="flex space-x-8 px-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={()=> handleClick(tab?.id)}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === tab.id
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
}
