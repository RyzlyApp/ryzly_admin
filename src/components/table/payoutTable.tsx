"use client"
import { useFetchData } from "@/hook/useFetchData";
import { Pagination, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/react";
import { LoadingLayout } from "../shared";
import { IPagination } from "@/helper/model/pagination";
import { IPayout } from "@/helper/model/payout";
import { useEffect, useState } from "react";
import { formatNumber } from "@/helper/utils/numberFormat";
import { dateFormat } from "@/helper/utils/dateFormat";
import { CustomButton } from "../custom";
import useApproval from "@/hook/useApproval";

export default function PayoutTable() {

    const [id, setId] = useState("")
    const [status, setStatus] = useState("")
    const [payoutData, setPayoutData] = useState<IPayout[]>([])
    const [page, setPage] = useState(1)

    const { approvePayoutMutation, isLoading: loading } = useApproval()

    const { data, isLoading } = useFetchData<IPagination<IPayout>>({ name: "application", endpoint: "/payout/admin" });


    useEffect(() => {
        if (Array.isArray(data?.items) && data?.items.length > 0) {
            setPayoutData(data.items as unknown as IPayout[]);
        } else {
            setPayoutData([]);
        }
    }, [data?.data, isLoading]);

    const handleClick = (item: string, status: "pending" | "approved" | "declined") => {
        setId(item)
        approvePayoutMutation.mutate({
            id: item,
            payload: {
                status: status
            }
        })
    }

    return (
        <LoadingLayout loading={isLoading} lenght={data?.items?.length} >
            <div className="w-full flex flex-col gap-6 items-center">
                <Table aria-label="Example static collection table">
                    <TableHeader>
                        <TableColumn>NAME</TableColumn> 
                        <TableColumn>Amount Requested</TableColumn>
                        <TableColumn>Date</TableColumn>
                        <TableColumn>STATUS</TableColumn>
                        <TableColumn>Action</TableColumn>
                    </TableHeader>
                    <TableBody>
                        {payoutData?.map((item, index) => {
                            return (
                                <TableRow key={index}>
                                    <TableCell>{item?.userId}</TableCell> 
                                    <TableCell>{formatNumber(item?.amount)}</TableCell>
                                    <TableCell>{dateFormat(item?.createdAt)}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <div
                                                className={`w-2 h-2 rounded-full ${item.status === "pending"
                                                    ? "bg-gray-400" :
                                                    item?.status === "declined" ?
                                                        " bg-red-500 "
                                                        : "bg-green-500"
                                                    }`}
                                            ></div>
                                            <span className="text-sm text-gray-600">
                                                {item.status}
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        {item.status === "pending" && (

                                            <div className=" flex gap-3 items-center " >
                                                <CustomButton
                                                    variant="primary"
                                                    size="sm"
                                                    height="32px"
                                                    fontSize="12px"
                                                    isLoading={loading && item?._id === id && status === "approved"}
                                                    onClick={() => handleClick(item?._id, "approved")}
                                                >
                                                    Approve
                                                </CustomButton>
                                                <CustomButton
                                                    variant="customDanger"
                                                    size="sm"
                                                    height="32px"
                                                    fontSize="12px"
                                                    isLoading={loading && item?._id === id && status === "declined"}
                                                    onClick={() => handleClick(item?._id, "declined")}
                                                >
                                                    Reject
                                                </CustomButton>
                                            </div>
                                        )}
                                        {item?.status !== "pending" && (
                                            <span className={` text-sm ${item?.status === "declined" ? " text-red-600  " : " text-green-600 "}font-medium `}>
                                                {item?.status === "declined" ?
                                                    "Rejected" : "Approved"
                                                }
                                            </span>
                                        )}
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
                <Pagination showControls initialPage={page} total={Math.ceil(Number(data?.total))}
                    onChange={(page) => setPage(page)} />
            </div>
        </LoadingLayout>
    )
}