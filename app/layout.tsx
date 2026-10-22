import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ['latin'], display: 'swap', preload: true, variable: '--font-inter' });

export const metadata: Metadata = {
  title: "AI/ML Project Idea Generator",
  description: "Generate unique AI and Machine Learning project ideas tailored to your skill level and interests",
  keywords: ["AI", "Machine Learning", "Project Ideas", "ML Projects", "AI Projects"],
  authors: [{ name: "Your Name" }],
  creator: "Your Name",
  openGraph: {
    title: "AI/ML Project Idea Generator",
    description: "Generate unique AI and Machine Learning project ideas",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
