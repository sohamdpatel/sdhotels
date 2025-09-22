"use client"
import AboutProfileMain from "@/components/profilePageMainComponent/AboutProfileMain";
import { Button } from "@/components/ui/button";
import { LucideMessagesSquare } from "lucide-react";
import { useEffect, useState } from "react";

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < breakpoint);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);
  return isMobile;
}

export default function ProfileRootPage() {
  const isMobile = useIsMobile()
  return  isMobile ? <div></div> : <div className=" w-full block">
        <div className=" flex flex-col gap-6">
          {/* page title */}
          <div className=" flex gap-4">
              <h1 className="text-3xl  font-semibold tracking-wide self-center">About Me</h1>
              <Button className=" px-3 text-sm h-7 py-0 flex items-center self-center bg-gray-300 text-black">Edit</Button>
          </div>
          {/* details */}
          <div className=" flex gap-9 items-center flex-wrap lg:flex-nowrap ">
              {/* name box */}
              <div className=" px-6 py-8 shadow-xl rounded-3xl w-[20rem] h-[15rem] shrink-0 flex flex-col items-center justify-center gap-3 border ">
                  <div className=" w-28 h-28 bg-black rounded-full text-white flex items-center justify-center font-bold text-5xl">
                      J   
                  </div>
                  <div>
                      <h1 className=" font-bold text-3xl text-center">John</h1>
                      <h4 className=" text-sm text-gray-600 text-center">Guest</h4>
                  </div>
              </div>
              {/* complete your profile */}
              <div className=" flex flex-col gap-2 min-w-[10rem]">
                  <h2 className=" text-2xl font-medium tracking-tight">
                      Complete your profile
                  </h2>
                  <p>
                      Your Airbnb profile is an important part of every reservation. Create yours to help other hosts and guests get to know you.
                  </p>
                  <div>
                      <button className="w-fit px-5 mt-4 py-3 rounded-lg bg-gradient-to-r from-red-600 to-pink-600 text-white font-semibold hover:opacity-90 transition">
                Get Started
                  </button>
                  </div>
              </div>
          </div>
          {/* break */}
          <div className=" border-b-2 my-5"></div>
          {/* reviews */}
          <div className=" flex gap-5 ">
              <LucideMessagesSquare />
              <h2 className=" text-[1.125rem] h-fit">Reviews I've written</h2>
          </div>
        </div>
      </div>
}