import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Canvas from "@/components/Canvas";
import { ClerkProvider } from "@clerk/nextjs";
import NavWrapper from "@/components/Navbar/NavWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Style Savant",
  description: "Breaking boundaries with timeless style and innovation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <meta name="apple-mobile-web-app-status-bar-style" content="black"/>
          <meta name="theme-color" content="#000000"/>
          <meta name="viewport" content="viewport-fit=cover, width=device-width, user-scalable=no"/>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link href="https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap" rel="stylesheet" />
          <link href="https://fonts.googleapis.com/css2?family=Tangerine:wght@400;700&display=swap" rel="stylesheet" />
        </head>
        <body
        className={inter.className}>
          <NavWrapper/>
          <Canvas/>
          {children}
          <Footer/>
        </body>
      </html>
    </ClerkProvider>
  );
}

