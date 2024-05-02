"use client";
import { AbstraxionProvider } from "@burnt-labs/abstraxion";

type BurntWrapperProps = {};

export default function BurntWrapper({
  children,
}: React.PropsWithChildren<BurntWrapperProps>) {
  const mintyplexContractAddress = "xion1gdzk8u6z3u46220qtlr6kktqv023dsyh32j22c05vnpr5wnfulmsxvcwrv";

  return (
    <AbstraxionProvider config={{ contracts: [mintyplexContractAddress] }}>
      {children}
    </AbstraxionProvider>
  );
}


// xiond tx wasm store artifacts / mintyplex - contract.wasm--from mintyplex--gas - prices 0.1uxion--gas auto--gas - adjustment 1.3 - y--output json - b block