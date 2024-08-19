import Image from "next/image";
import { cn } from "~/lib/utils/utils";
import { TypographyH4 } from "~/utils/typography";
import { Button } from "../ui/button";
import design from "~/public/Design-WA.png";
import art from "~/public/Art-WA.png";
import photography from "~/public/Photography-WA.png";
import { useQuery } from "@tanstack/react-query";
import ebook from "~/public/Ebook-WA.png";

type PopularCardProps = {
  asSmall?: boolean;
  mxAuto?: boolean;
  index: number;
};

interface CategoryCreatorCounts {
  [category: string]: number;
}

export function PopularCard({ asSmall, mxAuto, index }: PopularCardProps) {
  
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  
  async function getProducts() {
    const response = await fetch(
      `${API_URL}/product/`
    );

    if (response.ok) {
      const data = await response.json();
      return data as ProductsFromApi;
    }

    throw new Error("Failed to fetch products");
  }

  const { data: products, isLoading } = useQuery({
    queryKey: ["popular-category"],
    queryFn: getProducts,
  });

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="loader" />
      </div>
    );

  const fetchedProducts = products?.data || [];

  // to get category count
  const getCategoryCounts = (): { [category: string]: number } => {
    const categoryCounts: { [category: string]: number } = {};

    fetchedProducts.map((product) => {
      let categories = product?.categories;

      if (typeof categories === "string") {
        categories = [categories];
      }
      categories.forEach((category) => {
        if (!categoryCounts[category]) {
          categoryCounts[category] = 0;
        }
        categoryCounts[category]++;
      });
    });

    return categoryCounts;
  };
  // to get creator count
  const getCreatorCounts = (): CategoryCreatorCounts => {
    const categoryCreatorCounts: CategoryCreatorCounts = {};

    fetchedProducts.forEach((product) => {
      let categories = product?.categories;
      let creator = product?.user_id;

      if (typeof categories === "string") {
        categories = [categories];
      }

      if (categories && creator) {
        categories.forEach((category) => {
          if (!categoryCreatorCounts[category]) {
            categoryCreatorCounts[category] = 0;
          }
          categoryCreatorCounts[category]++;
        });
      }
    });

    return categoryCreatorCounts;
  };

  const categoryCreatorCounts = getCreatorCounts();
  const categoryCounts = getCategoryCounts();

  const contentFor = [
    {
      title: "Photography",
      creators: categoryCreatorCounts.photography | 0,
      product: categoryCounts.photography | 0,
      icon: photography,
      // sales: "$132,222k",
    },
    {
      title: "Arts",
      creators: categoryCreatorCounts.art | 0,
      product: categoryCounts.art | 0,
      icon: design,
      // sales: "$132,222k",
    },
    {
      title: "Ebooks",
      creators: categoryCreatorCounts.ebook | 0,
      product: categoryCounts.ebook | 0,
      icon: ebook,
      // sales: "$132,222k",
    },
  ];
  const CardContent = contentFor[index];

  return (
    <>
      {CardContent && (
        <div
          className={cn(
            "border border-mintyplex-border rounded-md p-2.5 space-y-4 w-full group",
            asSmall ? "max-w-sm" : "",
            mxAuto ? "mx-auto" : ""
          )}
        >
          <div className="overflow-hidden rounded-md">
            <Image
              alt={CardContent?.title}
              src={CardContent?.icon}
              className="object-cover w-full group-hover:scale-105 transition-all duration-300 max-h-[30rem] object-top"
            />
          </div>
          <div>
            <TypographyH4>{CardContent?.title}</TypographyH4>
          </div>
          <div className="flex items-center justify-between gap-8">
            <div>
              <div className="text-sm font-light text-[#d6d6d6]">Creators:</div>
              <div>{CardContent?.creators}</div>
            </div>
            <div>
              <div className="text-sm font-light text-[#d6d6d6]">Product:</div>
              <div>{CardContent?.product}</div>
            </div>
            {/* <div>
              <div className="text-sm font-light text-[#d6d6d6]">Sales:</div>
              <div>{CardContent?.sales}</div>
            </div> */}
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
      )}
    </>
  );
}
