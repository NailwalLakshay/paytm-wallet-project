import { authOptions } from "@repo/authoptions/auth"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation";

export default async function Page() {

  const session = await getServerSession(authOptions);
  if(session?.user){
    redirect("/dashboard")
  }

  return (
    <div className="p-10">
        <div className="text-3xl font-bold">
          PayTM@IIT Landing Page
        </div>
    </div>
  )
}