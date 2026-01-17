"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import BedroomIcon from "@/app/styles/svg/BedroomIcon.jsx";
import BathroomIcon from "@/app/styles/svg/BathroomIcon.jsx";
import AreaIcon from "@/app/styles/svg/VillaIcon.jsx";

import HouseImage from "@/public/img/house-image.png";

export default function ProductCard(props) {
  const {
    title,
    description,
    _id,
    type,
    no_of_bathroom,
    no_of_bedroom,
    buy_price,
    rent_price_3_months,
    rent_price_6_months,
    rent_price_annual,
    rent_price_Annual,
    availabilityStatus, // "Available", "Rented", "Sold"
    availableDate,
    rentDuration: rentedDuration,
  } = props;

  const [purchaseType, setPurchaseType] = useState(""); // default empty
  const [rentDuration, setRentDuration] = useState("3"); // default 3 months
  const [price, setPrice] = useState(0);

  const words = description?.split(" ") || [];
  const truncatedText = words.slice(0, 10).join(" ");

  const isUnavailable = availabilityStatus === "Rented" || availabilityStatus === "Sold" || availabilityStatus === "Occupied";
  const statusColor = availabilityStatus === "Sold" ? "bg-red-500" : "bg-yellow-600";
  const formattedDate = availableDate ? new Date(availableDate).toLocaleDateString() : "";

  // 🔹 Update Price and Store safely
  React.useEffect(() => {
    let currentPrice = 0;
    if (purchaseType === "buy") currentPrice = buy_price ?? 0;
    // ...
    // ...
    // (Assuming context allows jumping down, but to be safe I'll replace the block)
    if (purchaseType === "rent") {
      if (rentDuration === "3") currentPrice = rent_price_3_months ?? 0;
      if (rentDuration === "6") currentPrice = rent_price_6_months ?? 0;
      if (rentDuration === "12") currentPrice = rent_price_annual ?? 0;
    }

    setPrice(currentPrice);

    if (currentPrice > 0) {
      localStorage.setItem("rent_duration_price", currentPrice);
    }
  }, [purchaseType, rentDuration, buy_price, rent_price_3_months, rent_price_6_months, rent_price_annual]);

  // Helper to determine mime type we fallback to jpeg
  const getMimeType = (filename) => {
    const ext = filename?.split('.').pop()?.toLowerCase();
    if (ext === 'png') return 'image/png';
    if (ext === 'webp') return 'image/webp';
    if (ext === 'svg') return 'image/svg+xml';
    return 'image/jpeg';
  };

  const imageSrc = props.images && props.images.length > 0
    ? `data:${getMimeType(props.images[0].name)};base64,${props.images[0].data}`
    : HouseImage;

  return (
    <article className="h-full grid p-4 gap-4 md:gap-5 rounded-[12px] border border-[#262626] bg-[#141414] md:p-6">
      {/* Image */}
      <div className="relative w-full aspect-[4/3] overflow-hidden rounded-[12px]">
        <Image
          className="object-cover"
          src={imageSrc}
          alt="Property Image"
          fill
        />
        {/* Status Badge */}
        {isUnavailable && (
          <div className={`absolute top-2 right-2 px-3 py-1 rounded text-white text-xs font-bold ${statusColor}`}>
            {availabilityStatus === "Sold" ? "SOLD" : "RENTED"}
          </div>
        )}
      </div>

      <div className="grid gap-4">
        {/* Title */}
        <header className="grid gap-1">
          <h5 className="text-white font-semibold text-[18px] md:text-[20px]">
            {title}
          </h5>
          <p className="text-[#999999] text-sm">
            {truncatedText} ...Read More
          </p>
        </header>

        {/* Icons */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          <span className="icon-pill flex items-center gap-1 px-3 py-2 rounded-full bg-[#1a1a1a] border border-[#262626] text-white text-sm">
            <BedroomIcon /> {no_of_bedroom}-Room
          </span>
          <span className="icon-pill flex items-center gap-1 px-3 py-2 rounded-full bg-[#1a1a1a] border border-[#262626] text-white text-sm">
            <BathroomIcon /> {no_of_bathroom}-Bath
          </span>
          <span className="icon-pill flex items-center gap-1 px-3 py-2 rounded-full bg-[#1a1a1a] border border-[#262626] text-white text-sm">
            <AreaIcon /> {type}
          </span>
        </div>

        {/* Buy / Rent Select */}
        {/* Status Overlay / Select */}
        {isUnavailable ? (
          <div className={`w-full px-3 py-2 rounded-lg border border-[rgba(38,38,38,1)] text-white font-medium text-center ${statusColor}`}>
            {availabilityStatus === "Sold" ? "Sold Out" : `Rented (${rentedDuration || "N/A"} Months)`}
            {availabilityStatus !== "Sold" && formattedDate && <div className="text-xs text-white/80">Until: {formattedDate}</div>}
          </div>
        ) : (
          <select
            value={purchaseType}
            onChange={(e) => setPurchaseType(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-[rgba(26,26,26,1)] border border-[rgba(38,38,38,1)] text-gray-400 focus:outline-none focus:border-[#999999]"
          >
            <option value="">Select Option</option>
            <option value="buy">Buy</option>
            <option value="rent">Rent</option>
          </select>
        )}

        {/* Rent Duration */}
        {purchaseType === "rent" && !isUnavailable && (
          <select
            value={rentDuration}
            onChange={(e) => setRentDuration(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-[rgba(26,26,26,1)] border border-[rgba(38,38,38,1)] text-gray-400 focus:outline-none focus:border-[#999999]"
          >
            <option value="3">3 Months</option>
            <option value="6">6 Months</option>
            <option value="12">Annual</option>
          </select>
        )}

        {/* Price + Button */}
        <div className="flex justify-between items-center gap-3">
          <div>
            <span className="text-[#999999] text-sm">Price</span>
            <p className="text-white text-[20px] font-semibold">
              {price > 0 ? `PKR ${price.toLocaleString()}` : "Price Not Available"}
            </p>
          </div>

          <Button
            className={`w-[65%] bg-[#703bf7] text-white py-2 flex justify-center rounded-lg hover:bg-[#895ef7] ${isUnavailable ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={(e) => {
              if (isUnavailable) {
                e.preventDefault();
                return;
              }
              if (!purchaseType) {
                e.preventDefault();
                toast.error("Please select Buy or Rent option first!", {
                  style: { background: "red", color: "white" }
                });
                return;
              }
            }}
            disabled={isUnavailable}
          >
            <Link
              href={!isUnavailable && purchaseType ? {
                pathname: `/properties/detailed/${_id}`,
                query: {
                  type: purchaseType,
                  duration: rentDuration
                }
              } : '#'}
              prefetch={true}
            >
              {isUnavailable ? "Unavailable" : "View Property Details"}
            </Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
