import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { CurtainTransition } from "@/components/layout/CurtainTransition";
import siteData from "@content/site.json";

export const viewport: Viewport = {
  themeColor: "#F3EEE3",
  colorScheme: "light",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://iocmnit.ac.in"),
  title: `${siteData.name} · ${siteData.shortName}`,
  description: `${siteData.tagline} ${siteData.subtagline}`,
  icons: {
    icon: "/favicon.ico",
    apple: "/assets/ioc-logo-transparent.png",
  },
  openGraph: {
    title: `${siteData.name} · MNIT Jaipur`,
    description: "Where Ideas Meet. The student-led institutional platform for conversations, interviewing, research, and storytelling at MNIT Jaipur.",
    url: "https://iocmnit.ac.in",
    siteName: "Institute of Conversations",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Institute of Conversations Emblem",
      },
    ],
    locale: "en_IN",
    type: "website",
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
    <html lang="en" className="selection:bg-orange-tint selection:text-ink">
      <body className="font-sans antialiased bg-cream text-ink flex flex-col min-h-screen relative overflow-x-hidden">
        {/* Skip to Main Content for Accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-4 z-50 bg-ink text-cream px-4 py-2 rounded-full text-xs font-mono tracking-mono shadow-soft"
        >
          Skip to main content
        </a>

        {/* Global Smooth Virtual Scroll */}
        <SmoothScroll>
          <Navigation />
          <main id="main-content" className="flex-grow flex flex-col pt-0">
            <CurtainTransition>{children}</CurtainTransition>
          </main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
