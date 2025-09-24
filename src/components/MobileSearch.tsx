'use client'
import { useEffect, useState } from "react";
import SearchModal from "./SearchModal";
import { Search } from "lucide-react";
import { useIsMobile } from "@/hooks/profile.hooks";
import { useSearchParams } from "next/navigation";
import { format } from "date-fns";

export default function MobileSearch() {
  const searchParams = useSearchParams();
  const cityParam = searchParams.get("city") || "";
  const checkInParam = searchParams.get("checkIn");
  const checkOutParam = searchParams.get("checkOut");
  const guestsParam = Number(searchParams.get("guests")) || 0;
    const isMobile = useIsMobile()
    const [isOpen, setIsOpen] = useState(false);
    useEffect(()=>{
      if(!isMobile) setIsOpen(false)
    },[isMobile])

    const buttonContent = (cityParam && checkInParam && checkOutParam && guestsParam) ? <div className=" flex divide-x justify-around w-full">
      <div className="flex-1">{cityParam}</div>
      <div className="flex-1">{`${format(new Date(checkInParam), "dd")} - ${format(new Date(checkOutParam), "dd LLL")}`}</div>
      <div className=" flex-1">{guestsParam + " Guests"}</div>
    </div> : <>
      <Search />
          Start your search
    </>
    return(
        <>
        <button
          onClick={() => setIsOpen(true)}
          className=" flex md:hidden gap-2 px-4 py-2 rounded-full shadow-[0_2px_10px_-2px] w-full text-black"
        >
            {buttonContent}
        </button>
        <SearchModal isOpen={isOpen} onClose={() => setIsOpen(false)}/>
        </>
    )
}