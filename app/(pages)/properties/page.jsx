'use client';
import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { useRouter } from "next/navigation";

// shadcn comps
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import dynamic from 'next/dynamic';

// components
import HeroSection from '@/app/components/web/common/HeroSection/page.jsx'
const Slider = dynamic(() => import('@/app/components/web/common/Slider/page.jsx'), {
  ssr: false,
  loading: () => <div className="w-full h-80 bg-gray-900 animate-pulse rounded-xl" />
});
import FormSelector from '@/app/components/web/common/FormSelector/page';

// fetch data
import getProperty from '@/app/action/getProperty.js';
import getFilter from '@/app/action/getFilter.js';
import { submitClientNeed } from '@/app/(pages)/api/hello.js';
import { toast } from "sonner";
import { isUserLoggedIn } from '@/app/utils/authHelper';

// icons
import StarIcon from '@/app/styles/svg/StarsIcon.jsx';
import Dropdown from '@/app/styles/svg/Dropdown.jsx';
import MiniPhone from '@/app/styles/svg/MiniPhone.jsx';
import Email from '@/app/styles/svg/MiniEmail.jsx';
import SearchIcon from '@/app/styles/svg/SearchIcon.jsx';
import LocationIcon from '@/app/styles/svg/LocationIcon.jsx';
import AreaIcon from '@/app/styles/svg/AreaIcon.jsx';
import CalendarIcon from '@/app/styles/svg/CalenderIcon.jsx';
import PriceIcon from '@/app/styles/svg/PriceIcon.jsx';
import TypeIcon from '@/app/styles/svg/PropertyType.jsx';

export default function Properties() {

  const [propertyData, setPropertyData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchedData, setSearchedData] = useState([]);
  const [filterData, setFilterData] = useState({
    locations: [],
    sizes: [],
    purposes: [], // Renamed from buildYears
    prices: [],
    types: [],
  });
  const [selectedValues, setSelectedValues] = useState({}); // record: title -> selected value

  // City/Area Data
  const cities = ["Karachi", "Islamabad"];
  const areas = {
    "Karachi": ["DHA Defence", "Clifton", "Gulshan-e-Iqbal", "PECHS", "Bahria Town", "North Nazimabad", "Malir", "Gulistan-e-Jauhar"],
    "Islamabad": ["DHA Defence", "Bahria Town", "Sector F-10", "Sector F-11", "Sector E-11", "Sector G-13", "Gulberg", "Bani Gala"]
  };

  const [selectedCity, setSelectedCity] = useState("Karachi"); // Default City

  // Client Need Form State
  const [clientForm, setClientForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: ""
  });
  const [contactMethods, setContactMethods] = useState({
    phone: false,
    email: false
  });

  const router = useRouter();


  // Restore form data if available
  useEffect(() => {
    const savedData = localStorage.getItem("savedClientNeed");
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        // Restore detailed fields
        setClientForm(prev => ({
          ...prev,
          firstName: parsed.firstName || "",
          lastName: parsed.lastName || "",
          email: parsed.email || "",
          phone: parsed.phone || "",
          message: parsed.message || ""
        }));
        // Restore selected values
        if (parsed.selectedValues) setSelectedValues(parsed.selectedValues);
        if (parsed.selectedCity) setSelectedCity(parsed.selectedCity);

        // Clear storage
        localStorage.removeItem("savedClientNeed");
        localStorage.removeItem("returnUrl");

        toast.success("Welcome back! Your form has been restored.");
      } catch (e) {
        console.error("Failed to restore form", e);
      }
    }
  }, []);

  const handleClientSubmit = async (e) => {
    e.preventDefault();

    // Gather all data
    const payload = {
      ...clientForm,
      preferredLocation: `${selectedValues["Preferred Location"] || "Any"}, ${selectedCity}`, // Combine Area + City
      propertyType: selectedValues["Property Type"] || "",
      noOfBathrooms: selectedValues["No. of Bathrooms"] || "",
      noOfBedrooms: selectedValues["No. of Bedrooms"] || "",
      budget: selectedValues["Select Budget"] || "",
      contactMethod: Object.keys(contactMethods).filter(k => contactMethods[k]),
      message: clientForm.message,
      // Helper for restoring state
      selectedValues: selectedValues,
      selectedCity: selectedCity
    };

    // 🔹 Phone Number Validation (11 digits)
    const phoneRegex = /^[0-9]{11}$/;
    if (!phoneRegex.test(clientForm.phone)) {
      toast.error("Phone number must be exactly 11 digits.");
      return;
    }

    if (!isUserLoggedIn()) {
      localStorage.setItem("savedClientNeed", JSON.stringify(payload));
      localStorage.setItem("returnUrl", "/properties");
      toast.info("Please login to submit. Your data will be saved.");
      router.push("/Login");
      return;
    }

    try {
      await submitClientNeed(payload);
      toast.success("Request submitted successfully!");
      // Reset
      setClientForm({ firstName: "", lastName: "", email: "", phone: "", message: "" });
      setContactMethods({ phone: false, email: false });
      setSelectedValues({});
    } catch (error) {
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        // Token expired or invalid
        localStorage.setItem("savedClientNeed", JSON.stringify(payload));
        localStorage.setItem("returnUrl", "/properties");

        // Clear stale user data
        localStorage.removeItem("userName");
        document.cookie = "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

        toast.error("Session expired. Please login again.");
        router.push("/Login");
      } else {
        toast.error("Failed to submit request.");
      }
    }
  };

  const filteredData = useMemo(() => {
    return propertyData.filter((property) => {
      // 1. Check Search Term (Global search)
      if (searchTerm.trim()) {
        const matchesSearch = [property.title, property.location, property.type, property.description]
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        if (!matchesSearch) return false;
      }

      // 2. Check Filters
      return Object.entries(selectedValues).every(([title, value]) => {
        if (!value) return true; // skip if no filter selected

        switch (title) {
          case "Location":
            return property.location?.toLowerCase() === value.toLowerCase();
          case "Property Size":
            return String(property.size) === String(value);
          case "Property Type":
            return property.type === value;
          case "Search Purpose":
            // Just acts as a mode selector for Price, doesn't filter by itself unless we want to filter properties that allow rent?
            // For now, we assume all properties support all modes as per data, 
            // or we allow it to pass. The REAL filtering happens in Pricing Range.
            return true;
          case "Pricing Range":
            // Logic: Property Price <= Selected Price
            // Which price? Depends on "Search Purpose"
            const purpose = selectedValues["Search Purpose"];
            let targetPrice = property.buy_price; // Default to Buy

            if (purpose === "Rent 3 Months") targetPrice = property.rent_price_3_months;
            else if (purpose === "Rent 6 Months") targetPrice = property.rent_price_6_months;
            else if (purpose === "Rent Annual") targetPrice = property.rent_price_annual;

            // Allow if targetPrice exists and is less than budget
            // Parse "1,200,000" -> 1200000
            const maxPrice = parseInt(value.replace(/,/g, ''), 10);
            return targetPrice && targetPrice <= maxPrice;

          default:
            return true;
        }
      });
    });
  }, [propertyData, selectedValues, searchTerm]);

  const content = [
    {
      title: "Find Your Dream Property",
      desc: "Welcome to Estatein, where your dream property awaits in every corner of our beautiful world. Explore our curated selection of properties, each offering a unique story and a chance to redefine your life. With categories to suit every dreamer, your journey"
    }
  ];

  const secContent = [
    {
      title: "Discover a World of Possibilities",
      desc: "Our portfolio of properties is as diverse as your dreams. Explore the following categories to find the perfect property that resonates with your vision of home.",
      type: "property",
      data: filteredData // simplified: searchedData logic merged into filteredData
    },
    {
      title: "What Our Clients Say",
      desc: "Read the success stories and heartfelt testimonials from our valued clients. Discover why they chose Estatein for their real estate needs.",
      type: "form",
      data: [],
    },
  ];

  const filter = [
    { icon: <LocationIcon />, title: "Location", options: filterData.locations || [] },
    { icon: <TypeIcon />, title: "Property Type", options: filterData.types || [] },
    { icon: <PriceIcon />, title: "Pricing Range", options: filterData.prices || [] },
    { icon: <AreaIcon />, title: "Property Size", options: filterData.sizes || [] },
    { icon: <CalendarIcon />, title: "Search Purpose", options: filterData.purposes || [] }, // Changed from Build Year
  ];


  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resProperty, resFilter] = await Promise.all([
          getProperty(),
          getFilter()
        ]);

        setPropertyData(resProperty.data || resProperty);
        setFilterData(resFilter.data || resFilter);

      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  // helper to normalize option shape to { label, value }
  const normalizeOptions = (opts) =>
    (opts || []).map((o) => {
      if (!o && o !== 0) return { label: "", value: "" };

      // if it's a simple string, use it for both label & value
      if (typeof o === "string" || typeof o === "number") {
        const s = String(o);
        return { label: s, value: s };
      }

      // if object already has label & value, use it
      if (typeof o === "object") {
        if ("label" in o && "value" in o) return { label: String(o.label), value: String(o.value) };

        // fallback: try some common fields
        if ("name" in o) return { label: String(o.name), value: String(o.name) };
        if ("title" in o) return { label: String(o.title), value: String(o.title) };
        if ("id" in o) return { label: String(o.id), value: String(o.id) };

        // last resort: stringify the object
        return { label: JSON.stringify(o), value: JSON.stringify(o) };
      }

      // fallback
      return { label: String(o), value: String(o) };
    });

  const normalizedFilter = useMemo(
    () => filter.map((f) => ({ ...f, options: normalizeOptions(f.options) })),
    [filterData] // recompute when raw data changes
  );

  const handleSelect = (title, value) => {
    setSelectedValues((prev) => ({ ...prev, [title]: value }));
  };

  const handleSearch = useCallback(() => {
    // if empty, reset to filteredData (so it still applies dropdown filters)
    if (!searchTerm.trim()) {
      setSearchedData(filteredData);
      return;
    }

    // filter within the already filtered data (so filters + search stack together)
    const results = filteredData.filter((property) =>
      [property.title]
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );

    setSearchedData(results);
  }, [searchTerm, filteredData]);


  return (
    <main id='page-3'>
      <section className="bg-[#141414] bg-[linear-gradient(95.93deg,#262626_-26.82%,rgba(38,38,38,0)_40.46%)] border-b border-b-[#262626] px-4 pt-6 pb-25 md:pr-40 md:pl-16 md:pt-24 md:pb-36 relative">
        <HeroSection title={content[0].title} desc={content[0].desc} />
        <aside className="w-full px-4 md:px-16 md:py-10 grid place-items-center absolute top-full -translate-y-[15%] left-1/2 -translate-x-[50%] md:top-full md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2">
          <div className="w-full md:w-2/4 flex items-center rounded-lg overflow-hidden p-4 bg-[#141414] border border-[#262626] shadow-[0_0_0_10px_#191919]">
            <input type="text"
              placeholder="Search For A Property"
              value={searchTerm}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full text-white outline-none font-medium text-[16px] md:text-[20px] leading-[150%] tracking-[0]" />

            <Button
              className="hidden md:flex px-3 bg-[#703bf7] text-white cursor-pointer"
              onClick={handleSearch}
            >
              <span>
                <SearchIcon />
              </span>
              Find Property
            </Button>
            <Button
              className="md:hidden px-3 bg-[#703bf7] text-white cursor-pointer"
              onClick={handleSearch}
            >
              <SearchIcon />
            </Button>
          </div>
          <div className="w-full grid md:grid-cols-5 gap-4 p-2.5 rounded-lg bg-[rgba(26,26,26,1)]">
            {normalizedFilter.map((f) => (
              <div
                key={f.title}
                className="w-full flex items-center justify-between gap-2 border border-[#262626] bg-[rgba(20,20,20,1)] px-3.5 py-3 rounded-lg text-[rgba(153,153,153,1)]"
              >
                <aside className="h-full flex items-center gap-2.5 text-[#C8D1D4]">
                  {f.icon}
                  <span className="h-full border border-[#262626]" />
                  {selectedValues[f.title] || f.title}
                </aside>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild className='rounded-full'>
                    <Button className='rounded-full'>
                      <Dropdown />
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent className="w-56 border border-[#262626] bg-[#1A1A1A] text-[#C8D1D4]">
                    <DropdownMenuLabel>{f.title}</DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-[#262626]" />

                    {f.options.map((opt) => (
                      <DropdownMenuCheckboxItem
                        key={opt.value}
                        checked={selectedValues[f.title] === opt.value}
                        // only set the value when checked; unchecking clears it
                        onCheckedChange={(checked) => handleSelect(f.title, checked ? opt.value : "")}
                      >
                        {opt.label}
                      </DropdownMenuCheckboxItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}
          </div>
        </aside>
      </section>


      {secContent.map((section, idx) => (
        <section key={idx} className={`w-full grid bg-[rgb(20,20,20)] gap-6 px-4 md:px-16 ${idx === 0 ? "pt-110 pb-10 md:pt-30" : "py-6 md:py-10"
          }`}>
          <div className='w-full grid'>

            {/* Header */}
            <StarIcon />
            <div className="w-full  flex items-center justify-between">
              <aside className="grid gap-1 max-w-5xl">
                <h1 className="font-semibold text-[28px] md:text-[38px] leading-[150%] tracking-normal text-white">
                  {section.title}
                </h1>
                <p className="text-[#999999] font-medium text-[14px] md:text-base leading-[150%] tracking-normal">
                  {section.desc}
                </p>
              </aside>
            </div>
          </div>

          {/* Slider */}
          <div className="w-full">
            {section.type === "property" ? (
              <div className="grid grid-cols-3">
                <Slider type={section.type} data={section.data} />
              </div>
            ) : section.type === "form" ? (
              <form
                onSubmit={handleClientSubmit}
                className="w-full mx-auto grid gap-6 p-4 md:p-8 rounded-2xl border border-[#262626] shadow-lg"
              >
                {/* Row 1 */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="font-semibold text-[16px] leading-[150%] tracking-[0px] text-[rgba(255,255,255,1)]">First Name</label>
                    <input
                      type="text"
                      placeholder="Enter First Name"
                      required
                      value={clientForm.firstName}
                      onChange={(e) => setClientForm({ ...clientForm, firstName: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-[#141414] border border-[#262626] text-gray-200 placeholder-gray-500 focus:outline-none focus:border-[#999999]"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-semibold text-[16px] leading-[150%] tracking-[0px] text-[rgba(255,255,255,1)]">Last Name</label>
                    <input
                      type="text"
                      placeholder="Enter Last Name"
                      required
                      value={clientForm.lastName}
                      onChange={(e) => setClientForm({ ...clientForm, lastName: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-[#141414] border border-[#262626] text-gray-200 placeholder-gray-500 focus:outline-none focus:border-[#999999]"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-semibold text-[16px] leading-[150%] tracking-[0px] text-[rgba(255,255,255,1)]">Email</label>
                    <input
                      type="email"
                      placeholder="Enter your Email"
                      required
                      value={clientForm.email}
                      onChange={(e) => setClientForm({ ...clientForm, email: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-[#141414] border border-[#262626] text-gray-200 placeholder-gray-500 focus:outline-none focus:border-[#999999]"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-semibold text-[16px] leading-[150%] tracking-[0px] text-[rgba(255,255,255,1)]">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="Enter Phone Number"
                      required
                      minLength={11}
                      maxLength={11}
                      pattern="[0-9]{11}"
                      value={clientForm.phone}
                      onChange={(e) => setClientForm({ ...clientForm, phone: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-[#141414] border border-[#262626] text-gray-200 placeholder-gray-500 focus:outline-none focus:border-[#999999]"
                    />
                  </div>
                </div>

                {/* Row 2 (City, Area, Property Type, Bathrooms) */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* City Selector */}
                  <FormSelector
                    title="Select City"
                    options={cities}
                    value={selectedCity}
                    onChange={(val) => {
                      setSelectedCity(val);
                      // Reset area when city changes
                      handleSelect("Preferred Location", "");
                    }}
                  />

                  {/* Dynamic Area Selector */}
                  <FormSelector
                    title="Preferred Area"
                    options={areas[selectedCity] || []}
                    value={selectedValues["Preferred Location"]}
                    onChange={(val) => handleSelect("Preferred Location", val)}
                  />

                  <FormSelector
                    title="Property Type"
                    options={["Apartment", "House", "Villa", "Condo", "Plot"]}
                    value={selectedValues["Property Type"]}
                    onChange={(val) => handleSelect("Property Type", val)}
                  />

                  <FormSelector
                    title="No. of Bathrooms"
                    options={[1, 2, 3, 4, 5, 6, 7]}
                    value={selectedValues["No. of Bathrooms"]}
                    onChange={(val) => handleSelect("No. of Bathrooms", val)}
                  />
                </div>

                {/* Row 3 (Bedrooms, Budget) */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <FormSelector
                    title="No. of Bedrooms"
                    options={[1, 2, 3, 4, 5, 6, 7]}
                    value={selectedValues["No. of Bedrooms"]}
                    onChange={(val) => handleSelect("No. of Bedrooms", val)}
                  />

                  <FormSelector
                    title="Select Budget (PKR)"
                    options={["1 Crore - 2 Crore", "2 Crore - 5 Crore", "5 Crore - 10 Crore", "10 Crore - 20 Crore", "20 Crore+"]}
                    value={selectedValues["Select Budget"]}
                    onChange={(val) => handleSelect("Select Budget", val)}
                  />
                </div>

                {/* Contact Method */}
                <div className="flex flex-col gap-2">
                  <label className="font-semibold text-[16px] leading-[150%] tracking-[0px] text-white">
                    Preferred Contact Method
                  </label>
                  <div className='grid md:grid-cols-2 gap-2'>
                    {/* Phone Option */}
                    <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-[#141414] border border-[#262626] text-gray-200">
                      <aside className="flex items-center gap-2.5 text-gray-500">
                        <MiniPhone />
                        <span>Phone</span>
                      </aside>
                      <input
                        type="checkbox"
                        checked={contactMethods.phone}
                        onChange={(e) => setContactMethods({ ...contactMethods, phone: e.target.checked })}
                        className="appearance-none w-4 h-4 border-2 border-[#B9B8C3] rounded-full cursor-pointer checked:bg-[#3c53c7] checked:border-[#3c53c7] transition duration-300"
                      />
                    </div>

                    {/* Email Option */}
                    <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-[#141414] border border-[#262626] text-gray-200">
                      <aside className="flex items-center gap-2.5 text-gray-500">
                        <Email />
                        <span>Email</span>
                      </aside>
                      <input
                        type="checkbox"
                        checked={contactMethods.email}
                        onChange={(e) => setContactMethods({ ...contactMethods, email: e.target.checked })}
                        className="appearance-none w-4 h-4 border-2 border-[#B9B8C3] rounded-full cursor-pointer checked:bg-[#3c53c7] checked:border-[#3c53c7] transition duration-300"
                      />
                    </div>
                  </div>
                </div>

                {/* Message */}
                <div className="flex flex-col gap-2">
                  <label className="font-semibold text-[16px] leading-[150%] tracking-[0px] text-[rgba(255,255,255,1)]">Message</label>
                  <textarea
                    placeholder="Enter Your Message Here..."
                    value={clientForm.message}
                    onChange={(e) => setClientForm({ ...clientForm, message: e.target.value })}
                    className="w-full h-32 px-3 py-2 rounded-lg bg-[#141414] border border-[#262626] text-gray-200 placeholder-gray-500 focus:outline-none focus:border-[#999999] resize-none"
                  />
                </div>

                {/* Terms + Submit */}
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
            ) : null}
          </div>
        </section>
      ))}

    </main>
  )
}
