"use client";
import Image from "next/image";
import { AiOutlineCloseCircle } from "react-icons/ai";
import Curator from "~/public/curator.png";
import React, { useRef, useState } from "react";
import { Button } from "../ui/button";
import { FaCamera } from "react-icons/fa6";
import usePutData from "~/hooks/usePutData";
import { useAccount } from "../context/AccountContext";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

type ModalProps = {
  setEditModal?: any;
  handleSuccessful?: any;
  handleError?: any;
};

interface FormData {
  bio: string;
  email: string;
  wallet_address: string;
  x_link: string;
}

export default function EditModal({
  setEditModal,
  handleSuccessful,
  handleError,
}: ModalProps) {
  const { accountData } = useAccount();

  const [imageSrc, setImageSrc] = useState<any>(Curator);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    setImageFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
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
  const { postData, isLoading, error } = usePutData();

  const onSubmit = async (data: any) => {
    // preventDefault();
    const apiUrl = "https://mintyplex-api.onrender.com/api/v1/user";
    // const apiUrl = process.env.NEXT_BASE_URL;

    console.log(data);

    const response = await postData({
      url: `${apiUrl}/profile/${accountData}`,
      body: data,
    });
    if (response) {
      handleSuccessful();
      console.log("Profile updated successfully:", response);
      setEditModal(false);
    }
  };

  // On submit Image
  const onSubmitImage = async () => {
    // preventDefault(); // Remove this line as it's not needed in this context
    const apiUrl = "https://mintyplex-api.onrender.com/api/v1/user";

    if (!imageFile) {
      console.error("No image file selected");
      return;
    }

    const formData = new FormData();
    formData.append("avatar", imageFile);

    try {
      const response = await fetch(`${apiUrl}/avatar/${accountData}`, {
        method: "PUT",
        body: formData,
      });

      if (response.ok) {
        handleSuccessful();
        console.log("Image uploaded successfully");
        // router.push("/dashboard");
      } else {
        handleError();
        console.error("Failed to upload image");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleSubmitAll = () => {
    onSubmit(getValues());
    onSubmitImage();
  };

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
            <form onSubmit={handleSubmit(onSubmitImage)}>
              <div className="my-4 relative">
                <div onClick={triggerFileInput} className="cursor-pointer">
                  <div className="absolute bg-[#1C1E1E]/[0.5] rounded-full inset-0 grid items-center opacity-90 justify-center">
                    <FaCamera />
                  </div>
                  <Image
                    src={imageSrc}
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
                onClick={handleSubmitAll}
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
          {error && <p>{error}</p>}
        </div>
      </div>
    </div>
  );
}
