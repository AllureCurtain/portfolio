import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
});

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Your Name — Designer & Developer",
  description:
    "Personal portfolio of Your Name. Crafting digital experiences at the intersection of design and engineering.",
  metadataBase: new URL("https://yourname.com"),
  openGraph: {
    title: "Your Name — Designer & Developer",
    description:
      "Personal portfolio of Your Name. Crafting digital experiences at the intersection of design and engineering.",
    type: "website",
    locale: "en_US",
    url: "https://yourname.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Your Name — Designer & Developer",
    description:
      "Personal portfolio of Your Name. Crafting digital experiences at the intersection of design and engineering.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
