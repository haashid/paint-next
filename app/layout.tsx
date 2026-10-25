import type { Metadata, Viewport } from "next";
import { DM_Serif_Display, Manrope } from "next/font/google";
import "./globals.css";

const dmSerif = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#20231F",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://colornest.design"),
  title: "ColorNest Painting Solutions | Architectural Painting & Finishing",
  description:
    "Bespoke architectural interior, exterior, and commercial painting solutions crafted with precision, premium finishes, and meticulous care. Your Home. Reimagined.",
  keywords: [
    "architectural painting",
    "interior painting",
    "exterior painting",
    "commercial painting",
    "luxury paint finishes",
    "home transformation",
    "ColorNest",
  ],
  authors: [{ name: "ColorNest Painting Solutions" }],
  openGraph: {
    title: "ColorNest Painting Solutions | Your Home. Reimagined.",
    description:
      "Bespoke architectural painting solutions with meticulous craftsmanship, premium materials, and flawless finishes.",
    url: "https://colornest.design",
    siteName: "ColorNest Painting Solutions",
    images: [
      {
        url: "/images/hero-poster.jpg",
        width: 1920,
        height: 1080,
        alt: "ColorNest Architectural Painting - Modern Home Transformation",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ColorNest Painting Solutions | Your Home. Reimagined.",
    description:
      "Bespoke architectural painting solutions with meticulous craftsmanship and flawless finishes.",
    images: ["/images/hero-poster.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
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
      className={`${dmSerif.variable} ${manrope.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-[#F6F3ED] text-[#20231F] font-sans selection:bg-[#C65F43] selection:text-[#FAF8F5]">
        {children}
      </body>
    </html>
  );
}
