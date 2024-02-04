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
  return (
    <html lang="en" className="bg-mintyplex-dark">
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
