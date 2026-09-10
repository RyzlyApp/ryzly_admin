import React from "react";
import { Select, SelectItem } from "@heroui/react";
import { useAtom } from "jotai";
import { searchAtom } from "@/helper/atom/search";
import SearchField from "@/components/custom/customSearch";

interface UsersTableHeaderProps {
  sortBy: string;
  setSortBy: (value: string) => void;
}

const UsersTableHeader: React.FC<UsersTableHeaderProps> = ({
  sortBy,
  setSortBy,
}) => {
  const [q, setQ] = useAtom(searchAtom);

  return (
    <div className="p-6 border-b border-gray-200">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h3 className="text-lg font-bold text-gray-900">Users</h3>
        <div className="flex flex-wrap items-center gap-4">
          <div className="w-64">
            <SearchField
              placeholder="Search users..."
              value={q}
              onChange={(val) => setQ(val)}
              onClear={() => setQ("")}
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 font-medium">Filter by</span>
            <div className="w-48">
              <Select
                aria-label="Filter users"
                selectedKeys={sortBy ? [sortBy] : ["all"]}
                disallowEmptySelection
                onSelectionChange={(keys) => {
                  const val = Array.from(keys)[0] as string;
                  if (val) setSortBy(val);
                }}
                size="sm"
                variant="bordered"
                classNames={{
                  trigger: "bg-white border border-gray-300 rounded-lg h-10 min-h-10 shadow-none",
                  value: "text-sm text-gray-700 font-medium",
                }}
              >
                <SelectItem key="all">All Users</SelectItem>
                <SelectItem key="coach">Coach</SelectItem>
                <SelectItem key="organization">Host/Organisation</SelectItem>
                <SelectItem key="talent">Talents</SelectItem>
              </Select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersTableHeader;
