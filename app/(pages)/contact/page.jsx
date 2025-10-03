'use client';
import React, { useState } from 'react'
import Image from 'next/image';

// Components
import HeroSection from '@/app/components/web/common/HeroSection/page.jsx'
import ServiceCard from '@/app/components/web/common/ServiceCard/page';
import FormSelector from '@/app/components/web/common/FormSelector/page.jsx';

// icons
import StarIcon from '@/app/styles/svg/StarsIcon.jsx';
import Email from '@/app/styles/svg/Email';
import Phone from '@/app/styles/svg/Phone';
import Location from '@/app/styles/svg/Location';
import Socials from '@/app/styles/svg/Socials';
import EmailIcon from '@/app/styles/svg/MiniEmail.jsx';
import PhoneIcon from '@/app/styles/svg/MiniPhone.jsx';
import LocationIcon from '@/app/styles/svg/LocationIcon.jsx';

// Images
import Img1 from '@/public/img/contact-1.png';
import Img2 from '@/public/img/contact-2.png';
import Img3 from '@/public/img/contact-3.png';
import Img4 from '@/public/img/contact-4.png';
import Img5 from '@/public/img/contact-5.png';
import Img6 from '@/public/img/contact-6.png';

export default function Contact() {

  const [selectedValues, setSelectedValues] = useState({}); // record: title -> selected value
  const [selectedFilter, setSelectedFilter] = useState('All');

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
  };

  const activeButton = {
    gap: '8px',
    borderRadius: '10px',
    border: '1px solid rgba(38, 38, 38, 1)',
    backgroundColor: 'rgba(20, 20, 20, 1)',
  };

  const nonActiveButton = {
    gap: '8px',
    borderRadius: '10px',
    border: '1px solid rgba(38, 38, 38, 1)',
    backgroundColor: 'transparent',
  };
  
  const content = [
    {
      title: "Get in Touch with Estatein",
      desc: "Welcome to Estatein's Contact Us page. We're here to assist you with any inquiries, requests, or feedback you may have."
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

  const locations = [
  {
    id: "hq",
    filter: "International",
    title: "Main Headquarters",
    address: "123 Estatein Plaza, City Center, Metropolis",
    description:
      "Our main headquarters serve as the heart of Estatein. Located in the bustling city center, this is where our core team of experts operates, driving the excellence and innovation that define us.",
    email: "info@estatein.com",
    phone: "+1 (123) 628-7890",
    city: "Metropolis",
  },
  {
    id: "regional",
    filter: "Regional",
    title: "Regional Offices",
    address: "456 Urban Avenue, Downtown District, Metropolis",
    description:
      "Estatein’s presence extends to multiple regions, each with its own dynamic real estate landscape. Discover our regional offices, staffed by local experts who understand the nuances of their respective markets.",
    email: "info@estatein.com",
    phone: "+1 (123) 456 7890",
    city: "Metropolis",
  },
];

  const handleSelect = (title, value) => {
    setSelectedValues((prev) => ({ ...prev, [title]: value }));
  };
  
  return (
    <main id='page-4' className=''>
      <section className="bg-[#141414] bg-[linear-gradient(95.93deg,#262626_-26.82%,rgba(38,38,38,0)_40.46%)] border-b border-b-[#262626] md:pr-32 md:pl-16 md:py-24 px-4 py-12">
          <HeroSection title={content[0].title} desc={content[0].desc} />
        </section>

        <section className="w-full grid grid-cols-2 md:grid-cols-4 gap-2.5 p-2.5 bg-[#141414] border border-[#262626] shadow-[0_0_0_6px_rgba(25,25,25,1)]">
                  {/* Service Section */}
                  {services.map((item, idx) => {
                    return (
                      <div className="w-full h-full" key={idx}>
                        <ServiceCard title={item.title} icon={item.icon} />
                      </div>
                    );
                  })}
        </section>

          <section className="w-full grid bg-[rgb(20,20,20)] gap-10 px-4 md:px-16 py-10">
            <div className="w-full grid h-fit">
                {/* Header */}
                <StarIcon />
                <div className="w-full flex items-center justify-between">
                <aside className="grid gap-1 md:max-w-5xl">
                    <h1 className="font-semibold text-[28px] md:text-[38px] leading-[150%] tracking-normal text-white p">
                    Let's Connect
                    </h1>
                    <p className="text-[#999999] font-medium text-[14px] md:text-base leading-[150%] tracking-normal">
                    We're excited to connect with you and learn more about your real estate goals. Use the form below to get in touch with Estatein. Whether you're a prospective client, partner, or simply curious about our services, we're here to answer your questions and provide the assistance you need.
                    </p>
                </aside>
            </div>
        </div>

        <form
  // onSubmit={handleSubmit(onSubmit)}
  className="w-full mx-auto grid gap-6 p-5 md:p-8 rounded-2xl border border-[#262626] shadow-lg"
>
  {/* Row 1 */}
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    <div className="flex flex-col gap-2">
      <label className="font-semibold text-[16px] text-white">First Name</label>
      <input
        type="text"
        placeholder="Enter First Name"
        required
        className="w-full px-3 py-2 rounded-lg bg-[#141414] border border-[#262626] text-gray-200 placeholder-gray-500 focus:outline-none focus:border-[#999999]"
      />
    </div>

    <div className="flex flex-col gap-2">
      <label className="font-semibold text-[16px] text-white">Last Name</label>
      <input
        type="text"
        placeholder="Enter Last Name"
        required
        className="w-full px-3 py-2 rounded-lg bg-[#141414] border border-[#262626] text-gray-200 placeholder-gray-500 focus:outline-none focus:border-[#999999]"
      />
    </div>

    <div className="flex flex-col gap-2">
      <label className="font-semibold text-[16px] text-white">Email</label>
      <input
        type="email"
        placeholder="Enter your Email"
        required
        className="w-full px-3 py-2 rounded-lg bg-[#141414] border border-[#262626] text-gray-200 placeholder-gray-500 focus:outline-none focus:border-[#999999]"
      />
    </div>
  </div>

  {/* Row 2 */}
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    <div className="flex flex-col gap-2">
      <label className="font-semibold text-[16px] text-white">Phone Number</label>
      <input
        type="tel"
        placeholder="Enter Phone Number"
        required
        className="w-full px-3 py-2 rounded-lg bg-[#141414] border border-[#262626] text-gray-200 placeholder-gray-500 focus:outline-none focus:border-[#999999]"
      />
    </div>

    <FormSelector
      title="Inquiry Type"
      options={["Buying", "Renting", "Selling"]}
      value={selectedValues["Inquiry Type"]}
      onChange={(val) => handleSelect("Inquiry Type", val)}
    />

    <FormSelector
      title="How did you hear about us?"
      options={["Google", "Social Media", "Friend / Referral", "Other"]}
      value={selectedValues["How did you hear about us?"]}
      onChange={(val) => handleSelect("How did you hear about us?", val)}
    />
  </div>

  {/* Message */}
  <div className="flex flex-col gap-2">
    <label className="font-semibold text-[16px] text-white">Message</label>
    <textarea
      placeholder="Enter Your Message Here..."
      className="w-full h-32 px-3 py-2 rounded-lg bg-[#141414] border border-[#262626] text-gray-200 placeholder-gray-500 focus:outline-none focus:border-[#999999] resize-none"
    />
  </div>

  {/* Terms + Submit */}
  <div className="grid md:flex flex-col md:flex-row items-start md:items-center justify-start gap-4">
    <label className="flex justify-start md:items-center gap-0.5 md:gap-2 text-gray-400 text-sm">
      <input
        type="checkbox"
        required
        className="w-4 h-4 rounded border-[#262626] bg-[#141414] accent-[#703bf7]"
      />
      I agree with <span className="underline">Terms of Use</span> and
      <span className="underline">Privacy Policy</span>
    </label>
    <button
      type="submit"
      className="px-6 py-2 rounded-lg bg-[#703bf7] text-white font-medium hover:bg-[#5b2fd6] transition"
    >
      Send your Message
    </button>
  </div>
</form>


          </section>

        <section className="w-full grid bg-[rgb(20,20,20)] gap-10 px-4 md:px-16 py-10">
            <div className="w-full grid h-fit">
                {/* Header */}
                <StarIcon />
                <div className="w-full flex items-center justify-between">
                  <aside className="grid gap-1 md:max-w-5xl">
                      <h1 className="font-semibold text-[28px] md:text-[38px] leading-[150%] tracking-normal text-white p">
                      Discover Our Office Locations
                      </h1>
                      <p className="text-[#999999] font-medium text-[14px] md:text-base leading-[150%] tracking-normal">
                      Estatein is here to serve you across multiple locations. Whether you're looking to meet our team, discuss real estate opportunities, or simply drop by for a chat, we have offices conveniently located to serve your needs. Explore the categories below to find the Estatein office nearest to you.
                      </p>
                  </aside>
                </div>
              </div>

        <div className='w-full grid gap-6'>
          {/* Filter Buttons */}
          <div className='w-fit bg-[#1A1A1A] p-2.5 rounded-lg gap-2.5 flex text-white'>
            <button 
              className='w-full border border-[rgba(38,38,38,1)] rounded-lg px-5 py-4 font-medium text-[14px] leading-[150%] tracking-[0] text-center'
              style={selectedFilter === "All" ? activeButton : nonActiveButton}
              onClick={() => handleFilterChange("All")}
            >
              All
            </button>
            <button
              className='w-full border border-[rgba(38,38,38,1)] rounded-lg px-5 py-4 font-medium text-[14px] leading-[150%] tracking-[0] text-center'
              style={selectedFilter === "Regional" ? activeButton : nonActiveButton}
              onClick={() => handleFilterChange("Regional")}
            >
              Regional
            </button>
            <button
              className='w-full border border-[rgba(38,38,38,1)] rounded-lg px-5 py-4 font-medium text-[14px] leading-[150%] tracking-[0] text-center'
              style={selectedFilter === "International" ? activeButton : nonActiveButton}
              onClick={() => handleFilterChange("International")}
            >
              International
            </button>
          </div>

          {/* Filtered Content */}
          <div className='w-full grid gap-5 md:grid-cols-2'>
              {locations
                .filter(
                  (loc) =>
                    selectedFilter === "All" || selectedFilter === loc.filter
                )
                .map((loc) => (
                  <div key={loc.id} className='w-full grid p-5 gap-5 md:gap-7.5 md:p-7.5 border border-[rgba(38,38,38,1)] bg-[rgba(20,20,20,1)] rounded-lg'>
                    <aside className='w-full grid gap-2'>
                      <div className='w-full grid gap-1.5 text-white'>
                        <h2 className='<p class="font-urbanist font-medium text-[14px] leading-[150%] tracking-[-0.006em]'>{loc.title}</h2>
                        <p className='font-semibold text-[22px] leading-[150%] tracking-[0em]'>{loc.address}</p>
                      </div>

                      <p className='text-[rgba(153,153,153,1)] font-medium text-[14px] md:text-[16px] leading-[150%] tracking-[-0.006em]'>{loc.description}</p>
                    </aside>

                    <div className='grid gap-2 md:flex md:gap-1.5 text-white'>
                      <span className='border border-[rgba(38,38,38,1)] bg-[rgba(26,26,26,1)] rounded-[28px] px-4 py-2.5 flex items-center justify-center text-[14px] leading-[150%] tracking-[-0.006em] gap-1'>
                        <EmailIcon /> {loc.email}
                      </span>
                      <span className='border border-[rgba(38,38,38,1)] bg-[rgba(26,26,26,1)] gap-1 rounded-[28px] px-4 py-2.5 flex items-center justify-center text-[14px] leading-[150%] tracking-[-0.006em]'>
                        <PhoneIcon /> {loc.phone}
                      </span>
                      <span className='border border-[rgba(38,38,38,1)] bg-[rgba(26,26,26,1)] gap-1 rounded-[28px] px-4 py-2.5 flex items-center justify-center text-[14px] leading-[150%] tracking-[-0.006em]'>
                        <LocationIcon color='white'/> {loc.city}
                      </span>
                    </div>

                    <button className='rounded-lg px-5 py-3.5 bg-[rgba(112,59,247,1)] text-white'>Get Direction</button>
                  </div>
                ))}
            </div>
        </div>

        </section>

        <section className='w-full px-4 py-10 md:px-16 bg-[rgb(20,20,20)]'>
          <div 
            className='w-full grid gap-5 p-4 md:p-10 bg-[rgba(26,26,26,1)] border border-[rgba(38,38,38,1)] rounded-xl'
            style={{
                backgroundImage: "url('/abstract-design.svg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
               
              }}>
            <div className='w-full grid grid-cols-2 gap-2.5 md:gap-5'>
              <div className=' w-full grid gap-2.5 md:gap-5'>
                <Image src={Img1} alt='Img1'/>
                <Image src={Img2} alt='Img2'/>
              </div>
              <div className='w-full grid gap-2.5 md:gap-5'>
                <Image src={Img3} alt='Img3'/>
                <div className='w-full grid grid-cols-2 gap-2.5 md:gap-5'>
                  <Image src={Img4} alt='Img4'/>
                  <Image src={Img5} alt='Img5'/>
                </div>
              </div>
            </div>
            <div className='w-full grid md:grid-cols-2 gap-5'>

              <aside className="w-full grid gap-1 overflow-hidden h-fit">
                  {/* Header */}
                  <StarIcon />
                        <h1 className="font-semibold text-[28px] md:text-[38px] leading-[150%] tracking-[0] text-white p">
                        Explore Estatein's World
                        </h1>
                        <p className="text-[#999999] font-medium text-[14px] md:text-[16px] leading-[150%] tracking-[0]">
                        Step inside the world of Estatein, where professionalism meets warmth, and expertise meets passion. Our gallery offers a glimpse into our team and workspaces, inviting you to get to know us better.
                        </p>
              </aside>
              <Image src={Img6} alt='Img6'/>
            </div>
          </div>
        </section>

    </main>
  )
}
