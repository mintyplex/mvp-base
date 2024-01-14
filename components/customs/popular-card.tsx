import Image from "next/image";
import monkey from "~/public/monkey-yellow-bg.jpeg";
import { TypographyH4, TypographyP } from "~/utils/typography";
import { Button } from "../ui/button";

export function PopularCard() {
  return (
    <div className="mx-auto border border-mintyplex-border rounded-md p-2.5 space-y-4 w-full max-w-sm">
      <div className="overflow-hidden rounded-md">
        <Image
          alt="Monkey "
          className="hover:scale-105 transition-all duration-300"
          src={monkey}
        />
      </div>
      <div>
        <TypographyH4>Design</TypographyH4>
      </div>
      <div>
        <TypographyP className="text-sm font-light">
          A collection of 3333 unique, randomly generated pixel art ape NFTs
          stored on the CORE blockchain.
        </TypographyP>
      </div>
      <div className="flex items-center gap-8">
        <div>
          <div className="text-sm font-light text-[#d6d6d6]">Creators:</div>
          <div>13k</div>
        </div>
        <div>
          <div className="text-sm font-light text-[#d6d6d6]">Product:</div>
          <div>12k</div>
        </div>
        <div>
          <div className="text-sm font-light text-[#d6d6d6]">Sales:</div>
          <div>$132,222k</div>
        </div>
      </div>
      <div>
        <Button
          className="w-full bg-mintyplex-primary transition-all duration-300"
          asChild
        >
          <button className="text-white bg-mintyplex-primary">
            View Category
          </button>
        </Button>
      </div>
    </div>
  );
}
