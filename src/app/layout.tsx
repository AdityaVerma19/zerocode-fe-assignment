import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AuthProvider } from "@/context/AuthContext"; // ✅ import context

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Zerocode Chat",
  description: "Chat app with Firebase auth",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
