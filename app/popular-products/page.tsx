import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { Card } from "~/components/customs/card";
import creatorImg from "~/public/curator.png";
import { ScrollArea, ScrollBar } from "~/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import topCreator from "~/public/top-creator.jpeg";
import { TypographyH1 } from "~/utils/typography";
import BackButton from "./_components/back-button";
import { TrendingProducts } from "../_components/trending-products";

const tabs = [
  {
    name: "All",
    slug: "all",
    Component: () => <All title="All Products" />,
  },
  {
    name: "Trending",
    slug: "trending",
    Component: () => <All title="Popular Products" />,
  },
  {
    name: "Recents",
    slug: "recent",
    Component: () => <All title="Recent listing" />,
  },
  {
    name: "Arts (3)",
    slug: "art",
    Component: () => <All title="Arts" />,
  },
  {
    name: "Ebooks",
    slug: "ebooks",
    Component: () => <All title="Ebooks" />,
  },
  {
    name: "Photography",
    slug: "photography",
    Component: () => <All title="Photography" />,
  },
];

export default function Popular({
  searchParams,
}: {
  searchParams: { view?: string };
}) {
  const tabByLink =
    tabs.find((tab) => tab.slug === searchParams.view)?.slug ?? "all";

  return (
    <section className="container p-3 mx-auto">
      <div className="space-y-3">
        <BackButton
          variant="ghost"
          size="icon"
          className="!border border-input"
        >
          <ArrowLeftIcon />
        </BackButton>
        <Tabs defaultValue={tabByLink}>
          <ScrollArea>
            <TabsList className="h-14 px-3 gap-3  justify-start w-full bg-[#2c2d2e]">
              {tabs.map((tab, index) => (
                <TabsTrigger key={index} value={tab.slug}>
                  {tab.name}
                </TabsTrigger>
              ))}
            </TabsList>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
          {tabs.map((tab, index) => (
            <TabsContent key={index} value={tab.slug}>
              <tab.Component />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}

function All({ title = "All" }: { title?: string }) {
  return (
    <div className="mt-10 space-y-3">
      <div className="flex items-center justify-center">
        <PopularProductsText text={title} />
      </div>
      <TrendingProducts shouldNotBe12 />
    </div>
  );
}

function PopularProductsText({ text }: { text: string }) {
  return (
    <TypographyH1 className="font-semibold text-transparent !bg-clip-text [background:linear-gradient(87.25deg,_#2063f2,_#a431ff_33.33%,_#a431ff_66.67%,_#ff73ae)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] text-center">
      {text}
    </TypographyH1>
  );
}
