// utils/debounce.ts
export function debounce<Args extends unknown[]>(
  func: (...args: Args) => void,
  delay: number
) {
  let timer: ReturnType<typeof setTimeout>; // works in both Node & browser

  return (...args: Args) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
}
