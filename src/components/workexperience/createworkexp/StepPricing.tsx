"use client";
import React, { useState, useEffect } from "react";
import { WorkExpFormData } from "./types";
import { RiPriceTag3Line } from "react-icons/ri";
import { addToast } from "@heroui/toast";

interface StepPricingProps {
  formData: WorkExpFormData;
  updatePricing: (pricing: Partial<WorkExpFormData["pricing"]>) => void;
}

export default function StepPricing({
  formData,
  updatePricing,
}: StepPricingProps) {
  const [inputPrice, setInputPrice] = useState(formData.pricing.usdPrice || "");
  const [coupon, setCoupon] = useState(formData.pricing.couponCode || "");

  useEffect(() => {
    if (formData.pricing.usdPrice !== undefined) {
      setInputPrice(formData.pricing.usdPrice);
    }
  }, [formData.pricing.usdPrice]);

  useEffect(() => {
    if (formData.pricing.couponCode !== undefined) {
      setCoupon(formData.pricing.couponCode);
    }
  }, [formData.pricing.couponCode]);

  const handlePriceChange = (val: string) => {
    const cleanVal = val.replace(/[^0-9.]/g, "");
    setInputPrice(cleanVal);
    updatePricing({
      usdPrice: cleanVal,
      currency: "NGN",
    });
  };

  const handleAddPricing = () => {
    updatePricing({
      usdPrice: inputPrice,
      currency: "NGN",
    });
    addToast({
      title: "Pricing Updated",
      description: inputPrice
        ? `Work experience price set to ₦${Number(inputPrice).toLocaleString()}`
        : "Work experience price set to ₦0",
      color: "success",
    });
  };

  const handleGenerateCoupon = () => {
    const randomCode =
      Math.floor(1000 + Math.random() * 9000).toString() +
      String.fromCharCode(65 + Math.floor(Math.random() * 26)) +
      Math.floor(10 + Math.random() * 90).toString();

    setCoupon(randomCode);
    updatePricing({ couponCode: randomCode });
    addToast({
      title: "New Coupon Generated",
      description: `Coupon code: ${randomCode}`,
      color: "success",
    });
  };

  const numericPrice = parseFloat(inputPrice) || 0;
  const formattedPriceString =
    numericPrice > 0 ? `₦${numericPrice.toLocaleString()}` : "₦0";

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Section Header */}
      <div>
        <h2 className="text-xl font-bold text-[#101828]">Pricing</h2>
        <p className="text-sm text-[#475467] mt-1">
          Set the price for this work experience in Nigerian Naira (₦).
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Form Cards */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* Card 1: Work Experience Price */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 lg:p-8 flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#F2F4FF] text-[#5160E7] flex items-center justify-center shrink-0">
                <RiPriceTag3Line size={20} />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#101828]">
                  Work Experience Price
                </h3>
                <p className="text-xs text-[#475467] mt-0.5">
                  The amount participants pay to enrol in this work experience in Naira (₦).
                </p>
              </div>
            </div>

            {/* Price Field strictly in Naira */}
            <div className="flex flex-col gap-1.5 pt-2">
              <label className="text-xs font-semibold text-gray-700">
                Price (₦) *
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-[#101828]">
                  ₦
                </span>
                <input
                  type="text"
                  inputMode="numeric"
                  value={inputPrice}
                  onChange={(e) => handlePriceChange(e.target.value)}
                  placeholder="0.00"
                  className="w-full pl-9 pr-16 py-2.5 rounded-lg border border-gray-200 text-sm text-[#101828] focus:outline-none focus:border-[#5160E7] focus:ring-2 focus:ring-[#5160E7]/10 transition-all font-medium"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-500 bg-gray-100 px-2.5 py-1 rounded-md">
                  NGN
                </span>
              </div>
              <span className="text-xs text-gray-400">
                Enter the amount in Nigerian Naira (e.g. 50000).
              </span>
            </div>

            {/* Add Pricing Button */}
            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={handleAddPricing}
                className="px-6 py-2.5 rounded-lg bg-[#101828] text-white text-sm font-medium hover:bg-[#1D1348] transition-colors cursor-pointer shadow-sm"
              >
                Save Pricing
              </button>
            </div>
          </div>

          {/* Card 2: Generate Coupon Code */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 lg:p-8 flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#F2F4FF] text-[#5160E7] flex items-center justify-center shrink-0">
                <RiPriceTag3Line size={20} />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#101828]">
                  Generate Coupon Code
                </h3>
                <p className="text-xs text-[#475467] mt-0.5">
                  Optional discount coupon code for this work experience.
                </p>
              </div>
            </div>

            {/* Coupon Code Input with Button */}
            <div className="flex flex-col gap-1.5 pt-2">
              <label className="text-xs font-semibold text-gray-700">
                Coupon code (optional)
              </label>
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={coupon}
                  onChange={(e) => {
                    const val = e.target.value;
                    setCoupon(val);
                    updatePricing({ couponCode: val });
                  }}
                  placeholder="e.g. RYZLY2026"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-[#101828] font-mono tracking-wider focus:outline-none focus:border-[#5160E7] focus:ring-2 focus:ring-[#5160E7]/10 transition-all pr-36"
                />
                <button
                  type="button"
                  onClick={handleGenerateCoupon}
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 px-4 py-1.5 rounded-lg bg-[#101828] text-white text-xs font-medium hover:bg-[#1D1348] transition-colors cursor-pointer"
                >
                  Generate Coupon
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Pricing Overview Card */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col gap-4">
          <h3 className="text-base font-bold text-[#101828]">
            Pricing Overview
          </h3>

          <div className="flex flex-col gap-3.5 pt-2">
            <div className="flex items-center justify-between text-xs pb-3 border-b border-gray-100">
              <span className="font-semibold text-gray-700">Enrolment Fee</span>
              <span className="font-bold text-[#101828]">
                {formattedPriceString}
              </span>
            </div>

            {formData.levels.beginner.enabled && (
              <div className="flex items-center justify-between text-xs pb-3 border-b border-gray-100">
                <span className="font-semibold text-gray-700">
                  {formData.levels.beginner.levelName || "Beginner"}
                </span>
                <span className="font-bold text-[#101828]">
                  {formattedPriceString}
                </span>
              </div>
            )}

            {formData.levels.advanced.enabled && (
              <div className="flex items-center justify-between text-xs pb-3 border-b border-gray-100">
                <span className="font-semibold text-gray-700">
                  {formData.levels.advanced.levelName || "Advanced"}
                </span>
                <span className="font-bold text-[#101828]">
                  {formattedPriceString}
                </span>
              </div>
            )}

            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-gray-700">Coupon Code</span>
              <span className="font-bold font-mono text-[#5160E7]">
                {coupon ? (
                  coupon
                ) : (
                  <span className="text-gray-400 font-normal">None</span>
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
