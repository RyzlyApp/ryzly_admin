"use client"
import { CustomMarker, CustomStatus } from "@/components/custom";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/react";
import { IChallenge, ITask } from "@/helper/model/challenge";
import { dateFormat } from "@/helper/utils/dateFormat";
import { useFetchData } from "@/hook/useFetchData";
import { LoadingLayout } from "@/components/shared";
import { useParams, useRouter } from "next/navigation";

export default function Task(
    { item }: { item: IChallenge }
) {

    const param = useParams();
    const id = param.id;

    const router = useRouter()

    const { data = [], isLoading } = useFetchData<ITask[]>({
        endpoint: "/task", name: "tasks", params: {
            challengeID: item?._id
        }
    })

    const handleClick = (item: ITask) => {
        router.push(`/admin/challenges/${id}/tasks/${item?._id}`);
    };

    return (
        <div className=" w-full flex flex-col p-4 gap-4" >
            <LoadingLayout loading={isLoading} >
                <Table aria-label="Example static collection table">
                    <TableHeader>
                        <TableColumn>Task</TableColumn>
                        <TableColumn>Status</TableColumn>
                        <TableColumn>Due Date</TableColumn>
                        {/* <TableColumn>{isCoach ? "Action" : "Score"}</TableColumn> */}
                    </TableHeader>
                    <TableBody>
                        {data?.map((item, index) => {
                            return (
                                <TableRow
                                    onClick={() =>
                                        handleClick(
                                            item
                                        )
                                    } key={index} >
                                    <TableCell>
                                        <CustomMarker>
                                            {item?.title}
                                        </CustomMarker>
                                    </TableCell>
                                    <TableCell>
                                        <div className=" flex gap-2 items-center " >
                                            {/* {(index === 0 && (new Date() <= new Date(item?.startDate)) || (new Date() >= new Date(item?.endDate)) && !isCoach) && (
                                                <RiLockLine />
                                            )}
                                            {index >= 1  && (
                                                <>
                                                    {(data[index - 1]?.status === "Pending" || ((new Date() >= new Date(item?.startDate)) && (new Date() <= new Date(item?.endDate))) && !isCoach) ? <RiLockLine /> : ""}
                                                </>
                                            )} */}
                                            <CustomStatus status={item?.status} />
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <p className=" text-violet-300 font-medium text-xs " >{dateFormat(item?.endDate)}</p>
                                    </TableCell>
                                    {/* <TableCell>
                                        {!isCoach && (
                                            <p className=" text-violet-300 font-medium text-xs " >{item?.grade + "%"}</p>
                                        )}
                                        {isCoach && (
                                            <div className=" flex gap-3 " >
                                                <button onClick={(e) => clickHandler(e, item?._id, "delete")} >
                                                    <RiDeleteBin6Line className=" text-red-600 " size={"20px"} />
                                                </button>
                                                <button onClick={(e) => clickHandler(e, item?._id, "edit")} >
                                                    <RiEdit2Line className=" text-neonblue-600 " size={"20px"} />
                                                </button>
                                            </div>
                                        )}
                                    </TableCell> */}
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </LoadingLayout>
        </div>
    )
}