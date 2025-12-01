import { Avatar } from "@heroui/react";
import CustomButton from "@/components/custom/customButton";
import { useFetchData } from "@/hook/useFetchData";
import { LoadingLayout } from "@/components/shared";

interface ApprovalRequest {
  id: string;
  name: string;
  availableBalance: string;
  amountRequested: string;
  date: string;
  status: "Pending" | "Approved";
  avatar: string;
}

interface PayoutRequestsTableProps {
  requests: ApprovalRequest[];
}

export default function PayoutRequestsTable({
  requests,
}: PayoutRequestsTableProps) {

  const { data, isLoading } = useFetchData<any>({ name: "application", endpoint: "/payout/admin" }); 

  return (
    <LoadingLayout loading={isLoading} lenght={data?.items?.length} > 
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">
                Name
              </th>
              <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">
                Available Balance
              </th>
              <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">
                Amount Requested
              </th>
              <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">
                Date
              </th>
              <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">
                Status
              </th>
              <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.items?.map((request: any) => (
              <tr
                key={request.id}
                className="border-b border-gray-100 hover:bg-gray-50"
              >
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <Avatar
                      className="w-8 h-8 text-xs"
                      name={request?.userId?.firstName}
                      src={request?.userId?.profilePicture}
                      color="primary"
                    />
                    <span className="text-sm font-medium text-gray-900">
                      {request?.userId?.firstName} {request?.userId?.lastName}
                    </span>
                  </div>
                </td>
                <td className="py-4 px-6 text-sm text-gray-900">
                  {request.availableBalance}
                </td>
                <td className="py-4 px-6 text-sm text-gray-900">
                  {request.amountRequested}
                </td>
                <td className="py-4 px-6 text-sm text-gray-900">
                  {request.date}
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-2 h-2 rounded-full ${request.status === "Pending"
                          ? "bg-gray-400"
                          : "bg-green-500"
                        }`}
                    ></div>
                    <span className="text-sm text-gray-600">
                      {request.status}
                    </span>
                  </div>
                </td>
                <td className="py-4 px-6">
                  {request.status === "Pending" ? (
                    <CustomButton
                      variant="primary"
                      size="sm"
                      height="32px"
                      fontSize="12px"
                    >
                      Approve
                    </CustomButton>
                  ) : (
                    <span className="text-sm text-green-600 font-medium">
                      Approved
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </LoadingLayout>
  );
}
