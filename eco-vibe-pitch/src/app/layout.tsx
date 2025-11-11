import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://agentic-9c1fec3e.vercel.app"),
  title: "Eco Vibe Bottles | Investor Pitch",
  description:
    "Premium hydration reinvented with self-cleaning UV technology, sustainability, and intelligent insights inspired by LARQ.",
  openGraph: {
    title: "Eco Vibe Bottles | Investor Pitch",
    description:
      "Premium hydration reinvented with self-cleaning UV technology, sustainability, and intelligent insights inspired by LARQ.",
    url: "https://agentic-9c1fec3e.vercel.app",
    type: "website",
    images: [
      {
        url: "/images/hero-bottle.jpg",
        width: 1200,
        height: 630,
        alt: "Eco Vibe Bottles presentation hero visual",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Eco Vibe Bottles | Investor Pitch",
    description:
      "Experience the professional Eco Vibe Bottles deck—technology, sustainability, and GTM all in one immersive presentation.",
    images: ["/images/hero-bottle.jpg"],
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
