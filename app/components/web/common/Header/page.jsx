"use client";
import React, { useState } from 'react'
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from 'next/image';

// Logo
import Logo from '@/public/img/Logo.png';

// icons
import Cancel from '@/app/styles/svg/Cancel.jsx'
import Menu from '@/app/styles/svg/Menu.jsx';
import Close from '@/app/styles/svg/MainMenuClose.jsx';

// shadcn comps
import { Button } from "@/components/ui/button";

// header background image
import headerBg from '@/public/abstract-design.svg'

export default function Header() {

  const [isOpen, setIsOpen] = useState(false);
  const [toggle, settoggle] = useState(true);
  const handleCancelClick =()=>{
    settoggle(!toggle)
// console.log("clicked");
  }



    const pathname = usePathname();
    const activeStyle = {
        backgroundColor: 'rgba(20, 20, 20, 1)',
        border: '1px solid rgba(38, 38, 38, 1)',
    };

    const inactiveStyle = {
        border: '1px solid transparent',
    };

    const links = [
      { href: "/", label: "Home" },
      { href: "/about", label: "About Us" },
      { href: "/properties", label: "Properties" },
      { href: "/service", label: "Services" },
      { href: "/contact", label: "Contact Us" },
    ];

    const moblinks = [
      { href: "/", label: "Home" },
      { href: "/about", label: "About Us" },
      { href: "/properties", label: "Properties" },
      { href: "/service", label: "Services" },
      { href: "/contact", label: "Contact Us" },
      { href: "/Login", label: "Sign In" },
    ];

  return (
    <>
    <header className='w-full fixed z-100'> 
      {toggle ? <div 
                  style={{
                    backgroundImage: headerBg ? `url(${headerBg.src})` : 'none',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                  }}
                  className='w-full flex items-center justify-center py-4 px-8 md:py-4 border-b border-[rgba(38,38,38,1)] bg-[rgba(26,26,26,1)] text-white'
                  >
          <p className='text-center px-4'>✨Discover Your Dream Property with Estatein <span className='underline'>Learn More</span></p>
          <div className='bg-[rgba(255,255,255,0.1)] rounded-[75px] p-1 cursor-pointer absolute right-4'>
            <Cancel onClick = {handleCancelClick}/>
          </div>
        </div> : "" }
        
        <nav className='w-full relative flex px-4 py-3 md:px-16 md:py-4 bg-[rgba(26,26,26,1)] text-white'>
          <div className='w-1/2 md:w-1/4 flex items-center justify-start gap-4 font-semibold '>
            <Image className='w-[48px] h-[48px] mix-blend-color' src={Logo} alt='Logo' />
            Talha Builders
          </div>
          <ul className='hidden w-1/2 md:flex items-center gap-5 justify-center'>
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
          <div className='hidden w-1/4 md:flex items-center justify-end'>
            <Button asChild>
              <Link 
                href="/Login"
                className='text-sm text-white px-5 rounded-b-md font-medium bg-[#703bf7] hover:bg-[#895ef7] transition-all border border-[#703bf7]'
              >Sign In</Link>
            </Button>
          </div>
          <div className='md:hidden flex w-1/2 justify-end'>
            <button onClick={() => setIsOpen(!isOpen)} className='p-2 rounded-md hover:bg-[rgba(38,38,38,1)]'>
              <Menu />
            </button>
          </div>
          <div
            className={`z-50 md:hidden flex flex-col items-end gap-7.5 fixed top-0 right-0 h-screen w-3/4 bg-[rgba(26,26,26,1)] border-l border-[rgba(38,38,38,1)] p-6 transform transition-transform duration-300 ease-in-out ${
              isOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            {/* Sidebar content */}
            <button
              className="w-fit text-white p-1 bg-[rgba(38,38,38,1)] rounded-full"
              onClick={() => setIsOpen(false)}
            >
              <Close />
            </button>

            <ul className='w-full flex flex-col items-center justify-center gap-4 text-white'>
              {moblinks.map((link) => (
                <li key={link.href} className="w-full text-md text-white px-5 py-3 rounded-lg font-medium text-center">
                  <Link
                    href={link.href}
                    className="w-full text-md text-white px-5 py-3 rounded-lg font-medium text-center"
                    style={pathname === link.href ? activeStyle : inactiveStyle
                    }
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </header></>
  )
}
