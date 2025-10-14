import Link from "next/link";

import { Button } from "@/components/ui/button";


import Image from "next/image";

import BedroomIcon from '@/app/styles/svg/BedroomIcon.jsx';
import BathroomIcon from '@/app/styles/svg/BathroomIcon.jsx';
import AreaIcon from '@/app/styles/svg/VillaIcon.jsx';

import HouseImage from '@/public/img/house-image.png';


export default function ProductCard(props) {
  const {
    title,
    description,
    feature,
    price,
    _id,
    type,
    no_of_bathroom,
    no_of_bedroom,
  } = { ...props };

  const words = description?.split(" ") || [];
  const truncatedText = words.slice(0, 10).join(" ");

  return (
    <article className="h-full grid opacity-100 p-4 gap-4 md:gap-5 rounded-[12px] border border-[#262626] bg-[#141414] md:p-6">
      {/* Product Image */}
      <Image
                    className='rounded-[12px]'
                    src={HouseImage}
                    alt="House Image" />

      {/* Product Content */}
      <div className="grid gap-3">
        <header className="grid gap-1">
          <h5 className="text-white font-semibold text-[18px] md:text-[20px] leading-[150%]">{title}</h5>
          <p className="text-[#999999] font-medium text-[14px] md:text-base leading-[150%]">{truncatedText} ...Read More</p>
        </header>

        {/* Icons */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-1">
          <span className="border border-[#262626] bg-[#1a1a1a] rounded-[28px] px-2.5 py-2 text-white flex items-center justify-center font-medium text-sm gap-1">
            <span>
              <BedroomIcon /> 
            </span> {no_of_bedroom}-Room
          </span>
          <span className="border border-[#262626] bg-[#1a1a1a] rounded-[28px] px-2.5 py-2 text-white flex items-center justify-center font-medium text-sm gap-1">
            <span>
              <BathroomIcon /> 
            </span>
            {no_of_bathroom}-Bath
          </span>
          <span className="border border-[#262626] bg-[#1a1a1a] rounded-[28px] px-2.5 py-2 text-white flex items-center justify-center font-medium text-sm gap-1">
            <span>
              <AreaIcon />
            </span>
            {type}
          </span>
        </div>

        {/* Price + Button */}
        <div className="w-full grid md:flex md:flex-row md:justify-between gap-2 md:gap-0">
          <div className="w-full md:w-[25%] flex items-center gap-2 md:grid md:grid-cols-1 md:gap-0.5">
            <span className="text-[#999999] font-medium text-sm">Price</span>
            <p className="text-white font-semibold text-[20px]">${price}</p>
          </div>
          <Button asChild className="w-full md:w-[65%] h-full">
            <Link
              href={`/properties/detailed/${_id}`}
              className="w-full font-medium text-sm bg-[#703bf7] border border-[#703bf7] text-white hover:bg-[#895ef7] transition-all"
            >
              View Properties Details
            </Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
