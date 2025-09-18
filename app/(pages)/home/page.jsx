"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

// components
import ServiceCard from "@/app/components/web/common/ServiceCard/page.jsx";

// shadcn comps
import { Button } from "@/components/ui/button";

// icons
import HomeIcon from "@/app/styles/svg/HomeIcon.jsx";
import CaptureIcon from "@/app/styles/svg/CaptureIcon.jsx";
import PropertyIcon from "@/app/styles/svg/PropertyIcon.jsx";
import SunriseIcon from "@/app/styles/svg/SunriseIcon.jsx";

// import image
import HomeBanner from "@/public/img/home-banner.png";
import BannerTag from "@/app/styles/svg/BannerTag.jsx";
import StatsCard from "@/app/components/web/common/StatsCard";

export default function Home() {
  const stats = [
    {
      value: "200+",
      label: "Happy Customers",
    },
    {
      value: "10k+",
      label: "Properties For Clients",
    },
    {
      value: "16+",
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

  return (
    <>
      <main id="page-1">
        <section>
          {/* Banner Tag */}
          <div className="w-32 h-32 absolute top-48 left-1/2 z-10">
            <BannerTag />
          </div>

          {/* Hero Section */}
          <div className="w-full grid grid-cols-2 bg-[rgb(20,20,20)] pl-16 gap-14">
            {/* Banner Content Section */}
            <div className="flex flex-col justify-center gap-8">
              <div className="grid gap-5">
                <h1 className="font-semibold text-[46px] leading-[120%] tracking-normal text-white">
                  Discover Your Dream Property with Estatein
                </h1>
                <p className="font-medium text-base leading-[150%] tracking-normal text-[#999999]">
                  Your journey to finding the perfect property begins here.
                  Explore our listings to find the home that matches your
                  dreams.
                </p>
              </div>

              {/* Buttons */}
              <div className="flex items-center gap-3">
                <Button asChild>
                  <Link
                    href="/about"
                    className="border border-[rgba(38,38,38,1)] text-white px-5 py-3.5 font-medium text-sm leading-[150%] tracking-normal"
                  >
                    Learn More
                  </Link>
                </Button>
                <Button asChild>
                  <Link
                    href="/properties"
                    className="font-medium text-sm leading-[150%] tracking-normal bg-[#703bf7] border border-[#703bf7] text-white px-5 py-3.5"
                  >
                    Browse Properties
                  </Link>
                </Button>
              </div>

              {/* Features */}
              <div className="grid grid-cols-3 gap-5 text-white">
                {stats.map((stat, index) => (
                  <StatsCard key={index} stat={stat} />
                ))}
              </div>
            </div>

            {/* Banner Image */}
            <div>
              <div className="hero-image p-[1px]">
                <Image src={HomeBanner} alt="Banner" />
              </div>
            </div>
          </div>
        </section>

        <section className="w-full grid grid-cols-4 gap-2.5 p-2.5 bg-[#141414] border border-[#262626] shadow-[0_0_0_6px_rgba(25,25,25,1)]">
          {/* Service Section */}
          {services.map((item, idx) => {
            return (
              <div className="w-full h-full" key={idx}>
                <ServiceCard title={item.title} icon={item.icon} />
              </div>
            );
          })}
        </section>
      </main>
    </>
  );
}
