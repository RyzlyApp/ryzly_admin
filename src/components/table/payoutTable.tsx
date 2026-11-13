"use client"
import { useFetchData } from "@/hook/useFetchData";
import { InputOtp, Pagination, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/react";
import { LoadingLayout, ModalLayout } from "../shared";
import { IPagination } from "@/helper/model/pagination";
import { IPayout } from "@/helper/model/payout";
import { useEffect, useState, useMemo } from "react";
import { formatNumber } from "@/helper/utils/numberFormat";
import { dateFormat } from "@/helper/utils/dateFormat";
import { CustomButton } from "../custom";
import useApproval from "@/hook/useApproval";
import { IUser } from "@/helper/model/user";
import ApprovalsTableHeader from "../admin/approvals/ApprovalsTableHeader";

export default function PayoutTable() {

    const [id, setId] = useState("")
    const [status, setStatus] = useState("")
    const [searchTerm, setSearchTerm] = useState("")
    const [payoutData, setPayoutData] = useState<IPayout[]>([])
    const [page, setPage] = useState(1)

    const { approvePayoutMutation, isLoading: loading, formik, verifyPayoutMutation, open, setIsOpen } = useApproval()

    const { data, isLoading } = useFetchData<IPagination<IPayout>>({
        name: "payout", endpoint: "/payout/admin", params: {
            limit: 10,
            page: page
        }
    });


    useEffect(() => {
        if (Array.isArray(data?.items) && data?.items.length > 0) {
            setPayoutData(data.items as unknown as IPayout[]);
        } else {
            setPayoutData([]);
        }
    }, [data, isLoading]);

    const handleClick = (item: string, status: "pending" | "approved" | "declined") => {
        setId(item)
        setStatus(status)
        approvePayoutMutation.mutate({
            id: item,
            payload: {
                status: status
            }
        })
    }

    console.log(formik.values);

    const getName = (user: IUser | undefined) => {
        if (!user) {
            return "NIL"
        }
        if (user?.firstName && user?.lastName) {
            return user?.firstName + " " + user?.lastName
        }
        return user?.fullName;
    }

    const filteredPayoutData = useMemo(() => {
        if (!searchTerm.trim()) return payoutData;
        const term = searchTerm.toLowerCase().trim();
        return payoutData.filter((item) => {
            const name = (getName(item?.user) || "").toLowerCase();
            const amount = formatNumber(item?.amount).toLowerCase();
            const rawAmount = String(item?.amount || "").toLowerCase();
            const date = dateFormat(item?.createdAt).toLowerCase();
            const itemStatus = (item?.status || "").toLowerCase();

            return (
                name.includes(term) ||
                amount.includes(term) ||
                rawAmount.includes(term) ||
                date.includes(term) ||
                itemStatus.includes(term)
            );
        });
    }, [payoutData, searchTerm]);

    return (
        <LoadingLayout loading={isLoading} lenght={filteredPayoutData.length} >
            <div className="w-full flex flex-col gap-6 items-center">
                <ApprovalsTableHeader
                    title="Payout Requests"
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    placeholder="Search by name, amount, or status..."
                    count={filteredPayoutData.length}
                />
                <Table aria-label="Example static collection table">
                    <TableHeader>
                        <TableColumn>NAME</TableColumn>
                        <TableColumn>Amount Requested</TableColumn>
                        <TableColumn>Date</TableColumn>
                        <TableColumn>STATUS</TableColumn>
                        <TableColumn>Action</TableColumn>
                    </TableHeader>
                    <TableBody>
                        {filteredPayoutData?.map((item, index) => {
                            return (
                                <TableRow key={index}>
                                    <TableCell>{getName(item?.user)}</TableCell>
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
                <Pagination showControls initialPage={page} total={Math.ceil(Number(data?.total) / 10)}
                    onChange={(page) => setPage(page)} />

                <ModalLayout isOpen={open} onClose={() => setIsOpen(false)}>
                    <div className=" w-full flex flex-col gap-3 items-center " >
                        <p className=" text-sm font-medium text-center " >Enter the OTP sent to your email</p>
                        <InputOtp
                            length={6}
                            onValueChange={(value) => formik.setFieldValue("otp", value)}
                        />
                        <CustomButton
                            variant="primary"
                            size="sm"
                            height="32px"
                            fontSize="12px"
                            fullWidth
                            isLoading={verifyPayoutMutation.isPending}
                            onClick={() => formik.handleSubmit()}
                        >
                            Verify
                        </CustomButton>
                    </div>
                </ModalLayout>
            </div>
        </LoadingLayout>
    )
}