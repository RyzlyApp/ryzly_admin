"use client"
import ListWork from "../submission/listWork";
import { ITaskDetail } from "@/helper/model/challenge";


export default function Submission(
    { isCoach }: { isCoach?: boolean, item: ITaskDetail }
) {

    return (
        <div className=" h-full flex-1 lg:overflow-y-auto rounded-2xl flex flex-col gap-6 bg-white p-4 " >
            <ListWork />
        </div>
    )
}