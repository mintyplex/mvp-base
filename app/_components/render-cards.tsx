"use client";
import { useEffect, useState } from "react";
import creatorImg from "~/public/curator.png";
import { Card } from "~/components/customs/card";
import topCreator from "~/public/top-creator.jpeg";

export function RenderCards() {
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
