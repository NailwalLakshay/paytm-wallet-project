"use server"

import { getServerSession } from "next-auth";
import { authOptions } from "@repo/authoptions/auth";
import { prisma } from "@repo/db/client";

export const checkSessionOnserver = async()=>{
    const session = await getServerSession(authOptions);
    if(!session?.user){
       return null
    }
    return session;
}

export const p2pRecentTransaction = async( numberToShow? : number )=>{
    const session = await checkSessionOnserver();
    if(!session){
        return null;
    }
    const transfers = await prisma.p2P_TRANSFER.findMany({
        take : numberToShow,
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

    return transfers
}


export const UserBalance = async()=>{
    const session = await checkSessionOnserver();
    if(!session){
        return null;
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

    return balance;
}

export const UserDetails = async()=>{
    const session = await checkSessionOnserver();
    if(!session){
        return null;
    }

    const user = await prisma.user.findFirst({
        where : {
            id : parseInt(session.user.id)
        }
    })

    return user

}


export const UserOnRampTransaction = async(numberToShow? : number)=>{
    
    const session = await checkSessionOnserver();
    if(!session){
        return null;
    }

    const transaction = await prisma.onRampTransaction.findMany({
        take : numberToShow,
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

    return transaction
}