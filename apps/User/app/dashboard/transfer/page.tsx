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
            decimal : true
        }
    })

    const transaction = await prisma.onRampTransaction.findMany({
        where : {
            userId : Number(session.user.id)
        },
        select : {
            StartTime : true,
            amount : true,
            Status : true,
            Provider : true
        }
    })

    return(
        <div className="p-4 w-full flex flex-col gap-10">
            <div className="font-bold text-4xl mt-10 text-purple-500">
                <h1>Tranfser</h1>
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
                            <Balance amount={balance?.amount || 0} locked= {balance?.locked || 0} decimal={balance?.decimal || 1} />    
                        </Card>   
                    </div>    
                    <div>
                    <Card title="Recent Transaction">
                            <Transaction transaction={transaction} />    
                        </Card>      
                    </div>    
                </div>    
            </div>  
        </div>
    )
}
