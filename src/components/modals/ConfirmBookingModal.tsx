import { Check } from "lucide-react";
import Modal from "../ui/Modal";
import Link from "next/link";

export default function ConfirmBookingModal({hotelDetails,onClose}: {hotelDetails: any,onClose: () => void}){
    return (
        <Modal onClose={onClose}>
            <div className=" flex flex-col justify-center items-center gap-6 w-full">
                <div className=" p-7 bg-green-500 rounded-full w-fit text-white"><Check strokeWidth={3} className="w-10 h-10"/></div>
                <div className=" flex flex-col justify-center items-center gap-2 text-2xl font-extrabold">
                    <h1>
                        Great, your booking is confirmed
                    </h1>
                    <h1>
                        Here's the info you'll need
                    </h1>
                </div>
                <div className=" flex gap-6 my-2 border-y-2 py-5 mx-3">
                    <img
          src="https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6NjE5Mzc0MDg3NzM1MTA5MTM0/original/ddb89954-9b3f-467d-9fdf-036affd6b537.jpeg?im_w=1200"
          alt="hotel"
          className="w-44 aspect-square object-cover rounded-3xl"
        />
        <div className="flex flex-col gap-2">
            <div className=" flex flex-col">
                <h1 className="text-xl font-semibold text-nowrap">Luxury 2BHK – Leela Niwas – Ground Floor</h1>
                <h4 className=" text-lg text-gray-500">Banglore, IN</h4>
            </div>
            <div className=" flex gap-10 ">
                <div className=" flex flex-col  w-[150px]">
                    <h4 className=" text-[14px] text-gray-400 -mb-1">Check in</h4>
                    <h4 className=" text-[18px] font-semibold">24 SEP 2015</h4>
                </div>
                <div className=" flex flex-col w-[150px]">
                    <h4 className=" text-[14px] text-gray-400 -mb-1">Check out</h4>
                    <h4 className=" text-[18px] font-semibold">24 SEP 2015</h4>
                </div>
                <div className=" flex flex-col ">
                    <h4 className=" text-[14px] text-gray-400 -mb-1">Guests</h4>
                    <h4 className=" text-[18px] font-semibold">2</h4>
                </div>
            </div>
            <div className=" flex gap-10">
                <div className=" flex flex-col w-[150px]">
                    <h4 className=" text-[14px] text-gray-400 -mb-1">Phone</h4>
                    <h4 className=" text-[18px] font-semibold">+91 1123456789</h4>
                </div>
                <div className=" flex flex-col">
                    <h4 className=" text-[14px] text-gray-400 -mb-1">Email</h4>
                    <h4 className=" text-[18px] font-semibold">Soham@yopmail.com</h4>
                </div>
            </div>
        </div>
                </div>
                <div className=" mb-4">
                    <Link href={"/"} className=" w-full text-white p-4 rounded-xl text-xl  bg-pink-600 hover:bg-pink-700">Go to Home Paege</Link>
                </div>
            </div>
        </Modal>
    )
} 