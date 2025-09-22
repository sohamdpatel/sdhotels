'use client'
import { useIsMobile } from "@/hooks/profile.hooks";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ProfileMainModal from "../modals/ProfileMainModal";

function RecentTripProfileMain() {
  const isMobile = useIsMobile();
      const [modalClose, setModalClose] = useState(true);
      const router = useRouter();
  return (
    <>
      {!isMobile && <div className=" w-full h-full">
        <div className=" flex flex-col gap-6 h-full">
          {/* page title */}
          <div className=" flex gap-4">
              <h1 className="text-3xl  font-semibold tracking-wide self-center">Recent Trips</h1>
          </div>
          {/* details */}
          <div className=" flex gap-9 items-center flex-col justify-center h-full pb-20">
              {/* name box */}
              <Image width={200} height={100} alt="Recent trips" src={"/recent-trips.avif"}/>
              {/* complete your profile */}
              <div className=" flex flex-col items-center gap-2">
                  <p className=" text-center w-[350px] text-wrap">
                      You’ll find your past reservations here after you’ve taken your first trip on Airbnb.
                  </p>
                      <button className="w-fit px-5 mt-4 py-3 rounded-lg bg-gradient-to-r from-red-600 to-pink-600 text-white font-semibold hover:opacity-90 transition">
                Book a trip
                  </button>
              </div>
          </div>
        </div>
      </div>}
      {
            isMobile && (
              <ProfileMainModal
                open={modalClose}
                onClose={() => {
                  setModalClose(false);
                  router.push("/user/profile");
                }}
              >
                <div className=" w-full h-full p-5">
            <div className=" flex flex-col gap-6 h-full">
              {/* page title */}
              <div className=" flex justify-center gap-4">
                              <h1 className="text-3xl  font-semibold tracking-wide self-center">Recent Trips</h1>
              </div>
              {/* details */}
              <div className=" flex gap-9 items-center flex-col justify-center h-full pb-20">
                {/* name box */}
                <Image width={200} height={100} alt="Recent trips" src={"/recent-trips.avif"}/>
                {/* complete your profile */}
                <div className=" flex flex-col items-center gap-2">
                  <p className=" text-center max-w-[350px] text-wrap">
                    You’ll find your past reservations here after you’ve taken your first trip on Airbnb.
                  </p>
                  <button className="w-fit px-5 mt-4 py-3 rounded-lg bg-gradient-to-r from-red-600 to-pink-600 text-white font-semibold hover:opacity-90 transition">
                    Book a trip
                  </button>
                </div>
              </div>
            </div>
          </div>
              </ProfileMainModal>
            )
          }
    </>
  )
}

export default RecentTripProfileMain
