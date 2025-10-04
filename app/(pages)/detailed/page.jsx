'use client';
import React, { useState, useEffect } from 'react'
import Link from "next/link";
import Image from "next/image";

// Components
import Slider from '@/app/components/web/common/Slider/page.jsx';

// Shadcn components
import { Button } from "@/components/ui/button";

// Icons
import StarIcon from '@/app/styles/svg/StarsIcon.jsx';
import LocationIcon from '@/app/styles/svg/LocationIcon.jsx';
import BedroomIcon from '@/app/styles/svg/BedroomIcon';
import BathroomIcon from '@/app/styles/svg/BathroomIcon';
import AreaIcon from '@/app/styles/svg/Area.jsx';
import Lightning from '@/app/styles/svg/Lightning.jsx';

// Images
import houseImage from '@/public/img/house-image.png';

// fetch data
import getBlog from '@/app/action/getBlogs.js';

export default function Detailed() {

    const [blogData, setBlogData] = useState([]);

    const keys = [
        { points: "Expansive oceanfront terrace for outdoor entertaining" },
        { points: "Gourmet kitchen with top-of-the-line appliances" },
        { points: "Private beach access for morning strolls and sunset views" },
        { points: "Master suite with a spa-inspired bathroom and ocean-facing balcony" },
        { points: "Private garage and ample storage space" },
    ];

    const content = [
        { 
        title: "Frequently Asked Questions", 
        desc: "Find answers to common questions about Estatein’s services, property listings, and the real estate process. We're here to provide clarity and assist you every step of the way.",
        button: "View All FAQ's",
        type: "blog",
        data: blogData
        },
    ];

    useEffect(() => {
        const fetchData = async () => {
          try {    
            const resBlog = await getBlog(); // 👈 make sure you have this API function
            setBlogData(resBlog.data || resBlog);
          } catch (err) {
            console.error("Error fetching data:", err);
          }
        };
    
        fetchData();
      }, []);

  return (
    <main id='page-detailed' className='bg-[#141414]'>
        <section className='grid gap-5 px-4 py-10 md:px-16'>
            <div className='grid gap-5'>
                <header className='grid md:flex md:items-center md:justify-between md:gap-12'>
                    <div className='grid md:flex gap-5'>
                        <h1 className='text-white font-semibold text-[20px] md:text-[24px] leading-[150%] tracking-[0]'>Seaside Serenity Villa</h1>
                        <p className='hidden md:flex items-center gap-2 text-sm text-white border border-[rgba(38,38,38,1)] p-2 rounded-lg'>
                            <LocationIcon color='white'/>
                            Malibu, California
                        </p>
                        <div className='grid grid-cols-2 md:hidden gap-0.5 text-left'>
                            <p className='w-fit flex items-center gap-2 text-sm text-white border border-[rgba(38,38,38,1)] p-2 rounded-lg'>
                                <LocationIcon color='white'/>
                                Malibu, California
                            </p>
                            <div className='grid gap-0.5 text-right'>
                                <span className='font-medium text-[14px] leading-[150%] tracking-[0] text-[rgba(153,153,153,1)]'>Price</span>
                                <span className='font-semibold text-[20px] leading-[150%] tracking-[0] text-white'>$1,250,000</span>
                            </div>
                        </div>
                    </div>
                    <div className='hidden md:grid gap-0.5 text-left'>
                        <span className='font-medium text-[14px] leading-[150%] tracking-[0] text-[rgba(153,153,153,1)]'>Price</span>
                        <span className='font-semibold text-[20px] leading-[150%] tracking-[0] text-white'>$1,250,000</span>
                    </div>
                </header>
                <div className='grid md:grid-cols-2 gap-5'>
                    <Image src={houseImage} alt='house image' className='w-full rounded-lg'/>
                    <article className='grid gap-5 border border-[rgba(38,38,38,1)] p-4 md:p-10 rounded-lg h-fit'>
                    <div className='grid gap-2.5'>
                        <h6 className='font-semibold text-[18px] md:text-[20px] leading-[150%] tracking-[0] text-white'>Description</h6>
                        <p className='font-medium text-[14px] md:text-[16px] leading-[150%] tracking-[0] text-[rgba(153,153,153,1)]'>Discover your own piece of paradise with the Seaside Serenity Villa. T With an open floor plan, breathtaking ocean views from every room, and direct access to a pristine sandy beach, this property is the epitome of coastal living.</p>
                    </div>
                    <div className='border-t border-t-[rgba(38,38,38,1)] pt-4 grid grid-cols-2 md:flex gap-3 justify-evenly'>
                        <div className='grid gap-2 '>
                            <span className='flex items-center gap-1 text-[rgba(153,153,153,1)] font-medium text-[14px] leading-[150%] tracking-[0]'>
                                <BedroomIcon color='rgba(153,153,153,1)' /> 
                                Bedroom
                            </span>
                            <p className='text-[rgba(255,255,255,1)] font-semibold text-[20px] leading-[150%] tracking-[0]'>04</p>
                        </div>
                        <span className='hidden md:block h-full border border-[rgba(38,38,38,1)]'></span>
                        <div className='grid gap-2 '>
                           <span className='flex items-center gap-1 text-[rgba(153,153,153,1)] font-medium text-[14px] leading-[150%] tracking-[0]'>
                                <BathroomIcon color='rgba(153,153,153,1)' />
                                Bathroom
                            </span>
                            <p className='text-[rgba(255,255,255,1)] font-semibold text-[20px] leading-[150%] tracking-[0]'>03</p>
                        </div>
                        <span className='hidden md:block h-full border border-[rgba(38,38,38,1)]'></span>
                        <div className='grid gap-2 col-span-2 md:col-auto'>
                            <span className='flex items-center gap-1 text-[rgba(153,153,153,1)] font-medium text-[14px] leading-[150%] tracking-[0]'>
                                <AreaIcon />
                                Area
                            </span>
                            <p className='text-[rgba(255,255,255,1)] font-semibold text-[20px] leading-[150%] tracking-[0]'>2,500 Square Feet</p>
                        </div>
                    </div>
                </article>
                </div>
            </div>
            <article className='grid gap-5 border border-[rgba(38,38,38,1)] p-4 md:p-10 rounded-lg'>
                    <h6 className='font-semibold text-[20px] leading-[150%] tracking-[0] text-white'>Key Features and Amenities</h6>
                    <div className='grid gap-3'>
                        {keys.map((item, idx) => (
                            <span
                            key={idx}
                            className="flex items-center gap-[10px] border-l border-l-[rgba(112,59,247,1)] pt-[14px] pr-[16px] pb-[14px] pl-[16px] bg-[linear-gradient(90deg,#1A1A1A_0%,rgba(26,26,26,0)_100%)] text-[rgba(153,153,153,1)] font-medium text-[14px] md:text-[16px] leading-[150%] tracking-[0]"
                            >
                                <span>
                                    <Lightning />
                                </span>
                            {item.points}
                            </span>
                        ))}
                    </div>
            </article>
        </section>


        <section className="w-full grid md:grid-cols-[40%_1fr] bg-[rgb(20,20,20)] gap-6 md:gap-20 px-4 md:px-16 py-6 md:py-10">
            <div className="w-full grid h-fit">
                {/* Header */}
                <StarIcon />
                <div className="w-full flex items-center justify-between">
                <aside className="grid gap-1 md:max-w-5xl">
                    <h1 className="font-semibold text-[28px] md:text-[38px] leading-[150%] tracking-normal text-white p">
                    Inquire About Seaside Serenity Villa
                    </h1>
                    <p className="text-[#999999] font-medium text-[14px] md:text-base leading-[150%] tracking-normal">
                    Interested in this property? Fill out the form below, and our real estate experts will get back to you with more details, including scheduling a viewing and answering any questions you may have.
                    </p>
                </aside>
            </div>
        </div>

        <form 
            // onSubmit={handleSubmit(onSubmit)}
            className='grid gap-6 border border-[rgba(38,38,38,1)] p-6 md:p-10 rounded-lg'
        >
            {/* Row 1 */}
            <div className="grid md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                <label className="font-semibold text-[16px] text-white">First Name</label>
                <input
                    // {...register("firstName")}
                    type="text"
                    placeholder="Enter First Name"
                    required
                    className="w-full px-3 py-2 rounded-lg bg-[rgba(26,26,26,1)] border border-[rgba(38,38,38,1)] text-gray-400 placeholder-gray-500 focus:outline-none focus:border-[#999999]"
                />
                </div>

                <div className="flex flex-col gap-2">
                <label className="font-semibold text-[16px] text-white">Last Name</label>
                <input
                    // {...register("lastName")}
                    type="text"
                    placeholder="Enter Last Name"
                    required
                    className="w-full px-3 py-2 rounded-lg border border-[rgba(38,38,38,1)] text-gray-400 placeholder-gray-500 focus:outline-none focus:border-[#999999] bg-[rgba(26,26,26,1)]"
                />
                </div>
            </div>

            {/* Row 2 */}
            <div className="grid md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                <label className="font-semibold text-[16px] text-white">Email</label>
                <input
                    // {...register("email")}
                    type="email"
                    placeholder="Enter your Email"
                    required
                    className="w-full px-3 py-2 rounded-lg bg-[rgba(26,26,26,1)] border border-[rgba(38,38,38,1)] text-gray-400 placeholder-gray-500 focus:outline-none focus:border-[#999999]"
                />
                </div>

                <div className="flex flex-col gap-2">
                <label className="font-semibold text-[16px] text-white">Phone Number</label>
                <input
                    // {...register("phone")}
                    type="tel"
                    placeholder="Enter Phone Number"
                    required
                    className="w-full px-3 py-2 rounded-lg bg-[rgba(26,26,26,1)] border border-[rgba(38,38,38,1)] text-gray-400 placeholder-gray-500 focus:outline-none focus:border-[#999999]"
                />
                </div>
            </div>

            {/* Row 3 - Selected Property */}
            <div className="flex flex-col gap-2">
                <label className="font-semibold text-[16px] text-white">Selected Property</label>
                <span className="w-full px-3 py-2 rounded-lg bg-[rgba(26,26,26,1)] border border-[rgba(26,26,26,1)] text-gray-200 flex items-center justify-between">
                Seaside Serenity Villa Malibu, California
                    <span>
                        <LocationIcon color='white' />
                    </span>
                </span>
            </div>

            {/* Row 4 - Message */}
            <div className="flex flex-col gap-2">
                <label className="font-semibold text-[16px] text-white">Message</label>
                <textarea
                // {...register("message")}
                placeholder="Enter Your Message Here.."
                rows="4"
                className="w-full px-3 py-2 rounded-lg bg-[rgba(26,26,26,1)] border border-[rgba(38,38,38,1)] text-gray-400 placeholder-gray-500 focus:outline-none focus:border-[#999999]"
                ></textarea>
            </div>

            {/* Submit */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                        <label className="flex items-center gap-0.5 md:gap-2 text-gray-400 text-[13px] md:text-sm">
                          <input
                            type="checkbox"
                            required
                            className="w-4 h-4 rounded border-[#262626] bg-[#141414] accent-[#703bf7]"
                          />
                          I agree with <span className="underline">Terms of Use</span> and{" "}
                          <span className="underline">Privacy Policy</span>
                        </label>
                        <button
                          type="submit"
                          className="w-full md:w-auto px-6 py-2 rounded-lg bg-[#703bf7] text-white font-medium hover:bg-[#5b2fd6] transition"
                        >
                          Send your Message
                        </button>
                      </div>
            </form>

        </section>
        
        <section className='w-full px-4 md:px-16 py-10 grid gap-6'>
            <div className='w-full'>
                <StarIcon />
                <aside className="grid gap-1 md:max-w-5xl">
                    <h1 className="font-semibold text-[28px] md:text-[38px] leading-[150%] tracking-normal text-white">
                    Comprehensive Pricing Details
                    </h1>
                    <p className="text-[#999999] font-medium text-[14px] md:text-base leading-[150%] tracking-normal">
                        At Estatein, transparency is key. We want you to have a clear understanding of all costs associated with your property investment. Below, we break down the pricing for Seaside Serenity Villa to help you make an informed decision
                    </p>
                </aside>
            </div>

            <div className='w-full grid gap-10'>

                <aside className='w-full grid md:flex px-4 py-3 gap-2.5 md:py-5 md:px-10 border border-[rgba(38,38,38,1)] bg-[rgba(26,26,26,1)] rounded-lg items-center md:gap-5'>
                    <h6 className='text-white font-semibold text-[18px] md:text-[20px] leading-[150%] tracking-[0]'>Note</h6>
                    <span className='h-full border border-[rgba(38,38,38,1)]'></span>
                    <p className='text-[#999999] font-medium text-[14px] leading-[150%] tracking-[0]'>The figures provided above are estimates and may vary depending on the property, location, and individual circumstances.</p>
                </aside>

                <section className='w-full grid md:flex gap-5 md:gap-10'>
                    <aside className='w-full md:w-fit h-fit grid gap-0.5'>
                        <span className='text-[#999999] font-medium text-[14px] md:text-[16px] leading-[150%] tracking-[0]'>Listing Price</span>
                        <p className='text-white font-semibold text-[24px] md:text-[30px] leading-[150%] tracking-[0]'>$1,250,000</p>
                    </aside>
                    
                    <section className='w-full grid gap-5 md:gap-10'>

                        <div className='w-full grid gap-4 md:gap-7.5 p-4 md:p-7.5 border border-[rgba(38,38,38,1)] rounded-xl'>

                            <div className='w-full flex items-center justify-between text-white'>
                                <h6 className='font-semibold text-[18px] md:text-[20px] leading-[150%] tracking-[0]'>Additional Fees</h6>
                                <button className='rounded-lg bg-[rgba(26,26,26,1)] border border-[rgba(38,38,38,1)] px-4 py-2'>Learn More</button>
                            </div>
                            <hr className='border border-[rgba(38,38,38,1)]' />
                            <div className='w-full grid md:grid-cols-2 text-[#999999] gap-5'>
                                <div className='grid gap-3 pr-1.5 md:border-r md:border-r-[rgba(38,38,38,1)]'>
                                    <span className='font-medium text-[14px] leading-[150%] tracking-[0]'>Property Transfer Tax</span>
                                    <p className='text-white font-semibold text-[20px] leading-[150%] tracking-[0] flex gap-3 items-center'>
                                        $25,000 
                                        <span className='border border-[rgba(38,38,38,1)] bg-[rgba(26,26,26,1)] text-[#999999] py-1 px-3 rounded-3xl font-medium text-[14px]'>Based on the sale price and local regulations</span>
                                    </p>
                                </div>
                                <hr className='md:hidden border border-[rgba(38,38,38,1)]' />
                                <div className='grid gap-3'>
                                    <span className='font-medium text-[14px] leading-[150%] tracking-[0]'>Legal Fees</span>
                                    <p className='text-white font-semibold text-[20px] leading-[150%] tracking-[0] flex gap-3 items-center'>
                                        $3,000 
                                        <span className='border border-[rgba(38,38,38,1)] bg-[rgba(26,26,26,1)] text-[#999999] py-1 px-3 rounded-3xl font-medium text-[14px]'>Approximate cost for legal services, including title transfer</span>
                                    </p>
                                </div>
                            </div>
                            <hr className='border border-[rgba(38,38,38,1)]' />
                            <div className='w-full grid md:grid-cols-2 text-[#999999] gap-5'>
                                <div className='grid gap-3 pr-1.5 md:border-r md:border-r-[rgba(38,38,38,1)]'>
                                    <span className='font-medium text-[14px] leading-[150%] tracking-[0]'>Home Inspection</span>
                                    <p className='text-white font-semibold text-[20px] leading-[150%] tracking-[0] flex gap-3 items-center'>
                                        $500 
                                        <span className='border border-[rgba(38,38,38,1)] bg-[rgba(26,26,26,1)] text-[#999999] py-1 px-3 rounded-3xl font-medium text-[14px]'>Recommended for due diligence</span>
                                    </p>
                                </div>
                                <hr className='md:hidden border border-[rgba(38,38,38,1)]' />

                                <div className='grid gap-3'>
                                    <span className='font-medium text-[14px] leading-[150%] tracking-[0]'>Property Insurance</span>
                                    <p className='text-white font-semibold text-[20px] leading-[150%] tracking-[0] flex gap-3 items-center'>
                                        $1,200 
                                        <span className='border border-[rgba(38,38,38,1)] bg-[rgba(26,26,26,1)] text-[#999999] py-1 px-3 rounded-3xl font-medium text-[14px]'>Annual cost for comprehensive property insurance</span>
                                    </p>
                                </div>
                            </div>
                            <hr className='border border-[rgba(38,38,38,1)]' />
                            <div className='w-full grid text-[#999999] gap-5'>
                                <div className='grid gap-3'>
                                    <span className='font-medium text-[14px] leading-[150%] tracking-[0]'>Mortage Fees</span>
                                    <p className='text-white font-semibold text-[20px] leading-[150%] tracking-[0] flex gap-3 items-center'>
                                        Varies 
                                        <span className='border border-[rgba(38,38,38,1)] bg-[rgba(26,26,26,1)] text-[#999999] py-1 px-3 rounded-3xl font-medium text-[14px]'>If applicable, consult with your lender for specific details</span>
                                    </p>
                                </div>                                
                            </div>

                        </div>
                        <div className='w-full grid gap-4 md:gap-7.5 p-4 md:p-7.5 border border-[rgba(38,38,38,1)] rounded-xl'>
                            <div className='w-full flex items-center justify-between text-white'>
                                <h6 className='font-semibold text-[18px] md:text-[20px] leading-[150%] tracking-[0]'>Monthly Costs</h6>
                                <button className='rounded-lg bg-[rgba(26,26,26,1)] border border-[rgba(38,38,38,1)] px-4 py-2'>Learn More</button>
                            </div>
                            <hr className='border border-[rgba(38,38,38,1)]' />
                            <div className='w-full flex items-center justify-between text-[#999999] gap-5'>
                                <div className='grid gap-3'>
                                    <span className='font-medium text-[14px] leading-[150%] tracking-[0]'>Property Taxes</span>
                                    <p className='text-white font-semibold text-[20px] leading-[150%] tracking-[0] flex gap-3 items-center'>
                                        $1,250 
                                        <span className='border border-[rgba(38,38,38,1)] bg-[rgba(26,26,26,1)] text-[#999999] py-1 px-3 rounded-3xl font-medium text-[14px]'>Approximate monthly property tax based on the sale price and local rates</span>
                                    </p>
                                </div>                                
                            </div>
                            <hr className='border border-[rgba(38,38,38,1)]' />
                            <div className='w-full flex items-center justify-between text-[#999999] gap-5'>
                                <div className='grid gap-3'>
                                    <span className='font-medium text-[14px] leading-[150%] tracking-[0]'>Homeowners` Association Fee</span>
                                    <p className='text-white font-semibold text-[20px] leading-[150%] tracking-[0] flex gap-3 items-center'>
                                        $300 
                                        <span className='border border-[rgba(38,38,38,1)] bg-[rgba(26,26,26,1)] text-[#999999] py-1 px-3 rounded-3xl font-medium text-[14px]'>Monthly fee for common area maintenance and security</span>
                                    </p>
                                </div>                                
                            </div>

                        </div>
                        <div className='w-full grid gap-4 md:gap-7.5 p-4 md:p-7.5 border border-[rgba(38,38,38,1)] rounded-xl'>

                            <div className='w-full flex items-center justify-between text-white'>
                                <h6 className='font-semibold text-[18px] md:text-[20px] leading-[150%] tracking-[0]'>Total Initial Costs</h6>
                                <button className='rounded-lg bg-[rgba(26,26,26,1)] border border-[rgba(38,38,38,1)] px-4 py-2'>Learn More</button>
                            </div>
                            <hr className='border border-[rgba(38,38,38,1)]' />
                            <div className='w-full grid md:grid-cols-2 text-[#999999] gap-5'>
                                <div className='grid gap-3 pr-1.5 md:border-r md:border-r-[rgba(38,38,38,1)]'>
                                    <span className='font-medium text-[14px] leading-[150%] tracking-[0]'>Listing Price</span>
                                    <p className='text-white font-semibold text-[20px] leading-[150%] tracking-[0] flex gap-3 items-center'>
                                        $1,250,000 
                                    </p>
                                </div>
                                <hr className='md:hidden border border-[rgba(38,38,38,1)]' />
                                <div className='grid gap-3'>
                                    <span className='font-medium text-[14px] leading-[150%] tracking-[0]'>Additional Fees</span>
                                    <p className='text-white font-semibold text-[20px] leading-[150%] tracking-[0] flex gap-3 items-center'>
                                        $29,700 
                                        <span className='border border-[rgba(38,38,38,1)] bg-[rgba(26,26,26,1)] text-[#999999] py-1 px-3 rounded-3xl font-medium text-[14px]'>Property transfer tax, legal fees, inspection, insurance</span>
                                    </p>
                                </div>
                            </div>
                            <hr className='border border-[rgba(38,38,38,1)]' />
                            <div className='w-full grid md:grid-cols-2 text-[#999999] gap-5'>
                                <div className='grid gap-3 pr-1.5 md:border-r md:border-r-[rgba(38,38,38,1)]'>
                                    <span className='font-medium text-[14px] leading-[150%] tracking-[0]'>Down Payment</span>
                                    <p className='text-white font-semibold text-[20px] leading-[150%] tracking-[0] flex gap-3 items-center'>
                                        $250,000 
                                        <span className='border border-[rgba(38,38,38,1)] bg-[rgba(26,26,26,1)] text-[#999999] py-1 px-3 rounded-3xl font-medium text-[14px]'>20%</span>
                                    </p>
                                </div>
                                <hr className='md:hidden border border-[rgba(38,38,38,1)]' />
                                <div className='grid gap-3'>
                                    <span className='font-medium text-[14px] leading-[150%] tracking-[0]'>Mortgage Amount</span>
                                    <p className='text-white font-semibold text-[20px] leading-[150%] tracking-[0] flex gap-3 items-center'>
                                        $1,000,000 
                                        <span className='border border-[rgba(38,38,38,1)] bg-[rgba(26,26,26,1)] text-[#999999] py-1 px-3 rounded-3xl font-medium text-[14px]'>If applicable</span>
                                    </p>
                                </div>
                            </div>

                        </div>
                        <div className='w-full grid gap-4 md:gap-7.5 p-4 md:p-7.5 border border-[rgba(38,38,38,1)] rounded-xl'>

                            <div className='w-full flex items-center justify-between text-white'>
                                <h6 className='font-semibold text-[18px] md:text-[20px] leading-[150%] tracking-[0]'>Monthly Expenses</h6>
                                <button className='rounded-lg bg-[rgba(26,26,26,1)] border border-[rgba(38,38,38,1)] px-4 py-2'>Learn More</button>
                            </div>
                            <hr className='border border-[rgba(38,38,38,1)]' />
                            <div className='w-full grid md:grid-cols-2 text-[#999999] gap-5'>
                                <div className='grid gap-3 pr-1.5 md:border-r md:border-r-[rgba(38,38,38,1)]'>
                                    <span className='font-medium text-[14px] leading-[150%] tracking-[0]'>Property Taxes</span>
                                    <p className='text-white font-semibold text-[20px] leading-[150%] tracking-[0] flex gap-3 items-center'>
                                        $1,250 
                                    </p>
                                </div>
                                <hr className='md:hidden border border-[rgba(38,38,38,1)]' />
                                <div className='grid gap-3'>
                                    <span className='font-medium text-[14px] leading-[150%] tracking-[0]'>Homeowners` Association Fee</span>
                                    <p className='text-white font-semibold text-[20px] leading-[150%] tracking-[0] flex gap-3 items-center'>
                                        $300
                                    </p>
                                </div>
                            </div>
                            <hr className='border border-[rgba(38,38,38,1)]' />
                            <div className='w-full grid md:grid-cols-2 text-[#999999] gap-5'>
                                <div className='grid gap-3 pr-1.5 md:border-r md:border-r-[rgba(38,38,38,1)]'>
                                    <span className='font-medium text-[14px] leading-[150%] tracking-[0]'>Mortgage Payment</span>
                                    <p className='text-white font-semibold text-[20px] leading-[150%] tracking-[0] flex gap-3 items-center'>
                                        Varies based on terms and interest rate
                                        <span className='border border-[rgba(38,38,38,1)] bg-[rgba(26,26,26,1)] text-[#999999] py-1 px-3 rounded-3xl font-medium text-[14px]'>If applicable</span>
                                    </p>
                                </div>
                                <hr className='md:hidden border border-[rgba(38,38,38,1)]' />
                                <div className='grid gap-3 h-fit'>
                                    <span className='font-medium text-[14px] leading-[150%] tracking-[0]'>Property Insurance</span>
                                    <p className='text-white font-semibold text-[20px] leading-[150%] tracking-[0] flex gap-3 items-center'>
                                        $100 
                                        <span className='border border-[rgba(38,38,38,1)] bg-[rgba(26,26,26,1)] text-[#999999] py-1 px-3 rounded-3xl font-medium text-[14px]'>Approximate monthly cost</span>
                                    </p>
                                </div>
                            </div>

                        </div>

                    </section>
                </section>

            </div>

        </section>

        {content.map((section, idx) => (
              <section key={idx} className="w-full grid bg-[rgb(20,20,20)] gap-6 px-4 py-6 md:px-16 md:py-10">
                <div className='w-full grid'>

                {/* Header */}
                <StarIcon />
                <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4">
                  <aside className="w-full grid gap-1 md:max-w-5xl">
                    <h1 className="font-semibold text-[28px] md:text-[38px] leading-[150%] tracking-normal text-white">
                      {section.title}
                    </h1>
                    <p className="text-[#999999] font-medium text-[14px] md:text-base leading-[150%] tracking-normal">
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
                </div>

                {/* Slider */}
                <div className="w-full grid grid-cols-3">
                  <Slider type={section.type} data={section.data} />
                </div>
              </section>
          ))}
    </main>
  )
}
