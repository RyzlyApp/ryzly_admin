"use client"
import { CustomSearch } from "@/components/custom";
import UserCard from "@/components/shared/userCard";
import { IChallenge } from "@/helper/model/challenge";
import { RiAddLine } from "react-icons/ri";
import { useState } from "react";
import { ModalLayout } from "@/components/shared";
import Addparticipant from "../modals/addparticipant";
import { addToast, Button, Tooltip } from "@heroui/react";
import { FaTrash } from "react-icons/fa";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handleError } from "@/helper/utils/hanlderAxoisError";
import { AxiosError } from "axios";
import httpService from "@/helper/services/httpService";


export default function Participant(
    { item }: { item: IChallenge }
) {
    const queryClient = useQueryClient();
    const [isOpen, setIsOpen] = useState(false)

    const { mutate } = useMutation({
        mutationFn: (participant: string) =>
            httpService.delete(`/challenge/admin/participants/${item._id}/${participant}`),
        onError: (error: AxiosError) => handleError(error),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['challengedetails', item._id] });
            addToast({
                title: "Success",
                description: "Removed successfully",
                color: "success",
            })
        },
    });

    return (
        <div className=" w-full flex flex-col p-4 gap-4" >
            <CustomSearch placeholder="Search participants" />
            <button onClick={() => setIsOpen(true)} className=" flex items-center gap-3 text-neonblue-600 " >
                <div className=" w-8 h-8 rounded-full flex justify-center items-center bg-neonblue-50 " >
                    <RiAddLine size={"18px"} />
                </div>
                <p className=" text-sm font-medium " >Invite participants</p>
            </button>
            <div className=" flex flex-col gap-3 " >
                {item?.participants?.map((item, index) => {
                    return (
                        <div key={index} className=" w-full h-[60px] flex items-center justify-between" >
                            <div className="flex items-center gap-6">
                                <UserCard item={item} showCoach={false} />
                                <Tooltip key={index} className="capitalize border-0" closeDelay={500} placement="right-start" color={"default"} content={"Remove Participant"} offset={7}>
                                    <Button className="border-none" color={"danger"} variant="light" isIconOnly onPress={() => mutate(item._id)}>
                                        <FaTrash />
                                    </Button>
                                </Tooltip>
                            </div>
                        </div>
                    )
                })}
            </div>
            <ModalLayout title="Add a participant" isOpen={isOpen} onClose={() => setIsOpen(false)} >
                <Addparticipant />
            </ModalLayout>
        </div>
    )
}