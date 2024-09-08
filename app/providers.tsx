"use client";

import React from "react";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import {
  Base,
  BaseSepoliaTestnet,
  Ethereum,
  Polygon,
  Sepolia,
} from "@thirdweb-dev/chains";

export default function Providers({ children }: any) {
  return (
    <ThirdwebProvider
      supportedChains={[Base, Sepolia, BaseSepoliaTestnet]}
      activeChain={BaseSepoliaTestnet}
      clientId="648dd0dd39c83ec04b42837410d06c75"
    >
      {children}
    </ThirdwebProvider>
  );
}
