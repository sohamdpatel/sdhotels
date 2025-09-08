// app/components/Header.tsx
import Link from "next/link";
import { Menu, Globe, User } from "lucide-react";
import SearchBar from "./ui/SearchBar";
import MobileSearch from "./MobileSearch";
import AuthSide from "./ui/AuthSide";

export default function Header() {

  
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm px-5 md:px-0">
      <div className="flex items-center justify-center md:justify-between  md:px-6 md:py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-red-500">SD</span>
          <span className="text-xl font-semibold text-gray-800">Travel</span>
        </Link>

        {/* Center Search Bar */}
        <div className="hidden lg:flex flex-1 justify-center px-6">
          <SearchBar />
        </div>

        {/* Right Section */}
        <div className="hidden md:flex items-center space-x-4">
          <p className="hidden md:block text-sm font-medium cursor-pointer hover:text-gray-700">
            Become a host
          </p>
          <Globe className="h-5 w-5 text-gray-600 cursor-pointer" />
          <AuthSide />
        </div>
      </div>

      {/* tablet Search */}
      <div className="hidden md:block lg:hidden px-4 pb-3">
        <SearchBar />
      </div>


      {/* mobile search */}
        <MobileSearch />
    </header>
  );
}
