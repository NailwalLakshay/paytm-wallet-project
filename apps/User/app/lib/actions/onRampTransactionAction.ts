"use server"

import { authOptions } from "@repo/authoptions/auth"
import { prisma } from "@repo/db/client";
import { onRampTxnSchema } from "@repo/zodtypes/types";
import { getServerSession } from "next-auth"
import axios from "axios";

export const OnRampTransactionAction = async(amount : number , provider : string)=>{
    console.log("heelo");
    const session =  await getServerSession(authOptions);
    if(!session?.user) {
        return {
            message : "User not logged in",
            data : null
        }
    }

    const res = onRampTxnSchema.safeParse({amount , provider});
    if(!res.success) {
        return {
            message : "Invalid data",
            data : null
        }
    }
    
    try {
        // const token = Math.random().toString(36).substring(7);
        // console.log("token = " , token.data)
        const url = "https://mybank.lakshaynailwaldevs.top/genToken"
        const token = await axios.post(url,{
            amount,
            userId : session?.user?.id
        })


        if(token.data.status !== 200) {
            throw ({message  : "Internal Server Error"})
        }

        await prisma.onRampTransaction.create({
            data: {
                userId : Number(session?.user?.id),
                amount,
                Provider : provider,
                token : token.data.data,
                StartTime : new Date,
                Status : "PENDING",
            }
        });

        return {
            message : "Transaction initiated successfully",
            data : token.data.data
        }
        
    } catch (error) {
        return {
            message: (error as Error).message,
            data: null
        };
    }

}