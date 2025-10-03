import "./globals.css";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";


const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["400", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Answering Legal — We’re more than an answering service",
  description: "Answering Legal has everything you need to make sure your firm never misses another opportunity.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={montserrat.variable}>
      <body className="font-sans bg-white text-[var(--gray-900)] antialiased">{children}</body>
    </html>
  );
}
