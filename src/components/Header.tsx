// app/components/Header.tsx
// 'use client'
import Link from "next/link";
import { Menu, Globe, User } from "lucide-react";
import SearchBar from "./ui/SearchBar";
import MobileSearch from "./MobileSearch";
import AuthSide from "./ui/AuthSide";
import SearchBarWrapper from "./ui/SearchBarWrapper"; 
// import { useEffect, useState } from "react";

export default function Header() {  
  // const [state, setState] = useState(false)
  // useEffect(()=>{ 
  //   console.log(state);
  // },[state])
  return (
    <div className="w-full fixed md:relative top-0 z-50 ">
    <header className={`max-w-[1840px] mx-auto sticky md:fixed flex md:block md:w-full top-0 bg-white shadow-sm md:shadow-none py-3 md:py-0 px-5 md:px-0`}>
      <div className="flex items-center justify-center md:justify-between md:px-6  md:h-24">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 mr-4 z-10">
          <span className="text-4xl font-bold text-red-500">SD</span>
          <span className="text-xl hidden md:inline font-semibold text-gray-800">Travel</span>
        </Link>

        {/* Center Search Bar */} 

        {/* Right Section */}
        <div className="hidden md:flex items-center space-x-4 z-10">
          <p className="hidden lg:block text-sm font-medium cursor-pointer hover:text-gray-700">
            Become a host
          </p>
          <Globe className="h-5 w-5 text-gray-600 cursor-pointer" />
          <AuthSide />
        </div>
      <SearchBarWrapper />
      </div>

      {/* tablet Search */}
      {/* <div className="hidden md:block lg:hidden px-4 pb-3">
        <SearchBar />
      </div> */}

      {/* mobile search */}
        <MobileSearch />
    </header>
    {/* <div className={`${state ? "h-48" : "h-0"} duration-300 transition-all ease-out`}> Hello</div> */}
    </div>
  );
}
