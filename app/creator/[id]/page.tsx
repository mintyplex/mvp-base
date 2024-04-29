"use client";

import React, { useEffect, useState } from "react";
import topCreator from "~/public/top-creator.jpeg";
import Creator from "~/public/curator.png";
import Image, { StaticImageData } from "next/image";
import { Button } from "~/components/ui/button";
import curatorImage from "~/public/curator-bg.png";
import curatorImageMobile from "~/public/mobile-creator-bg.png";
import { FaChevronUp, FaChevronDown, FaSearch } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { TbSettings } from "react-icons/tb";
import { TypographyH3 } from "~/utils/typography";
import { Card } from "~/components/customs/card";
import { BsArrowLeft } from "react-icons/bs";
import EditModal from "~/components/customs/modal";
import {
  Select,
  SelectContent,
  SelectLabel,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import Search from "~/components/ui/Search";
import SortIcon from "~/components/ui/SortIcon";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { GoCopy } from "react-icons/go";
import { copyToClipboard } from "~/utils/copyToClipboard";
import { toast, useToast } from "~/components/ui/use-toast";
import { useAccount } from "~/components/context/AccountContext";
import { truncate } from "~/utils/truncate";
import LoadingModal from "~/components/ui/LoadingModal";
import useFetchUserData from "~/hooks/useFetchData";
import Link from "next/link";
import axios from "axios";

export default function Curator() {
  const [showFilter, setShowFilter] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const { accountData, isLoggedIn, userAvatar } = useAccount();

  const { userData } = useFetchUserData({ isLoggedIn, accountData });

  const userURL = `${userData?.x_link}`;

  const back = () => {
    window.history.back();
  };
  const { toast } = useToast();

  const handleSuccessful = () => {
    toast({
      description: "Profile updated.",
    });
  };

  const handleCopy = (text: string | null) => {
    toast({
      description: "Creators address copied.",
    });
  };
  return (
    <>
      <section className="container relative p-3 mx-auto mt-6 space-y-6">
        <div
          className="p-2 border border-mintyplex-border w-fit rounded-[8px] cursor-pointer"
          onClick={() => back()}
        >
          <BsArrowLeft size={20} />
        </div>
        <div className="relative w-full">
          <div className="flex w-full h-fit min-h-[150px] md:min-h-fit rounded-[24px] relative overflow-hidden">
            <Image
              height={600}
              draggable={false}
              alt="Curator bg"
              src={curatorImage}
              className="hidden object-cover object-center md:block"
            />
            <Image
              height={600}
              draggable={false}
              alt="Curator bg"
              src={curatorImage}
              width={600}
              className="block object-cover object-center md:hidden"
            />
            <div className="absolute bottom-0 right-0 mb-4 mr-4 md:mr-6 md:mb-6 z-[11]">
              <Link target="_blank" href={userURL}>
                <div className="p-3 rounded-full bg-mintyplex-dark cursor-pointer ">
                  <FaXTwitter />
                </div>
              </Link>
            </div>
          </div>
          <div className="absolute top-[71%] md:top-[75%] right-0 z-[11]">
            <div
              className="flex gap-2 text-[10px] md:text-[16px] cursor-pointer justify-center items-center p-[8px] w-[100px] md:w-[125px] rounded-[8px] border border-[#313233]"
              onClick={() => setEditModal(true)}
            >
              <TbSettings size={24} />
              <p>Edit Bio</p>
            </div>
          </div>
          <div className="relative md:mt-[-70px] mt-[-50px] z-[1] flex justify-center w-full">
            <div className="flex flex-col items-center gap-4">
              <Image
                width={150}
                height={150}
                className="hidden md:block rounded-full border-[9px] border-mintyplex-dark"
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
                className="md:hidden rounded-full border-[6px] border-mintyplex-dark"
                draggable={false}
                alt="user image"
                src={userAvatar}
                style={{
                  height: "150px",
                  objectFit: "cover",
                  objectPosition: "top",
                }}
              />
              <div className="flex items-center gap-2">
                <TypographyH3>{truncate(accountData)}</TypographyH3>
                <div
                  className="cursor-pointer"
                  onClick={() => copyToClipboard(`${accountData}`, handleCopy)}
                >
                  <GoCopy />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full grid place-items-center">
          <p className="max-w-[630px] text-center font-[300]">
            {userData?.bio}
          </p>
        </div>
        <div className="flex flex-col-reverse w-full md:flex-row gap-6">
          <div className="w-full md:w-[300px] flex flex-col gap-4">
            <Select>
              <SelectTrigger className="w-full !bg-[#2063F2] border-none py-[12px]">
                <div className="flex items-center gap-3">
                  <SortIcon />
                  <SelectValue placeholder="Sort by" />
                  {showFilter && (
                    <>
                      <div className="w-full bg-brand11 flex items-center p-4 rounded-[8px] justify-between">
                        <p>Attributes</p>
                        <FaChevronDown />
                      </div>
                    </>
                  )}
                </div>
              </SelectTrigger>
              <SelectContent className="!bg-[#313233] border-none">
                <SelectGroup>
                  <SelectItem value="Price: Low to High">
                    Price: Low to High
                  </SelectItem>
                  <SelectItem value="Price: High to Low">
                    Price: High to Low
                  </SelectItem>
                  <SelectItem value="Rarity: Rare to Common">
                    Rarity: Rare to Common
                  </SelectItem>
                  <SelectItem value="Rarity: Common to Rare">
                    Rarity: Common to Rare
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="items-center w-full px-3 mx-auto overflow-hidden border border-white rounded-[8px] flex gap-3 focus-within:border-brand1 transition-all duration-300">
            <Search />
            <input
              type="search"
              name="search"
              className="w-full py-3 text-sm bg-transparent outline-none bg-opacity-0 focus:outline-none"
              placeholder="Search product"
            />
          </div>
        </div>
        <div className="space-y-6">
          {/* <div className="grid-cols-2 grid gap-3 xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3">
            {Array.from({ length: 16 }).map((_, index) => (
              <Card
                id={index.toString()}
                byImg={topCreator}
                name="Yatch Ape Club"
                by="0x20..8"
                image={topCreator}
                price="23"
                key={index}
              />
            ))}
          </div> */}
          <div className="h-[30vh] flex w-[100%] items-center justify-center">
            <p>No Items yet</p>
          </div>
          {/* <div className="flex items-center justify-center mt-4">
            <Button
              className="mx-auto text-white border rounded-full linear-gradient"
              variant="ghost"
            >
              View All
            </Button>
          </div> */}
        </div>
        {editModal && (
          <>
            <div className="">
              <EditModal
                handleSuccessful={handleSuccessful}
                setEditModal={setEditModal}
              />
            </div>
          </>
        )}
      </section>
    </>
  );
}
