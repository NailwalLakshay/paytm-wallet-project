"use server"

import { authOptions } from "@repo/authoptions/auth"
import { prisma } from "@repo/db/client";
import { onRampTxnSchema } from "@repo/zodtypes/types";
import { getServerSession } from "next-auth"

export const OnRampTransactionAction = async(amount : number , provider : string)=>{

    const session =  await getServerSession(authOptions);
    if(!session?.user) {
        return {
            message : "user not logged in"
        }
    }

    const res = onRampTxnSchema.safeParse({amount , provider});
    if(!res.success) {
        return {
            message : "Invalid data"
        }
    }

    try {
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
    } catch (error) {
        return {
            message : "fail"
        }
    }

}