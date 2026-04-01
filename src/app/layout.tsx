import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { TooltipProvider } from "@/components/ui/tooltip";
import { WebsiteJsonLd, OrganizationJsonLd } from "@/components/seo/json-ld";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://cnews.cc"),
  title: {
    default: "cnews.cc -- Canton Network Intelligence",
    template: "%s | cnews.cc",
  },
  description:
    "The premier data and intelligence hub for the Canton Network ecosystem. Real-time CC price, validator metrics, token analytics, DeFi insights, and comprehensive Canton blockchain data.",
  keywords: [
    "Canton Network",
    "CC token",
    "Canton Coin",
    "CBTC",
    "Canton DeFi",
    "Canton validators",
    "blockchain analytics",
    "Canton ecosystem",
    "DAML",
    "Canton data",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://cnews.cc",
    siteName: "cnews.cc",
    title: "cnews.cc -- Canton Network Intelligence",
    description:
      "Real-time analytics, validator metrics, token data, and DeFi insights for the Canton Network.",
  },
  twitter: {
    card: "summary_large_image",
    title: "cnews.cc -- Canton Network Intelligence",
    description:
      "Real-time analytics, validator metrics, token data, and DeFi insights for the Canton Network.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <TooltipProvider>
          <WebsiteJsonLd />
          <OrganizationJsonLd />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </TooltipProvider>
      </body>
    </html>
  );
}
