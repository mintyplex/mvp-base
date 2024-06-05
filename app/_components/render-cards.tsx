"use client";
import { useEffect, useState } from "react";
import creatorImg from "~/public/curator.png";
import { Card } from "~/components/customs/card";
import topCreator from "~/public/top-creator.jpeg";
import { truncateXionAddress } from "~/lib/utils/utils";

export function RenderCards({ data }: { data?: ProductFromApi[] }) {
  const [size, setSize] = useState(
    typeof window !== "undefined" && window.innerWidth
  );

  useEffect(() => {
    function handleResize() {
      setSize(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [size]);

  const isMobile = typeof size === "number" && size < 640;

  if (!data) {
    return (
      <div className="h-[20vh] flex w-full items-center justify-center">
        <p>No products yet</p>
      </div>
    );
  }

  function createPriceWithDiscount(price: number, discount: number) {
    const returnMe = price - (price * discount) / 100;
    return returnMe.toFixed(2);
  }

  const sortedData = data?.slice().sort((a, b) => {
    const timestampA = new Date(a.created_at).getTime();
    const timestampB = new Date(b.created_at).getTime();

    return timestampB - timestampA;
  });

  return (
    <>
      {sortedData?.map((product) => (
        <Card
          id={product._id}
          byImg={`https://mintyplex-api.onrender.com/api/v1/user/avatar/${product.user_id}`}
          name={product.name}
          by={product.user_id}
          image={product.image}
          price={product.price}
          discount={product.discount}
          discountedPrice={createPriceWithDiscount(
            product.price,
            product.discount
          )}
          key={product._id}
        />
      ))}
    </>
  );
}
