"use client";
import Image from "next/image";
import { AiOutlineCloseCircle } from "react-icons/ai";
import Curator from "~/public/curator.png";
import React, { ChangeEvent, useRef, useState } from "react";
import { FaCamera } from "react-icons/fa6";
import { Button } from "~/components/ui/button";
import { useAccount } from "~/components/context/AccountContext";
import { truncate } from "~/utils/truncate";
import usePostData from "~/hooks/usePostData";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import useFetchUserData from "~/hooks/useFetchData";
import { useToast } from "~/components/ui/use-toast";
import LoadingModal from "~/components/ui/LoadingModal";
import axios from "axios";

interface FormData {
  bio: string;
  wallet_address: string;
  x_link: string;
  avatar?: File;
}

export default function UpdateProfile() {
  const { account } = useAccount();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [images, setImages] = useState<File | string | any | null>(Curator);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (typeof window !== "undefined") {
    const userDatInLocalStorage = window.localStorage.getItem("user");

    if (userDatInLocalStorage) {
      // No routing; user stays on the current page
    }
    // else {
    //   // Redirect to login or another relevant page if no user data
    //   router.push("/"); // Or other appropriate route
    // }
    // console.log(userDatInLocalStorage);
  }

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return; // Handle no file selection

    const file = event.target.files[0];

    if (!file.type.match(/image.*/)) {
      console.error("Please select an image file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      // Check for 5MB limit
      console.error("Image file size exceeds 5MB limit.");
      return;
    }

    const imageURL = URL.createObjectURL(file);
    setImages(imageURL);
    setImageFile(file);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const { toast } = useToast();

  const handleSuccessful = () => {
    toast({
      description: "Profile Completed.",
    });
  };

  // data
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    const values = getValues();

    const apiUrl = "https://mintyplex-api.onrender.com/api/v1/user";
    // const apiUrl = process.env.NEXT_BASE_URL;
    values.wallet_address = account.bech32Address;

    const formData = new FormData();
    for (const key in values) {
      if (values[key as keyof FormData] !== undefined) {
        formData.append(key, values[key as keyof FormData] as string);
      }
    }

    if (imageFile) {
      formData.append("avatar", imageFile);
    } else {
      console.warn("No image file provided.");
    }
    console.log(values);

    try {
      const response = await axios.postForm(apiUrl + "/profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 200 || response.status === 201) {
        handleSuccessful();
        router.push("/dashboard");
        // console.log("Form submitted successfully:", response);
      } else {
        console.error("Error creating product:", response.data);
        throw new Error("Product creation failed.");
      }
    } catch (error) {
      console.error("Error posting data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="relative flex items-center justify-center w-full h-screen">
        <div className="bg-[#313233] rounded-[8px] !max-w-[800px] px-4 md:px-8 py-6 md:py-10">
          <div className="w-full flex flex-col items-center justify-center gap-2">
            <h2 className="font-[500] text-[32px]">Complete profile</h2>
            <p className="text-center text-[13px] font-[400]">
              Your profile image will be visible next to your name in your
              Mintyplex profile and product pages.{" "}
            </p>

            {/* Image Upload Section */}
            <form className="my-2 relative">
              <div onClick={triggerFileInput} className="cursor-pointer">
                <div className="absolute bg-[#1C1E1E]/[0.5] rounded-full inset-0 grid items-center opacity-90 justify-center">
                  <FaCamera />
                </div>
                <Image
                  src={typeof images === "string" || File ? images : Curator}
                  width={120}
                  height={120}
                  alt="Curator image"
                  className="rounded-full border-[8px] border-mintyplex-dark"
                  style={{
                    height: "120px",
                    objectFit: "cover",
                    objectPosition: "top",
                  }}
                />
              </div>
              <input
                type="file"
                id="image-upload"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                ref={fileInputRef}
              />
            </form>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-3 w-full"
            >
              <div className="w-full py-2 px-4 flex justify-center">
                <h3>{truncate(account.bech32Address)}</h3>
              </div>
              <div className="form">
                <p className="mb-2 text-[14px]">
                  Bio <span className="text-red-600">*</span>
                </p>
                <textarea
                  // name="bio"
                  placeholder="Provide a well detailed description of the item."
                  className="p-4 rounded-lg border-2 border-[rgb(99,99,99)] text-[13px] placeholder:text-[14px] outline-none  w-full "
                  id=""
                  rows={4}
                  {...register("bio", { required: true })}
                ></textarea>
              </div>
              <div className="form">
                <p className="mb-2 text-[14px]">
                  X(Twitter) link <span className="text-red-600">*</span>
                </p>
                <input
                  type="url"
                  // name="x_link"
                  className="p-4 bg-none border-2 border-[rgb(99,99,99)] !text-[13px] placeholder:text-[14px] "
                  placeholder="https://www.x.com/username"
                  required
                  {...register("x_link", { required: true })}
                />
              </div>
            </form>
            <div className="w-full flex justify-end mt-4">
              <button
                onClick={handleSubmit(onSubmit)}
                // disabled={isLoading}
                className="text-white bg-mintyplex-primary px-3 py-2 rounded-[8px]"
              >
                {loading ? (
                  <>
                    <div className="loader"></div>
                  </>
                ) : (
                  "Complete Profile"
                )}
              </button>
            </div>
          </div>
          {error && <p>{error}</p>}
        </div>
      </div>
    </>
  );
}
