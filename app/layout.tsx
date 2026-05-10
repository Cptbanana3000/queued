import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Queued — Your waitlist, live in 60 seconds",
    template: "%s | Queued",
  },
  description:
    "Launch a beautiful waitlist page in 60 seconds. No code, no design skills required. Pick a template, fill in your details, and start collecting signups immediately.",
  keywords: ["waitlist", "landing page", "indie hacker", "founder", "launch"],
  authors: [{ name: "Queued" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://queued.io",
    siteName: "Queued",
    title: "Queued — Your waitlist, live in 60 seconds",
    description:
      "Launch a beautiful waitlist page in 60 seconds. No code, no design skills required.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Queued — Your waitlist, live in 60 seconds",
    description:
      "Launch a beautiful waitlist page in 60 seconds. No code, no design skills required.",
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
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
