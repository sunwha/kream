import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Alert from "../components/common/Alert";
import "./globals.css";
import Providers from "./provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kream",
  description: "app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children} <Alert />
        </Providers>
      </body>
    </html>
  );
}
