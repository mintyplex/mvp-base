import {
  ArrowLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PlusIcon,
} from "@radix-ui/react-icons";
import Image from "next/image";
import TwitterIcon from "~/components/ui/TwitterIcon";
import { Button } from "~/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel";
import productImg from "~/public/top-creator.jpeg";
import BackButton from "../popular-products/_components/back-button";
import { TypographyH2, TypographyH4, TypographyP } from "~/utils/typography";
import { Badge } from "~/components/ui/badge";
import { Counter } from "./_components/counter";

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

export default function ProductDetailPage() {
  return (
    <section className="container p-3 mx-auto space-y-3">
      <BackButton
        variant="outline"
        size="icon"
        className="border-input bg-white/0"
      >
        <ArrowLeftIcon />
      </BackButton>
      <div>
        <Carousel>
          <CarouselContent>
            <CarouselItem className="">
              <div className="relative mx-auto w-fit">
                <CarouselNext className="text-black bg-white right-4">
                  <ChevronRightIcon />
                </CarouselNext>
                <CarouselPrevious className="text-black bg-white left-4">
                  <ChevronLeftIcon />
                </CarouselPrevious>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute w-6 h-6 text-black bg-white rounded-full top-3 right-3"
                >
                  <PlusIcon />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute w-6 h-6 text-black bg-black rounded-full bottom-3 right-3"
                >
                  <TwitterIcon />
                </Button>
                <Image
                  src={productImg}
                  width={1280}
                  height={720}
                  alt="product image"
                  className="object-cover mx-auto rounded-md max-h-[45rem]"
                />
              </div>
            </CarouselItem>
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
          <span className="underline">0x20...82</span>
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
