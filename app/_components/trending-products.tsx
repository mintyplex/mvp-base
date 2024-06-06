"use client";

import React from "react";
import { RenderCards } from "./render-cards";
import { useQuery } from "@tanstack/react-query";

export function TrendingProducts({
  shouldNotBe12,
}: {
  shouldNotBe12?: boolean;
}) {
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
    queryKey: ["trending-products"],
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

  // A splice in JS can take a number or undefined
  // if it's undefined it will take all the elements
  const rendereAmount = shouldNotBe12 ? undefined : 12;

  const sortedData = products?.data?.slice().sort((a, b) => {
    const timestampA = new Date(a.created_at).getTime();
    const timestampB = new Date(b.created_at).getTime();

    return timestampB - timestampA;
  });

  return (
    <div className="grid-cols-2 grid gap-4 xl:grid-cols-5 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3">
      <RenderCards data={(sortedData as ProductFromApi[])?.slice(0, rendereAmount)} />
    </div>
  );
}
