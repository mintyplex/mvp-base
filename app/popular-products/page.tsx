import { Card } from "~/components/customs/card";
import { ScrollArea, ScrollBar } from "~/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { cn } from "~/lib/utils/utils";
import creatorImg from "~/public/curator.png";
import topCreator from "~/public/top-creator.jpeg";
import { TypographyH1, TypographyP } from "~/utils/typography";

const creators = {
  image: creatorImg,
  name: "0AHY21....342",
};

const tabs = [
  {
    name: "All",
    slug: "all",
    Component: () => <All />,
  },
  {
    name: "Ebooks (2)",
    slug: "ebooks",
    Component: () => <div>Profile</div>,
  },
  {
    name: "Memberships (20)",
    slug: "memberships",
    Component: () => <div>Profile</div>,
  },
  {
    name: "Art items (3)",
    slug: "art",
    Component: () => <div>Profile</div>,
  },
  {
    name: "Music and audio (20)",
    slug: "music",
    Component: () => <div>Profile</div>,
  },
  {
    name: "Coaching package (1)",
    slug: "coaching",
    Component: () => <div>Profile</div>,
  },
  {
    name: "Services (2)",
    slug: "services",
    Component: () => <div>Profile</div>,
  },
  {
    name: "Tickets (2)",
    slug: "tickets",
    Component: () => <div>Profile</div>,
  },
];

export default function Popular() {
  return (
    <section className="container p-3 mx-auto">
      <div className="space-y-3">
        <TypographyP className={cn("text-[#d6d6d6]")}>Popular tags</TypographyP>
        <Tabs defaultValue={tabs[0].slug}>
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

function All() {
  return (
    <div className="mt-10 space-y-3">
      <div className="flex items-center justify-center">
        <PopularProductsText />
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

function PopularProductsText() {
  return (
    <TypographyH1 className="font-semibold text-transparent !bg-clip-text [background:linear-gradient(87.25deg,_#2063f2,_#a431ff_33.33%,_#a431ff_66.67%,_#ff73ae)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] text-center">
      Popular Products
    </TypographyH1>
  );
}
