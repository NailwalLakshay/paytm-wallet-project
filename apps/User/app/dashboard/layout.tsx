import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@repo/authoptions/auth";
import { redirect } from "next/navigation";
import { Toaster } from "react-hot-toast";
import { SidebarComp } from "../components/sidebar";


export const metadata: Metadata = {
  title: "PayTM@IIT | DASHBOARD",
  description: "By devs@IIT_MANDI",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const session = await getServerSession(authOptions);

  if(!session?.user){
    return redirect("/api/auth/signin");
  }
  
  return (
        <div className="flex w-full">
            <SidebarComp/>
            <Toaster position="bottom-right" />
            {children}
        </div>
  );
}

