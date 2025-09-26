"use client";
import React from 'react'

import Link from "next/link";
import { usePathname } from "next/navigation";

// icons
import Logo from '@/app/styles/svg/Logo.jsx';
import Cancel from '../../../../styles/svg/Cancel.jsx'

// shadcn comps
import { Button } from "@/components/ui/button";

export default function Header() {
    const pathname = usePathname();
    const activeStyle = {
        backgroundColor: 'rgba(20, 20, 20, 1)',
        border: '1px solid rgba(38, 38, 38, 1)',
    };

    const inactiveStyle = {
        border: '1px solid transparent',
    };

    const activeButton = {
        backgroundColor: '#8f64fa',
        border: '1px solid #703bf7'
    };

    const inactiveButton = {
        backgroundColor: '#703bf7',
        border: '1px solid #703bf7'
    };

    const links = [
      { href: "/", label: "Home" },
      { href: "/about", label: "About Us" },
      { href: "/detailed", label: "Properties" },
      { href: "/service", label: "Services" },
      { href: "/contact", label: "Contact Us" },
    ];

  return (
    <>
    <header className='w-full'>
        <div className='w-full flex items-center justify-center py-4 border-b border-[rgba(38,38,38,1)] bg-[rgba(26,26,26,1)] text-white'>
          <p>✨Discover Your Dream Property with Estatein <span className='underline'>Learn More</span></p>
          <div className='bg-[rgba(255,255,255,0.1)] rounded-[75px] p-1 cursor-pointer absolute right-4'>
            <Cancel />
          </div>
        </div>
        <nav className='w-full flex px-16 py-4 bg-[rgba(26,26,26,1)] text-white'>
          <div className='w-1/4 flex items-center justify-start'>
            <Logo />
          </div>
          <ul className='w-1/2 flex items-center gap-5 justify-center'>
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-white px-5 py-3 rounded-lg font-medium"
                  style={pathname === link.href ? activeStyle : inactiveStyle
                  }
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className='w-1/4 flex items-center justify-end'>
            <Button asChild>
              <Link 
                href="/contact"
                style={pathname === "/Login" ? activeButton : inactiveButton}
                className='text-sm text-white px-5 rounded-b-md font-medium'
              >Sign In</Link>
            </Button>
          </div>
        </nav>
      </header></>
  )
}
