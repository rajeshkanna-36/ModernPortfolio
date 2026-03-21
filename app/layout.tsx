import type { Metadata } from "next";
import "./globals.css";
import CursorWrapper from "@/components/CursorWrapper";
import Navbar from "@/components/Navbar";
import SmoothScroll from "@/components/SmoothScroll";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Outfit } from "next/font/google";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "Rajesh Kanna | Portfolio",
  description: "Full Stack Developer Portfolio",
};

import LoadingManager from "@/components/LoadingManager";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} ${outfit.variable} antialiased font-sans`}
        suppressHydrationWarning
      >
        <LoadingManager>
          <SmoothScroll>
            <CursorWrapper />
            <Navbar />
            {children}
          </SmoothScroll>
        </LoadingManager>
      </body>
    </html>
  );
}
