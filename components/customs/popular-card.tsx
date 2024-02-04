import { cn } from "~/lib/utils/utils";
import PhotoGraphy from "~/public/photography.png";
import Design from "~/public/canvas-stand.png";
import { TypographyH4 } from "~/utils/typography";
import { Button } from "../ui/button";
import Ipod from "~/public/ipod.png";
import EbookImg from "~/public/dotted-notebook.png";
import Image from "next/image";

type PopularCardProps = {
  asSmall?: boolean;
  mxAuto?: boolean;
  index: number;
};

const contentFor = [
  {
    title: "Photography",
    creators: "13k",
    product: "12k",
    icon: PhotoGraphy,
    sales: "$132,222k",
  },
  {
    title: "Design",
    creators: "13k",
    product: "12k",
    icon: Design,
    sales: "$132,222k",
  },
  {
    title: "Ebooks",
    creators: "13k",
    product: "12k",
    icon: EbookImg,
    sales: "$132,222k",
  },
  {
    title: "Arts",
    creators: "13k",
    product: "12k",
    icon: Ipod,
    sales: "$132,222k",
  },
];

export function PopularCard({ asSmall, mxAuto, index }: PopularCardProps) {
  const CardContent = contentFor[index];

  return (
    <div
      className={cn(
        "border border-mintyplex-border rounded-md p-2.5 space-y-4 w-full group",
        asSmall ? "max-w-sm" : "",
        mxAuto ? "mx-auto" : ""
      )}
    >
      <div className="bg-white rounded-md">
        <Image
          alt="Ipod"
          src={CardContent.icon}
          className="w-full max-h-72 group-hover:scale-105 transition-all duration-300"
        />
      </div>
      <div>
        <TypographyH4>{CardContent.title}</TypographyH4>
      </div>
      <div className="flex items-center justify-between gap-8">
        <div>
          <div className="text-sm font-light text-[#d6d6d6]">Creators:</div>
          <div>{CardContent.creators}</div>
        </div>
        <div>
          <div className="text-sm font-light text-[#d6d6d6]">Product:</div>
          <div>{CardContent.product}</div>
        </div>
        <div>
          <div className="text-sm font-light text-[#d6d6d6]">Sales:</div>
          <div>{CardContent.sales}</div>
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
