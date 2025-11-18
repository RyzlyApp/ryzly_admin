"use client"
import * as Yup from 'yup';
import { useFormik } from "formik";
import { addToast } from "@heroui/toast";
import { unsecureHttpService } from '@/helper/services/httpService';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { IAuth, ILogin } from '@/helper/model/auth';
import Cookies from "js-cookie";
import { AxiosError } from 'axios';

const useAuth = () => {

    const router = useRouter()
    const token = Cookies.get("accesstoken") as string;

    const loginMutation = useMutation({
        mutationFn: (data: ILogin) => unsecureHttpService.post(`/admin-auth/login`, data),
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

            console.log(data?.data?.data?.token);

            router.push(`/admin/dashboard`)


            Cookies.set("adminId", data?.data?.data?.adminId);
            Cookies.set("accesstoken", data?.data?.data?.token); 
            
            addToast({
                title: "Success",
                description: data?.data?.message,
                color: "success",
            })
        },
    });

    const signupMutation = useMutation({
        mutationFn: (data: {
            email: string
        }) => unsecureHttpService.post(`/user-auth/create-account`, data),
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

            addToast({
                title: "Success",
                description: data?.data?.message,
                color: "success",
            })
            router.push(`/auth/verify?userId=${data?.data?.data?.userId}&email=${formikSignup?.values?.email}`)
            Cookies.set("userid", data?.data?.data?.userId);
            Cookies.set("email", formikSignup?.values?.email);
        },
    });

    const userDetails = useMutation({
        mutationFn: (data?: string) => unsecureHttpService.get("/user", {
            headers: {
                Authorization: `Bearer ${data ?? token}`,
            },
        }),
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

            if (data?.data?.data?.fullName) {
                router.push("/dashboard")
            } else {
                router.push("/auth/onboarding")
            }
        },
    });
 

    const formikSignup = useFormik({
        initialValues: {
            email: "",
            confirmemail: ""
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email("Invalid email format")
                .required("Required"),
            confirmemail: Yup.string()
                .oneOf([Yup.ref("email")], "Emails must match")
                .required("Required"),
        }),
        onSubmit: (data: IAuth) => {
            signupMutation.mutate({ email: data.email })
        },
    });


    const formik = useFormik({
        initialValues: {
            email: "", 
            password: ""
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email("Invalid email format")
                .required("Required"), 
            password: Yup.string()
                .required("password")
        }),
        onSubmit: (data: ILogin) => {
            loginMutation.mutate(data)
        },
    });


    const isLoading = signupMutation?.isPending || loginMutation.isPending

    return {
        formik,
        formikSignup,
        loginMutation,
        signupMutation, 
        userDetails,
        isLoading
    }
}

export default useAuth