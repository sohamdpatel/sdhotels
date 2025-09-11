"use client";

import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import { Hotel } from "lucide-react";

export default function SearchBarWrapper() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    // This function handles the scroll event.
    const handleScroll = () => {
      // Check if the vertical scroll position is greater than 0.
      // We set the state to true as soon as the user scrolls, no matter how little.
      // This is the trigger for the animation.
      if(window.scrollY === 0){
        setIsExpanded(false)
      }
      if (window.scrollY > 0) {
        console.log("its running");
        setIsScrolled(true);
      } else {
        // Only when the scroll position is exactly 0 (at the very top),
        // we set the state back to false to expand the header.
        setIsScrolled(false);
      }
    };

    // Add the scroll event listener to the window when the component mounts.
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener when the component unmounts to prevent memory leaks.
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSearchBarClick = () => {
    setIsExpanded(true);
  };

  const handleClickOutside = (e: any) => {
    // Close expanded state when clicking outside the search bar
    if (e.target.closest('.search-bar-container')) return;
    setIsExpanded(false);
  };

  useEffect(() => {
    if (isExpanded) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [isExpanded]);

  return (
    <div
      className={`${
        isScrolled && !isExpanded ? "h-20" : "h-48"
      } fixed left-0  hidden md:block w-full top-0 border-b-2 bg-white duration-300 transition-all ease-out`}
    >
      <div className="relative h-full w-full ">
        <div className="absolute bottom-4 h-fit flex justify-center flex-col w-full">
          <div className=" flex mx-auto my-8 ">
            <div className="flex justify-center flex-col border-b-[3px] border-gray-400 items-center">
              <Hotel />
              Home
            </div>
          </div>
          {/* search bar */}
          <div
            className={`max-w-3xl  flex flex-1 justify-center items-center  ${
              isScrolled && !isExpanded ? " w-[400px]" : "mx-auto w-[700px] "
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
