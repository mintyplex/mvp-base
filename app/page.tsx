import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import topCreator from "~/public/top-creator.jpeg";
import { TypographyH3 } from "~/utils/typography";

const creators = {
  image: topCreator,
  name: "Yacth Ape Club",
};

export default function Home() {
  return (
    <TooltipProvider>
      <section className="container p-3 mx-auto">
        <TypographyH3>Top Creators</TypographyH3>
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
      </section>
    </TooltipProvider>
  );
}
