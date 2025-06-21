import { Footer } from "@/components/navigation/Footer";
import { Header } from "@/components/navigation/Header";
import type { Metadata } from "next";
import { Archivo, Geist_Mono } from "next/font/google";
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
        className={`${archivoSans.variable} ${geistMono.variable} antialiased font-sans min-h-screen flex flex-col`}
      >
        <NuqsAdapter>
          <Header />
          <main className="flex-1 py-6 md:py-6">
            <div className="container mx-auto px-4 md:px-6 lg:px-8">
              {children}
            </div>
          </main>
          <Footer />
        </NuqsAdapter>
      </body>
    </html>
  );
}
