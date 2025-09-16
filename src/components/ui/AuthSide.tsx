// components/ui/AuthSide.tsx
"use client";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Menu, User, LogIn,UserRoundPlus, Heart } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { selectAuth, logout } from "@/redux/slices/authSlice";
import Link from "next/link";
import Image from "next/image";

export default function AuthSide() {
  const { user } = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center space-x-2 border rounded-full px-3 py-2 shadow-sm cursor-pointer hover:shadow-md transition">
          <Menu className="h-5 w-5 text-gray-600" />
          {user?.avatar ? (
            <Image
              src={user.avatar}
              alt="Profile"
              width={30}
              height={30}
              className="rounded-full"
            />
          ) : (
            <User className="h-5 w-5 text-gray-600" />
          )}
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56 mt-2 mr-2">
        {user ? (
          <>
            <DropdownMenuLabel>
              <div className=" flex gap-4 items-center">
                <div className=" border w-16 h-16 flex items-center justify-center text-2xl bg-black text-white  rounded-full "><span>J</span></div>
                <div>
                  <p className="font-semibold text-xl">{user.name}</p>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuItem asChild>
              <Link href="/user/profile" className=" font-semibold text-[16px]"><User className=" text-black"/>Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/user/wishlists"className=" font-semibold text-[16px]"><User className=" text-black"/>Wishlists</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/messages" className=" font-semibold text-[16px]"><User className=" text-black"/>Recent Viewed</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => dispatch(logout())}>
              Log out
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuItem asChild>
              <Link href="/login" className=" font-semibold text-[16px]"><LogIn className=" text-black"/>Log in</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/register" className=" font-semibold text-[16px]"><UserRoundPlus className=" text-black"/>Sign up</Link>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
