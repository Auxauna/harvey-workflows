import type { Metadata } from "next";
import { IBM_Plex_Serif, IBM_Plex_Mono, Inter } from "next/font/google";
import "./globals.css";

const plexSerif = IBM_Plex_Serif({
  variable: "--font-plex-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Harvey GTM Technology — First 90 Days",
  description:
    "A working roadmap of GTM workflow automations for Harvey's first GTM Business Analyst hire. Built by Jacob Rucker, April 2026.",
  authors: [{ name: "Jacob Rucker" }],
  openGraph: {
    title: "Harvey GTM Technology — First 90 Days",
    description:
      "A working roadmap of GTM workflow automations for Harvey's first GTM Business Analyst hire.",
    type: "website",
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
    <html
      lang="en"
      className={`${plexSerif.variable} ${plexMono.variable} ${inter.variable}`}
    >
      <body className="min-h-screen bg-bg-base text-fg-primary antialiased">
        {children}
      </body>
    </html>
  );
}
