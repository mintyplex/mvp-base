"use client"

import React from "react";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { BaseSepoliaTestnet } from "@thirdweb-dev/chains";

export default function Providers({children}: any) {
  return (
    <ThirdwebProvider
      activeChain={BaseSepoliaTestnet}
      clientId="648dd0dd39c83ec04b42837410d06c75"
    >
      {children}
    </ThirdwebProvider>
  );
}
