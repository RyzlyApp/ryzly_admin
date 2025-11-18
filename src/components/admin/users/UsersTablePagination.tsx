import useUsers from "@/hook/useUsers";
import { useUser } from "@heroui/react";
import React from "react";

const UsersTablePagination = () => {
  const { total, limit, setOffset, offset, isLoading, users } = useUsers();

  const pageCount = limit > 0 ? Math.ceil((total ?? 0) / limit) : 0;
  const currentPage = limit > 0 ? Math.ceil(offset / limit) : 1;
  const hidePrev = offset === 1;
  const hideNext = ((users?.length ?? 0) >= (total ?? 0)) || (limit > 0 && offset + limit > (total ?? 0));


  if (isLoading) {
    return null;
  } else if (total < 1 ) {
    return null;
  } else {
     return (
    <div className="p-6 border-t border-gray-200">
      <div className="flex items-center">
        <div className="flex items-center justify-between w-full gap-2">
          {!hidePrev && (
            <button
              className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900"
              onClick={() => setOffset(Math.max(1, offset - 1))}
            >
              ← Previous
            </button>
          )}
          <div className="flex items-center gap-1">
            {Array.from({ length: pageCount }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                className={`px-3 py-1 text-sm rounded ${page === offset? "bg-[#EEF0FF] text-[#5160E7]" : "text-gray-600 hover:text-gray-900"}`}
                onClick={() => setOffset(page)}
              >
                {page}
              </button>
            ))}
          </div>
          {!hideNext && (
            <button
              className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900"
              onClick={() => setOffset(offset + 1)}
            >
              Next →
            </button>
          )}
        </div>
      </div>
    </div>
  );
  }

 
};

export default UsersTablePagination;
