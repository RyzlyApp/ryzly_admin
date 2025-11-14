"use client"; 
import CustomButton from "@/components/custom/customButton";
import { CustomInput } from "@/components/custom";
import useAuth from "@/hook/useAuth";
import { FormikProvider } from "formik";

export default function AdminLogin() { 

  const { formik, isLoading } = useAuth()

  return (
    <FormikProvider value={formik} >

      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
        {/* Dark blue side bars */}
        <div className="fixed left-0 top-0 w-2 h-full bg-blue-900"></div>
        <div className="fixed right-0 top-0 w-2 h-full bg-blue-900"></div>

        {/* Main content */}
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative z-10">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center">
              <span className="text-white text-2xl font-bold">r</span>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Join Rhyzly Admin
          </h1>
          {/* Login Form */}
          <form onSubmit={formik.handleSubmit} className=" w-full flex gap-4 flex-col ">
            {/* Email Field */}

            <CustomInput name="email" label="Email" />

            {/* Password Field */}
            <CustomInput name="password" label="Password" />

            {/* Login Button */}
            <CustomButton
              type="submit"
              variant="auth"
              fullWidth
              height="48px"
              fontSize="16px"
              isLoading={isLoading}
            >
              Sign In
            </CustomButton>
          </form>
        </div>
      </div>
    </FormikProvider>
  );
}
