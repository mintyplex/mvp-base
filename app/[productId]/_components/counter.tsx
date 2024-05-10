"use client";
import { MinusIcon, PlusIcon } from "lucide-react";
import React, { useState } from "react";
import { Button } from "~/components/ui/button";

export function Counter({ price, setUpdatedPrice, setQuantity }: any) {
  const [counter, setCounter] = React.useState(1);

  setQuantity(counter);
  setUpdatedPrice(price * counter);

  return (
    <div className="pt-3">
      <div className="relative flex items-center justify-between p-3 border rounded-md border-mintyplex-border gap-3">
        <div className="absolute -top-3.5 w-fit bg-mintyplex-dark">
          <small>Quantity</small>
        </div>
        <div>{counter}</div>
        <div className="space-x-3">
          <Button
            className="text-white bg-[#9F9F9F] hover:bg-[#9F9F9F] duration-300 transition-all"
            onClick={() => setCounter((prev) => (prev > 1 ? prev - 1 : 1))}
            size="icon"
          >
            <MinusIcon />
          </Button>
          <Button
            onClick={() => setCounter((prev) => prev + 1)}
            className="text-white duration-300 transition-all bg-mintyplex-primary"
            size="icon"
          >
            <PlusIcon />
          </Button>
        </div>
      </div>
    </div>
  );
}
