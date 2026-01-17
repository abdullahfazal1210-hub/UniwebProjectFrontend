"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const formatTime = (datetime) => {
    const date = new Date(datetime);
    return date.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
    });
};

const ClientNeedTable = () => {
    const [inquiries, setInquiries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedInquiry, setSelectedInquiry] = useState(null);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                // Parallelize marking as read and fetching requests
                const [, res] = await Promise.all([
                    axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/notifications/mark-read/client-need`, {}, { withCredentials: true }),
                    axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/client-need`, { withCredentials: true })
                ]);
                setInquiries(res.data.data);
                setLoading(false);
            } catch (error) {
                console.log("Error fetching requests:", error);
            }
        };

        fetchMessages();
    }, []);

    if (loading) return <div className="p-8 text-gray-700">Loading Client Needs...</div>;

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Client Needs / Property Inquiries</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md text-sm">
                    <thead className="bg-[#703bf7] text-white">
                        <tr>
                            <th className="py-4 px-3 text-left">Client</th>
                            <th className="py-4 px-3 text-left">Location</th>
                            <th className="py-4 px-3 text-left">Type</th>
                            <th className="py-4 px-3 text-left">Budget</th>
                            <th className="py-4 px-3 text-left">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {inquiries.length > 0 ? (
                            inquiries.map((inquiry, index) => (
                                <tr
                                    key={index}
                                    className={`border-t ${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100 transition`}
                                >
                                    <td className="py-3 px-3">
                                        <div className="font-semibold">{inquiry.firstName} {inquiry.lastName}</div>
                                        <div className="text-xs text-gray-500">{formatTime(inquiry.date)}</div>
                                    </td>
                                    <td className="py-3 px-3">{inquiry.preferredLocation || "-"}</td>
                                    <td className="py-3 px-3">
                                        <span className="bg-blue-100 text-blue-800 py-1 px-2 rounded-md text-xs font-semibold">
                                            {inquiry.propertyType || "Any"}
                                        </span>
                                    </td>
                                    <td className="py-3 px-3 font-mono text-green-700 font-medium">
                                        PKR {inquiry.budget || "N/A"}
                                    </td>
                                    <td className="py-3 px-3">
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() => setSelectedInquiry(inquiry)}
                                                >
                                                    View Details
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent className="max-w-xl bg-white text-black border shadow-lg max-h-[90vh] overflow-y-auto">
                                                <DialogHeader>
                                                    <DialogTitle className="text-xl font-bold flex flex-col gap-1">
                                                        <span>Client Requirement Details</span>
                                                        <span className="text-sm font-normal text-gray-500">Submitted on {formatTime(inquiry.date)}</span>
                                                    </DialogTitle>
                                                </DialogHeader>

                                                <div className="grid grid-cols-2 gap-4 mt-4 text-black">
                                                    <div className="col-span-2 md:col-span-1">
                                                        <h4 className="text-sm font-semibold text-gray-500 uppercase">Client Info</h4>
                                                        <p className="font-medium text-lg">{inquiry.firstName} {inquiry.lastName}</p>
                                                        <p className="text-sm text-gray-600">{inquiry.email}</p>
                                                        <p className="text-sm text-gray-600">{inquiry.phone}</p>
                                                    </div>

                                                    <div className="col-span-2 md:col-span-1">
                                                        <h4 className="text-sm font-semibold text-gray-500 uppercase">Preferences</h4>
                                                        <p><span className="font-medium">Location:</span> {inquiry.preferredLocation || "Any"}</p>
                                                        <p><span className="font-medium">Type:</span> {inquiry.propertyType || "Any"}</p>
                                                        <p><span className="font-medium">Budget:</span> PKR {inquiry.budget || "N/A"}</p>
                                                    </div>

                                                    <div className="col-span-2 md:col-span-1 border-t pt-2">
                                                        <h4 className="text-sm font-semibold text-gray-500 uppercase">Specifications</h4>
                                                        <p><span className="font-medium">Bedrooms:</span> {inquiry.noOfBedrooms || "-"}</p>
                                                        <p><span className="font-medium">Bathrooms:</span> {inquiry.noOfBathrooms || "-"}</p>
                                                    </div>

                                                    <div className="col-span-2 md:col-span-1 border-t pt-2">
                                                        <h4 className="text-sm font-semibold text-gray-500 uppercase">Contact Method</h4>
                                                        <div className="flex gap-2 mt-1">
                                                            {inquiry.contactMethod && inquiry.contactMethod.length > 0 ?
                                                                inquiry.contactMethod.map(m => (
                                                                    <span key={m} className="px-2 py-1 bg-gray-200 rounded text-xs capitalize border border-gray-300">{m}</span>
                                                                )) : <span className="text-gray-400 text-sm">Not specified</span>
                                                            }
                                                        </div>
                                                    </div>

                                                    <div className="col-span-2 border-t pt-2">
                                                        <h4 className="text-sm font-semibold text-gray-500 uppercase">Message</h4>
                                                        <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded mt-1 border">
                                                            {inquiry.message || "No message provided."}
                                                        </p>
                                                    </div>
                                                </div>

                                            </DialogContent>
                                        </Dialog>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="text-center py-8 text-gray-500">
                                    No client needs found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ClientNeedTable;
