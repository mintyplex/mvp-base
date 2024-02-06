import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Mintyplex - NFT Marketplace",
    description: "Discover, buy and sell NFTs on Mintyplex",
    metadataBase: new URL("https://testnet.mintyplex.com/"),
    alternates: {
        canonical: "/",
    },
    openGraph: {
        images: "/opengraph-image.jpg",
    },
};