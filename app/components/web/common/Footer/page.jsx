"use client";
import React from 'react'
import Link from "next/link";

// shadcn comps
import { Button } from "@/components/ui/button"

// icons
import Logo from '../../../../styles/svg/Logo.jsx';
import Send from '../../../../styles/svg/Send.jsx';
import Message from '../../../../styles/svg/Message.jsx';

export default function Footer() {

  const footerLinks = [
    {
      title: "Home",
      items: ["Hero Section", "Features", "Properties", "Testimonials", "FAQs"],
    },
    {
      title: "About Us",
      items: ["Our Story", "Our Works", "How It Works", "Our Team", "Our Clients"],
    },
    {
      title: "Properties",
      items: ["Portfolio", "Categories"],
    },
    {
      title: "Contact Us",
      items: ["Contact Form", "Our Offices"],
    },
    {
      title: "Services",
      items: [
        "Valuation Mastery",
        "Strategic Marketing",
        "Negotiation Wizardry",
        "Closing Success",
        "Property Management",
      ],
    },
  ];

  return (
    <footer>
      <section className="w-full py-12 px-4 grid bg-[rgba(20,20,20)] md:px-16 md:py-20 md:flex relative promotion-section gap-5 ">
        <div className='w-full md:w-3/4 text-start grid gap-2 z-10'>
          <h2 className='text-[28px] md:text-4xl font-semibold text-white'>Start Your Real State Journey Today</h2>
          <p className='text-[14px] md:text-[16px] font-medium text-[#999999]'>Your dream property is just a click away. Whether you`re looking for a new home, a strategic investment, or expert real estate advice, Estatein is here to assist you every step of the way. Take the first step towards your real estate goals and explore our available properties or get in touch with our team for personalized assistance.</p>
        </div>
        <div className='w-full md:w-1/4 flex items-center justify-center md:justify-end'>
          <Button asChild >
              <Link 
                href="/properties"
                className='w-full md:w-auto bg-[#703bf7] border border-[#703bf7] text-sm text-white px-5 py-3 rounded-b-md font-medium z-30'
              >Explore Properties</Link>
            </Button>
        </div>
      </section>
      <section className='w-full grid py-12 px-4 gap-10 bg-[rgba(20,20,20)] md:px-16 md:py-14 md:flex md:justify-between md:gap-16 border-t border-[rgba(38,38,38,1)] relative'>
          <div className="flex flex-col gap-4">
            <div>
              <Logo />
            </div>
            <form className="flex items-center justify-evenly gap-2 rounded-lg px-3.5 py-3 bg-[rgba(20,20,20,1)] border border-[rgba(38,38,38,1)]">
              <Message />
              <input type="email" placeholder="Enter Your Email" className='w-full text-[#999999] outline-0'/>
              <button type="submit">
                <Send />
              </button>
            </form>
          </div>
          <div className='hidden w-full gap-3 md:flex md:justify-between'>

            {footerLinks.map((section) => (
              <div key={section.title} className='flex-1'>
                <h3 className='text-[16px] mb-2.5 text-[#999999]'>{section.title}</h3>
                <ul className='list-none p-0'>
                  {section.items.map((item) => (
                    <li key={item} className='text-white no-underline mb-2.5 block text-base'>{item}</li>
                  ))}
                </ul>
              </div>
            ))}

          </div>
          <div className='w-full gap-3 grid grid-cols-2 md:hidden'>
            <div>
              <h3 className='text-[16px] mb-2.5 text-[#999999]'>Home</h3>
              <ul className='list-none p-0'>
                <li className='text-white no-underline mb-2.5 block text-[14px]'>Hero Section</li>
                <li className='text-white no-underline mb-2.5 block text-[14px]'>Features</li>
                <li className='text-white no-underline mb-2.5 block text-[14px]'>Properties</li>
                <li className='text-white no-underline mb-2.5 block text-[14px]'>Testimonials</li>
                <li className='text-white no-underline mb-2.5 block text-[14px]'>FAQs</li>
              </ul>
            </div>

            <div>
              <h3 className='text-[16px] mb-2.5 text-[#999999]'>About Us</h3>
              <ul>
                <li className='text-white no-underline mb-2.5 block text-[14px]'>Our Story</li>
                <li className='text-white no-underline mb-2.5 block text-[14px]'>Our Works</li>
                <li className='text-white no-underline mb-2.5 block text-[14px]'>How It Works</li>
                <li className='text-white no-underline mb-2.5 block text-[14px]'>Our Team</li>
                <li className='text-white no-underline mb-2.5 block text-[14px]'>Our Clients</li>
              </ul>
            </div>

            <div className='grid gap-3'>
              <div>
                <h3 className='text-[16px] mb-2.5 text-[#999999]'>Properties</h3>
                <ul>
                  <li className='text-white no-underline mb-2.5 block text-[14px]'>Portfolio</li>
                  <li className='text-white no-underline mb-2.5 block text-[14px]'>Categories</li>
                </ul>
              </div>
              <div>
                <h3 className='text-[16px] mb-2.5 text-[#999999]'>Contact Us</h3>
                <ul>
                  <li className='text-white no-underline mb-2.5 block text-[14px]'>Contact Form</li>
                  <li className='text-white no-underline mb-2.5 block text-[14px]'>Our Offices</li>
                </ul>
              </div>
            </div>

            <div>
              <h3 className='text-[16px] mb-2.5 text-[#999999]'>Services</h3>
              <ul>
                <li className='text-white no-underline mb-2.5 block text-[14px]'>Valuation Mastery</li>
                <li className='text-white no-underline mb-2.5 block text-[14px]'>Strategic Marketing</li>
                <li className='text-white no-underline mb-2.5 block text-[14px]'>Negotiation Wizardry</li>
                <li className='text-white no-underline mb-2.5 block text-[14px]'>Closing Success</li>
                <li className='text-white no-underline mb-2.5 block text-[14px]'>Property Management</li>
              </ul>
            </div>
          </div>

        </section>
        <section>
          <div className='w-full bg-[rgba(20,20,20,1)] text-center py-4 border-t border-[rgba(38,38,38,1)] text-[#999999] text-sm relative'>
            <p>© 2024 Estatein. All rights reserved. | Privacy Policy | Terms of Service</p>
          </div>
        </section>
    </footer>
  )
}
