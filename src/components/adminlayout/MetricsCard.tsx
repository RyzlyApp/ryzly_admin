import { ReactNode } from "react";

interface MetricsCardProps {
  icon: ReactNode;
  value: string;
  label: string;
  iconColor: string;
  iconBg: string;
}

export default function MetricsCard({
  icon,
  value,
  label,
  iconColor,
  iconBg,
}: MetricsCardProps) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center gap-3">
        <div className={`p-3 rounded-full ${iconBg}`}>
          <div className={`text-2xl ${iconColor}`}>{icon}</div>
        </div>
        <div className="">
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
          <p className="text-sm text-gray-600">{label}</p>
        </div>
      </div>
    </div>
  );
}
