"use client";
import { useState } from "react";
import CustomButton from "@/components/custom/customButton";
import { BsArrowLeft } from "react-icons/bs";
import UserInfo from "./UserInfo";
import ActivityTabs from "./ActivityTabs";
import { useParams } from "next/navigation";
import { IUser } from "@/helper/model/user";

interface User {
  id: string;
  name: string;
  role: string;
  email: string;
  location: string;
  joinedOn: string;
  status: "Active" | "Banned";
  avatar: string;
  isCoach?: boolean;
  bio?: string;
  socialLinks?: {
    linkedin?: string;
    website?: string;
  };
  stats?: {
    totalEarnings: string;
    prizeWon: string;
    availableBalance: string;
  };
  skills?: string[];
  challengeStats?: {
    joinedAsParticipant: number;
    joinedAsCoach: number;
    created: number;
  };
  communityStats?: {
    joined: number;
    created: number;
  };
}

interface UserProfileProps {  
  user: IUser;
  // onBack: () => void;
}

export default function UserProfile({ user }: UserProfileProps) {

  return (
    <div className="">
      <div className="">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <UserInfo user={user} />
          </div>
          <div className="lg:col-span-2">
            <ActivityTabs userId={user._id} />
          </div>
        </div>
      </div>
    </div>
  );
}
