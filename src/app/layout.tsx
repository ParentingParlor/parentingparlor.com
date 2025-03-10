import { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import RootLayoutClient from "@/components/RootLayoutClient";
import { UserProvider } from "@/context/UserContext";
import getAuthSession from "@/feature/auth/getAuthSession";
import { AuthProvider } from "@/feature/auth/authContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "parentingparlor - Expert Parenting Advice & Community",
  description: "A community-driven platform for expert parenting advice and support",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getAuthSession();
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider session={session}>
          <UserProvider>
            <RootLayoutClient>{children}</RootLayoutClient>
          </UserProvider>
        </AuthProvider>
      </body>
    </html>
  );
}