import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Fraunces } from "next/font/google";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

const sans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const serif = Fraunces({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
});

export const metadata: Metadata = {
  title: "NyuziYap ⚡ — High-Performance, Privacy-First Comment Engine",
  description:
    "The ultra-lightweight (<15KB), sub-20ms edge comment engine with automated email retention loops for modern blogs, publications, and Substack alternatives.",
  keywords: [
    "nyuzi",
    "nyuziyap",
    "comments engine",
    "edge comments",
    "cloudflare d1 comments",
    "privacy-first comments",
    "disqus alternative",
    "embed comments",
    "comment widget",
  ],
  authors: [{ name: "NyuziYap Team" }],
  openGraph: {
    title: "NyuziYap ⚡ — High-Performance, Privacy-First Comment Engine",
    description:
      "Ultra-lightweight (<15KB), sub-20ms edge comments with automated email reply retention loops for modern publishers.",
    type: "website",
    url: "https://nyuzi-yap.vercel.app",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${serif.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col font-sans transition-colors duration-300">
        {children}
      </body>
    </html>
  );
}
