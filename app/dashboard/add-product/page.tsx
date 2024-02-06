"use client";

import React, { useEffect, useState } from "react";
import ReuseableBackground from "~/components/ui/ReuseableBackground";
import Image from "next/image";
import ProductForm from "~/components/ui/ProductForm";
import { MdCancel } from "react-icons/md";
import Link from "next/link";
import DashboardLayout from "~/components/dashboardlayout/page";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "~/components/ui/carousel";
import Listtbox from "~/components/ui/List-box";
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
          <div className="gap-2  hidden md:flex items-center">
            <button className="px-3  rounded-md font-normal py-2 leading-[27px] flex justify-between  text-[20px] border-[rgb(99,99,99)]  border gap-4 ">
              Cancel
              <MdCancel />
            </button>
            <div></div>

            <div>
              <Listtbox />
            </div>

            {/* <CreatorsListbox options={Active} initialValue={Active[0]} /> */}
            <button className="bg-blue-500 px-6 py-2 rounded-md font-normal text-[20px] leading-[27px] hover:bg-brand2">
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

            <Image
              src="/add.png"
              width={395}
              height={300}
              className=" h-40 md:h-80 w-80 md:w-full"
              alt={""}
            />

            {/* <div className="grid grid-cols-3 gap-4 py-6">
              <div className="relative">
              <Image src="/female 17.png" alt="" className="rounded-md h-[104px] w-[98px]" width={89} height={206} />
             <div className="absolute top-0 text-2xl right-0">
             <MdCancel   />
             </div>
              </div>
              <div className="relative">
              <Image src="/female 17.png" alt="" className="rounded-md h-[104px] w-[98px]" width={89} height={206} />
             <div className="absolute top-0 text-2xl right-0">
             <MdCancel   />
             </div>
              </div>
              <div className="relative">
              <Image src="/female 17.png" alt="" className="rounded-md h-[104px] w-[98px]" width={89} height={206} />
             <div className="absolute top-0 text-2xl right-0">
             <MdCancel   />
             </div>
              </div>
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
          </ReuseableBackground>
        </div>
        <ProductForm />
      </div>
    </DashboardLayout>
  );
};

export default AddProduct;
