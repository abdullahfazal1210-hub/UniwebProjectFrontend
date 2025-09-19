
import React from 'react'


import HeroSection from '@/app/components/web/common/HeroSection/page.jsx'
import ServiceCard from '@/app/components/web/common/ServiceCard/page';


import CaptureIcon from '@/app/styles/svg/CaptureIcon';
import HomeIcon from '@/app/styles/svg/HomeIcon';
import PropertyIcon from '@/app/styles/svg/PropertyIcon';
import SunriseIcon from '@/app/styles/svg/SunriseIcon';

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

    </main>
  )
}
