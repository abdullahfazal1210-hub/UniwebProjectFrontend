"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import axios from "axios";
import LoginModal from "@/app/components/web/common/LoginModal";
import { toast } from "sonner";
import { isUserLoggedIn } from "@/app/utils/authHelper";
import dynamic from "next/dynamic";

// Components
const Slider = dynamic(() => import("@/app/components/web/common/Slider/page.jsx"), {
  ssr: false,
  loading: () => <div className="w-full h-64 bg-gray-900 animate-pulse rounded-xl" />
});
import { Skeleton } from "@/components/ui/skeleton";

// Shadcn components
import { Button } from "@/components/ui/button";

// Icons
import StarIcon from "@/app/styles/svg/StarsIcon.jsx";
import LocationIcon from "@/app/styles/svg/LocationIcon.jsx";
import BedroomIcon from "@/app/styles/svg/BedroomIcon";
import BathroomIcon from "@/app/styles/svg/BathroomIcon";
import AreaIcon from "@/app/styles/svg/Area.jsx";
import Lightning from "@/app/styles/svg/Lightning.jsx";

// Images
import houseImage from "@/public/img/house-image.png";

// fetch data
import getBlog from "@/app/action/getBlogs.js";
import getPropertys from "@/app/action/getProperty";
import { getProperty } from "@/app/(pages)/api/hello";

export default function Detailed() {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [blogData, setBlogData] = useState([]);
  const [property, setProperty] = useState([]);

  // Initialize from URL params if available
  const [purchaseType, setPurchaseType] = useState(searchParams.get("type") || "");
  const [rentDuration, setRentDuration] = useState(searchParams.get("duration") || "");

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [propertyStatus, setPropertyStatus] = useState({ status: "Available" });

  useEffect(() => {

    const fetchStatus = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/property/status/${id}`, { withCredentials: true });
        setPropertyStatus(res.data);
      } catch (error) {
        console.error("Failed to fetch property status", error);
      }
    };
    if (id) fetchStatus();
  }, [id]);

  const checkLogin = () => {

    const hasCookie = document.cookie.split(';').some(c => c.trim().startsWith('authToken='));
    const hasUser = localStorage.getItem("userName");
    return hasCookie || hasUser;
  };

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Restore form data
  useEffect(() => {
    const savedRequest = localStorage.getItem("savedPropertyRequest");
    if (savedRequest) {
      try {
        const parsed = JSON.parse(savedRequest);

        if (parsed.propertyId === id) {
          setFormData(prev => ({
            ...prev,
            firstName: parsed.firstName || "",
            lastName: parsed.lastName || "",
            email: parsed.email || "",
            phone: parsed.phone || "",
            message: parsed.message || ""
          }));
          if (parsed.purchaseType) setPurchaseType(parsed.purchaseType);
          if (parsed.rentDuration) setRentDuration(parsed.rentDuration);

          localStorage.removeItem("savedPropertyRequest");
          localStorage.removeItem("returnUrl");
          toast.success("Welcome back! Restoring your request.");
        }
      } catch (e) {
        console.error("Failed to restore request", e);
      }
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      purchaseType,
      rentDuration: purchaseType === 'rent' ? rentDuration : null,
      propertyId: id,
      propertyTitle: property[0]?.title || "Unknown Property",
    };

    // 🔹 Phone Number Validation (11 digits)
    const phoneRegex = /^[0-9]{11}$/;
    if (!phoneRegex.test(formData.phone)) {
      toast.error("Phone number must be exactly 11 digits.");
      return;
    }

    if (!isUserLoggedIn()) {
      // Save data
      localStorage.setItem("savedPropertyRequest", JSON.stringify(payload));
      localStorage.setItem("returnUrl", `/properties/detailed/${id}`);


      toast.info("Please login to send request. Data saved.");
      router.push("/Login");
      return;
    }

    try {
      if (!purchaseType) {
        console.log("Purchase type missing");
        return;
      }

      const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/requestProperty`, payload, {
        withCredentials: true
      });
      if (res.status === 200) {
        toast.success("Request sent successfully!");
        setFormData({ firstName: "", lastName: "", email: "", phone: "", message: "" });
        setPurchaseType("");
        setRentDuration("");
      }
    } catch (error) {
      console.error(error);
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {

        localStorage.setItem("savedPropertyRequest", JSON.stringify(payload));
        localStorage.setItem("returnUrl", `/properties/detailed/${id}`);

        localStorage.removeItem("userName");
        document.cookie = "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

        toast.error("Session expired. Please login again.");
        router.push("/Login");
      } else {
        toast.error("Failed to send request");
      }
    }
  };

  const [price, setPrice] = useState(0);

  useEffect(() => {
    const savedPrice = localStorage.getItem("rent_duration_price");
    if (savedPrice) {
      setPrice(Number(savedPrice));
    }
  }, []);


  const keys = [
    { points: "Expansive oceanfront terrace for outdoor entertaining" },
    { points: "Gourmet kitchen with top-of-the-line appliances" },
    { points: "Private beach access for morning strolls and sunset views" },
    {
      points:
        "Master suite with a spa-inspired bathroom and ocean-facing balcony",
    },
    { points: "Private garage and ample storage space" },
  ];

  const content = [
    {
      title: "Frequently Asked Questions",
      desc: "Find answers to common questions about Estatein’s services, property listings, and the real estate process. We're here to provide clarity and assist you every step of the way.",
      button: "View All FAQ's",
      type: "blog",
      data: blogData,
    },
  ];



  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resBlog, resProperties] = await Promise.all([
          getBlog(),
          getPropertys()
        ]);

        setBlogData(resBlog.data || resBlog);

        if (resProperties) {
          const data = resProperties.filter((item) => item._id == id);
          setProperty(data);
        }
      } catch (err) {
        // console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, [id]);

  // console.log(property, "property");

  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (property[0]?.images?.length > 0) {
      setSelectedImage(property[0].images[0]);
    }
  }, [property]);

  const getMimeType = (filename) => {
    const ext = filename?.split('.').pop()?.toLowerCase();
    if (ext === 'png') return 'image/png';
    if (ext === 'webp') return 'image/webp';
    if (ext === 'svg') return 'image/svg+xml';
    return 'image/jpeg';
  };

  const imageSrc = selectedImage
    ? `data:${getMimeType(selectedImage.name)};base64,${selectedImage.data}`
    : (property[0]?.images && property[0]?.images.length > 0
      ? `data:${getMimeType(property[0].images[0].name)};base64,${property[0].images[0].data}`
      : houseImage);

  return (
    <main id="page-detailed" className="bg-[#141414]">
      <section className="grid gap-5 px-4 py-10 md:px-16">
        <div className="grid gap-5">
          <header className="grid md:flex md:items-center md:justify-between md:gap-12">
            <div className="grid md:flex gap-5">
              <h1 className="text-white   font-semibold text-[20px] md:text-[24px] leading-[150%] tracking-[0]">
                {property[0]?.title || <Skeleton className="h-4 w-[200px]" />}
              </h1>
              <p className="hidden md:flex items-center gap-2 text-sm text-white border border-[rgba(38,38,38,1)] p-2 rounded-lg">
                <LocationIcon color="white" />
                {property[0]?.location || (
                  <Skeleton className="h-4 w-[200px]" />
                )}
              </p>
              <div className="grid grid-cols-2 md:hidden gap-0.5 text-left">
                <p className="w-fit flex items-center gap-2 text-sm text-white border border-[rgba(38,38,38,1)] p-2 rounded-lg">
                  <LocationIcon color="white" />
                  {property[0]?.location || (
                    <Skeleton className="h-4 w-[200px]" />
                  )}
                </p>
                <div className="grid gap-0.5 text-right">
                  <span className="font-medium text-[14px] leading-[150%] tracking-[0] text-[rgba(153,153,153,1)]">
                    Price
                  </span>
                  <span className="font-semibold text-[20px] leading-[150%] tracking-[0] text-white">
                    PKR {price ? Number(price).toLocaleString() : <Skeleton className="h-4 w-[100px]" />}
                  </span>
                </div>
              </div>
            </div>
            <div className="hidden md:grid gap-0.5 text-left">
              <span className="font-medium text-[14px] leading-[150%] tracking-[0] text-[rgba(153,153,153,1)]">
                Price
              </span>
              <span className="font-semibold  text-[20px] leading-[150%] tracking-[0] text-white">
                PKR {price ? Number(price).toLocaleString() : (
                  <Skeleton className="h-4 w-[200px]" />
                )}
              </span>
            </div>
          </header>
          <div className="grid md:grid-cols-2 gap-5">
            <div className="flex flex-col gap-4">
              <div className="relative w-full aspect-[4/3] overflow-hidden rounded-[12px]">
                <Image
                  src={imageSrc}
                  alt="house image"
                  className="object-cover"
                  fill
                />
              </div>
              {/* Thumbnail Gallery */}
              {property[0]?.images?.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                  {property[0].images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(img)}
                      className={`relative w-20 h-20 md:w-24 md:h-24 shrink-0 rounded-lg overflow-hidden border-2 transition-all ${selectedImage === img
                        ? "border-[#703bf7]"
                        : "border-transparent hover:border-gray-500"
                        }`}
                    >
                      <Image
                        src={`data:${getMimeType(img.name)};base64,${img.data}`}
                        alt={`View ${idx + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
            <article className="grid gap-5 border border-[rgba(38,38,38,1)] p-4 md:p-10 rounded-lg h-fit">
              <div className="grid gap-2.5">
                <h6 className="font-semibold text-[18px] md:text-[20px] leading-[150%] tracking-[0] text-white">
                  Description
                </h6>
                <p className="font-medium text-[14px] md:text-[16px] leading-[150%] tracking-[0] text-[rgba(153,153,153,1)]">
                  {property[0]?.description || (
                    <Skeleton className="h-4 w-[200px]" />
                  )}
                </p>
              </div>
              <div className="border-t border-t-[rgba(38,38,38,1)] pt-4 grid grid-cols-2 md:flex gap-3 justify-evenly">
                <div className="grid gap-2 ">
                  <span className="flex items-center gap-1 text-[rgba(153,153,153,1)] font-medium text-[14px] leading-[150%] tracking-[0]">
                    <BedroomIcon color="rgba(153,153,153,1)" />
                    Bedroom
                  </span>
                  <p className="text-[rgba(255,255,255,1)] font-semibold text-[20px] leading-[150%] tracking-[0]">
                    {property[0]?.no_of_bedroom || (
                      <Skeleton className="h-4 w-[200px]" />
                    )}
                  </p>
                </div>
                <span className="hidden md:block h-full border border-[rgba(38,38,38,1)]"></span>
                <div className="grid gap-2 ">
                  <span className="flex items-center gap-1 text-[rgba(153,153,153,1)] font-medium text-[14px] leading-[150%] tracking-[0]">
                    <BathroomIcon color="rgba(153,153,153,1)" />
                    Bathroom
                  </span>
                  <p className="text-[rgba(255,255,255,1)] font-semibold text-[20px] leading-[150%] tracking-[0]">
                    {property[0]?.no_of_bathroom || (
                      <Skeleton className="h-4 w-[200px]" />
                    )}
                  </p>
                </div>
                <span className="hidden md:block h-full border border-[rgba(38,38,38,1)]"></span>
                <div className="grid gap-2 col-span-2 md:col-auto">
                  <span className="flex items-center gap-1 text-[rgba(153,153,153,1)] font-medium text-[14px] leading-[150%] tracking-[0]">
                    <AreaIcon />
                    Area
                  </span>
                  <p className="text-[rgba(255,255,255,1)] font-semibold text-[20px] leading-[150%] tracking-[0]">
                    {property[0]?.size || (
                      <Skeleton className="h-4 w-[200px]" />
                    )} Square Feet

                  </p>
                </div>
              </div>
            </article>
          </div>
        </div>
        <article className="grid gap-5 border border-[rgba(38,38,38,1)] p-4 md:p-10 rounded-lg">
          <h6 className="font-semibold text-[20px] leading-[150%] tracking-[0] text-white">
            Key Features and Amenities
          </h6>
          <div className="grid gap-3">
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
                Interested in this property? Fill out the form below, and our
                real estate experts will get back to you with more details,
                including scheduling a viewing and answering any questions you
                may have.
              </p>
            </aside>
          </div>
        </div>

        {/* Note For User */}
        <section className="w-full flex flex-col gap-4 border border-[rgba(38,38,38,1)] bg-[rgba(26,26,26,1)] p-6 md:p-10 rounded-xl">
          {propertyStatus.status === "Occupied" ? (
            <div className="w-full bg-red-500/10 border border-red-500 text-red-500 p-4 rounded-lg flex flex-col gap-2">
              <h3 className="font-bold text-lg">Property Unavailable</h3>
              <p>
                This property is currently <strong>Rented</strong> for {propertyStatus.duration} months.
              </p>
            </div>
          ) : propertyStatus.status === "Sold" ? (
            <div className="w-full bg-red-600/10 border border-red-600 text-red-600 p-4 rounded-lg flex flex-col gap-2">
              <h3 className="font-bold text-lg">Property Sold</h3>
              <p>
                This property has been <strong>Sold Out</strong>.
              </p>
            </div>
          ) : propertyStatus.status === "Pending" ? (
            <div className="w-full bg-yellow-500/10 border border-yellow-500 text-yellow-500 p-4 rounded-lg flex flex-col gap-2">
              <h3 className="font-bold text-lg">High Demand</h3>
              <p>
                This property currently has <strong>{propertyStatus.count} pending request(s)</strong>. You can still submit an inquiry.
              </p>
            </div>
          ) : null}

          <div className="w-full flex flex-col gap-2">
            <h1 className="text-[1.25rem] font-bold text-white">
              Inquire About {property[0]?.title}
            </h1>
          </div>
        </section>

        <form onSubmit={handleSubmit} className="grid gap-6 border border-[rgba(38,38,38,1)] p-6 md:p-10 rounded-lg">
          {/* First Name */}
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-[16px] text-white">
              First Name
            </label>
            <input
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              placeholder="Enter First Name"
              required
              className="w-full px-3 py-2 rounded-lg 
      bg-[rgba(26,26,26,1)] 
      border border-[rgba(38,38,38,1)] 
      text-gray-400 placeholder-gray-500 
      focus:outline-none focus:border-[#999999]"
            />
          </div>

          {/* Last Name */}
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-[16px] text-white">
              Last Name
            </label>
            <input
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              placeholder="Enter Last Name"
              required
              className="w-full px-3 py-2 rounded-lg 
      bg-[rgba(26,26,26,1)] 
      border border-[rgba(38,38,38,1)] 
      text-gray-400 placeholder-gray-500 
      focus:outline-none focus:border-[#999999]"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-[16px] text-white">
              Email
            </label>
            <input
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter Email"
              type="email"
              required
              className="w-full px-3 py-2 rounded-lg 
      bg-[rgba(26,26,26,1)] 
      border border-[rgba(38,38,38,1)] 
      text-gray-400 placeholder-gray-500 
      focus:outline-none focus:border-[#999999]"
            />
          </div>

          {/* Phone */}
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-[16px] text-white">
              Phone Number
            </label>
            <input
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Enter Phone"
              required
              minLength={11}
              maxLength={11}
              pattern="[0-9]{11}"
              className="w-full px-3 py-2 rounded-lg 
      bg-[rgba(26,26,26,1)] 
      border border-[rgba(38,38,38,1)] 
      text-gray-400 placeholder-gray-500 
      focus:outline-none focus:border-[#999999]"
            />
          </div>

          {/* Buy / Rent */}
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-[16px] text-white">
              Buy or Rent
            </label>
            <select
              value={purchaseType}
              onChange={(e) => setPurchaseType(e.target.value)}
              required
              disabled={!!searchParams.get("type")} // Disable if came from URL
              className={`w-full px-3 py-2 rounded-lg 
      bg-[rgba(26,26,26,1)] 
      border border-[rgba(38,38,38,1)] 
      text-gray-400 
      focus:outline-none focus:border-[#999999]
      ${searchParams.get("type") ? "cursor-not-allowed opacity-70" : ""}`}
            >
              <option value="">Select Option</option>
              <option value="buy">Buy</option>
              <option value="rent">Rent</option>
            </select>
          </div>

          {/* Rent Duration */}
          {purchaseType === "rent" && (
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-[16px] text-white">
                Rent Duration
              </label>
              <select
                value={rentDuration}
                onChange={(e) => setRentDuration(e.target.value)}
                required
                className={`w-full px-3 py-2 rounded-lg 
        bg-[rgba(26,26,26,1)] 
        border border-[rgba(38,38,38,1)] 
        text-gray-400 
        focus:outline-none focus:border-[#999999]
        ${searchParams.get("duration") ? "cursor-not-allowed opacity-70" : ""}`}
                disabled={!!searchParams.get("duration")} // Disable if came from URL
              >
                <option value="">Select Duration</option>
                <option value="3">3 Months</option>
                <option value="6">6 Months</option>
                <option value="12">1 Year</option>
              </select>
            </div>
          )}

          {/* Message */}
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-[16px] text-white">
              Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              rows="4"
              placeholder="Enter Your Message"
              className="w-full px-3 py-2 rounded-lg 
      bg-[rgba(26,26,26,1)] 
      border border-[rgba(38,38,38,1)] 
      text-gray-400 placeholder-gray-500 
      focus:outline-none focus:border-[#999999]"
            />
          </div>

          {/* Submit */}
          {/* Submit */}
          <button
            type="submit"
            disabled={propertyStatus.status === "Occupied" || propertyStatus.status === "Sold"}
            className={`w-full md:w-auto px-6 py-3 rounded-lg font-medium transition
              ${propertyStatus.status === "Occupied" || propertyStatus.status === "Sold"
                ? "bg-gray-600 cursor-not-allowed text-gray-400"
                : "bg-[#703bf7] text-white hover:bg-[#5b2fd6]"}`}
          >
            {propertyStatus.status === "Occupied"
              ? "Unavailable (Rented)"
              : propertyStatus.status === "Sold"
                ? "Unavailable (Sold)"
                : "Send Message"}
          </button>
        </form>

      </section>

      <section className="w-full px-4 md:px-16 py-10 grid gap-6">
        <div className="w-full">
          <StarIcon />
          <aside className="grid gap-1 md:max-w-5xl">
            <h1 className="font-semibold text-[28px] md:text-[38px] leading-[150%] tracking-normal text-white">
              Comprehensive Pricing Details
            </h1>
            <p className="text-[#999999] font-medium text-[14px] md:text-base leading-[150%] tracking-normal">
              At Estatein, transparency is key. We want you to have a clear
              understanding of all costs associated with your property
              investment. Below, we break down the pricing for Seaside Serenity
              Villa to help you make an informed decision
            </p>
          </aside>
        </div>

        <div className="w-full grid gap-10">
          <aside className="w-full grid md:flex px-4 py-3 gap-2.5 md:py-5 md:px-10 border border-[rgba(38,38,38,1)] bg-[rgba(26,26,26,1)] rounded-lg items-center md:gap-5">
            <h6 className="text-white font-semibold text-[18px] md:text-[20px] leading-[150%] tracking-[0]">
              Note
            </h6>
            <span className="h-full border border-[rgba(38,38,38,1)]"></span>
            <p className="text-[#999999] font-medium text-[14px] leading-[150%] tracking-[0]">
              The figures provided above are estimates and may vary depending on
              the property, location, and individual circumstances.
            </p>
          </aside>

          <section className="w-full grid md:flex gap-5 md:gap-10">
            <aside className="w-full md:w-fit h-fit grid gap-0.5">
              <span className="text-[#999999] font-medium text-[14px] md:text-[16px] leading-[150%] tracking-[0]">
                Listing Price
              </span>
              <p className="text-white font-semibold text-[24px] md:text-[30px] leading-[150%] tracking-[0]">
                $1,250,000
              </p>
            </aside>

            <section className="w-full grid gap-5 md:gap-10">
              <div className="w-full grid gap-4 md:gap-7.5 p-4 md:p-7.5 border border-[rgba(38,38,38,1)] rounded-xl">
                <div className="w-full flex items-center justify-between text-white">
                  <h6 className="font-semibold text-[18px] md:text-[20px] leading-[150%] tracking-[0]">
                    Additional Fees
                  </h6>
                  <button className="rounded-lg bg-[rgba(26,26,26,1)] border border-[rgba(38,38,38,1)] px-4 py-2">
                    Learn More
                  </button>
                </div>
                <hr className="border border-[rgba(38,38,38,1)]" />
                <div className="w-full grid md:grid-cols-2 text-[#999999] gap-5">
                  <div className="grid gap-3 pr-1.5 md:border-r md:border-r-[rgba(38,38,38,1)]">
                    <span className="font-medium text-[14px] leading-[150%] tracking-[0]">
                      Property Transfer Tax
                    </span>
                    <p className="text-white font-semibold text-[20px] leading-[150%] tracking-[0] flex gap-3 items-center">
                      $25,000
                      <span className="border border-[rgba(38,38,38,1)] bg-[rgba(26,26,26,1)] text-[#999999] py-1 px-3 rounded-3xl font-medium text-[14px]">
                        Based on the sale price and local regulations
                      </span>
                    </p>
                  </div>
                  <hr className="md:hidden border border-[rgba(38,38,38,1)]" />
                  <div className="grid gap-3">
                    <span className="font-medium text-[14px] leading-[150%] tracking-[0]">
                      Legal Fees
                    </span>
                    <p className="text-white font-semibold text-[20px] leading-[150%] tracking-[0] flex gap-3 items-center">
                      $3,000
                      <span className="border border-[rgba(38,38,38,1)] bg-[rgba(26,26,26,1)] text-[#999999] py-1 px-3 rounded-3xl font-medium text-[14px]">
                        Approximate cost for legal services, including title
                        transfer
                      </span>
                    </p>
                  </div>
                </div>
                <hr className="border border-[rgba(38,38,38,1)]" />
                <div className="w-full grid md:grid-cols-2 text-[#999999] gap-5">
                  <div className="grid gap-3 pr-1.5 md:border-r md:border-r-[rgba(38,38,38,1)]">
                    <span className="font-medium text-[14px] leading-[150%] tracking-[0]">
                      Home Inspection
                    </span>
                    <p className="text-white font-semibold text-[20px] leading-[150%] tracking-[0] flex gap-3 items-center">
                      $500
                      <span className="border border-[rgba(38,38,38,1)] bg-[rgba(26,26,26,1)] text-[#999999] py-1 px-3 rounded-3xl font-medium text-[14px]">
                        Recommended for due diligence
                      </span>
                    </p>
                  </div>
                  <hr className="md:hidden border border-[rgba(38,38,38,1)]" />

                  <div className="grid gap-3">
                    <span className="font-medium text-[14px] leading-[150%] tracking-[0]">
                      Property Insurance
                    </span>
                    <p className="text-white font-semibold text-[20px] leading-[150%] tracking-[0] flex gap-3 items-center">
                      PKR 350,000
                      <span className="border border-[rgba(38,38,38,1)] bg-[rgba(26,26,26,1)] text-[#999999] py-1 px-3 rounded-3xl font-medium text-[14px]">
                        Annual cost for comprehensive property insurance
                      </span>
                    </p>
                  </div>
                </div>
                <hr className="border border-[rgba(38,38,38,1)]" />
                <div className="w-full grid text-[#999999] gap-5">
                  <div className="grid gap-3">
                    <span className="font-medium text-[14px] leading-[150%] tracking-[0]">
                      Mortage Fees
                    </span>
                    <p className="text-white font-semibold text-[20px] leading-[150%] tracking-[0] flex gap-3 items-center">
                      Varies
                      <span className="border border-[rgba(38,38,38,1)] bg-[rgba(26,26,26,1)] text-[#999999] py-1 px-3 rounded-3xl font-medium text-[14px]">
                        If applicable, consult with your lender for specific
                        details
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-full grid gap-4 md:gap-7.5 p-4 md:p-7.5 border border-[rgba(38,38,38,1)] rounded-xl">
                <div className="w-full flex items-center justify-between text-white">
                  <h6 className="font-semibold text-[18px] md:text-[20px] leading-[150%] tracking-[0]">
                    Monthly Costs
                  </h6>
                  <button className="rounded-lg bg-[rgba(26,26,26,1)] border border-[rgba(38,38,38,1)] px-4 py-2">
                    Learn More
                  </button>
                </div>
                <hr className="border border-[rgba(38,38,38,1)]" />
                <div className="w-full flex items-center justify-between text-[#999999] gap-5">
                  <div className="grid gap-3">
                    <span className="font-medium text-[14px] leading-[150%] tracking-[0]">
                      Property Taxes
                    </span>
                    <p className="text-white font-semibold text-[20px] leading-[150%] tracking-[0] flex gap-3 items-center">
                      $1,250
                      <span className="border border-[rgba(38,38,38,1)] bg-[rgba(26,26,26,1)] text-[#999999] py-1 px-3 rounded-3xl font-medium text-[14px]">
                        Approximate monthly property tax based on the sale price
                        and local rates
                      </span>
                    </p>
                  </div>
                </div>
                <hr className="border border-[rgba(38,38,38,1)]" />
                <div className="w-full flex items-center justify-between text-[#999999] gap-5">
                  <div className="grid gap-3">
                    <span className="font-medium text-[14px] leading-[150%] tracking-[0]">
                      Homeowners` Association Fee
                    </span>
                    <p className="text-white font-semibold text-[20px] leading-[150%] tracking-[0] flex gap-3 items-center">
                      $300
                      <span className="border border-[rgba(38,38,38,1)] bg-[rgba(26,26,26,1)] text-[#999999] py-1 px-3 rounded-3xl font-medium text-[14px]">
                        Monthly fee for common area maintenance and security
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-full grid gap-4 md:gap-7.5 p-4 md:p-7.5 border border-[rgba(38,38,38,1)] rounded-xl">
                <div className="w-full flex items-center justify-between text-white">
                  <h6 className="font-semibold text-[18px] md:text-[20px] leading-[150%] tracking-[0]">
                    Total Initial Costs
                  </h6>
                  <button className="rounded-lg bg-[rgba(26,26,26,1)] border border-[rgba(38,38,38,1)] px-4 py-2">
                    Learn More
                  </button>
                </div>
                <hr className="border border-[rgba(38,38,38,1)]" />
                <div className="w-full grid md:grid-cols-2 text-[#999999] gap-5">
                  <div className="grid gap-3 pr-1.5 md:border-r md:border-r-[rgba(38,38,38,1)]">
                    <span className="font-medium text-[14px] leading-[150%] tracking-[0]">
                      Listing Price
                    </span>
                    <p className="text-white font-semibold text-[20px] leading-[150%] tracking-[0] flex gap-3 items-center">
                      $1,250,000
                    </p>
                  </div>
                  <hr className="md:hidden border border-[rgba(38,38,38,1)]" />
                  <div className="grid gap-3">
                    <span className="font-medium text-[14px] leading-[150%] tracking-[0]">
                      Additional Fees
                    </span>
                    <p className="text-white font-semibold text-[20px] leading-[150%] tracking-[0] flex gap-3 items-center">
                      $29,700
                      <span className="border border-[rgba(38,38,38,1)] bg-[rgba(26,26,26,1)] text-[#999999] py-1 px-3 rounded-3xl font-medium text-[14px]">
                        Property transfer tax, legal fees, inspection, insurance
                      </span>
                    </p>
                  </div>
                </div>
                <hr className="border border-[rgba(38,38,38,1)]" />
                <div className="w-full grid md:grid-cols-2 text-[#999999] gap-5">
                  <div className="grid gap-3 pr-1.5 md:border-r md:border-r-[rgba(38,38,38,1)]">
                    <span className="font-medium text-[14px] leading-[150%] tracking-[0]">
                      Down Payment
                    </span>
                    <p className="text-white font-semibold text-[20px] leading-[150%] tracking-[0] flex gap-3 items-center">
                      $250,000
                      <span className="border border-[rgba(38,38,38,1)] bg-[rgba(26,26,26,1)] text-[#999999] py-1 px-3 rounded-3xl font-medium text-[14px]">
                        20%
                      </span>
                    </p>
                  </div>
                  <hr className="md:hidden border border-[rgba(38,38,38,1)]" />
                  <div className="grid gap-3">
                    <span className="font-medium text-[14px] leading-[150%] tracking-[0]">
                      Mortgage Amount
                    </span>
                    <p className="text-white font-semibold text-[20px] leading-[150%] tracking-[0] flex gap-3 items-center">
                      $1,000,000
                      <span className="border border-[rgba(38,38,38,1)] bg-[rgba(26,26,26,1)] text-[#999999] py-1 px-3 rounded-3xl font-medium text-[14px]">
                        If applicable
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-full grid gap-4 md:gap-7.5 p-4 md:p-7.5 border border-[rgba(38,38,38,1)] rounded-xl">
                <div className="w-full flex items-center justify-between text-white">
                  <h6 className="font-semibold text-[18px] md:text-[20px] leading-[150%] tracking-[0]">
                    Monthly Expenses
                  </h6>
                  <button className="rounded-lg bg-[rgba(26,26,26,1)] border border-[rgba(38,38,38,1)] px-4 py-2">
                    Learn More
                  </button>
                </div>
                <hr className="border border-[rgba(38,38,38,1)]" />
                <div className="w-full grid md:grid-cols-2 text-[#999999] gap-5">
                  <div className="grid gap-3 pr-1.5 md:border-r md:border-r-[rgba(38,38,38,1)]">
                    <span className="font-medium text-[14px] leading-[150%] tracking-[0]">
                      Property Taxes
                    </span>
                    <p className="text-white font-semibold text-[20px] leading-[150%] tracking-[0] flex gap-3 items-center">
                      $1,250
                    </p>
                  </div>
                  <hr className="md:hidden border border-[rgba(38,38,38,1)]" />
                  <div className="grid gap-3">
                    <span className="font-medium text-[14px] leading-[150%] tracking-[0]">
                      Homeowners` Association Fee
                    </span>
                    <p className="text-white font-semibold text-[20px] leading-[150%] tracking-[0] flex gap-3 items-center">
                      $300
                    </p>
                  </div>
                </div>
                <hr className="border border-[rgba(38,38,38,1)]" />
                <div className="w-full grid md:grid-cols-2 text-[#999999] gap-5">
                  <div className="grid gap-3 pr-1.5 md:border-r md:border-r-[rgba(38,38,38,1)]">
                    <span className="font-medium text-[14px] leading-[150%] tracking-[0]">
                      Mortgage Payment
                    </span>
                    <p className="text-white font-semibold text-[20px] leading-[150%] tracking-[0] flex gap-3 items-center">
                      Varies based on terms and interest rate
                      <span className="border border-[rgba(38,38,38,1)] bg-[rgba(26,26,26,1)] text-[#999999] py-1 px-3 rounded-3xl font-medium text-[14px]">
                        If applicable
                      </span>
                    </p>
                  </div>
                  <hr className="md:hidden border border-[rgba(38,38,38,1)]" />
                  <div className="grid gap-3 h-fit">
                    <span className="font-medium text-[14px] leading-[150%] tracking-[0]">
                      Property Insurance
                    </span>
                    <p className="text-white font-semibold text-[20px] leading-[150%] tracking-[0] flex gap-3 items-center">
                      $100
                      <span className="border border-[rgba(38,38,38,1)] bg-[rgba(26,26,26,1)] text-[#999999] py-1 px-3 rounded-3xl font-medium text-[14px]">
                        Approximate monthly cost
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </section>
        </div>
      </section>

      {content.map((section, idx) => (
        <section
          key={idx}
          className="w-full grid bg-[rgb(20,20,20)] gap-6 px-4 py-6 md:px-16 md:py-10"
        >
          <div className="w-full grid">
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
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </main>
  );
}
