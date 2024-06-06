"use client";

import React, { useEffect, useState } from "react";
import Image, { StaticImageData } from "next/image";
import curatorImage from "~/public/curator-bg.png";
import { FaChevronUp, FaChevronDown, FaSearch } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import creatorImg from "~/public/curator.png";
import topCreator from "~/public/top-creator.jpeg";
import { TypographyH3 } from "~/utils/typography";
import { BsArrowLeft } from "react-icons/bs";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import Search from "~/components/ui/Search";
import SortIcon from "~/components/ui/SortIcon";
import { GoCopy } from "react-icons/go";
import { copyToClipboard } from "~/utils/copyToClipboard";
import { toast, useToast } from "~/components/ui/use-toast";
import { truncate } from "~/utils/truncate";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Card } from "~/components/customs/card";
import { createPriceWithDiscount } from "~/lib/utils/utils";

interface ProductType {
  ID: string;
  Name: string;
  UserId: string;
  Discount?: any; // Optional property
  Price: any;
  CoverImage: any;
}

export default function Curator() {
  const [showFilter, setShowFilter] = useState(false);
  const queryClient = useQueryClient();

  const searchParams = useParams();
  const creatorAddress = searchParams.id as string;

  async function getCuratorData() {
    const response = await fetch(
      `https://mintyplex-api.onrender.com/api/v1/user/profile/${creatorAddress}`
    );

    if (response.ok) {
      const data = await response.json();
      return data as CreatorFromApi;
    }

    throw new Error("Failed to fetch creator");
  }
  const {
    data: data,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [creatorAddress],
    queryFn: getCuratorData,
    retry: 2,
    refetchOnMount: true,
    keepPreviousData: false,
  });

  useEffect(() => {
    return () => {
      queryClient.invalidateQueries({ queryKey: [creatorAddress] });
    };
  }, []);

  const CuratorData = data?.user;
  const CuratorProducts = CuratorData?.products;
  const creatorAvatar = CuratorData?.avatar;
  const userURL = `${CuratorData?.x_link}`;

  const back = () => {
    window.history.back();
  };

  const handleCopy = (text: string | null) => {
    toast({
      description: "Creators address copied.",
    });
  };

  const sortedData = CuratorProducts?.slice().sort((a: any, b: any) => {
    const timestampA = new Date(a.CreatedAt).getTime();
    const timestampB = new Date(b.CreatedAt).getTime();

    return timestampB - timestampA;
  });

  return (
    <>
      <section className="container relative p-3 mx-auto mt-6 space-y-6">
        <div
          className="p-2 border border-mintyplex-border w-fit rounded-[8px] cursor-pointer"
          onClick={() => back()}
        >
          <BsArrowLeft size={20} />
        </div>
        {isError && (
          <div className="w-full h-[50vh] flex items-center justify-center">
            <div className="modal-content flex flex-col items-center gap-2">
              <div className="loading-spinner">
                <div className="spinner"></div>
              </div>
              <p>Error fetching data</p>
            </div>
          </div>
        )}
        {isLoading && (
          <div className="w-full h-[50vh] flex items-center justify-center">
            <div className="modal-content flex flex-col items-center gap-2">
              <div className="loading-spinner">
                <div className="spinner"></div>
              </div>
            </div>
          </div>
        )}
        {CuratorData && (
          <>
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
              <div className="relative md:mt-[-70px] mt-[-50px] z-[1] flex justify-center w-full">
                <div className="flex flex-col items-center gap-4">
                  <Image
                    width={150}
                    height={150}
                    className="hidden md:block rounded-full border-[9px] border-mintyplex-dark"
                    draggable={false}
                    alt=""
                    src={creatorAvatar as string}
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
                    src={creatorAvatar as string}
                    style={{
                      height: "100px",
                      objectFit: "cover",
                      objectPosition: "top",
                    }}
                  />
                  <div className="flex items-center gap-2">
                    <TypographyH3>
                      {truncate(CuratorData?.wallet_address ?? null)}
                    </TypographyH3>
                    <div
                      className="cursor-pointer"
                      onClick={() =>
                        copyToClipboard(
                          `${CuratorData?.wallet_address}`,
                          handleCopy
                        )
                      }
                    >
                      <GoCopy />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full grid place-items-center">
              <p className="max-w-[630px] text-center font-[300]">
                {CuratorData?.bio}
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
              {CuratorProducts?.length === 0 ? (
                <div className="h-[30vh] flex w-[100%] items-center justify-center">
                  <p>No Items yet</p>
                </div>
              ) : (
                <div className="grid-cols-2 grid gap-4 xl:grid-cols-5 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3">
                  {sortedData?.map(
                    (product: ProductType, index: number): any => (
                      <Card
                        key={index}
                        id={product.ID}
                        byImg={``}
                        name={product.Name}
                        by={product.UserId}
                        image={product.CoverImage}
                        discountedPrice={createPriceWithDiscount(
                          product.Price,
                          product.Discount
                        )}
                        price={product.Price}
                      />
                    )
                  )}
                </div>
              )}
              {/* <div className="flex items-center justify-center mt-4">
            <Button
              className="mx-auto text-white border rounded-full linear-gradient"
              variant="ghost"
            >
              View All
            </Button>
          </div> */}
            </div>
          </>
        )}
      </section>
    </>
  );
}
