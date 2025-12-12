import { IChallenge } from "@/helper/model/challenge"; 
import { useFetchData } from "@/hook/useFetchData";
import { Avatar, Pagination, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/react";
import { useEffect, useState } from "react";
import { CustomImage } from "../custom";
import { IPagination } from "@/helper/model/pagination";
import { LoadingLayout, RenderParticipant } from "../shared";
import { useRouter } from "next/navigation";

export default function ChallengesTable() {

    const router = useRouter()

    const [challengeData, setChallengeData] = useState<IChallenge[]>([])
    const [page, setPage] = useState(1)

    const { data, isLoading } = useFetchData<IPagination<IChallenge[]>>({
        name: "challenge", endpoint: "/challenge/status", pagination: true,
        params: {
            limit: 10,
            page: page
        }
    });


    useEffect(() => {
        if (Array.isArray(data?.data) && data?.data.length > 0) {
            setChallengeData(data.data as unknown as IChallenge[]);
        } else {
            setChallengeData([]);
        }
    }, [data?.data, isLoading]);

    return (
        <LoadingLayout loading={isLoading} lenght={data?.data?.length} >
            <div className=" w-full flex flex-col gap-6 items-center " >
                <Table aria-label="Example static collection table">
                    <TableHeader>
                        <TableColumn>Title</TableColumn>
                        <TableColumn>Host</TableColumn>
                        <TableColumn>Status</TableColumn>
                        <TableColumn>Action</TableColumn>
                    </TableHeader>
                    <TableBody>
                        {challengeData?.map((item) => (
                            <TableRow
                                key={item._id}
                                className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer "
                                onClick={()=> router.push(`/admin/challenges/${item?._id}`)}
                            >
                                <TableCell className="py-4 px-6">
                                    <div className="flex items-center gap-3">
                                        <div className=" w-fit " >
                                            <CustomImage src={item?.url} alt={item?.title} width={40} height={40} style={{ borderRadius: "8px" }} />
                                        </div>
                                        <span className="text-sm font-medium text-left text-gray-900">
                                            {item?.title}
                                        </span>
                                    </div>
                                </TableCell>
                                <TableCell className="py-4 px-6 text-sm text-gray-900">
                                    <div className=" flex items-center gap-2 " >
                                        <div className=" w-fit " >
                                            <Avatar
                                                className="w-8 h-8 text-xs"
                                                src={item?.creator?.profilePicture}
                                                name={item?.creator?.firstName}
                                            />
                                        </div>
                                        <p className=" text-sm font-medium text-left " >{item?.creator?.firstName} {item?.creator?.lastName}</p>
                                    </div>
                                </TableCell>
                                <TableCell className="py-4 px-6 text-sm text-gray-900">
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
                                </TableCell>
                                <TableCell>
                                    <RenderParticipant maxDisplay={4} participants={item.participants} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <Pagination showControls initialPage={page} total={Number(data?.total)}
                    onChange={(page) => setPage(page)} />
            </div>
        </LoadingLayout>
    )
}