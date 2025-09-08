// components/ui/LikeButton.tsx
"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import { useAppSelector } from "@/redux/hooks";
import { selectAuth } from "@/redux/slices/authSlice";
import { useRouter } from "next/navigation";

export default function HotelCardLikeButton() {
  const [liked, setLiked] = useState(false);
  const { user } = useAppSelector(selectAuth);
  const router = useRouter()

  const handleOnClick = (e:any) => {
        e.preventDefault();   // ✅ Prevent link navigation
        e.stopPropagation();
        if(!user){
          alert("Login required so login first")
          router.push("/login")
        } else {
          setLiked(!liked);
        }
  }
  

  return (
    <button
      onClick={handleOnClick}
      className="absolute top-3 right-3 bg-white/80 rounded-full p-1 hover:scale-125 hover:bg-white transition"
    >
      <Heart
        className={`w-4 h-4 ${liked ? "fill-red-500 text-red-500" : "text-gray-700"}`}
      />
    </button>
  );
}
