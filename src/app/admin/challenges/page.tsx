"use client";
import { useState } from "react";
import ChallengesOverview from "@/components/admin/challenges/ChallengesOverview";
import BestPerformingChallenge from "@/components/admin/challenges/BestPerformingChallenge";
import ChallengesTableHeader from "@/components/admin/challenges/ChallengesTableHeader";  
import ChallengeInfo from "@/components/admin/challenges/ChallengeInfo";
import { ChallengeTable } from "@/components/table";

import { useAtom } from "jotai";
import { challengesStatusFilterAtom, challengesHostTypeFilterAtom, challengesDateRangeFilterAtom } from "@/helper/atom/challenges";

interface Challenge {
  id: string;
  title: string;
  host: string;
  status: "Ongoing" | "Pending" | "Completed" | "Banned";
  date: string;
  participants: number;
  thumbnail: string;
}

const mockChallenges: Challenge[] = [
  {
    id: "1",
    title: "Weather Forecast Widget",
    host: "Ngozi Nnamani",
    status: "Ongoing",
    date: "01 Aug - 25 Aug 2025",
    participants: 114,
    thumbnail: "/images/challenge1.jpg",
  },
  {
    id: "2",
    title: "Redesign a Travel Booking App",
    host: "Obinna Afolayan",
    status: "Pending",
    date: "01 Aug - 25 Aug 2025",
    participants: 89,
    thumbnail: "/images/challenge2.jpg",
  },
  {
    id: "3",
    title: "Weather Forecast Widget",
    host: "Oluwaseyi Okoli",
    status: "Completed",
    date: "01 Aug - 25 Aug 2025",
    participants: 156,
    thumbnail: "/images/challenge3.jpg",
  },
  {
    id: "4",
    title: "Redesign a Travel Booking App",
    host: "Obinna Adeyemi",
    status: "Banned",
    date: "01 Aug - 25 Aug 2025",
    participants: 23,
    thumbnail: "/images/challenge4.jpg",
  },
];

export default function AdminChallenges() {
  const [hostTypeFilter, setHostTypeFilter] = useAtom(challengesHostTypeFilterAtom);
  const [statusFilter, setStatusFilter] = useAtom(challengesStatusFilterAtom);
  const [dateRangeFilter, setDateRangeFilter] = useAtom(challengesDateRangeFilterAtom);
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(
    null
  );

  return (
    <div className="">
      {selectedChallenge ? (
        <ChallengeInfo
          challenge={selectedChallenge}
          onBack={() => setSelectedChallenge(null)}
        />
      ) : (
        <>
          <div className="grid grid-cols-8 gap-4">
            <ChallengesOverview />
            <BestPerformingChallenge />
          </div>

          <div className="bg-white rounded-lg shadow-sm mt-5">
            <ChallengesTableHeader
              coachFilter={hostTypeFilter}
              setCoachFilter={setHostTypeFilter}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              dateRangeFilter={dateRangeFilter}
              setDateRangeFilter={setDateRangeFilter}
            />
            <div className=" w-full p-4 flex flex-col " > 
            <ChallengeTable />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
