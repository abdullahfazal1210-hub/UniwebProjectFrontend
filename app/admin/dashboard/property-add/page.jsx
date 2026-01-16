"use client";

import React, { useState } from "react";
import { uploadProperty } from "@/app/(pages)/api/hello";
import { toast } from "sonner";

export default function PropertyAdd() {
  const [formData, setFormData] = useState({
    propertyName: "",
    description: "",
    bathrooms: "",
    rooms: "",
    type: "House",
    area: "",
    buy_price: "",
    rent_price_3_months: "",
    rent_price_6_months: "",
    rent_price_annual: "",
    location: "",
  });

  const [images, setImages] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImages([...images, ...Array.from(e.target.files)]);
  };

  const fileInputRef = React.useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      data.append("Name", formData.propertyName);
      data.append("Desc", formData.description);
      data.append("Bathroom", formData.bathrooms);
      data.append("Rooms", formData.rooms);
      data.append("type", formData.type);
      data.append("Area", formData.area);
      data.append("buy_price", formData.buy_price);
      data.append("rent_price_3_months", formData.rent_price_3_months);
      data.append("rent_price_6_months", formData.rent_price_6_months);
      data.append("rent_price_annual", formData.rent_price_annual);
      data.append("Location", formData.location);
      images.forEach((img) => data.append("images", img));

      const res = await uploadProperty(data);

      if (res.status === 200) {
        toast.success("Property uploaded");
        setFormData({
          propertyName: "",
          description: "",
          bathrooms: "",
          rooms: "",
          type: "House",
          area: "",
          buy_price: "",
          rent_price_3_months: "",
          rent_price_6_months: "",
          rent_price_annual: "",
          location: "",
        });
        setImages([]);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to add property");
    }
  };

  return (
    <div className=" mx-auto p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Add New Property
      </h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-8 space-y-6"
        encType="multipart/form-data"
      >
        {/* Property Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="propertyName"
            value={formData.propertyName}
            onChange={handleChange}
            placeholder="Property Name"
            className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <input
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Location"
            className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <input
            name="bathrooms"
            type="number"
            value={formData.bathrooms}
            onChange={handleChange}
            placeholder="Bathrooms"
            className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <input
            name="rooms"
            type="number"
            value={formData.rooms}
            onChange={handleChange}
            placeholder="Rooms"
            className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <input
            name="area"
            type="number"
            value={formData.area}
            onChange={handleChange}
            placeholder="Area (sq. ft)"
            className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="House">House</option>
            <option value="Apartment">Apartment</option>
            <option value="Villa">Villa</option>
          </select>
        </div>

        {/* Description */}
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 outline-none"
          rows={4}
        />

        {/* Pricing */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="buy_price"
            type="number"
            value={formData.buy_price}
            onChange={handleChange}
            placeholder="Buy Price"
            className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <input
            name="rent_price_3_months"
            type="number"
            value={formData.rent_price_3_months}
            onChange={handleChange}
            placeholder="Rent 3 Months"
            className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <input
            name="rent_price_6_months"
            type="number"
            value={formData.rent_price_6_months}
            onChange={handleChange}
            placeholder="Rent 6 Months"
            className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <input
            name="rent_price_annual"
            type="number"
            value={formData.rent_price_annual}
            onChange={handleChange}
            placeholder="Rent Annual"
            className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">Upload Images</label>
          <input
            type="file"
            multiple
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
            className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500 outline-none"
          />
          {images.length > 0 && (
            <p className="mt-2 text-sm text-gray-600">{images.length} file(s) selected</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 transition-colors text-white font-semibold py-3 rounded-lg shadow-md"
        >
          Add Property
        </button>
      </form>
    </div>
  );
}
