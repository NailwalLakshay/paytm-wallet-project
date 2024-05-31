
import { prisma } from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@repo/authoptions/auth";
import { Transaction } from "../../components/transaction";
import { P2P_Transaction } from "../../components/p2pTransaction";

export default async function(){
    const session = await getServerSession(authOptions);

    const transaction = await prisma.onRampTransaction.findMany({
        where : {
            userId : parseInt(session.user.id)
        },
        select : {
            StartTime : true,
            amount : true,
            Status : true,
            Provider : true
        },
        orderBy: {
            StartTime : "desc"
        }
    })
    const transfer = await prisma.p2P_TRANSFER.findMany({
        where :{
            OR : [
                {fromUserId : parseInt(session.user.id)},
                {toUserId : parseInt(session.user.id)}
            ]
        },
        orderBy : {
            startDate : "desc"
        }
    })

    //  i want to add pagination

    return(
        <div className="flex flex-col gap-10 p-4 w-full ">
            <div className="font-bold text-4xl mt-10 text-purple-500">
                <h1>OnRamp Transactions</h1>
            </div>
            <div>
                <Transaction label="" transaction={transaction} classname="w-full"  />
            </div>
            <div className="font-bold text-4xl mt-10 text-purple-500">
                <h1>P2P Transactions</h1>
            </div>
            <div>
                <P2P_Transaction classname="" label="" transaction={transfer} />
            </div>
        </div>
    )
}