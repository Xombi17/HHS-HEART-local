import type { Metadata } from "next";
import { Suspense } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import ScrollToTopButton from "@/components/common/ScrollToTopButton";
import ServiceWorkerRegistration from "@/components/common/ServiceWorkerRegistration";
import PerformanceMonitor from "@/components/common/PerformanceMonitor";
import PreloadLinks from "@/components/common/PreloadLinks";
import BackgroundParticlesClient from "@/components/common/BackgroundParticlesClient";
import CursorEffects from '@/components/effects/CursorEffects';

// Optimize font loading
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "HHS Heart - Interactive Human Heart Education",
  description:
    "Explore the human heart through interactive 3D visualization, practical tools, and engaging educational content.",
  metadataBase: new URL("https://hhs-heart.vercel.app"),
  openGraph: {
    title: "HHS Heart - Interactive Human Heart Education",
    description:
      "Explore the human heart through interactive 3D visualization.",
    url: "https://hhs-heart.vercel.app",
    siteName: "HHS Heart",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HHS Heart - Interactive Human Heart Education",
    description:
      "Explore the human heart through interactive 3D visualization.",
  },
  robots: {
    index: true,
    follow: true,
  },
  manifest: "/manifest.json",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#111827" },
  ],
  appleWebApp: {
    title: "HHS Heart",
    statusBarStyle: "black-translucent",
  },
  formatDetection: {
    telephone: false,
  },
  keywords: 'heart, anatomy, education, 3D model, interactive, cardiac health',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        {/* Preload critical assets */}
        <link
          rel="preload"
          href="/models/heart.glb"
          as="fetch"
          crossOrigin="anonymous"
        />
      </head>
      <body className={`min-h-screen flex flex-col ${inter.className}`}>
        <ThemeProvider>
          <div className="bg-background text-foreground min-h-screen flex flex-col relative">
            {/* Subtle background particles with low opacity */}
            <div className="fixed inset-0 pointer-events-none z-0">
              <BackgroundParticlesClient 
                density={20} 
                speed={0.3} 
                color="var(--primary)" 
                className="opacity-30" 
              />
            </div>
            <div className="blood-cell-pattern fixed inset-0 pointer-events-none z-0 opacity-5"></div>
            
            <div className="relative z-10 flex flex-col min-h-screen">
              <Suspense fallback={null}>
                <Navbar />
              </Suspense>
              <main className="flex-grow pt-16">
                {children}
              </main>
              <Suspense fallback={null}>
                <Footer />
                <ScrollToTopButton />
                <ServiceWorkerRegistration />
              </Suspense>
            </div>
          </div>
          <PreloadLinks />
          <PerformanceMonitor />
        </ThemeProvider>
      </body>
    </html>
  );
}
