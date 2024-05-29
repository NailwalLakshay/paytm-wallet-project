"use server"

import { authOptions } from "@repo/authoptions/auth"
import { prisma } from "@repo/db/client";
import { getServerSession } from "next-auth"

export const OnRampTransactionAction = async(amount : number , provider : string)=>{

    const session =  await getServerSession(authOptions);
    if(!session?.user) {
        return {
            message : "user not logged in"
        }
    }

    const token = String(Math.random()*100); // generally we hit here the bank api
    
    await prisma.onRampTransaction.create({
        data: {
            userId : Number(session?.user?.id),
            amount,
            Provider : provider,
            token : token,
            StartTime : new Date,
            Status : "PENDING",
        }
    });

    return {
        message : "Transaction initiated successfully"
    }
}