import { cn } from "~/lib/utils/utils";
import { PhotoGraphy } from "~/utils/icons/photography";
import { TypographyH4 } from "~/utils/typography";
import { Button } from "../ui/button";
import { MakingArt } from "~/utils/icons/making-art";
import { BooksIcon } from "~/utils/icons/books";

type PopularCardProps = {
  asSmall?: boolean;
  mxAuto?: boolean;
  index: number;
};

export function PopularCard({ asSmall, mxAuto, index }: PopularCardProps) {
  const displayIcons = [MakingArt, BooksIcon, PhotoGraphy];
  const Icon = displayIcons[index];

  return (
    <div
      className={cn(
        "border border-mintyplex-border rounded-md p-2.5 space-y-4 w-full group",
        asSmall ? "max-w-sm" : "",
        mxAuto ? "mx-auto" : ""
      )}
    >
      <div className="overflow-hidden bg-white rounded-md">
        <Icon className="w-full max-h-96 group-hover:scale-105 transition-all duration-300" />
      </div>
      <div>
        <TypographyH4>Design</TypographyH4>
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
