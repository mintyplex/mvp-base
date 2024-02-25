import { cn } from "~/lib/utils/utils";
import PhotoGraphy from "~/public/photography.png";
import Design from "~/public/canvas-stand.png";
import { TypographyH4 } from "~/utils/typography";
import { Button } from "../ui/button";
import Ipod from "~/public/ipod.png";
import EbookImg from "~/public/dotted-notebook.png";
import Image from "next/image";
import ebook from "~/public/ebook.svg";
import design from "~/public/art.svg";
import art from "~/public/art.svg";
import photography from "~/public/photography.svg";

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
    icon: photography,
    sales: "$132,222k",
  },
  {
    title: "Design",
    creators: "13k",
    product: "12k",
    icon: design,
    sales: "$132,222k",
  },
  {
    title: "Ebooks",
    creators: "13k",
    product: "12k",
    icon: ebook,
    sales: "$132,222k",
  },
  {
    title: "Arts",
    creators: "13k",
    product: "12k",
    icon: art,
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
      <div className="overflow-hidden rounded-md">
        <Image
          alt={CardContent.title}
          src={CardContent.icon}
          className="w-full group-hover:scale-105 transition-all duration-300 bg-mintyplex-primary"
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
