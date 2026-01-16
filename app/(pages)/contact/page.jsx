'use client';
import React, { useState } from 'react';
import HeroSection from '@/app/components/web/common/HeroSection/page.jsx';
import ServiceCard from '@/app/components/web/common/ServiceCard/page';
import FormSelector from '@/app/components/web/common/FormSelector/page.jsx';
import StarIcon from '@/app/styles/svg/StarsIcon.jsx';
import Email from '@/app/styles/svg/Email';
import Phone from '@/app/styles/svg/Phone';
import Location from '@/app/styles/svg/Location';
import Socials from '@/app/styles/svg/Socials';
import { isUserLoggedIn } from '@/app/utils/authHelper';
import { userForm } from '../api/hello';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function Contact() {
  const router = useRouter();
  const [selectedValues, setSelectedValues] = useState({});
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
  });

  // Restore form data if available
  React.useEffect(() => {
    const savedData = localStorage.getItem("savedContactData");
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setFormData({
          firstName: parsed.firstName || '',
          lastName: parsed.lastName || '',
          email: parsed.email || '',
          phone: parsed.phone || '',
          message: parsed.message || '',
        });
        if (parsed.selectedValues) setSelectedValues(parsed.selectedValues);

        localStorage.removeItem("savedContactData");
        localStorage.removeItem("returnUrl");
        toast.success("Welcome back! Your message has been restored.");
      } catch (e) {
        console.error("Failed to restore form", e);
      }
    }
  }, []);

  const handleSelect = (title, value) => {
    setSelectedValues(prev => ({ ...prev, [title]: value }));
  };

  const handleForm = async (e) => {
    e.preventDefault();
    const form = e.target.closest("form");
    if (!form.reportValidity()) return;

    const finalData = { ...formData, ...selectedValues };

    // 🔹 Phone Number Validation (11 digits)
    const phoneRegex = /^[0-9]{11}$/;
    if (!phoneRegex.test(formData.phone)) {
      toast.error("Phone number must be exactly 11 digits.");
      return;
    }

    if (!isUserLoggedIn()) {
      // Save data for later
      localStorage.setItem("savedContactData", JSON.stringify(finalData));
      localStorage.setItem("returnUrl", "/contact");

      toast.info("Please login to send message. Your data has been saved.");
      router.push("/Login");
      return;
    }

    try {
      await userForm(finalData);
      setFormData({ firstName: '', lastName: '', email: '', phone: '', message: '' });
      setSelectedValues({});
      const checkbox = document.getElementById("terms-checkbox");
      if (checkbox) checkbox.checked = false;

      toast.success("Message sent successfully!");
    } catch (err) {
      console.error("Error submitting form:", err);
      toast.error("Failed to send message. Please try again.");
    }
  };

  const content = [
    { title: "Get in Touch with Estatein", desc: "Welcome to Estatein's Contact Us page." }
  ];

  const services = [
    { title: "info@estatein.com", icon: <Email /> },
    { title: "+1 (123) 456-7890", icon: <Phone /> },
    { title: "Main Headquarters", icon: <Location /> },
    { title: "Instagram LinkedIn Facebook", icon: <Socials /> },
  ];

  return (
    <main id='page-4'>
      {/* Hero Section */}
      <section className="bg-[#141414] md:pr-32 md:pl-16 md:py-24 px-4 py-12">
        <HeroSection title={content[0].title} desc={content[0].desc} />
      </section>

      {/* Services */}
      <section className="w-full grid grid-cols-2 md:grid-cols-4 gap-2.5 p-2.5 bg-[#141414] border border-[#262626]">
        {services.map((item, idx) => (
          <ServiceCard title={item.title} icon={item.icon} key={idx} />
        ))}
      </section>

      {/* Form */}
      <section className="w-full bg-[rgb(20,20,20)] gap-10 px-4 md:px-16 py-10 grid">
        <div>
          <StarIcon />
          <h1 className="font-semibold text-[28px] md:text-[38px] text-white">Let's Connect</h1>
        </div>

        <form className="w-full mx-auto grid gap-6 p-5 md:p-8 rounded-2xl border border-[#262626] shadow-lg" onSubmit={handleForm}>
          {/* Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <input type="text" placeholder="First Name" required
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-[#141414] border border-[#262626] text-gray-200"
            />
            <input type="text" placeholder="Last Name" required
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-[#141414] border border-[#262626] text-gray-200"
            />
            <input type="email" placeholder="Email" required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-[#141414] border border-[#262626] text-gray-200"
            />
          </div>

          {/* Dropdowns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <input type="tel" placeholder="Phone Number" required
              value={formData.phone}
              minLength={11}
              maxLength={11}
              pattern="[0-9]{11}"
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-[#141414] border border-[#262626] text-gray-200"
            />

            <FormSelector
              title="Inquiry Type"
              required
              options={["Buying", "Renting", "Selling"]}
              value={selectedValues["Inquiry Type"] || ""}
              onChange={(val) => handleSelect("Inquiry Type", val)}
            />

            <FormSelector
              title="How did you hear about us?"
              required
              options={["Google", "Social Media", "Friend / Referral", "Other"]}
              value={selectedValues["How did you hear about us?"] || ""}
              onChange={(val) => handleSelect("How did you hear about us?", val)}
            />
          </div>

          {/* Message */}
          <textarea placeholder="Message" required
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full h-32 px-3 py-2 rounded-lg bg-[#141414] border border-[#262626] text-gray-200"
          />

          {/* Terms */}
          <div className="flex items-center gap-2">
            <input id="terms-checkbox" type="checkbox" required />
            <span className="text-gray-400 text-sm">I agree with Terms</span>
          </div>

          <button type="submit"
            className="px-6 py-2 rounded-lg bg-[#703bf7] text-white"
          >
            Send your Message
          </button>
        </form>
      </section>
    </main>
  );
}
