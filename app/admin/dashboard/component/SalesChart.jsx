// app/dashboard/components/SalesChart.jsx
"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function SalesChart({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white p-4 shadow rounded h-[300px] flex items-center justify-center">
        <div className='text-center'>
          <h3 className="text-lg font-semibold mb-2">Property Sales</h3>
          <p className='text-gray-400'>No sales data available yet.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white p-4 shadow rounded">
      <h3 className="text-lg font-semibold mb-4">Property Sales</h3>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#10b981" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
