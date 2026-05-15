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
  metadataBase: new URL("https://www.queuedapp.dev"),
  title: {
    default: "Queued — Your waitlist, live in 60 seconds",
    template: "%s | Queued",
  },
  description:
    "Launch a beautiful waitlist page in 60 seconds. No code, no design skills required. Pick a template, fill in your details, and start collecting signups immediately.",
  keywords: [
    "waitlist",
    "waitlist builder",
    "landing page",
    "launch page",
    "email list",
    "indie hacker",
    "founder",
    "pre-launch",
    "coming soon page",
    "collect emails",
  ],
  authors: [{ name: "Queued" }],
  alternates: {
    canonical: "https://www.queuedapp.dev",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.queuedapp.dev",
    siteName: "Queued",
    title: "Queued — Your waitlist, live in 60 seconds",
    description:
      "Launch a beautiful waitlist page in 60 seconds. No code, no design skills required.",
    images: [{ url: "/opengraph-image.png", width: 1200, height: 630, alt: "Queued" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Queued — Your waitlist, live in 60 seconds",
    description:
      "Launch a beautiful waitlist page in 60 seconds. No code, no design skills required.",
    images: ["/opengraph-image.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/site.webmanifest",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.queuedapp.dev/#organization",
      name: "Queued",
      url: "https://www.queuedapp.dev",
    },
    {
      "@type": "WebSite",
      "@id": "https://www.queuedapp.dev/#website",
      url: "https://www.queuedapp.dev",
      name: "Queued",
      publisher: { "@id": "https://www.queuedapp.dev/#organization" },
    },
    {
      "@type": "SoftwareApplication",
      name: "Queued",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      url: "https://www.queuedapp.dev",
      description:
        "Launch a beautiful waitlist page in 60 seconds. No code, no design skills required.",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
    },
  ],
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
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
