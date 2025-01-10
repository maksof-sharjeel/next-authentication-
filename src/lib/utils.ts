import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import bcrypt from 'bcryptjs'
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const hashPassword = (password: string) => {
  return bcrypt.hashSync(password, 10); // Synchronous password hashing
};