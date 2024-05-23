"use client";

import React, { useEffect, useState } from "react";
import Image, { StaticImageData } from "next/image";
import curatorBg from "~/public/curator-bg.png";
import mobileBg from "~/public/mobile-creator-bg.png";
import topCreator from "~/public/top-creator.jpeg";
import creatorImg from "~/public/curator.png";
import { FaXTwitter } from "react-icons/fa6";
import { TbSettings } from "react-icons/tb";
import { TypographyH3 } from "~/utils/typography";
import EditModal from "~/components/customs/modal";
import { GoCopy } from "react-icons/go";
import { copyToClipboard } from "~/utils/copyToClipboard";
import { toast, useToast } from "~/components/ui/use-toast";
import { useAccount } from "~/components/context/AccountContext";
import { truncate } from "~/utils/truncate";
import useFetchUserData from "~/hooks/useFetchData";
import Link from "next/link";
import BackButton from "~/app/popular-products/_components/back-button";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { Card } from "../customs/card";

interface ProductType {
  ID: string;
  Name: string;
  UserId: string;
  Discount?: any; // Optional property
  Price: any;
}

export default function Profile() {
  const [editModal, setEditModal] = useState(false);
  const { accountData, isLoggedIn, userAvatar, userData } = useAccount();

  const userProducts = userData?.products;
  const userURL = `${userData?.x_link}`;

  // console.log(userProducts);
  

  const { toast } = useToast();

  const handleSuccessful = () => {
    toast({
      description: "Profile updated.",
    });
  };

  const handleError = () => {
    toast({
      description: "Error uploading image (try an image with less than 1mb).",
    });
  };

  const handleCopy = (text: string | null) => {
    toast({
      description: "Creators address copied.",
    });
  };

  const sortedData = userProducts?.slice().sort((a: any, b: any) => {
    const timestampA = new Date(a.CreatedAt).getTime();
    const timestampB = new Date(b.CreatedAt).getTime();

    return timestampB - timestampA;
  });

  return (
    <>
      <div className="w-full pb-4 mt-10">
        <div className="relative w-full">
          <BackButton
            variant="ghost"
            size="icon"
            className="!border bg-!none border-input mb-6"
          >
            <ArrowLeftIcon />
          </BackButton>
          <div className="flex w-full h-fit min-h-[170px] md:min-h-fit rounded-[24px] relative overflow-hidden">
            <Image
              height={600}
              draggable={false}
              alt="Curator bg"
              src={curatorBg}
              className="hidden object-cover object-center md:block"
            />
            <Image
              height={170}
              draggable={false}
              alt="Curator bg"
              src={curatorBg}
              className="block object-cover object-center md:hidden"
            />
            <div className="absolute bottom-0 right-0 mb-4 mr-4 md:mr-6 md:mb-6 z-[11]">
              <Link target="_blank" href={userURL}>
                <div className="p-3 rounded-full bg-mintyplex-dark cursor-pointer ">
                  <FaXTwitter size={20} />
                </div>
              </Link>
            </div>
          </div>
          <div className="absolute top-[68%] md:top-[73%] md:right-20 right-0 z-[11]">
            <div
              className="flex gap-2 text-[10px] md:text-[16px] cursor-pointer justify-center items-center p-[8px] w-[100px] md:w-[125px] rounded-[8px] border border-[#313233]"
              onClick={() => setEditModal(true)}
            >
              <TbSettings size={24} />
              <p>Edit Bio</p>
            </div>
          </div>
          <div className="relative md:mt-[-70px] mt-[-50px] z-[1] flex justify-start md:pl-[70px] px-[30px] w-full">
            <div className="flex flex-col items-left gap-4">
              <Image
                width={150}
                height={150}
                className="hidden md:block rounded-[16px] border-[9px] border-mintyplex-dark"
                draggable={false}
                alt=""
                src={userAvatar}
                style={{
                  height: "150px",
                  objectFit: "cover",
                  objectPosition: "top",
                }}
              />
              <Image
                width={100}
                height={100}
                className="md:hidden rounded-[16px] border-[7px] border-mintyplex-dark"
                draggable={false}
                alt="user image"
                src={userAvatar}
                style={{
                  height: "100px",
                  objectFit: "cover",
                  objectPosition: "top",
                }}
              />
              <div className="flex items-center gap-4">
                <TypographyH3>{truncate(accountData)}</TypographyH3>
                <div
                  className="cursor-pointer"
                  onClick={() => copyToClipboard(`${accountData}`, handleCopy)}
                >
                  <GoCopy />
                </div>
              </div>
              <div className="w-full grid place-items-center">
                <p className="max-w-[630px] text-left font-[300]">
                  {userData?.bio}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="my-10 space-y-6">
          {userProducts?.length === 0 ? (
            <div className="h-[30vh] flex w-[100%] items-center justify-center">
              <p>No Items yet</p>
            </div>
          ) : (
            <div className="grid-cols-2 grid gap-4 xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-4 sm:grid-cols-3">
              {sortedData?.map((product: ProductType, index: number): any => (
                <Card
                  key={index}
                  id={product.ID}
                  byImg={`https://mintyplex-api.onrender.com/api/v1/user/avatar/${accountData}`}
                  name={product.Name}
                  by={product.UserId}
                  image={`https://mintyplex-api.onrender.com/api/v1/product/cover/${product.ID}`}
                  discountedPrice={product.Discount}
                  price={product.Price}
                />
              ))}
            </div>
          )}
        </div>
        {editModal && (
          <>
            <div className="">
              <EditModal
                handleSuccessful={handleSuccessful}
                handleError={handleError}
                setEditModal={setEditModal}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
}
