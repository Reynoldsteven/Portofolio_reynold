import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge Tailwind classes without conflicts */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Wrap a number between 0–360 */
export function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}
