// app/dashboard/page.jsx
"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import StatsCard from "./component/StatsCard";
import UsersMessages from "./message/page"; // Keeping this if it was used, though unused in original snippet
import SalesChart from "./component/SalesChart";
import RentalChart from "./component/RentalChart"; // New Component
import UsersChart from "./component/UsersChart";

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalSold: 0,
    totalMessages: 0,
    salesTrend: [],
    rentalTrend: []
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/dashboard-stats`, { withCredentials: true });
        setStats(res.data);
      } catch (error) {
        console.error("Error loading stats:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  // Format data for charts (API returns _id as month number)
  const formatChartData = (trendData) => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    if (!trendData) return [];
    return trendData.map(item => ({
      month: months[item._id - 1], // _id is 1-12
      value: item.count
    }));
  };

  const salesData = formatChartData(stats.salesTrend);
  const rentalData = formatChartData(stats.rentalTrend);
  const userData = formatChartData(stats.userTrend);

  if (loading) return <div className="p-8">Loading Dashboard...</div>;

  return (
    <div className="grid gap-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard title="Total Users" value={stats.totalUsers} />
        <StatsCard title="Properties Sold" value={stats.totalSold} />
        <StatsCard title="Total Inquiries" value={stats.totalMessages} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SalesChart data={salesData} />
        <RentalChart data={rentalData} />
      </div>

      {/* Extra Charts or Info */}
      <div className="grid grid-cols-1">
        <UsersChart data={userData} />
      </div>

    </div>
  );
}
