import { useState, useEffect } from "react";

/**
 * A React hook to persist state to localStorage.
 * @param key localStorage key
 * @param initialValue default value if nothing in localStorage
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  // State to store our value
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      console.warn("useLocalStorage get error", error);
      return initialValue;
    }
  });

  // Keep localStorage in sync when state changes
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.warn("useLocalStorage set error", error);
    }
  }, [key, storedValue]);

  // You can call setValue(newValue) just like useState
  return [storedValue, setStoredValue] as const;
}
