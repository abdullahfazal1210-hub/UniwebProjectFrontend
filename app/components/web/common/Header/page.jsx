"use client";
import React, { useState, useEffect } from 'react'
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from 'next/image';

// Logo
import Logo from '@/public/img/logo.png';

// icons
import Cancel from '@/app/styles/svg/Cancel.jsx'
import Menu from '@/app/styles/svg/Menu.jsx';
import Close from '@/app/styles/svg/MainMenuClose.jsx';
import Logout from '@/app/styles/svg/Logout.jsx';

// shadcn comps
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, History as HistoryIcon, LogOut, ChevronDown } from 'lucide-react'; // Assuming lucide-react is available or use existing svgs

// header background image
import headerBg from '@/public/abstract-design.svg'
import { Button } from '@/components/ui/button';

export default function Header() {

  const [isOpen, setIsOpen] = useState(false);
  const [toggle, settoggle] = useState(true);
  const [user, setUser] = useState(null);
  const [userImage, setUserImage] = useState(null);

  useEffect(() => {
    // Check for query parameters after Google Login
    const urlParams = new URLSearchParams(window.location.search);
    const nameParam = urlParams.get("name");
    const imageParam = urlParams.get("image");

    if (nameParam) {
      localStorage.setItem("userName", nameParam);
      if (imageParam) localStorage.setItem("userImage", imageParam);

      // Clean up URL
      const newUrl = window.location.pathname;
      window.history.replaceState({}, document.title, newUrl);
    }

    const userName = localStorage.getItem("userName");
    const userImg = localStorage.getItem("userImage");
    // Check cookie existence roughly
    const hasCookie = document.cookie.split(';').some(c => c.trim().startsWith('authToken='));
    if (userName && hasCookie) {
      setUser(userName);
      setUserImage(userImg);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userName");
    localStorage.removeItem("userImage");
    localStorage.removeItem("returnUrl");
    localStorage.removeItem("savedClientNeed");
    localStorage.removeItem("savedPropertyRequest");

    // Expire cookie
    document.cookie = "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setUser(null);
    setUserImage(null);
    window.location.reload();
  };

  const handleCancelClick = () => {
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
  ];

  return (
    <>
      <header className='w-full z-100'>
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
            <Cancel onClick={handleCancelClick} />
          </div>
        </div> : ""}

        <nav className='w-full relative flex px-4 py-3 md:px-16 md:py-4 bg-[rgba(26,26,26,1)] text-white'>
          <div className='w-3/4 md:w-1/4 flex items-center justify-start gap-2 lg:gap-4 font-semibold '>
            <Image className='w-[48px] h-[48px] mix-blend-color' src={Logo} alt='Logo' />
            Talha Builders
          </div>
          <ul className='hidden w-1/2 md:flex items-center gap-5 justify-center'>
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  prefetch={true}
                  className="text-sm text-white px-5 py-3 rounded-lg font-medium"
                  style={pathname === link.href ? activeStyle : inactiveStyle
                  }
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className='hidden w-1/4 md:flex items-center justify-end gap-3'>
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-2 outline-none cursor-pointer">
                  {userImage ? (
                    <img src={userImage} alt={user} className="w-10 h-10 rounded-full border-2 border-[#703bf7] object-cover" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-[#703bf7] flex items-center justify-center text-white font-bold">
                      {user.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <span className='text-white font-medium'>{user}</span>
                  <ChevronDown size={16} className="text-[#999999]" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48 bg-[#1A1A1A] border border-[#262626] text-white">
                  <DropdownMenuItem className="cursor-pointer hover:bg-[#262626] focus:bg-[#262626]" asChild>
                    <Link href="/history" prefetch={true} className="flex items-center gap-2 w-full">
                      <HistoryIcon size={16} /> History
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-[#262626]" />
                  <DropdownMenuItem className="cursor-pointer hover:bg-[#262626] focus:bg-[#262626] text-red-500 hover:text-red-400 focus:text-red-400" onClick={handleLogout}>
                    <div className="flex items-center gap-2 w-full">
                      <LogOut size={16} /> Logout
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button asChild>
                <Link
                  href="/Login"
                  prefetch={true}
                  className='text-sm text-white px-5 rounded-b-md font-medium bg-[#703bf7] hover:bg-[#895ef7] transition-all border border-[#703bf7]'
                >Sign In</Link>
              </Button>
            )}
          </div>
          <div className='md:hidden flex w-1/4 justify-end'>
            <button onClick={() => setIsOpen(!isOpen)} className='p-2 rounded-md hover:bg-[rgba(38,38,38,1)]'>
              <Menu />
            </button>
          </div>
          <div
            className={`z-50 md:hidden flex flex-col items-end gap-7.5 fixed top-0 right-0 h-screen w-3/4 bg-[rgba(26,26,26,1)] border-l border-[rgba(38,38,38,1)] p-6 transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"
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
                    prefetch={true}
                    className="w-full text-md text-white px-5 py-3 rounded-lg font-medium text-center"
                    style={pathname === link.href ? activeStyle : inactiveStyle
                    }
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              {user ? (
                <>
                  <li className="w-full text-md text-white px-5 py-3 rounded-lg font-medium text-center">
                    <Link href="/history" prefetch={true} className="flex items-center justify-center gap-2" onClick={() => setIsOpen(false)}>
                      <HistoryIcon size={16} /> History
                    </Link>
                  </li>
                  <li className="w-full flex flex-col items-center gap-2 border-t border-[rgba(38,38,38,1)] pt-4">
                    {userImage && (
                      <img src={userImage} alt={user} className="w-16 h-16 rounded-full border-2 border-[#703bf7] object-cover mb-2" />
                    )}
                    <span className='text-sm text-[#999999]'>Signed in as {user}</span>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 text-md text-white px-5 py-3 rounded-lg font-medium text-center hover:bg-[rgba(38,38,38,1)] text-red-500"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <li className="w-full text-md text-white px-5 py-3 rounded-lg font-medium text-center">
                  <Link
                    href="/Login"
                    prefetch={true}
                    className="w-full text-md text-white px-5 py-3 rounded-lg font-medium text-center"
                    style={pathname === "/Login" ? activeStyle : inactiveStyle}
                  >
                    Sign In
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </nav>
      </header></>
  )
}
