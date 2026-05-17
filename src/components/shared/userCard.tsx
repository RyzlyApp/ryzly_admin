"use client"
import { IUser } from "@/helper/model/user";
import { textLimit } from "@/helper/utils/textlimit";
import { Avatar } from "@heroui/react";
import { useRouter } from "next/navigation";


export default function UserCard({ item, showCoach = true }: { item: IUser, showCoach?: boolean }) {
    
    const router = useRouter()

    return (
        <button onClick={()=> router.push(`/dashboard/profile/${item?._id}`)} className=" flex gap-2 items-center " >
            <div className=" w-fit " >
            <Avatar src={item?.profilePicture} name={item?.firstName ? item?.firstName + " " + item?.lastName : item?.fullName} />
            </div>
            <div className=" flex flex-col items-start " >
                <div className=" flex items-center gap-1 " >
                    <p className=" text-sm font-semibold " >{item?.firstName ? textLimit(item?.firstName + " " + item?.lastName, 15) : item?.fullName}</p>
                    {(showCoach && item?.isCoach) && (
                        <div className=" px-2 rounded-full bg-neonblue-600 text-white font-semibold h-[18px] flex justify-center items-center text-xs " >
                            Coach
                        </div>
                    )}
                </div> 
            </div>
        </button>
    )
}