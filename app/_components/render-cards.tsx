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
      <>
        {Array.from({
          length: isMobile ? 6 : 12,
        }).map((_, index) => (
          <Card
            id={index.toString()}
            byImg={creatorImg}
            name="Yatch Ape Club"
            by="0x20..8"
            image={topCreator}
            price="23"
            key={index}
          />
        ))}
      </>
    );
  }

  function createPriceWithDiscount(price: number, discount: number) {
    const returnMe = price - (price * discount) / 100;
    return returnMe.toFixed(2).toString();
  }

  return (
    <>
      {data.map((product) => (
        <Card
          id={product._id}
          byImg={creatorImg}
          name={product.name}
          by={product.user_id}
          image={topCreator}
          price={product.price.toString()}
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
