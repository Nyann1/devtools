import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Free Online Developer Tools - JSON Formatter, Base64, JWT & More",
    template: "%s - DevTools",
  },
  description:
    "Free online developer tools. Format JSON, encode Base64, debug JWT, test regex, generate UUIDs and more. All processing happens in your browser — no data is ever uploaded.",
  keywords: [
    "json formatter",
    "base64 encode",
    "base64 decode",
    "jwt debugger",
    "regex tester",
    "url encode",
    "timestamp converter",
    "uuid generator",
    "hash generator",
    "free online tools",
    "developer tools",
  ],
  openGraph: {
    type: "website",
    siteName: "Free Toolkit",
    title: "Free Online Developer Tools - JSON Formatter, Base64, JWT & More",
    description:
      "Free online developer tools. Format JSON, encode Base64, debug JWT, test regex, generate UUIDs and more. All processing happens in your browser.",
    url: "https://free-toolkit.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Online Developer Tools",
    description:
      "Free online developer tools. Format JSON, encode Base64, debug JWT, test regex, generate UUIDs and more. All client-side processing.",
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
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <TooltipProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <Toaster />
        </TooltipProvider>
        <Analytics />
      </body>
    </html>
  );
}
