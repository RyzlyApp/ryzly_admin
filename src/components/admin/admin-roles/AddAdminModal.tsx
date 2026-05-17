"use client";
import CustomButton from "@/components/custom/customButton";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/react";
import { MdDashboard } from "react-icons/md";
import { FaTrophy, FaMoneyBillWave, FaChartBar, FaAward } from "react-icons/fa";
import { BiTargetLock } from "react-icons/bi";
import { FiUser } from "react-icons/fi";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { IoPeopleCircleOutline } from "react-icons/io5";
import { LuUsersRound } from "react-icons/lu";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import httpService from "@/helper/services/httpService";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export enum ADMIN_ROLE {
  SUPER_ADMIN = "SUPER_ADMIN",
  ADMIN = "ADMIN",
  GROWTH_MANAGER = "GROWTH_MANAGER",
  PRODUCT_MANAGER = "PRODUCT_MANAGER",
  COMMUNITY_SUPPORT = "COMMUNITY_SUPPORT",
}

type AddAdminFormValues = {
  name: string;
  email: string;
  role: ADMIN_ROLE | "";
  access: string[];
};

const addAdminSchema = yup.object({
  fullName: yup.string().trim().required("Full name is required"),
  email: yup
    .string()
    .trim()
    .email("Enter a valid email")
    .required("Email is required"),
  role: yup
    .mixed<ADMIN_ROLE>()
    .oneOf(Object.values(ADMIN_ROLE) as ADMIN_ROLE[], "Select admin role")
    .required("Role is required"),
    password: yup.string().trim().required("Password is required"),
});

interface AddAdminModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: {
    name: string;
    email: string;
    role: string;
    access: string[];
  }) => void;
}

const ACCESS_ITEMS = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: <MdDashboard className="w-4 h-4" />,
  },
  { id: "users", label: "Users", icon: <LuUsersRound className="w-4 h-4" /> },
  {
    id: "challenges",
    label: "Challenges",
    icon: <BiTargetLock className="w-4 h-4" />,
  },
  {
    id: "communities",
    label: "Communities",
    icon: <IoPeopleCircleOutline className="w-4 h-4" />,
  },
  {
    id: "approvals",
    label: "Approvals",
    icon: <AiOutlineCheckCircle className="w-4 h-4" />,
  },
  {
    id: "transactions",
    label: "Transactions",
    icon: <FaMoneyBillWave className="w-4 h-4" />,
  },
  { id: "rewards", label: "Rewards", icon: <FaTrophy className="w-4 h-4" /> },
  {
    id: "reports",
    label: "Reports",
    icon: <FaAward className="w-4 h-4" />,
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: <FaChartBar className="w-4 h-4" />,
  },
  {
    id: "admin_roles",
    label: "Admin Roles",
    icon: <FiUser className="w-4 h-4" />,
  },
];

export default function AddAdminModal({
  open,
  onClose,
  onSubmit,
}: AddAdminModalProps) {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      role: ADMIN_ROLE.ADMIN,
      password: ''
    },
    mode: "onBlur",
    resolver: yupResolver(addAdminSchema),
  });


  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data: { email: string; fullName: string; role: ADMIN_ROLE }) =>
      httpService.post("/admin-auth/create-admin", data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["admins"] });
      onClose();
      clearErrors();
    },
  });

  const submit = async (data: any) => {
    await mutateAsync(data);
  }

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
        <form onSubmit={handleSubmit(submit)} className="contents">
          <ModalHeader className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Add Admin</h3>
          </ModalHeader>
          <ModalBody className="space-y-2">
            <div className="space-y-1">
              <label className="text-sm text-gray-700">Full Name</label>
              <input
                {...register("fullName")}
                placeholder="Enter their full name"
                className="w-full h-11 px-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.fullName?.message && (
                <p className="text-xs text-red-600 font-medium">
                  {errors.fullName.message}
                </p>
              )}
            </div>
            <div className="space-y-1">
              <label className="text-sm text-gray-700">Email</label>
              <input
                {...register("email")}
                placeholder="Enter email"
                type="email"
                className="w-full h-11 px-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.email?.message && (
                <p className="text-xs text-red-600 font-medium">
                  {errors.email.message}
                </p>
              )}
            </div>
             <div className="space-y-1">
              <label className="text-sm text-gray-700">Password</label>
              <input
                {...register("password")}
                placeholder="Enter password"
                type="password"
                className="w-full h-11 px-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.password?.message && (
                <p className="text-xs text-red-600 font-medium">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="space-y-1">
              <label className="text-sm text-gray-700">Role</label>
              <select
                {...register("role")}
                className="w-full h-11 px-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="" disabled>
                  Select admin role
                </option>
                <option value={ADMIN_ROLE.SUPER_ADMIN}>
                  {ADMIN_ROLE.SUPER_ADMIN}
                </option>
                <option value={ADMIN_ROLE.ADMIN}>{ADMIN_ROLE.ADMIN}</option>
                <option value={ADMIN_ROLE.GROWTH_MANAGER}>
                  {ADMIN_ROLE.GROWTH_MANAGER}
                </option>
                <option value={ADMIN_ROLE.PRODUCT_MANAGER}>
                  {ADMIN_ROLE.PRODUCT_MANAGER}
                </option>
                <option value={ADMIN_ROLE.COMMUNITY_SUPPORT}>
                  {ADMIN_ROLE.COMMUNITY_SUPPORT}
                </option>
              </select>
              {errors.role?.message && (
                <p className="text-xs text-red-600 font-medium">
                  {errors.role.message}
                </p>
              )}
            </div>

          {/* <div className="space-y-3">
            <p className="text-sm text-gray-600">Manage Access</p>
            <div className="space-y-3">
              {ACCESS_ITEMS.map((item) => (
                <label
                  key={item.id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-gray-500">{item.icon}</span>
                    <span className="text-sm">{item.label}</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={access.includes(item.id)}
                    onChange={() => toggleAccess(item.id)}
                    className="h-4 w-4"
                  />
                </label>
              ))}
            </div>
          </div> */}
          </ModalBody>
          <ModalFooter>
            <div className="flex items-center justify-end gap-3 w-full">
              <CustomButton variant="outline" type="button" onClick={onClose}>
                Cancel
              </CustomButton>
              <CustomButton variant="primary" type="submit" isLoading={isPending}>
                Add Admin
              </CustomButton>
            </div>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}


