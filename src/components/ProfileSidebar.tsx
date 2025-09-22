"use client";

import { usePathname, useRouter } from "next/navigation";
import { User, Briefcase, Users } from "lucide-react"; // icons
import Image from "next/image";
import Link from "next/link";

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
        <aside className="md:hidden min-h-screen px-5 py-9 space-y-6">
  <h2 className="text-3xl font-semibold tracking-wide text-center">Profile</h2>

  <div className="mx-auto w-full max-w-[25rem]">
    {/* Profile card */}
    <Link
      href="/user/profile/about"
      className="shadow-xl rounded-3xl border px-6 py-8 flex flex-col items-center justify-center gap-3"
    >
      <div className="w-28 h-28 bg-black rounded-full text-white flex items-center justify-center font-bold text-5xl">
        S
      </div>
      <div className="text-center">
        <h1 className="font-bold text-3xl">Soham</h1>
        <h4 className="text-sm text-gray-600">Guest</h4>
      </div>
    </Link>
  </div>

  {/* two cards row */}
  <div className="flex gap-4 justify-center">
    <Link
      href="/user/profile/recent-trips"
      className="flex-1 max-w-[12rem] shadow-xl rounded-2xl border px-4 py-6 flex flex-col items-center gap-3"
    >
      <Image width={80} height={40} alt="recent-trips menu icon" src={"/recent-trips.avif"} />
      <span className="font-medium">Recent trips</span>
    </Link>

    <Link
      href="/user/profile/connections"
      className="flex-1 max-w-[12rem] shadow-xl rounded-2xl border px-4 py-6 flex flex-col items-center gap-3"
    >
      <Image width={140} height={80} alt="connection menu icon" src={"/connection.png"} className="h-20"/>
      <span className="font-medium">Connections</span>
    </Link>
  </div>

  {/* become a host card full width */}
  <div className="mx-auto w-full max-w-[25rem]">
    <Link
      href="/user/profile/host"
      className="shadow-xl rounded-2xl border px-4 py-6 flex items-center gap-4"
    >
      <Image width={60} height={80} alt="connection menu icon" src={"/connectionMenu.png"} />
      <div>
        <p className="font-medium">Become a host</p>
        <p className="text-sm text-gray-600">
          It’s easy to start hosting and earn extra income.
        </p>
      </div>
    </Link>
  </div>
</aside>

    </>

  );
}
