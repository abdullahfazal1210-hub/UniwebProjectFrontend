"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import axios from 'axios';
import { toast } from 'sonner';
import Image from 'next/image';

export default function History() {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // Check login
        const user = localStorage.getItem("userName");
        const token = document.cookie.includes("authToken");

        if (!user && !token) {
            toast.error("Please login to view history");
            router.push("/Login");
            return;
        }

        const fetchHistory = async () => {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/history`, {
                    withCredentials: true
                });
                setHistory(res.data.data);
            } catch (error) {
                console.error("Error fetching history:", error);
                toast.error(error.response?.data?.msg || "Failed to fetch history");
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, [router]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[rgba(26,26,26,1)] flex items-center justify-center text-white">
                Loading...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[rgba(26,26,26,1)] pt-24 px-4 md:px-16 pb-10">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">My History</h1>
                        <p className="text-[#999999]">View your rented and purchased properties.</p>
                    </div>
                    {/* Optional: Add search or filter here */}
                </div>

                {history.length === 0 ? (
                    <div className="text-center text-white text-lg py-10 border border-[#262626] rounded-lg bg-[#141414]">
                        No history found. You haven't rented or bought any properties yet.
                    </div>
                ) : (
                    <div className="overflow-x-auto rounded-lg border border-[#262626]">
                        <table className="w-full text-left text-sm text-[#999999]">
                            <thead className="bg-[#141414] text-white uppercase text-xs">
                                <tr>
                                    <th scope="col" className="px-6 py-4 font-medium">Property</th>
                                    <th scope="col" className="px-6 py-4 font-medium">Type</th>
                                    <th scope="col" className="px-6 py-4 font-medium">Price/Terms</th>
                                    <th scope="col" className="px-6 py-4 font-medium">Location</th>
                                    <th scope="col" className="px-6 py-4 font-medium">Status</th>
                                    <th scope="col" className="px-6 py-4 font-medium">Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#262626] bg-[#1A1A1A]">
                                {history.map((item, idx) => {
                                    const p = item.propertyDetails || {};
                                    // Handle Image (Base64)
                                    const imgSrc = item.image && item.image.data
                                        ? `data:image/jpeg;base64,${item.image.data}`
                                        : null;

                                    return (
                                        <tr key={item._id || idx} className="hover:bg-[#202020] transition-colors">
                                            {/* Property Column: Image + Name */}
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-16 h-16 shrink-0 bg-[#262626] rounded overflow-hidden relative">
                                                        {imgSrc ? (
                                                            <Image
                                                                src={imgSrc}
                                                                alt={p.Name || "Property"}
                                                                fill
                                                                className="object-cover"
                                                            />
                                                        ) : (
                                                            <div className="w-full h-full flex items-center justify-center text-xs">No Image</div>
                                                        )}
                                                    </div>
                                                    <div>
                                                        <div className="font-medium text-white text-base">{p.Name || item.propertyTitle}</div>
                                                        <div className="text-xs mt-1">{p.type}</div>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Type Column */}
                                            <td className="px-6 py-4">
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${item.purchaseType === 'buy' ? 'bg-purple-500/10 text-purple-500' : 'bg-blue-500/10 text-blue-500'
                                                    }`}>
                                                    {item.purchaseType}
                                                </span>
                                            </td>

                                            {/* Price Column */}
                                            <td className="px-6 py-4 text-white">
                                                {item.purchaseType === 'buy' ? (
                                                    <span className="font-semibold">${p.buy_price?.toLocaleString()}</span>
                                                ) : (
                                                    <div className="flex flex-col">
                                                        <span className="font-semibold">
                                                            {/* Display price based on duration for rental */}
                                                            {item.rentDuration === "3" && `Pkr - ${p.rent_price_3_months?.toLocaleString()}`}
                                                            {item.rentDuration === "6" && `pkr ${p.rent_price_6_months?.toLocaleString()}`}
                                                            {item.rentDuration === "12" && `pkr ${p.rent_price_annual?.toLocaleString()}`}
                                                            {/* Fallback if logic fails */}
                                                            {!["3", "6", "12"].includes(item.rentDuration) && "Check Details"}
                                                        </span>
                                                        <span className="text-xs text-[#999999]">{item.rentDuration} Months</span>
                                                    </div>
                                                )}
                                            </td>

                                            {/* Location Column */}
                                            <td className="px-6 py-4">
                                                {p.Location || "N/A"}
                                            </td>

                                            {/* Status Column */}
                                            <td className="px-6 py-4">
                                                <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-500 border border-green-500/20">
                                                    {item.status || "Accepted"}
                                                </span>
                                            </td>

                                            {/* Date Column */}
                                            <td className="px-6 py-4 text-xs">
                                                {item.date ? new Date(item.date).toLocaleDateString() : 'N/A'}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
