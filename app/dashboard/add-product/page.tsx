"use client";
import React, { useEffect, useRef, useState } from "react";
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

function getProductID(): string {
  return randomUUID();
}

function getSiaURI(): string {
  return randomUUID();
}

const AddProduct: React.FC = () => {
  const { data: account } = useAbstraxionAccount();
  const { client } = useAbstraxionSigningClient();
  const [imagePreviews, setImagePreviews] = useState<Array<string>>([]);
  const [fileInputVisible, setFileInputVisible] = useState<boolean>(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
      const newImagePreview = event.target?.result as string;
      setImagePreviews((prevPreviews) => [...prevPreviews, newImagePreview]);
      setFileInputVisible(false); // Hide file input after selecting an image
    };
    reader.readAsDataURL(file);
  };

  const mintProduct = async () => {
    const msg = {
      mint: {
        token_id: getProductID(),
        owner: account?.bech32Address,
        token_uri: getSiaURI(),
        extension: {},
      },
    };

    try {
      const mintRes = await client?.execute(
        account?.bech32Address,
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
  };

  const handleDelete = (index: number) => {
    setImagePreviews((prevPreviews) => {
      const updatedPreviews = [...prevPreviews];
      updatedPreviews.splice(index, 1);
      return updatedPreviews;
    });
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
              <div className=" flex flex-wrap  gap-2 my-4">
                {imagePreviews.map((preview, index) => (
                  <div key={index}>
                    <div className="relative">


                      <img
                        src={preview}
                        className="md:w-40 w-36 rounded-md h-36 md:h-40 border relative border-white"
                      />

<div className="absolute -top-2 cursor-pointer -right-2"   onClick={() => handleDelete(index)}>
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15.5306 9.53063L13.0603 12L15.5306 14.4694C15.6003 14.5391 15.6556 14.6218 15.6933 14.7128C15.731 14.8039 15.7504 14.9015 15.7504 15C15.7504 15.0985 15.731 15.1961 15.6933 15.2872C15.6556 15.3782 15.6003 15.4609 15.5306 15.5306C15.4609 15.6003 15.3782 15.6556 15.2872 15.6933C15.1961 15.731 15.0986 15.7504 15 15.7504C14.9015 15.7504 14.8039 15.731 14.7128 15.6933C14.6218 15.6556 14.5391 15.6003 14.4694 15.5306L12 13.0603L9.53063 15.5306C9.46095 15.6003 9.37822 15.6556 9.28718 15.6933C9.19613 15.731 9.09855 15.7504 9 15.7504C8.90146 15.7504 8.80388 15.731 8.71283 15.6933C8.62179 15.6556 8.53906 15.6003 8.46938 15.5306C8.3997 15.4609 8.34442 15.3782 8.30671 15.2872C8.269 15.1961 8.24959 15.0985 8.24959 15C8.24959 14.9015 8.269 14.8039 8.30671 14.7128C8.34442 14.6218 8.3997 14.5391 8.46938 14.4694L10.9397 12L8.46938 9.53063C8.32865 9.38989 8.24959 9.19902 8.24959 9C8.24959 8.80098 8.32865 8.61011 8.46938 8.46937C8.61011 8.32864 8.80098 8.24958 9 8.24958C9.19903 8.24958 9.3899 8.32864 9.53063 8.46937L12 10.9397L14.4694 8.46937C14.5391 8.39969 14.6218 8.34442 14.7128 8.3067C14.8039 8.26899 14.9015 8.24958 15 8.24958C15.0986 8.24958 15.1961 8.26899 15.2872 8.3067C15.3782 8.34442 15.4609 8.39969 15.5306 8.46937C15.6003 8.53906 15.6556 8.62178 15.6933 8.71283C15.731 8.80387 15.7504 8.90145 15.7504 9C15.7504 9.09855 15.731 9.19613 15.6933 9.28717C15.6556 9.37822 15.6003 9.46094 15.5306 9.53063ZM21.75 12C21.75 13.9284 21.1782 15.8134 20.1068 17.4168C19.0355 19.0202 17.5127 20.2699 15.7312 21.0078C13.9496 21.7458 11.9892 21.9389 10.0979 21.5627C8.20656 21.1865 6.46928 20.2579 5.10571 18.8943C3.74215 17.5307 2.81355 15.7934 2.43735 13.9021C2.06114 12.0108 2.25422 10.0504 2.99218 8.26884C3.73013 6.48726 4.97982 4.96451 6.58319 3.89317C8.18657 2.82183 10.0716 2.25 12 2.25C14.585 2.25273 17.0634 3.28084 18.8913 5.10872C20.7192 6.93661 21.7473 9.41498 21.75 12ZM20.25 12C20.25 10.3683 19.7661 8.77325 18.8596 7.41655C17.9531 6.05984 16.6646 5.00242 15.1571 4.37799C13.6497 3.75357 11.9909 3.59019 10.3905 3.90852C8.79017 4.22685 7.32016 5.01259 6.16637 6.16637C5.01259 7.32015 4.22685 8.79016 3.90853 10.3905C3.5902 11.9908 3.75358 13.6496 4.378 15.1571C5.00242 16.6646 6.05984 17.9531 7.41655 18.8596C8.77326 19.7661 10.3683 20.25 12 20.25C14.1873 20.2475 16.2843 19.3775 17.8309 17.8309C19.3775 16.2843 20.2475 14.1873 20.25 12Z" fill="#E9E9E9"/>
</svg>

</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Display only the first image */}

              <Carousel className="">
                <CarouselContent>
                  {Array.from({ length: 3 }).map((_, index) => (
                    <CarouselItem key={index} className="rounded-lg">
                      {imagePreviews.length > 0 && (
                        <div className="flex relative   gap-2 items-center">
                          <img
                            src={imagePreviews[0]}
                            className="w-full rounded-lg h-64"
                          />



                        </div>
                      )}
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <div
                  className={`${imagePreviews.length === 0 ? "hidden" : "flex"}`}
                >
                  <CarouselPrevious className="absolute -left-2" />
                  <CarouselNext className="absolute -right-2" />
                </div>
              </Carousel>

              <div
                className={`flex items-center flex-col cursor-pointer justify-center  rounded-lg  mt-6 bg-[rgb(29,30,31)] py-4 ${imagePreviews.length === 0 ? "hidden" : "flex"}`}
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="flex flex-col items-center justify-center">
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
            </div>
            {fileInputVisible && (
              <div
                className="flex flex-col items-center h-64 md:h-80 justify-center gap-4 rounded-lg  bg-[#1D1E1F] py-4"
                onClick={() => fileInputRef.current?.click()}
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
