import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Suspense } from 'react';
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import ScrollToTopButton from "@/components/common/ScrollToTopButton";
import PerformanceOptimizer from "@/components/common/PerformanceOptimizer";
import PerformanceMonitor from "@/components/common/PerformanceMonitor";
import ServiceWorkerRegistration from "@/components/common/ServiceWorkerRegistration";
import { ThemeProvider } from "@/context/ThemeContext";
import PreloadLinks from "@/components/common/PreloadLinks";

// Optimize font loading
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap", // Use swap to prevent FOIT (Flash of Invisible Text)
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "HHS Heart - Interactive Heart Anatomy Education",
  description: "Explore heart anatomy and function through interactive 3D models, tools, and educational content.",
  viewport: "width=device-width, initial-scale=1, maximum-scale=5",
  themeColor: "#dc2626",
  manifest: "/manifest.json",
  // Add performance-related meta tags
  other: {
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "HHS Heart",
    "format-detection": "telephone=no",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Preload critical assets */}
        <link rel="preload" href="/models/heart.glb" as="fetch" crossOrigin="anonymous" />
        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
      </head>
      <body className={`min-h-screen flex flex-col bg-white dark:bg-gray-900 ${geistSans.variable} ${geistMono.variable}`}>
        <ThemeProvider>
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
            <PreloadLinks />
          </Suspense>
          
          {/* Performance monitoring tool (only visible in development) */}
          <PerformanceMonitor />
        </ThemeProvider>
      </body>
    </html>
  );
}
