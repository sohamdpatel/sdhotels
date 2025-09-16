"use client";

import { usePathname, useRouter } from "next/navigation";
import { User, Briefcase, Users } from "lucide-react"; // icons
import Image from "next/image";

export default function ProfileSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const goTo = (url: string) => {
    router.push(url);
  };

  const menu = [
    {
      label: "About me",
      href: "/user/profile/about",
      active: pathname === "/user/profile/about" || pathname === "/user/profile",
      icon: <div className="w-10 h-10 flex items-center justify-center bg-black rounded-full text-white">J</div>,
    },
    {
      label: "Recent trips",
      href: "/user/profile/recent-trips",
      active: pathname === "/user/profile/recent-trips",
      icon: <Image width={40} height={40} alt="recent-trips menu icon" src={"/recent-trips.avif"} className="w-10 h-10" />,
    },
    {
      label: "Connections",
      href: "/user/profile/connections",
      active: pathname === "/user/profile/connections",
      icon: <Image width={40} height={40} alt="connection menu icon" src={"/connectionMenu.png"} className="w-10 h-10" />,
    },
  ];

  return (
    <>
    
        {/* tablate and laptop */}
        <aside className="hidden md:block min-h-screen md:px-5 lg:px-15 xl:px-20  space-y-2 sticky top-24 py-9">
            <div className=" ">
            <h2 className="text-3xl  font-semibold mb-6 tracking-wide">Profile</h2>
            <nav className="flex flex-col space-y-1 ">
                {menu.map((item) => (
                <button 
                    key={item.href}
                    onClick={() => goTo(item.href)}
                    className={`flex items-center font-semibold gap-3 rounded-lg px-4 py-3 text-left transition ${
                    item.active
                        ? "bg-gray-100 "
                        :  "hover:bg-gray-100"
                    }`}
                >
                    {item.icon}
                    <span>{item.label}</span>
                </button>
                ))}
            </nav>
            </div>
        </aside>
        {/* this is for mobile */}
        <aside className=" md:hidden">
            Hello
        </aside>
    </>

  );
}
