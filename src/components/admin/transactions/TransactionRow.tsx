import React from 'react';
import { ServerTransaction } from '@/app/admin/transactions/page';
import { dateFormat } from '@/helper/utils/dateFormat';

interface TransactionRowProps {
  transaction: ServerTransaction;
  onClick: () => void;
}

export const TransactionRow: React.FC<TransactionRowProps> = ({ transaction, onClick }) => {
  // Status badge styling based on status
  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'successful':
      case 'success':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <span className="h-2 w-2 mr-1 rounded-full bg-green-400"></span>
            Successful
          </span>
        );
      case 'failed':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <span className="h-2 w-2 mr-1 rounded-full bg-red-400"></span>
            Failed
          </span>
        );
      case 'won':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <span className="h-2 w-2 mr-1 rounded-full bg-blue-400"></span>
            Won
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            <span className="h-2 w-2 mr-1 rounded-full bg-gray-400"></span>
            {status}
          </span>
        );
    }
  };

  const formattedAmount = transaction.currencyType === "NGN" 
    ? `₦${transaction.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` 
    : `$${transaction.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  return (
    <tr 
      className="hover:bg-gray-50 cursor-pointer transition-colors duration-150"
      onClick={onClick}
    >
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{formattedAmount}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{transaction.type}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{transaction.reference || transaction._id}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{dateFormat(transaction.createdAt)}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {getStatusBadge(transaction.status)}
      </td>
    </tr>
  );
};