// hooks/useWishlist.ts
import { useCallback } from "react";
import { useLocalStorage } from "./localStorage.hooks";



type WishlistFolders = Record<string, HotelOffer[]>;

export function useWishlist() {
  const [folders, setFolders] = useLocalStorage<WishlistFolders>(
    "wishlist-folders",
    {}
  );

  // helper to normalize id so "123" vs 123 match
  const normalizeId = (id: string | number) => String(id);

  const addHotel = useCallback(
    (folderName: string, hotel: HotelOffer): boolean => {
      if (!folderName || !hotel || hotel.hotelId === undefined) return false;

      setFolders((prev = {}) => {
        const current = prev[folderName] ?? [];

        // avoid duplicates by normalized id
        if (current.some((h) => normalizeId(h.hotelId) === normalizeId(hotel.hotelId))) {
          return prev; // no change
        }

        // return new object (immutable)
        return { ...prev, [folderName]: [...current, hotel] };
      });

      return true;
    },
    [setFolders]
  );

  const removeHotel = useCallback(
    (hotelId: string | number): boolean => {
      setFolders((prev = {}) => {
        // If no folders exist, nothing to remove
        const entries = Object.entries(prev);
        if (entries.length === 0) return prev;

        const idNorm = normalizeId(hotelId);

        const updated: WishlistFolders = {};
        let changed = false;

        for (const [folder, list] of entries) {
          const filtered = list.filter((h) => normalizeId(h.hotelId) !== idNorm);
          updated[folder] = filtered;
          if (filtered.length !== list.length) changed = true;
        }

        // If nothing changed, return prev so state identity doesn't change
        return changed ? updated : prev;
      });

      return true;
    },
    [setFolders]
  );

  const findFolderByHotelId = useCallback(
    (hotelId: string | number): string | null => {
      const idNorm = normalizeId(hotelId);
      for (const folder in folders) {
        if ((folders[folder] || []).some((h) => normalizeId(h.hotelId) === idNorm)) {
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
      return folders?.[folderName] ?? [];
    },
    [folders]
  );

  return { folders, addHotel, removeHotel, createFolder, getFolder, findFolderByHotelId };
}
