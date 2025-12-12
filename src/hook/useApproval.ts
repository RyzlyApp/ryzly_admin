"use client" 
import { addToast } from "@heroui/toast";
import httpService from '@/helper/services/httpService';
import { useMutation, useQueryClient } from '@tanstack/react-query'; 
import { AxiosError } from 'axios';
import * as Yup from 'yup';
import { useFormik } from 'formik';
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


    const coachPaymentMutation = useMutation({
        mutationFn: (data: string) => httpService.post(`/payout/pay-creator/${data}`, {}),
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

            formik.setFieldValue("transferCode", data?.data?.data?.paystackRef?.transfer_code)
            formik.setFieldValue("payoutId", data?.data?.data?.payout?._id) 
            
        
            setIsOpen(true) 
            addToast({
                title: data?.data?.message === "Insufficient wallet balance; payout declined" ? "Error" : "Success",
                description: data?.data?.message,
                color: data?.data?.message === "Insufficient wallet balance; payout declined" ? "danger" : "success",
            })
        },
    });


    const verifyPayoutMutation = useMutation({
        mutationFn: (data: {
            otp: string,
            transferCode: string
          }) => httpService.post(`/payout/finalize-transfer`, data),
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

            queryClient.invalidateQueries({ queryKey: ["payout"] }) 

            setIsOpen(false) 
            addToast({
                title: "Success",
                description: data?.data?.message,
                color: "success",
            })
        },
    });


    const formik = useFormik({
        initialValues: {
            otp: "", 
            transferCode: "",
            payoutId: ""
        },
        validationSchema: Yup.object({
            otp: Yup.string()
                .required("Required"), 
            transferCode: Yup.string()
                .required("Required")
        }),
        onSubmit: (data: { otp: string, transferCode: string, payoutId: string }) => {
            verifyPayoutMutation.mutate(data)
        },
    });

    const isLoading = approveCoachMutation.isPending || challengeApprovalMutation.isPending || challengeRejectMutation.isPending || approvePayoutMutation.isPending || coachPaymentMutation?.isPending

    return {
        approveCoachMutation,
        challengeApprovalMutation,
        challengeRejectMutation,
        approvePayoutMutation,
        verifyPayoutMutation,
        isLoading,
        open,
        show,
        coachPaymentMutation,
        setIsOpen,
        setIsShow, 
        formik
    }
}

export default useApproval