"use client";

import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import { Hotel } from "lucide-react";
import { usePathname } from "next/navigation";

type SearchBarWrapperProps = {
  expandOnScroll?: boolean; // default true
  showWrapper?: boolean;    // default true
};

export default function SearchBarWrapper() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const pathname = usePathname();

    // const expandOnScroll =
    // !(pathname.startsWith("/hotels/s")); // disable scroll expansion on /hotels/s
  const showWrapper =
    !(pathname === "/login" || pathname === "/register" || pathname.startsWith("/user") || pathname.startsWith("/book")); 

  useEffect(() => {
    // if (!expandOnScroll) return;

    const handleScroll = () => {
      if (window.scrollY === 0) {
        setIsExpanded(false);
      }
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  // }, [expandOnScroll]);

  const handleSearchBarClick = () => {
    setIsExpanded(true);
  };

  const handleClickOutside = (e: MouseEvent) => {
  if (
    e.target instanceof Element &&
    (
      e.target.closest(".search-bar-container") || 
      e.target.closest(".drop-down") || 
      e.target.closest("[data-radix-popper-content-wrapper]")
    )
  ) {
    return;
  }
  setIsExpanded(false);
};

  useEffect(() => {
    if (isExpanded) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [isExpanded]);

  if (!showWrapper) return <div className=" fixed left-0 w-full md:h-24 shadow-sm"></div>; // 🔴 don’t render at all

  return (
    <div
      className={`${
        isScrolled && !isExpanded ? "h-24" : "h-48"
      } fixed left-0 hidden md:block w-full top-0 border-b-2 bg-white duration-300 transition-all ease-out`}
    >
      <div className="relative h-full w-full ">
        <div className="absolute bottom-[1.45rem] h-fit flex justify-center flex-col w-full">
          <div className="flex mx-auto my-6 ">
            <div className="flex justify-center flex-col border-b-[3px] border-gray-400 items-center">
              <Hotel />
              Home
            </div>
          </div>
          {/* search bar */}
          <div
            className={`max-w-3xl flex flex-1 justify-center items-center ${
              isScrolled && !isExpanded
                ? "w-[400px]"
                : "mx-auto w-[700px]"
            } self-center rounded-full border-2 shadow-md hover:shadow-lg transition-all duration-300 ease-out search-bar-container cursor-pointer`}
            onClick={handleSearchBarClick}
          >
            <SearchBar isScrolled={isScrolled && !isExpanded} />
          </div>
        </div>
      </div>
    </div>
  );
}
