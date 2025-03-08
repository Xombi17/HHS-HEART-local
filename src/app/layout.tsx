import type { Metadata } from "next";
import "./globals.css";
import { Suspense } from 'react';
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import ScrollToTopButton from "@/components/common/ScrollToTopButton";
import PerformanceOptimizer from "@/components/common/PerformanceOptimizer";
import PerformanceMonitor from "@/components/common/PerformanceMonitor";
import ServiceWorkerRegistration from "@/components/common/ServiceWorkerRegistration";

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
        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Roboto+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
        
        {/* Preload critical assets */}
        <link rel="preload" href="/models/heart.glb" as="fetch" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen flex flex-col bg-white dark:bg-gray-900 font-sans">
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
        
        {/* Performance monitoring tool (only visible in development) */}
        <PerformanceMonitor />
      </body>
    </html>
  );
}
