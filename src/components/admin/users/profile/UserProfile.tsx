"use client";
import { useState } from "react";
import CustomButton from "@/components/custom/customButton";
import { BsArrowLeft } from "react-icons/bs";
import UserInfo from "./UserInfo";
import ActivityTabs from "./ActivityTabs";
import { useParams } from "next/navigation";
import { IUser } from "@/helper/model/user"; 

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
            <ActivityTabs userId={user} />
          </div>
        </div>
      </div>
    </div>
  );
}
