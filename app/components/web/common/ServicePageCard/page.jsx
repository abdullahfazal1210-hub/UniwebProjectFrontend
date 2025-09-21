import React from 'react'

function page({icon,title,description}) {
  return (
    <div className=' p-3 border rounded-[10px] border-[#262626] bg-[#1a1a1a]'>    <div className="w-full  opacity-100   pt-[30px] px-2.5 pb-[10px] flex  items-center  ">
          <div>{icon}</div>
          <div className="text-white">{title}</div>
         
          
        </div>
         <p className=" p-3 text-base leading-[150%] tracking-normal  text-white">{description}</p>
         </div>
  )
}

export default page