"use client";
import { CustomImage } from "@/components/custom";
import { ChallengeCard, LoadingLayout } from "@/components/shared";
import { IChallenge } from "@/helper/model/challenge";
import { useFetchData } from "@/hook/useFetchData";

interface Certificate {
  id: string;
  title: string;
  image: string;
  date: string;
}

interface CertificatesTabProps {
  userId: string;
} 

export default function ChallengeTab({ userId }: CertificatesTabProps) {
  
  const { data, isLoading } = useFetchData<IChallenge[]>({
    endpoint: "/challenge/status", name: "challenge", params: {
        userId: userId as string,
        asCoach: "coach",
        isApproved: "true",
    }
  })


  return (
    <div className=" w-full flex justify-center " >
      <LoadingLayout loading={isLoading} lenght={data?.length} >
        <div className="grid lg:grid-cols-2 gap-5">
          {data?.map((item, index) => {
            return (
              <ChallengeCard data={item} key={index} />
            )
          })}
        </div>
      </LoadingLayout>
    </div>
  );
}
