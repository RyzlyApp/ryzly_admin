
import { Avatar } from "@heroui/react";
import CustomButton from "@/components/custom/customButton";
import { useFetchData } from "@/hook/useFetchData";
import { dateFormatMonthDay } from "@/helper/utils/dateFormat";
import { LoadingLayout } from "@/components/shared";
import useApproval from "@/hook/useApproval";
import { useState } from "react";
import { IChallenge } from "@/helper/model/challenge";
import { CustomImage } from "@/components/custom";

interface ApprovalRequest {
    id: string;
    name: string;
    availableBalance: string;
    amountRequested: string;
    date: string;
    status: "Pending" | "Approved";
    avatar: string;
}

export default function ChallengeTable() {

    const [id, setId] = useState("")
    const [status, setStatus] = useState("")

    const { data = [], isLoading } = useFetchData<IChallenge[]>({ name: "challenge", endpoint: "/challenge/status" });

    const { isLoading: loading, challengeApprovalMutation, challengeRejectMutation } = useApproval()

    const handleClick = (item: string, status: "approve" | "reject") => {

        setId(item)
        setStatus(status)

        if(status === "approve") {
            challengeApprovalMutation.mutate({
                challengeID: item
            })
        } else if(status === "reject") {
            challengeRejectMutation.mutate({
                challengeID: item
            })
        }

    }

    return (
        <LoadingLayout loading={isLoading} >
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">
                                Title
                            </th>
                            <th className="text-left py-3 px-6 text-sm font-medium text-gray-600" >
                                Host
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
                        {data?.map((item) => (
                            <tr
                                key={item._id}
                                className="border-b border-gray-100 hover:bg-gray-50"
                            >
                                <td className="py-4 px-6">
                                    <div className="flex items-center gap-3">
                                        <div className=" w-fit " >
                                            <CustomImage src={item?.url} alt={item?.title} width={40} height={40} style={{ borderRadius: "8px" }} />
                                        </div>
                                        <span className="text-sm font-medium text-left text-gray-900">
                                            {item?.title}
                                        </span>
                                    </div>
                                </td>
                                <td className="py-4 px-6 text-sm text-gray-900">
                                    <div className=" flex items-center gap-2 " >
                                        <div className=" w-fit " >
                                            <Avatar
                                                className="w-8 h-8 text-xs"
                                                src={item?.creator?.profilePicture}
                                                name={item?.creator?.fullName}
                                            />
                                        </div>
                                        <p className=" text-sm font-medium text-left " >{item?.creator?.fullName}</p>
                                    </div>
                                </td>
                                <td className="py-4 px-6 text-sm text-gray-900">
                                    {dateFormatMonthDay(item?.startDate)}-{dateFormatMonthDay(item?.endDate)}
                                </td>
                                <td className="py-4 px-6 text-sm text-gray-900">
                                    {/* {item?.isPublish + ""} */}

                                    <div className="flex items-center gap-2">
                                        <div
                                            className={`w-2 h-2 rounded-full ${item?.isApproved === undefined
                                                ? "bg-gray-400" :
                                                !item?.isApproved
                                                    ?
                                                    " bg-red-500 "
                                                    : "bg-green-500"
                                                }`}
                                        ></div>
                                        <span className="text-sm text-gray-600">
                                            {item?.isApproved === undefined ? "Pending" : !item?.isApproved ? "Reject" : "Approved"}
                                        </span>
                                    </div>
                                </td>
                                <td className="py-4 px-6">
                                    {/* {request.status === "PENDING" ? ( */}
                                    <div className=" flex gap-3 items-center " >
                                        {(!item?.isApproved || item?.isApproved === undefined) && (
                                            <CustomButton
                                                variant="primary"
                                                size="sm"
                                                height="32px"
                                                fontSize="12px"
                                                isLoading={loading && item?._id === id && status === "approve"}
                                                onClick={() => handleClick(item?._id, "approve")}
                                            >
                                                Approve
                                            </CustomButton>
                                        )}
                                        {(item?.isApproved || item?.isApproved === undefined) && (
                                            <CustomButton
                                                variant="customDanger"
                                                size="sm"
                                                height="32px"
                                                fontSize="12px"
                                                isLoading={loading && item?._id === id && status === "reject"}
                                                onClick={() => handleClick(item?._id, "reject")}
                                            >
                                                Reject
                                            </CustomButton>
                                        )}
                                    </div> 
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </LoadingLayout>
    );
}
