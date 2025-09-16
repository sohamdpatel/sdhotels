import { useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [, forceUpdate] = useState(0);

  const getValue = (): T => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch {
      return initialValue;
    }
  };

  // 👇 this is the actual value, not a function
  const value: T = getValue();

  const setValue = (
    updater: T | ((prev: T) => T)
  ): void => {
    const current = getValue();
    const next =
      typeof updater === "function"
        ? (updater as (prev: T) => T)(current)
        : updater;

    window.localStorage.setItem(key, JSON.stringify(next));
    forceUpdate((x) => x + 1);
  };

  // 👇 value is T, setValue writes + rerenders
  return [value, setValue] as const;
}
