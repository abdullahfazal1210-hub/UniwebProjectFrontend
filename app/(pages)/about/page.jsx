'use client';
import { useState, useEffect } from "react";

{/* Final about page  */}
import Card from "@/app/components/web/common/Card";
import StatsCard from "@/app/components/web/common/StatsCard";
import Message from "@/app/styles/svg/Message.jsx";
import Send from "@/app/styles/svg/Send";
import StarsIcon from "@/app/styles/svg/StarsIcon";
import Twitter from "@/app/styles/svg/Twitter";
import Sparkling from "@/app/styles/svg/Sparkling";
import { Separator } from "@/components/ui/separator";
import React from "react";

import StarIcon from "@/app/styles/svg/StarIcon.jsx";
import ExcelenceIcon from "@/app/styles/svg/ExcelenceIcon";
import ClientIcon from "@/app/styles/svg/ClientIcon";
import Image from "next/image";

function About() {

  const [customer, setCustomer] = useState(0);
  
  const card = [
    {
      icon: <StarIcon />,
      key: 1,
      heading: "Trust",
      desc: "Trust is the cornerstone of every successful real estate transaction.",
    },

    {
      icon: <ExcelenceIcon/>,
      key: 2,
      heading: "Excellence",
      desc: "We set the bar high for ourselves. From the properties we list to the services we provide.",
    },

    {
      icon: <ClientIcon/>,
      key: 3,
      heading: "Client-Centric",
      desc: "Your dreams and needs are at the center of our universe. We listen, understand.",
    },

    {
      icon: <StarIcon />,
      key: 4,
      heading: "Our Commitment",
      desc: "We are dedicated to providing you with the highest level of service, professionalism, and support.",
    },
  ];
  const achiveCard = [
    {
      step: "Step 01",
      title: "Discover a World of Possibilities",
      desc: "Your journey begins with exploring our carefully curated property listings. Use our intuitive search tools to filter properties based on your preferences, including location.",
    },
    {
      step: "Step 02",
      title: "Narrowing Down Your Choices",
      desc: "Once you've found properties that catch your eye, save them to your account or make a shortlist. This allows you to compare and revisit your favorites as you make your decision.",
    },
    {
      step: "Step 03",
      title: "Personalized Guidance",
      desc: "Have questions about a property or need more information? Our dedicated team of real estate experts is just a call or message away.",
    },
    {
      step: "Step 04",
      title: "See It for Yourself",
      desc: "Arrange viewings of the properties you're interested in. We'll coordinate with the property owners and accompany you to ensure you get a firsthand look at your potential new home.",
    },
    {
      step: "Step 05",
      title: "Making Informed Decisions",
      desc: "Before making an offer, our team will assist you with due diligence, including property inspections, legal checks, and market analysis. We want you to be fully informed.",
    },
    {
      step: "Step 06",
      title: "Getting the Best Deal",
      desc: "We'll help you negotiate the best terms and prepare your offer. Our goal is to secure the property at the right price and on favorable terms.",
    },
  ];
  const achievements = [
    {
      title: "3+ Years of Excellence",
      desc: "With over 3 years in the industry, we've amassed a wealth of knowledge and experience.",
    },
    {
      title: "Happy Clients",
      desc: "Our greatest achievement is the satisfaction of our clients. Their success stories fuel our passion for what we do.",
    },
    {
      title: "Industry Recognition",
      desc: "We've earned the respect of our peers and industry leaders, with accolades and awards that reflect our commitment to excellence.",
    },
  ];
  const team = [
    {
      img: "/img/founder.jpg",
      name: "Max Mitchell",
      designation: "Founder",
    },
    {
      img: "/img/team 1.webp",
      name: "Sarah Johnson",
      designation: "Chief Real Estate Officer",
    },
    {
      img: "/img/team 2.png",
      name: "David Brown",
      designation: "Head of Property Management",
    },
    {
      img: "/img/team3.jpeg",
      name: "Michael Turner",
      designation: "Legal Counsel",
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

  useEffect(() => {
      if (customer < 200) {
        const timer = setTimeout(() => setCustomer(customer + 1), 20);
        return () => clearTimeout(timer);
      }
    }, [customer]);

  return (
    <div className="bg-[#141414] ">
      <div className="main-container">
 <div className="sec-one grid grid-cols-1 py-4 px-4 lg:grid-cols-2 md:grid-cols-2">
  <div className="left  relative md:h-[80vh]  flex justify-center items-center order-2 md:order-1">
    <div className="grid  gap-4 md:w-[90%] md:h-[60%]">
      <span className="relative top-4 md:top-7 "><StarsIcon /></span>
      <h1 className="md:text-4xl ms-2 md:ms-3 text-2xl font-semibold text-white">
        Our Journey
      </h1>
      <p className="md:ms-3 ms-2 font-medium text-base leading-[150%] tracking-normal text-[#999999]">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam,
        doloremque at eum dignissimos voluptates ratione esse. Quidem sit
        dignissimos sunt corporis quia dolorum? Est quibusdam fugit, eos ex
        perspiciatis iusto?
      </p>

      {/* Stats Cards */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-2.5 md:gap-5 text-white'>
                  {stats.map((stat, index) => (
                    <div
                      key={index}
                      className="grid gap-0.5 px-3 py-3.5 bg-[rgba(26,26,26,1)] border border-[rgba(38,38,38,1)] rounded-lg"
                    >
                      <h6 className="font-bold text-center text-[30px] leading-[150%] tracking-normal">
                        {stat.key === "customer" ? customer : stat.value}+
                      </h6>
                      <p className="text-[#999999] text-center font-medium text-base leading-[150%] tracking-normal">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
    </div>
  </div>


  <div className="right  flex items-center justify-center w-full order-1 md:order-2">
    <div className="main w-[90%] border rounded-[10px] border-[#4e4c4c7d]">
      <img
        className="w-full h-full border-0 object-cover"
        src="/img/sec-one.png"
        alt="Section Image"
      />
    </div>
  </div>
</div>



       <div className="sec-two  relative grid grid-cols-7 p-4  md:px-10 md:gap-16">
 
  <div className="left w-full  col-span-7 md:col-span-3 flex justify-center items-center">
    <div className="">
              <StarsIcon />

      <h1 className="md:text-4xl ms-2  md:ms-3 text-2xl font-semibold text-white">
        Our Values
      </h1>
      <p className="text-[#828282] ms-2 w-full  md:ms-3  text-[15px] mt-5">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt rem
        aut aperiam, dolorem iste dolore modi sed doloribus veniam eveniet
        doloremque at, rerum corrupti ut neque animi voluptatem itaque! Id?
      </p>
    </div>
  </div>


  <div className="text-[#828282] mt-3 col-span-7 md:col-span-4   md:col-start-4 p-1 md:p-2 bg-[#82818113] rounded-xl">
    <div className="cards px-3 grid rounded-xl border grid-cols-4 border-[#4e4c4c7d] bg-[#111]">
      {card.map((item, index) => (
        <React.Fragment key={index}>
          <div
            className={`p-6 md:col-span-2 col-span-4 border-b md:border-b-0 border-b-[#302f2f48] ${
              index % 2 === 1 ? "md:border-l md:border-l-[#4e4c4c7d] mt-3 mb-3" : ""
            }`}
          >
            <Card
              icon={item.icon}
              heading={item.heading}
              desc={item.desc}
            />
          </div>

          {index % 2 === 1 && index !== card.length - 1 && (
            <div className="col-span-4 my-2">
              <Separator className="md:bg-[#4e4c4c7d] md:h-[1px] w-full" />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  </div>
</div>




        <div className="sec-three mt-8 px-3 md:px-10 text-amber-50   md:h-[60vh]">
          <div className=" ">
              <StarsIcon />
            <h1 className="md:text-4xl ms-2 md:ms-3 text-2xl font-semibold  ">
              Our Achievements
            </h1>
            <p className="text-[#828282] ms-2 md:ms-3 text-[15px] ">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Repudiandae laborum delectus nam.
            </p>
          </div>
          <div className="achiv-card  md:ms-3 mt-10  gap-4 grid grid-cols-6 w-full">
            {achievements.map((card, ind) => (
              <div
                key={ind}
                className="card bg-[#82818113] p-1 rounded-xl flex col-span-6  md:col-span-2"
              >
                <div className="md:py-14 md:px-6 p-6 text-[#fcfafa] rounded-xl border border-[#4e4c4c7d] bg-[#111] w-full h-full flex flex-col">
                  <h1 className="text-2xl">{card.title}</h1>
                  <p className="text-[#828282] text-[15px] mt-2">{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="sec-four  text-amber-50 w-full px-3 md:px-10 md:min-h-screen">
          <StarsIcon />
          <h1 className="text-2xl ms-2 font-semibold md:ms-3 md:text-4xl ">
            Navigating the Estatein Experience{" "}
          </h1>
          <p className=" text-[15px] ms-2 md:ms-3 text-[#828282]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae
            laborum delectus nam.
          </p>

          <div className="achiv-card mt-5 md:ms-3 grid gap-3 grid-cols-1 md:grid-cols-3  w-full ">
            {achiveCard.map((card, index) => (
              <div key={index} className={` rounded ${ index > 2 ? "hidden md:block":"block"}`} >
                <div className="gradient-border  p-3 ">
                  <div className="step">{card.step}</div>
                </div>
                <div className="gradient-content    ">
                  <div className="content p-6 relative">
                    <div
                      className="absolute top-0 left-0 w-20 h-20 pointer-events-none rounded-br-full"
                      style={{
                        background: `radial-gradient(circle at top left, rgba(53,37,139,0.3) 0%, transparent 70%),
                   radial-gradient(circle at top left, rgba(53,37,139,0.3) 0%, transparent 0%)`,
                      }}
                    ></div>

                    <h1 className="text-2xl">
                      {card.title}
                    </h1>
                    <p className="text-[15px] text-gray-500 mt-4">
                      {card.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="sec-five px-3 md:px-10  text-amber-50 w-full md:min-h-screen">
          <div className="">
             <StarsIcon />
            <h1 className="md:text-4xl ms-2 md:ms-3 text-2xl font-semibold">
              Meet the Estain Team
            </h1>
            <p className="text-gray-500 ms-2 md:ms-3 text-[15px]">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim
              quas voluptates error laudantium iusto harum sed similique .
            </p>
          </div>

          <div className="TeamCards md:ms-3  p-4 grid grid-cols-1 md:grid-cols-4  gap-5  mt-10 ">
            {team.map((card, ind) => (
              <div
                key={ind}
                className="card  w-full    bg-[#111] rounded-xl border border-[#2c2c2c] p-8  relative text-white"
              >
             
                <div className="img w-full h-[250px] overflow-hidden flex justify-center items-center">
                  <Image
                    src={card.img}
                    alt={card.name}
                    width={90}
                    height={90}
                    className="rounded-xl w-full h-full object-cover"
                  />
                </div>

                <div className="twitter-icon p-2 px-5 rounded-full top-65 absolute left-1/2 transform -translate-x-1/2  bg-[#703BF7] z-10">
                    <Twitter/>
                  
                </div>

              
                <div className="text-center mt-10">
                  <h1 className="text-lg font-semibold">{card.name}</h1>
                  <p className="text-[#939393] text-[14px]">
                    {card.designation}
                  </p>

                  {/* <div className="inp relative mt-3"> */}
                  <div className="border border-gray-700 bg-[#1A1A1A] rounded-4xl  flex justify-between items-center mt-3 relative">
                  
                    <input
                      type="text"
                      placeholder="Say Hello 👋"
                      className="p-3 pl-3 w-full"
                    />
                 
                    <button className="p-2 bg-[#703BF7] me-1 rounded-full">
                    {/* <button className="p-2 bg-[#703BF7] me-1 rounded-full absolute top-[12px] md:top-[10px] right-1.5"> */}
                      
                      <Send />

                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
