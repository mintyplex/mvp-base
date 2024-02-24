import {
  ArrowLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PlusIcon,
} from "@radix-ui/react-icons";
import Image from "next/image";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel";
import productImg from "~/public/top-creator.jpeg";
import { TypographyH2, TypographyH4 } from "~/utils/typography";
import BackButton from "../popular-products/_components/back-button";
import { Counter } from "./_components/counter";
import Link from "next/link";

const data = [
  {
    name: "DNA",
    title: "Human",
  },
  {
    name: "Eye Colour",
    title: "Blue",
  },
  {
    name: "Jewelry",
    title: "Blue",
  },
  {
    name: "Type",
    title: "Blue",
  },
  {
    name: "Clothing",
    title: "Blue",
  },
];

import React from "react";

type ProductPageProps = {
  params: { [key: string]: string };
  searchParams: { [key: string]: string };
};

export default function ProductDetailPage({ params }: ProductPageProps) {
  const productId = params.productId;

  return (
    <section className="container p-3 mx-auto space-y-3">
      <div className="flex items-center justify-between">
        <BackButton
          variant="outline"
          size="icon"
          className="border-mintyplex-border bg-none"
        >
          <ArrowLeftIcon />
        </BackButton>
        <Button variant="ghost" size="icon" className="w-10 h-10 p-1">
          <ShareIcon />
        </Button>
      </div>
      <div>
        <Carousel className="relative w-full max-w-5xl mx-auto">
          <CarouselNext className="z-30 text-black bg-white right-4">
            <ChevronRightIcon />
          </CarouselNext>
          <CarouselPrevious className="z-30 text-black bg-white left-4">
            <ChevronLeftIcon />
          </CarouselPrevious>
          <CarouselContent className="">
            {Array.from({ length: 3 }).map((_, index) => (
              <CarouselItem
                key={index}
                className="relative flex items-center justify-center w-full max-w-6xl mx-auto"
              >
                <div className="p-2 mx-auto w-fit">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute text-black bg-white rounded-full size-6 top-4 right-4"
                  >
                    <PlusIcon />
                  </Button>
                  <Image
                    src={productImg}
                    width={1280}
                    height={720}
                    alt="product image"
                    className="object-cover mx-auto rounded-md max-h-[45rem] bg-green-200"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
      <div>
        <TypographyH2 className="border-none">Yatch Ape Club</TypographyH2>
        <div className="flex items-center pt-3 gap-1">
          <span>by</span>
          <Image
            alt="By Creator"
            src={productImg}
            height={24}
            width={24}
            className="rounded-full"
          />
          <Link href={`/creator/${productId}`} className="underline">
            0x20...82
          </Link>
        </div>
      </div>
      <div className="">
        <span className="leading-7">
          The Bored Ape Yacht Club is a collection of 10,000 unique Bored Ape
          NFTs— unique digital collectibles living on the Ethereum blockchain.
          Your Bored Ape doubles as your Yacht Club membership card, and grants
          access to members-only benefits, the first of which is access to THE
          BATHROOM, a collaborative graffiti board. Future areas and perks can
          be unlocked by the community through roadmap activation.
        </span>
        <Button
          className="ml-2 transition-all duration-300"
          variant={"secondary"}
          size="sm"
        >
          See More
        </Button>
      </div>
      <div>
        <span className="mr-2 underline">Tags:</span>
        {["NFT", "Art", "Collectibles", "Crypto"].map((tag) => (
          <Badge
            key={tag}
            className="mr-2 text-white rounded-none bg-mintyplex-primary"
          >
            {tag}
          </Badge>
        ))}
      </div>
      <div className="border rounded-md divide-y border-mintyplex-border divide-mintyplex-border">
        {data.map((item) => (
          <div
            key={item.name}
            className="flex items-center justify-between p-3"
          >
            <div>{item.name}</div>
            <div>{item.title}</div>
          </div>
        ))}
      </div>
      <Counter />
      <div className="flex items-center justify-between">
        <div className="flex items-end gap-1">
          <TypographyH4 className="text-transparent !bg-clip-text font-medium [background:linear-gradient(87.25deg,_#2063f2,_#a431ff_33.33%,_#a431ff_66.67%,_#ff73ae)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">
            $ 23
          </TypographyH4>
          <div className="font-semibold">
            <s>$ 29</s>
          </div>
        </div>
        <Button className="text-white bg-mintyplex-primary">Buy Now</Button>
      </div>
    </section>
  );
}

function ShareIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19.25 16.625L24.5 11.375L19.25 6.125"
        stroke="#E9E9E9"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21 23.625H4.375C4.14294 23.625 3.92038 23.5328 3.75628 23.3687C3.59219 23.2046 3.5 22.9821 3.5 22.75V9.625"
        stroke="#E9E9E9"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.20312 19.25C8.787 16.9962 10.1027 15 11.9437 13.5747C13.7847 12.1494 16.0468 11.3757 18.375 11.375H24.5"
        stroke="#E9E9E9"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
