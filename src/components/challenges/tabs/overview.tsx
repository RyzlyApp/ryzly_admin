"use client"
import { LoadingLayout } from "@/components/shared";
import UserCard from "@/components/shared/userCard"; 
import { IChallenge, IOverview } from "@/helper/model/challenge";
import { useFetchData } from "@/hook/useFetchData"; 
import { RiCheckFill } from "react-icons/ri";

export default function Overview(
    { item }: { item: IChallenge }
) {



    const { data, isLoading } = useFetchData<IOverview>({
        endpoint: `/overview/${item?.overview}`, name: "overview"
    });


    const OverviewCard = ({ item }: { item: string, name: "includes" | "requirements" | "whoIs", index: number }) => {

        return (
            <div className=" w-full justify-between gap-4 items-center flex " >
                <div className=" flex gap-2 items-center " >
                    <div className=" w-fit " >
                        <RiCheckFill size={"20px"} />
                    </div>
                    <p className=" text-violet-300 text-xs font-medium " >{item}</p>
                </div>
            </div>
        )
    }

    return (
        <LoadingLayout loading={isLoading} >
            <div className=" w-full flex flex-col p-4 gap-4 " >
                <div className=" w-full flex flex-col p-4 gap-3 bg-gray-100 rounded-2xl " >
                    <p className=" font-semibold text-sm " >About host</p>
                    <UserCard item={item?.creator} />
                </div>
                <div className=" w-full flex flex-col py-2 gap-2 " >
                    <div className=" flex justify-between items-center w-full"  >
                        <p className=" font-semibold text-sm " >This challenge includes</p>
                    </div>
                    <div className=" w-full flex flex-col gap-3 pt-3 " >
                        {data?.includes?.map((item, index) => (
                            <OverviewCard key={index} item={item} name="includes" index={index} />
                        ))}
                    </div>
                </div>
                <div className=" w-full flex flex-col py-2 gap-2 " >
                    <div className=" flex justify-between items-center w-full "  >
                        <p className=" font-semibold text-sm " >Requirements</p>
                    </div>
                    <div className=" w-full flex flex-col gap-3 pt-3 " >
                        {data?.requirements?.map((item, index) => (
                            <OverviewCard key={index} item={item} name="requirements" index={index} />
                        ))}
                    </div>
                </div>
                <div className=" w-full flex flex-col py-2 gap-2 " >
                    <div className=" flex justify-between items-center w-full "  >
                        <p className=" font-semibold text-sm " >Who is this challenge for</p>
                    </div>
                    <div className=" w-full flex flex-col gap-3 pt-3 " >
                        {data?.whoIs?.map((item, index) => (
                            <OverviewCard key={index} item={item} name="whoIs" index={index} />
                        ))}
                    </div>
                </div>
            </div>
        </LoadingLayout>

    )
}   