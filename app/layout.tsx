import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://n2nphotobooths.com.au"),
  title: {
    default: "N2N Photobooths — Melbourne's Favourite Photo Booth Hire",
    template: "%s · N2N Photobooths",
  },
  description:
    "Premium photo booth hire across Melbourne and Victoria. Open-air, glam, and enclosed booths for weddings, birthdays, corporate, and school events since 2014.",
  openGraph: {
    title: "N2N Photobooths",
    description:
      "Premium photo booth hire across Melbourne and Victoria since 2014.",
    type: "website",
    locale: "en_AU",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-AU"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-ivory text-charcoal">{children}</body>
    </html>
  );
}
