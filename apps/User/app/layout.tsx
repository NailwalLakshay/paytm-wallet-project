import { AppBar } from "./components/appbar";
import { Footer } from "@repo/ui/footer";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Provider } from "./provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PayTM@IIT",
  description: "Lakshay Nailwal",
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
            <AppBar/>
          <div className="flex flex-col justify-between min-h-screen ">
            {children}
          </div>
          <Footer/>
      </body>
        </Provider>
    </html>
  );
}
