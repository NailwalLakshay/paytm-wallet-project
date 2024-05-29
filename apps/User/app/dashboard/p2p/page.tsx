import { getServerSession } from "next-auth";
import { P2P_Transaction } from "../../components/p2pTransaction";
import { SendMoney } from "../../components/sendmoney";
import { authOptions } from "@repo/authoptions/auth";
import { redirect } from "next/navigation";
import { prisma } from "@repo/db/client";



export default async function() {

    const session = await getServerSession(authOptions);
    if(!session?.user){
       return redirect("/api/auth/signin");
    }

    const tranfers = await prisma.p2P_TRANSFER.findMany({
        take : 10,
        where : {
            OR : [
                {fromUserId : parseInt(session?.user?.id)},
                {toUserId : parseInt(session?.user?.id)},
            ],
        },
        orderBy: {
            startDate : "desc"
        }
    })

    return(
    <div className="w-full p-4 mt-10">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <SendMoney/>
            <P2P_Transaction classname="h-[400px] overflow-x-hidden overflow-y-scroll" user={session.user} transaction={tranfers} label="No Recent Transfers" />
        </div>
    </div>
    )
}

 