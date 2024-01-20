import Image from "next/image";
import Link from "next/link";
import { TbLayoutGrid } from "react-icons/tb";
import { Card } from "~/components/customs/card";
import { PopularCard } from "~/components/customs/popular-card";
import { SeeAllFor } from "~/components/customs/see-all-for";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import creatorImg from "~/public/curator.png";
import monkey from "~/public/monkey-yellow-bg.jpeg";
import { TypographyH3 } from "~/utils/typography";
import { RenderCards } from "./_components/render-cards";
import { cn } from "~/lib/utils/utils";

const creators = {
  image: creatorImg,
  name: "0AHY21....342",
};

export default function Home() {
  return (
    <TooltipProvider>
      <section className="container p-3 mx-auto space-y-5">
        <TypographyH3 className="flex items-center gap-3">
          <div className={cn("p-1.5 rounded-md bg-cyan-200/20 text-cyan-500")}>
            <GemIcon />
          </div>
          <div>Top Creators</div>
        </TypographyH3>
        <div className="flex p-4 overflow-auto space-x-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <Tooltip key={i}>
              <TooltipTrigger asChild>
                <div className="flex flex-col items-center w-full max-w-40 gap-1">
                  <Image
                    width={82}
                    height={82}
                    className="rounded-full"
                    draggable={false}
                    alt="user image"
                    src={creators.image}
                  />
                  <div className="overflow-hidden text-xs max-w-20 whitespace-nowrap text-ellipsis">
                    {creators.name}
                  </div>
                </div>
              </TooltipTrigger>
              <TooltipContent align="center">
                <p>{creators.name}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
        <div className="space-y-12">
          <SeeAllFor
            tw="bg-mintyplex-primary/20"
            Icon={ThunderBolt}
            name="Trending Products"
            route="/popular-products?view=popular"
          />
          <div className="grid-cols-2 grid gap-3 xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3">
            <RenderCards />
          </div>
          <div className="flex items-center justify-center mt-4">
            <Link
              href="/popular-products"
              className="outline-none focus-within:outline-none group [background:linear-gradient(87.25deg,_#2063f2,_#a431ff_33.33%,_#a431ff_66.67%,_#ff73ae)] active:scale-95 transition-all duration-300 p-0.5 rounded-full overflow-hidden"
            >
              <div className="p-1.5 px-6 rounded-full hover:bg-opacity-0 group-focus-within:bg-opacity-0 bg-opacity-100 transition-all duration-300  bg-mintyplex-dark">
                View All
              </div>
            </Link>
          </div>
          <SeeAllFor
            Icon={TbLayoutGrid}
            tw="bg-[#FF73AE]/20 text-[#FF73AE]"
            name="Recent Listings"
            route="/popular-products?view=recent"
          />
          <div className="flex overflow-auto gap-3">
            {Array.from({ length: 10 }).map((_, index) => (
              <div key={index} className="shrink-0">
                <Card
                  asSmall
                  byImg={creatorImg}
                  name="Yatch Ape Club"
                  by="0x20..8"
                  image={monkey}
                  price="23"
                />
              </div>
            ))}
          </div>
          <SeeAllFor
            Icon={TbLayoutGrid}
            tw="bg-[#A431FF]/20 text-[#A431FF]"
            name="Popular Category"
            route="/new"
          />
          <Carousel className="">
            <CarouselContent>
              {Array.from({ length: 3 }).map((_, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <PopularCard index={index} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <div>
              <CarouselPrevious className="absolute -left-2" />
              <CarouselNext className="absolute -right-2" />
            </div>
          </Carousel>
        </div>
      </section>
    </TooltipProvider>
  );
}

function ThunderBolt() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="26"
      height="26"
      viewBox="0 0 26 26"
      fill="none"
    >
      <path
        d="M7.65421 11.5719L10.24 8.07335C11.9115 5.81188 12.7472 4.68115 13.5269 4.9201C14.3067 5.15904 14.3067 6.54589 14.3067 9.31957V9.5811C14.3067 10.5815 14.3067 11.0817 14.6263 11.3955L14.6432 11.4117C14.9698 11.7188 15.4904 11.7188 16.5316 11.7188C18.4053 11.7188 19.3422 11.7188 19.6588 12.2871C19.6641 12.2965 19.6692 12.306 19.6741 12.3156C19.973 12.8926 19.4305 13.6265 18.3456 15.0944L15.7598 18.5929C14.0883 20.8544 13.2526 21.9851 12.4729 21.7461C11.6931 21.5072 11.6932 20.1203 11.6932 17.3466L11.6932 17.0852C11.6932 16.0848 11.6932 15.5846 11.3736 15.2708L11.3567 15.2545C11.0301 14.9474 10.5095 14.9474 9.46827 14.9474C7.59455 14.9474 6.6577 14.9474 6.34107 14.3792C6.33583 14.3697 6.33073 14.3603 6.32578 14.3507C6.02689 13.7736 6.56933 13.0397 7.65421 11.5719Z"
        fill="#1E5BDD"
      />
    </svg>
  );
}

function GemIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 3h12l4 6-10 13L2 9Z" />
      <path d="M11 3 8 9l4 13 4-13-3-6" />
      <path d="M2 9h20" />
    </svg>
  );
}
