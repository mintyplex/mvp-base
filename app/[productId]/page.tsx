import {
  ArrowLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PlusIcon,
} from "@radix-ui/react-icons";
import Image from "next/image";
import TwitterIcon from "~/components/ui/TwitterIcon";
import { Button } from "~/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel";
import productImg from "~/public/top-creator.jpeg";
import BackButton from "../popular-products/_components/back-button";

export default function ProductDetailPage() {
  return (
    <section className="container p-3 mx-auto space-y-3">
      <BackButton
        variant="outline"
        size="icon"
        className="border-input bg-white/0"
      >
        <ArrowLeftIcon />
      </BackButton>
      <div>
        <Carousel>
          <CarouselContent>
            <CarouselItem className="">
              <div className="relative mx-auto w-fit">
                <CarouselNext className="text-black bg-white right-4">
                  <ChevronRightIcon />
                </CarouselNext>
                <CarouselPrevious className="text-black bg-white left-4">
                  <ChevronLeftIcon />
                </CarouselPrevious>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute w-6 h-6 text-black bg-white rounded-full top-3 right-3"
                >
                  <PlusIcon />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute w-6 h-6 text-black bg-black rounded-full bottom-3 right-3"
                >
                  <TwitterIcon />
                </Button>
                <Image
                  src={productImg}
                  width={1280}
                  height={720}
                  alt="product image"
                  className="object-cover mx-auto rounded-md max-h-[45rem]"
                />
              </div>
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
