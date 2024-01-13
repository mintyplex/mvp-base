import Image, { StaticImageData } from "next/image";
import { TypographyP } from "~/utils/typography";
import { Button } from "../ui/button";
import { cn } from "~/lib/utils/utils";

type CardProps = {
  name: string;
  byImg: string | StaticImageData;
  by: string;
  image: string | StaticImageData;
  price: string;
  asSmall?: boolean;
};

export function Card({ name, by, image, price, byImg, asSmall }: CardProps) {
  return (
    <div
      className={cn(
        " mx-auto rounded-lg p-1.5 space-y-2 border border-mintyplex-border",
        asSmall ? "max-w-xs" : "max-w-sm"
      )}
    >
      <div className="overflow-hidden rounded-md">
        <Image
          alt={name}
          src={image}
          className="transition-all duration-300 hover:scale-105"
        />
      </div>
      <div className="pb-3 border-b space-y-2 border-mintyplex-border">
        <TypographyP className="text-sm">{name}</TypographyP>
        <div>
          <small className="flex items-center gap-2">
            by{" "}
            <Image
              placeholder="blur"
              height={20}
              width={20}
              className="object-cover rounded-full"
              src={byImg}
              alt={by}
            />
            <span>{by}</span>
          </small>
        </div>
      </div>
      <div className="">
        <small>Price</small>
        <div>
          <small className="text-transparent !bg-clip-text font-medium [background:linear-gradient(87.25deg,_#2063f2,_#a431ff_33.33%,_#a431ff_66.67%,_#ff73ae)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">
            $ {price}
          </small>
        </div>
        <Button
          asChild
          className="w-full active:scale-95 transition-all duration-300"
        >
          <button className="text-white bg-mintyplex-primary">Buy Now</button>
        </Button>
      </div>
    </div>
  );
}
