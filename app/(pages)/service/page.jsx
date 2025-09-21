
import React from 'react'
import ServicePageCard from "@/app/components/web/common/ServicePageCard/page.jsx";


import HeroSection from '@/app/components/web/common/HeroSection/page.jsx'
import ServiceCard from '@/app/components/web/common/ServiceCard/page';


import CaptureIcon from '@/app/styles/svg/CaptureIcon';
import HomeIcon from '@/app/styles/svg/HomeIcon';
import PropertyIcon from '@/app/styles/svg/PropertyIcon';
import SunriseIcon from '@/app/styles/svg/SunriseIcon';
import Chart from '@/app/styles/svg/Chart';
import PieChart from '@/app/styles/svg/PieChart';
import Phone from '@/app/styles/svg/Phone';
import Balance from '@/app/styles/svg/Balance';

export default function Service() {
  
  const content = [
    {
      title: "Elevate Your Real Estate Experience",
      desc: "Welcome to Estatein, where your real estate aspirations meet expert guidance. Explore our comprehensive range of services, each designed to cater to your unique needs and dreams."
    }
  ]

  const services = [
    {
      title: "Find Your Dream Home",
      icon: <HomeIcon />,
    },
    {
      title: "Unlock Property Value",
      icon: <CaptureIcon />,
    },
    {
      title: "Effortless Property Management",
      icon: <PropertyIcon />,
    },
    {
      title: "Smart Investments, Informed Decisions",
      icon: <SunriseIcon />,
    },
  ];
  
  const propertyServices = [
  { 
    title: "Valuation Mastery",
    icon:<Chart/>,
    description: "Discover the true worth of your property with our expert valuation services."
  },
  {
    title: "Strategic Marketing",
    icon:<PieChart/>,
    description: "Selling a property requires more than just a listing; it demands a strategic marketing."
  },
  {
    title: "Negotiation Wizardry",
    icon:<Balance/>,
    description: "Negotiating the best deal is an art, and our negotiation experts are masters of it."
  },
  {
    title: "Closing Success",
    icon:"",
    description: "A successful sale is not complete until the closing. We guide you through the intricate closing process."
  },
  {
    title: "Unlock the Value of Your Property Today",
    description: "Ready to unlock the true value of your property? Explore our Property Selling Service categories and let us help you achieve the best deal possible for your valuable asset.",
    button: "Learn More"
  }
];

  return (
    <main id='page-4' className=''>
      <section className="bg-[#141414] bg-[linear-gradient(95.93deg,#262626_-26.82%,rgba(38,38,38,0)_40.46%)] border-b border-b-[#262626] pr-40 pl-16 py-24">
          <HeroSection title={content[0].title} desc={content[0].desc} />
        </section>

        <section className='w-full grid grid-cols-4 gap-2.5 p-2.5 bg-[#141414] border border-[#262626] shadow-[0_0_0_6px_rgba(25,25,25,1)]'>
            {/* Service Section */}
            {services.map((item, idx) => {
            return (
              <div className='w-full h-full' key={idx}>
                <ServiceCard title={item.title} icon={item.icon} />
              </div>
            );
          })}
          </section>

          <section className='section-1'>
<div className="content">
  <h1 className='text-2xl text-semibold'>Unlock Property Value</h1>
  <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Amet itaque totam magnam nam aperiam explicabo, minus odio nobis porro, voluptates modi quo obcaecati? Ut praesentium, voluptates natus est perferendis molestiae.</p>
</div>
<div className="cards grid px-9 grid-cols-10">
  {propertyServices.map((card,ind)=>(
<div className="col-span-3 mt-6"  key={ind}>

  <ServicePageCard description = {card.description} icon = {card.icon} title = {card.title}/>
</div>
  ))}
  
</div>
          </section>

    </main>
  )
}
