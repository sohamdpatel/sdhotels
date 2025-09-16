"use client";
import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { useAppSelector } from "@/redux/hooks";
import { selectAuth } from "@/redux/slices/authSlice";
import { useRouter } from "next/navigation";
import Modal from "./Modal";
import { useWishlist } from "@/hooks/wishlist.hooks";
import { cn } from "@/lib/utils";

export default function HotelCardLikeButton({ hotel }: { hotel: HotelOffer }) {
  const { user } = useAppSelector(selectAuth);
  const router = useRouter();
  const { addHotel, removeHotel, findFolderByHotelId, folders, createFolder } = useWishlist();
  // console.log("like button")
  // keep SSR & client in sync
  const [liked, setLiked] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    const folder = findFolderByHotelId(hotel.hotelId);
    if (folder) setLiked(true);
  }, [hotel.hotelId]);

  const handleOnClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Like button clicked")

    if (!user) {
      alert("Login required so login first");
      router.push("/login");
      return;
    }

    if (liked) {
      console.log("i am ain the liked condition");
      
      removeHotel(hotel.hotelId);
      setLiked(false);
      return;
    }
    setIsOpen(true);
  };

  const handleSaveToFolder = (folderName: string) => {
    console.log("modal opened and folder selected")
    addHotel(folderName, hotel);
    setLiked(true);
    setIsOpen(false);
  };

  useEffect(() => {
  console.log("folders after update", folders);
}, [folders]);

  // render neutral icon until mounted to avoid mismatch
  const heartClasses = mounted && liked
    ? "fill-red-500 text-red-500"
    : "text-gray-700";

  return (
    <>
      <button
        onClick={handleOnClick}
        className="absolute top-3 right-3 bg-white/80 rounded-full p-1 hover:scale-125 hover:bg-white transition"
      >
        <Heart className={cn("w-4 h-4", heartClasses)} />
      </button>

      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">Save to wishlist folder</h3>
            <div className="space-y-2">
              {Object.keys(folders).map((folder) => (
                <button
                  key={folder}
                  className="w-full text-left px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded"
                  onClick={() => handleSaveToFolder(folder)}
                >
                  {folder}
                </button>
              ))}
              <button
                className="w-full text-left px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded"
                onClick={() => {
                  const newFolder = prompt("Enter new folder name:");
                  if (newFolder) {
                    if (!createFolder(newFolder)) {
                      alert("Folder with this name already exists");
                      return;
                    }
                    handleSaveToFolder(newFolder);
                  }
                }}
              >
                + Create new folder
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
