import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "SpendLens — Free AI Spend Audit for Startups",
  description:
    "Find out exactly where your AI budget is leaking. Free audit tool that reviews your Cursor, Copilot, Claude, ChatGPT, and other AI tool spend in 90 seconds.",
  keywords: [
    "AI spend audit",
    "AI tool costs",
    "startup costs",
    "Cursor pricing",
    "GitHub Copilot pricing",
    "Claude pricing",
    "ChatGPT pricing",
    "AI budget",
    "SaaS spend optimization",
  ],
  authors: [{ name: "SpendLens by Credex" }],
  openGraph: {
    type: "website",
    title: "SpendLens — Free AI Spend Audit for Startups",
    description:
      "Find where your AI budget is leaking. Free, no login, results in 90 seconds.",
    siteName: "SpendLens",
  },
  twitter: {
    card: "summary_large_image",
    title: "SpendLens — Free AI Spend Audit",
    description:
      "Find where your AI budget is leaking. Free audit in 90 seconds.",
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
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-black text-zinc-200 antialiased font-['Inter']">
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
