"use client";

import React, { useState } from "react";
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

export default function Curator() {
  const [showFilter, setShowFilter] = useState(false);
  const [editModal, setEditModal] = useState(false);

  return (
    <>
      <section className="container relative p-3 mx-auto space-y-6 mt-6">
        <div className="p-2 border border-mintyplex-border w-fit rounded-[8px]">
          <BsArrowLeft size={20} />
        </div>
        <div className="w-full relative">
          <div className="flex w-full h-fit min-h-[150px] md:min-h-fit rounded-[24px] relative overflow-hidden">
            <Image
              height={600}
              draggable={false}
              alt="Curator bg"
              src={curatorImage}
              objectFit="cover"
              objectPosition="center"
              className='hidden md:block'
            />
            <Image
              height={600}
              draggable={false}
              alt="Curator bg"
              src={curatorImageMobile}
              objectFit="cover"
              objectPosition="center"
              className='block md:hidden'
            />
            <div className="absolute bottom-0 right-0 mr-4 md:mr-6 mb-4 md:mb-6">
              <div className="rounded-full bg-mintyplex-dark p-3">
                <FaXTwitter />
              </div>
            </div>
          </div>
          <div className="absolute top-[67%] md:top-[75%] right-0 z-[111]">
            <div className="flex gap-2 text-[10px] md:text-[16px] cursor-pointer justify-center items-center p-[8px] w-[100px] md:w-[125px] rounded-[8px] border border-[#313233]" onClick={() => setEditModal(true)}>
              <TbSettings size={24} />
              <p>Edit Bio</p>
            </div>
          </div>
          <div className="relative md:mt-[-70px] mt-[-50px] z-[1] flex justify-center w-full">
            <div className="flex flex-col gap-4 items-center">
              <Image
                width={150}
                height={150}
                className="hidden md:block rounded-full border-[9px] border-mintyplex-dark"
                draggable={false}
                alt="user image"
                src={Creator}
              />
              <Image
                width={100}
                height={100}
                className="md:hidden rounded-full border-[6px] border-mintyplex-dark"
                draggable={false}
                alt="user image"
                src={Creator}
              />
              <TypographyH3>0AHY21....342</TypographyH3>
            </div>
          </div>
        </div>
        <div className="w-full grid place-items-center">
          <p className="max-w-[1000px] text-center font-[300]">
            The Bored Ape Yacht Club is a collection of 10,000 unique Bored Ape
            NFTs— unique digital collectibles living on the Ethereum blockchain.
          </p>
        </div>
        <div className="flex flex-col-reverse md:flex-row w-full gap-6">
          <div className="w-full md:w-[300px] flex flex-col gap-4">
            <div onClick={() => { showFilter ? setShowFilter(false) : setShowFilter(true); }} className="w-full cursor-pointer bg-primary flex items-center px-4 py-3 rounded-[8px] justify-between" >
              <p>Sort</p>
              {showFilter ? <FaChevronUp /> : <FaChevronDown />}
            </div>
            {showFilter && (
              <>
                <div className="w-full bg-brand11 flex items-center p-4 rounded-[8px] justify-between">
                  <p>Attributes</p>
                  <FaChevronDown />
                </div>
                <div className="w-full bg-brand11 flex items-center p-4 rounded-[8px] justify-between">
                  <p>Search by ID</p>
                  <FaChevronDown />
                </div>
              </>
            )}
          </div>
          <div className="items-center w-full px-3 mx-auto overflow-hidden border border-white rounded-[8px] flex gap-3 focus-within:border-brand1 transition-all duration-300">
            <FaSearch />
            <input
              type="search"
              name="search"
              className="w-full py-3 text-sm outline-none bg-opacity-0 bg-transparent focus:outline-none"
              placeholder="Search product"
            />
          </div>
        </div>
        <div className="space-y-6">
          <div className="grid-cols-2 grid gap-3 xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3">
            {Array.from({ length: 16 }).map((_, index) => (
              <Card
                byImg={topCreator}
                name="Yatch Ape Club"
                by="0x20..8"
                image={topCreator}
                price="23"
                key={index}
              />
            ))}
          </div>
          <div className="flex items-center justify-center mt-4">
            <Button
              className="mx-auto text-white border rounded-full linear-gradient"
              variant="ghost"
            >
              View All
            </Button>
          </div>
        </div>
        {
          editModal && (
            <>
              <div className=" ">
                <EditModal setEditModal={setEditModal} />
              </div>
            </>
          )
        }
      </section>
    </>
  );
}
