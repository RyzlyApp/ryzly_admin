"use client";

import { Tabs, Tab } from "@heroui/react";
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

      <div className="flex flex-wrap gap-4 px-6 pt-4 "> 
          <Tabs
            selectedKey={activeTab}
            onSelectionChange={(key) => handleClick(String(key))}
            aria-label="Tabs variants"
            accessKey={activeTab}
            variant="underlined"
            classNames={{
              tabList: "gap-4",
              tab: "text-gray-600 data-[selected=true]:text-primary ",
              cursor: "bg-primary", // underline color
            }}
          >
            {tabs.map((variant) => (
              <Tab key={variant.id} title={variant.label} />
            ))}
          </Tabs> 
      </div>
    </div>
  );
}
