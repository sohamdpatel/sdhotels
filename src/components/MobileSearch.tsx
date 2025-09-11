'use client'
import { useState } from "react";
import SearchModal from "./SearchModal";
import { Search } from "lucide-react";

export default function MobileSearch() {
    const [isOpen, setIsOpen] = useState(false);
    return(
        <>
        <button
          onClick={() => setIsOpen(true)}
          className=" flex md:hidden gap-2 px-4 py-2 rounded-full shadow-[0_2px_10px_-2px] w-full text-black"
        >
            <Search />
          Start your search
        </button>
        <SearchModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </>
    )
}