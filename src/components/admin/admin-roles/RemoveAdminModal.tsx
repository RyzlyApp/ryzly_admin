"use client";
import React from "react";
import CustomButton from "@/components/custom/customButton";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Avatar,
} from "@heroui/react";

interface RemoveAdminModalProps {
  open: boolean;
  onClose: () => void;
  adminName: string;
  avatarUrl?: string;
  onConfirm: () => void;
  isLoading?: boolean;
}

export default function RemoveAdminModal({
  open,
  onClose,
  adminName,
  avatarUrl,
  onConfirm,
  isLoading = false,
}: RemoveAdminModalProps) {
  return (
    <Modal
      isOpen={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) onClose();
      }}
      size="md"
    >
      <ModalContent>
        <ModalHeader className="justify-center border-b border-gray-100 pb-3">
          <h3 className="text-lg font-semibold text-gray-900">Remove Administrator</h3>
        </ModalHeader>
        <ModalBody className="py-5">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3">
              <Avatar
                className="w-10 h-10 text-sm"
                name={adminName}
                color="danger"
                src={avatarUrl && avatarUrl !== "/work.jpg" ? avatarUrl : undefined}
              />
              <span className="text-base font-semibold text-gray-900">{adminName}</span>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed max-w-sm mx-auto">
              Are you sure you want to remove this admin? Once removed, they
              will lose all administrative privileges and access to the dashboard.
            </p>
          </div>
        </ModalBody>
        <ModalFooter className="border-t border-gray-100 pt-3">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full">
            <CustomButton
              variant="outline"
              onClick={onClose}
              fullWidth={true}
            >
              Cancel
            </CustomButton>
            <CustomButton
              variant="customDanger"
              onClick={onConfirm}
              isLoading={isLoading}
              fullWidth={true}
            >
              Remove
            </CustomButton>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
