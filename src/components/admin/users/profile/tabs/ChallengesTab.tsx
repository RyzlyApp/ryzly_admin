"use client";
import { useState } from "react";
import { Select, SelectItem, Avatar } from "@heroui/react";
import { CustomImage, CustomInput, CustomSelect } from "@/components/custom";
import CustomButton from "@/components/custom/customButton";
import StandaloneSelect from "@/components/admin/StandaloneSelect";
import SearchInput from "@/components/admin/SearchInput";
import { useFetchData } from "@/hook/useFetchData";
import { IChallenge } from "@/helper/model/challenge";
import { ChallengeCard, LoadingLayout } from "@/components/shared";

interface Challenge {
    id: string;
    title: string;
    description: string;
    image: string;
    dateRange: string;
    technologies: string[];
    winningPrice: string;
    participationFee: string;
    participants: {
        avatars: string[];
        count: number;
    };
    host: {
        name: string;
        avatar: string;
    };
    status: "Ongoing" | "Pending" | "Completed";
}

interface ChallengesTabProps {
    userId: string;
}

const mockChallenges: Challenge[] = [
    {
        id: "1",
        title: "Weather Forecast Widget",
        description:
            "Create a beautiful, responsive weather widget with animations and location-based forecasts.",
        image: "/work.jpg",
        dateRange: "01 Aug - 25 Aug 2025",
        technologies: ["HTML", "CSS", "JavaScript"],
        winningPrice: "$200",
        participationFee: "$10",
        participants: {
            avatars: ["/work.jpg", "/work.jpg", "/work.jpg"],
            count: 114,
        },
        host: {
            name: "Ngozi Nnamani",
            avatar: "/work.jpg",
        },
        status: "Ongoing",
    },
    {
        id: "2",
        title: "E-commerce Dashboard",
        description:
            "Build a comprehensive admin dashboard for an online store with analytics, inventory management, and...",
        image: "/work.jpg",
        dateRange: "15 Aug - 30 Aug 2025",
        technologies: ["React", "Node.js", "PostgreSQL"],
        winningPrice: "$500",
        participationFee: "$25",
        participants: {
            avatars: ["/work.jpg", "/work.jpg", "/work.jpg"],
            count: 89,
        },
        host: {
            name: "Ngozi Nnamani",
            avatar: "/work.jpg",
        },
        status: "Pending",
    },
];

export default function ChallengesTab({ userId }: ChallengesTabProps) {
    const [roleFilter, setRoleFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("ongoing");
    const [searchValue, setSearchValue] = useState("");

    const params = new URLSearchParams(); 
    params.append('q', searchValue); 

    const roleOptions = [
        { value: "", label: "As Participant" },
        { value: "coach", label: "As Coach" },
    ];

    const statusOptions = [
        {
            label: "Ongoing",
            value: "ongoing",
        },
        {
            label: "Upcoming",
            value: "pending",
        },
        {
            label: "Completed",
            value: "completed",
        },
        {
            label: "Bookmark",
            value: "bookmark",
        },
    ]; 

    const { data, isLoading } = useFetchData<IChallenge[]>({
        endpoint: searchValue ? `/challenge?${params.toString()}` : statusFilter === "bookmark" ? `/challenge/bookmarks`  : "/challenge/status",
        name: "challenge",
        queryKey: [userId, roleFilter, searchValue, statusFilter],
        params: {
            userId: userId as string,
            asCoach: roleFilter,
            status: statusFilter,
            isApproved: "true",
        },
    });



    return (
        <div>
            {/* Filters */}
            <div className="flex gap-3 mb-6">
                <div className="flex-1">
                    <StandaloneSelect
                        placeholder="Select Role"
                        options={roleOptions}
                        value={roleFilter}
                        onChange={setRoleFilter}
                    />
                </div>

                <div className="flex-2">
                    <SearchInput
                        placeholder="Search challenges"
                        value={searchValue}
                        onChange={setSearchValue}
                    />
                </div>

                <div className="flex-1">
                    <StandaloneSelect
                        placeholder="Select Status"
                        options={statusOptions}
                        value={statusFilter}
                        onChange={setStatusFilter}
                    />
                </div>
            </div>
            <div className=" w-full flex justify-center ">
                <LoadingLayout loading={isLoading} lenght={data?.length}>
                    <div className="grid w-full lg:grid-cols-2 gap-5">
                        {data?.map((item, index) => {
                            return <ChallengeCard data={item} key={index} />;
                        })}
                    </div>
                </LoadingLayout>
            </div>
        </div>
    );
}
