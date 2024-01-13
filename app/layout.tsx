import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
import { cn } from "~/lib/utils/utils";
import Navbar from "~/components/customs/navbar/navbar";
import { ThemeProvider } from "~/components/customs/theme-provider";
import { Footer } from "~/components/customs/footer/footer";

const inter = Figtree({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-mintyplex-dark">
      <body className={cn(inter.className, "bg-mintyplex-dark text-white")}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
