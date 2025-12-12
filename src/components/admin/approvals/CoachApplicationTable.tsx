
import { Avatar } from "@heroui/react";
import CustomButton from "@/components/custom/customButton";
import { useFetchData } from "@/hook/useFetchData"; 
import { dateFormat } from "@/helper/utils/dateFormat";
import { LoadingLayout } from "@/components/shared";
import useApproval from "@/hook/useApproval";
import { useState } from "react";
import { IApplicationDetail } from "@/helper/model/application";

interface ApprovalRequest {
    id: string;
    name: string;
    availableBalance: string;
    amountRequested: string;
    date: string;
    status: "Pending" | "Approved";
    avatar: string;
}

interface CoachApplicationTableProps {
    requests: ApprovalRequest[];
}

export default function CoachApplicationTable({
    requests,
}: CoachApplicationTableProps) {

    const [id, setId] = useState("")
    const [status, setStatus] = useState("")

    const { data = [], isLoading } = useFetchData<IApplicationDetail[]>({ name: "application", endpoint: "/application/admin" });

    const { isLoading: loading, approveCoachMutation } = useApproval()

    const handleClick = (item: string, status: "APPROVED" | "DECLINED") => {

        setId(item)
        setStatus(status)

        approveCoachMutation.mutate({
            id: item,
            payload: {
                status: status
            }
        })
    }

    return (
        <LoadingLayout loading={isLoading} >
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">
                                Name
                            </th>
                            <th className="text-left py-3 px-6 text-sm font-medium text-gray-600" >
                                Years Of Experience
                            </th>
                            <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">
                                Expertise
                            </th>
                            <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">
                                FocusArea
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
                        {data?.map((request) => (
                            <tr
                                key={request._id}
                                className="border-b border-gray-100 hover:bg-gray-50"
                            >
                                <td className="py-4 px-6">
                                    <div className="flex items-center gap-3">
                                        <div className=" w-fit " >
                                            <Avatar
                                                className="w-8 h-8 text-xs"
                                                name={request.user?.firstName}
                                                src={request?.user?.profilePicture}
                                                color="primary"
                                            />
                                        </div>
                                        <span className="text-xs w-40 font-medium text-gray-900">
                                            {request?.user?.firstName} {request?.user?.lastName}
                                        </span>
                                    </div>
                                </td>
                                <td className="py-4 px-6 text-sm text-gray-900">
                                    {request?.yearsOfExperience}
                                </td>
                                <td className="py-4 px-6 text-sm text-gray-900">
                                    {request?.expertise}
                                </td>
                                <td className="py-4 px-4 text-sm text-gray-900">
                                    {request?.focusArea}
                                </td>
                                <td className="py-4 px-6 text-sm text-gray-900">
                                    {dateFormat(request.createdAt)}
                                </td>
                                <td className="py-4 px-6">
                                    <div className="flex items-center gap-2">
                                        <div
                                            className={`w-2 h-2 rounded-full ${request.status === "PENDING"
                                                ? "bg-gray-400" :
                                                request?.status === "DECLINED" ?
                                                " bg-red-500 "
                                                : "bg-green-500"
                                                }`}
                                        ></div>
                                        <span className="text-sm text-gray-600">
                                            {request.status}
                                        </span>
                                    </div>
                                </td>
                                <td className="py-4 px-6">
                                    {request.status === "PENDING" ? (
                                        <div className=" flex gap-3 items-center " >
                                            <CustomButton
                                                variant="primary"
                                                size="sm"
                                                height="32px"
                                                fontSize="12px"
                                                isLoading={loading && request?._id === id && status === "approve"}
                                                onClick={() => handleClick(request?._id, "APPROVED")}
                                            >
                                                Approve
                                            </CustomButton>
                                            <CustomButton
                                                variant="customDanger"
                                                size="sm"
                                                height="32px"
                                                fontSize="12px"
                                                isLoading={loading && request?._id === id && status === "reject"}
                                                onClick={() => handleClick(request?._id, "DECLINED")}
                                            >
                                                Reject
                                            </CustomButton>
                                        </div>
                                    ) : (
                                        <span className={` text-sm ${request?.status === "DECLINED" ? " text-red-600  " : " text-green-600 "}font-medium `}>
                                            {request?.status === "DECLINED" ? 
                                                "Rejected" : "Approved"
                                            }
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
