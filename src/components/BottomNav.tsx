// app/components/BottomNav.tsx
"use client";

import Link from "next/link";
import {
  Search,
  Heart,
  User,
  History,
} from "lucide-react";
import { usePathname } from "next/navigation";


export default function BottomNav() {

  const pathname = usePathname()
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t shadow-sm md:hidden">
      <div className="flex justify-around items-center py-2">
        <Link href="/" className={`flex flex-col items-center text-gray-600 hover:text-red-500 ${pathname === "/" ? " text-red-400 " : " "}`}>
          <Search className="h-5 w-5" />
          <span className="text-xs">Explore</span>
        </Link>
        <Link href="/wishlist" className={`flex flex-col items-center text-gray-600 hover:text-red-500 ${pathname === "/wishlist" ? " text-red-400 " : " "}`}>
          <Heart className="h-5 w-5" />
          <span className="text-xs">Wishlist</span>
        </Link>
        <Link href="/recent" className={`flex flex-col items-center text-gray-600 hover:text-red-500 ${pathname === "/recent" ? " text-red-400 " : " "}`}>
          <History className="h-5 w-5" />
          <span className="text-xs">Recent Viewed</span>
        </Link>
        {/* <Link href="/messages" className={`flex flex-col items-center text-gray-600 hover:text-red-500 ${pathname === "/" ? " text-red-400 " : " "}`}>
          <MessageCircle className="h-5 w-5" />
          <span className="text-xs">Messages</span>
        </Link> */}
        <Link href="/profile" className={`flex flex-col items-center text-gray-600 hover:text-red-500 ${pathname === "/profile" ? " text-red-400 " : " "}`}>
          <User className="h-5 w-5" />
          <span className="text-xs">Profile</span>
        </Link>
      </div>
    </nav>
  );
}
