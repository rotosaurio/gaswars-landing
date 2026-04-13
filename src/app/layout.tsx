import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { LanguageProvider } from "@/i18n/context";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-headline",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "0xGASWARS // OPTIMIZE_OR_DIE",
  description:
    "Competitive code optimization with real stakes. Devs stake BNB and compete to write the most gas-efficient code. Winner drains the pool. 100% on-chain on BSC.",
  metadataBase: new URL("https://gaswars-landing.vercel.app"),
  openGraph: {
    title: "GasWars — Ship Tight. Get Paid.",
    description:
      "Competitive code optimization with real stakes. Stake BNB, write the most efficient code, drain the pool. Starting with Solidity — expanding to Rust, Move, Go, SQL.",
    siteName: "GasWars",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GasWars — Ship Tight. Get Paid.",
    description:
      "Competitive code optimization with real stakes. Stake BNB, write the most efficient code, drain the pool.",
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
      className={`dark ${spaceGrotesk.variable} ${inter.variable} ${jetbrains.variable}`}
    >
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-surface-dim text-on-background font-body antialiased overflow-x-hidden">
        <LanguageProvider>
          {children}
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  );
}
