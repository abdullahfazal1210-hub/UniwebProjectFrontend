import { ArrowUpRight, MoveUpRight } from 'lucide-react';
import React from 'react'

function page() {
const features = [
  {
    id: 1,
    title: "Find Your Dream Home",
    icon: "home", // yahan tum apna icon import ya use kar sakte ho
    
  },
  {
    id: 2,
    title: "Unlock Property Value",
    icon: "wallet", 
    
  },
  {
    id: 3,
    title: "Effortless Property Management",
    icon: "building",
  
  },
  {
    id: 4,
    title: "Smart Investments, Informed Decisions",
    icon: "sun",
    
  }
];


  return (
   
        <div className="main min-h-[100vh] bg-[#191919] w-[100%] overflow-hidden ">
        <div className="md:ms-20  md:h-65  mt-4 inline-flex justify-center flex-col">
            <h1 className='text-white text-2xl md:text-4xl font-bold'>Elevate Your Real Estate</h1>
            <p className='text-[#727272] text-[14px] md:text-[16px]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo quas quisquam consectetur.</p>
        </div>

<div className="feature-card grid bg-[#141414] py-2 px-3 gap-2 grid-cols-12">
  {features.map((card, ind) => (
    <div
      key={ind}
      className="card md:col-span-3 relative 
                 border border-gray-800 
                 bg-[#1A1A1A] rounded-xl 
                 flex-col justify-center items-center flex col-span-5 md:h-40
                 shadow-md shadow-black/40 hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300"
    >
      <h1 className="text-gray-50">{card.icon}</h1>
      <h1 className="text-white">{card.title}</h1>
      <p className="absolute top-0 right-0">
        <ArrowUpRight
          size={13}
          className="text-gray-300 size-10 mt-2 mr-2"
          strokeWidth={0.3}
        />
      </p>
    </div>
  ))}
</div>

<div className="sec-2">
    <div className="">
        <h1 className='text-white text-2xl md:text-4xl font-bold'>Unlock Property Value</h1>
        <p className='text-[#727272] text-[14px] md:text-[16px]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo quas quisquam consectetur.</p>
      
    </div>

    <div className="unlock-cards">
       <div
  c .   
      className="card md:col-span-3 relative 
                 border border-gray-800 
                 bg-[#1A1A1A] rounded-xl 
                 flex-col justify-center items-center flex col-span-5 md:h-40
                 shadow-md shadow-black/40 hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300"
    >
      <h1 className="text-gray-50">{card.icon}</h1>
      <h1 className="text-white">{card.title}</h1>
      <p className="absolute top-0 right-0">
        <ArrowUpRight
          size={13}
          className="text-gray-300 size-10 mt-2 mr-2"
          strokeWidth={0.3}
        />
      </p>
    </div>
    </div>
</div>


        </div>
    
  )
}

export default page