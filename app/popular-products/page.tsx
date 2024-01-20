import { Card } from "~/components/customs/card";
import { ScrollArea, ScrollBar } from "~/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { cn } from "~/lib/utils/utils";
import topCreator from "~/public/top-creator.jpeg";
import { TypographyH1, TypographyP } from "~/utils/typography";

const tabs = [
  {
    name: "All",
    slug: "all",
    Component: () => <All title="All Products" />,
  },
  {
    name: "Popular",
    slug: "popular",
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
    Component: () => <div>Profile</div>,
  },
  {
    name: "Ebooks",
    slug: "ebooks",
    Component: () => <div>Profile</div>,
  },
  {
    name: "Photography",
    slug: "photography",
    Component: () => <div>Profile</div>,
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
        <TypographyP className={cn("text-[#d6d6d6]")}>Popular tags</TypographyP>
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
      <div className="grid-cols-2 grid gap-3 xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3">
        {Array.from({ length: 20 }).map((_, index) => (
          <div key={index} className="shrink-0">
            <Card
              asSmall
              byImg={topCreator}
              name="Yatch Ape Club"
              by="0x20..8"
              image={topCreator}
              price="23"
            />
          </div>
        ))}
      </div>
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
