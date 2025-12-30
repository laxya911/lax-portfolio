import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Laxman Aryal | DevOps Engineer",
  description: "Portfolio of Laxman Aryal, a DevOps Engineer specializing in AWS, Azure, and Infrastructure Automation. Offering services in CI/CD, Kubernetes, and Cloud Migrations.",
  keywords: ["DevOps", "AWS", "Azure", "Kubernetes", "Terraform", "Jenkins", "CI/CD", "Infrastructure as Code"],
  authors: [{ name: "Laxman Aryal" }],
  metadataBase: new URL("https://laxya-portfolio.vercel.app"), // Replace with actual domain if different
  openGraph: {
    title: "Laxman Aryal | DevOps Engineer",
    description: "Cloud Infrastructure & Automation Expert. View my projects and services.",
    url: "https://laxya-portfolio.vercel.app",
    siteName: "Laxman Aryal Portfolio",
    images: [
      {
        url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&h=630&auto=format&fit=crop", // coding/devops background
        width: 1200,
        height: 630,
        alt: "Laxman Aryal DevOps Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Laxman Aryal | DevOps Engineer",
    description: "DevOps Engineer specializing in AWS, Kubernetes, and Automation.",
    images: ["https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&h=630&auto=format&fit=crop"],
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
