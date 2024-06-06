"use client";

import React from "react";
import { RenderCards } from "./render-cards";
import { useQuery } from "@tanstack/react-query";
import { Card } from "~/components/customs/card";
import creatorImg from "~/public/curator.png";
import { createPriceWithDiscount } from "~/lib/utils/utils";

export function RecentListing({ shouldNotBe12 }: { shouldNotBe12?: boolean }) {
  async function getProducts() {
    // CURL equivalent
    // curl -sX GET https://mintyplex-api.onrender.com/api/v1/product/
    const response = await fetch(
      "https://mintyplex-api.onrender.com/api/v1/product/"
    );

    if (response.ok) {
      const data = await response.json();
      return data as ProductsFromApi;
    }

    throw new Error("Failed to fetch products");
  }

  // Data is casted as products cause we know it's products
  // hence the name makes more sense
  const { data: products, isLoading } = useQuery({
    queryKey: ["recent-listing"],
    queryFn: getProducts,
  });

  // TODO: Create Proper Loading State
  // TODO: Create Proper Error State
  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="loader" />
      </div>
    );

  const rendereAmount = shouldNotBe12 ? undefined : 12;
  const sortedData = products?.data?.slice().sort((a, b) => {
    const timestampA = new Date(a.created_at).getTime();
    const timestampB = new Date(b.created_at).getTime();

    return timestampB - timestampA;
  });

  return (
    <div className="flex overflow-auto gap-3 w-full">
      {sortedData
        ?.slice(0, rendereAmount)
        .map((_, index) => (
          <Card
            key={index}
            id={_?._id}
            byImg={""}
            name={_?.name}
            by={_?.user_id}
            image={_?.image}
            price={_?.price}
            discount={_?.discount}
            discountedPrice={createPriceWithDiscount(_?.price, _?.discount)}
          />
        ))}
    </div>
  );
}
