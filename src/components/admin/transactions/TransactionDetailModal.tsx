import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/react";
import CustomButton from "@/components/custom/customButton";
import { ServerTransaction } from "@/app/admin/transactions/page";
import { dateFormat } from "@/helper/utils/dateFormat";
import { FiArrowDown, FiArrowUp } from "react-icons/fi";

interface TransactionDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  transaction: ServerTransaction;
}

export const TransactionDetailModal: React.FC<TransactionDetailModalProps> = ({
  isOpen,
  onClose,
  transaction,
}) => {
  const formattedAmount = transaction.currencyType === "NGN" 
    ? `₦${transaction.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` 
    : `$${transaction.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  const normalizedStatus = transaction.status.toLowerCase();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>
          <h3 className="text-lg font-medium text-gray-900">
            Transaction Receipt
          </h3>
        </ModalHeader>
        <ModalBody>
          <div className="space-y-4">
            <div className="flex items-center justify-center py-4">
              <div className="text-2xl font-bold text-gray-900">
                {formattedAmount}
              </div>
            </div>

            <div className="border-t border-b border-gray-200 py-4">
              <dl className="grid grid-cols-1 gap-y-4">
                <div className="sm:grid sm:grid-cols-3 sm:gap-4">
                  <dt className="text-sm font-medium text-gray-500">Type</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {transaction.type}
                  </dd>
                </div>
                <div className="sm:grid sm:grid-cols-3 sm:gap-4">
                  <dt className="text-sm font-medium text-gray-500">Flow</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {transaction.flow ? (
                      <span className="inline-flex items-center gap-1.5">
                        {transaction.flow.toUpperCase() === "INBOUND" ? (
                          <>
                            <FiArrowUp className="w-4 h-4 text-green-600" />
                            <span className="font-medium text-green-700">Inbound</span>
                          </>
                        ) : (
                          <>
                            <FiArrowDown className="w-4 h-4 text-red-600" />
                            <span className="font-medium text-red-700">Outbound</span>
                          </>
                        )}
                      </span>
                    ) : (
                      "-"
                    )}
                  </dd>
                </div>
                <div className="sm:grid sm:grid-cols-3 sm:gap-4">
                  <dt className="text-sm font-medium text-gray-500">Date</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {dateFormat(transaction.createdAt)}
                  </dd>
                </div>
                <div className="sm:grid sm:grid-cols-3 sm:gap-4">
                  <dt className="text-sm font-medium text-gray-500">
                    Transaction ID
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {transaction.reference || transaction._id}
                  </dd>
                </div>
                <div className="sm:grid sm:grid-cols-3 sm:gap-4">
                  <dt className="text-sm font-medium text-gray-500">Status</dt>
                  <dd className="mt-1 sm:mt-0 sm:col-span-2">
                    {(normalizedStatus === "successful" || normalizedStatus === "success") && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <span className="h-2 w-2 mr-1 rounded-full bg-green-400"></span>
                        Successful
                      </span>
                    )}
                    {normalizedStatus === "failed" && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        <span className="h-2 w-2 mr-1 rounded-full bg-red-400"></span>
                        Failed
                      </span>
                    )}
                    {normalizedStatus === "won" && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        <span className="h-2 w-2 mr-1 rounded-full bg-blue-400"></span>
                        Won
                      </span>
                    )}
                    {normalizedStatus !== "successful" && normalizedStatus !== "success" && normalizedStatus !== "failed" && normalizedStatus !== "won" && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        <span className="h-2 w-2 mr-1 rounded-full bg-gray-400"></span>
                        {transaction.status}
                      </span>
                    )}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <CustomButton variant="primary" onClick={onClose} fullWidth={true}>
            Close Transaction
          </CustomButton>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
