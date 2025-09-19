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
    desc,
    feature,
    price,
    id,
    type,
    no_of_bathroom,
    no_of_bedroom,
  } = { ...props };

  // const words = desc.split(" ");
  // const truncatedText = words.slice(0, 10).join(" ");

  return (
    <article className="grid opacity-100 gap-5 rounded-[12px] border border-[#262626] bg-[#141414] p-6">
      {/* Product Image */}
      <Image
                    className='rounded-[12px]'
                    src={HouseImage}
                    alt="House Image" />

      {/* Product Content */}
      <div className="grid gap-3">
        <header className="grid gap-1">
          <h5 className="text-white font-semibold text-[20px] leading-[150%]">{title}</h5>
          <p className="text-[#999999] font-medium text-base leading-[150%]">{desc} <span className="text-white underline cursor-pointer">...Read More</span></p>
        </header>

        {/* Icons */}
        <div className="grid grid-cols-3 gap-1">
          <span className="border border-[#262626] bg-[#1a1a1a] rounded-[28px] px-2.5 py-2 text-white flex items-center justify-center font-medium text-sm">
            <BedroomIcon /> {no_of_bedroom}-Room
          </span>
          <span className="border border-[#262626] bg-[#1a1a1a] rounded-[28px] px-2.5 py-2 text-white flex items-center justify-center font-medium text-sm">
            <BathroomIcon /> {no_of_bathroom}-Bath
          </span>
          <span className="border border-[#262626] bg-[#1a1a1a] rounded-[28px] px-2.5 py-2 text-white flex items-center justify-center font-medium text-sm">
            <AreaIcon /> {type}
          </span>
        </div>

        {/* Price + Button */}
        <footer className="w-full flex flex-row justify-between">
          <div className="w-[25%] grid gap-0.5">
            <span className="text-[#999999] font-medium text-sm">Price</span>
            <p className="text-white font-semibold text-[20px]">${price}</p>
          </div>
          <Button asChild className="w-[65%] h-full">
            <Link
              href="/properties"
              className="font-medium text-sm bg-[#703bf7] border border-[#703bf7] text-white"
            >
              View Properties Details
            </Link>
          </Button>
        </footer>
      </div>
    </article>
  );
}
