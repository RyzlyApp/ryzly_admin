"use client"
import { CustomSearch } from "@/components/custom";
import UserCard from "@/components/shared/userCard";
import { IChallenge } from "@/helper/model/challenge";

export default function Participant(
    { item }: { item: IChallenge }
) {

    return (
        <div className=" w-full flex flex-col p-4 gap-4" >
            <CustomSearch placeholder="Search participants" />
            <div className=" flex flex-col gap-3 " >
                {item?.participants?.map((item, index) => {
                    return (
                        <div key={index} className=" w-full h-[60px] flex items-center justify-between " >
                            <UserCard item={item} showCoach={false} />
                            {/* <CustomButton height="40px" >Message</CustomButton> */}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}