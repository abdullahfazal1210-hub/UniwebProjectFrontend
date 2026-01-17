"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

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

const InquiryTable = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        // Parallelize marking as read and fetching messages
        const [, res] = await Promise.all([
          axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/notifications/mark-read/message`, {}, { withCredentials: true }),
          axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getmessage`, { withCredentials: true })
        ]);

        setInquiries(res.data.data);
        setLoading(false)
      } catch (error) {
        console.log("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, []);

  console.log(inquiries);


  if (loading) return <div className="p-4 text-gray-700">Loading messages...</div>;

  return (
    <div className="p-2">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Inquiries</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="py-3 px-2 text-left">Name</th>
              <th className="py-3 px-2 text-left">Email</th>
              <th className="py-3 px-2 text-left">Phone</th>
              <th className="py-3 px-2 text-left">Inquiry Type</th>
              <th className="py-3 px-2 text-left">Hear About</th>
              <th className="py-3 px-2 text-left">Message</th>
              <th className="py-3 px-2 text-left">Time</th>
            </tr>
          </thead>
          <tbody>
            {inquiries.length > 0 ? (
              inquiries.map((inquiry, index) => (
                <tr
                  key={index}
                  className={`border-t ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
                >
                  <td className="py-3 px-2">{inquiry.firstName}</td>
                  <td className="py-3 px-2">{inquiry.email}</td>
                  <td className="py-3 px-2">{inquiry.phone}</td>
                  <td className="py-3 px-2">{inquiry.inquiryType}</td>
                  <td className="py-3 px-2">{inquiry.hearAbout}</td>
                  <td className="py-3 px-2">{inquiry.message}</td>
                  <td className="py-3 px-2">{formatTime(inquiry.date)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="text-center py-4 text-gray-500">
                  No inquiries found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InquiryTable;
