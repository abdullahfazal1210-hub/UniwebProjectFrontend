import React from 'react'

function page({icon,title,description , className}) {
  return (
    <div className= {` ${className}  md:p-3 border rounded-[10px] border-[#262626] bg-[#1a1a1a]`}>   
     <div className="w-full  opacity-100   pt-[30px] px-2.5 md:pb-[10px] flex  items-center  ">
          <div>{icon}</div>
          <div className="text-white text-xl">{title}</div>
         
          
        </div>
         <p className=" p-3 text-base leading-[150%] tracking-normal text-[15px] text-[#828282] ">{description}</p>
         </div>
  )
}

export default page