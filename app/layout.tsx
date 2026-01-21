import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "BuildYour.Careers | Diagnostic Talent Evaluation",
  description: "Comprehensive diagnostic assessment platform for engineering students. Discover your role-fit, develop your skills, and launch your career.",
  keywords: ["career assessment", "engineering jobs", "talent evaluation", "skill development"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased min-h-screen`}
      >
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
