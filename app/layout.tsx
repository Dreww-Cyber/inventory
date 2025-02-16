"use client"
import { metadata } from "./metadata";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'
import "./globals.css";
import { Toaster } from "@/components/ui/toaster"
import { useState } from "react";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    // <ClerkProvider>
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#EFEFF0]`}
      >
        {/* <SignedOut> */}
            {/* <SignInButton /> */}
        {/* </SignedOut> */}
          {/* <SignedIn  > */}
            {/* <UserButton /> */}
          {/* </SignedIn> */}
          <QueryClientProvider client={queryClient}>
        {children}
          </QueryClientProvider>
        <Toaster />
      </body>
    </html>
    // {/* </ClerkProvider> */}
  );
}
