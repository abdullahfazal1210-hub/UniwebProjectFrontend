import React from "react";

function StatsCard({stat}) {
  return (
    <div>
      <div

        className="grid gap-0.5 px-3 py-3.5 bg-[rgba(26,26,26,1)] border border-[rgba(38,38,38,1)] rounded-lg"
      >
        <h6 className="font-bold text-white text-[30px] leading-[150%] tracking-normal">
          {stat.value}
        </h6>
        <p className="text-[#999999] font-medium text-base leading-[150%] tracking-normal">
          {stat.label}
        </p>
      </div>
    </div>
  );
}

export default StatsCard;
