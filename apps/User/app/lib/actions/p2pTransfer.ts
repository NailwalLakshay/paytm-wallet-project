"use server"

import { authOptions } from "@repo/authoptions/auth"
import { prisma } from "@repo/db/client";
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation";

export async function P2P_Transfer(amount : number, toUser : string ){

    const session = await getServerSession(authOptions);
    if(!session?.user){
        return redirect("/api/auth/signin");
    }

    const fromUser = session?.user.id;

    const toUserDetails = await prisma.user.findFirst({
        where : {
            email : toUser
        }
    })

    if(!toUserDetails){
        return{
            message : "User doesnot exist"
        }
    }

    try {
        await prisma.$transaction (async(tx)=>{
            
            await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${parseInt(fromUser)} FOR UPDATE`;

            const fromUserBalance = await tx.balance.findFirst({
                where : {
                    userId : parseInt(fromUser)
                }
            });
            
            if(fromUserBalance?.amount && fromUserBalance?.amount < amount){
                throw new Error("Insufficient Balance");
            }
    
            const toUserBalanceUp = await tx.balance.update({
                where: {
                    userId: toUserDetails.id
                },
                data : {
                    amount : {
                        increment : amount
                    }
                }
            })
    
            const fromUserBalanceUp = await tx.balance.update({
                where : {
                    userId : parseInt(fromUser),
                },
                data : {
                    amount : {
                        decrement : amount
                    }
                }
            })

            const p2pTxn = 
            await tx.p2P_TRANSFER.create({
                data : {
                    startDate : new Date,
                    amount : amount,
                    fromUserId : parseInt(fromUser),
                    toUserId : toUserDetails?.id,
                    status: "SUCCESS"
                }
            })

            if(!toUserBalanceUp || !fromUserBalanceUp || !p2pTxn){ 
                throw new Error("Failed Transfer")
            }
        })

        return {
            message : "Transfer Successfull"
        }
    } catch (error) {
        
        await prisma.p2P_TRANSFER.create({
            data : {
                startDate : new Date,
                amount : amount,
                fromUserId : parseInt(fromUser),
                toUserId : toUserDetails?.id,
                status: "FAILED"
            }
        })

        return {
            message : "Transaction failed"
        }
    }
}