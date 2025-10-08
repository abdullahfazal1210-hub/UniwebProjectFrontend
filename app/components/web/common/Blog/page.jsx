import React from 'react'
import Link from "next/link";

// shadcn comps
import { Button } from "@/components/ui/button";

export default function Blogs(props) {

    const { title, desc } = { ...props };

    return (

        <div className="h-full grid opacity-100 gap-5 rounded-[12px] border border-[#262626] bg-[#141414] p-6">
            <h5 className='text-white font-semibold text-[20px] leading-[150%]'>{title}</h5>
            <p className='text-[#999999] font-medium text-base leading-[150%]'>{desc}</p>
            <Button asChild>
                <Link 
                    href="/about"
                    className='border border-[rgba(38,38,38,1)] text-white px-5 py-3.5 font-medium text-sm leading-[150%] tracking-normal transition-all hover:bg-[#3d3d3d] duration-300'
                >Learn More</Link>
            </Button>
        </div>
    )
}
