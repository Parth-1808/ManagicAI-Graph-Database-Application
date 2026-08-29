import type { Metadata } from "next";
import "./globals.css";
import { PageTransitionProvider } from "@/context/PageTransitionContext";

export const metadata: Metadata = {
  title: "Managic AI | Graph-Powered Enterprise Operations & Decision System",
  description: "Graph-native operational decision platform powered by CognoDB and openCypher.",
  icons: {
    icon: [
      { url: "/logo.png", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    shortcut: ["/logo.png"],
    apple: [
      { url: "/logo.png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body className="min-h-full flex flex-col bg-[#faf7fd] text-[#0f172a] font-sans">
        <PageTransitionProvider>{children}</PageTransitionProvider>
      </body>
    </html>
  );
}

