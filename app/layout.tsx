// Import necessary styles and modules
import React from "react";
import "@/styles/globals.css"; // Ensure correct path for styles
import { Inter } from "next/font/google";
import { ApolloWrapper } from "@/components/apollo-wrapper";

// Load Google Font 'Inter' with Latin subset
const inter = Inter({ subsets: ["latin"] });

// Define metadata for the app
export const metadata = {
  title: "Reading Tracker",
  description: "View my reading progress and my book collection",
};

// Define the RootLayout component with correct typing for children
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ApolloWrapper>{children}</ApolloWrapper>
      </body>
    </html>
  );
}
