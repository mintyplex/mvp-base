"use client";
import { AbstraxionProvider } from "@burnt-labs/abstraxion";

type BurntWrapperProps = {};

export default function BurntWrapper({
  children,
}: React.PropsWithChildren<BurntWrapperProps>) {
  const seatContractAddress =
    "xion1z70cvc08qv5764zeg3dykcyymj5z6nu4sqr7x8vl4zjef2gyp69s9mmdka";

  return (
    <AbstraxionProvider config={{ contracts: [seatContractAddress] }}>
      {children}
    </AbstraxionProvider>
  );
}
