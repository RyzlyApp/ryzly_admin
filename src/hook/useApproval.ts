"use client"
import * as Yup from 'yup';
import { useFormik } from "formik";
import { addToast } from "@heroui/toast";
import httpService, { unsecureHttpService } from '@/helper/services/httpService';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { IAuth, ILogin } from '@/helper/model/auth';
import Cookies from "js-cookie";
import { AxiosError } from 'axios';
import { useState } from 'react';

const useApproval = () => {

    const queryClient = useQueryClient()

    const [open, setIsOpen] = useState(false)
    const [show, setIsShow] = useState(false)

    const approveCoachMutation = useMutation({
        mutationFn: (data: {
            id: string,
            payload: {
                status: string
            }
        }) => httpService.patch(`/application/admin/${data?.id}/status`, data?.payload),
        onError: (error: AxiosError) => {

            const message =
                (error?.response?.data as { message?: string })?.message ||
                "Something went wrong";

            addToast({
                title: "Error",
                description: message,
                color: "danger",
                timeout: 3000
            })
        },
        onSuccess: (data) => {

            setIsOpen(false)
            setIsShow(false)

            queryClient.invalidateQueries({ queryKey: ["application"] })
            queryClient.invalidateQueries({ queryKey: ["challengedetails"] })

            
            addToast({
                title: "Success",
                description: data?.data?.message,
                color: "success",
            })
        },
    });

    const challengeApprovalMutation = useMutation({
        mutationFn: (data: {
            challengeID: string
        }) => httpService.post(`/challenge/approve`, data),
        onError: (error: AxiosError) => {

            const message =
                (error?.response?.data as { message?: string })?.message ||
                "Something went wrong";

            addToast({
                title: "Error",
                description: message,
                color: "danger",
                timeout: 3000
            })
        },
        onSuccess: (data) => {

            setIsOpen(false)
            setIsShow(false)

            queryClient.invalidateQueries({ queryKey: ["application"] })
            queryClient.invalidateQueries({ queryKey: ["challengedetails"] })

            addToast({
                title: "Success",
                description: data?.data?.message,
                color: "success",
            })
        },
    });

    const challengeRejectMutation = useMutation({
        mutationFn: (data: {
            challengeID: string
        }) => httpService.post(`/challenge/reject`, data),
        onError: (error: AxiosError) => {

            const message =
                (error?.response?.data as { message?: string })?.message ||
                "Something went wrong";

            addToast({
                title: "Error",
                description: message,
                color: "danger",
                timeout: 3000
            })
        },
        onSuccess: (data) => {

            queryClient.invalidateQueries({ queryKey: ["application"] })
            queryClient.invalidateQueries({ queryKey: ["challengedetails"] })

            setIsOpen(false)
            setIsShow(false)
            addToast({
                title: "Success",
                description: data?.data?.message,
                color: "success",
            })
        },
    });

    const approvePayoutMutation = useMutation({
        mutationFn: (data: {
            id: string,
            payload : {
                status: "pending" | "approved" | "declined"
            }
        }) => httpService.patch(`/payout/${data?.id}/status`, data?.payload),
        onError: (error: AxiosError) => {

            const message =
                (error?.response?.data as { message?: string })?.message ||
                "Something went wrong";

            addToast({
                title: "Error",
                description: message,
                color: "danger",
                timeout: 3000
            })
        },
        onSuccess: (data) => {

            queryClient.invalidateQueries({ queryKey: ["application"] })
            queryClient.invalidateQueries({ queryKey: ["challengedetails"] })

            setIsOpen(false)
            setIsShow(false)
            addToast({
                title: "Success",
                description: data?.data?.message,
                color: "success",
            })
        },
    });

    const isLoading = approveCoachMutation.isPending || challengeApprovalMutation.isPending || challengeRejectMutation.isPending || approvePayoutMutation.isPending

    return {
        approveCoachMutation,
        challengeApprovalMutation,
        challengeRejectMutation,
        approvePayoutMutation,
        isLoading,
        open,
        show,
        setIsOpen,
        setIsShow
    }
}

export default useApproval