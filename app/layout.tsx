import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Image from "next/image";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="cupcake">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* area header */}
        <header>
          <Image width={320} height={60} src={"/images/logo-teknokrat.png"} alt="gambar logo teknokrat" />
        </header>

        {/* area content */}
        <main className="m-10">
          {children}
        </main>

        {/* area footer */}
        <footer className="text-center">
          Copyright &copy; 2025 - IF 22 DX
        </footer>
      </body>
    </html>
  );
}
