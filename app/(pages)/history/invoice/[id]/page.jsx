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
            displayPrice = property.rent_price_annual; // or rent_price_Annual based on schema naming
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
            <div className="max-w-3xl mx-auto bg-white shadow-xl p-12 md:p-16 rounded-lg print:shadow-none print:w-full print:max-w-none">

                {/* Contract Header */}
                <header className="border-b-2 border-gray-800 pb-8 mb-8 flex justify-between items-start">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-900 tracking-tight">INVOICE & CONTRACT</h1>
                        <p className="text-gray-500 mt-2 text-lg">Property Agreement</p>
                    </div>
                    <div className="text-right">
                        <div className="text-2xl font-bold text-[#703bf7]">Talha Builders</div>
                        <p className="text-sm text-gray-500">Estatein Real Estate</p>
                        <p className="text-sm text-gray-500">Invoice #{id.slice(-6).toUpperCase()}</p>
                        <p className="text-sm text-gray-500">Date: {new Date(request.date).toLocaleDateString()}</p>
                    </div>
                </header>

                {/* Info Grid */}
                <div className="grid grid-cols-2 gap-12 mb-12">
                    <div>
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Client Details</h3>
                        <div className="text-gray-800 font-medium">
                            <p className="text-lg">{request.firstName} {request.lastName}</p>
                            <p>{request.email}</p>
                            <p>{request.phone}</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Property Details</h3>
                        <div className="text-gray-800 font-medium">
                            <p className="text-lg">{property?.Name || request.propertyTitle}</p>
                            <p>{property?.Location}</p>
                            <p>{property?.type} | {property?.Rooms} Rooms</p>
                        </div>
                    </div>
                </div>

                {/* Agreement Details */}
                <div className="mb-12">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 border-b pb-2">Agreement Summary</h3>
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-gray-500 text-sm">
                                <th className="pb-4 pt-2">Description</th>
                                <th className="pb-4 pt-2 text-right">Term / Duration</th>
                                <th className="pb-4 pt-2 text-right">Amount (PKR)</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-800 font-medium text-lg">
                            <tr className="border-b border-gray-100">
                                <td className="py-4">
                                    {isRent ? "Property Rental Agreement" : "Property Sale Agreement"}
                                    <div className="text-sm text-gray-400 font-normal mt-1">{property?.Name}</div>
                                </td>
                                <td className="py-4 text-right">
                                    {request.rentDuration ? `${request.rentDuration} Months` : "Ownership Transfer"}
                                </td>
                                <td className="py-4 text-right font-bold">
                                    {Number(displayPrice).toLocaleString()}
                                </td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan="2" className="pt-6 text-right font-bold text-gray-500">Total Payable:</td>
                                <td className="pt-6 text-right font-bold text-2xl text-[#703bf7]">
                                    PKR {Number(displayPrice).toLocaleString()}
                                </td>
                            </tr>
                            <tr className="text-sm text-gray-400">
                                <td colSpan="3" className="text-right pt-2 font-normal italic">
                                    {period}
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>

                {/* Installment Plan */}
                <div className="mb-12">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 border-b pb-2">3-Month Installment Plan</h3>
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-gray-500 text-sm">
                                <th className="pb-4 pt-2">Installment #</th>
                                <th className="pb-4 pt-2">Due Date</th>
                                <th className="pb-4 pt-2 text-right">Amount (PKR)</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-800 font-medium">
                            <tr className="border-b border-gray-100">
                                <td className="py-3">1st Installment (Down Payment)</td>
                                <td className="py-3">Immediate (Upon Signing)</td>
                                <td className="py-3 text-right">
                                    {Math.round(Number(displayPrice) / 3).toLocaleString()}
                                </td>
                            </tr>
                            <tr className="border-b border-gray-100">
                                <td className="py-3">2nd Installment</td>
                                <td className="py-3">
                                    {new Date(new Date(request.date).setMonth(new Date(request.date).getMonth() + 1)).toLocaleDateString()}
                                </td>
                                <td className="py-3 text-right">
                                    {Math.round(Number(displayPrice) / 3).toLocaleString()}
                                </td>
                            </tr>
                            <tr className="border-b border-gray-100">
                                <td className="py-3">3rd Installment</td>
                                <td className="py-3">
                                    {new Date(new Date(request.date).setMonth(new Date(request.date).getMonth() + 2)).toLocaleDateString()}
                                </td>
                                <td className="py-3 text-right">
                                    {Math.round(Number(displayPrice) / 3).toLocaleString()}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Payment Instructions */}
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-12">
                    <h3 className="text-sm font-bold text-gray-900 uppercase mb-4 flex items-center gap-2">
                        💳 Payment Instructions
                    </h3>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <p className="text-sm text-gray-500 mb-1">Bank Name</p>
                            <p className="font-bold text-gray-800 text-lg">Bank Alfalah</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 mb-1">Account Title</p>
                            <p className="font-bold text-gray-800 text-lg">Abdullah</p>
                        </div>
                        <div className="md:col-span-2">
                            <p className="text-sm text-gray-500 mb-1">Account Number (IBAN)</p>
                            <p className="font-mono font-bold text-gray-800 text-xl tracking-wider">
                                PK36 ALFH 5566 7788 9900 1122
                            </p>
                        </div>
                    </div>
                </div>

                {/* Signatures */}
                <div className="grid grid-cols-2 gap-16 mt-20">
                    <div>
                        <div className="border-t border-gray-400 pt-4">
                            <p className="font-bold text-gray-900">Abdullah</p>
                            <p className="text-sm text-gray-500">Authorized Signature</p>
                            <p className="text-xs text-gray-400 mt-1">Talha Builders</p>
                        </div>
                    </div>
                    <div>
                        <div className="border-t border-gray-400 pt-4">
                            <p className="font-bold text-gray-900">{request.firstName} {request.lastName}</p>
                            <p className="text-sm text-gray-500">Client Signature</p>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-16 text-center text-xs text-gray-400 border-t pt-8">
                    <p>This document serves as an official proof of agreement pending bank confirmation.</p>
                    <p>For inquiries, please contact support@talhabuilders.com</p>
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
