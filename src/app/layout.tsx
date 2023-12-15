import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { StoreProvider } from "@/providers/store-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Todo app",
  description: "Todo app for the {x} time",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StoreProvider>
      <html lang="en">
        <body className={inter.className}>
          <Navbar />
          <div className="md:w-3/4 w-5/6 m-auto pt-10">{children}</div>
        </body>
      </html>
    </StoreProvider>
  );
}
