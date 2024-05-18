import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "./context/cart";
import NextAuthProvider from "./providers/next-auth";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Foodie",
  description: "Delight delivered, just a tap away!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
          <CartProvider>{children}</CartProvider>
          <Toaster />
        </NextAuthProvider>
      </body>
    </html>
  );
}
