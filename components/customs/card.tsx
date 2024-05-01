import Image, { StaticImageData } from "next/image";
import { cn } from "~/lib/utils/utils";
import { TypographyP } from "~/utils/typography";
import { Button } from "../ui/button";
import Link from "next/link";

type CardProps = {
  name: string;
  byImg: string | StaticImageData;
  by: string;
  image: StaticImageData;
  price: string;
  asSmall?: boolean;
  id: string;
  discountedPrice?: string;
};

export function Card({
  name,
  by,
  image,
  price,
  byImg,
  asSmall,
  id,
  discountedPrice,
}: CardProps) {
  const TEN_PERCENT_OF_HEIGHT = image.height - image.height * 0.1;
  const TEN_PERCENT_OF_WIDTH = image.width - image.width * 0.1;

  return (
    <div
      className={cn(
        " mx-auto rounded-lg p-1.5 space-y-2 border border-mintyplex-border max-w-md w-full",
        asSmall ? "max-w-xs" : "max-w-sm"
      )}
    >
      <Link href={id} className="space-y-2">
        <div className="overflow-hidden rounded-md">
          <Image
            alt={name}
            height={TEN_PERCENT_OF_HEIGHT}
            width={TEN_PERCENT_OF_WIDTH}
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
                height={20}
                width={20}
                className="object-cover rounded-full"
                src={byImg}
                alt={by}
              />
              <Link href={`/creator/${id}`} className="underline">
                {by}
              </Link>
            </small>
          </div>
        </div>
        <div className="">
          <small>Price</small>
          {discountedPrice ? (
            <div className="relative">
              <small className="text-transparent !bg-clip-text font-bold md:text-2xl  [background:linear-gradient(87.25deg,_#2063f2,_#a431ff_33.33%,_#a431ff_66.67%,_#ff73ae)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">
                <s>$ {discountedPrice}</s>
              </small>
              <sup className="pl-1 -top-3">
                <s className="text-muted-foreground">{price}</s>
              </sup>
            </div>
          ) : (
            <div>
              <small className="text-transparent !bg-clip-text font-bold md:text-2xl  [background:linear-gradient(87.25deg,_#2063f2,_#a431ff_33.33%,_#a431ff_66.67%,_#ff73ae)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">
                <s>$ {price}</s>
              </small>
            </div>
          )}

          <Button
            asChild
            className="w-full active:scale-95 transition-all duration-300 bg-mintyplex-primary"
          >
            <button className="text-white bg-mintyplex-primary">Buy Now</button>
          </Button>
        </div>
      </Link>
    </div>
  );
}
