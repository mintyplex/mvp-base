import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import mongoose from "mongoose";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const connectMongoDB = async () => {
  if (!process.env.MONGODB_URI) {
    console.error("MONGODB_URI is not defined");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);
  } catch (error) {
    console.error(error);
  }
};

export const truncateXionAddress = (address: string = "") => {
  var prefix = address?.substring(0, 6);
  var suffix = address?.substring(address.length - 4);

  return prefix + "..." + suffix;
};

export const mintyplexContractAddress: string =
  "xion1gdzk8u6z3u46220qtlr6kktqv023dsyh32j22c05vnpr5wnfulmsxvcwrv";

export function truncateString(str: string, maxLength: number): string {
  if (str.length > maxLength) {
    return str.substring(0, maxLength - 3) + "..."; // Truncate and add ellipsis
  }
  return str;
}

export function createPriceWithDiscount(price: number, discount: number) {
  const returnMe = price - (price * discount) / 100;
  return returnMe.toFixed(2).toString();
}
