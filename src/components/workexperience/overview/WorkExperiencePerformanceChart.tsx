"use client";
import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

interface PerformancePoint {
  month: string;
  completion: number;
}

const PERFORMANCE_DATA: PerformancePoint[] = [
  { month: "May", completion: 22 },
  { month: "Jun", completion: 36 },
  { month: "Jul", completion: 40 },
  { month: "Aug", completion: 55 },
  { month: "Sep", completion: 87 },
  { month: "Oct", completion: 94 },
];

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-100 rounded-xl shadow-lg px-3 py-2">
        <p className="text-xs font-semibold text-[#101828]">{label}</p>
        <p className="text-xs font-bold text-[#5160E7] mt-0.5">
          {payload[0].value}% completion
        </p>
      </div>
    );
  }
  return null;
};

export default function WorkExperiencePerformanceChart() {
  return (
    <div className="w-full bg-white rounded-2xl border border-gray-100 shadow-xs p-6 flex flex-col justify-between h-full">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-[#101828]">
            Programme Performance
          </h3>
          <p className="text-xs text-[#475467] mt-0.5 font-normal">
            Completion rate across all work experiences.
          </p>
        </div>

        {/* 87% Completion rate pill from design reference */}
        <div className="bg-[#EEF2FF] border border-[#EEF0FF] rounded-xl px-3 py-1 flex flex-col items-center">
          <span className="text-xs font-bold text-[#5160E7]">87%</span>
          <span className="text-[10px] text-[#5160E7] font-medium leading-tight">
            Completion rate
          </span>
        </div>
      </div>

      {/* Recharts Area Chart */}
      <div className="w-full mt-6 h-52">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={PERFORMANCE_DATA}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient
                id="programmePerformanceGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="5%" stopColor="#5160E7" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#5160E7" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#F1F5F9"
            />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: "#64748B" }}
              dy={6}
            />
            <YAxis
              domain={[0, 100]}
              ticks={[0, 20, 40, 60, 80, 100]}
              tickFormatter={(val) => `${val}%`}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: "#64748B" }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="completion"
              stroke="#5160E7"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#programmePerformanceGradient)"
              activeDot={{
                r: 5,
                fill: "#5160E7",
                stroke: "#FFFFFF",
                strokeWidth: 2,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
