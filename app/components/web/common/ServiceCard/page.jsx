'use client';
import React from "react";
import Arrow from "@/app/styles/svg/Arrow.jsx";

export default function ServiceCard(props) {
  const { title, icon } = { ...props };
  return (
    <div className="w-full h-full opacity-100 gap-4 rounded-[10px] border border-[#262626] bg-[#1a1a1a] pt-[30px] px-2.5 pb-[30px] flex flex-col items-center justify-center relative">
      <span>
        {icon}
      </span>
      <p className="font-semibold text-[14px] md:text-base leading-[150%] tracking-normal text-center text-white">{title}</p>
      <div className="absolute top-2.5 right-2.5 p-2.5">
        {" "}
        <Arrow />
      </div>
    </div>
  );
}