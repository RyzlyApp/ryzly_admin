"use client";

import React, { useEffect, useState } from "react";
import { IChallenge } from "@/helper/model/challenge";
import { useFetchData } from "@/hook/useFetchData";
import {
    Avatar,
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Pagination,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
} from "@heroui/react";
import { CustomImage } from "../custom";
import { IPagination } from "@/helper/model/pagination";
import { LoadingLayout, RenderParticipant } from "../shared";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import {
    challengesStatusFilterAtom,
    challengesHostTypeFilterAtom,
    challengesDateRangeFilterAtom,
} from "@/helper/atom/challenges";
import { calculateStartDate } from "@/helper/utils/dateCalculations";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import httpService from "@/helper/services/httpService";
import { BiTrash } from "react-icons/bi";

export default function ChallengesTable() {
    const router = useRouter();

    const [challengeData, setChallengeData] = useState<IChallenge[]>([]);
    const [page, setPage] = useState(1);

    const [statusFilter] = useAtom(challengesStatusFilterAtom);
    const [hostTypeFilter] = useAtom(challengesHostTypeFilterAtom);
    const [dateRangeFilter] = useAtom(challengesDateRangeFilterAtom);

    const [challengeToDelete, setChallengeToDelete] = useState<{ id: string; title?: string } | null>(null);

    // Reset to page 1 when filters change
    useEffect(() => {
        setPage(1);
    }, [statusFilter, hostTypeFilter, dateRangeFilter]);

    const params: Record<string, any> = {
        limit: 10,
        page: page,
    };

    if (statusFilter && statusFilter !== "All Status") {
        params.status = statusFilter;
    }

    if (hostTypeFilter === "Coach") {
        params.isCoach = true;
    } else if (hostTypeFilter === "Organization") {
        params.isOrganization = true;
    }

    const { data, isLoading } = useFetchData<IPagination<IChallenge[]>>({
        name: "challenge",
        endpoint: "/challenge/status",
        pagination: true,
        params,
    });

    const queryClient = useQueryClient();

    const deleteMutation = useMutation({
        mutationKey: ["delete-challenge"],
        mutationFn: (id: string) => httpService.delete(`/challenge/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["challenge"] });
            setChallengeToDelete(null);
        },
    });

    const handleDeleteChallenge = (id: string, title?: string) => {
        setChallengeToDelete({ id, title });
    };

    const handleConfirmDelete = () => {
        if (challengeToDelete) {
            deleteMutation.mutate(challengeToDelete.id);
        }
    };

    useEffect(() => {
        if (Array.isArray(data?.data) && data?.data.length > 0) {
            let filtered = data.data as unknown as IChallenge[];

            const startDateVal = calculateStartDate(dateRangeFilter);
            if (startDateVal) {
                const startMs = new Date(startDateVal).getTime();
                filtered = filtered.filter(
                    (item) => item.createdAt && new Date(item.createdAt).getTime() >= startMs
                );
            }

            setChallengeData(filtered);
        } else {
            setChallengeData([]);
        }
    }, [data?.data, isLoading, dateRangeFilter]);

    return (
        <LoadingLayout loading={isLoading} lenght={data?.data?.length}>
            <div className="w-full flex flex-col gap-6 items-center">
                <Table aria-label="Challenges Table">
                    <TableHeader>
                        <TableColumn>Title</TableColumn>
                        <TableColumn>Host</TableColumn>
                        <TableColumn>Status</TableColumn>
                        <TableColumn>Participants</TableColumn>
                        <TableColumn>Action</TableColumn>
                    </TableHeader>
                    <TableBody>
                        {challengeData?.map((item) => (
                            <TableRow
                                key={item._id}
                                className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
                                onClick={() => router.push(`/admin/challenges/${item?._id}`)}
                            >
                                <TableCell className="py-4 px-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-fit">
                                            <CustomImage
                                                src={item?.url}
                                                alt={item?.title}
                                                width={40}
                                                height={40}
                                                style={{ borderRadius: "8px" }}
                                            />
                                        </div>
                                        <span className="text-sm font-medium text-left text-gray-900">
                                            {item?.title}
                                        </span>
                                    </div>
                                </TableCell>
                                <TableCell className="py-4 px-6 text-sm text-gray-900">
                                    <div className="flex items-center gap-2">
                                        <div className="w-fit">
                                            <Avatar
                                                className="w-8 h-8 text-xs"
                                                src={item?.creator?.profilePicture}
                                                name={item?.creator?.firstName}
                                            />
                                        </div>
                                        <p className="text-sm font-medium text-left">
                                            {item?.creator?.firstName} {item?.creator?.lastName}
                                        </p>
                                    </div>
                                </TableCell>
                                <TableCell className="py-4 px-6 text-sm text-gray-900">
                                    <div className="flex items-center gap-2">
                                        <div
                                            className={`w-2 h-2 rounded-full ${
                                                item?.isApproved === undefined
                                                    ? "bg-gray-400"
                                                    : !item?.isApproved
                                                    ? "bg-red-500"
                                                    : "bg-green-500"
                                            }`}
                                        ></div>
                                        <span className="text-sm text-gray-600">
                                            {item?.isApproved === undefined
                                                ? "Pending"
                                                : !item?.isApproved
                                                ? "Reject"
                                                : "Approved"}
                                        </span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <RenderParticipant
                                        maxDisplay={4}
                                        participants={item.participants}
                                    />
                                </TableCell>
                                <TableCell>
                                    <button
                                        className="p-2.5 rounded-lg bg-black/5 hover:bg-black/10 transition-colors"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDeleteChallenge(item._id, item?.title);
                                        }}
                                    >
                                        <BiTrash size={16} color="red" />
                                    </button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <Pagination
                    showControls
                    initialPage={page}
                    total={Number(data?.total) || 1}
                    onChange={(page) => setPage(page)}
                />
            </div>

            {/* Confirmation Modal */}
            <Modal
                isOpen={!!challengeToDelete}
                onOpenChange={(isOpen) => {
                    if (!isOpen) {
                        setChallengeToDelete(null);
                    }
                }}
                placement="center"
                backdrop="blur"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 text-gray-900 font-semibold">
                                Delete Challenge
                            </ModalHeader>
                            <ModalBody>
                                <p className="text-sm text-gray-600">
                                    Are you sure you want to delete{" "}
                                    <span className="font-semibold text-gray-900">
                                        {challengeToDelete?.title
                                            ? `"${challengeToDelete.title}"`
                                            : "this challenge"}
                                    </span>
                                    ? This action cannot be undone.
                                </p>
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    variant="light"
                                    color="default"
                                    onPress={onClose}
                                    isDisabled={deleteMutation.isPending}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    color="danger"
                                    isLoading={deleteMutation.isPending}
                                    onPress={handleConfirmDelete}
                                >
                                    Delete
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </LoadingLayout>
    );
}