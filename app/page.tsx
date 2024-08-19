"use client";

import { Crown } from "lucide-react";
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
import { cn, truncateXionAddress } from "~/lib/utils/utils";
import creatorImg from "~/public/curator.png";
import monkey from "~/public/monkey-yellow-bg.jpeg";
import { TypographyH3 } from "~/utils/typography";
import { useAccount } from "~/components/context/AccountContext";
import { TrendingProducts } from "./_components/trending-products";
import { useQuery } from "@tanstack/react-query";
import { RecentListing } from "./_components/recent-listing";

export default function Home() {
  const { accountData } = useAccount();
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  

  async function getUsers() {
    const response = await fetch(
      `${API_URL}/user/users`
    );

    if (response.ok) {
      const data = await response.json();
      return data as UsersApi;
    }

    throw new Error("Failed to fetch products");
  }

  const { data: users, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  return (
    <TooltipProvider>
      <section className="container p-3 mx-auto space-y-5 mt-5">
        <TypographyH3 className="flex items-center gap-3">
          <div
            className={cn("p-1.5 rounded-md bg-amber-200/20 text-amber-500")}
          >
            <Crown className="fill-amber-500" />
          </div>
          <div>Top Creators</div>
        </TypographyH3>
        {isLoading ? (
          <div className="flex items-center justify-center min-h-40">
            <div className="loader" />
          </div>
        ) : (
          <div className="flex py-4 overflow-auto space-x-4 gap-2">
            {users?.data
              ?.sort(
                (a, b) =>
                  (b?.products?.length ?? 0) - (a?.products?.length ?? 0)
              )
              .slice(0, 10)
              .map((user, i) => (
                <Tooltip key={i}>
                  <TooltipTrigger asChild>
                    <div className="flex flex-col items-center max-w-40 gap-1">
                      <Link
                        href={`/creator/${user?.userProfile?.WalletAddress}`}
                      >
                        <Image
                          width={82}
                          height={82}
                          className="bg-green min-w-[82px] rounded-full"
                          draggable={false}
                          alt="user image"
                          src={
                            user?.userProfile?.Avatar
                              ? `${user?.userProfile?.Avatar}`
                              : creatorImg
                          }
                          style={{
                            height: "82px",
                            width: "82px",
                            objectFit: "cover",
                            objectPosition: "center",
                          }}
                        />
                        <div className="overflow-hidden text-xs max-w-20 whitespace-nowrap text-ellipsis">
                          {truncateXionAddress(
                            user?.userProfile?.WalletAddress
                          )}
                        </div>
                      </Link>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent align="center">
                    <p>{user?.userProfile?.WalletAddress}</p>
                  </TooltipContent>
                </Tooltip>
              ))}

            {users?.data === null && (
              <div className="h-[10vh] flex w-full items-center justify-center">
                <p>No users yet</p>{" "}
              </div>
            )}
          </div>
        )}
        <div className="space-y-12">
          <SeeAllFor
            tw="bg-mintyplex-primary/20"
            Icon={ThunderBolt}
            name="Trending Products"
            route="/popular-products?view=popular"
          />
          <TrendingProducts />
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
          <RecentListing />
          <SeeAllFor
            Icon={TbLayoutGrid}
            tw="bg-[#A431FF]/20 text-[#A431FF]"
            name="Popular Categories"
            route="/new"
            hideSeeAll
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
