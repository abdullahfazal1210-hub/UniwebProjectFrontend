import React from "react";
import ServicePageCard from "@/app/components/web/common/ServicePageCard/page.jsx";

import HeroSection from "@/app/components/web/common/HeroSection/page.jsx";
import ServiceCard from "@/app/components/web/common/ServiceCard/page";

import CaptureIcon from "@/app/styles/svg/CaptureIcon";
import HomeIcon from "@/app/styles/svg/HomeIcon";
import PropertyIcon from "@/app/styles/svg/PropertyIcon";
import SunriseIcon from "@/app/styles/svg/SunriseIcon";
import Chart from "@/app/styles/svg/Chart";
import PieChart from "@/app/styles/svg/PieChart";
import Phone from "@/app/styles/svg/Phone";
import Balance from "@/app/styles/svg/Balance";
import StarsIcon from "@/app/styles/svg/StarsIcon";
import Maintenance from "@/app/styles/svg/Maintenance";
import StarIcon from "@/app/styles/svg/StarIcon";
import Star from "@/app/styles/svg/Star";

import Alert from "@/app/styles/svg/Alert";
import Sparkling from "@/app/styles/svg/Sparkling";
import Tenant from "@/app/styles/svg/Tenant";
import ROI from "@/app/styles/svg/ROI";
import Strategy from "@/app/styles/svg/Strategy";

export default function Service() {
  const informDecisions = [
  {
    "title": "Market Insight",
    "icon": <Chart />,
    "description": "Stay ahead of market trends with our expert Market Analysis. We provide in-depth insights into real estate market conditions"
  },
  {
    "title": "ROI Assessment",
    "icon": <ROI/>,
    "description": "Make investment decisions with confidence. Our ROI Assessment services evaluate the potential returns on your investments"
  },
  {
    "title": "Customized Strategies",
    "icon": <Strategy/>,
    "description": "Every investor is unique, and so are their goals. We develop Customized Investment Strategies tailored to your specific needs"
  },
  {
    "title": "Diversification Mastery",
    "icon": <SunriseIcon />,
    "description": "Diversify your real estate portfolio effectively. Our experts guide you in spreading your investments across various property types and locations"
  }
]

  const content = [
    {
      title: "Elevate Your Real Estate Experience",
      desc: "Welcome to Estatein, where your real estate aspirations meet expert guidance. Explore our comprehensive range of services, each designed to cater to your unique needs and dreams.",
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

  const propertyServices = [
    {
      title: "Valuation Mastery",
      icon: <Chart />,
      description:
        "Discover the true worth of your property with our expert valuation services.",
    },
    {
      title: "Strategic Marketing",
      icon: <PieChart />,
      description:
        "Selling a property requires more than just a listing; it demands a strategic marketing.",
    },
    {
      title: "Negotiation Wizardry",
      icon: <Balance />,
      description:
        "Negotiating the best deal is an art, and our negotiation experts are masters of it.",
    },
    {
      title: "Closing Success",
      icon: <Alert />,
      description:
        "A successful sale is not complete until the closing. We guide you through the intricate closing process.",
    },
  ];

  const propertyManagementServices = [
    {
      title: "Tenant Harmony",
      description:
        "Our Tenant Management services ensure that your tenants have a smooth and reducing vacancies.",
      icon: <Tenant />,
    },
    {
      title: "Maintenance Ease",
      description:
        "Say goodbye to property maintenance headaches. We handle all aspects of property upkeep.",
      icon: <Maintenance />,
    },
    {
      title: "Financial Peace of Mind",
      description:
        "Managing property finances can be complex. Our financial experts take care of rent collection.",
      icon: <Sparkling />,
    },
    {
      title: "Legal Guardian",
      description:
        "Stay compliant with property laws and regulations effortlessly.",
      icon: <SunriseIcon />,
    },
  ];

  return (
    <main id="page-4" className="">
      <section className="bg-[#141414] bg-[linear-gradient(95.93deg,#262626_-26.82%,rgba(38,38,38,0)_40.46%)] border-b px-5 py-5 border-b-[#262626] md:pr-40 md:pl-16 md:py-24">
        <HeroSection title={content[0].title} desc={content[0].desc} />
      </section>

      <section className="w-full grid grid-cols-1 md:grid-cols-4 gap-2.5 p-2.5 bg-[#141414] border border-[#262626] shadow-[0_0_0_6px_rgba(25,25,25,1)]">
        {/* Service Section */}
        {services.map((item, idx) => {
          return (
            <div className="w-full  h-full" key={idx}>
              <ServiceCard title={item.title} icon={item.icon} />
            </div>
          );
        })}
      </section>

      <section className="section-1  h-full   bg-[#141414]">
        <div className=" md:pr-40 md:pl-16 px-5 py-12 ">
          <StarsIcon />

          <h1 className="md:text-4xl ms-2  md:ms-3 text-2xl font-semibold text-white">
            Unlock Property Value
          </h1>
          <p className="text-[#828282] ms-2 md:w-[80%]  md:ms-3  text-[15px] mt-5">
            {}
            Selling your property should be a rewarding experience, and at
            Estatein, we make sure it is. <span className="hidden md:block"> Our Property Selling Service is
            designed to maximize the value of your property, ensuring you get
            the best deal possible. Explore the categories below to see how we
            can help you at every step of your selling journey. </span>
          </p>
        </div>{" "}
        <div className="cards px-5 grid md:px-20 md:gap-6 gap-3 md:mt-7 grid-cols-9">
          {propertyServices.map((card, ind) => (
            <div className="md:col-span-3   col-span-9" key={ind}>
              <ServicePageCard
                description={card.description}
                icon={card.icon}
                title={card.title}
              />
            </div>
          ))}

          <div className="md:col-span-6 flex  col-span-9  justify-center">
            <div
              style={{
                backgroundImage: "url('/abstract-design.svg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                width: "100%",
                height: "100%",
              }}
              className=" px-5 border rounded-[10px] md:px-10 border-[#262626] bg-[#1a1a1a]"
            >
              <div className="w-full  opacity-100   pt-[30px] px-2.5 pb-[10px] md:flex justify-between items-center  ">
                <div className="text-white text-xl font-semibold">
                  <p>Unlock the Value of Your Property Today</p>
                </div>
                <div className="text-white text-[15px]  p-3 mt-3 md:mt-0 text-center bg-black rounded">
                  <button className="text-[14px]">Learn More</button>
                </div>
              </div>
              <p className=" p-3  text-base leading-[150%] tracking-normal text-[15px] text-[#828282]">
                Ready to unlock the true value of your property? Explore our
                Property Selling Service categories and let us help you achieve
                the best deal possible for your valuable asset.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-2 w-full h-full   bg-[#141414]">
        <div className=" md:pr-40 md:pl-16 py-5 px-5  md:py-12 ">
          <StarsIcon />

          <h1 className="md:text-4xl ms-2  md:ms-3 text-2xl font-semibold text-white">
            Effortless Property Management
          </h1>
          <p className="text-[#828282] ms-2  md:w-[80%]  md:ms-3 text-[15px] mt-5">
            Owning a property should be a pleasure, not a hassle. Estatein's
            Property Management Service takes the stress out of property
            ownership, offering comprehensive solutions tailored to your needs.
            Explore the categories below to see how we can make property
            management effortless for you.
          </p>
        </div>{" "}
        <div className="cards grid md:px-20 gap-6 md:py-5 mt-7 px-5 grid-cols-9">
          {propertyManagementServices.map((card, ind) => (
            <div className="md:col-span-3 col-span-9" key={ind}>
              <ServicePageCard
                description={card.description}
                icon={card.icon}
                title={card.title}
              />
            </div>
          ))}

          <div className="md:col-span-6 col-span-9 md:flex bg-cover bg-center justify-center">
            <div
              style={{
                backgroundImage: "url('/abstract-design.svg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                width: "100%",
                height: "100%",
              }}
              className=" bg-[#82818113] p-3 border rounded-[10px] md:px-10 border-[#262626] "
            >
              <div className="w-full  opacity-100   pt-[30px] md:px-2.5 pb-[10px] md:flex md:justify-between items-center  ">
                <div className="text-white text-xl font-semibold">
                  <p>Experience Effortless Property Management</p>
                </div>
                <div className="text-white text-center mt-3 p-3 bg-black rounded">
                  <button>Learn More</button>
                </div>
              </div>
              <p className=" md:p-3 text-base text-[15px] text-[#828282] leading-[150%] tracking-normal ">
                Ready to experience hassle-free property management? Explore our Property Management Service categories and let us handle the complexities while you enjoy the benefits of property ownership.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-3  bg-[#141414] ">
        <div className="grid grid-cols-12 ">
          
          <div className=" md:col-span-5 mt-14 col-span-12 md:pr-40 md:pl-16 px-3 md:py-12 ">
             <StarsIcon />
            <div className="">
              <h1 className="md:text-4xl mt-1 ms-2 text-white   md:ms-3 text-2xl font-semibold">
                Smart Investments, informed Decision
              </h1>
              <p className="text-[#828282] ms-2  mt-4 text-[15px]  md:ms-3">
                Building a real estate portfolio requires a strategic approach.
                Estatein's Investment Advisory Service empowers you to make
                smart investments and informed decisions.
              </p>
            </div>

            <div  style={{
                backgroundImage: "url('/abstract-design.svg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
               
              }} className=" py-12 mt-10 rounded-xl bg-[#82818113]  border-[#262626] border p-6 text-white">
              <h1 className="text-xl ">Unlock Your Investment Potential</h1>
              <p className="mt-7 text-[15px]">
                Explore our Property Management Service categories and let us
                handle the complexities while you enjoy the benefits of property
                ownership.
              </p>
              <button className="text-white mt-3 p-3 w-full bg-black rounded">
                Learn More
              </button>
            </div>
          </div>
          <div className="md:col-span-7 col-span-12 mt-5 w-full md:mt-20 px-5 me-10   ">
            <div className=" grid grid-cols-12  rounded-xl bg-[#82818113] p-2 gap-2">
             {informDecisions.map((card, ind) => (
            <div className=" md:col-span-6 col-span-12  border    rounded-xl " key={ind}>
              <ServicePageCard
                description={card.description}
                className = "md:py-7 h-full border border-[#262626]  bg-[#141414]"
                icon={card.icon}
                title={card.title}
              />
            </div>
          ))}
          </div>
          </div>
        </div>
      </section>
    </main>
  );
}

// description = {} icon = {} title = {}
