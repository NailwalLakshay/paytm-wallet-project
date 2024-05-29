import { Card } from "@repo/ui/card";
import { Addmoney } from "../../components/addmoney";
import { Balance } from "../../components/balance";
import { Transaction } from "../../components/transaction";
import { prisma } from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@repo/authoptions/auth";
import { redirect } from "next/navigation";

export default async function(){

    const session = await getServerSession(authOptions);
    if(!session?.user){
        return redirect("/");
    }

    const balance = await prisma.balance.findFirst({
        where : {
            userId : Number(session.user.id)
        },
        select : {
            amount : true,
            locked:true,
        }
    })

    const transaction = await prisma.onRampTransaction.findMany({
        take : 10,
        where : {
            userId : parseInt(session.user.id),
            Status : "PENDING"
        },
        select : {
            StartTime : true,
            amount : true,
            Status : true,
            Provider : true
        },
        orderBy : {
            StartTime : "desc"
        }
    })

    return(
        <div className="p-4 w-full flex flex-col gap-10">
            <div className="font-bold text-4xl mt-10 text-purple-500">
                <h1>PayTM@IIT WALLET</h1>
            </div>          
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div >
                    <Card title="Add Money"> 
                        <Addmoney/>
                    </Card>
                </div>    
                <div>
                    <div>
                        <Card title="Balance">
                            <Balance amount={balance?.amount || 0} locked= {balance?.locked || 0} decimal={1} />    
                        </Card>   
                    </div>    
                    <div>
                    <Card title="Pending Transaction">
                        <Transaction classname="h-[200px] overflow-y-scroll overflow-x-hidden" label={"No Pending Transaction"} transaction={transaction} />    
                    </Card>      
                    </div>    
                </div>    
            </div>  
        </div>
    )
}
