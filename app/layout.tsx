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
  openGraph: {
    images: [
      {
        url: "https://opengraph.b-cdn.net/production/documents/cfd284d5-3edf-402d-bcea-984d641f845d.jpg?token=Z4sNERSPh_FsQhW2TgABclfQbqRQDnQYtLfkBWhiHno&height=779&width=1200&expires=33243076735",
      },
    ],
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
