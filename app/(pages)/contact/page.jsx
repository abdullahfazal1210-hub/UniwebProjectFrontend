import React from 'react'


import HeroSection from '@/app/components/web/common/HeroSection/page.jsx'
import ServiceCard from '@/app/components/web/common/ServiceCard/page';


import Email from '@/app/styles/svg/Email';
import Phone from '@/app/styles/svg/Phone';
import Location from '@/app/styles/svg/Location';
import Socials from '@/app/styles/svg/Socials';

export default function Contact() {
  
  const content = [
    {
      title: "Get in Touch with Estatein",
      desc: "Welcome to Estatein's Contact Us page. We're here to assist you with any inquiries, requests, or feedback you may have. Whether you're looking to buy or sell a property, explore investment opportunities, or simply want to connect, we're just a message away. Reach out to us, and let's start a conversation."
    }
  ]

  const services = [
    {
      title: "info@estatein.com",
      icon: <Email />,
    },
    {
      title: "+1 (123) 456-7890",
      icon: <Phone />,
    },
    {
      title: "Main Headquarters",
      icon: <Location />,
    },
    {
      title: "Instagram LinkedIn Facebook",
      icon: <Socials />,
    },
  ];
  
  return (
    <main id='page-4' className=''>
      <section className="bg-[#141414] bg-[linear-gradient(95.93deg,#262626_-26.82%,rgba(38,38,38,0)_40.46%)] border-b border-b-[#262626] pr-32 pl-16 py-24">
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
