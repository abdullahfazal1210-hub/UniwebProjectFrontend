import React from 'react'
import Image from 'next/image';

import Avatar from '@/public/img/founder.jpg';

import Stars from '@/app/styles/svg/Star.jsx';
import EmtyStarIcon from '@/app/styles/svg/EmtyStarIcon.jsx';

export default function Reviews(props) {
  const { title, desc, name, city, country, rating } = { ...props };
  
  return (
    <article className='grid opacity-100 gap-5 rounded-[12px] border border-[#262626] bg-[#141414] p-6'>
                      {/* Rating */}
                      <div className='flex items-center gap-1'>
                          {Array.from({ length: 5 }, (_, idx) =>
                          idx < rating ? <Stars key={idx} /> : <EmtyStarIcon key={idx} />
                          )}
                      </div>
    
                      {/* Review content */}
                      <header className='w-full grid gap-2'>
                          <h5 className='font-semibold text-xl leading-7 tracking-normal text-white'>{title}</h5>
                          <p className='font-medium text-base leading-[150%] tracking-normal text-white'>{desc}</p>
                      </header>
    
                      {/* Client info */}
                      <footer className='grid gap-2.5 grid-cols-[auto_1fr] items-center'>
                          
                          <Image 
                            src={Avatar} 
                            alt={`$name's avatar`}
                            className='w-12 h-12 rounded-full' />
                          <div>
                          <strong className='font-medium text-lg leading-7 tracking-normal text-white'>{name}</strong>
                          <p className='font-medium text-base leading-6 tracking-normal text-gray-400'>
                              {country}, {city}
                          </p>
                          </div>
        </footer>
    </article>
  );
}

