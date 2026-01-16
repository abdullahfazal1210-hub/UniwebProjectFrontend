"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

export default function PropertyRequests() {
    const [requests, setRequests] = useState([]);

    const fetchRequests = async () => {
        try {
            // Parallelize marking as read and fetching requests
            const [, res] = await Promise.all([
                axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/notifications/mark-read/property-req`),
                axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/propertyRequests`)
            ]);
            setRequests(res.data);
        } catch (error) {
            console.error("Error fetching requests:", error);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    const updateStatus = async (id, status) => {
        try {
            await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/propertyRequest/${id}`, { status });
            // Refresh list
            fetchRequests();
        } catch (error) {
            console.error("Error updating status:", error);
            alert("Failed to update status");
        }
    };

    // Drag to scroll logic
    const tableContainerRef = React.useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.pageX - tableContainerRef.current.offsetLeft);
        setScrollLeft(tableContainerRef.current.scrollLeft);
    };

    const handleMouseLeave = () => {
        setIsDragging(false);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - tableContainerRef.current.offsetLeft;
        const walk = (x - startX) * 2; // Scroll-fast
        tableContainerRef.current.scrollLeft = scrollLeft - walk;
    };

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Property Requests</h2>
            <div
                className="overflow-x-auto bg-white rounded-lg shadow cursor-grab active:cursor-grabbing scrollbar-hide"
                ref={tableContainerRef}
                onMouseDown={handleMouseDown}
                onMouseLeave={handleMouseLeave}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }} // Hide scrollbar Firefox/IE
            >
                <style jsx>{`
                    div::-webkit-scrollbar {
                        display: none; /* Hide scrollbar Chrome/Safari */
                    }
                `}</style>
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                                Date
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                                Applicant
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                                Contact
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                                Property
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                                Request Type
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                                Message
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                                Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {requests.map((req) => (
                            <tr key={req._id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {new Date(req.date).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">
                                        {req.firstName} {req.lastName}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">{req.email}</div>
                                    <div className="text-sm text-gray-500">{req.phone}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">{req.propertyTitle}</div>
                                    <div className="text-xs text-gray-500">ID: {req.propertyId}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                        {req.purchaseType?.toUpperCase()}
                                    </span>
                                    {req.rentDuration && (
                                        <div className="text-xs text-gray-500 mt-1">
                                            {req.rentDuration} Months
                                        </div>
                                    )}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate whitespace-nowrap">
                                    {req.message}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span
                                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${req.status === "Accepted"
                                            ? "bg-green-100 text-green-800"
                                            : req.status === "Rejected"
                                                ? "bg-red-100 text-red-800"
                                                : "bg-yellow-100 text-yellow-800"
                                            }`}
                                    >
                                        {req.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                    <button
                                        onClick={() => updateStatus(req._id, "Accepted")}
                                        className="text-green-600 hover:text-green-900 font-bold"
                                    >
                                        Accept
                                    </button>
                                    <button
                                        onClick={() => updateStatus(req._id, "Rejected")}
                                        className="text-red-600 hover:text-red-900 font-bold"
                                    >
                                        Reject
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {requests.length === 0 && (
                            <tr>
                                <td colSpan="8" className="px-6 py-4 text-center text-gray-500">
                                    No requests found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
