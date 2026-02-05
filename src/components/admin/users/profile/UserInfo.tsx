"use client";
import { Avatar, Chip } from "@heroui/react";
import { CustomImage } from "@/components/custom";
import { RiLinkedinFill, RiGlobalLine } from "react-icons/ri";
import { BiCalendarEvent, BiMessage, BiPhone } from "react-icons/bi";
import { HiLocationMarker } from "react-icons/hi";
import { BsDot } from "react-icons/bs";
import { IUser } from "@/helper/model/user";
import { dateFormat } from "@/helper/utils/dateFormat"; 

interface UserInfoProps {
  user: IUser;
}

export default function UserInfo({ user }: UserInfoProps) {
  const defaultUser = {
    bio: "Passionate UI/UX designer crafting intuitive and visually engaging digital experiences. Blending creativity with usability to turn ideas into seamless interfaces that delight and inspire.",
    socialLinks: {
      linkedin: "https://linkedin.com/in/ngozinamani",
      website: "https://ngozinamani.com",
    },
    stats: {
      totalEarnings: "$10K+",
      prizeWon: "$1,000",
      availableBalance: "$8,500",
    },
    skills: [
      "Website Prototyping",
      "User Experience",
      "UX Wireframe",
      "Figma",
      "Adobe XD",
    ],
    challengeStats: {
      joinedAsParticipant: 100,
      joinedAsCoach: 26,
      created: 15,
    },
    communityStats: {
      joined: 100,
      created: 26,
    },
  };

  const userData = { ...user };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
      {/* Profile Header */}
      <div className="">
        <Avatar
          src={userData.profilePicture}
          alt={userData.firstName}
          className="w-24 h-24 mb-4"
        />
        <div className="flex items-center gap-2 mb-2">
          <h2 className="text-xl font-bold text-gray-900">{userData.firstName+" "+userData?.lastName}</h2>
          {userData.isCoach && (
            <Chip color="primary" size="sm" variant="flat">
              Coach
            </Chip>
          )}
        </div>
        <div className="flex">
          <p className="text-xs text-gray-600 font-semibold">
            @{userData.username.toLowerCase().replace(/\s+/g, "")}
          </p>
          <BsDot />
          {/* <p className="text-xs text-gray-600">{userData.role}</p> */}
        </div>
      </div>

      {/* Bio */}
      <div>
        <p className="text-sm text-gray-700 leading-relaxed">{userData.about}</p>
      </div>
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>
            <HiLocationMarker />
          </span>
          <span>{userData.country}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>
            <BiMessage />
          </span>
          <span>{userData.email}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>
            <BiPhone />
          </span>
          <span>{userData.phone}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>
            <BiCalendarEvent />
          </span>
          <span>Joined {dateFormat(userData?.createdAt)}</span>
        </div>
      </div>

      {/* Social Links */}
      <div className="flex items-center gap-3">
        {userData.LinkedinUsername && (
          <a
            href={userData.LinkedinUsername}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-blue-600 transition-colors"
          >
            <RiLinkedinFill size={20} />
          </a>
        )}
        {/* {userData. && (
          <a
            href={userData.socialLinks.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-blue-600 transition-colors"
          >
            <RiGlobalLine size={20} />
          </a>
        )} */}
      </div>

      {/* Financial Summary */}
      <div className="border-y border-gray-300 py-3">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">
          Financial Summary
        </h3>
        <div className="grid grid-cols-3 gap-2">
          <div>
            <p className="text-sm font-semibold text-gray-900">
              {/* {userData.sta} */}
              0
            </p>
            <p className="text-xs text-gray-600">Total earnings</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">
              {/* {userData.stats?.prizeWon} */}
              0
            </p>
            <p className="text-xs text-gray-600">Prize won</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">
              {/* {userData.stats?.availableBalance} */}
              0
            </p>
            <p className="text-xs text-gray-600">Available balance</p>
          </div>
        </div>
      </div>

      {/* Skills */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Skills</h3>
        <div className="flex flex-wrap gap-2">
          {userData.skills?.map((skill, index) => (
            <Chip key={index} size="sm" variant="flat" className="text-xs">
              {skill}
            </Chip>
          ))}
        </div>
      </div>

      {/* Challenge Stats */}
      <div className="border-t border-gray-300 py-5">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Challenges</h3>
        <div className="">
          <div className="flex justify-between">
            <p className="text-xs text-gray-600">Joined as participants</p>
            <p className="text-sm text-gray-900">
              {/* {userData.challengeStats?.joinedAsParticipant} */}
              0
            </p>
          </div>
          <div className="flex justify-between">
            <p className="text-xs text-gray-600">Joined as coach</p>
            <p className="text-sm text-gray-900">
              {/* {userData.challengeStats?.joinedAsCoach} */}
              0
            </p>
          </div>
          <div className="flex justify-between">
            <p className="text-xs text-gray-600">Created</p>
            <p className="text-sm text-gray-900">
              {/* {userData.challengeStats?.created} */}
              0
            </p>
          </div>
        </div>
      </div>

      {/* Community Stats */}
      <div className="border-t border-gray-300 py-5">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">
          Communities
        </h3>
        <div className="">
          <div className="flex justify-between">
            <p className="text-xs text-gray-600">Joined</p>
            <p className="text-sm font-semibold text-gray-900">
              {/* {userData.communityStats?.joined} */}
              0
            </p>
          </div>
          <div className="flex justify-between">
            <p className="text-xs text-gray-600">Created</p>
            <p className="text-sm font-semibold text-gray-900">
              {/* {userData.communityStats?.created} */}
              0
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
