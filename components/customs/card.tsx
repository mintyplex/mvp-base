import Image, { StaticImageData } from "next/image";
import { cn, truncateString, truncateXionAddress } from "~/lib/utils/utils";
import { TypographyP } from "~/utils/typography";
import { Button } from "../ui/button";
import Link from "next/link";
import { PlusIcon } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useEffect, useState } from "react";

type CardProps = {
  name: string;
  byImg: string | StaticImageData;
  by: string;
  image: StaticImageData | string;
  price: number;
  asSmall?: boolean;
  id: string;
  discountedPrice?: number | string;
  discount?: number;
};

type Product = {
  Name: string;
  CoverImage: StaticImageData | string;
  Price: number;
  ID: string;
  id: string;
  Discount?: number | string | undefined;
  UserId: string;
};

export function Card({
  name,
  by,
  image,
  price,
  byImg,
  asSmall,
  id,
  discount,
  discountedPrice,
}: CardProps) {
  // const TEN_PERCENT_OF_HEIGHT = image.height - image.height * 0.1;
  // const TEN_PERCENT_OF_WIDTH = image.width - image.width * 0.1;

  const [hidButton, setHidButton] = useState(false);

  const { addToCart } = useCart();


  const product: Product = {
    Name: name,
    CoverImage: image,
    Price: price,
    ID: id,
    id: id,
    Discount: discount,
    UserId: by,
  };

  const handleAddToCart = () => {
    addToCart(product, 1);
  };

  useEffect(() => {
    if (window.location.pathname === "/profile") {
      setHidButton(true);
    }
  }, []);

  return (
    <div
      className={cn(
        " mx-auto rounded-lg p-1.5 space-y-2 border border-mintyplex-border max-w-md w-full flex flex-col justify-between",
        asSmall ? "max-w-xs" : "max-w-sm"
      )}
    >
      <Link href={`/${id}`} className="space-y-2">
        <div className="overflow-hidden rounded-md">
          <Image
            alt={name}
            height={200}
            width={200}
            src={image}
            className="transition-all duration-300 hover:scale-105"
            style={{
              height: "200px",
              width: "100%",
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
        </div>
        <div className="pb-3 border-b space-y-2 border-mintyplex-border">
          <TypographyP className="text-sm">
            {truncateString(name, 46)}
          </TypographyP>
          <div>
            <small className="flex items-center gap-2">
              by{" "}
              <Image
                height={20}
                width={20}
                className="h-[20px] object-cover rounded-full"
                src={byImg}
                alt={by}
              />
              <Link href={`/creator/${by}`} className="underline">
                {truncateXionAddress(by)}
              </Link>
            </small>
          </div>
        </div>
      </Link>
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

        {hidButton ? null : (
          <div className="flex gap-3">
            <Button
              asChild
              className="w-full active:scale-95 transition-all duration-300 bg-mintyplex-primary"
            >
              <p className="text-white bg-mintyplex-primary">Buy Now</p>
            </Button>
            <Button
              className="text-white px-2 bg-!none border border-mintyplex-border"
              onClick={handleAddToCart}
            >
              <PlusIcon />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
