import { IChallenge } from "@/helper/model/challenge";
import { formatNumber } from "@/helper/utils/numberFormat";
import { CustomButton, CustomImage } from "../custom";
import { LoadingLayout, ModalLayout } from "../shared";
import React, { useState } from "react";
import { dateFormatHeader } from "@/helper/utils/dateFormat";
import { RiTimeFill } from "react-icons/ri";
import { IoAlertCircleOutline, IoCheckbox, IoCheckboxOutline, IoCheckmark, IoCheckmarkCircle } from "react-icons/io5";
import { capitalizeFLetter } from "@/helper/utils/capitalLetter";
import { textLimit } from "@/helper/utils/textlimit";
import useApproval from "@/hook/useApproval";
import { useSearchParams } from "next/navigation";
import { isDateInPast } from "@/helper/utils/isPast";

export default function ChallengeInfo({
  item,
  refetching,
}: {
  item: IChallenge;
  refetching: boolean;
}) {

  const { isLoading: loading, challengeApprovalMutation, challengeRejectMutation, open, show, setIsOpen, setIsShow, coachPaymentMutation } = useApproval()

  const query = useSearchParams();
  const approve = query?.get('approve') as string;

  const handleClick = (status: "approve" | "reject") => {

    if (status === "approve") {
      challengeApprovalMutation.mutate({
        challengeID: item?._id
      })
    } else if (status === "reject") {
      challengeRejectMutation.mutate({
        challengeID: item?._id
      })
    }

  } 

  return (
    <div className=" w-full rounded-3xl flex flex-col bg-white ">
      <LoadingLayout loading={refetching}>
        <div className=" w-full h-[244px] relative rounded-t-3xl bg-white p-2 ">
          <div className=" absolute inset-x-0 top-0 z-10 w-full p-5 flex justify-end items-center " >
            <div className=" rounded-full border px-2 w-fit gap-1 h-[30px] text-white border-white flex justify-center items-center " >
              <RiTimeFill size={"16px"} color="#FDFDFF" />
              {/* <p className=" text-xs font-semibold "  >2-3 Weeks</p>  */}
              <p className=" text-[10px] font-semibold "  >{dateFormatHeader(item?.startDate) + " - " + dateFormatHeader(item?.endDate)}</p>
            </div>
          </div>
          {item?.url?.includes("http") && (
            <CustomImage
              src={item?.url}
              alt="blue"
              fillContainer
              style={{ borderRadius: "8px" }}
            />
          )}
        </div>
      </LoadingLayout>
      <div className=" w-full flex flex-col gap-4 pr-6 pb-4 ">
        <div className=" w-full flex p-4 pb-0 flex-col gap-3 ">
          <div className=" flex flex-col gap-2 ">
            <div className=" w-full flex flex-wrap gap-3 ">
              <div className=" w-fit px-2 text-xs font-medium text-coral-900 rounded-3xl flex justify-center items-center h-[22px] bg-coral-100 ">
                {item?.industry?.name}
              </div>
              <div className=" w-fit px-2 text-xs font-medium text-neonblue-900 rounded-3xl flex justify-center items-center h-[22px] bg-neonblue-100 ">
                {item?.level?.name}
              </div>
              <div className=" w-fit px-2 text-xs font-medium text-pear-900 rounded-3xl flex justify-center items-center h-[22px] bg-pear-100 ">
                {item?.tracks[0]?.name}
              </div>
            </div>
            <div className=" flex flex-wrap gap-2 ">
              {item?.tags?.map((item) => {
                return (
                  <div
                    key={item}
                    className=" w-fit px-2 text-xs font-medium bg-violet-500 rounded-3xl flex justify-center items-center h-[22px] text-violet-100 "
                  >
                    {item}
                  </div>
                );
              })}
            </div>
          </div>
          <p className=" text-3xl font-bold ">{item?.title}</p>
          <div
            className=" text-xs font-medium text-violet-300 "
            dangerouslySetInnerHTML={{ __html: item?.description }}
          />
          {/* <p className=" text-violet-300 text-sm font-medium " >{item?.description}</p> */}
          <p className=" text-violet-300 text-xs font-medium ">
            Participation Fee:{" "}
            <span className=" font-bold ">
              {formatNumber(item?.participationFee)}
            </span>
          </p>
        </div>
        {(!approve && !item?.isCreatorPaid)&& (
          <div className=" w-[300px] px-4 " > 
            <CustomButton
              variant="primary"
              size="sm"
              height="35px"
              fontSize="12px"
              fullWidth
              // isLoading={loading && item?._id === id && status === "approve"}
              onClick={() => setIsShow(true)}
            >
              Approve
            </CustomButton>
          </div>
        )}
        {approve && (
          <div className=" flex gap-3 w-full px-4" >
            {(!item?.isApproved || item?.isApproved === undefined) && (
              <div className=" w-[100px] " >
                <CustomButton
                  variant="primary"
                  size="sm"
                  height="35px"
                  fontSize="12px"
                  fullWidth
                  // isLoading={loading && item?._id === id && status === "approve"}
                  onClick={() => setIsShow(true)}
                >
                  Approve
                </CustomButton>
              </div>
            )}
            {(item?.isApproved || item?.isApproved === undefined) && (
              <div className=" w-[100px] " >
                <CustomButton
                  variant="customDanger"
                  size="sm"
                  height="35px"
                  fontSize="12px"
                  fullWidth
                  // isLoading={loading && item?._id === id && status === "reject"}
                  onClick={() => setIsOpen(true)}
                >
                  Reject
                </CustomButton>
              </div>
            )}

            <ModalLayout size="sm" isOpen={open} onClose={() => setIsOpen(false)} >
              <div className=" flex flex-col gap-4 w-full " >
                <div className=" w-full flex flex-col gap-2 items-center " >
                  <div className=" w-12 h-12 rounded-full border-8 flex justify-center items-center bg-red-300 border-red-100 " >
                    <IoAlertCircleOutline size={"20px"} className=" text-red-600 " />
                  </div>
                  <p className=" text-lg font-bold " >Reject {capitalizeFLetter(item?.title)}</p>
                  <p className=" text-xs font-medium text-center text-violet-300 " >{`Deleting this challenge will permanently remove all its tasks, resources, and participant progress. This action cannot be undone, so make sure you're certain before proceeding.`}</p>
                </div>
                <div className=" flex w-full flex-col gap-2 capitalize " >
                  <CustomButton variant="customDanger" isLoading={loading} onClick={() => handleClick("reject")} >Reject {item?.title}</CustomButton>
                  <CustomButton onClick={() => setIsOpen(false)} variant="outline" >Cancel</CustomButton>
                </div>
              </div>
            </ModalLayout>

          </div>
        )}


<ModalLayout size="sm" isOpen={show} onClose={() => setIsShow(false)} >
              <>
                {!approve && (
                  <div className=" flex flex-col gap-4 w-full " >
                    <div className=" w-full flex flex-col gap-2 items-center " >
                      <div className=" w-12 h-12 rounded-full border-8 flex justify-center items-center bg-success-300 border-success-100 " >
                        <IoCheckmarkCircle size={"20px"} className=" text-success-600 " />
                      </div>
                      <p className=" font-bold text-center " >Approve Coach Payment</p>
                      <p className=" text-xs font-medium text-center text-violet-300 " >{`This action cannot be undone, so make sure you're certain before proceeding.`}</p>
                    </div>
                    <div className=" flex w-full flex-col gap-2 capitalize " >
                      <CustomButton isLoading={loading} onClick={() => coachPaymentMutation?.mutate(item?._id)}  >Approve</CustomButton>
                      <CustomButton onClick={() => setIsShow(false)} variant="outline" >Cancel</CustomButton>
                    </div>
                  </div>
                )}
                {approve && (
                  <div className=" flex flex-col gap-4 w-full " >
                    <div className=" w-full flex flex-col gap-2 items-center " >
                      <div className=" w-12 h-12 rounded-full border-8 flex justify-center items-center bg-success-300 border-success-100 " >
                        <IoCheckmarkCircle size={"20px"} className=" text-success-600 " />
                      </div>
                      <p className=" font-bold text-center " >Approve {capitalizeFLetter(item?.title)}</p>
                      <p className=" text-xs font-medium text-center text-violet-300 " >{`Deleting this challenge will permanently remove all its tasks, resources, and participant progress. This action cannot be undone, so make sure you're certain before proceeding.`}</p>
                    </div>
                    <div className=" flex w-full flex-col gap-2 capitalize " >
                      <CustomButton isLoading={loading} onClick={() => handleClick("approve")}  >Approve {textLimit(item?.title, 20)}</CustomButton>
                      <CustomButton onClick={() => setIsShow(false)} variant="outline" >Cancel</CustomButton>
                    </div>
                  </div>
                )}
              </>
            </ModalLayout>
      </div>
    </div>
  );
}
