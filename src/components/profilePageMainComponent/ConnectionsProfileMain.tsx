import Image from "next/image"


function ConnectionsProfileMain() {
  return (
    <div className=" w-full h-full">
          <div className=" flex flex-col gap-6 h-full">
            {/* page title */}
            <div className=" flex gap-4">
                <h1 className="text-3xl  font-semibold tracking-wide self-center">Connections</h1>
            </div>
            {/* details */}
            <div className=" flex gap-9 items-center flex-col justify-center h-full pb-20">
                {/* name box */}
                <Image width={350} height={150} alt="Connections" src={"/connection.png"}/>
                {/* complete your profile */}
                <div className=" flex flex-col items-center gap-2">
                    <p className=" text-center w-[350px] text-wrap">
                        When you join an experience or invite someone on a trip, you’ll find the profiles of other guests here. Learn more
                    </p>
                        <button className="w-fit px-5 mt-4 py-3 rounded-lg bg-gradient-to-r from-red-600 to-pink-600 text-white font-semibold hover:opacity-90 transition">
                  Book a trip
                    </button>
                </div>
            </div>
          </div>
        </div>
  )
}

export default ConnectionsProfileMain
