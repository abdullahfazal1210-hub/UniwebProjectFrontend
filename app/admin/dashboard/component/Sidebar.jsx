"use client";
import React, { useState, useEffect } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import axios from "axios";

export default function Sidebar() {
  const pathname = usePathname();
  const [counts, setCounts] = useState({
    messages: 0,
    clientNeeds: 0,
    propertyRequests: 0,
  });

  // Fetch counts
  const fetchCounts = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/notifications/counts`, { withCredentials: true });
      setCounts(res.data);
    } catch (error) {
      console.error("Failed to fetch notification counts", error);
    }
  };

  useEffect(() => {
    fetchCounts();
    // Optional: Poll every 30 seconds
    const interval = setInterval(fetchCounts, 30000);
    return () => clearInterval(interval);
  }, [pathname]); // Re-fetch on navigation changes

  const links = [
    { name: "Dashboard", href: "/admin/dashboard" },
    {
      name: "User Messages",
      href: "/admin/dashboard/message",
      count: counts.messages
    },
    { name: "Users", href: "/admin/dashboard/users" },
    { name: "Settings", href: "/admin/dashboard/setting" },
    { name: "Add Property", href: "/admin/dashboard/property-add" },
    { name: "Manage Properties", href: "/admin/dashboard/properties" },
    {
      name: "Property Req",
      href: "/admin/dashboard/property-req",
      count: counts.propertyRequests
    },
    {
      name: "Client Need",
      href: "/admin/dashboard/clientNeed",
      count: counts.clientNeeds
    },
  ];

  return (
    <div className="sidebar bg-gray-900 text-white p-4 h-screen fixed w-60">
      <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>

      <ul className="space-y-4">
        {links.map((link, index) => (
          <li key={index}>
            <Link
              href={link.href}
              prefetch={true}
              className={`flex items-center justify-between p-2 rounded transition ${pathname === link.href ? "bg-blue-600" : "hover:bg-gray-700"
                }`}
            >
              <span>{link.name}</span>
              {link.count > 0 && (
                <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  {link.count}
                </span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
