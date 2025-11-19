import { IApplicationDetail } from "@/helper/model/application";
import { dateFormat } from "@/helper/utils/dateFormat";
import useApproval from "@/hook/useApproval";
import { useFetchData } from "@/hook/useFetchData";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, Avatar } from "@heroui/react";
import { useEffect, useState } from "react";
import { CustomButton } from "../custom";
import { IPagination } from "@/helper/model/pagination";
import { LoadingLayout } from "../shared";


export default function CoachApproval() {

    const [id, setId] = useState("")
    const [status, setStatus] = useState("")

    const [coachData, setCoachData] = useState<IApplicationDetail[]>([])
    const [page, setPage] = useState(1)

    const { data, isLoading } = useFetchData<IPagination<IApplicationDetail[]>>({
        name: "application", endpoint: "/application/admin", pagination: true, params: {
            limit: 10,
            page: page
        }
    });

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

    useEffect(() => {
        if (Array.isArray(data?.data) && data?.data.length > 0) {
            setCoachData(data.data as unknown as IApplicationDetail[]);
        } else {
            setCoachData([]);
        }
    }, [data?.data, isLoading]); 
 
    return (
        <LoadingLayout loading={isLoading} lenght={data?.data?.length} >

            <div className=" w-full flex flex-col gap-6 items-center " >
                <Table aria-label="Example static collection table">
                    <TableHeader>
                        <TableColumn>NAME</TableColumn>
                        <TableColumn>Years Of Experience</TableColumn>
                        <TableColumn>Expertise</TableColumn>
                        <TableColumn>FocusArea</TableColumn>
                        <TableColumn>Date</TableColumn>
                        <TableColumn>Status</TableColumn>
                        <TableColumn>Action</TableColumn>
                    </TableHeader>
                    <TableBody>
                        {coachData.map((request) => (
                            <TableRow
                                key={request._id}
                                className="border-b border-gray-100 hover:bg-gray-50"
                            >
                                <TableCell className="py-4 px-6">
                                    <div className="flex items-center gap-3">
                                        <div className=" w-fit " >
                                            <Avatar
                                                className="w-8 h-8 text-xs"
                                                name={request.user?.fullName}
                                                src={request?.user?.profilePicture}
                                                color="primary"
                                            />
                                        </div>
                                        <span className="text-xs w-40 font-medium text-gray-900">
                                            {request?.user?.fullName}
                                        </span>
                                    </div>
                                </TableCell>
                                <TableCell className="py-4 px-6 text-sm text-gray-900">
                                    {request?.yearsOfExperience}
                                </TableCell>
                                <TableCell className="py-4 px-6 text-sm text-gray-900">
                                    {request?.expertise}
                                </TableCell>
                                <TableCell className="py-4 px-4 text-sm text-gray-900">
                                    {request?.focusArea}
                                </TableCell>
                                <TableCell className="py-4 px-6 text-sm text-gray-900">
                                    {dateFormat(request.createdAt)}
                                </TableCell>
                                <TableCell className="py-4 px-6">
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
                                </TableCell>
                                <TableCell className="py-4 px-6">
                                    {request.status === "PENDING" ? (
                                        <div className=" flex gap-3 items-center " >
                                            <CustomButton
                                                variant="primary"
                                                size="sm"
                                                height="32px"
                                                fontSize="12px"
                                                isLoading={loading && request?._id === id && status === "APPROVED"}
                                                onClick={() => handleClick(request?._id, "APPROVED")}
                                            >
                                                Approve
                                            </CustomButton>
                                            <CustomButton
                                                variant="customDanger"
                                                size="sm"
                                                height="32px"
                                                fontSize="12px"
                                                isLoading={loading && request?._id === id && status === "DECLINED"}
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
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <Pagination showControls initialPage={page} total={Math.ceil(Number(data?.total))}
                    onChange={(page) => setPage(page)} />
            </div>
        </LoadingLayout>
    )
}