"use client";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function LoginModal({ isOpen, onClose }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0">
            <div
                className="relative z-50 grid w-full max-w-lg gap-4 border border-[#262626] bg-[#141414] p-6 shadow-lg duration-200 sm:rounded-lg"
            >
                <div className="flex flex-col space-y-1.5 text-center sm:text-left">
                    <h2 className="text-lg font-semibold leading-none tracking-tight text-white">Login Required</h2>
                    <p className="text-sm text-[#999999]">
                        You must be logged in to send a property inquiry.
                    </p>
                </div>
                <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
                    <Button
                        variant="outline"
                        onClick={onClose}
                        className="mt-2 sm:mt-0 bg-transparent border-[#262626] text-white hover:bg-[#262626]"
                    >
                        Cancel
                    </Button>
                    <Button asChild className="bg-[#703bf7] hover:bg-[#5b2fd6] text-white">
                        <Link href="/Login">Login Now</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
