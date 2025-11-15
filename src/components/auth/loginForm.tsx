"use client"
import useAuth from "@/hook/useAuth"
import { FormikProvider } from "formik"
import { CustomButton, CustomInput } from "../custom"

export default function LoginForm() {

  const { formik, loginMutation } = useAuth()

  return (
    <FormikProvider value={formik} >
      <form onSubmit={formik.handleSubmit} className="w-full max-w-[580px] shadow-2xs bg-white rounded-3xl p-[40px] flex flex-col gap-6 items-center">
        <p className="text-3xl font-bold">Login to your account</p>

        {/* Email + password fields */}
        <div className="w-full flex flex-col gap-4">
          <CustomInput
            name="email"
            label="Email"
            placeholder="Enter your email"
            type="email"
          />
          <CustomInput
            placeholder="Confirm your email address"
            label="Confirm your email address"
            name="confirmemail"
            type="password"
          />
        </div>

        {/* Submit button */}
        <CustomButton isLoading={loginMutation.isPending} variant="primary" fullWidth size="lg" type="submit">
          Log In
        </CustomButton>
      </form>
    </FormikProvider>
  )
}
