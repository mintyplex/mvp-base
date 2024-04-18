import "@burnt-labs/abstraxion/dist/index.css";
import "@burnt-labs/ui/dist/index.css";
import { Figtree } from "next/font/google";
import BurntWrapper from "~/components/customs/burnt-wrapper";
import { Footer } from "~/components/customs/footer/footer";
import Navbar from "~/components/customs/navbar/navbar";
import { HideAt } from "~/components/customs/show-at";
import { ThemeProvider } from "~/components/customs/theme-provider";
import { QueryClientProvider } from "@tanstack/react-query";
import { cn } from "~/lib/utils/utils";
import "./globals.css";

const inter = Figtree({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

import type { Metadata } from "next";
import { AccountProvider } from "~/components/context/AccountContext";
import { Toaster } from "~/components/ui/toaster";
import { queryClient } from "~/lib/queryClient";
import { QueryProvider } from "~/components/context/queryClient";
import ProtectedRoute from "~/components/customs/protected-route";

export const metadata: Metadata = {
  metadataBase: new URL("https://testnet.mintyplex.com/"),
  title: "Mintyplex - Digital Marketplace",
  description: "Create, Own and Monetize products on-chain with Mintyplex.",
  openGraph: {
    url: "https://testnet.mintyplex.com/",
    type: "website",
    title: "Mintyplex - Digital Marketplace",
    description: "Create, Own and Monetize products on-chain with Mintyplex.",
    images: [
      {
        url: "https://opengraph.b-cdn.net/production/documents/71547070-99da-47bc-b4fd-c0f513608ba7.jpg?token=U0NgindjiwUYjNnKV68zje0bTqT-gP51QbmGlBWCrHE&height=779&width=1200&expires=33243084907",
        width: 1200,
        height: 779,
        alt: "Mintyplex - Digital Marketplace",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@mintyplex",
    description: "Create, Own and Monetize products on-chain with Mintyplex.",
    title: "Mintyplex - Digital Marketplace",
    images: {
      url: "https://opengraph.b-cdn.net/production/documents/71547070-99da-47bc-b4fd-c0f513608ba7.jpg?token=U0NgindjiwUYjNnKV68zje0bTqT-gP51QbmGlBWCrHE&height=779&width=1200&expires=33243084907",
      width: 1200,
      height: 779,
      alt: "Mintyplex - Digital Marketplace",
    },
    site: "testnet.mintyplex.com",
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
        <QueryProvider>
          <BurntWrapper>
            <AccountProvider>
              <ProtectedRoute>
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
                  <Toaster />
                </ThemeProvider>
              </ProtectedRoute>
            </AccountProvider>
          </BurntWrapper>
        </QueryProvider>
      </body>
    </html>
  );
}
