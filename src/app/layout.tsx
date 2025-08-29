import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Counto • Cheerful Math Chat",
  description: "Group3 × Mas Hasnat — GDGOC Bootcamp",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased h-full`} 
      >
        {}
        <div className="candy-bg">
          <div className="blob blob--blue" />
          <div className="blob blob--purple" />
          <div className="blob blob--pink" />
          <div className="blob blob--teal" />
        </div>

        {children}
      </body>
    </html>
  );
}
