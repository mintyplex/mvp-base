import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
import { cn } from "~/lib/utils/utils";
import Navbar from "~/components/customs/navbar/navbar";
import { ThemeProvider } from "~/components/customs/theme-provider";
import { Footer } from "~/components/customs/footer/footer";
import { HideAt } from "~/components/customs/show-at";
import BurntWrapper from "~/components/customs/burnt-wrapper";

const inter = Figtree({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Something is wrong with the open graph of the meta data
  return (
    <html lang="en" className="bg-mintyplex-dark">
      <title>Mintyplex - NFT Marketplace</title>
      <meta
        name="description"
        content="Discover, buy and sell NFTs on Mintyplex"
      />

      <meta property="og:url" content="https://testnet.mintyplex.com/" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="Mintyplex - NFT Marketplace" />
      <meta
        property="og:description"
        content="Discover, buy and sell NFTs on Mintyplex"
      />
      <meta
        property="og:image"
        content="https://opengraph.b-cdn.net/production/documents/71547070-99da-47bc-b4fd-c0f513608ba7.jpg?token=U0NgindjiwUYjNnKV68zje0bTqT-gP51QbmGlBWCrHE&height=779&width=1200&expires=33243084907"
      />

      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:domain" content="testnet.mintyplex.com" />
      <meta property="twitter:url" content="https://testnet.mintyplex.com/" />
      <meta name="twitter:title" content="Mintyplex - NFT Marketplace" />
      <meta
        name="twitter:description"
        content="Discover, buy and sell NFTs on Mintyplex"
      />
      <meta
        name="twitter:image"
        content="https://opengraph.b-cdn.net/production/documents/71547070-99da-47bc-b4fd-c0f513608ba7.jpg?token=U0NgindjiwUYjNnKV68zje0bTqT-gP51QbmGlBWCrHE&height=779&width=1200&expires=33243084907"
      />

      <body className={cn(inter.className, "bg-mintyplex-dark text-white")}>
        <BurntWrapper disable>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <main className="flex flex-col min-h-screen">
              <Navbar />
              <div className="flex-grow">{children}</div>
              <HideAt paths={["dashboard"]}>
                <Footer />
              </HideAt>
            </main>
          </ThemeProvider>
        </BurntWrapper>
      </body>
    </html>
  );
}
