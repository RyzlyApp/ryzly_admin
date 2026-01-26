"use client";
import React, { use, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "@heroui/react";
import { RiArrowLeftLine } from "react-icons/ri";
import httpService from "@/helper/services/httpService";
import UserProfile from "@/components/admin/users/profile/UserProfile";
import CustomButton from "@/components/custom/customButton";
import { IUser } from "@/app/types/User";
import { dateFormat } from "@/helper/utils/dateFormat";

export default function UserDetails() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["get-user-details", id],
    queryFn: () => httpService.get(`/admin-user/${id}`),
    enabled: !!id,
  });

  const userData = data?.data?.data as IUser;

  console.log(`userData`, userData);

  if (isLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center flex-col">
        <Spinner />
        <p className="text-sm text-gray-600 mt-2">Loading user details...</p>
      </div>
    );
  }

  if (isError || !userData) {
    return (
      <div className="w-full h-screen flex justify-center items-center flex-col">
        <p className="text-red-500">Error loading user details</p>
        <CustomButton variant="primary" onClick={() => router.back()}>
          Go Back
        </CustomButton>
      </div>
    );
  }

  const mapUserToProfile = (user: IUser) => {
    return {
      id: user._id,
      name: `${user?.firstName} ${user?.lastName}`,
      role: user.isCoach ? "Product Designer" : "Learner", // Using mock role as API might not have it
      email: user.email,
      location: user.country || "Unknown",
      joinedOn: dateFormat(user.createdAt),
      status: user.isSuspended ? ("Banned" as const) : ("Active" as const),
      avatar: user.profilePicture,
      isCoach: user.isCoach,
      bio: user.about,
      skills: user.skills || [],
      socialLinks: {
        linkedin: user?.LinkedinUsername || "",
        website: "",
      },
      // Pass stats if available in API, otherwise UserInfo uses defaults
    };
  };

  return (
    <div className="w-full h-full p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <RiArrowLeftLine size={24} />
          </button>
          <h1 className="text-xl font-bold text-gray-900">User details</h1>
        </div>
        <div>
          {!userData.isSuspended ? (
            <CustomButton
              variant="customDanger"
              size="sm"
              height="40px"
              fontSize="14px"
            >
              Suspend
            </CustomButton>
          ) : (
            <CustomButton
              variant="primary"
              size="sm"
              height="40px"
              fontSize="14px"
            >
              Unsuspend
            </CustomButton>
          )}
        </div>
      </div>

      <UserProfile
        user={mapUserToProfile(userData)}
        onBack={() => router.back()}
      />
    </div>
  );
}
