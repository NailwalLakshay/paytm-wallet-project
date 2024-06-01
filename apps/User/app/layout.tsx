import { AppBar } from "@repo/ui/appbar";
import { Footer } from "@repo/ui/footer";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Provider } from "./provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Turborepo",
  description: "Generated by create turbo",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">
        <Provider>
      <body className={inter.className}>
          <div className="flex flex-col justify-between min-h-screen">
            <AppBar/>
            {children}
            <Footer/>
          </div>
      </body>
        </Provider>
    </html>
  );
}
