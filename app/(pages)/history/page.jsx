"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import Link from 'next/link';

export default function HistoryPage() {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/history`, {
                    withCredentials: true
                });
                setHistory(res.data.data);
            } catch (error) {
                console.error("Failed to fetch history:", error);
                toast.error("Failed to load your history.");
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, []);

    if (loading) {
        return <div className="min-h-screen bg-[#141414] text-white flex items-center justify-center">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-[#141414] text-white p-6 md:p-12">
            <h1 className="text-3xl font-bold mb-8 border-b border-gray-800 pb-4">My Activity History</h1>

            {history.length === 0 ? (
                <div className="text-gray-400">You have no property requests yet.</div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-gray-800 text-gray-400">
                                <th className="p-4">Property</th>
                                <th className="p-4">Type</th>
                                <th className="p-4">Status</th>
                                <th className="p-4">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {history.map((item) => (
                                <tr key={item._id} className="border-b border-gray-800 hover:bg-[#1f1f1f]">
                                    <td className="p-4">
                                        <Link href={`/properties/detailed/${item.propertyId}`} className="text-blue-400 hover:underline">
                                            {item.propertyTitle || "Unknown Property"}
                                        </Link>
                                    </td>
                                    <td className="p-4 capitalize">
                                        {item.purchaseType}
                                        {item.purchaseType === 'rent' && item.rentDuration && (
                                            <span className="block text-xs text-gray-500 mt-1">
                                                {item.rentDuration} Month{item.rentDuration > 1 ? 's' : ''}
                                            </span>
                                        )}
                                    </td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded text-xs font-bold ${item.status === 'Accepted' ? 'bg-green-500/20 text-green-500' :
                                            item.status === 'Rejected' ? 'bg-red-500/20 text-red-500' :
                                                'bg-yellow-500/20 text-yellow-500'
                                            }`}>
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="p-4 text-gray-400">
                                        {new Date(item.date).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
