'use client';
import React from 'react'

export default function HeroSection(props) {

  const { title, desc } = { ...props };

  return (
    <>
        <h1 className='font-semibold text-[38px] leading-[150%] tracking-normal text-white'>{title}</h1>
        <p className='font-medium text-base leading-6 tracking-normal text-gray-400'>{desc}</p>
    </>
  )
}