import type { Metadata, Viewport } from "next";
import { Inter, Geist } from "next/font/google";
import { AppProviders } from "@/providers";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});


// ---------------------------------------------------------------------------
// Font
// ---------------------------------------------------------------------------

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

// ---------------------------------------------------------------------------
// SEO Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: {
    default: "PulseOS — The Operating System for Connected Care",
    template: "%s | PulseOS",
  },
  description:
    "PulseOS is a modern healthcare platform that connects patients, doctors, and care teams for seamless, coordinated care.",
  keywords: [
    "healthcare",
    "SaaS",
    "hospital management",
    "connected care",
    "telehealth",
    "EHR",
    "PulseOS",
  ],
  authors: [{ name: "PulseOS" }],
  creator: "PulseOS",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#030712" },
  ],
};

// ---------------------------------------------------------------------------
// Root Layout
// ---------------------------------------------------------------------------

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={cn("font-sans", geist.variable)}>
      <body className={`${inter.variable} font-sans`}>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
