"use client";
import React, { useEffect, useState } from "react";
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
import { ACCESS_ITEMS } from "./AddAdminModal";

interface EditAccessModalProps {
  open: boolean;
  onClose: () => void;
  adminName: string;
  currentAccess: string[];
  onSave: (updatedAccess: string[]) => void;
  isLoading?: boolean;
}

export default function EditAccessModal({
  open,
  onClose,
  adminName,
  currentAccess,
  onSave,
  isLoading = false,
}: EditAccessModalProps) {
  const [access, setAccess] = useState<string[]>([]);

  useEffect(() => {
    if (open) {
      // Normalize incoming access strings to uppercase
      const normalized = (currentAccess || []).map((a) => a.toUpperCase());
      setAccess(normalized);
    }
  }, [open, currentAccess]);

  return (
    <Modal
      isOpen={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) onClose();
      }}
      size="lg"
      scrollBehavior="inside"
    >
      <ModalContent>
        <ModalHeader className="border-b border-gray-100 pb-3">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Edit Access Permissions</h3>
            <p className="text-xs text-gray-500 font-normal">
              Update module permissions for <span className="font-semibold text-gray-800">{adminName}</span>
            </p>
          </div>
        </ModalHeader>
        <ModalBody className="space-y-4 py-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Manage Access</label>
            <Select
              aria-label="Manage Access"
              placeholder="Select access permissions"
              selectionMode="multiple"
              selectedKeys={new Set(access)}
              onSelectionChange={(keys) => {
                const arr = Array.from(keys) as string[];
                setAccess(arr);
              }}
              variant="bordered"
              classNames={{
                trigger: "bg-white border border-gray-300 rounded-lg min-h-11 shadow-none",
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
            <CustomButton
              variant="primary"
              type="button"
              isLoading={isLoading}
              onClick={() => {
                onSave(access);
                onClose();
              }}
            >
              Save Changes
            </CustomButton>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
