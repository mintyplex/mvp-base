"use client";

import React, { useEffect, useState } from "react";
import ReuseableBackground from "~/components/ui/ReuseableBackground";
import Image from "next/image";
import ProductForm from "~/components/ui/ProductForm";
import { MdCancel } from "react-icons/md";
import Link from "next/link";
import DashboardLayout from "~/components/dashboardlayout/page";
import CreatorsListbox from "~/components/ui/select";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "~/components/ui/carousel";
const AddProduct: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);
  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(image);
    } else {
      setPreview(null);
    }
  }, [image]);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);
  const Active = [
    { name: "Less Active" },
    { name: "Arlene Mccoy" },
    { name: "Devon Webb" },
    { name: "Tom Cook" },
    { name: "Tanya Fox" },
    { name: "Hellen Schmidt" },
  ];

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

        <div className="flex justify-between items-center">
          <h2 className="md:text-[36px] text-[24px] leading-[46px] font-semibold">
            Add Product
          </h2>
          <div className="gap-4  hidden md:flex items-center">
            <button className="px-6 py-2 rounded-md font-normal text-[16px] leading-[27px] hover:bg-blue-700 border-brand10 border flex gap-4 items-center">
              Cancel
              <MdCancel />
            </button>
            <CreatorsListbox options={Active} initialValue={Active[0]} />
            <button className="bg-blue-500 px-6 py-2 rounded-md font-normal text-[16px] leading-[27px] hover:bg-brand2">
              Save
            </button>
          </div>
        </div>
        <div className="my-8">
          <ReuseableBackground>
            {/* <form className="w-full h-full">
              {preview ? (
                <Image
                  src={preview}
                  width={1000}
                  height={390}
                  objectFit="contain"
                  className="h-80 object-contain w-full"
                  alt="er"
                  onClick={() => {
                    setImage(null);
                  }}
                />
              ) : (
                <Image
                  src="/assets/imageFrame.png"
                  width={1300}
                  height={390}
                  className="h-80 "
                  alt="er"
                  onClick={(event: { preventDefault: () => void }) => {
                    event.preventDefault();
                    fileRef.current?.click();
                  }}
                />
              )}
              <input
                ref={fileRef}
                type="file"
                style={{ display: "none" }}
                accept="image/*"
                onChange={handleFileChange}
              />
            </form> */}
            <h1 className="px-4 text-base">
              Image <span className="text-red-600">*</span>
            </h1>

            <Image src='/add.png' width={395} height={300} className=" h-80 w-80" alt={""} />

            {/* <div className="grid grid-cols-3 gap-4 py-6">
              <div className="relative">
                <Image
                  src="/female 17.png"
                  alt=""
                  className="rounded-md h-[104px] w-[98px]"
                  width={89}
                  height={206}
                />
                <div className="absolute top-0 text-2xl right-0">
                  <MdCancel />
                </div>
              </div>
              <div className="relative">
                <Image
                  src="/female 17.png"
                  alt=""
                  className="rounded-md h-[104px] w-[98px]"
                  width={89}
                  height={206}
                />
                <div className="absolute top-0 text-2xl right-0">
                  <MdCancel />
                </div>
              </div>
              <div className="relative">
                <Image
                  src="/female 17.png"
                  alt=""
                  className="rounded-md h-[104px] w-[98px]"
                  width={89}
                  height={206}
                />
                <div className="absolute top-0 text-2xl right-0">
                  <MdCancel />
                </div>
              </div>
<<<<<<< HEAD
            </div> */}
    {/* <Carousel setApi={setApi}>
      <CarouselContent>
        <CarouselItem>
          <Image src="/female 17.png" alt="" className="rounded-md " width={500} height={400} />
        </CarouselItem>
        <CarouselItem>
          <Image src="/female 17.png" className="rounded-md " alt="" width={500} height={400} />
          </CarouselItem>
        <CarouselItem><Image src="/female 17.png" className="rounded-md " alt="" width={500} height={400} /></CarouselItem>
      </CarouselContent>
    </Carousel> */}

  
=======
            </div>
            <Carousel setApi={setApi}>
              <CarouselContent>
                <CarouselItem>
                  <Image
                    src="/female 17.png"
                    alt=""
                    className="rounded-md "
                    width={500}
                    height={400}
                  />
                </CarouselItem>
                <CarouselItem>
                  <Image
                    src="/female 17.png"
                    className="rounded-md "
                    alt=""
                    width={500}
                    height={400}
                  />
                </CarouselItem>
                <CarouselItem>
                  <Image
                    src="/female 17.png"
                    className="rounded-md "
                    alt=""
                    width={500}
                    height={400}
                  />
                </CarouselItem>
              </CarouselContent>
            </Carousel>

            <div className="flex items-center gap-4 rounded-lg  mt-6 bg-[#1D1E1F] py-4 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
              >
                <path
                  d="M13.4375 17.1875L20 23.75L26.5625 17.1875"
                  stroke="#E9E9E9"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M20 6.25V23.75"
                  stroke="#E9E9E9"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M33.75 23.75V32.5C33.75 32.8315 33.6183 33.1495 33.3839 33.3839C33.1495 33.6183 32.8315 33.75 32.5 33.75H7.5C7.16848 33.75 6.85054 33.6183 6.61612 33.3839C6.3817 33.1495 6.25 32.8315 6.25 32.5V23.75"
                  stroke="#E9E9E9"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <div className="flex flex-col justify-center items-center">
                <h1 className="flex text-base justify-center items-center">
                  Upload a file or drag and drop
                </h1>
                <h1 className="flex justify-center items-center text-[13px]">
                  PNG or JPEG upto 5MB
                </h1>
              </div>
            </div>
>>>>>>> efe4ab450dcc83e1190add10263ff0f95efe1539
          </ReuseableBackground>
        </div>
        <ProductForm />
      </div>
    </DashboardLayout>
  );
};

export default AddProduct;
