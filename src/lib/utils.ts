import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import mongoose, { Connection } from "mongoose"


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const connectToDb = async (): Promise<void> => {
  try {
    if ((mongoose.connection as Connection).readyState === 1) {
      console.log('Using existing connection')
      return
    }
    await mongoose.connect('mongodb://localhost:27017/Mazamaza-shop')
  } catch (error) {
    console.log(error)
    throw new Error(error as string)
  }
}
