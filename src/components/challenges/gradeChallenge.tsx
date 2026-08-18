"use client";
import { FormikProvider } from "formik";
import { CustomButton, CustomInput } from "../custom";
import { ISubmissionPreview } from "@/helper/model/application";
import { useFetchData } from "@/hook/useFetchData";
import { RiEditLine } from "react-icons/ri";
import { IChallenge, IGradeDetail } from "@/helper/model/challenge";
import { CoachesReview, LoadingLayout, ModalLayout } from "../shared";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { userAtom } from "@/helper/atom/user";
import useSubmitChallenge from "@/hook/useSubmitChallenge";
import { useParams } from "next/navigation";
import { addToast } from "@heroui/toast";

export default function GradingChallenge({
    item,
}: {
    item: ISubmissionPreview;
}) {
    const [tab, setTab] = useState(false);
    const param = useParams();
    const [feedBackLoading, setfeedBackLoading] = useState(false);
    const id = param.id;

    const [user] = useAtom(userAtom);

    const { data: challenge, isLoading: loadingchallenge, isRefetching } = useFetchData<IChallenge>({
        endpoint: `/challenge/single/${id}`, name: "challengedetails"
    })

    console.log(challenge);


    const { data = [], isPending } = useFetchData<IGradeDetail[]>({
        endpoint: `/grade`,
        params: {
            // challengeID: item?.challengeID?._id,
            taskID: item?.taskID?._id,
            userId: item?.userId?._id,
        },
    });

    const { formikGrade, isLoading, isOpen, setIsOpen } = useSubmitChallenge(
        item?._id,
        item?.userId?._id,
        data.length > 0 ? data[0]?._id : "",
    );

    useEffect(() => {
        if (data?.length > 0) {
            setTab(true);
            formikGrade.setFieldValue("feedBack", data[0]?.feedBack);
            formikGrade.setFieldValue("score", data[0]?.score + "");
        }
    }, [isPending, data]);

    console.log(item);


    useEffect(() => {
        if ((challenge?.creatorType)?.toLocaleLowerCase() === "organization") {
            formikGrade.setFieldValue("score", "100");
        }
    }, [challenge?.creatorType]);

    const feedBack = async () => {
        setfeedBackLoading(true)
        await formikGrade.setFieldValue("score", "0");
        if (!formikGrade.values.feedBack) {
            addToast({
                title: "Error",
                description: "Enter A Feedback",
                color: "danger",
            })
        } else {
            formikGrade.setFieldValue("score", "0");
            formikGrade.handleSubmit()
        }
        setfeedBackLoading(false)
    }

    return (
        <div className=" w-full lg:w-[400px] bg-white p-4 ">
            <LoadingLayout loading={isPending}>
                <FormikProvider value={formikGrade}>
                    {!tab && (
                        <form
                            onSubmit={formikGrade.handleSubmit}
                            className=" w-full flex-col rounded-2xl flex h-fit gap-4 "
                        >
                            <p className=" font-bold ">Review</p>
                            <div className=" w-full flex flex-col gap-3 ">
                                <CustomInput
                                    name="feedBack"
                                    label="Feedback"
                                    placeholder="Leave constructive feedback for this submission"
                                    textarea={true}
                                />
                                {(challenge?.creatorType)?.toLocaleLowerCase() !== "organization" && (
                                    <CustomInput
                                        name="score"
                                        label="Score (/100%)"
                                        placeholder="Enter score"
                                        type="number"
                                    />
                                )}
                                {/* <div className=" w-full flex justify-end gap-4 pt-3 mt-auto ">
                                    {data?.length > 0 && (
                                        <CustomButton
                                            variant="outline"
                                            onClick={() => setTab(true)}
                                        >
                                            Cancel
                                        </CustomButton>
                                    )}
                                    {data?.length > 0 ? (
                                        <CustomButton
                                            isLoading={isLoading}
                                            type="submit"
                                        >
                                            Update
                                        </CustomButton>
                                    ) : (challenge?.creatorType)?.toLocaleLowerCase() ===
                                      "organization" ? (
                                        <CustomButton
                                            isLoading={isLoading}
                                            type="button"
                                            onClick={() => setIsOpen(true)}
                                        >
                                            {(challenge?.creatorType)?.toLocaleLowerCase() ===
                                            "organization"
                                                ? "Approve"
                                                : "Post"}
                                        </CustomButton>
                                    ) : (
                                        <CustomButton
                                            isLoading={isLoading}
                                            type={"submit" } 
                                        >
                                            {data?.length > 0
                                                ? "Update"
                                                : (challenge?.creatorType)?.toLocaleLowerCase() ===
                                                    "organization"
                                                  ? "Approve"
                                                  : "Post"}
                                        </CustomButton>
                                    )}
                                </div> */}
                                {(challenge?.creatorType)?.toLocaleLowerCase() !== "organization" && (
                                    <div className=" w-full flex justify-end gap-4 pt-3 mt-auto ">
                                        <CustomButton
                                            variant="outline"
                                            onClick={() => setTab(true)}
                                        >
                                            Cancel
                                        </CustomButton>
                                        <CustomButton
                                            isLoading={isLoading}
                                            type={"submit"}
                                        >
                                            {data?.length > 0
                                                ? "Update"
                                                : (challenge?.creatorType)?.toLocaleLowerCase() ===
                                                    "organization"
                                                    ? "Approve"
                                                    : "Post"}
                                        </CustomButton>
                                    </div>
                                )}
                                {(challenge?.creatorType)?.toLocaleLowerCase() === "organization" && (
                                    <div className=" w-full flex justify-end gap-4 pt-3 mt-auto ">
                                        {data[0]?.score <= 0 && (
                                            <CustomButton
                                                variant="outline"
                                                fullWidth
                                                isLoading={isLoading && feedBackLoading}
                                                onClick={feedBack}
                                            >
                                                Send Feedback Only
                                            </CustomButton>
                                        )}
                                        {data?.length > 0 ? (
                                            <CustomButton
                                                isLoading={isLoading && !feedBackLoading}
                                                type="submit"
                                                fullWidth
                                            >

                                                {formikGrade?.values?.score === "0" ? "Approve as Winner" : "Update"}

                                            </CustomButton>
                                        ) : (challenge?.creatorType)?.toLocaleLowerCase() ===
                                            "organization" ? (
                                            <CustomButton
                                                isLoading={isLoading && !feedBackLoading}
                                                fullWidth
                                                type="button"
                                                onClick={() => setIsOpen(true)}
                                            >
                                                {"Approve as Winner"}
                                            </CustomButton>
                                        ) : (
                                            <CustomButton
                                                isLoading={isLoading && !feedBackLoading}
                                                fullWidth
                                                type={"submit"}
                                            >
                                                {data?.length > 0
                                                    ? "Update"
                                                    : (challenge?.creatorType)?.toLocaleLowerCase() ===
                                                        "organization"
                                                        ? "Approve"
                                                        : "Post"}
                                            </CustomButton>
                                        )}
                                    </div>
                                )}
                                <p className=" text-xs font-medium text-[#727272] " >Send Feedback won't approve this person as the winner unless you use the approve button.</p>
                            </div>

                            <ModalLayout
                                isOpen={isOpen}
                                size="xs"
                                onClose={() => setIsOpen(false)}
                            >
                                <div className=" w-full h-full justify-center items-center flex flex-col gap-4 ">
                                    <p className=" text-xl font-semibold ">
                                        Approve Submission
                                    </p>
                                    <p className=" text-sm text-center ">
                                        By approving this submission, you
                                        confirm it meets your requirements. For
                                        challenges with multiple winners, the
                                        first approved submission is treated as
                                        your highest-ranked winner. This action
                                        cannot be undone.
                                    </p>
                                    <div className=" w-full flex flex-col gap-2 ">
                                        <CustomButton
                                            isLoading={isLoading}
                                            type="submit"
                                            onClick={() =>
                                                formikGrade.handleSubmit()
                                            }
                                        >
                                            Approve Submission
                                        </CustomButton>
                                        <CustomButton
                                            variant="outline"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            Cancel
                                        </CustomButton>
                                    </div>
                                </div>
                            </ModalLayout>
                        </form>
                    )}
                    {tab && (
                        <div className=" w-full bg-white flex-col rounded-2xl p-4 flex h-fit gap-4 ">
                            <div className=" w-full flex justify-between items-center ">
                                <p className=" font-bold ">Review & score</p>
                                <button
                                    onClick={() => setTab(false)}
                                    type="button"
                                    className=" text-neonblue-600 "
                                >
                                    <RiEditLine size={"16px"} />
                                </button>
                            </div>
                            <CoachesReview data={data[0]} />
                        </div>
                    )}
                </FormikProvider>
            </LoadingLayout>
        </div>
    );
}
