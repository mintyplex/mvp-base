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

export const truncateXionAddress = (address: string) => {
  var prefix = address.substring(0, 6);
  var suffix = address.substring(address.length - 4);

  return prefix + "..." + suffix;
};

export const mintyplexContractAddress: string =
  "xion1h6hrq6wlfrt53aafpt27uvvrmwqeqwrcuqdy4uzcdn4jqz2sqdcq8egzfu";
