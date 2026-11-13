"use client";
import React, { useState, useEffect } from "react";
import CustomButton from "@/components/custom/customButton";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Select,
  SelectItem,
} from "@heroui/react";
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import httpService from "@/helper/services/httpService";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { addToast } from "@heroui/toast";
import { AxiosError } from "axios";

export enum ADMIN_ROLE {
  SUPER_ADMIN = "SUPER_ADMIN",
  ADMIN = "ADMIN",
  GROWTH_MANAGER = "GROWTH_MANAGER",
  PRODUCT_MANAGER = "PRODUCT_MANAGER",
  COMMUNITY_SUPPORT = "COMMUNITY_SUPPORT",
}

export const ACCESS_ITEMS = [
  {
    id: "CHALLENGES",
    label: "Challenges",
  },
  {
    id: "TRANSACTIONS",
    label: "Transactions",
  },
];

export interface CreateAdminPayload {
  email: string;
  fullName: string;
  password: string;
  role: ADMIN_ROLE;
  access: string[];
}

const addAdminSchema = yup.object({
  fullName: yup.string().trim().required("Full name is required"),
  email: yup
    .string()
    .trim()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .trim()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  role: yup
    .mixed<ADMIN_ROLE>()
    .oneOf(Object.values(ADMIN_ROLE) as ADMIN_ROLE[], "Select admin role")
    .required("Role is required"),
  access: yup
    .array()
    .of(yup.string().required())
    .min(1, "Select at least one access permission")
    .required("Access permissions are required"),
});

interface AddAdminModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit?: (data: CreateAdminPayload) => void;
}

export default function AddAdminModal({
  open,
  onClose,
  onSubmit,
}: AddAdminModalProps) {
  const queryClient = useQueryClient();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreateAdminPayload>({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      role: ADMIN_ROLE.SUPER_ADMIN,
      access: ["CHALLENGES", "TRANSACTIONS"],
    },
    mode: "onBlur",
    resolver: yupResolver(addAdminSchema) as any,
  });

  const selectedAccess = watch("access") || [];

  useEffect(() => {
    if (open) {
      reset({
        fullName: "",
        email: "",
        password: "",
        role: ADMIN_ROLE.SUPER_ADMIN,
        access: ["CHALLENGES", "TRANSACTIONS"],
      });
      setShowPassword(false);
    }
  }, [open, reset]);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (payload: CreateAdminPayload) =>
      httpService.post("/admin-auth/create-admin", payload),
    onError: (error: AxiosError) => {
      const message =
        (error?.response?.data as { message?: string })?.message ||
        "Failed to create admin. Please try again.";
      addToast({
        title: "Error",
        description: message,
        color: "danger",
      });
    },
    onSuccess: async (res) => {
      const message =
        (res?.data as { message?: string })?.message ||
        "Admin created successfully";
      addToast({
        title: "Success",
        description: message,
        color: "success",
      });
      await queryClient.invalidateQueries({ queryKey: ["admins"] });
      if (onSubmit) {
        onSubmit(watch());
      }
      onClose();
    },
  });

  const onFormSubmit = async (values: CreateAdminPayload) => {
    await mutateAsync(values);
  };

  return (
    <Modal
      isOpen={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) onClose();
      }}
      size="xl"
      scrollBehavior="inside"
    >
      <ModalContent>
        <form onSubmit={handleSubmit(onFormSubmit)} className="contents">
          <ModalHeader className="flex items-center justify-between border-b border-gray-100 pb-3">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Add Administrator</h3>
              <p className="text-xs text-gray-500 font-normal">
                Create a new administrator account and assign access privileges.
              </p>
            </div>
          </ModalHeader>
          <ModalBody className="space-y-4 py-4">
            {/* Full Name */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Full Name</label>
              <input
                {...register("fullName")}
                placeholder="e.g. Jane Admin"
                className={`w-full h-11 px-3 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                  errors.fullName ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.fullName?.message && (
                <p className="text-xs text-red-600 font-medium">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Email Address</label>
              <input
                {...register("email")}
                placeholder="admin@example.com"
                type="email"
                className={`w-full h-11 px-3 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.email?.message && (
                <p className="text-xs text-red-600 font-medium">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Password</label>
              <div className="relative">
                <input
                  {...register("password")}
                  placeholder="Enter strong password"
                  type={showPassword ? "text" : "password"}
                  className={`w-full h-11 px-3 pr-10 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <RiEyeOffLine size={18} /> : <RiEyeLine size={18} />}
                </button>
              </div>
              {errors.password?.message && (
                <p className="text-xs text-red-600 font-medium">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Role */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Role</label>
              <select
                {...register("role")}
                className={`w-full h-11 px-3 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white cursor-pointer ${
                  errors.role ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value={ADMIN_ROLE.SUPER_ADMIN}>SUPER_ADMIN</option>
                <option value={ADMIN_ROLE.ADMIN}>ADMIN</option>
                <option value={ADMIN_ROLE.GROWTH_MANAGER}>GROWTH_MANAGER</option>
                <option value={ADMIN_ROLE.PRODUCT_MANAGER}>PRODUCT_MANAGER</option>
                <option value={ADMIN_ROLE.COMMUNITY_SUPPORT}>COMMUNITY_SUPPORT</option>
              </select>
              {errors.role?.message && (
                <p className="text-xs text-red-600 font-medium">
                  {errors.role.message}
                </p>
              )}
            </div>

            {/* Manage Access - Select Component */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Manage Access</label>
              <Select
                aria-label="Manage Access"
                placeholder="Select access permissions"
                selectionMode="multiple"
                selectedKeys={new Set(selectedAccess)}
                onSelectionChange={(keys) => {
                  const arr = Array.from(keys) as string[];
                  setValue("access", arr, { shouldValidate: true });
                }}
                variant="bordered"
                isInvalid={!!errors.access}
                errorMessage={errors.access?.message}
                classNames={{
                  trigger: `bg-white border rounded-lg min-h-11 shadow-none ${
                    errors.access ? "border-red-500" : "border-gray-300"
                  }`,
                  value: "text-sm text-gray-800",
                }}
              >
                {ACCESS_ITEMS.map((item) => (
                  <SelectItem key={item.id} textValue={item.label}>
                    {item.label} ({item.id})
                  </SelectItem>
                ))}
              </Select>
            </div>
          </ModalBody>
          <ModalFooter className="border-t border-gray-100 pt-3">
            <div className="flex items-center justify-end gap-3 w-full">
              <CustomButton variant="outline" type="button" onClick={onClose}>
                Cancel
              </CustomButton>
              <CustomButton variant="primary" type="submit" isLoading={isPending}>
                Create Admin
              </CustomButton>
            </div>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
