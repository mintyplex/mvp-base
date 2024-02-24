"use client";

import React, { useRef, useState } from "react";
import ReuseableBackground from "~/components/ui/ReuseableBackground";
import ProductForm from "~/components/ui/ProductForm";
import { MdCancel } from "react-icons/md";
import Link from "next/link";
import DashboardLayout from "~/components/dashboardlayout/page";
import Listtbox from "~/components/ui/List-box";
import { randomUUID } from "crypto";
import {
  useAbstraxionAccount,
  useAbstraxionSigningClient,
} from "@burnt-labs/abstraxion";
import { mintyplexContractAddress } from "~/lib/utils/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "~/components/ui/carousel";
import Image from "next/image";

function getProductID() {
  return randomUUID();
}

function getSiaURI() {
  return randomUUID();
}

const AddProduct: React.FC = () => {
  const { data: account } = useAbstraxionAccount();
  const { client } = useAbstraxionSigningClient();
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [fileInputVisible, setFileInputVisible] = useState(true);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  // function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
  //   if (event.target.files && event.target.files.length > 0) {
  //     const file = event.target.files[0];
  //     if (file) {
  //       const reader = new FileReader();
  //       reader.onload = () => {
  //         setSelectedImage({
  //           name: file.name,
  //           size: file.size,
  //           type: file.type,
  //           url: reader.result,
  //         });
  //       };
  //       reader.readAsDataURL(file);
  //     }
  //   }
  // }

  async function mintProduct() {
    const msg = {
      mint: {
        token_id: getProductID(),
        owner: account.bech32Address,
        token_uri: getSiaURI(),
        extension: {},
      },
    };

    try {
      const mintRes = await client?.execute(
        account.bech32Address,
        mintyplexContractAddress,
        msg,
        {
          amount: [{ amount: "0", denom: "uxion" }],
          gas: "500000",
        },
        "",
        []
      );
      console.log(mintRes);
      // Show an alert of transaction hash response
    } catch (error) {
      console.log(error);
    }
  }

  const handleFileChange = (event: { target: { files: any } }) => {
    const files = event.target.files;
    if (files) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.type.startsWith("image/")) {
          displayImage(file);
        }
      }
    }
  };

  const displayImage = (file: Blob) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target) {
        const newImagePreview = event.target.result;
        if (typeof newImagePreview === "string") {
          setImagePreviews((prevPreviews) => [
            ...prevPreviews,
            newImagePreview,
          ]);
        }
        setFileInputVisible(false); // Hide file input after selecting an image
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <DashboardLayout>
      <div className="mt-10">
        <div>
          <Link href="/dashboard">
            <button className="px-3 py-2 md:hidden my-8 rounded-md font-normal text-[16px] leading-[27px]  border-brand10 border flex gap-4 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M20 11H7.83L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13H20V11Z"
                  fill="#E9E9E9"
                />
              </svg>
            </button>
          </Link>
        </div>

        <div className="flex items-center justify-between">
          <h2 className="md:text-[36px] text-[24px] leading-[46px] font-semibold">
            Add Product
          </h2>
          <div className="items-center hidden gap-2 md:flex">
            <button className="px-3  rounded-md font-normal py-2 leading-[27px] flex justify-between  text-[20px] border-[rgb(99,99,99)]  border gap-4 ">
              Cancel
              <MdCancel />
            </button>
            <div></div>
            <div>
              <Listtbox />
            </div>
            <button className="bg-blue-500 px-6 py-2 rounded-md font-normal text-[20px] leading-[27px] hover:bg-brand2">
              Save
            </button>
            <button
              onClick={mintProduct}
              className="bg-blue-500 px-6 py-2 rounded-md font-normal text-[20px] leading-[27px] hover:bg-brand2"
            >
              Mint
            </button>
          </div>
        </div>
        <div className="my-8">
          <ReuseableBackground>
            <h1 className="px-4 text-base">
              Image <span className="text-red-600">*</span>
            </h1>

            <div className="items-center gap-2">
              {/* Display all images */}
              <div className="flex my-4 gap-2">
                {imagePreviews.map((preview, index) => (
                  <div key={index}>
                    <div className="">
                      <Image
                        src={preview}
                        height={160}
                        width={160}
                        alt="preview"
                        className="w-40 h-40 border border-white"
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Display only the first image */}

              <Carousel className="">
                <CarouselContent>
                  {Array.from({ length: 3 }).map((_, index) => (
                    <CarouselItem key={index} className="">
                      {imagePreviews.length > 0 && (
                        <div className="flex items-center gap-2">
                          <Image
                            alt="preview-image"
                            src={imagePreviews[0]}
                            width={240}
                            height={240}
                            className="w-full h-60"
                          />
                        </div>
                      )}
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <div>
                  <CarouselPrevious className="absolute -left-2" />
                  <CarouselNext className="absolute -right-2" />
                </div>
              </Carousel>
              <div
                className={`flex items-center flex-col justify-center  rounded-lg  mt-6 bg-[rgb(29,30,31)] py-4 ${imagePreviews.length === 0 ? "hidden" : "flex"}`}
                onClick={() => {
                  if (fileInputRef.current) {
                    fileInputRef.current.click();
                  }
                }}
              >
                <h1 className="flex items-center justify-center text-[11px] md:text-[13px]">
                  Upload an Image or drag and drop
                </h1>
                <h1 className="flex justify-center items-center text-[13px]">
                  PNG or JPEG up to 5MB
                </h1>
                <input
                  type="file"
                  id="fileInput"
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                  ref={fileInputRef}
                  multiple
                />
              </div>
            </div>
            {fileInputVisible && (
              <div
                className="flex flex-col items-center h-64 md:h-80 justify-center gap-4 rounded-lg mt-6 bg-[#1D1E1F] py-4"
                onClick={() => {
                  if (fileInputRef.current) {
                    fileInputRef.current.click();
                  }
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                >
                  {/* SVG Paths */}
                </svg>
                <div className="flex flex-col items-center justify-center">
                  <h1 className="flex items-center justify-center text-[19px] md:text-[25px]">
                    Upload an Image or drag and drop
                  </h1>
                  <h1 className="flex justify-center items-center text-[13px]">
                    PNG or JPEG up to 5MB
                  </h1>
                  <input
                    type="file"
                    id="fileInput"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                    ref={fileInputRef}
                    multiple
                  />
                </div>
              </div>
            )}
          </ReuseableBackground>
        </div>
        <ProductForm />
      </div>
    </DashboardLayout>
  );
};

export default AddProduct;
