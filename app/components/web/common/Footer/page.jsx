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
      <section className="w-full bg-[rgba(20,20,20)] px-16 py-20 flex relative promotion-section">
        <div className='w-3/4 text-start grid gap-2'>
          <h2 className='text-4xl font-semibold text-white'>Start Your Real State Journey Today</h2>
          <p className='text-[16px] font-medium text-[#999999]'>Your dream property is just a click away. Whether you`re looking for a new home, a strategic investment, or expert real estate advice, Estatein is here to assist you every step of the way. Take the first step towards your real estate goals and explore our available properties or get in touch with our team for personalized assistance.</p>
        </div>
        <div className='w-1/4 flex items-center justify-end'>
          <Button asChild >
              <Link 
                href="/properties"
                className='bg-[#703bf7] border border-[#703bf7] text-sm text-white px-5 py-3 rounded-b-md font-medium z-30'
              >Explore Properties</Link>
            </Button>
        </div>
      </section>
      <section className='w-full bg-[rgba(20,20,20)] px-16 py-14 flex justify-between gap-16 border-t border-[rgba(38,38,38,1)] relative'>
          <div className="flex flex-col gap-4">
            <div>
              <Logo />
            </div>
            <form className="flex items-center justify-evenly gap-2 rounded-lg px-3.5 py-3 bg-[rgba(20,20,20,1)] border border-[rgba(38,38,38,1)]">
              <Message />
              <input type="email" placeholder="Enter Your Email" className='w-fit text-[#999999] outline-0'/>
              <button type="submit">
                <Send />
              </button>
            </form>
          </div>
          <div className='w-full flex justify-between'>

            {footerLinks.map((section) => (
              <div key={section.title} className='flex-1'>
                <h3 className='text-lg mb-2.5 text-[#999999]'>{section.title}</h3>
                <ul className='list-none p-0'>
                  {section.items.map((item) => (
                    <li key={item} className='text-white no-underline mb-2.5 block text-base"'>{item}</li>
                  ))}
                </ul>
              </div>
            ))}

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
