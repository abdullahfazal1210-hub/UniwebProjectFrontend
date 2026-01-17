"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Printer } from 'lucide-react';

export default function InvoicePage() {
    const { id } = useParams();
    const router = useRouter();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/request/${id}`, {
                    withCredentials: true
                });
                setData(res.data);
            } catch (error) {
                console.error("Failed to fetch invoice:", error);
                toast.error("Failed to load invoice details.");
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchData();
    }, [id]);

    const handlePrint = () => {
        window.print();
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center bg-gray-50">Loading Contract...</div>;
    if (!data) return <div className="min-h-screen flex items-center justify-center bg-gray-50">Contract not found.</div>;

    const { request, property } = data;
    const isRent = request.purchaseType === 'rent';

    // Calculate Price
    let displayPrice = "N/A";
    let period = "";

    if (isRent) {
        if (request.rentDuration === "3") {
            displayPrice = property.rent_price_3_months;
            period = "Quarterly (3 Months)";
        } else if (request.rentDuration === "6") {
            displayPrice = property.rent_price_6_months;
            period = "Semi-Annually (6 Months)";
        } else if (request.rentDuration === "12") {
            displayPrice = property.rent_price_annual;
            period = "Annually (1 Year)";
        }
    } else {
        displayPrice = property.buy_price;
        period = "One-time Payment";
    }

    return (
        <div className="min-h-screen bg-gray-100 p-4 md:p-8 print:bg-white print:p-0">
            {/* Header / Actions - Hidden on Print */}
            <div className="max-w-4xl mx-auto mb-6 flex justify-between items-center print:hidden">
                <Button variant="outline" onClick={() => router.back()} className="flex items-center gap-2">
                    <ArrowLeft size={16} /> Back
                </Button>
                <Button onClick={handlePrint} className="flex items-center gap-2 bg-[#703bf7] hover:bg-[#5b2fd6]">
                    <Printer size={16} /> Print Contract
                </Button>
            </div>

            {/* Document Paper */}
            <div className="max-w-3xl mx-auto bg-white shadow-lg p-8 md:p-10 rounded-lg print:shadow-none print:w-full print:max-w-none print:p-8 border border-gray-100">

                {/* Contract Header */}
                <header className="border-b border-gray-200 pb-6 mb-6 flex justify-between items-start">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 tracking-tight text-transform uppercase">Invoice</h1>
                        <p className="text-gray-500 text-sm mt-1 uppercase tracking-wider">Property Agreement</p>
                    </div>
                    <div className="text-right">
                        <div className="text-xl font-bold text-[#703bf7]">Talha Builders</div>
                        <p className="text-xs text-gray-400">Estatein Real Estate</p>
                        <p className="text-xs text-gray-500 mt-1">Ref: {id.slice(-6).toUpperCase()}</p>
                        <p className="text-xs text-gray-500">Date: {new Date(request.date).toLocaleDateString()}</p>
                    </div>
                </header>

                {/* Info Grid */}
                <div className="grid grid-cols-2 gap-8 mb-8 bg-gray-50/50 p-4 rounded-md border border-gray-100">
                    <div>
                        <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Client Details</h3>
                        <div className="text-gray-800 text-sm font-medium leading-relaxed">
                            <p className="text-base font-bold text-gray-900">{request.firstName} {request.lastName}</p>
                            <p>{request.email}</p>
                            <p>{request.phone}</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Property Details</h3>
                        <div className="text-gray-800 text-sm font-medium leading-relaxed">
                            <p className="text-base font-bold text-gray-900">{property?.Name || request.propertyTitle}</p>
                            <p className="text-gray-500">{property?.Location}</p>
                            <p>{property?.type} • {property?.Rooms} Rooms</p>
                        </div>
                    </div>
                </div>

                {/* Agreement Details */}
                <div className="mb-8">
                    <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider mb-3 pb-1 border-b border-gray-200">Agreement Summary</h3>
                    <table className="w-full text-left text-sm">
                        <thead>
                            <tr className="text-gray-400 text-xs uppercase tracking-wider">
                                <th className="pb-2 font-medium">Description</th>
                                <th className="pb-2 text-right font-medium">Term</th>
                                <th className="pb-2 text-right font-medium">Amount</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-700">
                            <tr className="border-b border-gray-50">
                                <td className="py-3 font-medium">
                                    {isRent ? "Property Rental" : "Property Purchase"}
                                    <span className="block text-xs text-gray-400 font-normal">{property?.Name}</span>
                                </td>
                                <td className="py-3 text-right">
                                    {request.rentDuration ? `${request.rentDuration} Months` : "Ownership Transfer"}
                                </td>
                                <td className="py-3 text-right font-bold text-gray-900">
                                    PKR {Number(displayPrice).toLocaleString()}
                                </td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan="2" className="pt-4 text-right font-bold text-gray-500 text-xs uppercase">Total Payable:</td>
                                <td className="pt-4 text-right font-bold text-xl text-[#703bf7]">
                                    {Number(displayPrice).toLocaleString()}
                                </td>
                            </tr>
                            <tr className="text-xs text-gray-400">
                                <td colSpan="3" className="text-right pt-1 font-normal italic">
                                    {period}
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>

                {/* Installment Plan */}
                <div className="mb-8">
                    <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider mb-3 pb-1 border-b border-gray-200">Payment Schedule</h3>
                    <div className="border border-gray-100 rounded-lg overflow-hidden">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-gray-50">
                                <tr className="text-gray-500 text-xs uppercase tracking-wider">
                                    <th className="px-4 py-2 font-medium">Installment</th>
                                    <th className="px-4 py-2 font-medium">Due Date</th>
                                    <th className="px-4 py-2 text-right font-medium">Amount (PKR)</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-700 divide-y divide-gray-50">
                                <tr>
                                    <td className="px-4 py-2.5">1st (Down Payment)</td>
                                    <td className="px-4 py-2.5 text-gray-500">Immediate</td>
                                    <td className="px-4 py-2.5 text-right font-medium">
                                        {Math.round(Number(displayPrice) / 3).toLocaleString()}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2.5">2nd Installment</td>
                                    <td className="px-4 py-2.5 text-gray-500">
                                        {new Date(new Date(request.date).setMonth(new Date(request.date).getMonth() + 1)).toLocaleDateString()}
                                    </td>
                                    <td className="px-4 py-2.5 text-right font-medium">
                                        {Math.round(Number(displayPrice) / 3).toLocaleString()}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2.5">3rd Installment</td>
                                    <td className="px-4 py-2.5 text-gray-500">
                                        {new Date(new Date(request.date).setMonth(new Date(request.date).getMonth() + 2)).toLocaleDateString()}
                                    </td>
                                    <td className="px-4 py-2.5 text-right font-medium">
                                        {Math.round(Number(displayPrice) / 3).toLocaleString()}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Payment Instructions */}
                <div className="bg-[#703bf7]/5 p-5 rounded-lg border border-[#703bf7]/20 mb-10">
                    <h3 className="text-xs font-bold text-[#703bf7] uppercase mb-3 flex items-center gap-2">
                        Payment Details
                    </h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <p className="text-xs text-gray-400 uppercase tracking-wider mb-0.5">Bank</p>
                            <p className="font-bold text-gray-800">Bank Alfalah</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-400 uppercase tracking-wider mb-0.5">Account Title</p>
                            <p className="font-bold text-gray-800">Abdullah</p>
                        </div>
                        <div className="col-span-2 mt-1">
                            <p className="text-xs text-gray-400 uppercase tracking-wider mb-0.5">IBAN</p>
                            <p className="font-mono font-bold text-gray-800 text-lg tracking-wider">
                                PK36 ALFH 5566 7788 9900 1122
                            </p>
                        </div>
                    </div>
                </div>

                {/* Signatures */}
                <div className="grid grid-cols-2 gap-12 mt-12 pt-8">
                    <div>
                        <div className="border-t border-gray-300 pt-3">
                            <p className="font-bold text-gray-900 text-sm">Abdullah</p>
                            <p className="text-xs text-gray-500 uppercase tracking-wider mt-0.5">Authorized Signature</p>
                        </div>
                    </div>
                    <div>
                        <div className="border-t border-gray-300 pt-3">
                            <p className="font-bold text-gray-900 text-sm">{request.firstName} {request.lastName}</p>
                            <p className="text-xs text-gray-500 uppercase tracking-wider mt-0.5">Client Signature</p>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-8 text-center text-[10px] text-gray-400 border-t border-gray-100 pt-4">
                    <p>This document is electronically generated and pending bank confirmation.</p>
                    <p>Talha Builders • support@talhabuilders.com</p>
                </div>
            </div>

            <style jsx global>{`
                @media print {
                    @page { margin: 0; }
                    body { background: white; }
                    nav, footer, header, .sidebar, button, .no-print { display: none !important; }
                    .print\\:hidden { display: none !important; }
                    .print\\:w-full { width: 100% !important; max-width: none !important; box-shadow: none !important; padding: 20px !important; }
                    .bg-gray-100 { background-color: white !important; }
                }
            `}</style>
        </div>
    );
}
