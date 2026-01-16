"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";

export default function RentalChart({ data }) {
    // data expected format: [{ month: 'Jan', value: 10 }, ...]

    if (!data || data.length === 0) {
        return (
            <div className='bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex flex-col items-center justify-center h-[300px]'>
                <h3 className='text-gray-500 font-medium mb-2'>Property Rentals</h3>
                <p className='text-gray-400 text-sm'>No rental data available yet.</p>
            </div>
        )
    }

    return (
        <div className='bg-white p-4 rounded-lg shadow-sm border border-gray-100'>
            <h3 className='text-gray-500 font-medium mb-4'>Property Rentals</h3>
            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                        <XAxis
                            dataKey="month"
                            stroke="#888888"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                        />
                        <YAxis
                            stroke="#888888"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value) => `${value}`}
                        />
                        <Tooltip
                            cursor={{ fill: 'transparent' }}
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                        />
                        <Bar
                            dataKey="value"
                            fill="#adfa1d"
                            radius={[4, 4, 0, 0]}
                            className="fill-primary"
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
