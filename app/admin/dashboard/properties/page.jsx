"use client";

import React, { useState, useEffect } from "react";
import { getProperty, deleteProperty, updateProperty } from "@/app/(pages)/api/hello";
import { toast } from "sonner";
import { Pencil, Trash2, X, Upload } from "lucide-react";

export default function ManageProperties() {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [currentProperty, setCurrentProperty] = useState(null);
    const [formData, setFormData] = useState({
        Name: "",
        Desc: "",
        Bathroom: "",
        Rooms: "",
        type: "House",
        Area: "",
        buy_price: "",
        rent_price_3_months: "",
        rent_price_6_months: "",
        rent_price_annual: "",
        Location: "",
    });
    const [images, setImages] = useState([]);

    const fetchProperties = async () => {
        setLoading(true);
        try {
            const data = await getProperty();
            setProperties(data);
        } catch (error) {
            toast.error("Failed to fetch properties");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProperties();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this property?")) {
            try {
                await deleteProperty(id);
                toast.success("Property deleted");
                fetchProperties();
            } catch (error) {
                toast.error("Failed to delete property");
            }
        }
    };

    const handleEdit = (property) => {
        setCurrentProperty(property);
        setFormData({
            Name: property.Name || "",
            Desc: property.Desc || "",
            Bathroom: property.Bathroom || "",
            Rooms: property.Rooms || "",
            type: property.type || "House",
            Area: property.Area || "",
            buy_price: property.buy_price || "",
            rent_price_3_months: property.rent_price_3_months || "",
            rent_price_6_months: property.rent_price_6_months || "",
            rent_price_annual: property.rent_price_annual || "",
            Location: property.Location || "",
        });
        setImages([]);
        setEditModalOpen(true);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        setImages([...images, ...Array.from(e.target.files)]);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        console.log("Starting update for property:", currentProperty._id);
        try {
            const data = new FormData();
            data.append("id", currentProperty._id); // Add ID to body
            Object.keys(formData).forEach((key) => {
                data.append(key, formData[key]);
            });
            images.forEach((img) => data.append("images", img));

            const response = await updateProperty(currentProperty._id, data);
            console.log("Update response:", response);
            toast.success("Property updated successfully");
            setEditModalOpen(false);
            fetchProperties();
        } catch (error) {
            console.error("Update error object:", error);
            const errorMsg = error.response?.data?.msg || error.response?.data?.error || error.message || "Failed to update property";
            toast.error(errorMsg);
        }
    };

    if (loading) return <div className="p-8">Loading properties...</div>;

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold mb-6">Manage Properties</h2>

            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <table className="min-w-full leading-normal">
                    <thead>
                        <tr>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Property
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Location
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Type
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Price (Buy)
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {properties.map((property) => (
                            <tr key={property._id}>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 w-10 h-10">
                                            {property.images && property.images.length > 0 ? (
                                                <img
                                                    className="w-full h-full rounded-full object-cover"
                                                    src={`data:image/jpeg;base64,${property.images[0].data}`}
                                                    alt=""
                                                />
                                            ) : (
                                                <div className="w-full h-full rounded-full bg-gray-200"></div>
                                            )}
                                        </div>
                                        <div className="ml-3">
                                            <p className="text-gray-900 whitespace-no-wrap font-semibold">
                                                {property.Name}
                                            </p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    <p className="text-gray-900 whitespace-no-wrap">{property.Location}</p>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    <p className="text-gray-900 whitespace-no-wrap">{property.type}</p>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    <p className="text-gray-900 whitespace-no-wrap">
                                        {property.buy_price ? `$${property.buy_price}` : "N/A"}
                                    </p>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                                    <button
                                        onClick={() => handleEdit(property)}
                                        className="text-blue-600 hover:text-blue-900 mr-4"
                                    >
                                        <Pencil size={18} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(property._id)}
                                        className="text-red-600 hover:text-red-900"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Edit Modal */}
            {editModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center p-6 border-b">
                            <h3 className="text-2xl font-bold text-gray-800">Edit Property</h3>
                            <button
                                onClick={() => setEditModalOpen(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleUpdate} className="p-6 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Property Name</label>
                                    <input
                                        name="Name"
                                        value={formData.Name}
                                        onChange={handleChange}
                                        className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 outline-none"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                                    <input
                                        name="Location"
                                        value={formData.Location}
                                        onChange={handleChange}
                                        className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 outline-none"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Bathrooms</label>
                                    <input
                                        name="Bathroom"
                                        type="number"
                                        value={formData.Bathroom}
                                        onChange={handleChange}
                                        className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Rooms</label>
                                    <input
                                        name="Rooms"
                                        type="number"
                                        value={formData.Rooms}
                                        onChange={handleChange}
                                        className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Area (sq. ft)</label>
                                    <input
                                        name="Area"
                                        type="number"
                                        value={formData.Area}
                                        onChange={handleChange}
                                        className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
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
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea
                                    name="Desc"
                                    value={formData.Desc}
                                    onChange={handleChange}
                                    className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 outline-none"
                                    rows={4}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Buy Price</label>
                                    <input
                                        name="buy_price"
                                        type="number"
                                        value={formData.buy_price}
                                        onChange={handleChange}
                                        className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Rent 3 Months</label>
                                    <input
                                        name="rent_price_3_months"
                                        type="number"
                                        value={formData.rent_price_3_months}
                                        onChange={handleChange}
                                        className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Rent 6 Months</label>
                                    <input
                                        name="rent_price_6_months"
                                        type="number"
                                        value={formData.rent_price_6_months}
                                        onChange={handleChange}
                                        className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Rent Annual</label>
                                    <input
                                        name="rent_price_annual"
                                        type="number"
                                        value={formData.rent_price_annual}
                                        onChange={handleChange}
                                        className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 outline-none"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block mb-2 font-medium text-gray-700">Upload New Images (Optional)</label>
                                <div className="flex items-center justify-center w-full">
                                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <Upload className="w-8 h-8 mb-4 text-gray-500" />
                                            <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                        </div>
                                        <input
                                            type="file"
                                            multiple
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            className="hidden"
                                        />
                                    </label>
                                </div>
                                {images.length > 0 && (
                                    <p className="mt-2 text-sm text-gray-600">{images.length} new file(s) selected</p>
                                )}
                            </div>

                            <div className="flex justify-end space-x-4 border-t pt-6">
                                <button
                                    type="button"
                                    onClick={() => setEditModalOpen(false)}
                                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-md"
                                >
                                    Update Property
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
