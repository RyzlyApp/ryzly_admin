"use client"
import { IChallenge } from "@/helper/model/challenge";
import { IoArrowBackOutline } from "react-icons/io5";
import ChallengeInfo from "./challengeInfo";
import PrizeAndProgress from "./prizeAndProgress";
import { useFetchData } from "@/hook/useFetchData";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Loader } from "../shared";
import { lazy, Suspense, useState } from "react";
import { Tab, Tabs } from "@heroui/react"; 

export default function ChallengeDetailsPage() {


    const param = useParams();
    const id = param.id;

    const router = useRouter()

    const query = useSearchParams();
    const type = query?.get('share');

    const { data, isLoading, isRefetching } = useFetchData<IChallenge>({
        endpoint: `/challenge/single/${id}`, name: "challengedetails"
    })


    // Lazy load tab components
    const OverviewTab = lazy(() => import("@/components/challenges").then(module => ({ default: module.OverviewTab })));
    const ReviewTab = lazy(() => import("@/components/challenges").then(module => ({ default: module.ReviewTab })));
    const TaskTab = lazy(() => import("@/components/challenges").then(module => ({ default: module.TaskTab })));
    const ResourceTab = lazy(() => import("@/components/challenges").then(module => ({ default: module.ResourceTab })));
    const LeaderboardTab = lazy(() => import("@/components/challenges").then(module => ({ default: module.LeaderboardTab })));
    const ParticipantTab = lazy(() => import("@/components/challenges").then(module => ({ default: module.ParticipantTab })));
    const CoachTab = lazy(() => import("@/components/challenges").then(module => ({ default: module.CoachTab })));

    const [tab, setTab] = useState("")

    const tablink = [
        {
            label: "Overview",
            key: ""
        },
        {
            label: "Task",
            key: "task"
        },
        {
            label: "Resources",
            key: "resources"
        },
        {
            label: "Reviews",
            key: "reviews"
        },
        {
            label: "Leaderboard",
            key: "leaderboard"
        },
        {
            label: "Participants",
            key: "participants"
        },
        {
            label: "Coaches",
            key: "coaches"
        },
    ]


    return (
        <div className=" w-full lg:h-full flex flex-col p-4 lg:overflow-hidden " >
            <Loader loading={isLoading} >
                <div className=" w-full flex overflow-hidden gap-4 flex-col lg:overflow-y-auto " >
                    {!type && (
                        <button onClick={() => router.back()} className=" flex items-center gap-4 " >
                            <IoArrowBackOutline />
                            <p className=" font-bold " >Challenge Detail</p>
                        </button>
                    )}
                    <div className=" flex flex-1 lg:h-full flex-col gap-4 overflow-x-hidden  " >
                        <ChallengeInfo refetching={isRefetching} item={data as IChallenge} />
                        <PrizeAndProgress item={data as IChallenge} task={false} />

                        <div className="w-full bg-white rounded-2xl challenge-tabs">
                            <div className=" w-full flex overflow-x-auto " >
                                <Tabs selectedKey={tab ? tab : ""} aria-label="Tabs" variant={"underlined"} >
                                    {tablink?.map((item) => {
                                        return (
                                            <Tab key={item?.key} onClick={() => setTab(item?.key)} title={item?.label} />
                                        )
                                    })}
                                </Tabs>
                            </div>
                            {data && (
                                <Suspense fallback={<div className="p-4 text-center">Loading...</div>}>
                                    {!tab && (
                                        <OverviewTab item={data as IChallenge} />
                                    )}
                                    {tab === "task" && (
                                        <TaskTab item={data as IChallenge} />
                                    )}
                                    {tab === "resources" && (
                                        <ResourceTab item={data as IChallenge} />
                                    )}
                                    {tab === "reviews" && (
                                        <ReviewTab item={data as IChallenge} />
                                    )}
                                    {tab === "leaderboard" && (
                                        <LeaderboardTab item={data as IChallenge} />
                                    )}
                                    {tab === "participants" && (
                                        <ParticipantTab item={data as IChallenge} />
                                    )}
                                    {tab === "coaches" && (
                                        <CoachTab item={data as IChallenge} />
                                    )}
                                </Suspense>
                            )}
                        </div>
                    </div>
                </div>
            </Loader>
        </div>
    )
}