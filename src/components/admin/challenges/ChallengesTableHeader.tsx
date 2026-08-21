"use client";
import { RiFilterLine } from "react-icons/ri";
import CustomSelect from "@/components/custom/customSelect";
import { Formik, Form } from "formik";
import React from "react";

interface ChallengesTableHeaderProps {
  coachFilter: string;
  setCoachFilter: (filter: string) => void;
  statusFilter: string;
  setStatusFilter?: (filter: string) => void;
  dateRangeFilter: string;
  setDateRangeFilter: (filter: string) => void;
}

export default function ChallengesTableHeader({
  coachFilter,
  setCoachFilter,
  statusFilter,
  setStatusFilter,
  dateRangeFilter,
  setDateRangeFilter,
}: ChallengesTableHeaderProps) {
  return (
    <div className="p-6 border-b border-gray-200">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <h3 className="text-lg font-bold text-gray-900">By Coach</h3>
          <div className="w-48">
            <Formik
              initialValues={{ coachFilter: coachFilter }}
              enableReinitialize
              onSubmit={() => {}}
            >
              {({ values }) => {
                // Handle change directly
                if (values.coachFilter !== coachFilter) {
                  setCoachFilter(values.coachFilter);
                }

                return (
                  <Form>
                    <CustomSelect
                      name="coachFilter"
                      options={[
                        { value: "All", label: "All Coaches" },
                        { value: "Coach", label: "Coach" },
                        { value: "Organization", label: "Organization" },
                      ]}
                      placeholder="Select coach"
                      height="40px"
                    />
                  </Form>
                );
              }}
            </Formik>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-48">
            <Formik
              initialValues={{ dateRangeFilter: dateRangeFilter }}
              enableReinitialize
              onSubmit={() => {}}
            >
              {({ values }) => {
                // Handle change directly
                if (values.dateRangeFilter !== dateRangeFilter) {
                  setDateRangeFilter(values.dateRangeFilter);
                }

                return (
                  <Form>
                    <CustomSelect
                      name="dateRangeFilter"
                      options={[
                        { value: "All Time", label: "All Time" },
                        { value: "7 Days", label: "7 Days" },
                        { value: "2 Weeks", label: "2 Weeks" },
                        { value: "1 Month", label: "1 Month" },
                        { value: "3 Months", label: "3 Months" },
                      ]}
                      placeholder="Select date range"
                      height="40px"
                    />
                  </Form>
                );
              }}
            </Formik>
          </div>
          <div className="w-48">
            <Formik
              initialValues={{ statusFilter: statusFilter }}
              enableReinitialize
              onSubmit={() => {}}
            >
              {({ values }) => {
                // Handle change directly
                if (values.statusFilter !== statusFilter && setStatusFilter) {
                  setStatusFilter(values.statusFilter);
                }

                return (
                  <Form>
                    <CustomSelect
                      name="statusFilter"
                      options={[
                        { value: "All Status", label: "All Status" },
                        { value: "ongoing", label: "Ongoing" },
                        { value: "pending", label: "Pending" },
                        { value: "completed", label: "Completed" },
                      ]}
                      placeholder="Select status"
                      height="40px"
                    />
                  </Form>
                );
              }}
            </Formik>
          </div>
          <RiFilterLine className="text-gray-400" size={20} />
        </div>
      </div>
    </div>
  );
}
