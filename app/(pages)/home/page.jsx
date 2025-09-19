"use client";
import React, { useState, useEffect } from 'react'
import Link from "next/link";
import Image from 'next/image';

// components
import ServiceCard from '@/app/components/web/common/ServiceCard/page.jsx';

// shadcn comps
import { Button } from "@/components/ui/button";

// icons
import HomeIcon from '@/app/styles/svg/HomeIcon.jsx';
import CaptureIcon from '@/app/styles/svg/CaptureIcon.jsx';
import PropertyIcon from '@/app/styles/svg/PropertyIcon.jsx';
import SunriseIcon from '@/app/styles/svg/SunriseIcon.jsx';
import StarIcon from '@/app/styles/svg/StarsIcon.jsx';

// import image
import HomeBanner from '@/public/img/home-banner.png';
import BannerTag from '@/app/styles/svg/BannerTag.jsx';

// import slider
import Slider from '@/app/components/web/common/Slider/page';

// fetch data
import getProperty from '@/app/action/getProperty.js';
import getBlog from '@/app/action/getBlogs.js';
import getReview from '@/app/action/getReview.js';
import { StarsIcon } from 'lucide-react';
export default function Home() {

  const [customer, setCustomer] = useState(0);
  const [propertyData, setPropertyData] = useState([]);
  const [blogData, setBlogData] = useState([]);
  const [reviewData, setReviewData] = useState([]);


  const content = [
    { 
      title: "Featured Properties", 
      desc: "Explore our handpicked selection of featured properties. Each listing offers a glimpse into exceptional homes and investments available through Estatein. Click 'View Details' for more information.",
      button: "View All Properties",
      type: "property",
      data: propertyData
    },
    { 
      title: "What Our Clients Say", 
      desc: "Read the success stories and heartfelt testimonials from our valued clients. Discover why they chose Estatein for their real estate needs.",
      button: "View All Testimonials",
      type: "review",
      data: reviewData
    },
    { 
      title: "Frequently Asked Questions", 
      desc: "Find answers to common questions about Estatein’s services, property listings, and the real estate process. We're here to provide clarity and assist you every step of the way.",
      button: "View All FAQ's",
      type: "blog",
      data: blogData
    },
  ];

  const stats = [
    {
      key: "customer", // give it a key
      value: 200, // target value
      label: "Happy Customers",
    },
    {
      key: "properties",
      value: "10k",
      label: "Properties For Clients",
    },
    {
      key: "experience",
      value: 16,
      label: "Years of Experience",
    },
  ];
  
  
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
  
  useEffect(() => {
    if (customer < 200) {
      const timer = setTimeout(() => setCustomer(customer + 1), 20);
      return () => clearTimeout(timer);
    }
  }, [customer]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resProperty = await getProperty();
        setPropertyData(resProperty.data || resProperty);
        
        const resReview = await getReview();
        setReviewData(resReview.data || resReview);

        const resBlog = await getBlog(); // 👈 make sure you have this API function
        setBlogData(resBlog.data || resBlog);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  return (
      <>
        <main id='page-1' className='bg-[#141414] grid'>
          <section >
            {/* Banner Tag */}
            <div className='w-32 h-32 absolute top-48 left-1/2 z-10'>
              <BannerTag />
            </div>

            {/* Hero Section */}
            <div className='w-full grid grid-cols-2 bg-[rgb(20,20,20)] pl-16 gap-14'>
              {/* Banner Content Section */}
              <div className='flex flex-col justify-center gap-8'>
                <div className='grid gap-5'>
                  <h1 className='font-semibold text-[46px] leading-[120%] tracking-normal text-white'>Discover Your Dream Property with Estatein</h1>
                  <p className='font-medium text-base leading-[150%] tracking-normal text-[#999999]'>
                    Your journey to finding the perfect property begins here. Explore our
                    listings to find the home that matches your dreams.
                  </p>
                </div>

                {/* Buttons */}
                <div className='flex items-center gap-3'>
                  <Button asChild>
                    <Link 
                      href="/about"
                      className='border border-[rgba(38,38,38,1)] text-white px-5 py-3.5 font-medium text-sm leading-[150%] tracking-normal'
                    >Learn More</Link>
                  </Button>
                  <Button asChild>
                    <Link 
                      href="/properties"
                      className='font-medium text-sm leading-[150%] tracking-normal bg-[#703bf7] border border-[#703bf7] text-white px-5 py-3.5'
                    >Browse Properties</Link>
                  </Button>
                </div>

                {/* Features */}
                <div className='grid grid-cols-3 gap-5 text-white'>
                  {stats.map((stat, index) => (
                    <div
                      key={index}
                      className="grid gap-0.5 px-3 py-3.5 bg-[rgba(26,26,26,1)] border border-[rgba(38,38,38,1)] rounded-lg"
                    >
                      <h6 className="font-bold text-[30px] leading-[150%] tracking-normal">
                        {stat.key === "customer" ? customer : stat.value}+
                      </h6>
                      <p className="text-[#999999] font-medium text-base leading-[150%] tracking-normal">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Banner Image */}
              <div>
                <div className='hero-image p-[1px]'>
                  <Image src={HomeBanner} alt="Banner" />
                </div>
              </div>
            </div>
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

          {content.map((section, idx) => (
              <section key={idx} className="w-full grid bg-[rgb(20,20,20)] gap-1 px-16 py-10">
                {/* Header */}
                <StarIcon />
                <div className="w-full flex items-center justify-between">
                  <aside className="grid gap-2 max-w-5xl">
                    <h1 className="font-semibold text-[38px] leading-[150%] tracking-normal text-white">
                      {section.title}
                    </h1>
                    <p className="text-[#999999] font-medium text-base leading-[150%] tracking-normal">
                      {section.desc}
                    </p>
                  </aside>

                  <aside className="flex items-center gap-3">
                    <Button asChild>
                      <Link
                        href="/about"
                        className="border border-[rgba(38,38,38,1)] text-white px-5 py-3.5 font-medium text-sm leading-[150%] tracking-normal"
                      >
                        {section.button}
                      </Link>
                    </Button>
                  </aside>
                </div>

                {/* Slider */}
                <div className="w-full grid grid-cols-3">
                  <Slider type={section.type} data={section.data} />
                </div>
              </section>
          ))}
        

        </main>
      </>
  )
}
