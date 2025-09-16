import { useCallback } from "react";
import { useLocalStorage } from "./localStorage.hooks";

type WishlistFolders = Record<string, HotelOffer[]>;

export function useWishlist() {
  const [folders, setFolders] = useLocalStorage<WishlistFolders>(
    "wishlist-folders",
    {}
  );

  const normalizeId = (id: string | number) => String(id);

  const addHotel = useCallback(
    (folderName: string, hotel: HotelOffer): boolean => {
      if (!folderName || !hotel || hotel.hotelId === undefined) return false;

      setFolders((prev = {}) => {
        const current = prev[folderName] ?? [];

        if (
          current.some(
            (h) => normalizeId(h.hotelId) === normalizeId(hotel.hotelId)
          )
        ) {
          return prev; // no change
        }

        return { ...prev, [folderName]: [...current, hotel] };
      });

      return true;
    },
    [setFolders]
  );

  const removeHotel = useCallback(
    (hotelId: string | number): boolean => {
      setFolders((prev = {}) => {
        const entries = Object.entries(prev);
        if (entries.length === 0) return prev;

        const idNorm = normalizeId(hotelId);
        const updated: WishlistFolders = {};
        let changed = false;

        for (const [folder, list] of entries) {
          const filtered = list.filter(
            (h) => normalizeId(h.hotelId) !== idNorm
          );
          updated[folder] = filtered;
          if (filtered.length !== list.length) changed = true;
        }

        return changed ? updated : prev;
      });

      return true;
    },
    [setFolders]
  );

  const findFolderByHotelId = useCallback(
    (hotelId: string | number): string | null => {
      console.log("findFolderByHotelId runs")
      const idNorm = normalizeId(hotelId);
      for (const folder in folders) {
        if (
          (folders[folder] || []).some(
            (h) => normalizeId(h.hotelId) === idNorm
          )
        ) {
          return folder;
        }
      }
      return null;
    },
    [folders]
  );

  const createFolder = useCallback(
    (folder: string): boolean => {
      if (!folder) return false;
      setFolders((prev = {}) => {
        if (prev[folder]) return prev;
        return { ...prev, [folder]: [] };
      });
      return true;
    },
    [setFolders]
  );

  const getFolder = useCallback(
    
    (folderName: string) => {
      console.log("getfolders")
      return folders?.[folderName] ?? [];
    },
    [folders]
  );

  return {
    folders,
    addHotel,
    removeHotel,
    createFolder,
    getFolder,
    findFolderByHotelId,
  };
}
