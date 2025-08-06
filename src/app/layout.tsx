import { Footer } from "@/components/navigation/Footer";
import { Header } from "@/components/navigation/Header";
import type { Metadata } from "next";
import {
  Archivo,
  DM_Mono,
  Geist_Mono,
  Major_Mono_Display,
} from "next/font/google";

import { NuqsAdapter } from "nuqs/adapters/next/app";
import "./globals.css";

const archivoSans = Archivo({
  variable: "--font-app-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-app-mono",
  subsets: ["latin"],
});

const majorMonoDisplay = Major_Mono_Display({
  variable: "--font-major-mono",
  subsets: ["latin"],
  weight: "400", // Major Mono Display only comes in one weight
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500"], // DM Mono has multiple weights
});

export const metadata: Metadata = {
  title: "Explorer | Web3 Privacy Now",
  description: "Explore Web3 projects focused on privacy and security",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${archivoSans.variable} ${geistMono.variable} ${majorMonoDisplay.variable} ${dmMono.variable} antialiased font-sans min-h-screen flex flex-col`}
      >
        <NuqsAdapter>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </NuqsAdapter>
      </body>
    </html>
  );
}
