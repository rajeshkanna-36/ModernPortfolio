import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility to merge tailwind classes with clsx and tailwind-merge.
 * Essential for modern, high-end React development.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
