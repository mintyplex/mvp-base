"use client";
import Image from "next/image";
import { AiOutlineCloseCircle } from "react-icons/ai";
import Curator from "~/public/curator.png";
import React, { ChangeEvent, useRef, useState } from "react";
import { Button } from "../ui/button";
import { FaCamera } from "react-icons/fa6";
import usePutData from "~/hooks/usePutData";
import { useAccount } from "../context/AccountContext";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import axios from "axios";

type ModalProps = {
  setEditModal?: any;
  handleSuccessful?: any;
  handleError?: any;
};

interface FormData {
  bio: string;
  avatar?: File;
  wallet_address: string;
  x_link: string;
}

export default function EditModal({
  setEditModal,
  handleSuccessful,
  handleError,
}: ModalProps) {
  const { accountData, userData } = useAccount();

  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [images, setImages] = useState<File | string | any | null>(userData.avatar);

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

  // form handle
  const router = useRouter();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    const values = getValues();

    const API_URL = process.env.NEXT_PUBLIC_API_URL;

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
      const response = await axios.putForm(
        `${API_URL}` + "/user/profile/" + accountData,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200 || response.status === 201) {
        handleSuccessful();
        setEditModal(false);
        // console.log("Form submitted successfully:", response);
      } else {
        console.error("Error creating product:", response.data);
        throw new Error("Product creation failed.");
      }
    } catch (error) {
      console.error("Error posting data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  console.log(userData);
  

  return (
    <div className="bg-bg-dark/[0.65] fixed inset-0 z-[9999] backdrop-blur-[10px] px-4 overflow-auto">
      <div className="relative flex items-center justify-center w-full h-screen">
        <div className="bg-[#313233] rounded-[8px] !max-w-[800px] px-4 md:px-8 py-6 md:py-10">
          <div className="w-full flex flex-col items-center justify-center gap-2">
            {/* Close Button */}
            <div
              className="cursor-pointer w-full flex justify-end"
              onClick={() => setEditModal(false)}
            >
              <AiOutlineCloseCircle size={30} />
            </div>
            <h2 className="font-[500] text-[32px]">Edit Bio</h2>
            <p className="text-center text-[13px] font-[400]">
              Your logo will be visible next to your name in your Mintyplex
              profile and product pages.{" "}
            </p>

            {/* Image Upload Section */}
            <form>
              <div className="my-4 relative">
                <div onClick={triggerFileInput} className="cursor-pointer">
                  <div className="absolute bg-[#1C1E1E]/[0.5] rounded-full inset-0 grid items-center opacity-90 justify-center">
                    <FaCamera />
                  </div>
                  <Image
                    src={typeof images === "string" || File ? images : userData.avatar}
                    width={120}
                    height={120}
                    alt="Curator"
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
              </div>
            </form>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-3 w-full"
            >
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
                  defaultValue={userData.bio as string}
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
                  defaultValue={userData.x_link as string}
                />
              </div>
            </form>
            <div className="w-full flex justify-end mt-4">
              <button
                onClick={handleSubmit(onSubmit)}
                // disabled={isLoading}
                className="text-white bg-mintyplex-primary px-3 py-2 rounded-[8px]"
              >
                {isLoading ? (
                  <>
                    <div className="loader"></div>
                  </>
                ) : (
                  "Update"
                )}
              </button>
            </div>
          </div>
          {/* {error && <p>{error}</p>} */}
        </div>
      </div>
    </div>
  );
}
